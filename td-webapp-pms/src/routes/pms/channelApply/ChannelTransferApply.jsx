import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import ChannelTransferApplyInfoForm from '../../../components/business/pms/transfer/ChannelTransferApplyInfoForm';
import ChannelTransferBankInfoFrom from '../../../components/business/pms/transfer/ChannelTransferBankInfoFrom';
import * as i18n from '../../../utils/i18n';

const ChannelTransferApply = ({ dispatch, channelTransferApply }) => {
  const bizMap = i18n.bizMap('pms/channelTransfer');
  const { formData, submiting, authModalVisible, updateFormData, bankList, bankNos, bankNo } = channelTransferApply;

  const cardProps = {
    title: bizMap.channelTransferApply,
    style: { width: '100%' },
  };

  const transferApplyInfoProps = {
    style: { width: 848, margin: 'auto', marginTop: 24 },
    data: formData,
    bankList: bankList,
    bankNos: bankNos,
    bankNo: bankNo,
    type: 'add',
    submiting: submiting,
    optType: '1',
    formSubmit: (dat) => {
      dispatch({
        type: 'channelTransferApply/addOne',
        payload: { formData: dat },
      });
    },
    handleTxnSup: () => {
      dispatch({
        type: 'channelTransferApply/toggleAuthExpand',
        payload: { type: 'update' },
      });
    },
    getChnInfo: (dat) => {
      dispatch({
        type: 'channelTransferApply/updateState',
        payload: { bankNo: dat.bankNo },
      });
    },
  };

  const txnModalProps = {
    width: 600,
    footer: null,
    title: bizMap.bankcardTxnAuth,
    visible: authModalVisible,
    onCancel: () => {
      dispatch({
        type: 'channelTransferApply/updateState',
        payload: { authModalVisible: !authModalVisible },
      });
    },
  };

  const authFormProps = {
    data: updateFormData,
    submiting: false,
    formSubmit: (dat) => {
      dispatch({
        type: 'channelTransferApply/updateState',
        payload: { authModalVisible: !authModalVisible, bankNos: dat.bankNos },
      });
    },
    changeData: (data) => {
      dispatch({
        type: 'channelTransferApply/updateState',
        payload: { updateFormData: data },
      });
    },
    handleCancel: () => {
      console.log('点击取消');
      dispatch({
        type: 'channelTransferApply/updateState',
        payload: { authModalVisible: !authModalVisible },
      });
    },
  };
  return (
    <div>
      <Card {...cardProps}>
        <ChannelTransferApplyInfoForm {...transferApplyInfoProps} />
      </Card>
      <Modal {...txnModalProps}>
        <ChannelTransferBankInfoFrom {...authFormProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ channelTransferApply }) {
  return { channelTransferApply };
}

export default connect(mapStateToProps)(ChannelTransferApply);
