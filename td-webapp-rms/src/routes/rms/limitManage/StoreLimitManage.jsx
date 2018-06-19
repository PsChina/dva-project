import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import StoreLimitQueryForm from '../../../components/business/rms/store/StoreLimitQueryForm';
import StoreLimitPageTable from '../../../components/business/rms/store/StoreLimitPageTable';
import StoreLimitInfoForm from '../../../components/business/rms/store/StoreLimitInfoForm';
import StoreLimitInfoTable from '../../../components/business/rms/store/StoreLimitInfoTable';
import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const StoreLimitManage = ({ dispatch, storeLimitManage }) => {
  const objectid = 'braId';
  const bizMap = i18n.bizMap('rms/storeLimit');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage, tableSelects,
    addModalVisible, updateModalVisible, addFormSubmit, updateFormSubmit, addFormData, updateFormData,
    infoModalVisible, infoTableData,
    miniFormTableParam, miniFormTableLoading, miniFormTableList, miniFormTableTotal, miniFormTableCurrentPage, miniFormVisible,
  } = storeLimitManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }
  const cardProps = {
    title: bizMap.storeLimitManage,
    style: { width: '100%' },
  };
  const queryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'storeLimitManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    addClick: () => {
      dispatch({
        type: 'storeLimitManage/toggleModal',
        payload: { type: 'add' },
      });
    },
    deleteClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        for (let i = 0; i < tableSelects.length; i++) {
          if (tableSelects[i].usrStatus === '1') {
            callNotice(commonMap.warning, commonMap.enaleNotice, 'warning');
            return;
          }
        }
        callConfirm(commonMap.tip, commonMap.deleteConfirm, () => {
          dispatch({
            type: 'storeLimitManage/deleteList',
            payload: { ids: selectIds.toString() },
          });
        });
      }
    },
    enableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        const limitStatus = tableSelects[0].limitStatus;
        for (let i = 0; i < tableSelects.length; i++) {
          if (limitStatus !== tableSelects[i].limitStatus) {
            callNotice(commonMap.warning, bizMap.statusNotMatch, 'warning');
            return;
          }
          if (tableSelects[i].limitStatus !== '0' && tableSelects[i].limitStatus !== '1') {
            callNotice(commonMap.warning, bizMap.programErr, 'warning');
            return;
          }
        }
        if (limitStatus === '1') {
          callNotice(commonMap.warning, commonMap.enaleNotice, 'warning');
          return;
        }
        callConfirm(commonMap.tip, commonMap.enableConfirm, () => {
          dispatch({
            type: 'storeLimitManage/updateStatus',
            payload: { ids: selectIds.toString(), limitStatus: '1' },
          });
        });
      }
    },
    disableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        const limitStatus = tableSelects[0].limitStatus;
        for (let i = 0; i < tableSelects.length; i++) {
          if (limitStatus !== tableSelects[i].limitStatus) {
            callNotice(commonMap.warning, bizMap.statusNotMatch, 'warning');
            return;
          }
          if (tableSelects[i].limitStatus !== '0' && tableSelects[i].limitStatus !== '1') {
            callNotice(commonMap.warning, bizMap.programErr, 'warning');
            return;
          }
        }
        if (limitStatus === '0') {
          callNotice(commonMap.warning, commonMap.disableNotice, 'warning');
          return;
        }
        callConfirm(commonMap.tip, commonMap.disableConfirm, () => {
          dispatch({
            type: 'storeLimitManage/updateStatus',
            payload: { ids: selectIds.toString(), limitStatus: '0' },
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
        type: 'storeLimitManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'storeLimitManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'storeLimitManage/toggleModal',
        payload: { type: 'info', data: record },
      });
    },
    handleUpdateClick(record) {
      dispatch({
        type: 'storeLimitManage/toggleModal',
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
        type: 'storeLimitManage/toggleModal',
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
        type: 'storeLimitManage/toggleModal',
        payload: { type: 'add', data: {} },
      });
    },
  };
  const updateModalProps = {
    footer: null,
    title: commonMap.update,
    visible: updateModalVisible,
    onCancel: () => {
      dispatch({
        type: 'storeLimitManage/toggleModal',
        payload: { type: 'update', data: {} },
      });
    },
  };
  const addFormProps = {
    miniFormVisible,
    tableList: miniFormTableList,
    tableLoading: miniFormTableLoading,
    tableTotal: miniFormTableTotal,
    tableCurrentPage: miniFormTableCurrentPage,
    data: addFormData,
    submiting: addFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'storeLimitManage/addOne',
        payload: { ...dat },
      });
    },
    tablePageChange(next) {
      dispatch({
        type: 'storeLimitManage/queryStoreList',
        payload: { miniFormTableParam: { ...miniFormTableParam, currentPage: next } },
      });
    },
    rowClickCallback(data) {
      const dat = addFormData;
      dat.braId = data.braId;
      dat.braName = data.braName;
      dat.merId = data.merId;
      dat.ccy = data.ccy;
      dispatch({
        type: 'storeLimitManage/toggleModal',
        payload: { type: 'store', data: dat },
      });
    },
    toggleStoreTable(formData) {
      dispatch({
        type: 'storeLimitManage/toggleModal',
        payload: { type: 'store', data: formData },
      });
    },
    queryStoreList(dat) {
      dispatch({
        type: 'storeLimitManage/queryStoreList',
        payload: { miniFormTableParam: { ...dat, currentPage: 1 } },
      });
    },
  };
  const updateFormProps = {
    data: updateFormData,
    submiting: updateFormSubmit,
    type: 'update',
    formSubmit: (dat) => {
      dispatch({
        type: 'storeLimitManage/updateOne',
        payload: { ...dat },
      });
    },
  };
  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  // const AddFormGen = () => <StoreLimitInfoForm {...addFormProps} />;
  const UpdateFormGen = () => <StoreLimitInfoForm {...updateFormProps} />;
  return (
    <div>
      <Card {...cardProps}>
        <StoreLimitQueryForm {...queryFormProps} />
        <StoreLimitPageTable {...tableProps} />
      </Card>
      <Modal {...addModalProps}>
        <StoreLimitInfoForm {...addFormProps} />
      </Modal>
      <Modal {...updateModalProps}>
        <UpdateFormGen />
      </Modal>
      <Modal {...infoModalProps}>
        <StoreLimitInfoTable {...infoTableProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ storeLimitManage }) {
  return { storeLimitManage };
}

export default connect(mapStateToProps)(StoreLimitManage);
