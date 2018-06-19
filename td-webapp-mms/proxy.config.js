

const fs = require('fs');
const path = require('path');
const config = require('./config/config.json');

const mock = {
  'GET /rest/mms/*': config.mmsProxy,
  'GET /rest/bas/*': config.basProxy,
  'POST /rest/mms/*': config.mmsProxy,
  'PUT /rest/mms/*': config.mmsProxy,
  'DELETE /rest/mms/*': config.mmsProxy,
  'GET /rest/ams/*': config.amsProxy,
  'POST /rest/ams/*': config.amsProxy,
  'PUT /rest/ams/*': config.amsProxy,
  'DELETE /rest/ams/*': config.amsProxy,
  'PATCH /rest/ams/*': config.amsProxy,
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
