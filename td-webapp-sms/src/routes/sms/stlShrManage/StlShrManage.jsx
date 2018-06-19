import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import * as i18n from '../../../utils/i18n';
import { callConfirm, callNotice } from '../../../utils/alert';
import StlShrSearchForm from '../../../components/business/sms/stlShr/stlShrManage/StlShrSearchForm';
import StlShrInfoPageTable from '../../../components/business/sms/stlShr/stlShrManage/StlShrInfoPageTable';
import StlShrPageTable from '../../../components/business/sms/stlShr/stlShrManage/StlShrPageTable';
import StlShrInfoTable from '../../../components/business/sms/stlShr/stlShrManage/StlShrInfoTable';
import StlBusinessShrInfoForm from '../../../components/business/sms/stlShr/stlShrManage/StlBusinessShrInfoForm';
import StlBusinessShrInfPageTable from '../../../components/business/sms/stlShr/stlShrManage/StlBusinessShrInfPageTable';

/**
 * 分润申请
 */
const StlShrManage = ({ dispatch, stlShrManage }) => {
  const bizMap = i18n.bizMap('sms/stlShr');
  const commonMap = i18n.commonMap();
  const cardProps = {
    style: { width: '100%' },
  };
  const objectid = 'id';
  const {
    tableList,
    tableLoading,
    tableTotal,
    tableCurrentPage,
    tableParam,
    tableSelects,
    stlShrtableList,
    stlShrtableLoading,
    stlShrtableTotal,
    stlShrtableCurrentPage,
    stlShrTableParam,
    infoModalVisible,
    infoPageTableModalVisible,
    data,
    infoBusinessModalVisible,
    stlBusinessShrtableList,
    stlBusinessShrtableLoading,
    stlBusinessShrtableTotal,
    stlBusinessShrtableCurrentPage,
    stlBusinessShrTableParam,
    infoBusinessPageTableModalVisible,
  } = stlShrManage;

  const selectIds = [];
  const noeffectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    if (tableSelects[i].shrSts === '4') {
      selectIds.push(selectId);
    } else {
      noeffectIds.push(selectId);
    }
  }

  const queryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'stlShrManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    handleApplyClick: () => {
      if (noeffectIds.length > 0) {
        callNotice(commonMap.warning, bizMap.auditTip, 'warning');
      } else if (selectIds.length > 0) {
        callConfirm(
        commonMap.tip,
        bizMap.isApply,
        () => {
          dispatch({
            type: 'stlShrManage/apply',
            payload: { ids: selectIds.toString() },
          });
        },
      );
      } else {
        callNotice(commonMap.warning, bizMap.pleaseSelectRecords || commonMap.warningInfo, 'warning');
      }
    },
  };

  const tableProps = {
    tableList,
    tableLoading,
    tableTotal,
    tableCurrentPage,
    tablePageChange: (next) => {
      dispatch({
        type: 'stlShrManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'stlShrManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick: (record) => {
      if (record.disabled === 'disabled') {
        dispatch({
          type: 'stlShrManage/queryBusinessOne',
          payload: { ...record },
        });
      } else {
        dispatch({
          type: 'stlShrManage/queryOne',
          payload: { ...record },
        });
      }
    },
    handleQueryListClick: (record) => {
      dispatch({
        type: 'stlShrManage/queryTransactonList',
        payload: { ...{ busiTyp: record.busiTyp, agtId: record.pyeMemId, ccy: record.ccy, shrDat: record.shrDat, currentPage: 1 } },
      });
    },
  };

  const infoPageTableModalProps = {
    footer: null,
    title: bizMap.transactionDetail,
    visible: infoPageTableModalVisible,
    width: 1200,
    onCancel: () => {
      dispatch({
        type: 'stlShrManage/updateState',
        payload: { infoPageTableModalVisible: false },
      });
    },
  };

  const infoModalProps = {
    footer: null,
    title: commonMap.detail,
    visible: infoModalVisible,
    onCancel: () => {
      dispatch({
        type: 'stlShrManage/updateState',
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
        type: 'stlShrManage/queryTransactonList',
        payload: { stlShrTableParam: { currentPage: next } },
      });
    },
  };

  //分润业务详情--modal
  const infoBusinessModalProps = {
    footer: null,
    title: commonMap.detail,
    visible: infoBusinessModalVisible,
    onCancel: () => {
      dispatch({
        type: 'stlShrManage/updateState',
        payload: { infoBusinessModalVisible: false },
      });
    },
  };

  //分润业务详情form
  const infoBusinessTableProps = {
    data,
  };

  //分润业务交易详情列表modal
  const infoBusinessPageTableModalProps = {
    footer: null,
    title: commonMap.detail,
    visible: infoBusinessPageTableModalVisible,
    width: 1200,
    onCancel: () => {
      dispatch({
        type: 'stlShrManage/updateState',
        payload: { infoBusinessPageTableModalVisible: false },
      });
    },
  };
 //分润业务交易详情列表table
  const infoBusinessPageTableProps = {
    stlBusinessShrtableList,
    stlBusinessShrtableLoading,
    stlBusinessShrtableTotal,
    stlBusinessShrtableCurrentPage,
    stlBusinessShrTableParam,
    tablePageChange: (next) => {
      dispatch({
        type: 'stlShrManage/queryBusinessTransactonList',
        payload: { stlBusinessShrTableParam: { currentPage: next } },
      });
    },
  };

  return (
    <div>
      <Card {...cardProps}>
        <StlShrSearchForm {...queryFormProps} />
        <StlShrPageTable {...tableProps} />
      </Card>
      <Modal {...infoModalProps}>
        <StlShrInfoTable {...infoTableProps} />
      </Modal>
      <Modal {...infoPageTableModalProps}>
        <StlShrInfoPageTable {...infoPageTableProps} />
      </Modal>
      <Modal {...infoBusinessModalProps}>
        <StlBusinessShrInfoForm {...infoBusinessTableProps} />
      </Modal>
      <Modal {...infoBusinessPageTableModalProps}>
        <StlBusinessShrInfPageTable {...infoBusinessPageTableProps} />
      </Modal>
    </div>
  );
}

function mapStateToProps({ stlShrManage }) {
  return { stlShrManage };
}

export default connect(mapStateToProps)(StlShrManage);
