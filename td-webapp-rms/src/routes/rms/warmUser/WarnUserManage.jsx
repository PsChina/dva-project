import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import PageTable from '../../../components/common/PageTable';
import WarnUserQueryForm from '../../../components/business/rms/WarmUser/WarnUserQueryForm';
import WarnUserInfoForm from '../../../components/business/rms/WarmUser/WarnUserInfoForm';
import DetailUserProps from '../../../components/business/rms/WarmUser/WarnUserDetailForm';
import ConfigWarnGroup from '../../../components/business/rms/WarmUser/ConfigWarnGroupForm';

import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const WarnUserManage = ({ dispatch, warnUserManage }) => {
  const bizMap = i18n.bizMap('rms/warnUser');
  const commonMap = i18n.commonMap();
  const { advExpand, tableParam, tableLoading, tableList, tableTotal, tableSelects, orgDataList, agentList, updateGroupList, org, addKey,
    addModalVisible, updateModalVisible, detailModalVisible, modalFormData, updateFormSubmit, addFormSubmit, orgType,
    configModalVisible, detailDataList, headquartersGroupList, branchOfficeGroupList, agentGroupList, userId, addFormData,staffId,ordType,
    miniFormTableParam, miniFormTableLoading, miniFormTableList, miniFormTableTotal, miniFormTableCurrentPage, miniFormVisible, agentUserList
  } = warnUserManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    selectIds.push(tableSelects[i].staffId);
  }
  const cardProps = {
    title: bizMap.warnUserTitle,
    style: { width: '100%' },
  };
  // 查询表单相关属性
  const queryFormProps = {
    advExpand,
    collapseClick: () => {
      dispatch({
        type: 'warnUserManage/toggleAdvExpand',
      });
    },
    formSubmit: (dat) => {
      dispatch({
        type: 'warnUserManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1, requestType: 'table' } },
      });
    },
    addClick: () => {
      dispatch({
        type: 'warnUserManage/toggleModal',
        payload: { type: 'add' },
      });
    },
    deleteClick: () => {
      console.log('444444',selectIds.toString())
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        callConfirm(commonMap.tip, commonMap.deleteConfirm, () => {
          dispatch({
            type: 'warnUserManage/deleteList',
            payload: { ids: selectIds.toString() },
          });
        });
      }
    },
    enableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        callConfirm(commonMap.tip, commonMap.enableConfirm, () => {
          dispatch({
            type: 'warnUserManage/updateStatus',
            payload: { ids: selectIds.toString(), status: 1 },
          });
        });
      }
    },
    disableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        callConfirm(commonMap.tip, commonMap.disableConfirm, () => {
          dispatch({
            type: 'warnUserManage/updateStatus',
            payload: { ids: selectIds.toString(), status: 0 },
          });
        });
      }
    },
  };
  // 表格相关属性
  const handleDetailClick = (record) => {
    dispatch({
      type: 'warnUserManage/toggleModal',
      payload: { type: 'detail', data: record },
    });
  };
  const handleUpdateClick = (record) => {
    dispatch({
      type: 'warnUserManage/toggleModal',
      payload: { type: 'update', data: record },
    });
  };
  const handleConfigClick = (record) => {
    dispatch({
      type: 'warnUserManage/configWarnGroup',
      payload: { type: 'config', userId: record.userId, orgType: record.orgType },
    });
  }
  const tableProps = {
    rowKey: record => record.staffId,
    tableColumns: [
      { title: bizMap.staffId, dataIndex: 'staffId' },
      { title: bizMap.staffName, dataIndex: 'staffName' },
      {
        title: bizMap.staffOrgType,
        dataIndex: 'staffOrgType',
        render(text) {
          return bizMap[`orgType-${text}`];
        },
      },
      { title: bizMap.staffPhone, dataIndex: 'staffPhone' },
      { title: bizMap.staffWechat, dataIndex: 'staffWechat' },
      {
        title: bizMap.staffFrom,
        dataIndex: 'staffFrom',
        render(text) {
          return bizMap[`userSrc-${text}`];
        },
      },
      {
        title: commonMap.action,
        render(text, record) {
          return (
            <span>
              {/*<a onClick={() => { handleDetailClick(record); }}>{commonMap.detail}</a>
              <span className="ant-divider" />*/}
              <a onClick={() => { handleUpdateClick(record); }}>{commonMap.update}</a>
              {/*<span className="ant-divider" />
              <a onClick={() => { handleConfigClick(record); }}>{commonMap.configWarnGroup}</a>*/}
            </span>
          );
        },
      },
    ],
    tableList,
    tableLoading,
    tableTotal,
    tablePageChange(next) {
      dispatch({
        type: 'warnUserManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'warnUserManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
  };
  // 添加模态框及表单相关属性
  const addFormProps = {
    miniFormVisible,
    tableList: miniFormTableList,
    tableLoading: miniFormTableLoading,
    tableTotal: miniFormTableTotal,
    tableCurrentPage: miniFormTableCurrentPage,
    orgDataList,
    agentUserList: agentUserList,
    data: addFormData,
    org: org,
    submiting: addFormSubmit,
    stateClickCallback(data) {
      const dat = addFormData;
      dat.staffId = '';
      dat.staffName = '';
      dat.staffPhone = '';
      dat.staffEmail = '';
      dat.staffOrgId = '';
      dat.staffWechat = '';
    },
      handleOnChange: (value) => {
        dispatch({
          type: 'warnUserManage/updateFormOrgTypeAdd',
          payload: { orgType: value, type: 'add' },
        }); if (value === '01') {
          dispatch({
            type: 'warnUserManage/queryUserList',
            payload: { miniFormTableParam: { currentPage: 1 } },
          });
        }
      },
    formSubmit: (dat) => {
      dispatch({
        type: 'warnUserManage/addOne',
        payload: { ...dat },
      });
    },
    tablePageChange(next) {
      dispatch({
        type: 'warnUserManage/queryUserList',
        payload: { miniFormTableParam: { ...miniFormTableParam, currentPage: next } },
      });
    },
    rowClickCallback(data) {
      const dat = addFormData;
      dat.staffId = data.staffId;
      dat.staffName = data.staffName;
      dat.staffPhone = data.staffPhone;
      dat.staffEmail = data.staffEmail;
      dispatch({
        type: 'warnUserManage/toggleModal',
        payload: { type: 'user', data: addFormData },
      });
    },
    toggleMerTable(formData) {
      dispatch({
        type: 'warnUserManage/toggleModal',
        payload: { type: 'user', data: formData },
      });
    },
    queryUserList(dat) {
      dispatch({
        type: 'warnUserManage/queryUserList',
        payload: { miniFormTableParam: { ...dat, currentPage: 1 } },
      });
    },
    handleAgtChange: (value) => {
      console.log("1111111111", value)
      dispatch({
        type: 'warnUserManage/queryAgtList',
        payload: { miniFormTableParam: { agtId: value, currentPage: 1 } },
      });
    },
    popoverOncancel() {
      dispatch({
        type: 'warnUserManage/updateState',
        payload: { miniFormVisible: false },
      });
    },
  };
  const addModalProps = {
    footer: null,
    key: addKey,
    title: commonMap.add,
    visible: addModalVisible,
    onCancel: () => {
      dispatch({
        type: 'warnUserManage/toggleModal',
        payload: { type: 'add' },
      });
    },
  };
  const detailDataForm = {
    data: detailDataList,
  }
  const configWarnGroupProps = {
    orgType: orgType,
    headquartersGroupList: headquartersGroupList,
    branchOfficeGroupList: branchOfficeGroupList,
    agentGroupList: agentGroupList,
    updateGroupList: updateGroupList,
    formSubmit: (dat) => {
      const groupData = dat.groupIds;
      let str = '';
      for (let i = 0; i < groupData.length; i++) {
        str += `${groupData[i]},`;
      }
      const reg = /,$/gi;
      str = str.replace(reg, '');
      dispatch({
        type: 'warnUserManage/updateWarnGroup',
        payload: { ...dat, userId: userId, groupIds: str },
      });
    },
  }
  const detailModalProps = {
    footer: null,
    title: commonMap.detail,
    visible: detailModalVisible,
    onCancel: () => {
      dispatch({
        type: 'warnUserManage/toggleModal',
        payload: { type: 'detail' },
      });
    },
  };
  const configModalProps = {
    footer: null,
    title: commonMap.configWarnGroup,
    visible: configModalVisible,
    onCancel: () => {
      dispatch({
        type: 'warnUserManage/toggleModal',
        payload: { type: 'config' },
      });
    },
  }

  // 更新模态框及表单相关属性
  const updateFormProps = {
    orgDataList,
    agentUserList,
    ordType : '2',
    submiting: updateFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'warnUserManage/updateOne',
        payload: { ...dat },
      });
    },
    handleOnChange: (value) => {
      dispatch({
        type: 'warnUserManage/updateFormOrgType',
        payload: { orgType: value, type: 'update' },
      });
    },
    data: modalFormData,
  };
  const updateModalProps = {
    footer: null,
    title: commonMap.update,
    visible: updateModalVisible,
    onCancel: () => {
      dispatch({
        type: 'warnUserManage/toggleModal',
        payload: { type: 'update', data: {} },
      });
    },
  };
  // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  const UpdateFormGen = () => <WarnUserInfoForm {...updateFormProps} />;
  const ConfigWarnGroups = () => <ConfigWarnGroup {...configWarnGroupProps} />;
  //const ConfigWarnGroupsAdd = () => <WarnUserInfoForm {...addFormProps} />;


  return (
    <Card {...cardProps}>
      <WarnUserQueryForm {...queryFormProps} />
      <PageTable {...tableProps} />
      <Modal {...addModalProps}>
        <WarnUserInfoForm {...addFormProps} />
      </Modal>
      <Modal {...updateModalProps}>
        <UpdateFormGen />
      </Modal>
      <Modal {...detailModalProps}>
        <DetailUserProps {...detailDataForm} />
      </Modal>
      <Modal {...configModalProps}>
        <ConfigWarnGroups />
      </Modal>
    </Card>
  );
};

function mapStateToProps({ warnUserManage }) {
  return { warnUserManage };
}

export default connect(mapStateToProps)(WarnUserManage);
