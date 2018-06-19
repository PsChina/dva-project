import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import TerminalTxnAuthQueryForm from '../../../components/business/tms/txnAuth/TerminalTxnAuthQueryForm';
import TerminalTxnAuthPageTable from '../../../components/business/tms/txnAuth/TerminalTxnAuthPageTable';
import TerminalTxnAuthInfoForm from '../../../components/business/tms/txnAuth/TerminalTxnAuthInfoForm';
import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const TerminalTxnAuthManage = ({ dispatch, terminalTxnAuthManage }) => {
  const objectid = 'txnAuthNo';
  const bizMap = i18n.bizMap('tms/terminalTxnAuth');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableSelects,
    addModalVisible, updateModalVisible, addFormSubmit, updateFormSubmit, addFormData, updateFormData,
    tableCurrentPage,
  } = terminalTxnAuthManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }

  const cardProps = {
    title: bizMap.terminalTxnAuth,
    style: { width: '100%' },
  };
  const queryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'terminalTxnAuthManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    addClick: () => {
      dispatch({
        type: 'terminalTxnAuthManage/toggleModal',
        payload: { type: 'add' },
      });
    },
    refreshCacheClick:() =>{
      dispatch({
        type: 'terminalTxnAuthManage/refreshCache',
        payload: {},
      });
    },
    deleteClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        callConfirm(commonMap.tip, commonMap.deleteConfirm, () => {
          dispatch({
            type: 'terminalTxnAuthManage/deleteList',
            payload: { ids: selectIds.toString() },
          });
        });
      }
    },
    enableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        callConfirm(commonMap.tip, commonMap.enableConfirm, () => {
          dispatch({
            type: 'terminalTxnAuthManage/updateStatus',
            payload: { ids: selectIds.toString(), txnStatus: '1' },
          });
          dispatch({
            type: 'terminalTxnAuthManage/queryList',
            payload: { tableParam: { currentPage: 1 } },
          });
        });
      }
      // if (tableSelects.length === 0) {
      //   callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      // } else {
      //   const agtStatus = tableSelects[0].agtStatus;
      //   for (let i = 0; i < tableSelects.length; i++) {
      //     if (agtStatus !== tableSelects[i].agtStatus) {
      //       callNotice(commonMap.warning, commonMap.statusNotMatch, 'warning');
      //       return;
      //     }
      //     if (tableSelects[i].agtStatus !== '0' && tableSelects[i].agtStatus !== '1') {
      //       callNotice(commonMap.warning, commonMap.programErr, 'warning');
      //       return;
      //     }
      //   }
      //   if (agtStatus === '1') {
      //     callNotice(commonMap.warning, commonMap.enaleNotice, 'warning');
      //     return;
      //   }
      //   callConfirm(commonMap.tip, commonMap.enableConfirm, () => {
      //     dispatch({
      //       type: 'terminalTxnAuthManage/updateStatus',
      //       payload: { ids: selectIds.toString(), agtStatus: '1' },
      //     });
      //   });
      // }
      
    },
    disableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        callConfirm(commonMap.tip, commonMap.disableConfirm, () => {
          dispatch({
            type: 'terminalTxnAuthManage/updateStatus',
            payload: { ids: selectIds.toString(), txnStatus: '0' },
          });
          dispatch({
            type: 'terminalTxnAuthManage/queryList',
            payload: { tableParam: { currentPage: 1 } },
          });
        });
      }
      // if (tableSelects.length === 0) {
      //   callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      // } else {
      //   const agtStatus = tableSelects[0].agtStatus;
      //   for (let i = 0; i < tableSelects.length; i++) {
      //     if (agtStatus !== tableSelects[i].agtStatus) {
      //       callNotice(commonMap.warning, commonMap.statusNotMatch, 'warning');
      //       return;
      //     }
      //     if (tableSelects[i].agtStatus !== '0' && tableSelects[i].agtStatus !== '1') {
      //       callNotice(commonMap.warning, commonMap.programErr, 'warning');
      //       return;
      //     }
      //   }
      //   if (agtStatus === '0') {
      //     callNotice(commonMap.warning, commonMap.disableNotice, 'warning');
      //     return;
      //   }
      //   callConfirm(commonMap.tip, commonMap.disableConfirm, () => {
      //     dispatch({
      //       type: 'terminalTxnAuthManage/updateStatus',
      //       payload: { ids: selectIds.toString(), agtStatus: '0' },
      //     });
      //   });
      // }
      dispatch({
        type: 'terminalTxnAuthManage/queryList',
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
        type: 'terminalTxnAuthManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'terminalTxnAuthManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'terminalTxnAuthManage/toggleModal',
        payload: { type: 'info', data: record },
      });
    },
    handleUpdateClick(record) {
      dispatch({
        type: 'terminalTxnAuthManage/toggleModal',
        payload: { type: 'update', data: record },
      });
    },
  };
  const addModalProps = {
    footer: null,
    title: commonMap.add,
    visible: addModalVisible,
    onCancel: () => {
      dispatch({
        type: 'terminalTxnAuthManage/toggleModal',
        payload: { type: 'add', data: {} },
      });
    },
  };
  const updateModalProps = {
    footer: null,
    title: commonMap.update,
    visible: updateModalVisible,
    onCancel: () => {
      dispatch({
        type: 'terminalTxnAuthManage/toggleModal',
        payload: { type: 'update', data: {} },
      });
    },
  };
  const addFormProps = {
    onlyRead: false,
    data: addFormData,
    submiting: addFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'terminalTxnAuthManage/addOne',
        payload: { ...dat },
      });
    },
  };

  const updateFormProps = {
    onlyRead: true,
    data: updateFormData,
    submiting: updateFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'terminalTxnAuthManage/updateOne',
        payload: { ...dat },
      });
    },
  };
  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  const AddFormGen = () => <TerminalTxnAuthInfoForm {...addFormProps} />;
  const UpdateFormGen = () => <TerminalTxnAuthInfoForm {...updateFormProps} />;
  return (
    <div>
      <Card {...cardProps}>
        <TerminalTxnAuthQueryForm {...queryFormProps} />
        <TerminalTxnAuthPageTable {...tableProps} />
      </Card>
      <Modal {...addModalProps}>
        <AddFormGen />
      </Modal>
      <Modal {...updateModalProps}>
        <UpdateFormGen />
      </Modal>
    </div>
  );
};

function mapStateToProps({ terminalTxnAuthManage }) {
  return { terminalTxnAuthManage };
}

export default connect(mapStateToProps)(TerminalTxnAuthManage);
