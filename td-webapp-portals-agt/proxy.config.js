'use strict';
const config = require('./config/config.json');
const fs = require('fs');
const path = require('path');

const mock = {
  'PATCH /rest/ams/*':config.amsProxy,
  'GET /rest/ams/*':config.amsProxy,
  'POST /rest/ams/*':config.amsProxy,
  'PUT /rest/ams/*':config.amsProxy,
  'DELETE /rest/ams/*':config.amsProxy,
  'GET /rest/bas/*':config.basProxy,
  'POST /rest/bas/*':config.basProxy,
  'PUT /rest/bas/*':config.basProxy,
  'DELETE /rest/bas/*':config.basProxy,
  'GET /rest/agtp/*':config.agtpProxy,
  'POST /rest/agtp/*':config.agtpProxy,
  'PUT /rest/agtp/*':config.agtpProxy,
  'DELETE /rest/agtp/*':config.agtpProxy,
  'GET /rest/tms/*':config.tmsProxy,
  'POST /rest/tms/*':config.tmsProxy,
  'PUT /rest/tms/*':config.tmsProxy,
  'DELETE /rest/tms/*':config.tmsProxy,
  // 'GET /rest/agtp/*': 'http://193.112.243.228:40011/',
  // 'POST /rest/agtp/*': 'http://193.112.243.228:40011/',
  // 'PUT /rest/agtp/*': 'http://193.112.243.228:40011/',
  // 'DELETE /rest/agtp/*': 'http://193.112.243.228:40011/',
  // 'POST /rest/bas/*': 'http://193.112.243.228:40000/',
  // 'PUT /rest/bas/*': 'http://193.112.243.228:40000/',
  // 'DELETE /rest/bas/*': 'http://193.112.243.228:40000/',
  // 'GET /rest/bas/*': 'http://193.112.243.228:40000/',

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
