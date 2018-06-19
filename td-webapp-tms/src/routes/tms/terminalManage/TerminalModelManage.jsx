import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import TerminalModelQueryForm from '../../../components/business/tms/model/TerminalModelQueryForm';
import TerminalModelPageTable from '../../../components/business/tms/model/TerminalModelPageTable';
import TerminalModelInfoForm from '../../../components/business/tms/model/TerminalModelInfoForm';
import TerminalModelInfoTable from '../../../components/business/tms/model/TerminalModelInfoTable';
import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const TerminalModelManage = ({ dispatch, terminalModelManage }) => {
  const objectid = 'terModId';
  const bizMap = i18n.bizMap('tms/terminalModel');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableSelects,
    addModalVisible, updateModalVisible, addFormSubmit, updateFormSubmit, addFormData, updateFormData,
    infoModalVisible, infoTableData, companyOptionsData, tableCurrentPage,
  } = terminalModelManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }

  const cardProps = {
    title: bizMap.terminalModel,
    style: { width: '100%' },
  };
  const queryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'terminalModelManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    addClick: () => {
      dispatch({
        type: 'terminalModelManage/toggleModal',
        payload: { type: 'add' },
      });
    },
    deleteClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        callConfirm(commonMap.tip, commonMap.deleteConfirm, () => {
          dispatch({
            type: 'terminalModelManage/deleteList',
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
        type: 'terminalModelManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'terminalModelManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'terminalModelManage/toggleModal',
        payload: { type: 'info', data: record },
      });
    },
    handleUpdateClick(record) {
      dispatch({
        type: 'terminalModelManage/toggleModal',
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
        type: 'terminalModelManage/toggleModal',
        payload: { type: 'info', data: {} },
      });
    },
  };
  const infoTableProps = {
    data: infoTableData,
    companyOptions: companyOptionsData,
  };
  const addModalProps = {
    footer: null,
    title: commonMap.add,
    visible: addModalVisible,
    onCancel: () => {
      dispatch({
        type: 'terminalModelManage/toggleModal',
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
        type: 'terminalModelManage/toggleModal',
        payload: { type: 'update', data: {} },
      });
    },
  };
  const addFormProps = {
    type: 'add',
    companyOptions: companyOptionsData,
    data: addFormData,
    submiting: addFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'terminalModelManage/addOne',
        payload: { ...dat },
      });
    },
  };
  const updateFormProps = {
    type: 'update',
    companyOptions: companyOptionsData,
    data: updateFormData,
    submiting: updateFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'terminalModelManage/updateOne',
        payload: { ...dat },
      });
    },
  };
  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  const AddFormGen = () => <TerminalModelInfoForm {...addFormProps} />;
  const UpdateFormGen = () => <TerminalModelInfoForm {...updateFormProps} />;
  return (
    <div>
      <Card {...cardProps}>
        <TerminalModelQueryForm {...queryFormProps} />
        <TerminalModelPageTable {...tableProps} />
      </Card>
      <Modal {...addModalProps}>
        <AddFormGen />
      </Modal>
      <Modal {...updateModalProps}>
        <UpdateFormGen />
      </Modal>
      <Modal {...infoModalProps}>
        <TerminalModelInfoTable {...infoTableProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ terminalModelManage }) {
  return { terminalModelManage };
}

export default connect(mapStateToProps)(TerminalModelManage);
