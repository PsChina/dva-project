import React from 'react';
import { connect } from 'dva';
import { Card, Modal, Spin } from 'antd';
import AgentQueryForm from '../../../components/business/mms/agent/AgentQueryForm';
import AgentPageTable from '../../../components/business/mms/agent/AgentPageTable';
import AgentInfoTable from '../../../components/business/mms/agent/AgentInfoTable';
import AgentAttachDetailInfoForm from '../../../components/business/mms/agent/infoForm/AgentAttachDetailInfoForm';
import AgentUpdBaseInfoForm from '../../../components/business/mms/agent/infoForm/AgentBaseInfoForm';
import AgentUpdAttachInfoForm from '../../../components/business/mms/agent/infoForm/AgentAttachInfoForm';
import AgentUpdAccInfoForm from '../../../components/business/mms/agent/infoForm/AgentAccInfoForm';
import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const AgentManage = ({ dispatch, agentManage }) => {
  const objectid = 'agtId';
  const bizMap = i18n.bizMap('mms/agent');
  const commonMap = i18n.commonMap();
  const {
    advExpand, tableParam, tableLoading, tableList, tableTotal, tableSelects, updateFormSubmit, updateFormData,
    infoModalVisible, infoTableData, updateBaseModalVisible, updateAttachModalVisible, updateAccModalVisible,
    tableRecord, bizSaleList, bankList, tableCurrentPage, agtNameChkMsg, agtMobileChkMsg, agtEmailChkMsg, attachInfoData, agtType,
    attachInfoModalVisible, spinLoading, subBankList, subBankModalVisible,
  } = agentManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }

  const cardProps = {
    title: bizMap.agentManage,
    style: { width: '100%' },
  };
  const queryFormProps = {
    advExpand,
    collapseClick: () => {
      dispatch({
        type: 'agentManage/toggleAdvExpand',
      });
    },
    formSubmit: (dat) => {
      dispatch({
        type: 'agentManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    enableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        const agtStatus = tableSelects[0].agtStatus;
        for (let i = 0; i < tableSelects.length; i++) {
          if (agtStatus !== tableSelects[i].agtStatus) {
            callNotice(commonMap.warning, commonMap.statusNotMatch, 'warning');
            return;
          }
          if (tableSelects[i].agtStatus !== '0' && tableSelects[i].agtStatus !== '1') {
            callNotice(commonMap.warning, commonMap.programErr, 'warning');
            return;
          }
        }
        if (agtStatus === '1') {
          callNotice(commonMap.warning, commonMap.enaleNotice, 'warning');
          return;
        }
        callConfirm(commonMap.tip, commonMap.enableConfirm, () => {
          dispatch({
            type: 'agentManage/updateStatus',
            payload: { ids: selectIds.toString(), agtStatus: '1' },
          });
        });
      }
    },
    disableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        const agtStatus = tableSelects[0].agtStatus;
        for (let i = 0; i < tableSelects.length; i++) {
          if (agtStatus !== tableSelects[i].agtStatus) {
            callNotice(commonMap.warning, commonMap.statusNotMatch, 'warning');
            return;
          }
          if (tableSelects[i].agtStatus !== '0' && tableSelects[i].agtStatus !== '1') {
            callNotice(commonMap.warning, commonMap.programErr, 'warning');
            return;
          }
        }
        if (agtStatus === '0') {
          callNotice(commonMap.warning, commonMap.disableNotice, 'warning');
          return;
        }
        callConfirm(commonMap.tip, commonMap.disableConfirm, () => {
          dispatch({
            type: 'agentManage/updateStatus',
            payload: { ids: selectIds.toString(), agtStatus: '0' },
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
        type: 'agentManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'agentManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'agentManage/toggleModal',
        payload: { type: 'info', data: record },
      });
    },
    handleUpdateClick(visible, record) {
      if (visible) {
        dispatch({
          type: 'agentManage/updateState',
          payload: { tableRecord: record },
        });
      } else {
        dispatch({
          type: 'agentManage/updateState',
          payload: { tableRecord: {} },
        });
      }
    },
    handleUpdateBaseClick() {
      dispatch({
        type: 'agentManage/toggleModal',
        payload: { type: 'updateBase', data: tableRecord },
      });
    },
    handleUpdateAttachClick() {
      dispatch({
        type: 'agentManage/toggleModal',
        payload: { type: 'updateAttach', data: tableRecord },
      });
    },
    handleUpdateAccClick() {
      dispatch({
        type: 'agentManage/toggleModal',
        payload: { type: 'updateAcc', data: tableRecord },
      });
    },
    handleQueryAttachClick(record) {
      dispatch({
        type: 'agentManage/queryAttach',
        payload: { agtType: record.agtType, PKID: record.agtId, TABLENAME: 'agt_Info', attachInfoModalVisible: !attachInfoModalVisible },
      });
    },
  };
  const infoModalProps = {
    footer: null,
    title: commonMap.detail,
    visible: infoModalVisible,
    onCancel: () => {
      dispatch({
        type: 'agentManage/toggleModal',
        payload: { type: 'info', data: {} },
      });
    },
  };
  const infoTableProps = {
    data: infoTableData,
  };

  const attachInfoModalProps = {
    footer: null,
    title: commonMap.detail,
    visible: attachInfoModalVisible,
    onCancel: () => {
      dispatch({
        type: 'agentManage/toggleModal',
        payload: { type: 'attachInfo', data: {} },
      });
    },
  };
  const attachDetailFormProps = {
    agtType: agtType,
    data: attachInfoData,
  };

  const updateBaseModalProps = {
    width: 848,
    footer: null,
    title: commonMap.update,
    visible: updateBaseModalVisible,
    onCancel: () => {
      dispatch({
        type: 'agentManage/toggleModal',
        payload: { type: 'updateBase', data: {} },
      });
    },
  };
  const updateAttachModalProps = {
    width: 848,
    footer: null,
    title: commonMap.update,
    visible: updateAttachModalVisible,
    onCancel: () => {
      dispatch({
        type: 'agentManage/toggleModal',
        payload: { type: 'updateAttach', data: {} },
      });
    },
  };
  const updateBaseFormProps = {
    agtMobileChkMsg,
    agtEmailChkMsg,
    agtNameChkMsg,
    bizSaleList,
    data: updateFormData,
    submiting: updateFormSubmit,
    formBaseSubmit: (dat) => {
      dispatch({
        type: 'agentManage/updateBase',
        payload: { ...dat },
      });
    },
    validMobile(agtMobile) {
      dispatch({
        type: 'agentManage/validProps',
        payload: { agtMobile: agtMobile, currentPage: 1, type: '1', agtId: updateFormData.agtId },
      });
    },
    validEmail(agtEmail) {
      dispatch({
        type: 'agentManage/validProps',
        payload: { agtEmail: agtEmail, currentPage: 1, type: '2', agtId: updateFormData.agtId },
      });
    },
    validAgtName(agtName) {
      dispatch({
        type: 'agentManage/validProps',
        payload: { agtName: agtName, currentPage: 1, type: '3', agtId: updateFormData.agtId },
      });
    },
  };
  const updateAttachFormProps = {
    data: updateFormData,
    submiting: updateFormSubmit,
    formAttachSubmit: (dat) => {
      dispatch({
        type: 'agentManage/updateAttach',
        payload: { ...dat },
      });
    },
  };

  const updateAccFormProps = {
    subBankModalVisible,
    bankList,
    subBankList,
    data: updateFormData,
    submiting: updateFormSubmit,
    formAccSubmit: (dat) => {
      dispatch({
        type: 'agentManage/updateAcc',
        payload: { ...dat },
      });
    },
    querySubBanklist(tableParam) {
      dispatch({
        type: 'agentManage/querySubBanklist',
        payload: { tableParam },
      });
    },
    onCancelSubBankModel() {
      dispatch({
        type: 'agentManage/updateState',
        payload: { subBankModalVisible: false },
      });
    },
  };
  const updateAccModalProps = {
    width: 848,
    footer: null,
    title: commonMap.update,
    visible: updateAccModalVisible,
    onCancel: () => {
      dispatch({
        type: 'agentManage/toggleModal',
        payload: { type: 'updateAcc', data: {} },
      });
    },
  };
  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  // const UpdateFormGen = () => <PersonalMemberInfoForm {...updateFormProps} />;
    // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题

  return (
    <div>
      <Card {...cardProps}>
        <AgentQueryForm {...queryFormProps} />
        <AgentPageTable {...tableProps} />
      </Card>
      <Modal {...updateBaseModalProps}>
        <AgentUpdBaseInfoForm {...updateBaseFormProps} />
      </Modal>
      <Modal {...updateAttachModalProps}>
        <AgentUpdAttachInfoForm {...updateAttachFormProps} />
      </Modal>
      <Modal {...updateAccModalProps}>
        <AgentUpdAccInfoForm {...updateAccFormProps} />
      </Modal>
      <Modal {...infoModalProps}>
        <AgentInfoTable {...infoTableProps} />
      </Modal>
      <Modal {...attachInfoModalProps}>
        <Spin spinning={spinLoading}>
          <AgentAttachDetailInfoForm {...attachDetailFormProps} />
        </Spin>
      </Modal>
    </div>
  );
};

function mapStateToProps({ agentManage }) {
  return { agentManage };
}

export default connect(mapStateToProps)(AgentManage);
