import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import * as i18n from '../../../utils/i18n';
import ChannelBankcardInfoForm from '../../../components/business/pms/bankcard/ChannelBankcardInfoForm';
import ChannelBankcardAuthInfoForm from '../../../components/business/pms/bankcard/ChannelBankcardAuthInfoForm';

const ChannelBankcardApply = ({ dispatch, channelBankcardApply }) => {
  const bizMap = i18n.bizMap('pms/channelBankcard');
  const {
    formData,
    advExpand,
    submiting,
    authModalVisible,
    updateFormData,
    pospayTxnSup,
    bankList,
    bankNo,
    chnNameChkMsg,
  } = channelBankcardApply;

  const cardProps = {
    title: bizMap.channelBankcardApply,
    style: { width: '100%' },
  };

  const bankcardApplyInfoProps = {
    style: { width: 848, margin: 'auto', marginTop: 24 },
    data: formData,
    advExpand: advExpand,
    submiting: submiting,
    bankList: bankList,
    bankNo: bankNo,
    pospayTxnSup: pospayTxnSup,
    chnNameChkMsg: chnNameChkMsg,
    optType: '1',
    limitData: {},
    handleTxnSup: () => {
      dispatch({
        type: 'channelBankcardApply/toggleAuthExpand',
        payload: { fPospayTxnSup: '11111111111111', pospayTxnSup: '11111111111111' },
      });
    },
    formSubmit: (dat) => {
      dispatch({
        type: 'channelBankcardApply/addOne',
        payload: { formData: dat },
      });
    },
    advLinkClick: () => {
      dispatch({
        type: 'channelBankcardApply/toggleAdvExpand',
        payload: {},
      });
    },
    checkChnName: (dat) => {
      dispatch({
        type: 'channelBankcardApply/checkChnName',
        payload: { chnName: dat },
      });
    },
    getChnInfo: (dat) => {
      dispatch({
        type: 'channelBankcardApply/updateState',
        payload: { bankNo: dat.bankNo },
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
        type: 'channelBankcardApply/updateState',
        payload: { authModalVisible: !authModalVisible },
      });
    },
  };

  const authFormProps = {
    data: updateFormData,
    submiting: false,
    formSubmit: (dat) => {
      dispatch({
        type: 'channelBankcardApply/updateState',
        payload: { authModalVisible: !authModalVisible, pospayTxnSup: dat.pospayTxnSup },
      });
    },
    changeAuthData: (authData) => {
      dispatch({
        type: 'channelBankcardApply/changeAuthData',
        payload: { data: { authData } },
      });
    },
  };

  return (
    <div>
      <Card {...cardProps}>
        <ChannelBankcardInfoForm {...bankcardApplyInfoProps} />
      </Card>
      <Modal {...txnModalProps}>
        <ChannelBankcardAuthInfoForm {...authFormProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ channelBankcardApply }) {
  return { channelBankcardApply };
}

export default connect(mapStateToProps)(ChannelBankcardApply);
