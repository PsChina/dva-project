import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import ScanHisOrderQueryForm from '../../../components/business/agtp/scanHisOrder/ScanHisOrderQueryForm';
import ScanHisOrderPageTable from '../../../components/business/agtp/scanHisOrder/ScanHisOrderPageTable';
import ScanHisOrderInfoTable from '../../../components/business/agtp/scanHisOrder/ScanHisOrderInfoTable';
import * as i18n from '../../../utils/i18n';
import { callConfirm } from '../../../utils/alert';

const ScanHisOrderManage = ({ dispatch, scanHisOrderManage }) => {
  const bizMap = i18n.bizMap('agtp/scanOrder');
  const commonMap = i18n.commonMap();
  const {
    tableCurrentPage, tableParam, tableLoading, tableList, tableTotal, infoTableData, infoModalVisible,
  } = scanHisOrderManage;
  const cardProps = {
    title: bizMap.hisScanOrder,
    style: { width: '100%' },
  };
  const queryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'scanHisOrderManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    exportClick: () => {
      callConfirm(commonMap.tip, commonMap.exportQueryConfirm, () => {
        dispatch({
          type: 'summaryHisOrderManage/exportList',
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
        type: 'scanHisOrderManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'scanHisOrderManage/queryOne',
        payload: { data: record },
      });
    },
  };
  const infoModalProps = {
    width: 1000,
    footer: null,
    title: commonMap.detail,
    visible: infoModalVisible,
    onCancel: () => {
      dispatch({
        type: 'scanHisOrderManage/toggleModal',
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
        <ScanHisOrderQueryForm {...queryFormProps} />
        <ScanHisOrderPageTable {...tableProps} />
      </Card>
      <Modal {...infoModalProps}>
        <ScanHisOrderInfoTable {...infoTableProps} />
      </Modal>
    </div>

  );
};

function mapStateToProps({ scanHisOrderManage }) {
  return { scanHisOrderManage };
}

export default connect(mapStateToProps)(ScanHisOrderManage);
