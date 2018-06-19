import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import PubMessageQueryForm from '../../../components/business/bas/pubMessage/PubMessageQueryForm';
import PubMessagePageTable from '../../../components/business/bas/pubMessage/PubMessagePageTable';
import PubMessageTable from '../../../components/business/bas/pubMessage/PubMessageTable';
import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const PubMessageManage = ({ dispatch, pubMessageManage }) => {
  const objectid = 'msgId';
  const bizMap = i18n.bizMap('bas/pubMessage');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage, tableSelects,
    infoModalVisible, infoTableData,
  } = pubMessageManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }
  const cardProps = {
    title: bizMap.pubMessageManage,
    style: { width: '100%' },
  };
  const queryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'pubMessageManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    addClick: () => {
      dispatch({
        type: 'pubMessageManage/toggleModal',
        payload: { type: 'add' },
      });
    },
    deleteClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        for (let i = 0; i < tableSelects.length; i++) {
          if (tableSelects[i].isUse === '1') {
            callNotice(commonMap.warning, commonMap.enaleNotice, 'warning');
            return;
          }
        }
        callConfirm(commonMap.tip, commonMap.deleteConfirm, () => {
          dispatch({
            type: 'pubMessageManage/deleteList',
            payload: { ids: selectIds.toString() },
          });
        });
      }
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
        type: 'pubMessageManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'pubMessageManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'pubMessageManage/toggleModal',
        payload: { type: 'info', data: record },
      });
    },
    handleResendClick(record) {
      callConfirm(commonMap.tip, bizMap.resendConfirm, () => {
        dispatch({
          type: 'pubMessageManage/resend',
          payload: { ...record },
        });
      });
    },
  };
  const infoModalProps = {
    footer: null,
    title: commonMap.detail,
    visible: infoModalVisible,
    width: 848,
    onCancel: () => {
      dispatch({
        type: 'pubMessageManage/toggleModal',
        payload: { type: 'info', data: {} },
      });
    },
  };
  const infoTableProps = {
    data: infoTableData,
  };
  // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  return (
    <div>
      <Card {...cardProps}>
        <PubMessageQueryForm {...queryFormProps} />
        <PubMessagePageTable {...tableProps} />
      </Card>
      <Modal {...infoModalProps}>
        <PubMessageTable {...infoTableProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ pubMessageManage }) {
  return { pubMessageManage };
}

export default connect(mapStateToProps)(PubMessageManage);
