import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import MccLimitQueryForm from '../../../components/business/rms/mcc/MccLimitQueryForm';
import MccLimitPageTable from '../../../components/business/rms/mcc/MccLimitPageTable';
import MccLimitInfoForm from '../../../components/business/rms/mcc/MccLimitInfoForm';
import MccLimitInfoTable from '../../../components/business/rms/mcc/MccLimitInfoTable';
import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const MccLimitManage = ({ dispatch, mccLimitManage }) => {
  const objectid = 'mccNo';
  const bizMap = i18n.bizMap('rms/mccLimit');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage, tableSelects,
    addModalVisible, updateModalVisible, addFormSubmit, updateFormSubmit, addFormData, updateFormData,
    infoModalVisible, infoTableData,
    miniFormTableParam, miniFormTableLoading, miniFormTableList, miniFormTableTotal, miniFormTableCurrentPage, miniFormVisible,
  } = mccLimitManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }
  const cardProps = {
    title: bizMap.mccLimitManage,
    style: { width: '100%' },
  };
  const queryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'mccLimitManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    addClick: () => {
      dispatch({
        type: 'mccLimitManage/toggleModal',
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
            type: 'mccLimitManage/deleteList',
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
            type: 'mccLimitManage/updateStatus',
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
            type: 'mccLimitManage/updateStatus',
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
        type: 'mccLimitManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'mccLimitManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'mccLimitManage/toggleModal',
        payload: { type: 'info', data: record },
      });
    },
    handleUpdateClick(record) {
      dispatch({
        type: 'mccLimitManage/toggleModal',
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
        type: 'mccLimitManage/toggleModal',
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
        type: 'mccLimitManage/toggleModal',
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
        type: 'mccLimitManage/toggleModal',
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
        type: 'mccLimitManage/addOne',
        payload: { ...dat },
      });
    },
    tablePageChange(next) {
      dispatch({
        type: 'mccLimitManage/queryMccList',
        payload: { miniFormTableParam: { ...miniFormTableParam, currentPage: next } },
      });
    },
    rowClickCallback(data) {
      const dat = addFormData;
      dat.mccNo = data.mccCode;
      dat.mccDesc = data.mccDesc;
      dat.ccy = 'CNY';
      dispatch({
        type: 'mccLimitManage/toggleModal',
        payload: { type: 'mcc', data: dat },
      });
    },
    toggleMccTable(formData) {
      dispatch({
        type: 'mccLimitManage/toggleModal',
        payload: { type: 'mcc', data: formData },
      });
    },
    queryMccList(dat) {
      dispatch({
        type: 'mccLimitManage/queryMccList',
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
        type: 'mccLimitManage/updateOne',
        payload: { ...dat },
      });
    },
  };
  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  // const AddFormGen = () => <MccLimitInfoForm {...addFormProps} />;
  const UpdateFormGen = () => <MccLimitInfoForm {...updateFormProps} />;
  return (
    <div>
      <Card {...cardProps}>
        <MccLimitQueryForm {...queryFormProps} />
        <MccLimitPageTable {...tableProps} />
      </Card>
      <Modal {...addModalProps}>
        <MccLimitInfoForm {...addFormProps} />
      </Modal>
      <Modal {...updateModalProps}>
        <UpdateFormGen />
      </Modal>
      <Modal {...infoModalProps}>
        <MccLimitInfoTable {...infoTableProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ mccLimitManage }) {
  return { mccLimitManage };
}

export default connect(mapStateToProps)(MccLimitManage);
