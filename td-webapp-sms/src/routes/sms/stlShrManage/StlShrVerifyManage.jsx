import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import * as i18n from '../../../utils/i18n';
import StlShrVerifySearchForm from '../../../components/business/sms/stlShr/stlShrVerifyManage/StlShrVerifySearchForm';
import StlShrVerifyInfoPageTable from '../../../components/business/sms/stlShr/stlShrVerifyManage/StlShrVerifyInfoPageTable';
import StlShrVerifyPageTable from '../../../components/business/sms/stlShr/stlShrVerifyManage/StlShrVerifyPageTable';
import StlShrVerifyInfoTable from '../../../components/business/sms/stlShr/stlShrVerifyManage/StlShrVerifyInfoTable';
import StlShrVerifyForm from '../../../components/business/sms/stlShr/stlShrVerifyManage/StlShrVerifyForm';

/**
 * 分润审核
 */
const StlShrVerifyManage = ({ dispatch, stlShrVerifyManage }) => {
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
    stlShrtableList,
    stlShrtableLoading,
    stlShrtableTotal,
    stlShrtableCurrentPage,
    stlShrTableParam,
    infoModalVisible,
    infoPageTableModalVisible,
    data,
  } = stlShrVerifyManage;

  const queryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'stlShrVerifyManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
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
        type: 'stlShrVerifyManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    handleDetailClick: (record) => {
      dispatch({
        type: 'stlShrVerifyManage/queryOne',
        payload: { ...record },
      });
    },
    handleQueryListClick: (record) => {
      dispatch({
        type: 'stlShrVerifyManage/queryTransactonList',
        payload: { ...record, stlShrTableParam: { currentPage: 1 } },
      });
    },
    handleVerifyClick: (record) => {
      dispatch({
        type: 'stlShrVerifyManage/verify',
        payload: { ...record },
      });
    },
  };

  const infoPageTableModalProps = {
    footer: null,
    title: commonMap.detail,
    visible: infoPageTableModalVisible,
    width: 1200,
    onCancel: () => {
      dispatch({
        type: 'stlShrVerifyManage/updateState',
        payload: { infoPageTableModalVisible: false },
      });
    },
  };

  const infoModalProps = {
    footer: null,
    title: commonMap.detail,
    visible: infoModalVisible,
    width: 800,
    onCancel: () => {
      dispatch({
        type: 'stlShrVerifyManage/updateState',
        payload: { infoModalVisible: false },
      });
    },
  };

  const infoTableProps = {
    data,
  };

  const infoPageTableProps = {
    stlShrtableList,
    stlShrtableLoading,
    stlShrtableTotal,
    stlShrtableCurrentPage,
    stlShrTableParam,
    tablePageChange: (next) => {
      dispatch({
        type: 'stlShrVerifyManage/queryTransactonList',
        payload: { stlShrTableParam: { currentPage: next } },
      });
    },
  };

  //审核Form 属性
  const stlShrVerifyFormProps = {
    handleSubmitOk: (record) => {
      console.log("record:", record);
      dispatch({
        type: 'stlShrVerifyManage/verifySubmit',
        payload: { param: { id: data.id, shrSts: 3, bak1: record.bak1 } },
      });
    },
    handleSubmitReject: (record) => {
      dispatch({
        type: 'stlShrVerifyManage/verifySubmit',
        payload: { param: { id: data.id, shrSts: 2, bak1: record.bak1 } },
      });
    },
  }

  return (
    <div>
      <Card {...cardProps}>
        <StlShrVerifySearchForm {...queryFormProps} />
        <StlShrVerifyPageTable {...tableProps} />
      </Card>
      <Modal {...infoModalProps}>
        <StlShrVerifyForm {...stlShrVerifyFormProps} />
        <StlShrVerifyInfoTable {...infoTableProps} />
      </Modal>
      <Modal {...infoPageTableModalProps}>
        <StlShrVerifyInfoPageTable {...infoPageTableProps} />
      </Modal>
    </div>
  );
}

function mapStateToProps({ stlShrVerifyManage }) {
  return { stlShrVerifyManage };
}

export default connect(mapStateToProps)(StlShrVerifyManage);
