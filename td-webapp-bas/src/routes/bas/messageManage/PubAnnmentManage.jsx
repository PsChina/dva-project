import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import PubAnnmentQueryForm from '../../../components/business/bas/pubAnnment/PubAnnmentQueryForm';
import PubAnnmentPageTable from '../../../components/business/bas/pubAnnment/PubAnnmentPageTable';
import PubAnnmentForm from '../../../components/business/bas/pubAnnment/PubAnnmentForm';
import PubAnnmentTable from '../../../components/business/bas/pubAnnment/PubAnnmentTable';
import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const PubAnnmentManage = ({ dispatch, pubAnnmentManage }) => {
  const objectid = 'annId';
  const bizMap = i18n.bizMap('bas/pubAnnment');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage, tableSelects,
    addModalVisible, updateModalVisible, addFormSubmit, updateFormSubmit, addFormData, updateFormData,
    infoModalVisible, infoTableData,
  } = pubAnnmentManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }
  const cardProps = {
    title: bizMap.pubAnnmentManage,
    style: { width: '100%' },
  };
  const queryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'pubAnnmentManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    addClick: () => {
      dispatch({
        type: 'pubAnnmentManage/toggleModal',
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
            type: 'pubAnnmentManage/deleteList',
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
        type: 'pubAnnmentManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'pubAnnmentManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'pubAnnmentManage/toggleModal',
        payload: { type: 'info', data: record },
      });
    },
    handleUpdateClick(record) {
      dispatch({
        type: 'pubAnnmentManage/toggleModal',
        payload: { type: 'update', data: record },
      });
    },
    handlePublishClick(record) {
      callConfirm(commonMap.tip, bizMap.publishConfirm, () => {
        const dat = record;
        dat.issuestate = '1';
        dispatch({
          type: 'pubAnnmentManage/updateOne',
          payload: { ...dat },
        });
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
        type: 'pubAnnmentManage/toggleModal',
        payload: { type: 'info', data: {} },
      });
    },
  };
  const infoTableProps = {
    data: infoTableData,
  };
  const addModalProps = {
    footer: null,
    title: commonMap.add,
    visible: addModalVisible,
    onCancel: () => {
      dispatch({
        type: 'pubAnnmentManage/toggleModal',
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
        type: 'pubAnnmentManage/toggleModal',
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
        type: 'pubAnnmentManage/addOne',
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
        type: 'pubAnnmentManage/updateOne',
        payload: { ...dat },
      });
    },
  };
  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  const AddFormGen = () => <PubAnnmentForm {...addFormProps} />;
  const UpdateFormGen = () => <PubAnnmentForm {...updateFormProps} />;
  return (
    <div>
      <Card {...cardProps}>
        <PubAnnmentQueryForm {...queryFormProps} />
        <PubAnnmentPageTable {...tableProps} />
      </Card>
      <Modal {...addModalProps}>
        <AddFormGen />
      </Modal>
      <Modal {...updateModalProps}>
        <UpdateFormGen />
      </Modal>
      <Modal {...infoModalProps}>
        <PubAnnmentTable {...infoTableProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ pubAnnmentManage }) {
  return { pubAnnmentManage };
}

export default connect(mapStateToProps)(PubAnnmentManage);
