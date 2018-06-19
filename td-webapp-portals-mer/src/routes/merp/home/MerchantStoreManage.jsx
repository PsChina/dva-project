import React from 'react';
import { connect } from 'dva';
import { Card, Modal, Spin } from 'antd';
import MerchantStoreQueryForm from '../../../components/business/merp/merchantStore/MerchantStoreQueryForm';
import MerchantStorePageTable from '../../../components/business/merp/merchantStore/MerchantStorePageTable';
import MerchantStoreInfoForm from '../../../components/business/merp/merchantStore/infoForm/MerchantStoreInfoForm';
import MerchantStoreInfoTable from '../../../components/business/merp/merchantStore/MerchantStoreInfoTable';
import MerchantStoreAttachDetailForm from '../../../components/business/merp/merchantStore/infoForm/MerchantStoreAttachDetailForm';
import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const MerchantStoreManage = ({ dispatch, merchantStoreManage }) => {
  const objectid = 'braId';
  const bizMap = i18n.bizMap('merp/merchantStore');
  const commonMap = i18n.commonMap();
  const {
    advExpand, tableParam, tableLoading, tableList, tableTotal, tableSelects,
    updateModalVisible, updateFormSubmit, updateFormData, tableCurrentPage,
    infoModalVisible, infoTableData, attachInfoData,
    attachInfoModalVisible, spinLoading,
  } = merchantStoreManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }

  const cardProps = {
    title: bizMap.merchantStoreManage,
    style: { width: '100%' },
  };
  const queryFormProps = {
    advExpand,
    collapseClick: () => {
      dispatch({
        type: 'merchantStoreManage/toggleAdvExpand',
      });
    },
    formSubmit: (dat) => {
      dispatch({
        type: 'merchantStoreManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    enableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        callConfirm(commonMap.tip, commonMap.enableConfirm, () => {
          dispatch({
            type: 'merchantStoreManage/updateStatus',
            payload: { ids: selectIds.toString(), braStatus: '1' },
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
            type: 'merchantStoreManage/updateStatus',
            payload: { ids: selectIds.toString(), braStatus: '0' },
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
        type: 'merchantStoreManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'merchantStoreManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'merchantStoreManage/toggleModal',
        payload: { type: 'info', data: record },
      });
    },
    handleUpdateClick(record) {
      dispatch({
        type: 'merchantStoreManage/toggleModal',
        payload: { type: 'update', data: record },
      });
    },
    handleQueryAttachClick(record) {
      dispatch({
        type: 'merchantStoreManage/queryAttach',
        payload: { braId: record.braId, /*TABLENAME: 'store_info', */attachInfoModalVisible: !attachInfoModalVisible },
      });
    },
  };
  const infoModalProps = {
    footer: null,
    title: commonMap.detail,
    visible: infoModalVisible,
    onCancel: () => {
      dispatch({
        type: 'merchantStoreManage/toggleModal',
        payload: { type: 'info', data: {} },
      });
    },
  };
  const infoTableProps = {
    data: infoTableData,
  };
  const attachInfoModalProps = {
    footer: null,
    title: commonMap.detail,
    visible: attachInfoModalVisible,
    onCancel: () => {
      dispatch({
        type: 'merchantStoreManage/toggleModal',
        payload: { type: 'attachInfo', data: {} },
      });
    },
  };
  const attachDetailFormProps = {
    data: attachInfoData,
  };
  const updateModalProps = {
    footer: null,
    title: commonMap.update,
    visible: updateModalVisible,
    onCancel: () => {
      dispatch({
        type: 'merchantStoreManage/toggleModal',
        payload: { type: 'update', data: {} },
      });
    },
  };
  const updateFormProps = {
    data: updateFormData,
    submiting: updateFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'merchantStoreManage/updateOne',
        payload: { ...dat },
      });
    },
  };
  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  const UpdateFormGen = () => <MerchantStoreInfoForm {...updateFormProps} />;

  return (
    <div>
      <Card {...cardProps}>
        <MerchantStoreQueryForm {...queryFormProps} />
        <MerchantStorePageTable {...tableProps} />
      </Card>
      <Modal {...updateModalProps}>
        <UpdateFormGen />
      </Modal>
      <Modal {...infoModalProps}>
        <MerchantStoreInfoTable {...infoTableProps} />
      </Modal>
      <Modal {...attachInfoModalProps}>
        <Spin spinning={spinLoading}>
          <MerchantStoreAttachDetailForm {...attachDetailFormProps} />
        </Spin>
      </Modal>
    </div>
  );
};

function mapStateToProps({ merchantStoreManage }) {
  return { merchantStoreManage };
}

export default connect(mapStateToProps)(MerchantStoreManage);
