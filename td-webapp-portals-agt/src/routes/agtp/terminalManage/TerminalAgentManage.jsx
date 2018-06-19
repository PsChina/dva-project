import React from 'react';
import { connect } from 'dva';
import { Card, Modal, Col, Row } from 'antd';
import TerminalAgentPageTable from '../../../components/business/agtp/terminal/bind/TerminalAgentPageTable';
import TerminalAgentQueryForm from '../../../components/business/agtp/terminal/bind/TerminalAgentQueryForm';
import TerminalAgentTermPageTable from '../../../components/business/agtp/terminal/bind/TerminalAgentTermPageTable';

import TerminalStockQueryForm from '../../../components/business/agtp/terminal/bind/TerminalStockQueryForm';
import TerminalStockPageTable from '../../../components/business/agtp/terminal/bind/TerminalStockPageTable';
import TerminalStockInfoTable from '../../../components/business/agtp/terminal/bind/TerminalStockInfoTable';
import * as i18n from '../../../utils/i18n';
import { callConfirm, callNotice } from '../../../utils/alert';

const TerminalAgentManage = ({ dispatch, terminalAgentManage }) => {
  const objectid = 'agtId';
  const bizMap = i18n.bizMap('agtp/terminalAgent');
  const commonMap = i18n.commonMap();
  const tmsValid = i18n.bizMap('agtp/tmsValid');
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage, tableSelects, termPayLoadAgtId,
    termTableList, termTableParam, termTableLoading, termTableTotal, termTableCurrentPage, addModalPayLoadAgtId,
    addModalVisible, addModalTableList, addModalTableLoading, addModalTableTotal, addModalTableCurrentPage, addModalTableParam,
    infoModalVisible, infoTableData, addModalTableRowSelects, termTableSelects, addModalTableSelects,
} = terminalAgentManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }

  const cardPropsLeft = {
    title: bizMap.terminalAgentcard,
  };
  const cardPropsRight = {
    title: bizMap.terminalAgentTermcard,
  };

  const agtTableProps = {
    tableList,
    tableLoading,
    tableTotal,
    tableCurrentPage,
    tablePageChange(next) {
      dispatch({
        type: 'terminalAgentManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next, agtLv: '1' } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'terminalAgentManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'terminalAgentManage/queryTermList',
        payload: { data: record, termTableParam: { ...termTableParam, currentPage: 1 } },
      });
    },
    handleAddClick(record) {
      dispatch({
        type: 'terminalAgentManage/queryUnBindTermList',
        payload: { data: record, addModalTableParam: { ...addModalTableParam, currentPage: 1 } },
      });
    },
  };

  const agtTermTableProps = {
    termPayLoadAgtId,
    termTableList,
    termTableLoading,
    termTableTotal,
    termTableCurrentPage,
    termTablePageChange(next) {
      dispatch({
        type: 'terminalAgentManage/queryTermList',
        payload: { data: termPayLoadAgtId, termTableParam: { ...termTableParam, currentPage: next } },
      });
    },
    termTableRowSelect(selectedRows) {
      dispatch({
        type: 'terminalAgentManage/updateState',
        payload: { termTableSelects: selectedRows },
      });
    },
    handleTermDetailClick(record) {
      dispatch({
        type: 'terminalAgentManage/queryOne',
        payload: { data: record },
      });
    },
    handleTermUnBindClick(record) {
      if (record != null) {
        termPayLoadAgtId.terIds = record.terId;
      }
      callConfirm(commonMap.tip, commonMap.unBindConfirm, () => {
        dispatch({
          type: 'terminalAgentManage/deleteList',
          payload: { data: termPayLoadAgtId, termTableSelects: termTableSelects },
        });
      });
    },
  };

  const agentQueryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'terminalAgentManage/queryList',
        payload: { data: dat, tableParam: { ...dat, currentPage: 1, agtLv: '1' } },
      });
    },
  }

  const addModalProps = {
    title: commonMap.bind,
    visible: addModalVisible,
    width: 848,
    onCancel: () => {
      dispatch({
        type: 'terminalAgentManage/toggleModal',
        payload: { type: 'add', data: {} },
      });
    },
    footer: [
    ],
  };

  const selectQueryFormProps = {
    addModalPayLoadAgtId,
    addModalVisible,
    formSubmit: (dat) => {
      const data = dat;
      data.agtId = addModalPayLoadAgtId.agtId;
      data.agtName = addModalPayLoadAgtId.agtName;
      dispatch({
        type: 'terminalAgentManage/queryUnBindTermList',
        payload: { visibleType: 1, data: data, addModalTableParam: { ...dat, currentPage: 1 } },
      });
    },
    selectRowsTermBind: () => {
      if (addModalTableSelects.length === 0) {
        callNotice(commonMap.warning, tmsValid.validSelectOne, 'warning');
        return;
      }
      dispatch({
        type: 'terminalAgentManage/addBatch',
        payload: { data: { ...addModalPayLoadAgtId, bindFlag: 'select' }, addModalTableRowSelects: addModalTableRowSelects, termTableParam: { ...termTableParam, currentPage: 1 } },
      });
    },
    allRowsTermBind: () => {
      if (addModalTableTotal === 0) {
        callNotice(commonMap.warning, tmsValid.validSelectOne, 'warning');
        return;
      }
      dispatch({
        type: 'terminalAgentManage/addBatch',
        payload: { data: { ...addModalPayLoadAgtId, bindFlag: 'all' }, addModalTableRowSelects: addModalTableRowSelects, termTableParam: { ...termTableParam, currentPage: 1 } },
      });
    },
  }

  const selectTableProps = {
    addModalPayLoadAgtId,
    addModalTableList,
    addModalTableLoading,
    addModalTableTotal,
    addModalTableCurrentPage,
    addModalTablePageChange(next) {
      dispatch({
        type: 'terminalAgentManage/queryUnBindTermList',
        payload: { visibleType: 1, data: addModalPayLoadAgtId, addModalTableParam: { ...addModalTableParam, currentPage: next } },
      });
    },
    addModalTableRowSelect(selectedRows) {
      let terIds = '';
      for (let i = 0; i < selectedRows.length; i++) {
        terIds += `${selectedRows[i].terId},`;
      }
      addModalPayLoadAgtId.terIds = terIds.substr(0, terIds.length - 1);
      dispatch({
        type: 'terminalAgentManage/updateState',
        payload: { addModalTableSelects: selectedRows, addModalPayLoadAgtId: addModalPayLoadAgtId },
      });
    },
  };

  const infoModalProps = {
    footer: '',
    title: commonMap.info,
    visible: infoModalVisible,
    width: 848,
    onCancel: () => {
      dispatch({
        type: 'terminalAgentManage/toggleModal',
        payload: { type: 'info', data: {} },
      });
    },
  };

  const infoTableProps = {
    termPayLoadAgtId,
    infoTableData,
  };


  return (
    <Row gutter={16}>
      <Col span={12}>
        <Card {...cardPropsLeft}>
          <TerminalAgentQueryForm {...agentQueryFormProps} />
          <TerminalAgentPageTable {...agtTableProps} />
        </Card>
      </Col>
      <Col span={12}>
        <Card {...cardPropsRight}>
          <TerminalAgentTermPageTable {...agtTermTableProps} />
        </Card>
      </Col>
      <Modal {...addModalProps}>
        <TerminalStockQueryForm {...selectQueryFormProps} />
        <TerminalStockPageTable {...selectTableProps} />
      </Modal>
      <Modal {...infoModalProps}>
        <TerminalStockInfoTable {...infoTableProps} />
      </Modal>
    </Row>
  );
};

function mapStateToProps({ terminalAgentManage }) {
  return { terminalAgentManage };
}

export default connect(mapStateToProps)(TerminalAgentManage);
