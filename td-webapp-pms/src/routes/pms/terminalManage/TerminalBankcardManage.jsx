import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';
import TerminalBankcardQueryForm from '../../../components/business/pms/terminalBankcard/TerminalBankcardQueryForm';
import TerminalBankcardPageTable from '../../../components/business/pms/terminalBankcard/TerminalBankcardPageTable';
import TerminalBankcardInfoTable from '../../../components/business/pms/terminalBankcard/TerminalBankcardInfoTable';
import TerminalBankcardKeyInfoForm from '../../../components/business/pms/terminalBankcard/TerminalBankcardKeyInfoForm';
import TerminalBankcardInfoForm from '../../../components/business/pms/terminalBankcard/TerminalBankcardInfoForm';

const TerminalBankcardManage = ({ dispatch, terminalBankcardManage }) => {
  const objectId1 = 'chnTermNo';
  const objectId2 = 'chnMerNo';
  const objectId3 = 'chnId';
  const bizMap = i18n.bizMap('pms/terminalBankcard');
  const commonMap = i18n.commonMap();
  const {
    tableList,
    tableLoading,
    tableTotal,
    tableCurrentPage,
    tableParam,
    tableSelects,

    infoModalVisible,
    infoTableData,

    updateModalVisible,
    updateFormData,
    updateFormSubmit,

    addModalVisible,
    addFormSubmit,
    chnList,
    uuid,
    data,
    keys,

    chnMerNoList,
  } = terminalBankcardManage;
  const cardProps = {
    title: bizMap.terminal,
    style: { width: '100%' },
  };
  const chnTermNos = [];
  const chnMerNos = [];
  const chnIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const chnTermNo = typeof tableSelects[i] === 'object' ? tableSelects[i][objectId1] : tableSelects[i];
    const chnMerNo = typeof tableSelects[i] === 'object' ? tableSelects[i][objectId2] : tableSelects[i];
    const chnId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectId3] : tableSelects[i];
    chnTermNos.push(chnTermNo);
    chnMerNos.push(chnMerNo);
    chnIds.push(chnId);
  }
  const queryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'terminalBankcardManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    enableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        const termStatus = tableSelects[0].termStatus;
        for (let i = 0; i < tableSelects.length; i++) {
          if (termStatus !== tableSelects[i].termStatus) {
            callNotice(commonMap.warning, bizMap.statusNotMatch, 'warning');
            return;
          }
          if (tableSelects[i].termStatus !== '0' && tableSelects[i].termStatus !== '1') {
            callNotice(commonMap.warning, bizMap.programErr, 'warning');
            return;
          }
        }
        if (termStatus === '1') {
          callNotice(commonMap.warning, commonMap.enaleNotice, 'warning');
          return;
        }
        callConfirm(commonMap.tip, commonMap.enableConfirm, () => {
          dispatch({
            type: 'terminalBankcardManage/updateStatus',
            payload: { chnTermNos: chnTermNos.toString(), chnMerNos: chnMerNos.toString(), chnIds: chnIds.toString(), termStatus: '1' },
          });
        });
      }
    },
    disableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        const termStatus = tableSelects[0].termStatus;
        for (let i = 0; i < tableSelects.length; i++) {
          if (termStatus !== tableSelects[i].termStatus) {
            callNotice(commonMap.warning, bizMap.statusNotMatch, 'warning');
            return;
          }
          if (tableSelects[i].termStatus !== '0' && tableSelects[i].termStatus !== '1') {
            callNotice(commonMap.warning, bizMap.programErr, 'warning');
            return;
          }
        }
        if (termStatus === '0') {
          callNotice(commonMap.warning, commonMap.disableNotice, 'warning');
          return;
        }
        callConfirm(commonMap.tip, commonMap.disableConfirm, () => {
          dispatch({
            type: 'terminalBankcardManage/updateStatus',
            payload: { chnTermNos: chnTermNos.toString(), chnMerNos: chnMerNos.toString(), chnIds: chnIds.toString(), termStatus: '0' },
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
          if (tableSelects[i].termStatus === '1') {
            callNotice(commonMap.warning, bizMap.exitEnable, 'warning');
            return;
          }
          if (tableSelects[i].termStatus !== '0' && tableSelects[i].termStatus !== '1') {
            callNotice(commonMap.warning, bizMap.programErr, 'warning');
            return;
          }
        }
        callConfirm(commonMap.tip, commonMap.deleteConfirm, () => {
          dispatch({
            type: 'terminalBankcardManage/deleteList',
            payload: { chnTermNos: chnTermNos.toString(), chnMerNos: chnMerNos.toString(), chnIds: chnIds.toString() },
          });
        });
      }
    },

    addClick: () => {
      dispatch({
        type: 'terminalBankcardManage/queryChnList',
        payload: { tableParam: { currentPage: 1 } },
      });
    },
  };

  const tableProps = {
    tableList,
    tableLoading,
    tableTotal,
    tableCurrentPage,
    tablePageChange(next) {
      dispatch({
        type: 'terminalBankcardManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'terminalBankcardManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'terminalBankcardManage/toggleModal',
        payload: { type: 'info', data: record },
      });
    },
    handleKeyUpdateClick(record) {
      dispatch({
        type: 'terminalBankcardManage/toggleModal',
        payload: { type: 'update', data: record },
      });
    },
  };

  const infoModalProps = {
    footer: null,
    title: commonMap.detail,
    visible: infoModalVisible,
    width: 660,
    onCancel: () => {
      dispatch({
        type: 'terminalBankcardManage/toggleModal',
        payload: { type: 'info', data: {} },
      });
    },
  };

  const infoTableProps = {
    data: infoTableData,
  };

  const updateModalProps = {
    footer: null,
    title: commonMap.update,
    visible: updateModalVisible,
    width: 800,
    onCancel: () => {
      dispatch({
        type: 'terminalBankcardManage/toggleModal',
        payload: { type: 'update', data: {} },
      });
    },
  };

  const updateFormProps = {
    data: updateFormData,
    submiting: updateFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'terminalBankcardManage/updateKey',
        payload: { ...dat },
      });
    },
  };

  const addModalProps = {
    footer: null,
    title: commonMap.add,
    visible: addModalVisible,
    width: 800,
    onCancel: () => {
      dispatch({
        type: 'terminalBankcardManage/toggleModal',
        payload: { type: 'add', data: {} },
      });
    },
  };

  const addFormProps = {
    style: { width: 770, margin: 'auto', marginTop: 24 },
    chnList: chnList,
    uuid: uuid,
    data: data,
    aaa: '123s',
    submiting: addFormSubmit,
    keys: keys,
    chnMerNoList: chnMerNoList,
    changeUuid: (uuid, keys, opt, formData) => {
      let id = 0;
      let keyArr = [0];
      if (opt === 'add') {
        id = uuid + 1;
        keyArr = keys.concat(id);
      } else {
        id = uuid - 1;
        keyArr = keys;
      }
      dispatch({
        type: 'terminalBankcardManage/updateState',
        payload: { uuid: id, keys: keyArr, data: { ...formData } },
      });
    },
    queryChnMerInf: (dat) => {
      dispatch({
        type: 'terminalBankcardManage/queryChnMerInf',
        payload: { chnId: dat },
      });
    },
    formSubmit: (dat) => {
      dispatch({
        type: 'terminalBankcardManage/addList',
        payload: { formData: dat },
      });
    },

  };

  const UpdateFormGen = () => <TerminalBankcardKeyInfoForm {...updateFormProps} />
  const AddFormGen = () => <TerminalBankcardInfoForm {...addFormProps} />
  return (
    <div>
      <Card {...cardProps}>
        <TerminalBankcardQueryForm {...queryFormProps} />
        <TerminalBankcardPageTable {...tableProps} />
      </Card>
      <Modal {...infoModalProps}>
        <TerminalBankcardInfoTable {...infoTableProps} />
      </Modal>
      <Modal {...updateModalProps}>
        <UpdateFormGen />
      </Modal>
      <Modal {...addModalProps}>
        <AddFormGen />
      </Modal>
    </div>
  );
};

function mapStateToProps({ terminalBankcardManage }) {
  return { terminalBankcardManage };
}

export default connect(mapStateToProps)(TerminalBankcardManage);

