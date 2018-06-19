import React, { PropTypes } from 'react';
import { Tabs } from 'antd';
import * as i18n from '../../../../utils/i18n';
import AgentRoleDetailInfoForm from './infoForm/AgentRoleDetailInfoForm';

const TabPane = Tabs.TabPane;
const AgentRoleInfoTable = (props) => {
//  const commMap = i18n.commonMap();
  const { data } = props;
  return (
    <AgentRoleDetailInfoForm data={data} />
  );
}

AgentRoleInfoTable.propTypes = {
  data: PropTypes.object,
};

AgentRoleInfoTable.defaultProps = {
  data: {},
}

export default AgentRoleInfoTable;
