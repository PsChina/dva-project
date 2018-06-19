import dva from 'dva';
import { encode, decode } from './utils/code';
import Config from '../config/config.json';
import './index.html';
import './index.css';

// bms models
import { addBasModel } from './index-bas';

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

// bas models
addBasModel(app);

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
