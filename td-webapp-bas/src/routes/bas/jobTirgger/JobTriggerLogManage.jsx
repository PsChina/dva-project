import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import JobTriggerLogQueryForm from '../../../components/business/bas/jobTriggerLog/JobTriggerLogQueryForm';
import JobTriggerLogPageTable from '../../../components/business/bas/jobTriggerLog/JobTriggerLogPageTable';
import JobTriggerLogTable from '../../../components/business/bas/jobTriggerLog/JobTriggerLogTable';
import * as i18n from '../../../utils/i18n';

const JobTriggerLogManage = ({ dispatch, jobTriggerLogManage }) => {
  const bizMap = i18n.bizMap('bas/jobTriggerLog');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage,
    infoModalVisible, infoTableData,
  } = jobTriggerLogManage;
  const cardProps = {
    title: bizMap.jobTriggerLogManage,
    style: { width: '100%' },
  };
  const queryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'jobTriggerLogManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
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
        type: 'jobTriggerLogManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'jobTriggerLogManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleMsgDetailClick(record) {
      dispatch({
        type: 'jobTriggerLogManage/toggleModal',
        payload: { type: 'info', data: record },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'jobTriggerLogManage/toggleModal',
        payload: { type: 'info', data: record },
      });
    },
  };
  const infoModalProps = {
    footer: null,
    title: commonMap.detail,
    visible: infoModalVisible,
    onCancel: () => {
      dispatch({
        type: 'jobTriggerLogManage/toggleModal',
        payload: { type: 'info', data: {} },
      });
    },
  };
  const infoTableProps = {
    data: infoTableData,
  };
  return (
    <div>
      <Card {...cardProps}>
        <JobTriggerLogQueryForm {...queryFormProps} />
        <JobTriggerLogPageTable {...tableProps} />
      </Card>
      <Modal {...infoModalProps}>
        <JobTriggerLogTable {...infoTableProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ jobTriggerLogManage }) {
  return { jobTriggerLogManage };
}

export default connect(mapStateToProps)(JobTriggerLogManage);
