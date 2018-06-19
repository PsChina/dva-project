import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import LogQueryForm from '../../../components/business/bas/log/LogQueryForm';
import LogPageTable from '../../../components/business/bas/log/LogPageTable';
import LogInfoTable from '../../../components/business/bas/log/LogInfoTable';
import * as i18n from '../../../utils/i18n';

const LogManage = ({ dispatch, logManage }) => {
  const objectid = 'usrId';
  const bizMap = i18n.bizMap('bas/log');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage, tableSelects,
    infoModalVisible, infoTableData,
  } = logManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }
  // const selectIds = [];
  // for (let i = 0; i < tableSelects.length; i++) {
  //   selectIds.push(tableSelects[i].usrId);
  // }
  const cardProps = {
    title: bizMap.logManage,
    style: { width: '100%' },
  };
  const queryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'logManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
  };
  const tableProps = {
    tableList,
    tableLoading,
    tableTotal,
    tableCurrentPage,
    tableParam,
    tablePageChange(next) {
      dispatch({
        type: 'logManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'logManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'logManage/toggleModal',
        payload: { type: 'info', data: record },
      });
    },
  };
  const infoModalProps = {
    footer: null,
    title: commonMap.detail,
    visible: infoModalVisible,
    onCancel: () => {
      dispatch({
        type: 'logManage/toggleModal',
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
        <LogQueryForm {...queryFormProps} />
        <LogPageTable {...tableProps} />
      </Card>
      <Modal {...infoModalProps}>
        <LogInfoTable {...infoTableProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ logManage }) {
  return { logManage };
}

export default connect(mapStateToProps)(LogManage);
