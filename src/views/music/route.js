import Index from './pages/index/index';
import Play from './pages/play/play';
import Menu from './pages/menu/menu';
import My from './pages/my/my';
import Find from './pages/find/find';
import Search from './pages/search/search';
import Comment from './pages/comment/comment';
import Friend from './pages/friend/friend';
import Example from './components/Example';

let routes = [
    {
        path: '/music/index',
        name: 'index',
        component: Index,
        children: [
            {path: 'my', component: My},
            {path: '', component: Find},
            {path: 'find', component: Find},
            {path: 'friend', component: Friend},
            {path: 'video', component: Example}
        ]
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
    },
    {
        path: '/music/comment/:id',
        name: 'comment',
        component: Comment
    }

];

module.exports = routes;
