import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import TerminalLogQueryForm from '../../../components/business/tms/log/TerminalLogQueryForm';
import TerminalLogPageTable from '../../../components/business/tms/log/TerminalLogPageTable';
import TerminalLogInfoTable from '../../../components/business/tms/log/TerminalLogInfoTable';
import * as i18n from '../../../utils/i18n';

const TerminalLogManage = ({ dispatch, terminalLogManage }) => {
  const objectid = 'optLogno';
  const bizMap = i18n.bizMap('tms/terminalLog');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableSelects,
    infoModalVisible, infoTableData, tableCurrentPage,
  } = terminalLogManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }

  const cardProps = {
    title: bizMap.terminalLog,
    style: { width: '100%' },
  };
  const queryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'terminalLogManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
  };
  const tableProps = {
    tableCurrentPage,
    tableList,
    tableLoading,
    tableTotal,
    tablePageChange(next) {
      dispatch({
        type: 'terminalLogManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'terminalLogManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'terminalLogManage/toggleModal',
        payload: { type: 'info', data: record },
      });
    },
    handleUpdateClick(record) {
      dispatch({
        type: 'terminalLogManage/toggleModal',
        payload: { type: 'update', data: record },
      });
    },
  };
  const infoModalProps = {
    width: 670,
    footer: null,
    title: commonMap.detail,
    visible: infoModalVisible,
    onCancel: () => {
      dispatch({
        type: 'terminalLogManage/toggleModal',
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
        <TerminalLogQueryForm {...queryFormProps} />
        <TerminalLogPageTable {...tableProps} />
      </Card>
      <Modal {...infoModalProps}>
        <TerminalLogInfoTable {...infoTableProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ terminalLogManage }) {
  return { terminalLogManage };
}

export default connect(mapStateToProps)(TerminalLogManage);
