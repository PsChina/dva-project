import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import * as i18n from '../../../utils/i18n';
import { callConfirm } from '../../../utils/alert';
import ChnChkErrorQueryForm from '../../../components/business/sms/chnChkError/ChnChkErrorQueryForm';
import ChnChkErrorPageTable from '../../../components/business/sms/chnChkError/ChnChkErrorPageTable';
import ChnChkErrorAccDealForm from '../../../components/business/sms/chnChkError/ChnChkErrorAccDealForm';
import PayOrderInfoTable from '../../../components/business/sms/chnChkError/PayOrderInfoTable';

const ChnChkErrorManage = ({ dispatch, chnChkErrorManage }) => {
  const bizMap = i18n.bizMap('sms/chnChkError');
  const commonMap = i18n.commonMap();
  const cardProps = {
    style: { width: '100%' },
  };

  const {
    tableList,
    tableLoading,
    tableTotal,
    tableCurrentPage,
    tableParam,

    errorAccDealModalVisible,
    errorDealAccData,

    detailModalVisible,
    data,
  } = chnChkErrorManage;

  const queryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'chnChkErrorManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    exportClick: () => {
      callConfirm(commonMap.tip, commonMap.exportQueryConfirm, () => {
        dispatch({
          type: 'chnChkErrorManage/queryList',
          payload: { tableParam: { currentPage: 1 } },
        });
      });
    },
  };

  const tableProps = {
    tableList,
    tableLoading,
    tableTotal,
    tableCurrentPage,
    tablePageChange: (next) => {
      dispatch({
        type: 'chnChkErrorManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'chnChkErrorManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick: (record) => {
      dispatch({
        type: 'chnChkErrorManage/queryOne',
        payload: { ...record },
      });
    },
    errorAccDealClick: (record) => {
      dispatch({
        type: 'chnChkErrorManage/updateState',
        payload: { errorDealAccData: record, errorAccDealModalVisible: true },
      });
    },
  };

  const errorAccDealModalProps = {
    width: 600,
    style: { top: 200 },
    footer: null,
    title: bizMap.errorAccDeal,
    visible: errorAccDealModalVisible,
    onCancel: () => {
      dispatch({
        type: 'chnChkErrorManage/updateState',
        payload: { errorDealAccData: {}, errorAccDealModalVisible: false },
      });
    },
  };

  const infoModalProps = {
    width: 848,
    footer: null,
    title: bizMap.errorDetail,
    visible: detailModalVisible,
    onCancel: () => {
      dispatch({
        type: 'chnChkErrorManage/toggleModal',
        payload: { type: 'detail', data: {} },
      });
    },
  };

  const errorAccDealFormProps = {
    data: errorDealAccData,
    formSubmit: (dat) => {
      const data = Object.assign(errorDealAccData, dat);
      dispatch({
        type: 'chnChkErrorManage/errorAccDeal',
        payload: { ...data },
      });
    },
    formCancel: () => {
      dispatch({
        type: 'chnChkErrorManage/updateState',
        payload: { errorAccDealModalVisible: false },
      });
    },
  };

  const DealFormGen = () => <ChnChkErrorAccDealForm {...errorAccDealFormProps} />

  return (
    <div>
      <Card {...cardProps}>
        <ChnChkErrorQueryForm {...queryFormProps} />
        <ChnChkErrorPageTable {...tableProps} />
      </Card>
      <Modal {...errorAccDealModalProps}>
        <DealFormGen />
      </Modal>
      <Modal {...infoModalProps}>
        <PayOrderInfoTable data={data} />
      </Modal>
    </div>
  );
}

function mapStateToProps({ chnChkErrorManage }) {
  return { chnChkErrorManage };
}

export default connect(mapStateToProps)(ChnChkErrorManage);
