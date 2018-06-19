const express = require('express');
const proxy = require('express-http-proxy');
const ejs = require('ejs');
const path = require('path');
const config = require('./config/config.json');

const app = express();
const appPort = 48003;
// const appPort = 4301;
// appName/requestType
const appBasApi = `${config.basHost}/${config.basReqType}/${config.basApp}`;  // add
const appSmsApi = `${config.smsHost}/${config.smsReqType}/${config.smsApp}`;

// add
if (config.basProxy !== '') {
  const basProxy = proxy(config.basProxy, {
    forwardPath: (req) => {
      console.log('default request method ==> ', req.method, `${config.basProxyApp}${req._parsedUrl.path}`);
      return `${config.basProxyApp}${req._parsedUrl.path}`;
    },
  });
  app.use(`${appBasApi}/*`, basProxy);
}

if (config.smsProxy !== '') {
  const smsProxy = proxy(config.smsProxy, {
    forwardPath: (req) => {
      console.log('default request method ==> ', req.method, `${config.smsProxyApp}${req._parsedUrl.path}`);
      return `${config.smsProxyApp}${req._parsedUrl.path}`;
    },
  });
  app.use(`${appSmsApi}/*`, smsProxy);
  // add extra request to tmsProxy
  // const defaultUploadProxy = proxy(config.pmsProxy, {
  //   reqBodyEncoding: null,
  //   forwardPath: (req) => {
  //     console.log('default upload request');
  //     return `${config.pmsProxyApp}${req._parsedUrl.path}`;
  //   },
  // });
  // app.use('/attachment/commonFileUpload.do', defaultUploadProxy);
}

app.use(express.static(path.join(__dirname, 'dist')));
//use ejs engine for html
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// access static page (tb mng system will implement these functions below)
// app.get('/p/wx/bind', (req, res) => {
//   res.sendFile(path.join(__dirname, 'page/wx_bind_index.html'));
// });
// app.get('/p/wx/bind/init', (req, res) => {
//   const param = req.query;
//   const wxCode = param && param.code ? param.code : '';
//   res.render(path.join(__dirname, 'page/wx_bind_init'), { wxCode });
// });

app.listen(appPort);
console.log(`Now server listening at ${appPort}`);
