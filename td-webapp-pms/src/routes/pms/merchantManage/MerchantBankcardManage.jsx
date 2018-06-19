import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import * as i18n from '../../../utils/i18n';
import { callNotice, callConfirm } from '../../../utils/alert';
import MerchantBankcardPageTable from '../../../components/business/pms/merchantBankcard/MerchantBankcardPageTable';
import MerchantBankcardQueryForm from '../../../components/business/pms/temp/merchant/MerchantQueryForm';
import MerchantBankcardInfoTable from '../../../components/business/pms/merchantBankcard/MerchantBankcardInfoTable';
import MerchantBankcardInfoForm from '../../../components/business/pms/merchantBankcard/MerchantBankcardInfoForm';
import TerminalBankcardPageInfoForm from '../../../components/business/pms/merchantBankcard/TerminalBankcardPageInfoForm';
import MerchantBankcardAuthInfoForm from '../../../components/business/pms/merchantBankcard/MerchantBankcardAuthInfoForm';

const MerchantBankcardManage = ({ dispatch, merchantBankcardManage }) => {
  const objectId1 = 'chnMerNo';
  const objectId2 = 'chnId';
  const bizMap = i18n.bizMap('pms/merchantBankcard');
  const commonMap = i18n.commonMap();
  const {
    tableList,
    tableLoading,
    tableTotal,
    tableParam,
    tableSelects,
    tableCurrentPage,

    infoModalVisible,
    infoTableData,

    updateBasicFormData,
    updateBasicFormSubmit,
    updateBasicModalVisible,

    termModalVisible,
    termTableParam,
    termTableTotal,
    termTableList,
    termTableLoading,
    termTableCurrentPage,

    advExpand,

    authUpdModalVisible,
    authUpdFormData,
    authUpdFormSubmit,

    chnId,
    chnMerNo,
  } = merchantBankcardManage;
  const chnMerNos = [];
  const chnIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const chnMerNo = typeof tableSelects[i] === 'object' ? tableSelects[i][objectId1] : tableSelects[i];
    const chnId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectId2] : tableSelects[i];
    chnMerNos.push(chnMerNo);
    chnIds.push(chnId);
  }
  const cardProps = {
    title: bizMap.merchantBankcard,
    style: { width: '100%' },
  };
  const tableProps = {
    tableList,
    tableLoading,
    tableTotal,
    tableCurrentPage,
    tablePageChange(next) {
      dispatch({
        type: 'merchantBankcardManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'merchantBankcardManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'merchantBankcardManage/toggleModal',
        payload: { type: 'info', data: record },
      });
    },
    handleBasicUpdateClick(record) {
      const data = record;
      dispatch({
        type: 'merchantBankcardManage/toggleModal',
        payload: { type: 'update', data: data },
      });
    },
    handleTermInfClick(record) {
      dispatch({
        type: 'merchantBankcardManage/queryTermList',
        payload: { termTableParam: { ...termTableParam, chnMerNo: record.chnMerNo, chnId: record.chnId } },
      });
    },
    handleAuthUpdateClick(record) {
      dispatch({
        type: 'merchantBankcardManage/toggleAuthExpand',
        payload: { fPospayTxnSup: record.fpospayTxnSup, pospayTxnSup: record.pospayTxnSup, chnMerNo: record.chnMerNo, chnId: record.chnId },
      });
    },
  };
  const queryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'merchantBankcardManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    enableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        const chnMerStatus = tableSelects[0].chnMerStatus;
        for (let i = 0; i < tableSelects.length; i++) {
          if (chnMerStatus !== tableSelects[i].chnMerStatus) {
            callNotice(commonMap.warning, bizMap.statusNotMatch, 'warning');
            return;
          }
          if (tableSelects[i].chnMerStatus !== '0' && tableSelects[i].chnMerStatus !== '1') {
            callNotice(commonMap.warning, bizMap.programErr, 'warning');
            return;
          }
        }
        if (chnMerStatus === '1') {
          callNotice(commonMap.warning, commonMap.enaleNotice, 'warning');
          return;
        }
        callConfirm(commonMap.tip, commonMap.enableConfirm, () => {
          dispatch({
            type: 'merchantBankcardManage/updateStatus',
            payload: { chnMerNos: chnMerNos.toString(), chnIds: chnIds.toString(), chnMerStatus: '1' },
          });
        });
      }
    },
    disableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        const chnMerStatus = tableSelects[0].chnMerStatus;
        for (let i = 0; i < tableSelects.length; i++) {
          if (chnMerStatus !== tableSelects[i].chnMerStatus) {
            callNotice(commonMap.warning, bizMap.statusNotMatch, 'warning');
            return;
          }
          if (tableSelects[i].chnMerStatus !== '0' && tableSelects[i].chnMerStatus !== '1') {
            callNotice(commonMap.warning, bizMap.programErr, 'warning');
            return;
          }
        }
        if (chnMerStatus === '0') {
          callNotice(commonMap.warning, commonMap.disableNotice, 'warning');
          return;
        }
        callConfirm(commonMap.tip, commonMap.disableConfirm, () => {
          dispatch({
            type: 'merchantBankcardManage/updateStatus',
            payload: { chnMerNos: chnMerNos.toString(), chnIds: chnIds.toString(), chnMerStatus: '0' },
          });
        });
      }
    },
    deleteClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        // 判断所选渠道商户是否被禁用
        for (let i = 0; i < tableSelects.length; i++) {
          if (tableSelects[i].chnMerStatus === '1') {
            callNotice(commonMap.warning, bizMap.exitEnable, 'warning');
            return;
          }
          if (tableSelects[i].chnMerStatus !== '0' && tableSelects[i].chnMerStatus !== '1') {
            callNotice(commonMap.warning, bizMap.programErr, 'warning');
            return;
          }
        }
        callConfirm(commonMap.tip, commonMap.deleteConfirm, () => {
          dispatch({
            type: 'merchantBankcardManage/deleteList',
            payload: { chnMerNos: chnMerNos.toString(), chnIds: chnIds.toString() },
          });
        });
      }
    },
  };
  const infoModalProps = {
    footer: null,
    title: commonMap.detail,
    visible: infoModalVisible,
    onCancel: () => {
      dispatch({
        type: 'merchantBankcardManage/toggleModal',
        payload: { type: 'info', data: {} },
      });
    },
  };
  const infoTableProps = {
    data: infoTableData,
  };
  const channel = [];
  channel.push(updateBasicFormData.txnChannel);
  const updateBasicFormProps = {
    data: updateBasicFormData,
    submiting: updateBasicFormSubmit,
    advExpand: advExpand,
    optType: '2',
    txnChannelSupportList: updateBasicFormData && updateBasicFormData.txnChannel ? channel : [],
    formSubmit: (dat) => {
      dispatch({
        type: 'merchantBankcardManage/updateOne',
        payload: { ...dat },
      });
    },
    advLinkClick: () => {
      dispatch({
        type: 'merchantBankcardManage/updateState',
        payload: { advExpand: !advExpand },
      });
    },
  };
  const updateBasicModalProps = {
    footer: null,
    title: commonMap.update,
    visible: updateBasicModalVisible,
    width: 900,
    onCancel: () => {
      dispatch({
        type: 'merchantBankcardManage/toggleModal',
        payload: { type: 'update', data: {} },
      });
    },
  };

  const termInfModalProps = {
    footer: null,
    title: bizMap.bankcardTermInf,
    visible: termModalVisible,
    width: 800,
    onCancel: () => {
      dispatch({
        type: 'merchantBankcardManage/updateState',
        payload: { termModalVisible: !termModalVisible },
      });
    },
  };

  const termInfFormProps = {
    tableList: termTableList,
    tableTotal: termTableTotal,
    tableLoading: termTableLoading,
    tableCurrentPage: termTableCurrentPage,
    tablePageChange(next) {
      dispatch({
        type: 'merchantBankcardManage/queryTermList',
        payload: { termTableParam: { ...termTableParam, currentPage: next } },
      });
    },
  };

  const authUpdModalProps = {
    footer: null,
    width: 880,
    title: bizMap.bankcardTxnAuth,
    visible: authUpdModalVisible,
    onCancel: () => {
      dispatch({
        type: 'merchantBankcardManage/updateState',
        payload: { authUpdModalVisible: !authUpdModalVisible },
      });
    },
  };

  const authUpdFormProps = {
    data: authUpdFormData,
    submiting: authUpdFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'merchantBankcardManage/updAuthInfo',
        payload: { ...dat, chnId: chnId, chnMerNo: chnMerNo },
      });
    },
    changeAuthData: (authData) => {
      dispatch({
        type: 'merchantBankcardManage/changeAuthData',
        payload: { data: { authData } },
      });
    },
  };

  const UpdateBasicFormGen = () => <MerchantBankcardInfoForm {...updateBasicFormProps} />
  const TermInfFormGen = () => <TerminalBankcardPageInfoForm {...termInfFormProps} />
  const AuthUpdFormGen = () => <MerchantBankcardAuthInfoForm {...authUpdFormProps} />
  return (
    <div>
      <Card {...cardProps}>
        <MerchantBankcardQueryForm {...queryFormProps} />
        <MerchantBankcardPageTable {...tableProps} />
      </Card>
      <Modal {...infoModalProps}>
        <MerchantBankcardInfoTable {...infoTableProps} />
      </Modal>
      <Modal {...updateBasicModalProps}>
        <UpdateBasicFormGen />
      </Modal>
      <Modal {...termInfModalProps}>
        <TermInfFormGen />
      </Modal>
      <Modal {...authUpdModalProps}>
        <AuthUpdFormGen />
      </Modal>
    </div>
  );
}

function mapStateToProps(merchantBankcardManage) {
  return (merchantBankcardManage);
}

export default connect(mapStateToProps)(MerchantBankcardManage);
