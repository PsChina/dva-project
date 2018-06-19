import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import PubExchangeRateQueryForm from '../../../components/business/bas/pubExchangeRate/PubExchangeRateQueryForm';
import PubExchangeRatePageTable from '../../../components/business/bas/pubExchangeRate/PubExchangeRatePageTable';
import PubExchangeRateForm from '../../../components/business/bas/pubExchangeRate/PubExchangeRateForm';
import PubExchangeRateInfoPageTable from '../../../components/business/bas/pubExchangeRate/PubExchangeRateInfoPageTable';
import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const PubExchangeRateManage = ({ dispatch, pubExchangeRateManage }) => {
  const objectid = 'exchangeRateId';
  const bizMap = i18n.bizMap('bas/pubExchangeRate');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage, tableSelects,
    addModalVisible, updateModalVisible, addFormSubmit, updateFormSubmit, addFormData, updateFormData,
    infoModalVisible, infoTableData, currencyList,
    oneExchangeRatePageList, oneExchangeRateLoading, oneExchangeRateTotal, oneExchangeRateCurrentPage, oneExchangeRateParam,
  } = pubExchangeRateManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }
  const cardProps = {
    title: bizMap.pubExchangeRateManage,
    style: { width: '100%' },
  };
  const queryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'pubExchangeRateManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    addClick: () => {
      dispatch({
        type: 'pubExchangeRateManage/toggleModal',
        payload: { type: 'add' },
      });
    },
    deleteClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        for (let i = 0; i < tableSelects.length; i++) {
          if (tableSelects[i].areaStatus === '1') {
            callNotice(commonMap.warning, commonMap.enaleNotice, 'warning');
            return;
          }
        }
        callConfirm(commonMap.tip, commonMap.deleteConfirm, () => {
          dispatch({
            type: 'pubExchangeRateManage/deleteList',
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
            type: 'pubExchangeRateManage/updateStatus',
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
            type: 'pubExchangeRateManage/updateStatus',
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
        type: 'pubExchangeRateManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'pubExchangeRateManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'pubExchangeRateManage/queryOnePageList',
        payload: { record },
      })
      // dispatch({
      //   type: 'pubExchangeRateManage/toggleModal',
      //   payload: { type: 'info', data: record },
      // });
    },
    handleUpdateClick(record) {
      dispatch({
        type: 'pubExchangeRateManage/toggleModal',
        payload: { type: 'update', data: record },
      });
    },
  };
  const infoModalProps = {
    footer: null,
    title: commonMap.detail,
    visible: infoModalVisible,
    width: 848,
    onCancel: () => {
      dispatch({
        type: 'pubExchangeRateManage/toggleModal',
        payload: { type: 'info', data: {} },
      });
    },
  };
  const infoTableProps = {
    tableList: oneExchangeRatePageList,
    tableLoading: oneExchangeRateLoading,
    tableTotal: oneExchangeRateTotal,
    tableCurrentPage: oneExchangeRateCurrentPage,
    tableParam: oneExchangeRateParam,
  };
  const addModalProps = {
    width: 848,
    footer: null,
    title: commonMap.add,
    visible: addModalVisible,
    onCancel: () => {
      dispatch({
        type: 'pubExchangeRateManage/toggleModal',
        payload: { type: 'add', data: {} },
      });
    },
  };
  const updateModalProps = {
    width: 848,
    footer: null,
    title: commonMap.update,
    visible: updateModalVisible,
    onCancel: () => {
      dispatch({
        type: 'pubExchangeRateManage/toggleModal',
        payload: { type: 'update', data: {} },
      });
    },
  };
  const addFormProps = {
    type: 'add',
    currencyList,
    data: addFormData,
    submiting: addFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'pubExchangeRateManage/addOne',
        payload: { ...dat },
      });
    },
  };
  const updateFormProps = {
    type: 'update',
    data: updateFormData,
    currencyList,
    submiting: updateFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'pubExchangeRateManage/updateOne',
        payload: { ...dat },
      });
    },
  };
  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  const AddFormGen = () => <PubExchangeRateForm {...addFormProps} />;
  const UpdateFormGen = () => <PubExchangeRateForm {...updateFormProps} />;
  return (
    <div>
      <Card {...cardProps}>
        <PubExchangeRateQueryForm {...queryFormProps} />
        <PubExchangeRatePageTable {...tableProps} />
      </Card>
      <Modal {...addModalProps}>
        <AddFormGen />
      </Modal>
      <Modal {...updateModalProps}>
        <UpdateFormGen />
      </Modal>
      <Modal {...infoModalProps}>
        <PubExchangeRateInfoPageTable {...infoTableProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ pubExchangeRateManage }) {
  return { pubExchangeRateManage };
}

export default connect(mapStateToProps)(PubExchangeRateManage);
