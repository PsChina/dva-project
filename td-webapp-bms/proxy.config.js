
const config = require('./config/config.json');
const fs = require('fs');
const path = require('path');

const mock = {
  'GET /rest/bas/*': config.basProxy,
  'GET /rest/bms/*': config.bmsProxy,
  'POST /rest/bms/*': config.bmsProxy,
  'PUT /rest/bms/*': config.bmsProxy,
  'DELETE /rest/bms/*': config.bmsProxy,
};

// fs.readdirSync(path.join(__dirname, '/mock')).forEach((file) => {
//   if (file.indexOf('.') === -1) {
//     const subPath = `/mock/${file}`;
//     fs.readdirSync(path.join(__dirname, subPath)).forEach((subFile) => {
//       const subFilePath = `.${subPath}/${subFile}`;
//       Object.assign(mock, require(subFilePath));
//     });
//   } else {
//     const filePath = `./mock/${file}`;
//     Object.assign(mock, require(filePath));
//   }
// });

module.exports = mock;
