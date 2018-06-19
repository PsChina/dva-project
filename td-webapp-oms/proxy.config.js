'use strict';

const fs = require('fs');
const path = require('path');

const mock = {};

fs.readdirSync(path.join(__dirname, '/mock')).forEach((file) => {
  if (file.indexOf('.') === -1) {
    const subPath = `/mock/${file}`;
    fs.readdirSync(path.join(__dirname, subPath)).forEach((subFile) => {
      const subFilePath = `.${subPath}/${subFile}`;
      Object.assign(mock, require(subFilePath));
    });
  } else {
    const filePath = `./mock/${file}`;
    Object.assign(mock, require(filePath));
  }
});

module.exports = mock;
