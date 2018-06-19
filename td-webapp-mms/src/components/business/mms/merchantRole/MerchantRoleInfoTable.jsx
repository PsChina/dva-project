import React, { PropTypes } from 'react';
import { Tabs } from 'antd';
import * as i18n from '../../../../utils/i18n';
import MerchantRoleDetailInfoForm from './infoForm/MerchantRoleDetailInfoForm';

const TabPane = Tabs.TabPane;
const MerchantRoleInfoTable = (props) => {
//  const commMap = i18n.commonMap();
  const { data } = props;
  return (
    <MerchantRoleDetailInfoForm data={data} />
  );
}

MerchantRoleInfoTable.propTypes = {
  data: PropTypes.object,
};

MerchantRoleInfoTable.defaultProps = {
  data: {},
}

export default MerchantRoleInfoTable;
