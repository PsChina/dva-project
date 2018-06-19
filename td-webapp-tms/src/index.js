import dva from 'dva';
import { encode, decode } from './utils/code';
import Config from '../config/config.json';
import './index.html';
import './index.css';
// tms models
import { addTmsModel } from './index-tms';

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
// // tms models
// app.model(require('./models/tms/terminalCompanyManage'));
// app.model(require('./models/tms/terminalModelManage'));
// app.model(require('./models/tms/terminalKeyManage'));
// app.model(require('./models/tms/terminalFirmwareManage'));
// app.model(require('./models/tms/terminalAppManage'));
// // app.model(require('./models/tms/terminalParamManage'));
// app.model(require('./models/tms/terminalParamTemp'));
// app.model(require('./models/tms/terminalLogManage'));
// app.model(require('./models/tms/terminalStockManage'));
// app.model(require('./models/tms/terminalStockAdd'));
// app.model(require('./models/tms/terminalManage'));
// app.model(require('./models/tms/terminalAgentManage'));
// app.model(require('./models/tms/terminalMerManage'));

// tms models
addTmsModel(app);

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
