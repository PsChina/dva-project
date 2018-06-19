import React from 'react';
import { connect } from 'dva';
import { Card, Modal, Row, Col } from 'antd';
import * as i18n from '../../../utils/i18n';
import ChnChkErrorAuditQueryForm from '../../../components/business/sms/chnChkErrorAudit/ChnChkErrorAuditQueryForm';
import ChnChkErrorAuditPageTable from '../../../components/business/sms/chnChkErrorAudit/ChnChkErrorAuditPageTable';

import ChnChkAuditForm from '../../../components/business/sms/chnChkErrorAudit/ChnChkAuditForm';
import ChnChkAuditHistoryLine from '../../../components/business/sms/chnChkErrorAudit/ChnChkAuditHistoryLine';

const ChnChkErrorAudit = ({ dispatch, chnChkErrorAudit }) => {
  const bizMap = i18n.bizMap('sms/chnChkErrorAudit');
  const cardPropsLeft = {
    style: { width: '100%' },
  };
  const cardPropsRight = {
    title: bizMap.auditHistory,
  }

  const {
    tableList,
    tableLoading,
    tableTotal,
    tableCurrentPage,
    tableParam,

    auditData,
    auditFormSubmit,
    auditModalVisible,
    auditFormReject,

    auditHisData,
    loading,
  } = chnChkErrorAudit;

  const queryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'chnChkErrorAudit/queryList',
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
        type: 'chnChkErrorAudit/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },

    handleAuditClick: (record) => {
      dispatch({
        type: 'chnChkErrorAudit/updateState',
        payload: { auditData: { ...record }, auditModalVisible: true },
      });
    },

    handleAuditHisClick: (record) => {
      dispatch({
        type: 'chnChkErrorAudit/queryAuditHis',
        payload: { ...record },
      });
    },
  };

  const auditFormProps = {
    data: auditData,
    submiting: auditFormSubmit,
    rejecting: auditFormReject,
    formSubmit: (dat) => {
      dispatch({
        type: 'chnChkErrorAudit/auditErrorDeal',
        payload: { ...dat },
      });
    },
  };

  const auditModalProps = {
    width: 848,
    footer: null,
    title: bizMap.audit,
    visible: auditModalVisible,
    onCancel: () => {
      dispatch({
        type: 'chnChkErrorAudit/updateState',
        payload: { auditModalVisible: false },
      });
    },
  };

  const AuditFormGen = () => <ChnChkAuditForm {...auditFormProps} />;

  return (
    <div>
      <Row gutter={16}>
        <Col sm={24} md={16}>
          <Card {...cardPropsLeft}>
            <ChnChkErrorAuditQueryForm {...queryFormProps} />
            <ChnChkErrorAuditPageTable {...tableProps} />
          </Card>
        </Col>
        <Col sm={24} md={8}>
          <Card {...cardPropsRight}>
            <ChnChkAuditHistoryLine data={auditHisData} loading={loading} />
          </Card>
        </Col>
      </Row>
      <Modal {...auditModalProps}>
        <AuditFormGen />
      </Modal>
    </div>
  );
}

function mapStateToProps({ chnChkErrorAudit }) {
  return { chnChkErrorAudit };
}

export default connect(mapStateToProps)(ChnChkErrorAudit);
