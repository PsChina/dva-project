import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import WarnGroupQueryForm from '../../../components/business/rms/WarnGroup/WarnGroupQueryForm';
import WarnGroupInfoForm from '../../../components/business/rms/WarnGroup/WarnGroupInfoForm';
import WarnPageTable from '../../../components/business/rms/WarnGroup/WarnPageTable';


import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const WarnGroupManage = ({ dispatch, warnGroupManage }) => {
  const bizMap = i18n.bizMap('rms/warnGroup');
  const commonMap = i18n.commonMap();
  const { tableParam, tableLoading, tableList, tableTotal, tableSelects, tableCurrentPage, loading,
    addModalVisible, updateModalVisible, modalFormData, updateFormSubmit, addFormSubmit } = warnGroupManage;

  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    selectIds.push(tableSelects[i].grpId);
  }
  let selectId = '';
  for (let i = 0; i < selectIds.length; i++) {
    selectId += `${selectIds[i]},`;
  }
  const reg = /,$/gi;
  selectId = selectId.replace(reg, '');

  const cardProps = {
    title: bizMap.warnGrop,
    style: { width: '100%' },
  };

  // 查询表单相关属性
  const queryFormProps = {
    formSubmit: (dat) => {
      if (dat.grpOrgId !== undefined){
      const parmes = dat.grpOrgId;
      const reg = /,$/gi;
      let payload = '';
      for (let i = 0; i < parmes.length; i++) {
        payload += `${parmes[i]},`;
      }
      payload = payload.replace(reg, '');
       dispatch({
        type: 'warnGroupManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1, requestType: 'table', grpOrgId: payload } },
      });
      } else {
        dispatch({
        type: 'warnGroupManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1, requestType: 'table' } },
      });
      }
    },
    addClick: () => {
      dispatch({
        type: 'warnGroupManage/toggleModal',
        payload: { type: 'add' },
      });
    },
    deleteClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        callConfirm(commonMap.tip, commonMap.deleteConfirm, () => {
          dispatch({
            type: 'warnGroupManage/deleteList',
            payload: { ids: selectId },
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
    handleUpdateClick(record) {
      dispatch({
        type: 'warnGroupManage/toggleModal',
        payload: { type: 'update', dataList: record },
      });
    },
    tablePageChange(next) {
      dispatch({
        type: 'warnGroupManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'warnGroupManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
  };
  // 添加模态框及表单相关属性
  const addFormProps = {
    submiting: addFormSubmit,
    loading,
    formSubmit: (dat) => {
      const parmes = dat.grpOrgId;
      const reg = /,$/gi;
      let payload = '';
      for (let i = 0; i < parmes.length; i++) {
        payload += `${parmes[i]},`;
      }
      payload = payload.replace(reg, '');
      dispatch({
        type: 'warnGroupManage/addOne',
        payload: { ...dat, grpOrgId: payload },
      });
    },

  };
  const addModalProps = {
    footer: null,
    title: commonMap.add,
    visible: addModalVisible,
    onCancel: () => {
      dispatch({
        type: 'warnGroupManage/toggleModal',
        payload: { type: 'add' },
      });
    },
  };
  // 更新模态框及表单相关属性
  const updateFormProps = {
    data: modalFormData,
    loading,
    submiting: updateFormSubmit,
    formSubmit: (dat) => {
      const parmes = dat.grpOrgId;
      const reg = /,$/gi;
      let payload = '';
      for (let i = 0; i < parmes.length; i++) {
        payload += `${parmes[i]},`;
      }
      payload = payload.replace(reg, '');
      dispatch({
        type: 'warnGroupManage/updateOne',
        payload: { ...dat, grpOrgId: payload },
      });
    },
  };
  const updateModalProps = {
    footer: null,
    title: commonMap.update,
    visible: updateModalVisible,
    onCancel: () => {
      dispatch({
        type: 'warnGroupManage/toggleModal',
        payload: { type: 'update', data: {} },
      });
    },
  };

  // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  const UpdateFormGen = () => <WarnGroupInfoForm {...updateFormProps} />;
  const AddFormGen = () => <WarnGroupInfoForm {...addFormProps} />;
  return (
    <Card {...cardProps}>
      <WarnGroupQueryForm {...queryFormProps} />
      <WarnPageTable {...tableProps} />
      <Modal {...addModalProps}>
        <AddFormGen />
      </Modal>
      <Modal {...updateModalProps}>
        <UpdateFormGen />
      </Modal>
    </Card>
  );
};

function mapStateToProps({ warnGroupManage }) {
  return { warnGroupManage };
}

export default connect(mapStateToProps)(WarnGroupManage);
