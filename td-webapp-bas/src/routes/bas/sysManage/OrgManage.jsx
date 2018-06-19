import React from 'react';
import { connect } from 'dva';
import { Card, Modal, Alert } from 'antd';
import OrgPageTable from '../../../components/business/bas/org/OrgPageTable';
import OrgInfoForm from '../../../components/business/bas/org/OrgInfoForm';
import { callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const OrgManage = ({ dispatch, orgManage }) => {
  const bizMap = i18n.bizMap('bas/org');
  const commonMap = i18n.commonMap();
  const {
    treeData, addModalVisible, updateModalVisible, addFormSubmit, updateFormSubmit, addFormData, updateFormData,
    infoModalVisible, infoTableData,
  } = orgManage;
  const cardProps = {
    title: bizMap.orgManage,
    style: { width: '100%' },
  };
  const tableProps = {
    treeData,
    handleAddBtnClick(curNode) {
      const dat = {};
      dat.parentOrgId = curNode;
      dispatch({
        type: 'orgManage/toggleModal',
        payload: { type: 'add', data: dat },
      });
    },
    handlerEditBtnClick(curNode) {
      const dat = {};
      dat.orgId = curNode;
      dispatch({
        type: 'orgManage/queryOne',
        payload: { ...dat },
      });
    },
    handlerDeleteBtnClick(curNode) {
      callConfirm(commonMap.tip, commonMap.deleteConfirm, () => {
        dispatch({
          type: 'orgManage/deleteOne',
          payload: { orgId: curNode },
        });
      });
    },
    handlerEnableBtnClick(curNode) {
      callConfirm(commonMap.tip, commonMap.enableConfirm, () => {
        dispatch({
          type: 'orgManage/updateOne',
          payload: { orgId: curNode, isUse: '1' },
        });
      });
    },
    handlerDisableBtnClick(curNode) {
      callConfirm(commonMap.tip, commonMap.disableConfirm, () => {
        dispatch({
          type: 'orgManage/updateOne',
          payload: { orgId: curNode, isUse: '0' },
        });
      });
    },
  };
  const infoModalProps = {
    footer: null,
    title: commonMap.detail,
    visible: infoModalVisible,
    onCancel: () => {
      dispatch({
        type: 'orgManage/toggleModal',
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
        type: 'orgManage/toggleModal',
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
        type: 'orgManage/toggleModal',
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
        type: 'orgManage/addOne',
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
        type: 'orgManage/updateOne',
        payload: { ...dat },
      });
    },
  };
  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  const AddFormGen = () => <OrgInfoForm {...addFormProps} />;
  const UpdateFormGen = () => <OrgInfoForm {...updateFormProps} />;
  return (
    <div>
      <Card {...cardProps}>
        <Alert message={bizMap.alertMsg} type="info" showIcon style={{ marginBottom: 24 }} />
        <OrgPageTable {...tableProps} />
      </Card>
      <Modal {...addModalProps}>
        <AddFormGen />
      </Modal>
      <Modal {...updateModalProps}>
        <UpdateFormGen />
      </Modal>
      <Modal {...infoModalProps}>
        <orgInfoTable {...infoTableProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ orgManage }) {
  return { orgManage };
}

export default connect(mapStateToProps)(OrgManage);
