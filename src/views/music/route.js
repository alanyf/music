import Index from './pages/index/index';
import Play from './pages/play/play';
import Menu from './pages/menu/menu';
import My from './pages/my/my';
import Search from './pages/search/search';

let routes = [
    {
        path: '/music',
        name: 'index',
        component: Index
    },
    {
        path: '/music/play',
        name: 'play',
        component: Play
    },
    {
        path: '/music/menu',
        name: 'menu',
        component: Menu
    },
    {
        path: '/music/my',
        name: 'my',
        component: My
    },
    {
        path: '/music/search',
        name: 'search',
        component: Search
    }

];

module.exports = routes;
