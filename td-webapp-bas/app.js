const express = require('express');
const proxy = require('express-http-proxy');
const ejs = require('ejs');
const path = require('path');
const config = require('./config/config.json');

const app = express();
// const appPort = 48001;
const appPort = 4000;
// appName/requestType
const appBasApi = `${config.basHost}/${config.basReqType}/${config.basApp}`;
const appDubboApi = `${config.dubboHost}/${config.dubboApp}`;
const workFlowApi = `${config.wfHost}/${config.wfReqType}/${config.wfApp}`;
const appXxlJobApi = `${config.xxlJobHost}/${config.xxlJobReqType}/${config.xxlJobApp}`;

if (config.basProxy !== '') {
  const basProxy = proxy(config.basProxy, {
    forwardPath: (req) => {
      console.log(req.url);
      console.log('default request method ==> ', req.method, `${config.basProxyApp}${req._parsedUrl.path}`);
      console.log(`${config.basProxy}${config.basProxyApp}${req._parsedUrl.path}`)
      return `${config.basProxy}${config.basProxyApp}${req._parsedUrl.path}`;
    },
  });
  app.use(`${appBasApi}/*`, basProxy);
}

if (config.dubboProxy !== '') {
  const dubboProxy = proxy(config.dubboProxy, {
    forwardPath: (req) => {
      console.log('auth request method ==> ', req.method);
      return req._parsedUrl.path;
    },
  });
  app.use(`${appDubboApi}/*`, dubboProxy);
  app.use('/dubbo-admin/governance/getAllServices.do', dubboProxy);
}

if (config.xxlJobProxy !== '') {
  const xxlJobProxy = proxy(config.xxlJobProxy, {
    forwardPath: (req) => {
      return `${config.xxlJobProxyApp}${req._parsedUrl.path}`;
    },
  });
  app.use(`${appXxlJobApi}/*`, xxlJobProxy);
}

if (config.wfProxy !== '') {
  const wfProxy = proxy(config.wfProxy, {
    forwardPath: (req) => {
      console.log('default request method ==> ', req.method, `${config.wfProxyApp}${req._parsedUrl.path}`);
      return `${config.wfProxyApp}${req._parsedUrl.path}`;
    },
  });
  app.use(`${workFlowApi}/*`, wfProxy);
}

const defaultUploadProxy = proxy(config.basProxy, {
  reqBodyEncoding: null,
  forwardPath: (req) => {
    console.log('default upload request');
    return `${config.basProxyApp}${req._parsedUrl.path}`;
  },
});
app.use('/attachment/commonFileUpload.do', defaultUploadProxy);

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
