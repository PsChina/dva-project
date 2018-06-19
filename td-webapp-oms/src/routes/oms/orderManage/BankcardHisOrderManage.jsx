import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import BankcardHisOrderQueryForm from '../../../components/business/oms/bankcardHisOrder/BankcardHisOrderQueryForm';
import BankcardHisOrderPageTable from '../../../components/business/oms/bankcardHisOrder/BankcardHisOrderPageTable';
import BankcardHisOrderInfoTable from '../../../components/business/oms/bankcardHisOrder/BankcardHisOrderInfoTable';
import * as i18n from '../../../utils/i18n';
import { callNotice, callConfirm } from '../../../utils/alert';

const BankcardHisOrderManage = ({ dispatch, bankcardHisOrderManage }) => {
  const objectid = 'txnNo';
  const bizMap = i18n.bizMap('oms/bankcardOrder');
  const commonMap = i18n.commonMap();
  const {
    tableCurrentPage, tableParam, tableLoading, tableList, tableTotal, advExpand,
    tableSelects, infoTableData, infoModalVisible,
  } = bankcardHisOrderManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }
  const cardProps = {
    title: bizMap.hisBankcardOrder,
    style: { width: '100%' },
  };
  const queryFormProps = {
    advExpand,
    formSubmit: (dat) => {
      dispatch({
        type: 'bankcardHisOrderManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    collapseClick: () => {
      dispatch({
        type: 'bankcardHisOrderManage/toggleAdvExpand',
      });
    },
    handlerFrozenBtnClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        callConfirm(commonMap.tip, bizMap.frozenConfirm, () => {
          dispatch({
            type: 'bankcardHisOrderManage/updateStatus',
            payload: { ids: selectIds.toString(), freezeStatus: '1' },
          });
        });
      }
    },
    handlerUnfrozenBtnClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        callConfirm(commonMap.tip, bizMap.unfrozenConfirm, () => {
          dispatch({
            type: 'bankcardHisOrderManage/updateStatus',
            payload: { ids: selectIds.toString(), freezeStatus: '0' },
          });
        });
      }
    },
  };
  const tableProps = {
    tableCurrentPage,
    tableList,
    tableLoading,
    tableTotal,
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'bankcardHisOrderManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    tablePageChange(next) {
      dispatch({
        type: 'bankcardHisOrderManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'bankcardHisOrderManage/queryOne',
        payload: { data: record },
      });
    },
    handleTransferOrderClick(record) {
      dispatch({
        type: 'bankcardHisOrderManage/transferOrder',
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
        type: 'bankcardHisOrderManage/toggleModal',
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
        <BankcardHisOrderQueryForm {...queryFormProps} />
        <BankcardHisOrderPageTable {...tableProps} />
      </Card>
      <Modal {...infoModalProps}>
        <BankcardHisOrderInfoTable {...infoTableProps} />
      </Modal>
    </div>

  );
};

function mapStateToProps({ bankcardHisOrderManage }) {
  return { bankcardHisOrderManage };
}

export default connect(mapStateToProps)(BankcardHisOrderManage);
