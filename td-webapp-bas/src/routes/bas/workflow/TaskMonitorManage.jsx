import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import TaskMonitorQueryForm from '../../../components/business/bas/taskMonitor/TaskMonitorQueryForm';
import TaskMonitorPageTable from '../../../components/business/bas/taskMonitor/TaskMonitorPageTable';
import TaskMonitorProcess from '../../../components/business/bas/taskMonitor/TaskMonitorProcess';
import * as i18n from '../../../utils/i18n';

const TaskMonitorManage = ({ dispatch, taskMonitorManage }) => {
  const objectid = 'flowbusinesstoken';
  const bizMap = i18n.bizMap('bas/taskMonitor');
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage, tableSelects,
    viewModalVisible, taskCfgList,
  } = taskMonitorManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }
  const cardProps = {
    title: bizMap.taskMonitor,
    style: { width: '100%' },
  };
  const queryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'taskMonitorManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1, systemno: '000' } },
      });
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
        type: 'taskMonitorManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'taskMonitorManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleViewProcessClick(record) {
      dispatch({
        type: 'taskMonitorManage/queryOneProcess',
        payload: { type: 'view', data: record },
      })
    },
  };


  const viewModalProps = {
    footer: null,
    title: bizMap.viewProcess,
    visible: viewModalVisible,
    onCancel: () => {
      dispatch({
        type: 'taskMonitorManage/toggleModal',
        payload: { type: 'view', data: {} },
      });
    },
  };
  const viewPropcessProps = {
    taskCfgList,
  };
  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  return (
    <div>
      <Card {...cardProps}>
        <TaskMonitorQueryForm {...queryFormProps} />
        <TaskMonitorPageTable {...tableProps} />
      </Card>
      <Modal {...viewModalProps}>
        <TaskMonitorProcess {...viewPropcessProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ taskMonitorManage }) {
  return { taskMonitorManage };
}

export default connect(mapStateToProps)(TaskMonitorManage);
