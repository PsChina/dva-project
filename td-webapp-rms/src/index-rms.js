export function addRmsModel(app) {
  app.model(require('./models/rms/bankCardBlackListManage'));
  app.model(require('./models/rms/merBlackListManage'));
  app.model(require('./models/rms/storeBlackListManage'));
  app.model(require('./models/rms/termBlackListManage'));
  // app.model(require('./models/rms/qrBlackListManage'));
  app.model(require('./models/rms/blackListLogManage'));
  app.model(require('./models/rms/mccLimitManage'));
  app.model(require('./models/rms/merLimitManage'));
  app.model(require('./models/rms/storeLimitManage'));
  app.model(require('./models/rms/termLimitManage'));
  app.model(require('./models/rms/qrLimitManage'));
  app.model(require('./models/rms/ruleManage'));
  app.model(require('./models/rms/warnGroupManage'));
  app.model(require('./models/rms/paperBlackListManage'));
  app.model(require('./models/rms/warnUserManage'));
  app.model(require('./models/rms/ruleMessageManage'));
}
