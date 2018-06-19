import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import PositionQueryForm from '../../../components/business/bas/position/PositionQueryForm';
import PositionPageTable from '../../../components/business/bas/position/PositionPageTable';
import PositionInfoForm from '../../../components/business/bas/position/PositionInfoForm';
import PositionRoleInfoForm from '../../../components/business/bas/position/PositionRoleInfoForm';
import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const PositionManage = ({ dispatch, positionManage }) => {
  const objectid = 'positionno';
  const bizMap = i18n.bizMap('bas/position');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage, tableSelects,
    addModalVisible, updateModalVisible, addFormSubmit, updateFormSubmit, addFormData, updateFormData,
    positionRoleFormSubmit, positionRoleFormData, positionRoleModalVisible,
  } = positionManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }
  const selectPositioncodes = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const positioncode = typeof tableSelects[i] === 'object' ? tableSelects[i].positioncode : tableSelects[i];
    selectPositioncodes.push(positioncode);
  }

  const cardProps = {
    title: bizMap.positionManage,
    style: { width: '100%' },
  };
  const queryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'positionManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1, systemno: '000' } },
      });
    },
    addClick: () => {
      dispatch({
        type: 'positionManage/toggleModal',
        payload: { type: 'add' },
      });
    },
    enableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        const status = tableSelects[0].status;
        for (let i = 0; i < tableSelects.length; i++) {
          if (status !== tableSelects[i].status) {
            callNotice(commonMap.warning, bizMap.statusNotMatch, 'warning');
            return;
          }
          if (tableSelects[i].status !== '0' && tableSelects[i].status !== '1') {
            callNotice(commonMap.warning, bizMap.programErr, 'warning');
            return;
          }
        }
        if (status === '1') {
          callNotice(commonMap.warning, commonMap.enaleNotice, 'warning');
          return;
        }
        callConfirm(commonMap.tip, commonMap.enableConfirm, () => {
          dispatch({
            type: 'positionManage/updateStatus',
            payload: { ids: selectIds.toString(), positioncodes: selectPositioncodes.toString(), status: '1' },
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
            callNotice(commonMap.warning, bizMap.statusNotMatch, 'warning');
            return;
          }
          if (tableSelects[i].status !== '0' && tableSelects[i].status !== '1') {
            callNotice(commonMap.warning, bizMap.programErr, 'warning');
            return;
          }
        }
        if (status === '0') {
          callNotice(commonMap.warning, commonMap.enaleNotice, 'warning');
          return;
        }
        callConfirm(commonMap.tip, commonMap.disableConfirm, () => {
          dispatch({
            type: 'positionManage/updateStatus',
            payload: { ids: selectIds.toString(), positioncodes: selectPositioncodes.toString(), status: '0' },
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
        type: 'positionManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'positionManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleUpdateClick(record) {
      dispatch({
        type: 'positionManage/toggleModal',
        payload: { type: 'update', data: record },
      });
    },
    handleViewProcessClick(record) {
      dispatch({
        type: 'positionManage/queryOneProcess',
        payload: { type: 'view', data: record },
      })
    },
    handleDeleteClick(record) {
      callConfirm(commonMap.tip, commonMap.deleteConfirm, () => {
        dispatch({
          type: 'positionManage/deleteOne',
          payload: { data: record },
        });
      });
    },
    handleQueryPositionRoleClick(record) {
      dispatch({
        type: 'positionManage/queryPositionRole',
        payload: { ...record },
      });
    },
  };

  const addModalProps = {
    footer: null,
    title: commonMap.add,
    visible: addModalVisible,
    onCancel: () => {
      dispatch({
        type: 'positionManage/toggleModal',
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
        type: 'positionManage/toggleModal',
        payload: { type: 'update', data: {} },
      });
    },
  };
  const addFormProps = {
    data: addFormData,
    submiting: addFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'positionManage/addOne',
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
        type: 'positionManage/updateOne',
        payload: { ...dat },
      });
    },
  };
  const positionRoleModalProps = {
    width: 586,
    footer: null,
    title: bizMap.assignRole,
    visible: positionRoleModalVisible,
    onCancel: () => {
      dispatch({
        type: 'positionManage/toggleModal',
        payload: { type: 'positionRole', data: {} },
      });
    },
  };
  const positionRoleFormProps = {
    data: positionRoleFormData,
    submiting: positionRoleFormSubmit,
    changeData: (data) => {
      dispatch({
        type: 'positionManage/updateState',
        payload: { positionRoleFormData: data },
      });
    },
    formSubmit: (dat) => {
      dispatch({
        type: 'positionManage/addPositionRole',
        payload: { ...dat },
      });
    },
  };

  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  const AddFormGen = () => <PositionInfoForm {...addFormProps} />;
  const UpdateFormGen = () => <PositionInfoForm {...updateFormProps} />;
  return (
    <div>
      <Card {...cardProps}>
        <PositionQueryForm {...queryFormProps} />
        <PositionPageTable {...tableProps} />
      </Card>
      <Modal {...addModalProps}>
        <AddFormGen />
      </Modal>
      <Modal {...updateModalProps}>
        <UpdateFormGen />
      </Modal>
      <Modal {...positionRoleModalProps}>
        <PositionRoleInfoForm {...positionRoleFormProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ positionManage }) {
  return { positionManage };
}

export default connect(mapStateToProps)(PositionManage);
