import React, { PropTypes } from 'react';
import { Tabs } from 'antd';
import * as i18n from '../../../../../utils/i18n';
import AgentBaseDetailInfoForm from '../../agent/infoForm/AgentBaseDetailInfoForm';
import AgentAccDetailInfoForm from '../../agent/infoForm/AgentAccDetailInfoForm';
import AgentAttachDetailInfoForm from '../../agent/infoForm/AgentAttachDetailInfoForm';

const TabPane = Tabs.TabPane;
const AgentInfoTable = (props) => {
  const bizMap = i18n.bizMap('mms/agent');
  //  const commMap = i18n.commonMap();
  const { data } = props;
  const agtType = data.agtType;

  return (
    <Tabs defaultActiveKey="1" >
      <TabPane tab={bizMap.baseInfo} key="1"><AgentBaseDetailInfoForm data={data} /></TabPane>
      <TabPane tab={bizMap.accInfo} key="2"><AgentAccDetailInfoForm data={data} /></TabPane>
      <TabPane tab={bizMap.attachInfo} key="3"><AgentAttachDetailInfoForm agtType={agtType} data={data} /></TabPane>
    </Tabs>
  );
}

AgentInfoTable.propTypes = {
  data: PropTypes.object,
};

AgentInfoTable.defaultProps = {
  data: {},
}

export default AgentInfoTable;
