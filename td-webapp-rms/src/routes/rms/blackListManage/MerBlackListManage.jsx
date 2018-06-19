import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import MerBlackListInfoForm from '../../../components/business/rms/mer/MerBlackListInfoForm';
import MerBlackListPageTable from '../../../components/business/rms/mer/MerBlackListPageTable';
import MerBlackListQueryForm from '../../../components/business/rms/mer/MerBlackListQueryForm';
import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const MerBlackListManage = ({ dispatch, merBlackListManage }) => {
  const objectid = 'merId';
  const bizMap = i18n.bizMap('rms/merBlackList');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage, tableSelects,
    addModalVisible, addFormSubmit, addFormData,
    orgTreeData,
    miniFormTableParam, miniFormTableLoading, miniFormTableList, miniFormTableTotal, miniFormTableCurrentPage, miniFormVisible,
  } = merBlackListManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }
  const cardProps = {
    title: bizMap.merBlackList,
    style: { width: '100%' },
  };
  const queryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'merBlackListManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    addClick: () => {
      dispatch({
        type: 'merBlackListManage/toggleModal',
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
            type: 'merBlackListManage/deleteList',
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
        type: 'merBlackListManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'merBlackListManage/updateState',
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
        type: 'merBlackListManage/toggleModal',
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
        type: 'merBlackListManage/addOne',
        payload: { ...dat },
      });
    },
    tablePageChange(next) {
      dispatch({
        type: 'merBlackListManage/queryMerList',
        payload: { miniFormTableParam: { ...miniFormTableParam, currentPage: next } },
      });
    },
    rowClickCallback(data) {
      const dat = addFormData;
      console.log(dat);
      console.log(data);
      dat.merId = data.merId;
      dat.merName = data.merName;
      dat.agtId = data.agtId;
      dispatch({
        type: 'merBlackListManage/toggleModal',
        payload: { type: 'mer', data: addFormData },
      });
    },
    toggleMerTable(formData) {
      dispatch({
        type: 'merBlackListManage/toggleModal',
        payload: { type: 'mer', data: formData },
      });
    },
    queryMerList(dat) {
      dispatch({
        type: 'merBlackListManage/queryMerList',
        payload: { miniFormTableParam: { ...dat, currentPage: 1 } },
      });
    },
     popoverOncancel() {
      dispatch({
        type: 'merBlackListManage/updateState',
        payload: { miniFormVisible: false },
      });
    },
  };

  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  // const AddFormGen = () => <MerBlackListInfoForm {...addFormProps} />;
  return (
    <div>
      <Card {...cardProps}>
        <MerBlackListQueryForm {...queryFormProps} />
        <MerBlackListPageTable {...tableProps} />
      </Card>
      <Modal {...addModalProps}>
        <MerBlackListInfoForm {...addFormProps}/>
      </Modal>
    </div>
  );
};

function mapStateToProps({ merBlackListManage }) {
  return { merBlackListManage };
}

export default connect(mapStateToProps)(MerBlackListManage);
