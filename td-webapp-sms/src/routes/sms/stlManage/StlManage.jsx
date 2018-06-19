import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import * as i18n from '../../../utils/i18n';
import { callNotice, callConfirm } from '../../../utils/alert';
import StlQueryForm from '../../../components/business/sms/stl/stlManage/StlQueryForm';
import StlPageTable from '../../../components/business/sms/stl/stlManage/StlPageTable';
import StlDetailForm from '../../../components/business/sms/stl/stlManage/StlDetailForm';
import StlAccDetailTable from '../../../components/business/sms/stl/stlManage/StlAccDetailTable';
import StlOrdDetailTable from '../../../components/business/sms/stl/stlManage/StlOrdDetailTable';
import StlBusinessDetailForm from '../../../components/business/sms/stl/stlManage/StlBusinessDetailForm';
import StlBusinessAccDetailTable from '../../../components/business/sms/stl/stlManage/StlBusinessAccDetailTable';
import StlTradeTable from '../../../components/business/sms/stl/stlManage/StlTradeTable';

const StlManage = ({ dispatch, stlManage }) => {
  const objectid = 'id';
  const bizMap = i18n.bizMap('sms/stling');
  const commonMap = i18n.commonMap();
  const cardProps = {
    style: { width: '100%' },
  };

  const { advExpand,
    tableList,
    tableSelects,
    tableLoading,
    tableTotal,
    tableCurrentPage,
    tableParam,
    data,
    detailModalVisible,
    stlDetailModalVisible,
    stlTableLoading,
    stlTableList,
    stlTableTotal,
    stlTableCurrentPage,
    stlTableParam,
    orderTableParam,
    orderTableLoading,
    orderTableList,
    orderTableTotal,
    orderTableCurrentPage,
    stlOrdDetailModalVisible,
    businessDetailModalVisible,
    businessStlDetailModalVisible,
    businessStlTableParam,
    businessStlTableLoading,
    businessStlTableList,
    businessStlTableTotal,
    businessStlTableCurrentPage,
    stlTradetableList,
    stlTradetableLoading,
    stlTradetableTotal,
    stlTradetableCurrentPage,
    stlTradeTableParam,
    stlTradeModalVisible,
  } = stlManage;

  const selectIds = [];
  const noeffectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    if (tableSelects[i].stlSts === '5') {
      selectIds.push(selectId);
    } else {
      noeffectIds.push(selectId);
    }
  }
  const queryFormProps = {
    advExpand,
    collapseClick: () => {
      dispatch({
        type: 'stlManage/toggleAdvExpand',
      });
    },
    formSubmit: (dat) => {
      dispatch({
        type: 'stlManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    exportClick: () => {
      callConfirm(commonMap.tip, commonMap.exportQueryConfirm, () => {
        dispatch({
          type: 'stlManage/queryList',
          payload: { tableParam: { currentPage: 1 } },
        });
      });
    },
    applyForMoneyClick: () => {
      if (noeffectIds.length > 0) {
        callNotice(commonMap.warning, bizMap.auditTip, 'warning');
      } else if (selectIds.length > 0) {
        callConfirm(commonMap.tip, bizMap.applyForMoneyConfirm, () => {
          dispatch({
            type: 'stlManage/applyForMoney',
            payload: { ids: selectIds.toString() },
          });
        });
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
        type: 'stlManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'stlManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick: (record) => {
      if (record.disabled === 'disabled') {
        dispatch({
          type: 'stlManage/queryBusinessOne',
          payload: { ...record },
        });
      } else {
        dispatch({
          type: 'stlManage/queryOne',
          payload: { ...record },
        });
      }
    },
    handleStlDetailClick: (record) => {
      const params = { busiTyp: record.busiTyp, clrTyp: record.clrTyp, pyeMemId: record.pyeMemId, ccy: record.ccy, stlDat: record.stlDat };
      if (record.disabled === 'disabled') {
        dispatch({
          type: 'stlManage/handleBusinessStlDetail',
          payload: { ...params },
        });
      } else {
        dispatch({
          type: 'stlManage/handleStlDetail',
          payload: { ...params },
        });
      }
    },
    handleOrdDetailClick: (record) => {
      dispatch({
        type: 'stlManage/handleOrdDetail',
        payload: { ...record },
      });
    },
    handleTradeDetailListClick: (record) => {
      dispatch({
        type: 'stlManage/handleTradeDetailList',
        payload: { ...{ busiTyp: record.busiTyp, merId: record.pyeMemId, ccy: record.ccy, stlDat: record.stlDat, currentPage: 1 } },
      });
    },
  };

  const detailModalProps = {
    width: 848,
    footer: null,
    title: commonMap.detail,
    visible: detailModalVisible,
    onCancel: () => {
      dispatch({
        type: 'stlManage/toggleModal',
        payload: { type: 'detail', data: {} },
      });
    },
  };

  const detailFormProps = {
    data,
  }

   /**
   * 结算明细--begin
   */
  //modal属性
  const stlDetailModalProps = {
    width: 1200,
    footer: null,
    title: bizMap.stlDetlOper,
    visible: stlDetailModalVisible,
    onCancel: () => {
      dispatch({
        type: 'stlManage/toggleModal',
        payload: { type: 'stlDetail', data: {} },
      });
    },
  }
  //table属性
  const stlDetailTableProps = {
    stlTableList,
    stlTableLoading,
    stlTableTotal,
    stlTableCurrentPage,
    tablePageChange: (next) => {
      dispatch({
        type: 'stlManage/qryStlDetail',
        payload: { stlTableParam: { ...stlTableParam, currentPage: next } },
      });
    },
  }
  /**
   * 结算明细--end
   */

  /**
   * 实时订单明细--按照订单，按照金额不显示 begin
   */
  //modal属性
  const stlOrdDetailModalProps = {
    width: 1200,
    footer: null,
    title: bizMap.ordDetlOper,
    visible: stlOrdDetailModalVisible,
    onCancel: () => {
      dispatch({
        type: 'stlManage/toggleModal',
        payload: { type: 'ordDetail', data: {} },
      });
    },
  }

  //table属性
  const stlOrdDetailTableProps = {
    orderTableList,
    orderTableLoading,
    orderTableTotal,
    orderTableCurrentPage,
    tablePageChange: (next) => {
      dispatch({
        type: 'stlManage/qryStlOrdDetail',
        payload: { orderTableParam: { ...orderTableParam, currentPage: next } },
      });
    },
  }
  /**
   * 实时订单明细-end
   */

  /**
   * 业务结算明细弹出框 --begin
   */
  //业务结算明细modal属性
  const businessStlDetailModalProps = {
    width: 1200,
    footer: null,
    title: bizMap.stlDetlOper,
    visible: businessStlDetailModalVisible,
    onCancel: () => {
      dispatch({
        type: 'stlManage/toggleModal',
        payload: { type: 'businessStlDetail', data: {} },
      });
    },
  }

  //业务结算明细table属性
  const businessStlDetailTableProps = {
    businessStlTableList,
    businessStlTableLoading,
    businessStlTableTotal,
    businessStlTableCurrentPage,
    businessStlTablePageChange: (next) => {
      dispatch({
        type: 'stlManage/qryBusinessStlDetail',
        payload: { businessStlTableParam: { ...businessStlTableParam, currentPage: next } },
      });
    },
  }
  /**
   * 业务结算明细弹出框 --end
   */

//详情 modal属性
  const businessDetailModalProps = {
    width: 848,
    footer: null,
    title: commonMap.detail,
    visible: businessDetailModalVisible,
    onCancel: () => {
      dispatch({
        type: 'stlManage/toggleModal',
        payload: { type: 'businessDetail', data: {} },
      });
    },
  };

  //详情 数据属性
  const businessDetailFormProps = {
    data,
  }

  //交易明细modal属性
  const stlTradeTableModalProps = {
    footer: null,
    title: commonMap.detail,
    visible: stlTradeModalVisible,
    width: 1200,
    onCancel: () => {
      dispatch({
        type: 'stlManage/updateState',
        payload: { stlTradeModalVisible: false },
      });
    },
  }

  //交易明细table属性
  const stlTradeTableProps = {
    stlTradetableList,
    stlTradetableLoading,
    stlTradetableTotal,
    stlTradetableCurrentPage,
    stlTradeTableParam,
    tablePageChange: (next) => {
      dispatch({
        type: 'stlManage/queryBusinessTransactonList',
        payload: { stlBusinessShrTableParam: { currentPage: next } },
      });
    },
  }

  return (
    <div>
      <Card {...cardProps}>
        <StlQueryForm {...queryFormProps} />
        <StlPageTable {...tableProps} />
      </Card>
      <Modal {...detailModalProps}>
        <StlDetailForm {...detailFormProps} />
      </Modal>
      <Modal {...stlDetailModalProps}>
        <StlAccDetailTable {...stlDetailTableProps} />
      </Modal>
      <Modal {...stlOrdDetailModalProps}>
        <StlOrdDetailTable {...stlOrdDetailTableProps} />
      </Modal>
      <Modal {...businessDetailModalProps}>
        <StlBusinessDetailForm {...businessDetailFormProps} />
      </Modal>
      <Modal {...businessStlDetailModalProps}>
        <StlBusinessAccDetailTable {...businessStlDetailTableProps} />
      </Modal>
      <Modal {...stlTradeTableModalProps}>
        <StlTradeTable {...stlTradeTableProps} />
      </Modal>
    </div>
  );
}

function mapStateToProps({ stlManage }) {
  return { stlManage };
}

export default connect(mapStateToProps)(StlManage);
