import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import StoreBlackListInfoForm from '../../../components/business/rms/store/StoreBlackListInfoForm';
import StoreBlackListPageTable from '../../../components/business/rms/store/StoreBlackListPageTable';
import StoreBlackListQueryForm from '../../../components/business/rms/store/StoreBlackListQueryForm';
import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const StoreBlackListManage = ({ dispatch, storeBlackListManage }) => {
  const objectid = 'braId';
  const bizMap = i18n.bizMap('rms/storeBlackList');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage, tableSelects,
    addModalVisible, addFormSubmit, addFormData,
    orgTreeData,
    miniFormTableParam, miniFormTableLoading, miniFormTableList, miniFormTableTotal, miniFormTableCurrentPage, miniFormVisible,
  } = storeBlackListManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }
  const cardProps = {
    title: bizMap.storeBlackList,
    style: { width: '100%' },
  };
  const queryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'storeBlackListManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    addClick: () => {
      dispatch({
        type: 'storeBlackListManage/toggleModal',
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
            type: 'storeBlackListManage/deleteList',
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
        type: 'storeBlackListManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'storeBlackListManage/updateState',
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
        type: 'storeBlackListManage/toggleModal',
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
        type: 'storeBlackListManage/addOne',
        payload: { ...dat },
      });
    },
    tablePageChange(next) {
      dispatch({
        type: 'storeBlackListManage/queryStoreList',
        payload: { miniFormTableParam: { ...miniFormTableParam, currentPage: next } },
      });
    },
    rowClickCallback(data) {
      const dat = addFormData;
      dat.braId = data.braId;
      dat.braName = data.braName;
      dat.merId = data.merId;
      dispatch({
        type: 'storeBlackListManage/toggleModal',
        payload: { type: 'store', data: addFormData },
      });
    },
    toggleStoreTable(formData) {
      dispatch({
        type: 'storeBlackListManage/toggleModal',
        payload: { type: 'store', data: formData },
      });
    },
    queryStoreList(dat) {
      dispatch({
        type: 'storeBlackListManage/queryStoreList',
        payload: { miniFormTableParam: { ...dat, currentPage: 1 } },
      });
    },
     popoverOncancel() {
      dispatch({
        type: 'storeBlackListManage/updateState',
        payload: { miniFormVisible: false },
      });
    },
  };

  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  // const AddFormGen = () => <StoreBlackListInfoForm {...addFormProps} />;
  return (
    <div>
      <Card {...cardProps}>
        <StoreBlackListQueryForm {...queryFormProps} />
        <StoreBlackListPageTable {...tableProps} />
      </Card>
      <Modal {...addModalProps}>
        <StoreBlackListInfoForm {...addFormProps}/>
      </Modal>
    </div>
  );
};

function mapStateToProps({ storeBlackListManage }) {
  return { storeBlackListManage };
}

export default connect(mapStateToProps)(StoreBlackListManage);
