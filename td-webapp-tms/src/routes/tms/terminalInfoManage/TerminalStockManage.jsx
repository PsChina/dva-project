import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import TerminalStockQueryForm from '../../../components/business/tms/stock/TerminalStockQueryForm';
import TerminalStockPageTable from '../../../components/business/tms/stock/TerminalStockPageTable';
import TerminalStockInfoTable from '../../../components/business/tms/stock/TerminalStockInfoTable';
import TerminalStocksOutInfoForm from '../../../components/business/tms/stock/TerminalStocksOutInfoForm';
import TerminalStockLogInfoTable from '../../../components/business/tms/stock/TerminalStockLogInfoTable';

import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const TerminalStockManage = ({ dispatch, terminalStockManage }) => {
  const objectid = 'terId';
  const bizMap = i18n.bizMap('tms/terminalStock');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableSelects, updateFormSubmit,
    stocksOutModalVisible, stockLogModalVisible, stockLogList, terVerOptionsData, parModOptionsData,
    infoModalVisible, infoTableData, advExpand, tableCurrentPage, ids,
  } = terminalStockManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }

  const cardProps = {
    title: bizMap.terminalStock,
    style: { width: '100%' },
  };
  const queryFormProps = {
    advExpand,
    collapseClick: () => {
      dispatch({
        type: 'terminalStockManage/toggleAdvExpand',
      });
    },
    formSubmit: (dat) => {
      dispatch({
        type: 'terminalStockManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    stocksOutClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        let isIn = '1';  // 是否入库状态
        let isSame = '1';  //是否同类型终端
        const oneType = tableSelects[0].terTyp;
        for (let a = 0; a < tableSelects.length; a++) {
          const item = tableSelects[a];
          if (item.stoStatus !== '0') {
            isIn = '0'; break;
          }
          if (item.terTyp !== oneType) {
            isSame = '0'; break;
          }
        }
        if (isIn === '1' && isSame === '1') {
          dispatch({
            type: 'terminalStockManage/queryTerVerOptionDataByCop',
            payload: { copId: tableSelects[0].terCopId },
          });
          dispatch({
            type: 'terminalStockManage/toggleModal',
            payload: { type: 'stocksOut', ids: selectIds.toString(), outType: oneType },
          });
        } else if (isIn === '0') {
          callNotice(commonMap.warning, bizMap.outWarn, 'warning');
        } else {
          callNotice(commonMap.warning, bizMap.typeWarn, 'warning');
        }
      }
    },
    recoveryClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        const dat = tableSelects;
        let flag = '1';
        for (let a = 0; a < dat.length; a++) {
          if (dat[a].terOwn !== '1') {
            flag = '0';
          }
        }
        if (flag === '1') {
          callConfirm(commonMap.tip, bizMap.recoveryConfirm, () => {
            dispatch({
              type: 'terminalStockManage/recoveryList',
              payload: { ids: selectIds.toString() },
            });
          });
        } else {
          callNotice(commonMap.warning, bizMap.recoveryWarn, 'warning');
        }
      }
    },
    deleteClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        const dat = tableSelects;
        let flag = '1';
        for (let a = 0; a < dat.length; a++) {
          if (dat[a].stoStatus !== '2') {
            flag = '0';
          }
        }
        if (flag === '1') {
          callConfirm(commonMap.tip, commonMap.deleteConfirm, () => {
            dispatch({
              type: 'terminalStockManage/deleteList',
              payload: { ids: selectIds.toString() },
            });
          });
        } else {
          callNotice(commonMap.warning, bizMap.deleteWarn, 'warning');
        }
      }
    },
  };
  const tableProps = {
    tableCurrentPage,
    tableList,
    tableLoading,
    tableTotal,
    tablePageChange(next) {
      dispatch({
        type: 'terminalStockManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'terminalStockManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'terminalStockManage/toggleModal',
        payload: { type: 'info', data: record },
      });
    },
    handleQueryLogsClick(record) {
      dispatch({
        type: 'terminalStockManage/queryLogs',
        payload: { data: record, terId: record.terId },
      });
    },
  };
  const stocksOutModalProps = {
    footer: null,
    title: bizMap.stocksOut,
    visible: stocksOutModalVisible,
    onCancel: () => {
      dispatch({
        type: 'terminalStockManage/toggleModal',
        payload: { type: 'stocksOut', data: {} },
      });
    },
  };
  const stocksOutFormProps = {
    ids: ids,
    terVerOptions: terVerOptionsData,
    parModOptions: parModOptionsData,
    submiting: updateFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'terminalStockManage/stocksOut',
        payload: { ...dat },
      });
    },
  };
  const stockLogModalProps = {
    footer: null,
    title: bizMap.stockLog,
    visible: stockLogModalVisible,
    onCancel: () => {
      dispatch({
        type: 'terminalStockManage/toggleModal',
        payload: { type: 'updateLogList', data: {} },
      });
    },
  };
  const stockLogFormProps = {
    data: infoTableData,
    stockLogList: stockLogList,
  };
  const infoModalProps = {
    width: 680,
    footer: null,
    title: commonMap.detail,
    visible: infoModalVisible,
    onCancel: () => {
      dispatch({
        type: 'terminalStockManage/toggleModal',
        payload: { type: 'info', data: {} },
      });
    },
  };
  const infoTableProps = {
    data: infoTableData,
  };
  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  return (
    <div>
      <Card {...cardProps}>
        <TerminalStockQueryForm {...queryFormProps} />
        <TerminalStockPageTable {...tableProps} />
      </Card>
      <Modal {...stocksOutModalProps}>
        <TerminalStocksOutInfoForm {...stocksOutFormProps} />
      </Modal>
      <Modal {...stockLogModalProps}>
        <TerminalStockLogInfoTable {...stockLogFormProps} />
      </Modal>
      <Modal {...infoModalProps}>
        <TerminalStockInfoTable {...infoTableProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ terminalStockManage }) {
  return { terminalStockManage };
}

export default connect(mapStateToProps)(TerminalStockManage);
