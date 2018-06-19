import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import AgentRoleQueryForm from '../../../components/business/mms/agentRole/AgentRoleQueryForm';
import AgentRolePageTable from '../../../components/business/mms/agentRole/AgentRolePageTable'
import AgentRoleInfoTable from '../../../components/business/mms/agentRole/AgentRoleInfoTable';
import AgentRoleInfoForm from '../../../components/business/mms/agentRole/infoForm/AgentRoleInfoForm';
import AgentRoleStepForm from '../../../components/business/mms/agentRole/stepForm/AgentRoleStepForm';
import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const AgentRoleManage = ({ dispatch, agentRoleManage }) => {
  const objectid = 'roleId';
  const bizMap = i18n.bizMap('mms/agent');
  const commonMap = i18n.commonMap();
  const {
    advExpand, tableParam, tableLoading, tableList, tableTotal, tableSelects, updateFormSubmit, updateFormData,
     addFormSubmit, addModalVisible, sysInfoList, tableCurrentPage,
    infoModalVisible, infoTableData, updateModalVisible } = agentRoleManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }

  const cardProps = {
    title: bizMap.agentRoleManage,
    style: { width: '100%' },
  };
  const queryFormProps = {
    sysInfoList,
    advExpand,
    collapseClick: () => {
      dispatch({
        type: 'agentRoleManage/toggleAdvExpand',
      });
    },
    formSubmit: (dat) => {
      dispatch({
        type: 'agentRoleManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    enableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        callConfirm(commonMap.tip, commonMap.enableConfirm, () => {
          dispatch({
            type: 'agentRoleManage/updateStatus',
            payload: { ids: selectIds.toString(), isUse: '1' },
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
            type: 'agentRoleManage/updateStatus',
            payload: { ids: selectIds.toString(), isUse: '0' },
          });
        });
      }
    },
    addOne: () => {
      dispatch({
        type: 'agentRoleManage/toggleModal',
        payload: { type: 'add' },
      });
    },
    del: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        callConfirm(commonMap.tip, commonMap.deleteConfirm, () => {
          dispatch({
            type: 'agentRoleManage/deleteList',
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
        type: 'agentRoleManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'agentRoleManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'agentRoleManage/toggleModal',
        payload: { type: 'info', data: record },
      });
    },
    handleUpdateClick(record) {
      dispatch({
        type: 'agentRoleManage/toggleModal',
        payload: { type: 'update', data: record },
      });
    },
  };
  const infoModalProps = {
    footer: null,
    title: commonMap.detail,
    visible: infoModalVisible,
    onCancel: () => {
      dispatch({
        type: 'agentRoleManage/toggleModal',
        payload: { type: 'info', data: {} },
      });
    },
  };
  const addModalProps = {
    footer: null,
    title: commonMap.add,
    visible: addModalVisible,
    onCancel: () => {
      dispatch({
        type: 'agentRoleManage/toggleModal',
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
        type: 'agentRoleManage/toggleModal',
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
        type: 'agentRoleManage/updateOne',
        payload: { ...dat },
      });
    },
  };
  const addFormProps = {
    sysInfoList,
    submiting: addFormSubmit,
    addFormSubmit: (dat) => {
      dispatch({
        type: 'agentRoleManage/addOne',
        payload: { ...dat },
      });
    },
  };
  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  const UpdateFormGen = () => <AgentRoleInfoForm {...updateFormProps} />;

  return (
    <div>
      <Card {...cardProps}>
        <AgentRoleQueryForm {...queryFormProps} />
        <AgentRolePageTable {...tableProps} />
      </Card>
      <Modal {...updateModalProps}>
        <UpdateFormGen />
      </Modal>
      <Modal {...infoModalProps}>
        <AgentRoleInfoTable {...infoTableProps} />
      </Modal>
      <Modal {...addModalProps}>
        <AgentRoleStepForm {...addFormProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ agentRoleManage }) {
  return { agentRoleManage };
}

export default connect(mapStateToProps)(AgentRoleManage);
