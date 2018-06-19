import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import TerminalQueryForm from '../../../components/business/tms/terminal/TerminalQueryForm';
import TerminalPageTable from '../../../components/business/tms/terminal/TerminalPageTable';
import TerminalInfoTable from '../../../components/business/tms/terminal/TerminalInfoTable';
import TerminalAuthInfoForm from '../../../components/business/tms/terminal/TerminalAuthInfoForm';

import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const TerminalManage = ({ dispatch, terminalManage }) => {
  const objectid = 'terId';
  const bizMap = i18n.bizMap('tms/terminal');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableSelects, updateFormData, updateFormSubmit,
    updateAuthModalVisible, advExpand, infoModalVisible, infoTableData, tableCurrentPage,
  } = terminalManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }

  const cardProps = {
    title: bizMap.terminal,
    style: { width: '100%' },
  };
  const queryFormProps = {
    advExpand,
    collapseClick: () => {
      dispatch({
        type: 'terminalManage/toggleAdvExpand',
      });
    },
    formSubmit: (dat) => {
      dispatch({
        type: 'terminalManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    enableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        callConfirm(commonMap.tip, commonMap.enableConfirm, () => {
          dispatch({
            type: 'terminalManage/updateStatus',
            payload: { ids: selectIds.toString(), terStatue: '1' },
          });
        });
      }
    },
    disableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        callConfirm(commonMap.tip, commonMap.disableConfirm, () => {
          dispatch({
            type: 'terminalManage/updateStatus',
            payload: { ids: selectIds.toString(), terStatue: '0' },
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
    tablePageChange(next) {
      dispatch({
        type: 'terminalManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'terminalManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'terminalManage/toggleModal',
        payload: { type: 'info', data: record },
      });
    },
    handleUpdateAuthClick(record) {
      dispatch({
        type: 'terminalManage/queryAuthDetail',
        payload: { data: record },
      });
    },
  };
  const authModalProps = {
    width: 848,
    footer: null,
    title: bizMap.terminalAuth,
    visible: updateAuthModalVisible,
    onCancel: () => {
      dispatch({
        type: 'terminalManage/toggleModal',
        payload: { type: 'updateAuth', data: {} },
      });
    },
  };
  const authFormProps = {
    data: updateFormData,
    submiting: updateFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'terminalManage/updateAuth',
        payload: { ...dat },
      });
    },
    changeAuthData: (authData) => {
      dispatch({
        type: 'terminalManage/changeAuthData',
        payload: { data: { authData } },
      });
    },
  };
  const infoModalProps = {
    width: 666,
    footer: null,
    title: commonMap.detail,
    visible: infoModalVisible,
    onCancel: () => {
      dispatch({
        type: 'terminalManage/toggleModal',
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
        <TerminalQueryForm {...queryFormProps} />
        <TerminalPageTable {...tableProps} />
      </Card>
      <Modal {...authModalProps}>
        <TerminalAuthInfoForm {...authFormProps} />
      </Modal>
      <Modal {...infoModalProps}>
        <TerminalInfoTable {...infoTableProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ terminalManage }) {
  return { terminalManage };
}

export default connect(mapStateToProps)(TerminalManage);
