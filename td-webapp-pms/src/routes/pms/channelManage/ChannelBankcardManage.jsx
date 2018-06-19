import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import * as i18n from '../../../utils/i18n';
import { callNotice, callConfirm } from '../../../utils/alert';
import ChannelBankcardQueryForm from '../../../components/business/pms/temp/channel/ChannelQueryForm';
import ChannelBankcardPageTable from '../../../components/business/pms/bankcard/ChannelBankcardPageTable';
import ChannelBankcardInfoTable from '../../../components/business/pms/bankcard/ChannelBankcardInfoTable';
import ChannelBankcardInfoForm from '../../../components/business/pms/bankcard/ChannelBankcardInfoForm';
import ChannelBankcardAuthInfoForm from '../../../components/business/pms/bankcard/ChannelBankcardAuthInfoForm';

const ChannelBankcardManage = ({ dispatch, channelBankcardManage }) => {
  const objectid = 'chnId';
  const bizMap = i18n.bizMap('pms/channelBankcard');
  const commonMap = i18n.commonMap();
  const {
    tableList,
    tableLoading,
    tableTotal,
    tableParam,
    tableSelects,
    tableCurrentPage,

    infoModalVisible,
    infoTableData,

    advExpand,
    updateModalVisible,
    updateFormData,
    updateFormSubmit,

    authUpdModalVisible,
    authUpdFormData,
    authUpdFormSubmit,
    chnId,
  } = channelBankcardManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }
  const cardProps = {
    title: bizMap.channelBankcard,
    style: { width: '100%' },
  };
  const queryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'channelBankcardManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    enableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        const chnStatus = tableSelects[0].chnStatus;
        for (let i = 0; i < tableSelects.length; i++) {
          if (chnStatus !== tableSelects[i].chnStatus) {
            callNotice(commonMap.warning, bizMap.statusNotMatch, 'warning');
            return;
          }
          if (tableSelects[i].chnStatus !== '0' && tableSelects[i].chnStatus !== '1') {
            callNotice(commonMap.warning, bizMap.programErr, 'warning');
            return;
          }
        }
        if (chnStatus === '1') {
          callNotice(commonMap.warning, commonMap.enaleNotice, 'warning');
          return;
        }
        callConfirm(commonMap.tip, commonMap.enableConfirm, () => {
          dispatch({
            type: 'channelBankcardManage/updateStatus',
            payload: { ids: selectIds.toString(), chnStatus: '1' },
          });
        });
      }
    },
    disableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        const chnStatus = tableSelects[0].chnStatus;
        for (let i = 0; i < tableSelects.length; i++) {
          if (chnStatus !== tableSelects[i].chnStatus) {
            callNotice(commonMap.warning, bizMap.statusNotMatch, 'warning');
            return;
          }
          if (tableSelects[i].chnStatus !== '0' && tableSelects[i].chnStatus !== '1') {
            callNotice(commonMap.warning, bizMap.programErr, 'warning');
            return;
          }
        }
        if (chnStatus === '0') {
          callNotice(commonMap.warning, commonMap.disableNotice, 'warning');
          return;
        }
        callConfirm(commonMap.tip, commonMap.disableConfirm, () => {
          dispatch({
            type: 'channelBankcardManage/updateStatus',
            payload: { ids: selectIds.toString(), chnStatus: '0' },
          });
        });
      }
    },
    deleteClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        // 判断所选渠道是否已经被禁用
        for (let i = 0; i < tableSelects.length; i++) {
          if (tableSelects[i].chnStatus === '1') {
            callNotice(commonMap.warning, bizMap.exitEnable, 'warning');
            return;
          }
          if (tableSelects[i].chnStatus !== '0' && tableSelects[i].chnStatus !== '1') {
            callNotice(commonMap.warning, bizMap.programErr, 'warning');
            return;
          }
        }
        callConfirm(commonMap.tip, commonMap.deleteConfirm, () => {
          dispatch({
            type: 'channelBankcardManage/deleteList',
            payload: { ids: selectIds.toString() },
          });
        });
      }
    },
  };
  const tableProps = {
    tableList,
    tableLoading,
    tableTotal,
    tableCurrentPage,
    tablePageChange(next) {
      dispatch({
        type: 'channelBankcardManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'channelBankcardManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'channelBankcardManage/toggleModal',
        payload: { type: 'info', data: record },
      });
    },
    handleUpdateClick(record) {
      const data = Object.assign({}, { ...record });
      dispatch({
        type: 'channelBankcardManage/toggleModal',
        payload: { type: 'update', data: data },
      });
    },
    handleTxnUpdateClick: (record) => {
      dispatch({
        type: 'channelBankcardManage/toggleAuthExpand',
        payload: { fPospayTxnSup: '11111111111111', pospayTxnSup: record.pospayTxnSup, chnId: record.chnId },
      });
    },
  };
  const infoModalProps = {
    footer: null,
    title: commonMap.detail,
    visible: infoModalVisible,
    onCancel: () => {
      dispatch({
        type: 'channelBankcardManage/toggleModal',
        payload: { type: 'info', data: {} },
      });
    },
  };
  const infoTableProps = {
    data: infoTableData,
  };
  const updateModalProps = {
    footer: null,
    title: commonMap.update,
    visible: updateModalVisible,
    width: 800,
    onCancel: () => {
      dispatch({
        type: 'channelBankcardManage/toggleModal',
        payload: { type: 'update', data: {} },
      });
    },
  };

  const updateFormProps = {
    data: updateFormData,
    submiting: updateFormSubmit,
    advExpand: advExpand,
    optType: '2',
    formSubmit: (dat) => {
      dispatch({
        type: 'channelBankcardManage/updateOne',
        payload: { ...dat },
      });
    },
    advLinkClick: () => {
      dispatch({
        type: 'channelBankcardManage/updateState',
        payload: { advExpand: !advExpand },
      });
    },
  };

  const authUpdModalProps = {
    footer: null,
    width: 880,
    title: bizMap.bankcardTxnAuth,
    visible: authUpdModalVisible,
    onCancel: () => {
      dispatch({
        type: 'channelBankcardManage/updateState',
        payload: { authUpdModalVisible: !authUpdModalVisible },
      });
    },
  };

  const authUpdFormProps = {
    data: authUpdFormData,
    submiting: authUpdFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'channelBankcardManage/updAuthInfo',
        payload: { ...dat, chnId: chnId },
      });
    },
    changeAuthData: (authData) => {
      dispatch({
        type: 'channelBankcardApply/changeAuthData',
        payload: { data: { authData } },
      });
    },
  };

  const UpdateFormGen = () => <ChannelBankcardInfoForm {...updateFormProps} />
  const AuthUpdFormGen = () => <ChannelBankcardAuthInfoForm {...authUpdFormProps} />
  return (
    <div>
      <Card {...cardProps}>
        <ChannelBankcardQueryForm {...queryFormProps} />
        <ChannelBankcardPageTable {...tableProps} />
      </Card>
      <Modal {...infoModalProps}>
        <ChannelBankcardInfoTable {...infoTableProps} />
      </Modal>
      <Modal {...updateModalProps}>
        <UpdateFormGen />
      </Modal>
      <Modal {...authUpdModalProps}>
        <AuthUpdFormGen />
      </Modal>
    </div>
  );
};

function mapStateToProps({ channelBankcardManage }) {
  return { channelBankcardManage };
}

export default connect(mapStateToProps)(ChannelBankcardManage);
