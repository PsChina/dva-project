import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import AgentRoleQueryForm from '../../../components/business/mms/agentUsr/AgentUsrQueryForm';
import AgentRolePageTable from '../../../components/business/mms/agentUsr/AgentUsrPageTable';
import AgentRoleInfoTable from '../../../components/business/mms/agentUsr/AgentUsrInfoTable';
import AgentRoleInfoForm from '../../../components/business/mms/agentUsr/infoForm/AgentUsrInfoForm';
import AgentRoleStepForm from '../../../components/business/mms/agentUsr/stepForm/AgentUsrStepForm';
import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const AgentUsrManage = ({ dispatch, agentUsrManage }) => {
  const objectid = 'usrId';
  const bizMap = i18n.bizMap('mms/agent');
  const commonMap = i18n.commonMap();
  const {
    advExpand, tableParam, tableLoading, tableList, tableTotal, tableSelects, updateFormSubmit, updateFormData,
     addFormSubmit, addModalVisible, sysInfoList, tableCurrentPage,
    infoModalVisible, infoTableData, updateModalVisible } = agentUsrManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }

  const cardProps = {
    title: bizMap.agentUsrManage,
    style: { width: '100%' },
  };
  const queryFormProps = {
    sysInfoList,
    advExpand,
    collapseClick: () => {
      dispatch({
        type: 'agentUsrManage/toggleAdvExpand',
      });
    },
    formSubmit: (dat) => {
      dispatch({
        type: 'agentUsrManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    enableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        callConfirm(commonMap.tip, commonMap.enableConfirm, () => {
          dispatch({
            type: 'agentUsrManage/updateStatus',
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
            type: 'agentUsrManage/updateStatus',
            payload: { ids: selectIds.toString(), usrStatus: '0' },
          });
        });
      }
    },
    addOne: () => {
      dispatch({
        type: 'agentUsrManage/toggleModal',
        payload: { type: 'add' },
      });
    },
    del: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        callConfirm(commonMap.tip, commonMap.deleteConfirm, () => {
          dispatch({
            type: 'agentUsrManage/deleteList',
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
        type: 'agentUsrManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'agentUsrManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'agentUsrManage/toggleModal',
        payload: { type: 'info', data: record },
      });
    },
    handleUpdateClick(record) {
      dispatch({
        type: 'agentUsrManage/toggleModal',
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
        type: 'agentUsrManage/toggleModal',
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
        type: 'agentUsrManage/toggleModal',
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
        type: 'agentUsrManage/toggleModal',
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
        type: 'agentUsrManage/updateOne',
        payload: { ...dat },
      });
    },
  };
  const addFormProps = {
    sysInfoList,
    submiting: addFormSubmit,
    addFormSubmit: (dat) => {
      dispatch({
        type: 'agentUsrManage/addOne',
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

function mapStateToProps({ agentUsrManage }) {
  return { agentUsrManage };
}

export default connect(mapStateToProps)(AgentUsrManage);
