import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import OrderTransRecQueryForm from '../../../components/business/oms/orderTransRec/OrderTransRecQueryForm';
import OrderTransRecInfoTable from '../../../components/business/oms/orderTransRec/OrderTransRecInfoTable';
import OrderTransRecPageTable from '../../../components/business/oms/orderTransRec/OrderTransRecPageTable';
import OrderTransRecInfoForm from '../../../components/business/oms/orderTransRec/OrderTransRecInfoForm';
import BankcardOrderInfoTable from '../../../components/business/oms/bankcardOrder/BankcardOrderInfoTable';
import * as i18n from '../../../utils/i18n';

const OrderTransRecManage = ({ dispatch, orderTransRecManage }) => {
  const bizMap = i18n.bizMap('oms/orderTransRec');
  const commonMap = i18n.commonMap();
  const {
    tableCurrentPage, tableParam, tableLoading, tableList, tableTotal, updateFormSubmit, filePath, fileList,
    infoModalVisible, infoTableData, orderFormData, orderModalVisible, handleModalVisible,
  } = orderTransRecManage;
  const cardProps = {
    title: bizMap.orderTransRec,
    style: { width: '100%' },
  };
  const queryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'orderTransRecManage/queryList',
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
        type: 'orderTransRecManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'orderTransRecManage/toggleModal',
        payload: { type: 'info', data: record },
      });
    },
    handleTransferOrderClick(record) {
      dispatch({
        type: 'orderTransRecManage/toggleModal',
        payload: { type: 'handle', data: record },
      });
    },
    handleOrderDetailClick(record) {
      dispatch({
        type: 'orderTransRecManage/queryOrderDetail',
        payload: { data: record },
      });
    },
  };
  const infoModalProps = {
    width: 848,
    footer: null,
    title: commonMap.detail,
    visible: infoModalVisible,
    onCancel: () => {
      dispatch({
        type: 'orderTransRecManage/toggleModal',
        payload: { type: 'info', data: {} },
      });
    },
  };
  const infoTableProps = {
    data: infoTableData,
  };
  const orderInfoModalProps = {
    width: 848,
    footer: null,
    title: commonMap.detail,
    visible: orderModalVisible,
    onCancel: () => {
      dispatch({
        type: 'orderTransRecManage/toggleModal',
        payload: { type: 'queryOrderDetail', data: {} },
      });
    },
  };
  const orderInfoTableProps = {
    data: orderFormData,
  };
  const handleInfoModalProps = {
    width: 848,
    footer: null,
    title: commonMap.update,
    visible: handleModalVisible,
    onCancel: () => {
      dispatch({
        type: 'orderTransRecManage/toggleModal',
        payload: { type: 'handle', data: {} },
      });
    },
  };
  const handleInfoTableProps = {
    data: infoTableData,
    submiting: updateFormSubmit,
    filePath: filePath,
    fileList: fileList,
    formSubmit: (dat) => {
      dispatch({
        type: 'orderTransRecManage/handleTransferOrder',
        payload: { ...dat },
      });
    },
    changeFileData(dat, formData) {
      dispatch({
        type: 'orderTransRecManage/changeFileData',
        payload: { formData: formData, data: dat },
      });
    },
  };
  return (
    <div>
      <Card {...cardProps}>
        <OrderTransRecQueryForm {...queryFormProps} />
        <OrderTransRecPageTable {...tableProps} />
      </Card>
      <Modal {...infoModalProps}>
        <OrderTransRecInfoTable {...infoTableProps} />
      </Modal>
      <Modal {...orderInfoModalProps}>
        <BankcardOrderInfoTable {...orderInfoTableProps} />
      </Modal>
      <Modal {...handleInfoModalProps}>
        <OrderTransRecInfoForm {...handleInfoTableProps} />
      </Modal>
    </div>

  );
};

function mapStateToProps({ orderTransRecManage }) {
  return { orderTransRecManage };
}

export default connect(mapStateToProps)(OrderTransRecManage);
