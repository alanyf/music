const isProd = window.CURRENT_ENV === 'production';
class Ajax {
    constructor(){
        //window.module = {exports: null};

    }
     // 依靠script加载js文件来实现动态加载mock数据
     getByScript(url){
        return new Promise((resolve, reject)=>{
            const script = document.createElement('script');
            url = url.split('?')[0];
            script.src = `./mock${url}.js`;
            script.async = false;
            document.body.appendChild(script);
            script.onload = ()=>{
                const res = window.module.exports;
                if(res !== undefined){
                    resolve(res.body)
                }else{
                    reject({code: 0,  message: 'fail', data: null});
                }
                document.body.removeChild(script);
            }

            setTimeout(()=>{
                try{
                    if([].indexOf.call(document.body.children, script) !== -1){
                        console.log('removeChild');
                        document.body.removeChild(script);
                    }
                }catch(err){
                    reject(err);
                }
            }, 500);
        });
    }
    // 依靠import()动态加载js文件来实现动态加载mock数据
    get(url){
        return new Promise(async (resolve, reject)=>{
            url = url.split('?')[0];
            // 动态加载存放mock数据的js文件，动态加载的文件会被webpack编译成按需加载的文件放在输出目录中等待符合条件的情况下加载
            // 通过webpackChunkName为生成的chunk文件取名字，通过"[request]"告知webpack依靠传递的路径下的文件名动态生成chunk文件名
            import(
                /* webpackChunkName: "[request]"*/
                `../../dev/mock${url}`
            ).then(res => {
                console.log(res.body);
                resolve(res&&res.body);
            }).catch(err => reject(err));
        });
    }
}
function getReqName(url){
    return url.split('/').join('_');
}
if(isProd){
//if(1){
    Vue.prototype.$ajax = new Ajax();
}