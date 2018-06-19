import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import MerchantStoreUsrQueryForm from '../../../components/business/merp/merchantStoreUsr/MerchantStoreUsrQueryForm';
import MerchantStoreUsrPageTable from '../../../components/business/merp/merchantStoreUsr/MerchantStoreUsrPageTable'
import MerchantStoreUsrInfoTable from '../../../components/business/merp/merchantStoreUsr/MerchantStoreUsrInfoTable';
import MerchantStoreUsrInfoForm from '../../../components/business/merp/merchantStoreUsr/MerchantStoreUsrInfoForm';
import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const objectid = 'usrId';
const bizMap = i18n.bizMap('merp/merchantStore');
const commonMap = i18n.commonMap();
const MerchantStoreUsrManage = ({ dispatch, merchantStoreUsrManage }) => {
  const {
    advExpand, tableParam, tableLoading, tableList, tableTotal, tableSelects, updateFormSubmit, updateFormData,
     addFormSubmit, addModalVisible, sysInfoList, tableCurrentPage,
    infoModalVisible, infoTableData, updateModalVisible, braOptionsData } = merchantStoreUsrManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }

  const cardProps = {
    title: bizMap.merchantStoreUsrManage,
    style: { width: '100%' },
  };
  const queryFormProps = {
    sysInfoList,
    advExpand,
    collapseClick: () => {
      dispatch({
        type: 'merchantStoreUsrManage/toggleAdvExpand',
      });
    },
    formSubmit: (dat) => {
      dispatch({
        type: 'merchantStoreUsrManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    enableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        callConfirm(commonMap.tip, commonMap.enableConfirm, () => {
          dispatch({
            type: 'merchantStoreUsrManage/updateStatus',
            payload: { ids: selectIds.toString(), usrStatus: '1' },
          });
        });
      }
    },
    disableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        callConfirm(commonMap.tip, commonMap.enableConfirm, () => {
          dispatch({
            type: 'merchantStoreUsrManage/updateStatus',
            payload: { ids: selectIds.toString(), usrStatus: '0' },
          });
        });
      }
    },
    addOne: () => {
      dispatch({
        type: 'merchantStoreUsrManage/toggleModal',
        payload: { type: 'add' },
      });
    },
    del: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        callConfirm(commonMap.tip, commonMap.deleteConfirm, () => {
          dispatch({
            type: 'merchantStoreUsrManage/deleteList',
            payload: { ids: selectIds.toString() },
          });
        });
      }
    },
  };
  const tableProps = {
    tableCurrentPage,
    tableList,
    tableLoading,
    tableTotal,
    tablePageChange(next) {
      dispatch({
        type: 'merchantStoreUsrManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'merchantStoreUsrManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'merchantStoreUsrManage/toggleModal',
        payload: { type: 'info', data: record },
      });
    },
    handleUpdateClick(record) {
      dispatch({
        type: 'merchantStoreUsrManage/toggleModal',
        payload: { type: 'update', data: record },
      });
    },
  };
  const infoModalProps = {
    footer: null,
    title: commonMap.detail,
    visible: infoModalVisible,
    onCancel: () => {
      dispatch({
        type: 'merchantStoreUsrManage/toggleModal',
        payload: { type: 'info', data: {} },
      });
    },
  };
  const addModalProps = {
    footer: null,
    title: commonMap.add,
    visible: addModalVisible,
    onCancel: () => {
      dispatch({
        type: 'merchantStoreUsrManage/toggleModal',
        payload: { type: 'add' },
      });
    },
  };
  const infoTableProps = {
    data: infoTableData,
  };
  const updateModalProps = {
    footer: null,
    title: commonMap.update,
    visible: updateModalVisible,
    onCancel: () => {
      dispatch({
        type: 'merchantStoreUsrManage/toggleModal',
        payload: { type: 'update', data: {} },
      });
    },
  };
  const updateFormProps = {
    braOptions: braOptionsData,
    sysInfoList,
    data: updateFormData,
    submiting: updateFormSubmit,
    formBaseSubmit: (dat) => {
      dispatch({
        type: 'merchantStoreUsrManage/updateOne',
        payload: { ...dat },
      });
    },
  };
  const addFormProps = {
    braOptions: braOptionsData,
    sysInfoList,
    submiting: addFormSubmit,
    addFormSubmit: (dat) => {
      dispatch({
        type: 'merchantStoreUsrManage/addOne',
        payload: { ...dat },
      });
    },
  };
  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  const UpdateFormGen = () => <MerchantStoreUsrInfoForm {...updateFormProps} />;

  return (
    <div>
      <Card {...cardProps}>
        <MerchantStoreUsrQueryForm {...queryFormProps} />
        <MerchantStoreUsrPageTable {...tableProps} />
      </Card>
      <Modal {...updateModalProps}>
        <UpdateFormGen />
      </Modal>
      <Modal {...infoModalProps}>
        <MerchantStoreUsrInfoTable {...infoTableProps} />
      </Modal>
      <Modal {...addModalProps}>
        <MerchantStoreUsrInfoForm {...addFormProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ merchantStoreUsrManage }) {
  return { merchantStoreUsrManage };
}

export default connect(mapStateToProps)(MerchantStoreUsrManage);
