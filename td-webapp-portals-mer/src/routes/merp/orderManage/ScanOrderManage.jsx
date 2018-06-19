import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import ScanOrderQueryForm from '../../../components/business/merp/scanOrder/ScanOrderQueryForm';
import ScanOrderPageTable from '../../../components/business/merp/scanOrder/ScanOrderPageTable';
import ScanOrderInfoTable from '../../../components/business/merp/scanOrder/ScanOrderInfoTable';
import * as i18n from '../../../utils/i18n';
import { callConfirm } from '../../../utils/alert';

const ScanOrderManage = ({ dispatch, scanOrderManage }) => {
  const bizMap = i18n.bizMap('merp/scanOrder');
  const commonMap = i18n.commonMap();
  const {
    tableCurrentPage, tableParam, tableLoading, tableList, tableTotal,
    infoTableData, infoModalVisible,
  } = scanOrderManage;
  const cardProps = {
    title: bizMap.todayScanOrder,
    style: { width: '100%' },
  };
  const queryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'scanOrderManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    exportClick: () => {
      callConfirm(commonMap.tip, commonMap.exportQueryConfirm, () => {
        dispatch({
          type: 'summaryOrderManage/exportList',
          payload: { ...tableParam },
        });
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
        type: 'scanOrderManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'scanOrderManage/queryOne',
        payload: { data: record },
      });
    },
  };
  const infoModalProps = {
    width: 720,
    footer: null,
    title: commonMap.detail,
    visible: infoModalVisible,
    onCancel: () => {
      dispatch({
        type: 'scanOrderManage/toggleModal',
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
        <ScanOrderQueryForm {...queryFormProps} />
        <ScanOrderPageTable {...tableProps} />
      </Card>
      <Modal {...infoModalProps}>
        <ScanOrderInfoTable {...infoTableProps} />
      </Modal>
    </div>

  );
};

function mapStateToProps({ scanOrderManage }) {
  return { scanOrderManage };
}

export default connect(mapStateToProps)(ScanOrderManage);
