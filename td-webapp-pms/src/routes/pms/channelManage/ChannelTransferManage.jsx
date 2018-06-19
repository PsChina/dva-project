import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import ChannelTransferQueryForm from '../../../components/business/pms/temp/channel/ChannelQueryForm';
import ChannelTransferPageTable from '../../../components/business/pms/transfer/ChannelTransferPageTable';
import ChannelTransferInfoForm from '../../../components/business/pms/transfer/ChannelTransferApplyInfoForm';
import ChannelTransferInfoTable from '../../../components/business/pms/transfer/ChannelTransferInfoTable';
import ChannelTransferBankInfoFrom from '../../../components/business/pms/transfer/ChannelTransferBankInfoFrom';
import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const ChannelTransferManage = ({ dispatch, channelTransferManage }) => {
  const objectid = 'chnId';
  const bizMap = i18n.bizMap('pms/channelTransfer');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage, tableSelects,
    addModalVisible, updateModalVisible, addFormSubmit, updateFormSubmit, addFormData, updateFormData, authModalVisible,
    infoModalVisible, infoTableData,
  } = channelTransferManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }

  const cardProps = {
    title: bizMap.channelTransfer,
    style: { width: '100%' },
  };
  const queryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'channelTransferManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    addClick: () => {
      dispatch({
        type: 'channelTransferManage/toggleModal',
        payload: { type: 'add' },
      });
    },
    deleteClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        callConfirm(commonMap.tip, commonMap.deleteConfirm, () => {
          dispatch({
            type: 'channelTransferManage/deleteList',
            payload: { ids: selectIds.toString() },
          });
        });
      }
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
            type: 'channelTransferManage/updateStatus',
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
            type: 'channelTransferManage/updateStatus',
            payload: { ids: selectIds.toString(), chnStatus: '0' },
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
    tableParam,
    tablePageChange(next) {
      dispatch({
        type: 'channelTransferManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'channelTransferManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'channelTransferManage/toggleModal',
        payload: { type: 'info', data: record },
      });
    },
    handleUpdateClick(record) {
      dispatch({
        type: 'channelTransferManage/toggleModal',
        payload: { type: 'update', data: record },
      });
    },
    handleSetDefaultClick(record) {
      callConfirm(commonMap.tip, bizMap.setDefaultConfirm, () => {
        dispatch({
          type: 'channelTransferManage/setDefualt',
          payload: { data: record, tableParam: { ...tableParam, currentPage: 1 } },
        });
      });
    },
    handleBankClick: (record) => {
      dispatch({
        type: 'channelTransferManage/toggleAuthExpand',
        payload: { type: 'update', data: record },
      });
    },
  };
  const infoModalProps = {
    footer: null,
    title: commonMap.detail,
    visible: infoModalVisible,
    onCancel: () => {
      dispatch({
        type: 'channelTransferManage/toggleModal',
        payload: { type: 'info', data: {} },
      });
    },
  };
  const infoTableProps = {
    data: infoTableData,
  };
  const addModalProps = {
    footer: null,
    title: commonMap.add,
    visible: addModalVisible,
    onCancel: () => {
      dispatch({
        type: 'channelTransferManage/toggleModal',
        payload: { type: 'add', data: {} },
      });
    },
  };
  const updateModalProps = {
    footer: null,
    title: commonMap.update,
    width: 800,
    visible: updateModalVisible,
    onCancel: () => {
      dispatch({
        type: 'channelTransferManage/toggleModal',
        payload: { type: 'update', data: {} },
      });
    },
  };
  const addFormProps = {
    data: addFormData,
    submiting: addFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'channelTransferManage/addOne',
        payload: { ...dat },
      });
    },
  };
  const updateFormProps = {
    data: updateFormData,
    submiting: updateFormSubmit,
    optType: '2',
    formSubmit: (dat) => {
      dispatch({
        type: 'channelTransferManage/updateOne',
        payload: { ...dat },
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
        type: 'channelTransferManage/updateState',
        payload: { authModalVisible: !authModalVisible },
      });
    },
  };

  const authFormProps = {
    data: updateFormData,
    submiting: false,
    formSubmit: (dat) => {
      dispatch({
        type: 'channelTransferManage/updateBank',
        payload: { ...dat },
      });
    },
    changeData: (data) => {
      dispatch({
        type: 'channelTransferManage/updateState',
        payload: { updateFormData: data },
      });
    },
  };
  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  const AddFormGen = () => <ChannelTransferInfoForm {...addFormProps} />;
  const UpdateFormGen = () => <ChannelTransferInfoForm {...updateFormProps} />;
  return (
    <div>
      <Card {...cardProps}>
        <ChannelTransferQueryForm {...queryFormProps} />
        <ChannelTransferPageTable {...tableProps} />
      </Card>
      <Modal {...addModalProps}>
        <AddFormGen />
      </Modal>
      <Modal {...updateModalProps}>
        <UpdateFormGen />
      </Modal>
      <Modal {...infoModalProps}>
        <ChannelTransferInfoTable {...infoTableProps} />
      </Modal>
      <Modal {...txnModalProps}>
        <ChannelTransferBankInfoFrom {...authFormProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ channelTransferManage }) {
  return { channelTransferManage };
}

export default connect(mapStateToProps)(ChannelTransferManage);
