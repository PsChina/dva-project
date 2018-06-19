export function addOmsModel(app) {
  app.model(require('./models/oms/summaryOrderManage'));
  app.model(require('./models/oms/summaryHisOrderManage'));
  app.model(require('./models/oms/bankcardOrderManage'));
  app.model(require('./models/oms/bankcardHisOrderManage'));
  app.model(require('./models/oms/scanOrderManage'));
  app.model(require('./models/oms/scanHisOrderManage'));
  app.model(require('./models/oms/orderTransRecManage'));
}
