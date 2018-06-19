import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import PubUnionfitQueryForm from '../../../components/business/bas/pubUnionfit/PubUnionfitQueryForm';
import PubUnionfitPageTable from '../../../components/business/bas/pubUnionfit/PubUnionfitPageTable';
import PubUnionfitForm from '../../../components/business/bas/pubUnionfit/PubUnionfitForm';
import PubUnionfitTable from '../../../components/business/bas/pubUnionfit/PubUnionfitTable';
import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const PubUnionfitManage = ({ dispatch, pubUnionfitManage }) => {
  const objectid = 'binctt';
  const objectIssno = 'issno';
  const bizMap = i18n.bizMap('bas/pubUnionfit');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage, tableSelects,
    addModalVisible, updateModalVisible, addFormSubmit, updateFormSubmit, addFormData, updateFormData,
    infoModalVisible, infoTableData,
  } = pubUnionfitManage;
  const selectIds = [];
  const selectIssnos = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
    const issno = typeof tableSelects[i] === 'object' ? tableSelects[i][objectIssno] : tableSelects[i];
    selectIssnos.push(issno);
  }
  const cardProps = {
    title: bizMap.pubUnionfitManage,
    style: { width: '100%' },
  };
  const queryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'pubUnionfitManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    addClick: () => {
      dispatch({
        type: 'pubUnionfitManage/toggleModal',
        payload: { type: 'add' },
      });
    },
    deleteClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        for (let i = 0; i < tableSelects.length; i++) {
          if (tableSelects[i].issuestate === '1') {
            callNotice(commonMap.warning, bizMap.deleteNotice, 'warning');
            return;
          }
        }
        callConfirm(commonMap.tip, commonMap.deleteConfirm, () => {
          dispatch({
            type: 'pubUnionfitManage/deleteList',
            payload: { ids: selectIds.toString(), issnos: selectIssnos.toString() },
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
        type: 'pubUnionfitManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'pubUnionfitManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'pubUnionfitManage/toggleModal',
        payload: { type: 'info', data: record },
      });
    },
    handleUpdateClick(record) {
      dispatch({
        type: 'pubUnionfitManage/toggleModal',
        payload: { type: 'update', data: record },
      });
    },
  };
  const infoModalProps = {
    footer: null,
    title: commonMap.detail,
    visible: infoModalVisible,
    width: 615,
    onCancel: () => {
      dispatch({
        type: 'pubUnionfitManage/toggleModal',
        payload: { type: 'info', data: {} },
      });
    },
  };
  const infoTableProps = {
    data: infoTableData,
  };
  const addModalProps = {
    width: 748,
    footer: null,
    title: commonMap.add,
    visible: addModalVisible,
    onCancel: () => {
      dispatch({
        type: 'pubUnionfitManage/toggleModal',
        payload: { type: 'add', data: {} },
      });
    },
  };
  const updateModalProps = {
    width: 748,
    footer: null,
    title: commonMap.update,
    visible: updateModalVisible,
    onCancel: () => {
      dispatch({
        type: 'pubUnionfitManage/toggleModal',
        payload: { type: 'update', data: {} },
      });
    },
  };
  const addFormProps = {
    type: 'add',
    data: addFormData,
    submiting: addFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'pubUnionfitManage/addOne',
        payload: { ...dat },
      });
    },
  };
  const updateFormProps = {
    data: updateFormData,
    submiting: updateFormSubmit,
    type: 'update',
    formSubmit: (dat) => {
      dispatch({
        type: 'pubUnionfitManage/updateOne',
        payload: { ...dat },
      });
    },
  };
  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  const AddFormGen = () => <PubUnionfitForm {...addFormProps} />;
  const UpdateFormGen = () => <PubUnionfitForm {...updateFormProps} />;
  return (
    <div>
      <Card {...cardProps}>
        <PubUnionfitQueryForm {...queryFormProps} />
        <PubUnionfitPageTable {...tableProps} />
      </Card>
      <Modal {...addModalProps}>
        <AddFormGen />
      </Modal>
      <Modal {...updateModalProps}>
        <UpdateFormGen />
      </Modal>
      <Modal {...infoModalProps}>
        <PubUnionfitTable {...infoTableProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ pubUnionfitManage }) {
  return { pubUnionfitManage };
}

export default connect(mapStateToProps)(PubUnionfitManage);
