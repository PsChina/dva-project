import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import ModelMainQueryForm from '../../../components/business/bas/modelMain/ModelMainQueryForm';
import ModelMainPageTable from '../../../components/business/bas/modelMain/ModelMainPageTable';
import ModelMainInfoForm from '../../../components/business/bas/modelMain/ModelMainInfoForm';
import ModelMainProcess from '../../../components/business/bas/modelMain/ModelMainProcess';
import ProcessAssionForm from '../../../components/business/bas/modelMain/ProcessAssionForm';
import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const ModelMainManage = ({ dispatch, modelMainManage }) => {
  const objectid = 'modelno';
  const systemno = '000';
  const bizMap = i18n.bizMap('bas/modelMain');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage, tableSelects,
    addModalVisible, updateModalVisible, addFormSubmit, updateFormSubmit, addFormData, updateFormData,
    processCfgList, viewModalVisible,
    processModalVisible, processFormData, processFormSubmit,
  } = modelMainManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }
  const cardProps = {
    title: bizMap.modelMainManage,
    style: { width: '100%' },
  };
  const queryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'modelMainManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1, pageSize: 10, systemno: systemno } },
      });
    },
    addClick: () => {
      dispatch({
        type: 'modelMainManage/toggleModal',
        payload: { type: 'add' },
      });
    },
    enableClick: () => {
      const enableData = { systemno: systemno, modelnos: selectIds.toString() };
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        callConfirm(commonMap.tip, commonMap.enableConfirm, () => {
          dispatch({
            type: 'modelMainManage/updateStatus',
            payload: { ids: selectIds.toString(), status: '1', enableData: enableData },
          });
        });
      }
    },
    disableClick: () => {
      const disableData = { systemno: systemno, modelno: selectIds.toString() };
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        callConfirm(commonMap.tip, commonMap.disableConfirm, () => {
          dispatch({
            type: 'modelMainManage/disableModelMain',
            payload: { ids: selectIds.toString(), status: '0', disableData: disableData },
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
        type: 'modelMainManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'modelMainManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleUpdateClick(record) {
      dispatch({
        type: 'modelMainManage/toggleModal',
        payload: { type: 'update', data: record },
      });
    },
    handleViewProcessClick(record) {
      dispatch({
        type: 'modelMainManage/queryOneProcess',
        payload: { data: record },
      })
    },
    handleToProcesskClick(record) {
      dispatch({
        type: 'modelMainManage/buildModelPathPre',
        payload: { ...record },
      })
    },
    handleDeleteClick(record) {
      callConfirm(commonMap.tip, commonMap.deleteConfirm, () => {
        dispatch({
          type: 'modelMainManage/deleteOne',
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
        type: 'modelMainManage/toggleModal',
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
        type: 'modelMainManage/toggleModal',
        payload: { type: 'update', data: {} },
      });
    },
  };
  const addFormProps = {
    data: addFormData,
    submiting: addFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'modelMainManage/addOne',
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
        type: 'modelMainManage/updateOne',
        payload: { ...dat },
      });
    },
  };

  const viewModalProps = {
    footer: null,
    title: bizMap.viewProcess,
    visible: viewModalVisible,
    onCancel: () => {
      dispatch({
        type: 'modelMainManage/toggleModal',
        payload: { type: 'view', data: {} },
      });
    },
  };
  const propcessAssignModalProps = {
    width: 586,
    footer: null,
    title: bizMap.toProcess,
    visible: processModalVisible,
    onCancel: () => {
      dispatch({
        type: 'modelMainManage/toggleModal',
        payload: { type: 'modelPath', data: {} },
      });
    },
  };

  const propcessAssignProps = {
    data: processFormData,
    submiting: processFormSubmit,
    changeData: (data) => {
      dispatch({
        type: 'modelMainManage/updateState',
        payload: { processFormData: data },
      });
    },
    formSubmit: (dat) => {
      dispatch({
        type: 'modelMainManage/buildModelPath',
        payload: { ...dat },
      });
    },
  };
  const viewPropcessProps = {
    processCfgList,
  };
  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  const AddFormGen = () => <ModelMainInfoForm {...addFormProps} />;
  const UpdateFormGen = () => <ModelMainInfoForm {...updateFormProps} />;
  return (
    <div>
      <Card {...cardProps}>
        <ModelMainQueryForm {...queryFormProps} />
        <ModelMainPageTable {...tableProps} />
      </Card>
      <Modal {...viewModalProps}>
        <ModelMainProcess {...viewPropcessProps} />
      </Modal>
      <Modal {...propcessAssignModalProps}>
        <ProcessAssionForm {...propcessAssignProps} />
      </Modal>
      <Modal {...addModalProps}>
        <AddFormGen />
      </Modal>
      <Modal {...updateModalProps}>
        <UpdateFormGen />
      </Modal>
    </div>
  );
};

function mapStateToProps({ modelMainManage }) {
  return { modelMainManage };
}

export default connect(mapStateToProps)(ModelMainManage);
