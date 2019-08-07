import Index from './pages/index/index';
import Play from './pages/play/play';
import Menu from './pages/menu/menu';
import My from './pages/my/my';
import Search from './pages/search/search';

let routes = [
    {
        path: '/music',
        name: '首页',
        component: Index
    },
    {
        path: '/music/play',
        name: '播放',
        component: Play
    },
    {
        path: '/music/menu',
        name: '菜单',
        component: Menu
    },
    {
        path: '/music/my',
        name: '我的',
        component: My
    },
    {
        path: '/music/search',
        name: '搜索',
        component: Search
    }

];

module.exports = routes;
