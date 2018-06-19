import React from 'react';
import { connect } from 'dva';
import { Card, Tabs } from 'antd';
import * as i18n from '../../../utils/i18n';
import MerchantScancodeDroInfoForm from '../../../components/business/pms/merchantScancode/MerchantScancodeDroInfoForm';
import MerchantTransferApplyInfoForm from '../../../components/business/pms/merchantTransfer/MerchantTransferInfoForm';

const TabPane = Tabs.TabPane;

const MerchantTransferApply = ({ dispatch, merchantTransferApply }) => {
  const bizMap = i18n.bizMap('pms/merchantTransfer');
  const {
    chnList,
    advExpand,
    filePath,
    droSubmit,
    submiting,
    linkType,
    scanType,
    chnType,
  } = merchantTransferApply;

  const cardProps = {
    title: bizMap.merchantTransferApply,
    style: { width: '100%', margin: 'auto', marginTop: 24 },
  };

  const scancodeApplyInfoProps = {
    style: { width: 848, margin: 'auto', marginTop: 24 },
    chnList: chnList,
    advExpand: advExpand,
    submiting: submiting,
    linkType: linkType,
    chnType: chnType,
    scanType: scanType,
    formSubmit: (dat) => {
      dispatch({
        type: 'merchantTransferApply/addOne',
        payload: { formData: dat },
      });
    },
    advLinkClick: () => {
      dispatch({
        type: 'merchantTransferApply/toggleAdvExpand',
        payload: {},
      });
    },

    getChnInfo: (dat) => {
      dispatch({
        type: 'merchantTransferApply/updateState',
        payload: { chnType: dat.chnType, scanType: dat.scanType },
      });
    },

    handlerTransfer: (authData) => {
      dispatch({
        type: 'merchantTransferApply/handlerTransfer',
        payload: { data: { authData } },
      });
    },
  };

  const droFormProps = {
    style: { width: 848, margin: 'auto', marginTop: 24 },
    chnList: chnList,
    filePath: filePath,
    submiting: droSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'merchantTransferApply/addBatch',
        payload: { formData: dat },
      });
    },

    changeFileData(filePath) {
      dispatch({
        type: 'merchantTransferApply/changeFileData',
        payload: { data: filePath },
      });
    },
  };

  return (
    <div>
      <Card {...cardProps}>
        <MerchantTransferApplyInfoForm {...scancodeApplyInfoProps} />
      </Card>
    </div>
  );
};

function mapStateToProps({ merchantTransferApply }) {
  return { merchantTransferApply };
}

export default connect(mapStateToProps)(MerchantTransferApply);
