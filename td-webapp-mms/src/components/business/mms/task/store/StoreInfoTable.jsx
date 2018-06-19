import React, { PropTypes } from 'react';
import { Tabs } from 'antd';
import * as i18n from '../../../../../utils/i18n';
import MerchantStoreBaseDetailInfoForm from '../../merchantStore/infoForm/MerchantStoreBaseDetailInfoForm';
import MerchantStoreAttachDetailForm from '../../merchantStore/infoForm/MerchantStoreAttachDetailForm';

const TabPane = Tabs.TabPane;
const StoreInfoTable = (props) => {
  const bizMap = i18n.bizMap('mms/merchantStore');
  const { data } = props;
  return (
    <Tabs defaultActiveKey="1" >
      <TabPane tab={bizMap.baseInfo} key="1"><MerchantStoreBaseDetailInfoForm data={data} /></TabPane>
      <TabPane tab={bizMap.attachInfo} key="2"><MerchantStoreAttachDetailForm data={data} /></TabPane>
    </Tabs>
  );
}

StoreInfoTable.propTypes = {
  data: PropTypes.object,
};

StoreInfoTable.defaultProps = {
  data: {},
}

export default StoreInfoTable;
