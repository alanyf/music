import config from '../../config';
module.exports = {
    protocal: 'http',
    host: 'http://localhost:3000/',
    localhost: 'http://localhost:' + config.dev.port,
    website: '/music/',
    useMock: false
};
