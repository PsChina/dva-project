export function addMmsModel(app) {
  app.model(require('./models/mms/personalMemberManage'));
  app.model(require('./models/mms/personalMemberApply'));
  app.model(require('./models/mms/agentManage'));
  app.model(require('./models/mms/agentApply'));
  app.model(require('./models/mms/merchantStoreManage'));
  app.model(require('./models/mms/merchantStoreApply'));
  app.model(require('./models/mms/merchantManage'));
  app.model(require('./models/mms/merchantApply'));
  app.model(require('./models/mms/merchantGlobalApply'));
  app.model(require('./models/mms/agentRoleManage'));
  app.model(require('./models/mms/merchantRoleManage'));
  app.model(require('./models/mms/merchantStoreRoleManage'));
  app.model(require('./models/mms/merchantUsrManage'));
  app.model(require('./models/mms/merchantStoreUsrManage'));
  app.model(require('./models/mms/agentUsrManage'));
  app.model(require('./models/mms/taskMerchantManage'));
  app.model(require('./models/mms/taskAgentManage'));
  app.model(require('./models/mms/taskStoreManage'));
}