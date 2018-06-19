import React, { PropTypes } from 'react';
import { Tabs } from 'antd';
import * as i18n from '../../../../utils/i18n';
import MerchantBaseDetailInfoForm from './infoForm/MerchantBaseDetailInfoForm';
import MerchantBankDetailInfoForm from './infoForm/MerchantBankDetailInfoForm';

const TabPane = Tabs.TabPane;

const MerchantInfoTable = (props) => {
  const { data, industryList } = props;
  const bizMap = i18n.bizMap('agtp/merchant');

  return (
    <Tabs defaultActiveKey="1" >
      <TabPane tab={bizMap.merBaseInfo} key="1"><MerchantBaseDetailInfoForm {...props} /></TabPane>
      <TabPane tab={bizMap.merBankInfo} key="2"><MerchantBankDetailInfoForm data={data} /></TabPane>
    </Tabs>
  );
}

MerchantInfoTable.propTypes = {
  data: PropTypes.object,
  industryList: PropTypes.array,
};

MerchantInfoTable.defaultProps = {
  data: {},
  industryList: [],
}

export default MerchantInfoTable;
