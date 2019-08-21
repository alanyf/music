import config from '../../config';
const isDev = process.env.NODE_ENV === 'development';
module.exports = {
    protocal: 'http',
    host: 'http://localhost:3000/',
    localhost: 'http://localhost:' + config.dev.port,
    website: '/music/',
    useMock: !isDev
};
