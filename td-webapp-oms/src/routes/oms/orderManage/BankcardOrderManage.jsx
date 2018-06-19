import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import BankcardOrderQueryForm from '../../../components/business/oms/bankcardOrder/BankcardOrderQueryForm';
import BankcardOrderPageTable from '../../../components/business/oms/bankcardOrder/BankcardOrderPageTable';
import BankcardOrderInfoTable from '../../../components/business/oms/bankcardOrder/BankcardOrderInfoTable';
import * as i18n from '../../../utils/i18n';
import { callNotice, callConfirm } from '../../../utils/alert';

const BankcardOrderManage = ({ dispatch, bankcardOrderManage }) => {
  const objectid = 'txnNo';
  const bizMap = i18n.bizMap('oms/bankcardOrder');
  const commonMap = i18n.commonMap();
  const {
    tableCurrentPage, tableParam, tableLoading, tableList, tableTotal, advExpand,
    tableSelects, infoModalVisible, infoTableData,
  } = bankcardOrderManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }
  const cardProps = {
    title: bizMap.todayBankcardOrder,
    style: { width: '100%' },
  };
  const queryFormProps = {
    advExpand,
    formSubmit: (dat) => {
      dispatch({
        type: 'bankcardOrderManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    collapseClick: () => {
      dispatch({
        type: 'bankcardOrderManage/toggleAdvExpand',
      });
    },
    handlerFrozenBtnClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        callConfirm(commonMap.tip, bizMap.frozenConfirm, () => {
          dispatch({
            type: 'bankcardOrderManage/updateStatus',
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
            type: 'bankcardOrderManage/updateStatus',
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
        type: 'bankcardOrderManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    tablePageChange(next) {
      dispatch({
        type: 'bankcardOrderManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'bankcardOrderManage/queryOne',
        payload: { data: record },
      });
    },
    handleTransferOrderClick(record) {
      dispatch({
        type: 'bankcardOrderManage/transferOrder',
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
        type: 'bankcardOrderManage/toggleModal',
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
        <BankcardOrderQueryForm {...queryFormProps} />
        <BankcardOrderPageTable {...tableProps} />
      </Card>
      <Modal {...infoModalProps}>
        <BankcardOrderInfoTable {...infoTableProps} />
      </Modal>
    </div>

  );
};

function mapStateToProps({ bankcardOrderManage }) {
  return { bankcardOrderManage };
}

export default connect(mapStateToProps)(BankcardOrderManage);
