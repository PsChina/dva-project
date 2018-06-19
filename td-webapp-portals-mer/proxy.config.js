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
  'GET /rest/merp/*':config.merpProxy,
  'POST /rest/merp/*':config.merpProxy,
  'PUT /rest/merp/*':config.merpProxy,
  'DELETE /rest/merp/*':config.merpProxy,
  'GET /rest/tms/*':config.tmsProxy,
  'POST /rest/tms/*':config.tmsProxy,
  'PUT /rest/tms/*':config.tmsProxy,
  'DELETE /rest/tms/*':config.tmsProxy,
};

// http://localhost:8989/rest/merp/user/login?p=dXNyTmFtZT02MjkwOTg5ODk3OCU0MHFxLmNvbSZ1c3JQc3c9OTZlNzkyMTg5NjVlYjcyYzkyYTU0OWRkNWEzMzAxMTImbG9naW5UeXBlPTE=

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
