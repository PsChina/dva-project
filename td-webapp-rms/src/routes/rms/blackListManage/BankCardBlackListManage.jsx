import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import BankCardBlackListInfoForm from '../../../components/business/rms/bankCard/BankCardBlackListInfoForm';
import BankCardBlackListPageTable from '../../../components/business/rms/bankCard/BankCardBlackListPageTable';
import BankCardBlackListQueryForm from '../../../components/business/rms/bankCard/BankCardBlackListQueryForm';
import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const BankCardBlackListManage = ({ dispatch, bankCardBlackListManage }) => {
  const objectid = 'bankcardNo';
  const bizMap = i18n.bizMap('rms/bankCardBlackList');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage, tableSelects,
    addModalVisible, addFormSubmit, addFormData,
    orgTreeData,
  } = bankCardBlackListManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }
  const cardProps = {
    title: bizMap.bankCardBlackList,
    style: { width: '100%' },
  };
  const queryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'bankCardBlackListManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    addClick: () => {
      dispatch({
        type: 'bankCardBlackListManage/toggleModal',
        payload: { type: 'add' },
      });
    },
    deleteClick: () => {
      console.log('tableSelects', tableSelects)
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        for (let i = 0; i < tableSelects.length; i++) {
          if (tableSelects[i].usrStatus === '1') {
            callNotice(commonMap.warning, commonMap.enaleNotice, 'warning');
            return;
          }
        }
        callConfirm(commonMap.tip, commonMap.deleteConfirm, () => {
          dispatch({
            type: 'bankCardBlackListManage/deleteList',
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
        type: 'bankCardBlackListManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'bankCardBlackListManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
  };

  const addModalProps = {
    footer: null,
    title: commonMap.add,
    visible: addModalVisible,
    onCancel: () => {
      dispatch({
        type: 'bankCardBlackListManage/toggleModal',
        payload: { type: 'add', data: {} },
      });
    },
  };
  const addFormProps = {
    orgTreeData,
    data: addFormData,
    submiting: addFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'bankCardBlackListManage/addOne',
        payload: { ...dat },
      });
    },
  };

  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  const AddFormGen = () => <BankCardBlackListInfoForm {...addFormProps} />;
  return (
    <div>
      <Card {...cardProps}>
        <BankCardBlackListQueryForm {...queryFormProps} />
        <BankCardBlackListPageTable {...tableProps} />
      </Card>
      <Modal {...addModalProps}>
        <AddFormGen />
      </Modal>
    </div>
  );
};

function mapStateToProps({ bankCardBlackListManage }) {
  return { bankCardBlackListManage };
}

export default connect(mapStateToProps)(BankCardBlackListManage);
