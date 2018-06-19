'use strict';

const fs = require('fs');
const path = require('path');
const config = require('./config/config')
const mock = {
  'GET /rest/pms/*':config.pmsProxy,
  'GET /rest/bas/*':config.basProxy,
  'POST /rest/pms/*':config.pmsProxy,
  'PUT /rest/pms/*':config.pmsProxy,
  'DELETE /rest/pms/*':config.pmsProxy,
  'POST /rest/ams/*':config.amsProxy,
  'GET /rest/ams/*':config.amsProxy,
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
