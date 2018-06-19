import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import * as i18n from '../../../utils/i18n';
import { callConfirm } from '../../../utils/alert';
import StlAuditQueryForm from '../../../components/business/sms/stl/StlAudit/StlAuditQueryForm';
import StlAuditPageTable from '../../../components/business/sms/stl/StlAudit/StlAuditPageTable';
import StlAuditForm from '../../../components/business/sms/stl/StlAudit/StlAuditForm';
import StlDetailForm from '../../../components/business/sms/stl/stlManage/StlDetailForm';

const StlAudit = ({ dispatch, stlAudit }) => {
  const objectid = 'id';
  const bizMap = i18n.bizMap('sms/stling');
  const commonMap = i18n.commonMap();
  const cardProps = {
    style: { width: '100%' },
  };

  const { advExpand, tableList, tableSelects, tableLoading, tableTotal, tableCurrentPage, tableParam, data, stlAuditModalVisible } = stlAudit;

  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }
  const queryFormProps = {
    advExpand,
    collapseClick: () => {
      dispatch({
        type: 'stlAudit/toggleAdvExpand',
      });
    },
    formSubmit: (dat) => {
      dispatch({
        type: 'stlAudit/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    exportClick: () => {
      callConfirm(commonMap.tip, commonMap.exportQueryConfirm, () => {
        dispatch({
          type: 'stlAudit/queryList',
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
        type: 'stlAudit/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'stlAudit/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick: (record) => {
      dispatch({
        type: 'stlAudit/queryOne',
        payload: { id: record.id },
      });
    },
  };

  //审核modal 属性
  const stlAuditModalProps = {
    width: 800,
    footer: null,
    title: bizMap.transferAudit,
    visible: stlAuditModalVisible,
    onCancel: () => {
      dispatch({
        type: 'stlAudit/toggleModal',
        payload: { type: 'stlAuditDetail', data: {} },
      });
    },
  }

  //审核Form 属性
  const stlAuditFormProps = {
    handleAuditSubmit: (record) => {
      dispatch({
        type: 'stlAudit/handleAuditSubmit',
        payload: { id: data.id, auditFlag: record.auditFlag, remark: record.remark },
      });
    },

  }

  //订单详情属性
  const detailFormProps = {
    data,
  }


  return (
    <div>
      <Card {...cardProps}>
        <StlAuditQueryForm {...queryFormProps} />
        <StlAuditPageTable {...tableProps} />
      </Card>
      <Modal {...stlAuditModalProps}>
        <StlAuditForm {...stlAuditFormProps} />
        <StlDetailForm {...detailFormProps} />
      </Modal>
    </div>
  );
}

function mapStateToProps({ stlAudit }) {
  return { stlAudit };
}

export default connect(mapStateToProps)(StlAudit);
