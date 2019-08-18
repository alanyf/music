import Index from './pages/index/index';
import Play from './pages/play/play';
import Menu from './pages/menu/menu';
import My from './pages/my/my';
import Find from './pages/find/find';
import Search from './pages/search/search';
import Comment from './pages/comment/comment';
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
            {path: 'friend', component: Example},
            {path: 'video', component: Example}
        ]
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
    },
    {
        path: '/music/comment/:id',
        name: '评论',
        component: Comment
    }

];

module.exports = routes;
