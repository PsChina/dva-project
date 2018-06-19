const express = require('express');
const proxy = require('express-http-proxy');
const path = require('path');
const config = require('./config/config.json');

const app = express();
// const appPort = 49007;
const appPort = 5000;
// 项目名称/请求类型
const appBasApi = `${config.basHost}/${config.basReqType}/${config.basApp}`;

const basProxy = proxy(config.basProxy, {
  forwardPath: (req) => {
    console.log('bas request method ==> ', req.method, `${config.basProxyApp}${req._parsedUrl.path}`);
    // return req._parsedUrl.path;
    return `${config.basProxyApp}${req._parsedUrl.path}`;
  },
})
app.use(`${appBasApi}/*`, basProxy);



app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(appPort);
console.log(`Now server listening at ${appPort}`);
