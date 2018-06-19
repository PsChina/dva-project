
const config = require('./config/config.json');
const path = require('path');

const mock = {
  'GET /rest/pms/*': config.pmsProxy,
  'GET /rest/bas/*': config.basProxy,
  'POST /rest/pms/*': config.pmsProxy,
  'PUT /rest/pms/*': config.pmsProxy,
  'DELETE /rest/pms/*': config.pmsProxy,
};
// require('fs').readdirSync(path.join(__dirname, '/mock')).forEach((file) => {
//   Object.assign(mock, require(`./mock/${  file}`));
// });

module.exports = mock;
