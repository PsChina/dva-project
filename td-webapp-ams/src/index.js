import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import config from './config/config';
import './index.css';
// import './mock/mock';
import './style/App.less';
import infoBus from 'info-bus';

window.infoBus = infoBus;

ReactDOM.render(<App config = {config} />, document.getElementById('root'));
// registerServiceWorker();
