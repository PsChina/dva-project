import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import JobTriggerInfoQueryForm from '../../../components/business/bas/jobTriggerInfo/JobTriggerInfoQueryForm';
import JobTriggerInfoPageTable from '../../../components/business/bas/jobTriggerInfo/JobTriggerInfoPageTable';
import JobTriggerInfoForm from '../../../components/business/bas/jobTriggerInfo/JobTriggerInfoForm';
import JobTriggerInfoTable from '../../../components/business/bas/jobTriggerInfo/JobTriggerInfoTable';
import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const JobTriggerInfoManage = ({ dispatch, jobTriggerInfoManage }) => {
  const objectid = 'id';
  const bizMap = i18n.bizMap('bas/jobTriggerInfo');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage, tableSelects,
    addModalVisible, updateModalVisible, addFormSubmit, updateFormSubmit, addFormData, updateFormData,
    infoModalVisible, infoTableData,
  } = jobTriggerInfoManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }
  const cardProps = {
    title: bizMap.jobTriggerInfoManage,
    style: { width: '100%' },
  };
  const queryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'jobTriggerInfoManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    addClick: () => {
      dispatch({
        type: 'jobTriggerInfoManage/toggleModal',
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
            type: 'jobTriggerInfoManage/deleteList',
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
    tableParam,
    tablePageChange(next) {
      dispatch({
        type: 'jobTriggerInfoManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'jobTriggerInfoManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'jobTriggerInfoManage/toggleModal',
        payload: { type: 'info', data: record },
      });
    },
    handleUpdateClick(record) {
      dispatch({
        type: 'jobTriggerInfoManage/toggleModal',
        payload: { type: 'update', data: record },
      });
    },
    handleExcuteClick(record) {
      callConfirm(commonMap.tip, bizMap.excuteConfirm, () => {
        dispatch({
          type: 'jobTriggerInfoManage/excute',
          payload: { data: record },
        });
      });
    },
    handlePauseClick(record) {
      callConfirm(commonMap.tip, bizMap.pauseConfirm, () => {
        dispatch({
          type: 'jobTriggerInfoManage/pause',
          payload: { data: record },
        });
      });
    },
    handleRecoveryClick(record) {
      callConfirm(commonMap.tip, bizMap.recoveryConfirm, () => {
        dispatch({
          type: 'jobTriggerInfoManage/recovery',
          payload: { data: record },
        });
      });
    },
  };
  const infoModalProps = {
    width: 848,
    footer: null,
    title: commonMap.detail,
    visible: infoModalVisible,
    onCancel: () => {
      dispatch({
        type: 'jobTriggerInfoManage/toggleModal',
        payload: { type: 'info', data: {} },
      });
    },
  };
  const infoTableProps = {
    data: infoTableData,
  };
  const addModalProps = {
    width: 848,
    footer: null,
    title: commonMap.add,
    visible: addModalVisible,
    onCancel: () => {
      dispatch({
        type: 'jobTriggerInfoManage/toggleModal',
        payload: { type: 'add', data: {} },
      });
    },
  };
  const updateModalProps = {
    width: 848,
    footer: null,
    title: commonMap.update,
    visible: updateModalVisible,
    onCancel: () => {
      dispatch({
        type: 'jobTriggerInfoManage/toggleModal',
        payload: { type: 'update', data: {} },
      });
    },
  };
  const addFormProps = {
    data: addFormData,
    submiting: addFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'jobTriggerInfoManage/addOne',
        payload: { ...dat },
      });
    },
  };
  const updateFormProps = {
    data: updateFormData,
    submiting: updateFormSubmit,
    type: 'update',
    formSubmit: (dat) => {
      dispatch({
        type: 'jobTriggerInfoManage/updateOne',
        payload: { ...dat },
      });
    },
  };
  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  const AddFormGen = () => <JobTriggerInfoForm {...addFormProps} />;
  const UpdateFormGen = () => <JobTriggerInfoForm {...updateFormProps} />;
  return (
    <div>
      <Card {...cardProps}>
        <JobTriggerInfoQueryForm {...queryFormProps} />
        <JobTriggerInfoPageTable {...tableProps} />
      </Card>
      <Modal {...addModalProps}>
        <AddFormGen />
      </Modal>
      <Modal {...updateModalProps}>
        <UpdateFormGen />
      </Modal>
      <Modal {...infoModalProps}>
        <JobTriggerInfoTable {...infoTableProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ jobTriggerInfoManage }) {
  return { jobTriggerInfoManage };
}

export default connect(mapStateToProps)(JobTriggerInfoManage);
