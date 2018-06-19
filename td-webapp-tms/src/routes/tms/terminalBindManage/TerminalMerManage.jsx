import React from 'react';
import { connect } from 'dva';
import { Card, Modal, Col, Row } from 'antd';
import TerminalMerPageTable from '../../../components/business/tms/bind/TerminalMerPageTable';
import TerminalMerQueryForm from '../../../components/business/tms/bind/TerminalMerQueryForm';
import TerminalMerTermPageTable from '../../../components/business/tms/bind/TerminalMerTermPageTable';

import TerminalStockQueryForm from '../../../components/business/tms/bind/TerminalStockQueryForm';
import TerminalStockPageTable from '../../../components/business/tms/bind/TerminalStockPageTable';
import TerminalStockInfoTable from '../../../components/business/tms/bind/TerminalStockInfoTable';
import * as i18n from '../../../utils/i18n';
import { callConfirm, callNotice } from '../../../utils/alert';

const TerminalMerManage = ({ dispatch, terminalMerManage }) => {
  const objectid = 'BraId';
  const bizMap = i18n.bizMap('tms/terminalMer');
  const commonMap = i18n.commonMap();
  const tmsValid = i18n.bizMap('tms/tmsValid');
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage, tableSelects, termPayLoadBraId,
    termTableList, termTableParam, termTableLoading, termTableTotal, termTableCurrentPage, addModalPayLoadBraId,
    addModalVisible, addModalTableList, addModalTableLoading, addModalTableTotal, addModalTableCurrentPage, addModalTableParam,
    infoModalVisible, infoTableData, addModalTableRowSelects, termTableSelects,
  } = terminalMerManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }

  const cardPropsLeft = {
    title: bizMap.terminalMercard,
  };
  const cardPropsRight = {
    title: bizMap.terminalMerTermcard,
  };
  const agtTableProps = {
    tableList,
    tableLoading,
    tableTotal,
    tableCurrentPage,
    tablePageChange(next) {
      dispatch({
        type: 'terminalMerManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next, merCate: '1' } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'terminalMerManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'terminalMerManage/queryTermList',
        payload: { data: record, termTableParam: { ...termTableParam, currentPage: 1 } },
      });
    },
    handleAddClick(record) {
      dispatch({
        type: 'terminalMerManage/queryUnBindTermList',
        payload: { data: record, addModalTableParam: { ...addModalTableParam, currentPage: 1 } },
      });
    },
  };

  const agtTermTableProps = {
    termPayLoadBraId,
    termTableList,
    termTableLoading,
    termTableTotal,
    termTableCurrentPage,
    termTablePageChange(next) {
      dispatch({
        type: 'terminalMerManage/queryTermList',
        payload: { data: termPayLoadBraId, termTableParam: { ...termTableParam, currentPage: next } },
      });
    },
    termTableRowSelect(selectedRows) {
      let terIds = '';
      for (let i = 0; i < selectedRows.length; i++) {
        terIds += `${selectedRows[i].terId},`;
      }
      termPayLoadBraId.terIds = terIds.substr(0, terIds.length - 1);
      dispatch({
        type: 'terminalMerManage/updateState',
        payload: { termTableSelects: selectedRows, termPayLoadBraId: termPayLoadBraId },
      });
    },
    handleTermDetailClick(record) {
      dispatch({
        type: 'terminalMerManage/queryOne',
        payload: { data: record },
      });
    },
    handleTermUnBindClick(record) {
      if (record != null) {
        termPayLoadBraId.terIds = record.terId;
      }
      callConfirm(commonMap.tip, commonMap.unBindConfirm, () => {
        dispatch({
          type: 'terminalMerManage/deleteList',
          payload: { data: termPayLoadBraId, termTableSelects: termTableSelects },
        });
      });
    },
  };

  const MerQueryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'terminalMerManage/queryList',
        payload: { data: dat, tableParam: { ...dat, currentPage: 1, merCate: '1' } },
      });
    },
  }

  const addModalProps = {
    title: commonMap.bind,
    visible: addModalVisible,
    width: 848,
    onCancel: () => {
      dispatch({
        type: 'terminalMerManage/toggleModal',
        payload: { type: 'add', data: {} },
      });
    },
    footer: [
    ],
  };

  const selectQueryFormProps = {
    addModalPayLoadBraId,
    addModalVisible,
    formSubmit: (dat) => {
      const data = dat;
      data.merId = addModalPayLoadBraId.merId;
      data.merName = addModalPayLoadBraId.merName;
      data.braId = addModalPayLoadBraId.braId;
      data.braName = addModalPayLoadBraId.braName;
      dispatch({
        type: 'terminalMerManage/queryUnBindTermList',
        payload: { visibleType: 1, data: data, addModalTableParam: { ...dat, currentPage: 1 } },
      });
    },
    selectRowsTermBind: () => {
      if (addModalTableRowSelects.length === 0) {
        callNotice(commonMap.warning, tmsValid.validSelectOne, 'warning');
        return;
      }
      dispatch({
        type: 'terminalMerManage/addBatch',
        payload: { data: { ...addModalPayLoadBraId, bindFlag: 'select' }, addModalTableRowSelects: addModalTableRowSelects, termTableParam: { ...termTableParam, currentPage: 1 } },
      });
    },
    allRowsTermBind: () => {
      if (addModalTableTotal === 0) {
        callNotice(commonMap.warning, tmsValid.validSelectOne, 'warning');
        return;
      }
      dispatch({
        type: 'terminalMerManage/addBatch',
        payload: { data: { ...addModalPayLoadBraId, bindFlag: 'all' }, addModalTableRowSelects: addModalTableRowSelects, termTableParam: { ...termTableParam, currentPage: 1 } },
      });
    },
  }

  const selectTableProps = {
    addModalPayLoadBraId,
    addModalTableList,
    addModalTableLoading,
    addModalTableTotal,
    addModalTableCurrentPage,
    addModalTablePageChange(next) {
      dispatch({
        type: 'terminalMerManage/queryUnBindTermList',
        payload: { visibleType: 1, data: addModalPayLoadBraId, addModalTableParam: { ...addModalTableParam, currentPage: next } },
      });
    },
    addModalTableRowSelect(selectedRows) {
      let terIds = '';
      for (let i = 0; i < selectedRows.length; i++) {
        terIds += `${selectedRows[i].terId},`;
      }
      addModalPayLoadBraId.terIds = terIds.substr(0, terIds.length - 1);
      dispatch({
        type: 'terminalMerManage/updateState',
        payload: { addModalTableRowSelects: selectedRows, addModalPayLoadBraId: addModalPayLoadBraId },
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
        type: 'terminalMerManage/toggleModal',
        payload: { type: 'info', data: {} },
      });
    },
  };

  const infoTableProps = {
    termPayLoadBraId,
    infoTableData,
  };


  return (
    <Row gutter={16}>
      <Col span={12}>
        <Card {...cardPropsLeft}>
          <TerminalMerQueryForm {...MerQueryFormProps} />
          <TerminalMerPageTable {...agtTableProps} />
        </Card>
      </Col>
      <Col span={12}>
        <Card {...cardPropsRight}>
          <TerminalMerTermPageTable {...agtTermTableProps} />
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

function mapStateToProps({ terminalMerManage }) {
  return { terminalMerManage };
}

export default connect(mapStateToProps)(TerminalMerManage);
