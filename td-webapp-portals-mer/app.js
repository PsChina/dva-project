const express = require('express');
const proxy = require('express-http-proxy');
const ejs = require('ejs');
const path = require('path');
const config = require('./config/config.json');

const app = express();
const appPort = 49011;
const appMerpApi = `${config.merpHost}/${config.merpReqType}/${config.merpApp}`;

if (config.merpProxy !== '') {
  const merpProxy = proxy(config.merpProxy, {
    forwardPath: (req) => {
      console.log('default request method ==> ', req.method, `${config.merpProxyApp}${req._parsedUrl.path}`);
      return `${config.merpProxyApp}${req._parsedUrl.path}`;
    },
  });
  // extra request to merpProxy
  const defaultUploadProxy = proxy(config.merpProxy, {
    reqBodyEncoding: null,
    forwardPath: (req) => {
      console.log('default upload request');
      return `${config.merpProxyApp}${req._parsedUrl.path}`;
    },
  });

  app.use(`${appMerpApi}/common/upload`, defaultUploadProxy);
  app.use(`${appMerpApi}/*`, merpProxy);
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
