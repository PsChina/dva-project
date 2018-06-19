import React from 'react';
import { connect } from 'dva';
import { Card, Tabs, Modal } from 'antd';
import TaskTodoPageTable from '../../../components/business/agtp/task/taskPageTable/TaskTodoPageTable';
import TaskMyApplyPageTable from '../../../components/business/agtp/task/taskPageTable/TaskMyApplyPageTable';
import TaskMyFinishPageTable from '../../../components/business/agtp/task/taskPageTable/TaskMyFinishPageTable';
import TaskManageQueryForm from '../../../components/business/agtp/task/TaskManageQueryForm';
import TaskAuditForm from '../../../components/business/agtp/task/agent/TaskAuditForm';
import AgentInfoTable from '../../../components/business/agtp/task/agent/AgentInfoTable';
import TaskAuditHisTable from '../../../components/business/agtp/task/TaskAuditHisTable';
import * as i18n from '../../../utils/i18n';

const TabPane = Tabs.TabPane;
const TaskAgentManage = ({ dispatch, taskAgentManage }) => {
  const bizMap = i18n.bizMap('agtp/task');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage,
    updateModalVisible, updateFormSubmit, updateFormData,
    infoModalVisible, infoTableData, formReset,
    auditHisModalVisible, auditHisData,
  } = taskAgentManage;
  const cardProps = {
    title: bizMap.taskAgentManage,
    style: { width: '100%' },
  };
  const todoQueryFormProps = {
    data: { modeltype: '0020', formReset },
    changeResetData: () => {
      dispatch({
        type: 'taskAgentManage/updateState',
        payload: { formReset: false },
      });
    },
    formSubmit: (dat) => {
      const queryDat = dat;
      queryDat.modeltype = '0020';
      dispatch({
        type: 'taskAgentManage/queryTodoList',
        payload: { tableParam: { ...queryDat, currentPage: 1 } },
      });
    },
  };
  const myApplyQueryFormProps = {
    data: { modeltype: '0020', formReset },
    changeResetData: () => {
      dispatch({
        type: 'taskAgentManage/updateState',
        payload: { formReset: false },
      });
    },
    formSubmit: (dat) => {
      const queryDat = dat;
      queryDat.modeltype = '0020';
      dispatch({
        type: 'taskAgentManage/queryMyApplyList',
        payload: { tableParam: { ...queryDat, currentPage: 1 } },
      });
    },
  };
  const myFinishQueryFormProps = {
    data: { modeltype: '0020', formReset },
    changeResetData: () => {
      dispatch({
        type: 'taskAgentManage/updateState',
        payload: { formReset: false },
      });
    },
    formSubmit: (dat) => {
      const queryDat = dat;
      queryDat.modeltype = '0020';
      dispatch({
        type: 'taskAgentManage/queryMyFinishList',
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
        type: 'taskAgentManage/toggleModal',
        payload: { type: 'info', data: {} },
      });
    },
  };
  const infoTableProps = {
    data: infoTableData.agent,
  };
  const auditHisModalProps = {
    width: 848,
    footer: null,
    title: commonMap.auditHis,
    visible: auditHisModalVisible,
    onCancel: () => {
      dispatch({
        type: 'taskAgentManage/toggleModal',
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
        type: 'taskAgentManage/toggleModal',
        payload: { type: 'update', data: {} },
      });
    },
  };
  const updateFormProps = {
    data: updateFormData,
    submiting: updateFormSubmit,
    formSubmitAgree: (dat) => {
      dispatch({
        type: 'taskAgentManage/updateAgree',
        payload: { ...dat },
      });
    },
    formSubmitReject: (dat) => {
      dispatch({
        type: 'taskAgentManage/updateReject',
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
        type: 'taskAgentManage/queryTodoList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'taskAgentManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleAuditHisClick(record) {
      dispatch({
        type: 'taskAgentManage/queryAuditHis',
        payload: { ...record },
      });
    },
    handleUpdateClick(record) {
      dispatch({
        type: 'taskAgentManage/beforeUpdate',
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
        type: 'taskAgentManage/queryMyApplyList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'taskAgentManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'taskAgentManage/queryOne',
        payload: { ...record },
      });
    },
    handleAuditHisClick(record) {
      dispatch({
        type: 'taskAgentManage/queryAuditHis',
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
        type: 'taskAgentManage/queryMyFinishList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'taskAgentManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'taskAgentManage/queryOne',
        payload: { ...record },
      });
    },
    handleAuditHisClick(record) {
      dispatch({
        type: 'taskAgentManage/queryAuditHis',
        payload: { ...record },
      });
    },
  };
  const UpdateFormGen = () => <TaskAuditForm {...updateFormProps} />;

  const changeTabPane = (activeKey) => {
    dispatch({
      type: 'taskAgentManage/updateState',
      payload: { formReset: true },
    });
    if (activeKey === '1') {
      dispatch({
        type: 'taskAgentManage/queryTodoList',
        payload: { tableParam: { modeltype: '0020', currentPage: 1 } },
      });
    } else if (activeKey === '2') {
      dispatch({
        type: 'taskAgentManage/queryMyFinishList',
        payload: { tableParam: { modeltype: '0020', currentPage: 1 } },
      });
    } else if (activeKey === '3') {
      dispatch({
        type: 'taskAgentManage/queryMyApplyList',
        payload: { tableParam: { modeltype: '0020', currentPage: 1 } },
      });
    }
  }
  return (
    <div>
      <Card {...cardProps}>
        <Tabs defaultActiveKey="1" onChange={changeTabPane}>
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
        </Tabs>
      </Card>
      <Modal {...updateModalProps}>
        <UpdateFormGen />
      </Modal>
      <Modal {...infoModalProps}>
        <AgentInfoTable {...infoTableProps} />
      </Modal>
      <Modal {...auditHisModalProps}>
        <TaskAuditHisTable {...auditHisTableProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ taskAgentManage }) {
  return { taskAgentManage };
}

export default connect(mapStateToProps)(TaskAgentManage);
