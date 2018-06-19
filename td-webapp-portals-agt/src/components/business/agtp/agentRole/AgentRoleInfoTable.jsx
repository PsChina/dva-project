import React, { PropTypes } from 'react';
import AgentRoleDetailInfoForm from './infoForm/AgentRoleDetailInfoForm';

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
