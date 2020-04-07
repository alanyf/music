const urlModule = require('url');
const isProd = window.ENV_NAME !== 'local';
function Ajax() {
    // 依靠import()动态加载js文件来实现动态加载mock数据
    Ajax.prototype.get = getRequest({method: 'GET'});
    Ajax.prototype.delete = getRequest({method: 'DELETE'});
    Ajax.prototype.post = getRequest({method: 'POST'});
    Ajax.prototype.put = getRequest({method: 'PUT'});
    Ajax.prototype.getByScript = getByScript;
}

function getRequest({method}) {
    return function request(url, option) {
        return new Promise(async (resolve, reject) => {
            const path = url.split('?')[0];
            // 动态加载存放mock数据的js文件，动态加载的文件会被webpack编译成按需加载的文件放在输出目录中等待符合条件的情况下加载
            // 通过webpackChunkName为生成的chunk文件取名字，通过"[request]"告知webpack依靠传递的路径下的文件名动态生成chunk文件名
            import(
                /* webpackChunkName: "[request]"*/
                `../../dev/mock${path}.js`
            ).then(res => {
                if (res && res.default) {
                    const body = res.default;
                    if (typeof body === 'function') {
                        let params = null;
                        if (method === 'GET' || method === 'DELETE') {
                            params = urlModule.parse(url, true).query;
                        }
                        else if (method === 'POST' || method === 'PUT') {
                            params = {};
                        }
                        option && option.params && Object.assign(params, JSON.parse(JSON.stringify(option.params)));
                        const data = body({url, params}).body;
                        resolve(data);
                    }
                    else {
                        resolve(res.body);
                    }
                    return;
                }
                const err = 'Request not found: ' + url;
                console.error(err);
                reject(err);
            }).catch(err => reject(err));
        });
    };
}

// 依靠script加载js文件来实现动态加载mock数据
function getByScript(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        const path = url.split('?')[0];
        script.src = `./mock${path}.js`;
        script.async = false;
        document.body.appendChild(script);
        script.onload = () => {
            const res = window.module.exports;
            if (res !== undefined) {
                resolve(res.body);
            }
            else {
                reject({code: 0, message: 'fail', data: null});
            }
            document.body.removeChild(script);
        };

        setTimeout(() => {
            try {
                if ([].indexOf.call(document.body.children, script) !== -1) {
                    console.log('removeChild');
                    document.body.removeChild(script);
                }
            }
            catch (err) {
                reject(err);
            }
        }, 500);
    });
}
// function parseUrlParams(url) {
//     const params = {};
//     if (url.includes('?')) {
//         const str = url.split('?')[1];
//         const arr = str.split('&');
//         for (let i = 0; i < arr.length; i++) {
//             params[arr[i].split('=')[0]] = decodeURI(arr[i].split('=')[1]);
//         }
//     }
//     return params;
// }
if (isProd) {
    Vue.prototype.$ajax = new Ajax();
}
