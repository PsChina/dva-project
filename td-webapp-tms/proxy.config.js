'use strict';
const config = require('./config/config.json');
const fs = require('fs');
const path = require('path');

const mock = {
  'GET /rest/tms/*':config.tmsProxy,
  'GET /rest/bas/*':config.basProxy,
  'POST /rest/tms/*':config.tmsProxy,
  'PUT /rest/tms/*':config.tmsProxy,
  'DELETE /rest/tms/*':config.tmsProxy
};
// http://localhost:8989/rest/bas/user/menus?p=dG9rZW49YXV0aDg5Njk4ODU0MWNjNDk3MTZkZjg3YjcwMmYyMzM5NmQ1MTUxNzAyMzEwMTk4OTQwMjUmc3lzSWQ9MTAyJmxhbmd1YWdlPXpoLWhr

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
