'use strict';

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const config = require('./config/config.json');

const mock = {
  // "GET /rest/*"(req, res){
  //   console.log('did received network',req.url);
  //   return axios({
  //     url:`${config.basProxy}${req.url}`
  //   }).then((result)=>{
  //     console.log(result);
  //     return result;
  //   })
  // },
  "GET /rest/*":`${config.basProxy}`
};

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

// module.exports = {
//   "/*"(req,res){
//     console.log('did received network request.',req.url)
//     return null
//   }
// }
