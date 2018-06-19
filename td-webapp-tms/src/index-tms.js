export function addTmsModel(app) {
  app.model(require('./models/tms/terminalCompanyManage'));
  app.model(require('./models/tms/terminalModelManage'));
  app.model(require('./models/tms/terminalKeyManage'));
  app.model(require('./models/tms/terminalFirmwareManage'));
  app.model(require('./models/tms/terminalAppManage'));
  app.model(require('./models/tms/terminalParamTemp'));
  app.model(require('./models/tms/terminalLogManage'));
  app.model(require('./models/tms/terminalStockManage'));
  app.model(require('./models/tms/terminalStockAdd'));
  app.model(require('./models/tms/terminalManage'));
  app.model(require('./models/tms/terminalAgentManage'));
  app.model(require('./models/tms/terminalMerManage'));
  app.model(require('./models/tms/qrCodeInfoManage'));
  app.model(require('./models/tms/terminalTxnAuthManage'));
}
