import React, { PropTypes } from 'react';
import { Tabs } from 'antd';
import * as i18n from '../../../../utils/i18n';
import MerchantUsrDetailInfoForm from './infoForm/MerchantUsrDetailInfoForm';

const TabPane = Tabs.TabPane;
const MerchantUsrInfoTable = (props) => {
//  const commMap = i18n.commonMap();
  const { data } = props;
  return (
    <MerchantUsrDetailInfoForm data={data} />
  );
}

MerchantUsrInfoTable.propTypes = {
  data: PropTypes.object,
};

MerchantUsrInfoTable.defaultProps = {
  data: {},
}

export default MerchantUsrInfoTable;
