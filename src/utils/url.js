import Vue from 'vue';
import axios from 'axios';

if (!Vue.prototype.$http) {
    const host = 'http://10.73.50.62:3000/';
    let methods = ['get', 'delete', 'head', 'options', 'post', 'put', 'patch', 'read', 'create', 'update'];
    // console.log(Vue.prototype.$ajax);
    const http = {};
    methods.forEach(e => {
        http[e] = function () {
            if (typeof arguments[0] === 'string') {
                arguments[0] = arguments[0].split('/music/').join(host);
            }
            return Vue.prototype.$ajax(...arguments);
        };
    });
    Vue.prototype.$http = http;
    Vue.prototype.$axios = axios;
}

export default Vue.prototype.$http;
