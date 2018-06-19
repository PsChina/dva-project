import React from 'react';
import { connect } from 'dva';
import { Card, Tabs, Modal } from 'antd';
import TaskTodoPageTable from '../../../components/business/merp/task/taskPageTable/TaskTodoPageTable';
import TaskMyApplyPageTable from '../../../components/business/merp/task/taskPageTable/TaskMyApplyPageTable';
import TaskMyFinishPageTable from '../../../components/business/merp/task/taskPageTable/TaskMyFinishPageTable';
import TaskManageQueryForm from '../../../components/business/merp/task/TaskManageQueryForm';
import TaskAuditForm from '../../../components/business/merp/task/store/TaskAuditForm';
import StoreInfoTable from '../../../components/business/merp/task/store/StoreInfoTable';
import TaskAuditHisTable from '../../../components/business/merp/task/TaskAuditHisTable';
import * as i18n from '../../../utils/i18n';

const TabPane = Tabs.TabPane;
const TaskStoreManage = ({ dispatch, taskStoreManage }) => {
  const bizMap = i18n.bizMap('merp/task');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage,
    updateModalVisible, updateFormSubmit, updateFormData,
    infoModalVisible, infoTableData, formReset,
    auditHisModalVisible, auditHisData,
  } = taskStoreManage;
  const cardProps = {
    title: bizMap.taskStoreManage,
    style: { width: '100%' },
  };
  const todoQueryFormProps = {
    data: { modeltype: '0030', formReset },
    changeResetData: () => {
      dispatch({
        type: 'taskStoreManage/updateState',
        payload: { formReset: false },
      });
    },
    formSubmit: (dat) => {
      const queryDat = dat;
      queryDat.modeltype = '0030';
      dispatch({
        type: 'taskStoreManage/queryTodoList',
        payload: { tableParam: { ...queryDat, currentPage: 1 } },
      });
    },
  };
  const myApplyQueryFormProps = {
    data: { modeltype: '0030', formReset },
    changeResetData: () => {
      dispatch({
        type: 'taskStoreManage/updateState',
        payload: { formReset: false },
      });
    },
    formSubmit: (dat) => {
      const queryDat = dat;
      queryDat.modeltype = '0030';
      dispatch({
        type: 'taskStoreManage/queryMyApplyList',
        payload: { tableParam: { ...queryDat, currentPage: 1 } },
      });
    },
  };
  const myFinishQueryFormProps = {
    data: { modeltype: '0030', formReset },
    changeResetData: () => {
      dispatch({
        type: 'taskStoreManage/updateState',
        payload: { formReset: false },
      });
    },
    formSubmit: (dat) => {
      const queryDat = dat;
      queryDat.modeltype = '0030';
      dispatch({
        type: 'taskStoreManage/queryMyFinishList',
        payload: { tableParam: { ...queryDat, currentPage: 1 } },
      });
    },
  };
  const infoModalProps = {
    width: 848,
    footer: null,
    title: commonMap.info,
    visible: infoModalVisible,
    onCancel: () => {
      dispatch({
        type: 'taskStoreManage/toggleModal',
        payload: { type: 'info', data: {} },
      });
    },
  };
  const infoTableProps = {
    data: infoTableData,
  };
  const auditHisModalProps = {
    width: 848,
    footer: null,
    title: commonMap.auditHis,
    visible: auditHisModalVisible,
    onCancel: () => {
      dispatch({
        type: 'taskStoreManage/toggleModal',
        payload: { type: 'auditHis', data: { auditHisList: [] } },
      });
    },
  };
  const auditHisTableProps = {
    data: auditHisData,
  };
  const updateModalProps = {
    width: 848,
    footer: null,
    title: commonMap.update,
    visible: updateModalVisible,
    onCancel: () => {
      dispatch({
        type: 'taskStoreManage/toggleModal',
        payload: { type: 'update', data: {} },
      });
    },
  };
  const updateFormProps = {
    data: updateFormData,
    submiting: updateFormSubmit,
    formSubmitAgree: (dat) => {
      dispatch({
        type: 'taskStoreManage/updateAgree',
        payload: { ...dat },
      });
    },
    formSubmitReject: (dat) => {
      dispatch({
        type: 'taskStoreManage/updateReject',
        payload: { ...dat },
      });
    },
  };
  const todoFormProps = {
    tableCurrentPage,
    tableList,
    tableLoading,
    tableTotal,
    tablePageChange(next) {
      dispatch({
        type: 'taskStoreManage/queryTodoList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'taskStoreManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleAuditHisClick(record) {
      dispatch({
        type: 'taskStoreManage/queryAuditHis',
        payload: { ...record },
      });
    },
    handleUpdateClick(record) {
      dispatch({
        type: 'taskStoreManage/beforeUpdate',
        payload: { ...record },
      });
    },
  };
  const myApplyFormProps = {
    tableCurrentPage,
    tableList,
    tableLoading,
    tableTotal,
    tablePageChange(next) {
      dispatch({
        type: 'taskStoreManage/queryMyApplyList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'taskStoreManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'taskStoreManage/queryOne',
        payload: { ...record },
      });
    },
    handleAuditHisClick(record) {
      dispatch({
        type: 'taskStoreManage/queryAuditHis',
        payload: { ...record },
      });
    },
  };
  const myFinishFormProps = {
    tableCurrentPage,
    tableList,
    tableLoading,
    tableTotal,
    tablePageChange(next) {
      dispatch({
        type: 'taskStoreManage/queryMyFinishList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'taskStoreManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'taskStoreManage/queryOne',
        payload: { ...record },
      });
    },
    handleAuditHisClick(record) {
      dispatch({
        type: 'taskStoreManage/queryAuditHis',
        payload: { ...record },
      });
    },
  };
  const UpdateFormGen = () => <TaskAuditForm {...updateFormProps} />;

  const changeTabPane = (activeKey) => {
    dispatch({
      type: 'taskStoreManage/updateState',
      payload: { formReset: true },
    });
    if (activeKey === '1') {
      dispatch({
        type: 'taskStoreManage/queryTodoList',
        payload: { tableParam: { modeltype: '0030', currentPage: 1 } },
      });
    } else if (activeKey === '2') {
      dispatch({
        type: 'taskStoreManage/queryMyFinishList',
        payload: { tableParam: { modeltype: '0030', currentPage: 1 } },
      });
    } else if (activeKey === '3') {
      dispatch({
        type: 'taskStoreManage/queryMyApplyList',
        payload: { tableParam: { modeltype: '0030', currentPage: 1 } },
      });
    }
  }
  return (
    <div>
      <Card {...cardProps}>
        {/*<Tabs defaultActiveKey="1" onChange={changeTabPane}>
          <TabPane tab={bizMap.taskTodo} key="1">
            <TaskManageQueryForm {...todoQueryFormProps} />
            <TaskTodoPageTable {...todoFormProps} />
          </TabPane>
          <TabPane tab={bizMap.taskMyFinish} key="2">
            <TaskManageQueryForm {...myFinishQueryFormProps} />
            <TaskMyFinishPageTable {...myFinishFormProps} />
          </TabPane>
          <TabPane tab={bizMap.taskMyApply} key="3">
            <TaskManageQueryForm {...myApplyQueryFormProps} />
            <TaskMyApplyPageTable {...myApplyFormProps} />
          </TabPane>
        </Tabs>*/}
        <Tabs defaultActiveKey="1" onChange={changeTabPane}>
          <TabPane tab={bizMap.taskMyApply} key="1">
            <TaskManageQueryForm {...myApplyQueryFormProps} />
            <TaskMyApplyPageTable {...myApplyFormProps} />
          </TabPane>
        </Tabs>
      </Card>
      <Modal {...updateModalProps}>
        <UpdateFormGen />
      </Modal>
      <Modal {...infoModalProps}>
        <StoreInfoTable {...infoTableProps} />
      </Modal>
      <Modal {...auditHisModalProps}>
        <TaskAuditHisTable {...auditHisTableProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ taskStoreManage }) {
  return { taskStoreManage };
}

export default connect(mapStateToProps)(TaskStoreManage);
