import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import PubCurrencyQueryForm from '../../../components/business/bas/pubCurrency/PubCurrencyQueryForm';
import PubCurrencyPageTable from '../../../components/business/bas/pubCurrency/PubCurrencyPageTable';
import PubCurrencyForm from '../../../components/business/bas/pubCurrency/PubCurrencyForm';


import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const PubCurrencyManage = ({ dispatch, pubCurrencyManage }) => {
  const objectid = 'currencyCode';
  const bizMap = i18n.bizMap('bas/pubCurrency');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage, tableSelects,
    addModalVisible, updateModalVisible, addFormSubmit, updateFormSubmit, addFormData, updateFormData,
    miniFormTableList,
    miniFormTableLoading,
    miniFormTableTotal,
    miniFormTableCurrentPage,
    miniFormVisible,
    miniFormTableParam,
  } = pubCurrencyManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }
  const cardProps = {
    title: bizMap.pubCurrencyManage,
    style: { width: '100%' },
  };
  const queryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'pubCurrencyManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    addClick: () => {
      dispatch({
        type: 'pubCurrencyManage/toggleModal',
        payload: { type: 'add' },
      });
    },
    deleteClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        const status = tableSelects[0].status;
        callConfirm(commonMap.tip, commonMap.deleteConfirm, () => {
          for (let i = 0; i < tableSelects.length; i++) {
            if (status !== tableSelects[i].status) {
              callNotice(commonMap.warning, commonMap.statusNotMatch, 'warning');
              return;
            }
            if (tableSelects[i].status !== '0' && tableSelects[i].status !== '1') {
              callNotice(commonMap.warning, commonMap.programErr, 'warning');
              return;
            }
          }
          if (status === '1') {
            callNotice(commonMap.warning, commonMap.enaleNotice, 'warning');
            return;
          }
          dispatch({
            type: 'pubCurrencyManage/deleteList',
            payload: { ids: selectIds.toString() },
          });
        });
      }
    },
    enableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        const status = tableSelects[0].status;
        for (let i = 0; i < tableSelects.length; i++) {
          if (status !== tableSelects[i].status) {
            callNotice(commonMap.warning, commonMap.statusNotMatch, 'warning');
            return;
          }
          if (tableSelects[i].status !== '0' && tableSelects[i].status !== '1') {
            callNotice(commonMap.warning, commonMap.programErr, 'warning');
            return;
          }
        }
        if (status === '1') {
          callNotice(commonMap.warning, commonMap.enaleNotice, 'warning');
          return;
        }
        callConfirm(commonMap.tip, commonMap.enableConfirm, () => {
          dispatch({
            type: 'pubCurrencyManage/updateStatus',
            payload: { ids: selectIds.toString(), status: '1' },
          });
        });
      }
    },
    disableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        const status = tableSelects[0].status;
        for (let i = 0; i < tableSelects.length; i++) {
          if (status !== tableSelects[i].status) {
            callNotice(commonMap.warning, commonMap.statusNotMatch, 'warning');
            return;
          }
          if (tableSelects[i].status !== '0' && tableSelects[i].status !== '1') {
            callNotice(commonMap.warning, commonMap.programErr, 'warning');
            return;
          }
        }
        if (status === '0') {
          callNotice(commonMap.warning, commonMap.disableNotice, 'warning');
          return;
        }
        callConfirm(commonMap.tip, commonMap.disableConfirm, () => {
          dispatch({
            type: 'pubCurrencyManage/updateStatus',
            payload: { ids: selectIds.toString(), status: '0' },
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
        type: 'pubCurrencyManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'pubCurrencyManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'pubCurrencyManage/toggleModal',
        payload: { type: 'info', data: record },
      });
    },
    handleUpdateClick(record) {
      dispatch({
        type: 'pubCurrencyManage/toggleModal',
        payload: { type: 'update', data: record },
      });
    },
  };
  const addModalProps = {
    width: 424,
    footer: null,
    title: commonMap.add,
    visible: addModalVisible,
    onCancel: () => {
      dispatch({
        type: 'pubCurrencyManage/toggleModal',
        payload: { type: 'add', data: {} },
      });
      dispatch({
        type: 'pubCurrencyManage/updateState',
        payload: { miniFormVisible: false },
      });
    },
  };
  const updateModalProps = {
    width: 424,
    footer: null,
    title: commonMap.update,
    visible: updateModalVisible,
    onCancel: () => {
      dispatch({
        type: 'pubCurrencyManage/toggleModal',
        payload: { type: 'update', data: {} },
      });
    },
  };
  const addFormProps = {
    type: 'add',
    miniFormVisible,
    data: addFormData,
    submiting: addFormSubmit,
    tableList: miniFormTableList,
    tableLoading: miniFormTableLoading,
    tableTotal: miniFormTableTotal,
    tableCurrentPage: miniFormTableCurrentPage,
    formSubmit: (dat) => {
      dispatch({
        type: 'pubCurrencyManage/addOne',
        payload: { ...dat },
      });
    },
    rowClickCallback(data) {
      const dat = addFormData;
      dat.countryId = data.countryId;
      dat.country = data.country;
      dat.countryCode = data.countryCode;
      dat.countryShortName = data.countryShortName;
      dispatch({
        type: 'pubCurrencyManage/toggleModal',
        payload: { type: 'country', data: addFormData },
      });
    },
    toggleCountryTable(formData) {
      dispatch({
        type: 'pubCurrencyManage/toggleModal',
        payload: { type: 'country', data: formData },
      });
    },
    queryCountryList(dat) {
      dispatch({
        type: 'pubCurrencyManage/queryCountryList',
        payload: { miniFormTableParam: { ...dat, currentPage: 1 } },
      });
    },
    tablePageChange(next) {
      dispatch({
        type: 'pubCurrencyManage/queryCountryList',
        payload: { miniFormTableParam: { ...miniFormTableParam, currentPage: next } },
      });
    },
    popoverOncancel() {
      dispatch({
        type: 'pubCurrencyManage/updateState',
        payload: { miniFormVisible: false },
      });
    },
  };
  const updateFormProps = {
    data: updateFormData,
    submiting: updateFormSubmit,
    type: 'update',
    formSubmit: (dat) => {
      dispatch({
        type: 'pubCurrencyManage/updateOne',
        payload: { ...dat },
      });
    },
  };
  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  const UpdateFormGen = () => <PubCurrencyForm {...updateFormProps} />;
  return (
    <div>
      <Card {...cardProps}>
        <PubCurrencyQueryForm {...queryFormProps} />
        <PubCurrencyPageTable {...tableProps} />
      </Card>
      <Modal {...addModalProps}>
        <PubCurrencyForm {...addFormProps} />
      </Modal>
      <Modal {...updateModalProps}>
        <UpdateFormGen />
      </Modal>
    </div>
  );
};

function mapStateToProps({ pubCurrencyManage }) {
  return { pubCurrencyManage };
}

export default connect(mapStateToProps)(PubCurrencyManage);
