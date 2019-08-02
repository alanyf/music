import Index from './pages/index/index';
import Play from './pages/play/play';

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
    }
];

module.exports = routes;
