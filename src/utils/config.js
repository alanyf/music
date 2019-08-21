import config from '../../config';
const isDev = window.CURENT_ENV === 'development';
console.log('current environment:', window.CURENT_ENV);
module.exports = {
    protocal: 'http',
    host: 'http://localhost:3000/',
    localhost: 'http://localhost:' + config.dev.port,
    website: '/music/',
    useMock: !isDev
};
