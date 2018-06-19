import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import TerminalAppQueryForm from '../../../components/business/tms/app/TerminalAppQueryForm';
import TerminalAppPageTable from '../../../components/business/tms/app/TerminalAppPageTable';
import TerminalAppInfoForm from '../../../components/business/tms/app/TerminalAppInfoForm';
import TerminalAppInfoTable from '../../../components/business/tms/app/TerminalAppInfoTable';
import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const TerminalAppManage = ({ dispatch, terminalAppManage }) => {
  const objectid = 'appId';
  const bizMap = i18n.bizMap('tms/terminalApp');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableSelects,
    addModalVisible, updateModalVisible, addFormSubmit, updateFormSubmit, addFormData, updateFormData,
    infoModalVisible, infoTableData, tableCurrentPage, advExpand, uploadFormData, uploadModalVisible, uploadFormSubmit,
    miniFormTableParam, miniFormTableLoading, miniFormTableList, miniFormTableTotal, miniFormTableCurrentPage, miniFormVisible,
  } = terminalAppManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }

  const cardProps = {
    title: bizMap.terminalApp,
    style: { width: '100%' },
  };
  const queryFormProps = {
    advExpand,
    collapseClick: () => {
      dispatch({
        type: 'terminalAppManage/toggleAdvExpand',
      });
    },
    formSubmit: (dat) => {
      dispatch({
        type: 'terminalAppManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    addClick: () => {
      dispatch({
        type: 'terminalAppManage/toggleModal',
        payload: { type: 'add' },
      });
    },
    deleteClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        callConfirm(commonMap.tip, commonMap.deleteConfirm, () => {
          dispatch({
            type: 'terminalAppManage/deleteList',
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
        type: 'terminalAppManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'terminalAppManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'terminalAppManage/toggleModal',
        payload: { type: 'info', data: record },
      });
    },
    handleUpdateClick(record) {
      dispatch({
        type: 'terminalAppManage/toggleModal',
        payload: { type: 'update', data: record },
      });
    },
    handleUploadClick(record) {
      dispatch({
        type: 'terminalAppManage/toggleModal',
        payload: { type: 'upload', data: record },
      });
    },

  };
  const infoModalProps = {
    width: 720,
    footer: null,
    title: commonMap.detail,
    visible: infoModalVisible,
    onCancel: () => {
      dispatch({
        type: 'terminalAppManage/toggleModal',
        payload: { type: 'info', data: {} },
      });
    },
  };
  const infoTableProps = {
    data: infoTableData,
  };
  const addModalProps = {
    width: 720,
    footer: null,
    title: commonMap.add,
    visible: addModalVisible,
    onCancel: () => {
      dispatch({
        type: 'terminalAppManage/toggleModal',
        payload: { type: 'add', data: {}, filePathList: [], appFilePath: '', logoFilePath: '', previewImage: '' },
      });
    },
  };
  const uploadModalProps = {
    footer: null,
    title: commonMap.reUpload,
    visible: uploadModalVisible,
    onCancel: () => {
      dispatch({
        type: 'terminalAppManage/toggleModal',
        payload: { type: 'upload', data: {} },
      });
    },
  };
  const updateModalProps = {
    width: 720,
    footer: null,
    title: commonMap.update,
    visible: updateModalVisible,
    onCancel: () => {
      dispatch({
        type: 'terminalAppManage/toggleModal',
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
    type: 'add',
    data: addFormData,
    submiting: addFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'terminalAppManage/addOne',
        payload: { ...dat },
      });
    },
    tablePageChange(next) {
      dispatch({
        type: 'terminalAppManage/queryTerModNoList',
        payload: { miniFormTableParam: { ...miniFormTableParam, currentPage: next } },
      });
    },
    rowClickCallback(data) {
      const dat = addFormData;
      dat.terModId = data.terModId;
      dat.terModNo = data.terModNo;
      dispatch({
        type: 'terminalAppManage/toggleModal',
        payload: { type: 'ter', data: dat },
      });
    },
    toggleTerModNoTable(formData) {
      dispatch({
        type: 'terminalAppManage/toggleModal',
        payload: { type: 'ter', data: formData },
      });
    },
    queryTerModNoList(dat) {
      dispatch({
        type: 'terminalAppManage/queryTerModNoList',
        payload: { miniFormTableParam: { ...dat, currentPage: 1 } },
      });
    },
  };
  const uploadFormProps = {
    type: 'upload',
    data: uploadFormData,
    submiting: uploadFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'terminalAppManage/upload',
        payload: { ...dat },
      });
    },
  };
  const updateFormProps = {
    type: 'update',
    data: updateFormData,
    submiting: updateFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'terminalAppManage/updateOne',
        payload: { ...dat },
      });
    },
  };
  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  const AddFormGen = () => <TerminalAppInfoForm {...addFormProps} />;
  const UpdateFormGen = () => <TerminalAppInfoForm {...updateFormProps} />;
  const UploadFormGen = () => <TerminalAppInfoForm {...uploadFormProps} />;
  return (
    <div>
      <Card {...cardProps}>
        <TerminalAppQueryForm {...queryFormProps} />
        <TerminalAppPageTable {...tableProps} />
      </Card>
      <Modal {...addModalProps}>
        <AddFormGen />
      </Modal>
      <Modal {...updateModalProps}>
        <UpdateFormGen />
      </Modal>
      <Modal {...uploadModalProps}>
        <UploadFormGen />
      </Modal>
      <Modal {...infoModalProps}>
        <TerminalAppInfoTable {...infoTableProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ terminalAppManage }) {
  return { terminalAppManage };
}

export default connect(mapStateToProps)(TerminalAppManage);
