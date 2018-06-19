import React, { PropTypes } from 'react';
import { Tabs } from 'antd';
import * as i18n from '../../../../../utils/i18n';
import MerchantBaseDetailInfoForm from '../../merchant/infoForm/MerchantBaseDetailInfoForm';
import MerchantBankDetailInfoForm from '../../merchant/infoForm/MerchantBankDetailInfoForm';
import MerchantAttachDetailInfoForm from '../../merchant/infoForm/MerchantAttachDetailInfoForm';

const TabPane = Tabs.TabPane;
const MerchantInfoTable = (props) => {
  const { data } = props;
  const bizMap = i18n.bizMap('agtp/merchant');
  return (
    <Tabs defaultActiveKey="1" >
      <TabPane tab={bizMap.merBaseInfo} key="1"><MerchantBaseDetailInfoForm data={data.merBasicInf} /></TabPane>
      <TabPane tab={bizMap.merBankInfo} key="2"><MerchantBankDetailInfoForm data={data.merStlBankInf} /></TabPane>
      <TabPane tab={bizMap.merAttachInfo} key="3"><MerchantAttachDetailInfoForm data={data.merAttachInf} /></TabPane>
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
