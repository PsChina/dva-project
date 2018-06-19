import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import MenuQueryForm from '../../../components/business/bas/menu/MenuQueryForm';
import MenuPageTable from '../../../components/business/bas/menu/MenuPageTable';
import MenuInfoForm from '../../../components/business/bas/menu/MenuInfoForm';
import MenuInfoTable from '../../../components/business/bas/menu/MenuInfoTable';
import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const MenuManage = ({ dispatch, menuManage }) => {
  const objectid = 'menuId';
  const bizMap = i18n.bizMap('bas/menu');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage, tableSelects,
    addModalVisible, updateModalVisible, addFormSubmit, updateFormSubmit, addFormData, updateFormData,
    infoModalVisible, infoTableData,
  } = menuManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }
  // const selectIds = [];
  // for (let i = 0; i < tableSelects.length; i++) {
  //   selectIds.push(tableSelects[i].menuId);
  // }
  const cardProps = {
    title: bizMap.menuManage,
    style: { width: '100%' },
  };
  const queryFormProps = {
    tableParam,
    formSubmit: (dat) => {
      dispatch({
        type: 'menuManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    addClick: () => {
      const addData = {};
      if (tableSelects.length === 1) {
        addData.parentMenuId = tableSelects[0].menuId;
        addData.parentMenuName = tableSelects[0].menuName;
        dispatch({
          type: 'menuManage/toggleModal',
          payload: { type: 'add', addFormData: addData },
        })
      } else {
        callNotice(commonMap.warning, bizMap.addNotice, 'warning');
      }
    },
    deleteClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        for (let i = 0; i < tableSelects.length; i++) {
          if (tableSelects[i].isLeaf === '0') {
            callNotice(commonMap.warning, bizMap.topMenuDeleteNotice, 'warning');
            return;
          }
          if (tableSelects[i].menuStatus === '1') {
            callNotice(commonMap.warning, commonMap.enaleNotice, 'warning');
            return;
          }
        }
        callConfirm(commonMap.tip, bizMap.deleteConfirm, () => {
          dispatch({
            type: 'menuManage/deleteList',
            payload: { ids: selectIds.toString() },
          });
        });
      }
    },
    enableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        const menuStatus = tableSelects[0].menuStatus;
        for (let i = 0; i < tableSelects.length; i++) {
          if (menuStatus !== tableSelects[i].menuStatus) {
            callNotice(commonMap.warning, bizMap.statusNotMatch, 'warning');
            return;
          }
          if (tableSelects[i].menuStatus !== '0' && tableSelects[i].menuStatus !== '1') {
            callNotice(commonMap.warning, bizMap.programErr, 'warning');
            return;
          }
        }
        if (menuStatus === '1') {
          callNotice(commonMap.warning, commonMap.enaleNotice, 'warning');
          return;
        }
        callConfirm(commonMap.tip, bizMap.enableConfirm, () => {
          dispatch({
            type: 'menuManage/updateStatus',
            payload: { tableParam: { ...tableParam, currentPage: 1 }, ids: selectIds.toString(), menuStatus: '1' },
          });
        });
      }
    },
    disableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        const menuStatus = tableSelects[0].menuStatus;
        for (let i = 0; i < tableSelects.length; i++) {
          if (menuStatus !== tableSelects[i].menuStatus) {
            callNotice(commonMap.warning, bizMap.statusNotMatch, 'warning');
            return;
          }
          if (tableSelects[i].menuStatus !== '0' && tableSelects[i].menuStatus !== '1') {
            callNotice(commonMap.warning, bizMap.programErr, 'warning');
            return;
          }
        }
        if (menuStatus === '0') {
          callNotice(commonMap.warning, commonMap.disableNotice, 'warning');
          return;
        }
        callConfirm(commonMap.tip, bizMap.disableConfirm, () => {
          dispatch({
            type: 'menuManage/updateStatus',
            payload: { tableParam: { ...tableParam, currentPage: 1 }, ids: selectIds.toString(), menuStatus: '0' },
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
        type: 'menuManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'menuManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'menuManage/toggleModal',
        payload: { type: 'info', data: record },
      });
    },
    handleUpdateClick(record) {
      dispatch({
        type: 'menuManage/toggleModal',
        payload: { type: 'update', data: record },
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
        type: 'menuManage/toggleModal',
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
        type: 'menuManage/toggleModal',
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
        type: 'menuManage/toggleModal',
        payload: { type: 'update', data: {} },
      });
    },
  };
  const addFormProps = {
    data: addFormData,
    submiting: addFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'menuManage/addOne',
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
        type: 'menuManage/updateOne',
        payload: { ...dat },
      });
    },
  };
  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  const AddFormGen = () => <MenuInfoForm {...addFormProps} />;
  const UpdateFormGen = () => <MenuInfoForm {...updateFormProps} />;
  return (
    <div>
      <Card {...cardProps}>
        <MenuQueryForm {...queryFormProps} />
        <MenuPageTable {...tableProps} />
      </Card>
      <Modal {...addModalProps}>
        <AddFormGen />
      </Modal>
      <Modal {...updateModalProps}>
        <UpdateFormGen />
      </Modal>
      <Modal {...infoModalProps}>
        <MenuInfoTable {...infoTableProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ menuManage }) {
  return { menuManage };
}

export default connect(mapStateToProps)(MenuManage);
