import React from 'react';
import { connect } from 'dva';
import { Card, Tabs, Modal } from 'antd';
import * as i18n from '../../../utils/i18n';
import MerchantBankcardDroInfoForm from '../../../components/business/pms/merchantBankcard/MerchantBankcardDroInfoForm';
import MerchantBankcardInfoForm from '../../../components/business/pms/merchantBankcard/MerchantBankcardInfoForm';
import MerchantBankcardAuthInfoForm from '../../../components/business/pms/merchantBankcard/MerchantBankcardAuthInfoForm';
import txnChannelList from '../../../../config/i18n/zh-cn/pms/txnChannelBankcard.json';

const TabPane = Tabs.TabPane;

const MerchantBankcardApply = ({ dispatch, merchantBankcardApply }) => {
  const bizMap = i18n.bizMap('pms/merchantBankcard');
  const {
    advExpand,

    chnList,
    uuid,
    keys,

    authModalVisible,
    pospayTxnSup,
    updateFormData,

    data,
    chnMerNoChkMsg,

    submit,

    filePath,
    droSubmit,
    txnChannelSupportList,
  } = merchantBankcardApply;

  const cardProps = {
    title: bizMap.merchantBankcardApply,
    style: { width: '100%' },
  };

  const bankcardApplyInfoProps = {
    style: { width: 848, margin: 'auto', marginTop: 24 },
    chnList: chnList,
    uuid: uuid,
    data: data,
    chnMerNoChkMsg: chnMerNoChkMsg,
    advExpand: advExpand,
    optType: '1',
    keys: keys,
    pospayTxnSup: pospayTxnSup,
    submiting: submit,
    txnChannelSupportList,
    changeUuid: (uuid, keys, opt) => {
      let id = 0;
      let keyArr = [0];
      if (opt === 'add') {
        id = uuid + 1;
        keyArr = keys.concat(id);
      } else {
        id = uuid - 1;
        keyArr = keys;
      }
      dispatch({
        type: 'merchantBankcardApply/updateState',
        payload: { uuid: id, keys: keyArr },
      });
    },
    formSubmit: (dat) => {
      dispatch({
        type: 'merchantBankcardApply/addOne',
        payload: { formData: dat },
      });
    },
    getChnInfo: (dat) => {
      dispatch({
        type: 'merchantBankcardApply/toggleAuthExpand',
        payload: { pospayTxnSup: dat.pospayTxnSup, fPospayTxnSup: dat.pospayTxnSup },
      });
    },
    toggleTxnAuth: () => {
      dispatch({
        type: 'merchantBankcardApply/updateState',
        payload: { authModalVisible: true },
      });
    },
    advLinkClick: () => {
      dispatch({
        type: 'merchantBankcardApply/toggleAdvExpand',
        payload: {},
      });
    },
    checkChnMerNo: (dat) => {
      dispatch({
        type: 'merchantBankcardApply/checkChnMerNo',
        payload: { ...dat },
      });
    },
    changeTxnChannelList: (dat) => {
      const tempList = [];
      if (dat) {
        tempList.push({
          value: dat,
        })
      }
      dispatch({
        type: 'merchantBankcardApply/updateState',
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
        type: 'merchantBankcardApply/addBatch',
        payload: { formData: dat },
      });
    },

    changeFileData(filePath) {
      dispatch({
        type: 'merchantBankcardApply/changeFileData',
        payload: { data: filePath },
      });
    },
  };

  const txnModalProps = {
    footer: null,
    width: 880,
    title: bizMap.bankcardTxnAuth,
    visible: authModalVisible,
    onCancel: () => {
      dispatch({
        type: 'merchantBankcardApply/updateState',
        payload: { authModalVisible: !authModalVisible },
      });
    },
  };

  const authFormProps = {
    data: updateFormData,
    submiting: false,
    formSubmit: (dat) => {
      dispatch({
        type: 'merchantBankcardApply/updateState',
        payload: { authModalVisible: !authModalVisible, pospayTxnSup: dat.pospayTxnSup },
      });
    },
    changeAuthData: (authData) => {
      dispatch({
        type: 'merchantBankcardApply/changeAuthData',
        payload: { data: { authData } },
      });
    },
  };

  return (
    <div>
      <Card {...cardProps}>
        <Tabs defaultActiveKey="1">
          <TabPane tab={bizMap['tab-1']} key="1"><MerchantBankcardInfoForm {...bankcardApplyInfoProps} /></TabPane>
          <TabPane tab={bizMap['tab-2']} key="2"><MerchantBankcardDroInfoForm {...droFormProps} /></TabPane>
        </Tabs>
      </Card>
      <Modal {...txnModalProps}>
        <MerchantBankcardAuthInfoForm {...authFormProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ merchantBankcardApply }) {
  return { merchantBankcardApply };
}

export default connect(mapStateToProps)(MerchantBankcardApply);
