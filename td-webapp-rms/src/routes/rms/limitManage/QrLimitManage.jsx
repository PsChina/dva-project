import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import QrLimitQueryForm from '../../../components/business/rms/qr/QrLimitQueryForm';
import QrLimitPageTable from '../../../components/business/rms/qr/QrLimitPageTable';
import QrLimitInfoForm from '../../../components/business/rms/qr/QrLimitInfoForm';
import QrLimitInfoTable from '../../../components/business/rms/qr/QrLimitInfoTable';
import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const QrLimitManage = ({ dispatch, qrLimitManage }) => {
  const objectid = 'qrId';
  const bizMap = i18n.bizMap('rms/qrLimit');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage, tableSelects,
    addModalVisible, updateModalVisible, addFormSubmit, updateFormSubmit, addFormData, updateFormData,
    infoModalVisible, infoTableData,
    miniFormTableParam, miniFormTableLoading, miniFormTableList, miniFormTableTotal, miniFormTableCurrentPage, miniFormVisible,
  } = qrLimitManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }
  const cardProps = {
    title: bizMap.qrLimitManage,
    style: { width: '100%' },
  };
  const queryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'qrLimitManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    addClick: () => {
      dispatch({
        type: 'qrLimitManage/toggleModal',
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
            type: 'qrLimitManage/deleteList',
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
            type: 'qrLimitManage/updateStatus',
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
            type: 'qrLimitManage/updateStatus',
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
        type: 'qrLimitManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'qrLimitManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'qrLimitManage/toggleModal',
        payload: { type: 'info', data: record },
      });
    },
    handleUpdateClick(record) {
      dispatch({
        type: 'qrLimitManage/toggleModal',
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
        type: 'qrLimitManage/toggleModal',
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
        type: 'qrLimitManage/toggleModal',
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
        type: 'qrLimitManage/toggleModal',
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
        type: 'qrLimitManage/addOne',
        payload: { ...dat },
      });
    },
    tablePageChange(next) {
      dispatch({
        type: 'qrLimitManage/queryQrList',
        payload: { miniFormTableParam: { ...miniFormTableParam, currentPage: next } },
      });
    },
    rowClickCallback(data) {
      const dat = addFormData;
      dat.qrId = data.qrId;
      dat.qrName = data.qrName;
      dat.agtId = data.agtId;
      dat.ccy = data.ccy;
      dispatch({
        type: 'qrLimitManage/toggleModal',
        payload: { type: 'qr', data: dat },
      });
    },
    toggleQrTable(formData) {
      dispatch({
        type: 'qrLimitManage/toggleModal',
        payload: { type: 'qr', data: formData },
      });
    },
    queryQrList(dat) {
      dispatch({
        type: 'qrLimitManage/queryQrList',
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
        type: 'qrLimitManage/updateOne',
        payload: { ...dat },
      });
    },
  };
  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  // const AddFormGen = () => <QrLimitInfoForm {...addFormProps} />;
  const UpdateFormGen = () => <QrLimitInfoForm {...updateFormProps} />;
  return (
    <div>
      <Card {...cardProps}>
        <QrLimitQueryForm {...queryFormProps} />
        <QrLimitPageTable {...tableProps} />
      </Card>
      <Modal {...addModalProps}>
        <QrLimitInfoForm {...addFormProps} />
      </Modal>
      <Modal {...updateModalProps}>
        <UpdateFormGen />
      </Modal>
      <Modal {...infoModalProps}>
        <QrLimitInfoTable {...infoTableProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ qrLimitManage }) {
  return { qrLimitManage };
}

export default connect(mapStateToProps)(QrLimitManage);
