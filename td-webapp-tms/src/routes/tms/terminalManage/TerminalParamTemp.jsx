import React from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Modal } from 'antd';
import * as i18n from '../../../utils/i18n';
import TerminalParamTempForm from '../../../components/business/tms/param/TerminalParamTempForm';
import TerminalParamTempQueryForm from '../../../components/business/tms/param/TerminalParamTempQueryForm';
import TerminalParamTempPageTable from '../../../components/business/tms/param/TerminalParamTempPageTable';
import TerminalParamAddForm from '../../../components/business/tms/param/TerminalParamAddForm';
import TerminalParamTable from '../../../components/business/tms/param/TerminalParamTable';

const commonMap = i18n.commonMap();
const bizMap = i18n.bizMap('tms/terminalParamTemp');

const TerminalParamTemp = ({ dispatch, terminalParamTemp }) => {
  const { tableCurrentPage, tableLoading, tableList, tableTotal, addSubmiting, addModalVisible, deleteId,
    paramTemp, paramItems, paramTableList, paramTableLoading, deleteParamId, deleteParamTempId } = terminalParamTemp;
  const objectid = 'tempId';
  const subObjectid = 'itemCode';
  const cardProps = {
    style: { width: '100%' },
  }
  const tempQueryFormProps = {
    formSubmit(dat) {
      dispatch({
        type: 'terminalParamTemp/updateState',
        payload: { paramTemp: null },
      });
      dispatch({
        type: 'terminalParamTemp/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    formReset() {
      dispatch({
        type: 'terminalParamTemp/updateState',
        payload: { tableParam: { currentPage: 1 } },
      });
    },
    addClick() {
      dispatch({
        type: 'terminalParamTemp/toggleModal',
        payload: { type: 'add' },
      });
    },
  };
  const tempPageTableProps = {
    tableCurrentPage,
    tableLoading,
    tableList,
    tableTotal,
    tablePageChange() {},
    handleDeleteClick(record) {
      dispatch({
        type: 'terminalParamTemp/updateState',
        payload: { deleteId: record[objectid] },
      });
    },
    handleDeleteConfirm() {
      dispatch({
        type: 'terminalParamTemp/deleteOne',
        payload: { id: deleteId },
      });
    },
    handleDeleteCancel() {
      dispatch({
        type: 'terminalParamTemp/updateState',
        payload: { deleteId: '' },
      });
    },
    handleConfigClick(record) {
      dispatch({
        type: 'terminalParamTemp/queryParamList',
        payload: { record },
      });
    },
  };
  const addModalProps = {
    visible: addModalVisible,
    footer: null,
    title: commonMap.add,
    onCancel() {
      dispatch({
        type: 'terminalParamTemp/toggleModal',
        payload: { type: 'add' },
      });
    },
  };
  const addTempFormProps = {
    submiting: addSubmiting,
    formSubmit(dat) {
      dispatch({
        type: 'terminalParamTemp/addOne',
        payload: { dat },
      });
    },
  };
  const AddFormGen = () => { return <TerminalParamTempForm {...addTempFormProps} /> };

  const addParamFormProps = {
    paramItems,
    addClick(d) {
      const dat = d;
      dat.tempId = paramTemp.tempId;
      dispatch({
        type: 'terminalParamTemp/addParam',
        payload: { dat },
      });
    },
  };
  const paramTableProps = {
    tableList: paramTableList,
    tableLoading: paramTableLoading,
    handleDeleteClick(record, idx) {
      dispatch({
        type: 'terminalParamTemp/updateState',
        payload: { deleteParamTempId: record[objectid], deleteParamId: record[subObjectid], deleteParamIdx: idx },
      });
    },
    handleDeleteConfirm() {
      dispatch({
        type: 'terminalParamTemp/deleteParam',
        payload: { id: deleteParamId, tempId: deleteParamTempId },
      });
    },
    handleDeleteCancel() {
      dispatch({
        type: 'terminalParamTemp/updateState',
        payload: { deleteParamTempId: '', deleteParamId: '', deleteParamIdx: -1 },
      });
    },
    handleUpClick(record, idx) {
      dispatch({
        type: 'terminalParamTemp/upParam',
        payload: { tempId: record[objectid], id: record[subObjectid], idx },
      });
    },
    handleDownClick(record, idx) {
      dispatch({
        type: 'terminalParamTemp/downParam',
        payload: { tempId: record[objectid], id: record[subObjectid], idx },
      });
    },
  };
  return (
    <Row gutter={16}>
      <Col span={10}>
        <Card {...cardProps} title={bizMap.terminalParamTemp}>
          <TerminalParamTempQueryForm {...tempQueryFormProps} />
          <TerminalParamTempPageTable {...tempPageTableProps} />
        </Card>
        <Modal {...addModalProps}>
          <AddFormGen />
        </Modal>
      </Col>
      <Col span={14}>
        <Card {...cardProps} title={paramTemp === null ? null : paramTemp.tempName} style={{ display: paramTemp === null ? 'none' : 'block' }}>
          <TerminalParamAddForm {...addParamFormProps} />
          <TerminalParamTable {...paramTableProps} />
        </Card>
      </Col>
    </Row>
  );
};

function mapStateToProps({ terminalParamTemp }) {
  return { terminalParamTemp };
}

export default connect(mapStateToProps)(TerminalParamTemp);
