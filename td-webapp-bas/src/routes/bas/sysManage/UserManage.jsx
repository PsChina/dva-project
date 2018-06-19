import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import UserQueryForm from '../../../components/business/bas/user/UserQueryForm';
import UserPageTable from '../../../components/business/bas/user/UserPageTable';
import UserInfoForm from '../../../components/business/bas/user/UserInfoForm';
import UserInfoTable from '../../../components/business/bas/user/UserInfoTable';
import UserRoleInfoForm from '../../../components/business/bas/user/UserRoleInfoForm';
import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const UserManage = ({ dispatch, userManage }) => {
  const objectid = 'usrId';
  const bizMap = i18n.bizMap('bas/user');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage, tableSelects,
    addModalVisible, updateModalVisible, addFormSubmit, updateFormSubmit, addFormData, updateFormData,
    infoModalVisible, infoTableData, usrRoleFormSubmit, usrRoleFormData, usrRoleModalVisible,
    orgTreeData,
  } = userManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }
  // const selectIds = [];
  // for (let i = 0; i < tableSelects.length; i++) {
  //   selectIds.push(tableSelects[i].usrId);
  // }
  const cardProps = {
    title: bizMap.userManage,
    style: { width: '100%' },
  };
  const queryFormProps = {
    orgTreeData,
    formSubmit: (dat) => {
      dispatch({
        type: 'userManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    addClick: () => {
      dispatch({
        type: 'userManage/toggleModal',
        payload: { type: 'add' },
      });
    },
    deleteClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        for (let i = 0; i < tableSelects.length; i++) {
          if (tableSelects[i].usrStatus === '1') {
            callNotice(commonMap.warning, commonMap.enaleNotice, 'warning');
            return;
          }
        }
        callConfirm(commonMap.tip, commonMap.deleteConfirm, () => {
          dispatch({
            type: 'userManage/deleteList',
            payload: { ids: selectIds.toString() },
          });
        });
      }
    },
    enableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        const usrStatus = tableSelects[0].usrStatus;
        for (let i = 0; i < tableSelects.length; i++) {
          if (usrStatus !== tableSelects[i].usrStatus) {
            callNotice(commonMap.warning, bizMap.statusNotMatch, 'warning');
            return;
          }
          if (tableSelects[i].usrStatus !== '0' && tableSelects[i].usrStatus !== '1') {
            callNotice(commonMap.warning, bizMap.programErr, 'warning');
            return;
          }
        }
        if (usrStatus === '1') {
          callNotice(commonMap.warning, commonMap.enaleNotice, 'warning');
          return;
        }
        callConfirm(commonMap.tip, commonMap.enableConfirm, () => {
          dispatch({
            type: 'userManage/updateStatus',
            payload: { ids: selectIds.toString(), usrStatus: '1' },
          });
        });
      }
    },
    disableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        const usrStatus = tableSelects[0].usrStatus;
        for (let i = 0; i < tableSelects.length; i++) {
          if (usrStatus !== tableSelects[i].usrStatus) {
            callNotice(commonMap.warning, bizMap.statusNotMatch, 'warning');
            return;
          }
          if (tableSelects[i].usrStatus !== '0' && tableSelects[i].usrStatus !== '1') {
            callNotice(commonMap.warning, bizMap.programErr, 'warning');
            return;
          }
        }
        if (usrStatus === '0') {
          callNotice(commonMap.warning, commonMap.disableNotice, 'warning');
          return;
        }
        callConfirm(commonMap.tip, commonMap.disableConfirm, () => {
          dispatch({
            type: 'userManage/updateStatus',
            payload: { ids: selectIds.toString(), usrStatus: '0' },
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
        type: 'userManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'userManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'userManage/toggleModal',
        payload: { type: 'info', data: record },
      });
    },
    handleUpdateClick(record) {
      dispatch({
        type: 'userManage/toggleModal',
        payload: { type: 'update', data: record },
      });
    },
    handleResetPwdClick(record) {
      callConfirm(commonMap.tip, bizMap.toResetPwd, () => {
        dispatch({
          type: 'userManage/resetPwd',
          payload: { ...record },
        });
      });
    },
    handleUnLockClick(record) {
      if (record.isLock === '1') {
        callConfirm(commonMap.tip, bizMap.toUnLock, () => {
          dispatch({
            type: 'userManage/unLock',
            payload: { ...record },
          });
        });
      } else {
        callNotice(commonMap.warning, bizMap.unLocked, 'warning');
      }
    },
    handleQueryUsrRoleClick(record) {
      dispatch({
        type: 'userManage/queryUsrRole',
        payload: { ...record },
      });
    },
  };
  const infoModalProps = {
    footer: null,
    title: commonMap.detail,
    visible: infoModalVisible,
    onCancel: () => {
      dispatch({
        type: 'userManage/toggleModal',
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
        type: 'userManage/toggleModal',
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
        type: 'userManage/toggleModal',
        payload: { type: 'update', data: {} },
      });
    },
  };
  const addFormProps = {
    orgTreeData,
    data: addFormData,
    submiting: addFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'userManage/addOne',
        payload: { ...dat },
      });
    },
  };
  const updateFormProps = {
    orgTreeData,
    data: updateFormData,
    submiting: updateFormSubmit,
    type: 'update',
    formSubmit: (dat) => {
      dispatch({
        type: 'userManage/updateOne',
        payload: { ...dat },
      });
    },
  };
  const usrRoleModalProps = {
    width: 586,
    footer: null,
    title: bizMap.assignRole,
    visible: usrRoleModalVisible,
    onCancel: () => {
      dispatch({
        type: 'userManage/toggleModal',
        payload: { type: 'assignRole', data: {} },
      });
    },
  };
  const usrRoleFormProps = {
    data: usrRoleFormData,
    submiting: usrRoleFormSubmit,
    changeData: (data) => {
      dispatch({
        type: 'userManage/updateState',
        payload: { usrRoleFormData: data },
      });
    },
    formSubmit: (dat) => {
      dispatch({
        type: 'userManage/assignUsrRole',
        payload: { ...dat },
      });
    },
  };
  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  const AddFormGen = () => <UserInfoForm {...addFormProps} />;
  const UpdateFormGen = () => <UserInfoForm {...updateFormProps} />;
  return (
    <div>
      <Card {...cardProps}>
        <UserQueryForm {...queryFormProps} />
        <UserPageTable {...tableProps} />
      </Card>
      <Modal {...addModalProps}>
        <AddFormGen />
      </Modal>
      <Modal {...updateModalProps}>
        <UpdateFormGen />
      </Modal>
      <Modal {...infoModalProps}>
        <UserInfoTable {...infoTableProps} />
      </Modal>
      <Modal {...usrRoleModalProps}>
        <UserRoleInfoForm {...usrRoleFormProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ userManage }) {
  return { userManage };
}

export default connect(mapStateToProps)(UserManage);
