export default {
  proxy: {
    '/rest/bas/user/login': {
      target: 'http://193.112.243.228:40000',
    },
    '/rest/ams/*': {
      target: 'http://193.112.243.228:40004',
    },
  },
};
