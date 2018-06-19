import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import TerminalFirmwareQueryForm from '../../../components/business/tms/firmware/TerminalFirmwareQueryForm';
import TerminalFirmwarePageTable from '../../../components/business/tms/firmware/TerminalFirmwarePageTable';
import TerminalFirmwareInfoForm from '../../../components/business/tms/firmware/TerminalFirmwareInfoForm';
import TerminalFirmwareInfoTable from '../../../components/business/tms/firmware/TerminalFirmwareInfoTable';
import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const TerminalFirmwareManage = ({ dispatch, terminalFirmwareManage }) => {
  const objectid = 'verId';
  const bizMap = i18n.bizMap('tms/terminalFirmware');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableSelects,
    addModalVisible, updateModalVisible, addFormSubmit, updateFormSubmit, addFormData, updateFormData,
    infoModalVisible, infoTableData, companyOptionsData, modelOptionsData, tableCurrentPage,
    uploadFormData, uploadModalVisible, uploadFormSubmit,
  } = terminalFirmwareManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }

  const cardProps = {
    title: bizMap.terminalFirmware,
    style: { width: '100%' },
  };
  const queryFormProps = {
    companyOptions: companyOptionsData,
    formSubmit: (dat) => {
      dispatch({
        type: 'terminalFirmwareManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    addClick: () => {
      dispatch({
        type: 'terminalFirmwareManage/toggleModal',
        payload: { type: 'add' },
      });
    },
    deleteClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        callConfirm(commonMap.tip, commonMap.deleteConfirm, () => {
          dispatch({
            type: 'terminalFirmwareManage/deleteList',
            payload: { ids: selectIds.toString() },
          });
        });
      }
    },
  };
  const tableProps = {
    tableCurrentPage,
    tableList,
    tableLoading,
    tableTotal,
    companyOptionsData,
    tablePageChange(next) {
      dispatch({
        type: 'terminalFirmwareManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'terminalFirmwareManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'terminalFirmwareManage/toggleModal',
        payload: { type: 'info', data: record },
      });
    },
    handleUploadClick(record) {
      dispatch({
        type: 'terminalFirmwareManage/uploadModel',
        payload: { data: record, copId: record.copId },
      });
    },
    handleUpdateClick(record) {
      dispatch({
        type: 'terminalFirmwareManage/updateModel',
        payload: { data: record, copId: record.copId },
      });
    },
  };
  const infoModalProps = {
    footer: null,
    title: commonMap.detail,
    visible: infoModalVisible,
    onCancel: () => {
      dispatch({
        type: 'terminalFirmwareManage/toggleModal',
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
        type: 'terminalFirmwareManage/toggleModal',
        payload: { type: 'add', data: {} },
      });
    },
  };
  const uploadModalProps = {
    footer: null,
    title: commonMap.reUpload,
    visible: uploadModalVisible,
    onCancel: () => {
      dispatch({
        type: 'terminalFirmwareManage/toggleModal',
        payload: { type: 'upload', data: {} },
      });
    },
  };
  const updateModalProps = {
    footer: null,
    title: commonMap.update,
    visible: updateModalVisible,
    onCancel: () => {
      dispatch({
        type: 'terminalFirmwareManage/toggleModal',
        payload: { type: 'update', data: {} },
      });
    },
  };
  const addFormProps = {
    companyOptions: companyOptionsData,
    modelOptions: modelOptionsData,
    data: addFormData,
    submiting: addFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'terminalFirmwareManage/addOne',
        payload: { ...dat },
      });
    },
    queryModelOptionData(copId, childFormData) {
      dispatch({
        type: 'terminalFirmwareManage/queryModelOptionData',
        payload: { childFormData: childFormData, copId: copId, optType: '01' },
      });
    },
  };
  const uploadFormProps = {
    companyOptions: companyOptionsData,
    modelOptions: modelOptionsData,
    data: uploadFormData,
    submiting: uploadFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'terminalFirmwareManage/upload',
        payload: { ...dat },
      });
    },
    queryModelOptionData(copId, childFormData) {
      dispatch({
        type: 'terminalFirmwareManage/queryModelOptionData',
        payload: { childFormData: childFormData, copId: copId, optType: '01' },
      });
    },
  };
  const updateFormProps = {
    companyOptions: companyOptionsData,
    modelOptions: modelOptionsData,
    data: updateFormData,
    submiting: updateFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'terminalFirmwareManage/updateOne',
        payload: { ...dat },
      });
    },
    queryModelOptionData(copId, childFormData) {
      dispatch({
        type: 'terminalFirmwareManage/queryModelOptionData',
        payload: { childFormData: childFormData, copId: copId, optType: '01' },
      });
    },
  };
  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  const AddFormGen = () => <TerminalFirmwareInfoForm {...addFormProps} />;
  const UpLoadFormGen = () => <TerminalFirmwareInfoForm {...uploadFormProps} />;
  const UpdateFormGen = () => <TerminalFirmwareInfoForm {...updateFormProps} />;
  return (
    <div>
      <Card {...cardProps}>
        <TerminalFirmwareQueryForm {...queryFormProps} />
        <TerminalFirmwarePageTable {...tableProps} />
      </Card>
      <Modal {...addModalProps}>
        <AddFormGen />
      </Modal>
      <Modal {...uploadModalProps}>
        <UpLoadFormGen />
      </Modal>
      <Modal {...updateModalProps}>
        <UpdateFormGen />
      </Modal>
      <Modal {...infoModalProps}>
        <TerminalFirmwareInfoTable {...infoTableProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ terminalFirmwareManage }) {
  return { terminalFirmwareManage };
}

export default connect(mapStateToProps)(TerminalFirmwareManage);
