import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import MerchantRoleQueryForm from '../../../components/business/mms/merchantUsr/MerchantUsrQueryForm';
import MerchantRolePageTable from '../../../components/business/mms/merchantUsr/MerchantUsrPageTable'
import MerchantRoleInfoTable from '../../../components/business/mms/merchantUsr/MerchantUsrInfoTable';
import MerchantRoleInfoForm from '../../../components/business/mms/merchantUsr/infoForm/MerchantUsrInfoForm';
import MerchantRoleStepForm from '../../../components/business/mms/merchantUsr/stepForm/MerchantUsrStepForm';
import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const MerchantUsrManage = ({ dispatch, merchantUsrManage }) => {
  const objectid = 'usrId';
  const bizMap = i18n.bizMap('mms/merchant');
  const commonMap = i18n.commonMap();
  const {
    advExpand, tableParam, tableLoading, tableList, tableTotal, tableSelects, updateFormSubmit, updateFormData,
     addFormSubmit, addModalVisible, sysInfoList, tableCurrentPage,
    infoModalVisible, infoTableData, updateModalVisible } = merchantUsrManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }

  const cardProps = {
    title: bizMap.merchantUsrManage,
    style: { width: '100%' },
  };
  const queryFormProps = {
    sysInfoList,
    advExpand,
    collapseClick: () => {
      dispatch({
        type: 'merchantUsrManage/toggleAdvExpand',
      });
    },
    formSubmit: (dat) => {
      dispatch({
        type: 'merchantUsrManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    enableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        callConfirm(commonMap.tip, commonMap.enableConfirm, () => {
          dispatch({
            type: 'merchantUsrManage/updateStatus',
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
            type: 'merchantUsrManage/updateStatus',
            payload: { ids: selectIds.toString(), usrStatus: '0' },
          });
        });
      }
    },
    addOne: () => {
      dispatch({
        type: 'merchantUsrManage/toggleModal',
        payload: { type: 'add' },
      });
    },
    del: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        callConfirm(commonMap.tip, commonMap.deleteConfirm, () => {
          dispatch({
            type: 'merchantUsrManage/deleteList',
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
        type: 'merchantUsrManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'merchantUsrManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'merchantUsrManage/toggleModal',
        payload: { type: 'info', data: record },
      });
    },
    handleUpdateClick(record) {
      dispatch({
        type: 'merchantUsrManage/toggleModal',
        payload: { type: 'update', data: record },
      });
    },
  };
  const infoModalProps = {
    width: 848,
    footer: null,
    title: commonMap.detail,
    visible: infoModalVisible,
    onCancel: () => {
      dispatch({
        type: 'merchantUsrManage/toggleModal',
        payload: { type: 'info', data: {} },
      });
    },
  };
  const addModalProps = {
    width: 848,
    footer: null,
    title: commonMap.add,
    visible: addModalVisible,
    onCancel: () => {
      dispatch({
        type: 'merchantUsrManage/toggleModal',
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
        type: 'merchantUsrManage/toggleModal',
        payload: { type: 'update', data: {} },
      });
    },
  };
  const updateFormProps = {
    sysInfoList,
    data: updateFormData,
    submiting: updateFormSubmit,
    formBaseSubmit: (dat) => {
      dispatch({
        type: 'merchantUsrManage/updateOne',
        payload: { ...dat },
      });
    },
  };
  const addFormProps = {
    sysInfoList,
    submiting: addFormSubmit,
    addFormSubmit: (dat) => {
      dispatch({
        type: 'merchantUsrManage/addOne',
        payload: { ...dat },
      });
    },
  };
  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  const UpdateFormGen = () => <MerchantRoleInfoForm {...updateFormProps} />;

  return (
    <div>
      <Card {...cardProps}>
        <MerchantRoleQueryForm {...queryFormProps} />
        <MerchantRolePageTable {...tableProps} />
      </Card>
      <Modal {...updateModalProps}>
        <UpdateFormGen />
      </Modal>
      <Modal {...infoModalProps}>
        <MerchantRoleInfoTable {...infoTableProps} />
      </Modal>
      <Modal {...addModalProps}>
        <MerchantRoleStepForm {...addFormProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ merchantUsrManage }) {
  return { merchantUsrManage };
}

export default connect(mapStateToProps)(MerchantUsrManage);
