import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import ProcedureQueryForm from '../../../components/business/bas/procedure/ProcedureQueryForm';
import ProcedurePageTable from '../../../components/business/bas/procedure/ProcedurePageTable';
import ProcedureInfoForm from '../../../components/business/bas/procedure/ProcedureInfoForm';
import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const ProcedureManage = ({ dispatch, procedureManage }) => {
  const objectid = 'nodeno';
  const bizMap = i18n.bizMap('bas/procedure');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage, tableSelects,
    addModalVisible, updateModalVisible, addFormSubmit, updateFormSubmit, addFormData, updateFormData,
    modelMainOptionsData, positionOptionsData,
  } = procedureManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }
  const selectProcedurenos = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const nodeno = typeof tableSelects[i] === 'object' ? tableSelects[i].nodeno : tableSelects[i];
    selectProcedurenos.push(nodeno);
  }

  const cardProps = {
    title: bizMap.procedureManage,
    style: { width: '100%' },
  };
  const queryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'procedureManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1, systemno: '000' } },
      });
    },
    addClick: () => {
      dispatch({
        type: 'procedureManage/toggleModal',
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
            type: 'procedureManage/updateStatus',
            payload: { ids: selectIds.toString(), procedurenos: selectProcedurenos.toString(), status: '1' },
          });
        });
      }
    },
    disableClick: () => {
      if (tableSelects.length !== 1) {
        callNotice(commonMap.warning, bizMap.selectOne, 'warning');
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
            type: 'procedureManage/updateStatus',
            payload: { ids: selectIds.toString(), procedurenos: selectProcedurenos.toString(), status: '0' },
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
        type: 'procedureManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'procedureManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleUpdateClick(record) {
      dispatch({
        type: 'procedureManage/toggleModal',
        payload: { type: 'update', data: record },
      });
    },
    handleViewProcessClick(record) {
      dispatch({
        type: 'procedureManage/queryOneProcess',
        payload: { type: 'view', data: record },
      })
    },
    handleDeleteClick(record) {
      callConfirm(commonMap.tip, commonMap.deleteConfirm, () => {
        dispatch({
          type: 'procedureManage/deleteOne',
          payload: { data: record },
        });
      });
    },
  };

  const addModalProps = {
    footer: null,
    title: commonMap.add,
    visible: addModalVisible,
    onCancel: () => {
      dispatch({
        type: 'procedureManage/toggleModal',
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
        type: 'procedureManage/toggleModal',
        payload: { type: 'update', data: {} },
      });
    },
  };
  const addFormProps = {
    data: addFormData,
    submiting: addFormSubmit,
    modelMainOptions: modelMainOptionsData,
    positionOptions: positionOptionsData,
    formSubmit: (dat) => {
      dispatch({
        type: 'procedureManage/addOne',
        payload: { ...dat },
      });
    },
  };
  const updateFormProps = {
    data: updateFormData,
    submiting: updateFormSubmit,
    modelMainOptions: modelMainOptionsData,
    positionOptions: positionOptionsData,
    type: 'update',
    formSubmit: (dat) => {
      dispatch({
        type: 'procedureManage/updateOne',
        payload: { ...dat },
      });
    },
  };

  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  const AddFormGen = () => <ProcedureInfoForm {...addFormProps} />;
  const UpdateFormGen = () => <ProcedureInfoForm {...updateFormProps} />;
  return (
    <div>
      <Card {...cardProps}>
        <ProcedureQueryForm {...queryFormProps} />
        <ProcedurePageTable {...tableProps} />
      </Card>
      <Modal {...addModalProps}>
        <AddFormGen />
      </Modal>
      <Modal {...updateModalProps}>
        <UpdateFormGen />
      </Modal>
    </div>
  );
};

function mapStateToProps({ procedureManage }) {
  return { procedureManage };
}

export default connect(mapStateToProps)(ProcedureManage);
