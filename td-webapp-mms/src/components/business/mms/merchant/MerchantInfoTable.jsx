import React, { PropTypes } from 'react';
import { Tabs } from 'antd';
import * as i18n from '../../../../utils/i18n';
import MerchantBaseDetailInfoForm from './infoForm/MerchantBaseDetailInfoForm';
import MerchantBankDetailInfoForm from './infoForm/MerchantBankDetailInfoForm';
import MerchantOtherDetailInfoForm from './infoForm/MerchantOtherDetailInfoForm';

const TabPane = Tabs.TabPane;

const MerchantInfoTable = (props) => {
  const { data } = props;
  const bizMap = i18n.bizMap('mms/merchant');

  return (
    <Tabs defaultActiveKey="1" >
      <TabPane tab={bizMap.merBaseInfo} key="1"><MerchantBaseDetailInfoForm data={data} /></TabPane>
      <TabPane tab={bizMap.merBankInfo} key="2"><MerchantBankDetailInfoForm data={data} /></TabPane>
      <TabPane tab={bizMap.merOtherInfo} key="3"><MerchantOtherDetailInfoForm data={data} /></TabPane>
    </Tabs>
  );
}

MerchantInfoTable.propTypes = {
  data: PropTypes.object,
};

MerchantInfoTable.defaultProps = {
  data: {},
}

export default MerchantInfoTable;
