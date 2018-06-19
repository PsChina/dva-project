import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import RoleQueryForm from '../../../components/business/bas/role/RoleQueryForm';
import RolePageTable from '../../../components/business/bas/role/RolePageTable';
import RoleInfoForm from '../../../components/business/bas/role/RoleInfoForm';
import RoleInfoTable from '../../../components/business/bas/role/RoleInfoTable';
import RoleMenuInfoForm from '../../../components/business/bas/role/RoleMenuInfoForm';
import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const RoleManage = ({ dispatch, roleManage }) => {
  const objectid = 'roleId';
  const bizMap = i18n.bizMap('bas/role');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage, tableSelects,
    addModalVisible, updateModalVisible, addFormSubmit, updateFormSubmit, addFormData, updateFormData,
    infoModalVisible, infoTableData, roleMenuFormData, roleMenuModalVisible, roleMenuFormSubmit,
  } = roleManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }
  // const selectIds = [];
  // for (let i = 0; i < tableSelects.length; i++) {
  //   selectIds.push(tableSelects[i].roleId);
  // }
  const cardProps = {
    title: bizMap.roleManage,
    style: { width: '100%' },
  };
  const queryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'roleManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    addClick: () => {
      dispatch({
        type: 'roleManage/toggleModal',
        payload: { type: 'add' },
      });
    },
    deleteClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        for (let i = 0; i < tableSelects.length; i++) {
          if (tableSelects[i].isUse === '1') {
            callNotice(commonMap.warning, commonMap.enaleNotice, 'warning');
            return;
          }
        }
        callConfirm(commonMap.tip, commonMap.deleteConfirm, () => {
          dispatch({
            type: 'roleManage/deleteList',
            payload: { ids: selectIds.toString() },
          });
        });
      }
    },
    enableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        const isUse = tableSelects[0].isUse;
        for (let i = 0; i < tableSelects.length; i++) {
          if (isUse !== tableSelects[i].isUse) {
            callNotice(commonMap.warning, bizMap.statusNotMatch, 'warning');
            return;
          }
          if (tableSelects[i].isUse !== '0' && tableSelects[i].isUse !== '1') {
            callNotice(commonMap.warning, bizMap.programErr, 'warning');
            return;
          }
        }
        if (isUse === '1') {
          callNotice(commonMap.warning, commonMap.enaleNotice, 'warning');
          return;
        }
        callConfirm(commonMap.tip, commonMap.enableConfirm, () => {
          dispatch({
            type: 'roleManage/updateStatus',
            payload: { ids: selectIds.toString(), isUse: '1' },
          });
        });
      }
    },
    disableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        const isUse = tableSelects[0].isUse;
        for (let i = 0; i < tableSelects.length; i++) {
          if (isUse !== tableSelects[i].isUse) {
            callNotice(commonMap.warning, bizMap.statusNotMatch, 'warning');
            return;
          }
          if (tableSelects[i].isUse !== '0' && tableSelects[i].isUse !== '1') {
            callNotice(commonMap.warning, bizMap.programErr, 'warning');
            return;
          }
        }
        if (isUse === '0') {
          callNotice(commonMap.warning, commonMap.disableNotice, 'warning');
          return;
        }
        callConfirm(commonMap.tip, commonMap.disableConfirm, () => {
          dispatch({
            type: 'roleManage/updateStatus',
            payload: { ids: selectIds.toString(), isUse: '0' },
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
        type: 'roleManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'roleManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'roleManage/toggleModal',
        payload: { type: 'info', data: record },
      });
    },
    handleUpdateClick(record) {
      dispatch({
        type: 'roleManage/toggleModal',
        payload: { type: 'update', data: record },
      });
    },
    handleQueryRoleMenuClick(record) {
      dispatch({
        type: 'roleManage/queryRoleMenu',
        payload: { ...record },
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
        type: 'roleManage/toggleModal',
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
        type: 'roleManage/toggleModal',
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
        type: 'roleManage/toggleModal',
        payload: { type: 'update', data: {} },
      });
    },
  };
  const addFormProps = {
    data: addFormData,
    submiting: addFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'roleManage/addOne',
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
        type: 'roleManage/updateOne',
        payload: { ...dat },
      });
    },
  };
  const roleMenuModalProps = {
    width: 586,
    footer: null,
    title: bizMap.assignMenu,
    visible: roleMenuModalVisible,
    onCancel: () => {
      dispatch({
        type: 'roleManage/toggleModal',
        payload: { type: 'assignMenu', data: {} },
      });
    },
  };
  const roleMenuFormProps = {
    data: roleMenuFormData,
    submiting: roleMenuFormSubmit,
    changeData: (data) => {
      dispatch({
        type: 'roleManage/updateState',
        payload: { roleMenuFormData: data },
      });
    },
    formSubmit: (dat) => {
      dispatch({
        type: 'roleManage/assignRoleMenu',
        payload: { ...dat },
      });
    },
  };
  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  const AddFormGen = () => <RoleInfoForm {...addFormProps} />;
  const UpdateFormGen = () => <RoleInfoForm {...updateFormProps} />;
  return (
    <div>
      <Card {...cardProps}>
        <RoleQueryForm {...queryFormProps} />
        <RolePageTable {...tableProps} />
      </Card>
      <Modal {...addModalProps}>
        <AddFormGen />
      </Modal>
      <Modal {...updateModalProps}>
        <UpdateFormGen />
      </Modal>
      <Modal {...infoModalProps}>
        <RoleInfoTable {...infoTableProps} />
      </Modal>
      <Modal {...roleMenuModalProps}>
        <RoleMenuInfoForm {...roleMenuFormProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ roleManage }) {
  return { roleManage };
}

export default connect(mapStateToProps)(RoleManage);
