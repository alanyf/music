/* if (typeof window !== 'undefined') {
    __webpack_require__.p = window.GLOBAL_STATIC_PATH + '/';
} */

let route = [{
    path: '/example/index',
    name: 'index',
    meta: {
        title: '测试页面首页'
    },
    //  component: r => require.ensure([], () => r(require('./index/index.vue')), 'index')
    component: r => import(
    /* webpackChunkName: "example-index" */
    './index/index.vue'
    )
}];

module.exports = route;
