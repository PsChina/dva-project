import React from 'react';
import { connect } from 'dva';
import { Card, Tabs } from 'antd';
import * as i18n from '../../../utils/i18n';
import MerchantScancodeDroInfoForm from '../../../components/business/pms/merchantScancode/MerchantScancodeDroInfoForm';
import MerchantScancodeApplyInfoForm from '../../../components/business/pms/merchantScancode/MerchantScancodeInfoForm';

const TabPane = Tabs.TabPane;

const MerchantScancodeApply = ({ dispatch, merchantScancodeApply }) => {
  const bizMap = i18n.bizMap('pms/merchantScancode');
  const {
    chnList,
    advExpand,
    filePath,
    droSubmit,
    submiting,
    linkType,
    scanType,
    txnChannelSupportList,
  } = merchantScancodeApply;

  const cardProps = {
    title: bizMap.merchantScancodeApply,
    style: { width: '100%', margin: 'auto', marginTop: 24 },
  };

  const scancodeApplyInfoProps = {
    style: { width: 848, margin: 'auto', marginTop: 24 },
    chnList: chnList,
    advExpand: advExpand,
    submiting: submiting,
    linkType: linkType,
    scanType: scanType,
    txnChannelSupportList,
    formSubmit: (dat) => {
      dispatch({
        type: 'merchantScancodeApply/addOne',
        payload: { formData: dat },
      });
    },
    advLinkClick: () => {
      dispatch({
        type: 'merchantScancodeApply/toggleAdvExpand',
        payload: {},
      });
    },

    getChnInfo: (dat) => {
      dispatch({
        type: 'merchantScancodeApply/updateState',
        payload: { linkType: dat.linkType, scanType: dat.scanType },
      });
    },

    changeTxnChannelList: (dat) => {
      let tempList = [];
      if ((typeof (dat) === 'string')) {
        tempList.push(dat)
      } else {
        tempList = [].concat(dat);
      }
      dispatch({
        type: 'merchantScancodeApply/updateState',
        payload: { txnChannelSupportList: tempList },
      })
    },
  };

  const droFormProps = {
    style: { width: 848, margin: 'auto', marginTop: 24 },
    chnList: chnList,
    filePath: filePath,
    submiting: droSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'merchantScancodeApply/addBatch',
        payload: { formData: dat },
      });
    },

    changeFileData(filePath) {
      dispatch({
        type: 'merchantScancodeApply/changeFileData',
        payload: { data: filePath },
      });
    },
  };

  return (
    <div>
      <Card {...cardProps}>
        <Tabs defaultActiveKey="1">
          <TabPane tab={bizMap['tab-1']} key="1"><MerchantScancodeApplyInfoForm {...scancodeApplyInfoProps} /></TabPane>
          <TabPane tab={bizMap['tab-2']} key="2"><MerchantScancodeDroInfoForm {...droFormProps} /></TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

function mapStateToProps({ merchantScancodeApply }) {
  return { merchantScancodeApply };
}

export default connect(mapStateToProps)(MerchantScancodeApply);
