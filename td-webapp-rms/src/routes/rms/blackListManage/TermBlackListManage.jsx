import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import TermBlackListInfoForm from '../../../components/business/rms/term/TermBlackListInfoForm';
import TermBlackListPageTable from '../../../components/business/rms/term/TermBlackListPageTable';
import TermBlackListQueryForm from '../../../components/business/rms/term/TermBlackListQueryForm';
import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const TermBlackListManage = ({ dispatch, termBlackListManage }) => {
  const objectid = 'terId';
  const bizMap = i18n.bizMap('rms/termBlackList');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage, tableSelects,
    addModalVisible, addFormSubmit, addFormData,
    orgTreeData,
    miniFormTableParam, miniFormTableLoading, miniFormTableList, miniFormTableTotal, miniFormTableCurrentPage, miniFormVisible,
  } = termBlackListManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }
  const cardProps = {
    title: bizMap.termBlackList,
    style: { width: '100%' },
  };
  const queryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'termBlackListManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    addClick: () => {
      dispatch({
        type: 'termBlackListManage/toggleModal',
        payload: { type: 'add' },
      });
    },
    deleteClick: () => {
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
            type: 'termBlackListManage/deleteList',
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
        type: 'termBlackListManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'termBlackListManage/updateState',
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
        type: 'termBlackListManage/toggleModal',
        payload: { type: 'add', data: {} },
      });
    },
  };
  const addFormProps = {
    miniFormVisible,
    tableList: miniFormTableList,
    tableLoading: miniFormTableLoading,
    tableTotal: miniFormTableTotal,
    tableCurrentPage: miniFormTableCurrentPage,
    data: addFormData,
    submiting: addFormSubmit,
    orgTreeData,
    formSubmit: (dat) => {
      dispatch({
        type: 'termBlackListManage/addOne',
        payload: { ...dat },
      });
    },
    tablePageChange(next) {
      dispatch({
        type: 'termBlackListManage/queryStoreList',
        payload: { miniFormTableParam: { ...miniFormTableParam, currentPage: next } },
      });
    },
    rowClickCallback(data) {
      const dat = addFormData;
      dat.terId = data.terId;
      dat.terNo = data.terNo;
      dat.terPhyno=data.terPhyno
      dispatch({
        type: 'termBlackListManage/toggleModal',
        payload: { type: 'store', data: addFormData },
      });
    },
    toggleStoreTable(formData) {
      dispatch({
        type: 'termBlackListManage/toggleModal',
        payload: { type: 'store', data: formData },
      });
    },
    queryStoreList(dat) {
      dispatch({
        type: 'termBlackListManage/queryStoreList',
        payload: { miniFormTableParam: { ...dat, currentPage: 1 } },
      });
    },
     popoverOncancel() {
      dispatch({
        type: 'termBlackListManage/updateState',
        payload: { miniFormVisible: false },
      });
    },
  };

  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  const AddFormGen = () => <TermBlackListInfoForm {...addFormProps} />;
  return (
    <div>
      <Card {...cardProps}>
        <TermBlackListQueryForm {...queryFormProps} />
        <TermBlackListPageTable {...tableProps} />
      </Card>
      <Modal {...addModalProps}>
        <AddFormGen />
      </Modal>
    </div>
  );
};

function mapStateToProps({ termBlackListManage }) {
  return { termBlackListManage };
}

export default connect(mapStateToProps)(TermBlackListManage);
