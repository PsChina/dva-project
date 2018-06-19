export function addSmsModel(app) {
  app.model(require('./models/sms/chnChkSum'));
  app.model(require('./models/sms/chnChkDoubtManage'));
  app.model(require('./models/sms/chnChkErrorManage'));
  app.model(require('./models/sms/chnChkErrorAudit'));
  app.model(require('./models/sms/clearChannelManage'));
  app.model(require('./models/sms/clearPlatformManage'));
  app.model(require('./models/sms/clearSumManage'));
  app.model(require('./models/sms/clearBusinessManage'));
  app.model(require('./models/sms/stlOrderManage'));
  app.model(require('./models/sms/stlManage'));
  app.model(require('./models/sms/stlAudit'));
  app.model(require('./models/sms/stlBusiness'));
  app.model(require('./models/sms/stlShrManage'));
  app.model(require('./models/sms/stlShrVerifyManage'));
}
