import React, { PropTypes } from 'react';
import MerchantUsrDetailInfoForm from './infoForm/AgentUsrDetailInfoForm';

const AgentUsrDetailInfoForm = (props) => {
//  const commMap = i18n.commonMap();
  const { data } = props;
  return (
    <MerchantUsrDetailInfoForm data={data} />
  );
}

AgentUsrDetailInfoForm.propTypes = {
  data: PropTypes.object,
};

AgentUsrDetailInfoForm.defaultProps = {
  data: {},
}

export default AgentUsrDetailInfoForm;
