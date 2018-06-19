import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import MerLimitQueryForm from '../../../components/business/rms/mer/MerLimitQueryForm';
import MerLimitPageTable from '../../../components/business/rms/mer/MerLimitPageTable';
import MerLimitInfoForm from '../../../components/business/rms/mer/MerLimitInfoForm';
import MerLimitInfoTable from '../../../components/business/rms/mer/MerLimitInfoTable';
import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const MerLimitManage = ({ dispatch, merLimitManage }) => {
  const objectid = 'merId';
  const bizMap = i18n.bizMap('rms/merLimit');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage, tableSelects,
    addModalVisible, updateModalVisible, addFormSubmit, updateFormSubmit, addFormData, updateFormData,
    infoModalVisible, infoTableData,
    miniFormTableParam, miniFormTableLoading, miniFormTableList, miniFormTableTotal, miniFormTableCurrentPage, miniFormVisible,
  } = merLimitManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }
  const cardProps = {
    title: bizMap.merLimitManage,
    style: { width: '100%' },
  };
  const queryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'merLimitManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    addClick: () => {
      dispatch({
        type: 'merLimitManage/toggleModal',
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
            type: 'merLimitManage/deleteList',
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
            type: 'merLimitManage/updateStatus',
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
            type: 'merLimitManage/updateStatus',
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
        type: 'merLimitManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'merLimitManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'merLimitManage/toggleModal',
        payload: { type: 'info', data: record },
      });
    },
    handleUpdateClick(record) {
      dispatch({
        type: 'merLimitManage/toggleModal',
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
        type: 'merLimitManage/toggleModal',
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
        type: 'merLimitManage/toggleModal',
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
        type: 'merLimitManage/toggleModal',
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
        type: 'merLimitManage/addOne',
        payload: { ...dat },
      });
    },
    tablePageChange(next) {
      dispatch({
        type: 'merLimitManage/queryMerList',
        payload: { miniFormTableParam: { ...miniFormTableParam, currentPage: next } },
      });
    },
    rowClickCallback(data) {
      const dat = addFormData;
      dat.merId = data.merId;
      dat.merName = data.merName;
      dat.agtId = data.agtId;
      dat.ccy = data.ccy;
      dispatch({
        type: 'merLimitManage/toggleModal',
        payload: { type: 'mer', data: dat },
      });
    },
    toggleMerTable(formData) {
      dispatch({
        type: 'merLimitManage/toggleModal',
        payload: { type: 'mer', data: formData },
      });
    },
    queryMerList(dat) {
      dispatch({
        type: 'merLimitManage/queryMerList',
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
        type: 'merLimitManage/updateOne',
        payload: { ...dat },
      });
    },
  };
  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  // const AddFormGen = () => <MerLimitInfoForm {...addFormProps} />;
  const UpdateFormGen = () => <MerLimitInfoForm {...updateFormProps} />;
  return (
    <div>
      <Card {...cardProps}>
        <MerLimitQueryForm {...queryFormProps} />
        <MerLimitPageTable {...tableProps} />
      </Card>
      <Modal {...addModalProps}>
        <MerLimitInfoForm {...addFormProps} />
      </Modal>
      <Modal {...updateModalProps}>
        <UpdateFormGen />
      </Modal>
      <Modal {...infoModalProps}>
        <MerLimitInfoTable {...infoTableProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ merLimitManage }) {
  return { merLimitManage };
}

export default connect(mapStateToProps)(MerLimitManage);
