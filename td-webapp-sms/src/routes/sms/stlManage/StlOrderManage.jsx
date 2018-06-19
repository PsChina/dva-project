import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';
import StlOrderSearchForm from '../../../components/business/sms/stl/stlOrder/StlOrderSearchForm';
import StlOrderInfoPageTable from '../../../components/business/sms/stl/stlOrder/StlOrderInfoPageTable';
import StlOrderInfoTable from '../../../components/business/sms/stl/stlOrder/StlOrderInfoTable';

/**
 * 划款记录
 */
const StlOrderManage = ({ dispatch, stlOrderManage }) => {
  const commonMap = i18n.commonMap();
  const bizMap = i18n.bizMap('sms/stlOrder');
  const objectid = 'id';
  const cardProps = {
    style: { width: '100%' },
  };

  const {
    tableList,
    tableLoading,
    tableTotal,
    tableCurrentPage,
    tableParam,
    chnList,
    tableSelects,
    infoModalVisible,
    data,
  } = stlOrderManage;

  const selectIds = [];
  const noeffectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    if (tableSelects[i].outSts === '1') {
      selectIds.push(selectId);
    } else {
      noeffectIds.push(selectId);
    }
  }

  const queryFormProps = {
    chnList: chnList,
    formSubmit: (dat) => {
      dispatch({
        type: 'stlOrderManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    //批量划款
    handlBatchOutAmtClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, bizMap.pleaseSelectBatchOutData, 'warning');
        return;
      }
      if (noeffectIds.length > 0) {
        callNotice(commonMap.warning, bizMap.pleaseSelectNoTransferData, 'warning');
      } else {
        callConfirm(
        commonMap.tip,
        bizMap.whetherBatchOutData,
        () => {
          dispatch({
            type: 'stlOrderManage/batchOutAmt',
            payload: { ids: selectIds.toString() },
          });
        },
      );
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
        type: 'stlOrderManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    handleDetailClick: (record) => {
      dispatch({
        type: 'stlOrderManage/queryOne',
        payload: { ...record },
      });
    },
    //单笔划款
    handleOutClick: (record) => {
      callConfirm(
        commonMap.tip,
        bizMap.whetherOutData,
        () => {
          dispatch({
            type: 'stlOrderManage/outAmt',
            payload: { ...record },
          });
        },
      );
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'stlOrderManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
  };

  const infoModalProps = {
    footer: null,
    title: commonMap.detail,
    visible: infoModalVisible,
    onCancel: () => {
      dispatch({
        type: 'stlOrderManage/updateState',
        payload: { infoModalVisible: false },
      });
    },
  };

  const infoTableProps = {
    data,
  };
  return (
    <div>
      <Card {...cardProps}>
        <StlOrderSearchForm {...queryFormProps} />
        <StlOrderInfoPageTable {...tableProps} />
      </Card>
      <Modal {...infoModalProps}>
        <StlOrderInfoTable {...infoTableProps} />
      </Modal>
    </div>
  );
}

function mapStateToProps({ stlOrderManage }) {
  return { stlOrderManage };
}

export default connect(mapStateToProps)(StlOrderManage);
