import React from 'react';
import { connect } from 'dva';
import { Card, Modal, Spin } from 'antd';
import MerchantQueryForm from '../../../components/business/agtp/merchant/MerchantQueryForm';
import MerchantPageTable from '../../../components/business/agtp/merchant/MerchantPageTable';
import MerchantInfoTable from '../../../components/business/agtp/merchant/MerchantInfoTable';
import MerchantBaseInfoForm from '../../../components/business/agtp/merchant/infoForm/MerchantBaseInfoForm';
import MerchantBankInfoForm from '../../../components/business/agtp/merchant/infoForm/MerchantBankInfoForm';
import MerchantAttachDetailInfoForm from '../../../components/business/agtp/merchant/infoForm/MerchantAttachDetailInfoForm';
import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const MerchantManage = ({ dispatch, merchantManage }) => {
  const objectid = 'merId';
  const bizMap = i18n.bizMap('agtp/merchant');
  const commonMap = i18n.commonMap();
  const {
    advExpand, tableParam, tableLoading, tableList, tableTotal, tableSelects, tableRecord,
    updateFormSubmit, updateFormData, tableCurrentPage,
    infoModalVisible, infoTableData, attachInfoData,
    attachInfoModalVisible, spinLoading, bizSaleList, industryList,
    updateBaseModalVisible, updateBankModalVisible, subBankModalVisible, bankList, subBankList,
  } = merchantManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }

  const cardProps = {
    title: bizMap.merchantManage,
    style: { width: '100%' },
  };
  const queryFormProps = {
    bizSaleList,
    advExpand,
    collapseClick: () => {
      dispatch({
        type: 'merchantManage/toggleAdvExpand',
      });
    },
    formSubmit: (dat) => {
      dispatch({
        type: 'merchantManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    enableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        callConfirm(commonMap.tip, commonMap.enableConfirm, () => {
          dispatch({
            type: 'merchantManage/updateStatus',
            payload: { ids: selectIds.toString(), merStatus: '1' },
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
            type: 'merchantManage/updateStatus',
            payload: { ids: selectIds.toString(), merStatus: '0' },
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
        type: 'merchantManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'merchantManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'merchantManage/toggleModal',
        payload: { type: 'info', data: record },
      });
    },
    handleUpdateClick(visible, record) {
      if (visible) {
        dispatch({
          type: 'merchantManage/updateState',
          payload: { tableRecord: record },
        });
      } else {
        dispatch({
          type: 'merchantManage/updateState',
          payload: { tableRecord: {} },
        });
      }
    },
    handleUpdateBaseClick() {
      dispatch({
        type: 'merchantManage/toggleModal',
        payload: { type: 'updateBase', data: tableRecord },
      });
    },
    handleUpdateBankClick() {
      dispatch({
        type: 'merchantManage/toggleModal',
        payload: { type: 'updateBank', data: tableRecord },
      });
    },
    handleQueryAttachClick(record) {
      dispatch({
        type: 'merchantManage/queryAttach',
        payload: { PKID: record.merId, TABLENAME: 'mer_info', attachInfoModalVisible: !attachInfoModalVisible },
      });
    },
  };
  const infoModalProps = {
    footer: null,
    width: 800,
    title: commonMap.detail,
    visible: infoModalVisible,
    onCancel: () => {
      dispatch({
        type: 'merchantManage/toggleModal',
        payload: { type: 'info', data: {} },
      });
    },
  };
  const infoTableProps = {
    data: infoTableData,
    industryList,
  };
  const attachInfoModalProps = {
    footer: null,
    title: commonMap.detail,
    width: 800,
    visible: attachInfoModalVisible,
    onCancel: () => {
      dispatch({
        type: 'merchantManage/toggleModal',
        payload: { type: 'attachInfo', data: {} },
      });
    },
  };
  const attachDetailFormProps = {
    data: attachInfoData,
  };
  const updateBaseModalProps = {
    width: 888,
    footer: null,
    title: commonMap.update,
    visible: updateBaseModalVisible,
    onCancel: () => {
      dispatch({
        type: 'merchantManage/toggleModal',
        payload: { type: 'updateBase', data: {} },
      });
    },
  };
  const updateBankModalProps = {
    width: 848,
    footer: null,
    title: commonMap.update,
    visible: updateBankModalVisible,
    onCancel: () => {
      dispatch({
        type: 'merchantManage/toggleModal',
        payload: { type: 'updateBank', data: {} },
      });
    },
  };
  const updateBaseFormProps = {
    bizSaleList,
    industryList,
    data: updateFormData,
    submiting: updateFormSubmit,
    formBaseSubmit: (dat) => {
      dispatch({
        type: 'merchantManage/updateBase',
        payload: { ...dat },
      });
    },
  };
  const updateBankFormProps = {
    subBankModalVisible,
    subBankList,
    bankList,
    data: updateFormData,
    submiting: updateFormSubmit,
    formBankSubmit: (dat) => {
      dispatch({
        type: 'merchantManage/updateBank',
        payload: { ...dat },
      });
    },
    querySubBanklist(tableParam) {
      dispatch({
        type: 'merchantManage/querySubBanklist',
        payload: { tableParam },
      });
    },
    onCancelSubBankModel() {
      dispatch({
        type: 'merchantManage/updateState',
        payload: { subBankModalVisible: false },
      });
    },
  };
  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题

  return (
    <div>
      <Card {...cardProps}>
        <MerchantQueryForm {...queryFormProps} />
        <MerchantPageTable {...tableProps} />
      </Card>
      <Modal {...infoModalProps}>
        <MerchantInfoTable {...infoTableProps} />
      </Modal>
      <Modal {...updateBaseModalProps}>
        <MerchantBaseInfoForm {...updateBaseFormProps} />
      </Modal>
      <Modal {...updateBankModalProps}>
        <MerchantBankInfoForm {...updateBankFormProps} />
      </Modal>
      <Modal {...attachInfoModalProps}>
        <Spin spinning={spinLoading}>
          <MerchantAttachDetailInfoForm {...attachDetailFormProps} />
        </Spin>
      </Modal>
    </div>
  );
};

function mapStateToProps({ merchantManage }) {
  return { merchantManage };
}

export default connect(mapStateToProps)(MerchantManage);
