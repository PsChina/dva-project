import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import PubCountryQueryForm from '../../../components/business/bas/pubCountry/PubCountryQueryForm';
import PubCountryPageTable from '../../../components/business/bas/pubCountry/PubCountryPageTable';
import PubCountryForm from '../../../components/business/bas/pubCountry/PubCountryForm';
// import PubCountryTable from '../../../components/business/bas/pubCountry/PubCountryTable';


import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const PubCountryManage = ({ dispatch, pubCountryManage }) => {
  const objectid = 'countryCode';
  const bizMap = i18n.bizMap('bas/pubCountry');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage, tableSelects,
    addModalVisible, updateModalVisible, addFormSubmit, updateFormSubmit, addFormData, updateFormData,
  } = pubCountryManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }
  const cardProps = {
    title: bizMap.pubCountryManage,
    style: { width: '100%' },
  };
  const queryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'pubCountryManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    addClick: () => {
      dispatch({
        type: 'pubCountryManage/toggleModal',
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
            type: 'pubCountryManage/deleteList',
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
            type: 'pubCountryManage/updateStatus',
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
            type: 'pubCountryManage/updateStatus',
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
        type: 'pubCountryManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'pubCountryManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleUpdateClick(record) {
      dispatch({
        type: 'pubCountryManage/toggleModal',
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
        type: 'pubCountryManage/toggleModal',
        payload: { type: 'add', data: {} },
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
        type: 'pubCountryManage/toggleModal',
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
        type: 'pubCountryManage/addOne',
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
        type: 'pubCountryManage/updateOne',
        payload: { ...dat },
      });
    },
  };
  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  const AddFormGen = () => <PubCountryForm {...addFormProps} />;
  const UpdateFormGen = () => <PubCountryForm {...updateFormProps} />;
  return (
    <div>
      <Card {...cardProps}>
        <PubCountryQueryForm {...queryFormProps} />
        <PubCountryPageTable {...tableProps} />
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

function mapStateToProps({ pubCountryManage }) {
  return { pubCountryManage };
}

export default connect(mapStateToProps)(PubCountryManage);
