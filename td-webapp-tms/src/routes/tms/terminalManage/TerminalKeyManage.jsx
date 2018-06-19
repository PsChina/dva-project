import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import TerminalKeyQueryForm from '../../../components/business/tms/key/TerminalKeyQueryForm';
import TerminalKeyPageTable from '../../../components/business/tms/key/TerminalKeyPageTable';
import TerminalKeyInfoTable from '../../../components/business/tms/key/TerminalKeyInfoTable';
import PasswordForm from '../../../components/business/tms/key/PasswordForm';
import { callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const TerminalKeyManage = ({ dispatch, terminalKeyManage }) => {
  const objectid = 'terId';
  const bizMap = i18n.bizMap('tms/terminalKey');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableSelects,
    infoModalVisible, infoTableData, tableCurrentPage, passwordFormSubmit, keysExport,
  } = terminalKeyManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }

  const cardProps = {
    title: bizMap.terminalCompany,
    style: { width: '100%' },
  };
  const passwordFormProps = {
    submiting: passwordFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'terminalKeyManage/verifyPassword',
        payload: { ...Object.assign(dat, infoTableData) },
      });
    },
  };
  const qryPasswordFormProps = {
    submiting: passwordFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'terminalKeyManage/qryVerifyPassword',
        payload: { ...dat },
      });
    },
  };
  const queryFormProps = {
    keysExport,
    formSubmit: (dat) => {
      dispatch({
        type: 'terminalKeyManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    formReset: () => {
      dispatch({
        type: 'terminalKeyManage/updateState',
        payload: { tableParam: { currentPage: 1 } },
      });
    },
    exportClick: () => {
      callConfirm(commonMap.tip, commonMap.exportQueryConfirm, () => {
        dispatch({
          type: 'terminalKeyManage/exportList',
          payload: { ...tableParam },
        });
      });
    },
    chargeKeysExport: () => {
      dispatch({
        type: 'terminalKeyManage/updateState',
        payload: { keysExport: '0' },
      });
    },
    detailContent: <PasswordForm {...qryPasswordFormProps} />,
  };
  const tableProps = {
    tableCurrentPage,
    tableList,
    tableLoading,
    tableTotal,
    tablePageChange(next) {
      dispatch({
        type: 'terminalKeyManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    setInfoFormData: (record) => {
      dispatch({
        type: 'terminalKeyManage/toggleModal',
        payload: { type: 'password', data: record },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'terminalKeyManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    detailContent: <PasswordForm {...passwordFormProps} />,
  };
  const infoModalProps = {
    width: 848,
    footer: null,
    title: commonMap.detail,
    visible: infoModalVisible,
    onCancel: () => {
      dispatch({
        type: 'terminalKeyManage/toggleModal',
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
        <TerminalKeyQueryForm {...queryFormProps} />
        <TerminalKeyPageTable {...tableProps} />
      </Card>
      <Modal {...infoModalProps}>
        <TerminalKeyInfoTable {...infoTableProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ terminalKeyManage }) {
  return { terminalKeyManage };
}

export default connect(mapStateToProps)(TerminalKeyManage);
