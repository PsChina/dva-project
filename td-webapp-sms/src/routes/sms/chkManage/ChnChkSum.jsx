import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import * as i18n from '../../../utils/i18n';
import ChnChkSumSearchForm from '../../../components/business/sms/chnChk/ChnChkSumSearchForm';
import ChnChkSumPageTable from '../../../components/business/sms/chnChk/ChnChkSumPageTable';
import ChnChkSucPageTable from '../../../components/business/sms/chnChk/ChnChkSucPageTable';
import ChnChkSucSearchForm from '../../../components/business/sms/chnChk/ChnChkSucSearchForm';

const ChnChkSum = ({ dispatch, chnChkSum }) => {
  const bizMap = i18n.bizMap('sms/chnChkSum');
  const cardProps = {
    style: { width: '100%' },
  };

  const {
    tableList,
    tableLoading,
    tableTotal,
    tableCurrentPage,
    tableParam,

    sucModalVisible,
    sucTableLoading,
    sucTableList,
    sucTableTotal,
    sucTableCurrentPage,
    sucQueryParam,

    secSumTableProps,
    expandedRowKeys,
  } = chnChkSum;

  const queryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'chnChkSum/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
  };

  const tableProps = {
    tableList,
    tableLoading,
    tableTotal,
    tableCurrentPage,
    secSumTableProps,
    expandedRowKeys,
    tablePageChange: (next) => {
      dispatch({
        type: 'chnChkSum/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },

    handlerShowSucDetail: (record) => {
      dispatch({
        type: 'chnChkSum/querySuccessList',
        payload: { tableParam: { ...record, currentPage: 1 } },
      });
    },

  };

  const sucModalProps = {
    footer: null,
    title: bizMap.sucDetail,
    visible: sucModalVisible,
    width: 848,
    onCancel: () => {
      dispatch({
        type: 'chnChkSum/updateState',
        payload: { sucModalVisible: false },
      });
    },
  };

  const sucQueryFormProps = {
    formSubmit: (dat) => {
      const record = Object.assign(sucQueryParam, dat);
      dispatch({
        type: 'chnChkSum/querySuccessList',
        payload: { tableParam: { ...record, currentPage: 1 } },
      });
    },
  };

  const sucTableProps = {
    tableList: sucTableList,
    tableLoading: sucTableLoading,
    tableTotal: sucTableTotal,
    tableCurrentPage: sucTableCurrentPage,
    tablePageChange: (next) => {
      dispatch({
        type: 'chnChkSum/querySuccessList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
  };

  return (
    <div>
      <Card {...cardProps}>
        <ChnChkSumSearchForm {...queryFormProps} />
        <ChnChkSumPageTable {...tableProps} />
      </Card>
      <Modal {...sucModalProps}>
        <ChnChkSucSearchForm {...sucQueryFormProps} />
        <ChnChkSucPageTable {...sucTableProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ chnChkSum }) {
  return { chnChkSum };
}

export default connect(mapStateToProps)(ChnChkSum);
