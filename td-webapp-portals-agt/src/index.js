import dva from 'dva';
import { encode, decode } from './utils/code';
import Config from '../config/config.json';
import './index.html';
import './index.css';
import './assets/font/loginfont/iconfont';

function rem(value){
  document.documentElement.style.fontSize = `${document.documentElement.clientWidth / value}px`;
  window.onresize = ()=>{
    document.documentElement.style.fontSize = `${document.documentElement.clientWidth / value}px`;
  }
}

rem(13.66);

// -1. Get init state
const initStateName = `_TD_${Config.app}_IDX_S`;
const initStateStr = sessionStorage.getItem(initStateName);
let initState = {};
if (initStateStr !== null) {
  try {
    initState = JSON.parse(decode(initStateStr, 'deflate'));
  } catch (e) { console.log(e); }
}

// 1. Initialize
const app = dva({
  initialState: initState,
  // handle exception from effects and subscriptions
  onError(e) {
    console.log('error =>', e.message);
  },
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/indexPage'));
app.model(require('./models/home'));
app.model(require('./models/login/loginPwdBack'));
app.model(require('./models/login/login'));
// agtp models
app.model(require('./models/agtp/agentUsrManage'));
app.model(require('./models/agtp/agentRoleManage'));
app.model(require('./models/agtp/merchantApply'));
app.model(require('./models/agtp/merchantManage'));
app.model(require('./models/agtp/merchantStoreApply'));
app.model(require('./models/agtp/merchantStoreManage'));
app.model(require('./models/agtp/agentApply'));
app.model(require('./models/agtp/agentManage'));
app.model(require('./models/agtp/bankcardOrderManage'));
app.model(require('./models/agtp/bankcardHisOrderManage'));
app.model(require('./models/agtp/scanOrderManage'));
app.model(require('./models/agtp/scanHisOrderManage'));
app.model(require('./models/agtp/StlShrManage'));
app.model(require('./models/agtp/summaryOrderManage'));
app.model(require('./models/agtp/summaryHisOrderManage'));
app.model(require('./models/agtp/taskAgentManage'));
app.model(require('./models/agtp/taskMerchantManage'));
app.model(require('./models/agtp/taskStoreManage'));
app.model(require('./models/agtp/terminalManage'));
app.model(require('./models/agtp/terminalAgentManage'));
app.model(require('./models/agtp/terminalMerManage'));
app.model(require('./models/agtp/announcementManage'));
// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');

// 6. other setting
window.addEventListener('beforeunload', () => {
  // when browser refresh, keep special state (like: breadcrumb)
  const keepState = app._store.getState().indexPage;
  if (typeof keepState === 'object') {
    const state = {
      indexPage: keepState,
    }
    sessionStorage.removeItem(initStateName);
    sessionStorage.setItem(initStateName, encode(JSON.stringify(state), 'deflate'));
  }
});
