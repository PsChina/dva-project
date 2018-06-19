import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import RuleMessQueryForm from '../../../components/business/rms/ruleMess/RuleMessQueryForm';
import RuleMessPageTable from '../../../components/business/rms/ruleMess/RuleMessPageTable';
import GroupInfoForm from '../../../components/business/rms/rule/GroupInfoForm';
import ModifyRuleForm from '../../../components/business/rms/rule/ModifyRuleForm';
import * as i18n from '../../../utils/i18n';
import { callNotice, callConfirm } from '../../../utils/alert';


const RuleMessageManage = ({ dispatch, ruleMessageManage }) => {
  const bizMap = i18n.bizMap('rms/warnRule');
  const commonMap = i18n.commonMap();
  const { tableList, tableLoading, tableTotal, ruleDesc, tableParam, loading,
    tableCurrentPage, tableSelects,
   updataModalVisible, updataList, warnGroupList, ruleGropModalVisible, grpRuleId,
   warnGroupRuleId, warnGroupRuleType, ruleWarnType,
   warnGrps } = ruleMessageManage;

  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    selectIds.push(tableSelects[i].ruleId);
  }
  const cardRuleProps = {
    title: bizMap.ruleMesTitle,
  };

  //配置消息
  const updataRule = {
    footer: null,
    title: commonMap.updataRule,
    visible: updataModalVisible,
    width: 700,
    onCancel: () => {
      dispatch({
        type: 'ruleMessageManage/toggleModal',
        payload: { type: 'updata', data: {} },
      });
    },
  }
  const configRuleGrop = {
    footer: null,
    title: commonMap.confRuleGrop,
    visible: ruleGropModalVisible,
    width: 700,
    onCancel: () => {
      dispatch({
        type: 'ruleMessageManage/toggleModal',
        payload: { type: 'group', data: {} },
      });
    },
  }

// 启用 & 禁用
  const RuleFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'ruleMessageManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    enableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        const ruleStatus = tableSelects[0].ruleStatus;
        for (let i = 0; i < tableSelects.length; i++) {
          if (ruleStatus !== tableSelects[i].ruleStatus) {
            callNotice(commonMap.warning, bizMap.statusNotMatch, 'warning');
            return;
          }
          if (tableSelects[i].ruleStatus !== '1' && tableSelects[i].ruleStatus !== '2') {
            callNotice(commonMap.warning, bizMap.programErr, 'warning');
            return;
          }
        }
        if (ruleStatus === '1') {
          callNotice(commonMap.warning, commonMap.enaleNotice, 'warning');
          return;
        }
        callConfirm(commonMap.tip, commonMap.enableConfirm, () => {
          dispatch({
            type: 'ruleMessageManage/updateStatus',
            payload: { ruleId: selectIds.toString(), ruleStatus: '1' },
          });
        });
      }
    },
    disableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        const ruleStatus = tableSelects[0].ruleStatus;
        for (let i = 0; i < tableSelects.length; i++) {
          if (ruleStatus !== tableSelects[i].ruleStatus) {
            callNotice(commonMap.warning, bizMap.statusNotMatch, 'warning');
            return;
          }
          if (tableSelects[i].ruleStatus !== '1' && tableSelects[i].ruleStatus !== '2') {
            callNotice(commonMap.warning, bizMap.programErr, 'warning');
            return;
          }
        }
        if (ruleStatus === '2') {
          callNotice(commonMap.warning, commonMap.disableNotice, 'warning');
          return;
        }
        callConfirm(commonMap.tip, commonMap.disableConfirm, () => {
          dispatch({
            type: 'ruleMessageManage/updateStatus',
            payload: { ruleId: selectIds.toString(), ruleStatus: '2' },
          });
        });
      }
    },
  }

  // 修改
  const updataFormProps = {
    data: updataList,
    loading,
    ruleDesc,
    formSubmit: (dat) => {
      dispatch({
        type: 'ruleMessageManage/updateOne',
        payload: { ...dat, ruleId: dat.ruleId },
      });
    },
  }
  // 配置预警组
  const RuleGropFormProps = {
    // submiting: addWarnGroupFormSubmit,
    warnGrps: warnGrps,
    loading,
    ruleWarnType,
    grpRuleId,
    ruleId: warnGroupRuleId,
    ruleType: warnGroupRuleType,
    // ruleGroupList: warnGroupList,
    warnGroupList: warnGroupList,

    formSubmit: (dat) => {
      const grp1 = dat.group01;
      const grp2 = dat.group02;
      let txt1 = '';
      let txt2 = '';
      for (let i = 0; i < grp1.length; i++) {
        txt1 += `${grp1[i]}|01,`;
      }
      for (let i = 0; i < grp2.length; i++) {
        txt2 += `${grp2[i]}|02,`;
      }
      let ruleWarnGrp = txt1 + txt2;
      const reg = /,$/gi
      ruleWarnGrp = ruleWarnGrp.replace(reg, '');
      dispatch({
        type: 'ruleMessageManage/addWarnGroup',
        payload: { ...dat, ruleWarnGrp: ruleWarnGrp },
      });
    },
  };
  const tableProps = {
    tableLoading,
    tableList,
    tableTotal,
    tableCurrentPage,
    handleUpdataClick(record) {
      dispatch({
        type: 'ruleMessageManage/toggleModal',
        payload: { type: 'updata', data: record },
      });
    },
    handleGropClick(record) {
      dispatch({
        type: 'ruleMessageManage/toggleModal',
        payload: { type: 'group', warnGrps: record.ruleWarnGrp, ruleWarnType: record.ruleWarnType, grpRuleId: record.ruleId },
      });
    },
    tablePageChange(next) {
      dispatch({
        type: 'ruleMessageManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'ruleMessageManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
  };
  const ModifyOneRuleForm = () => <ModifyRuleForm {...updataFormProps} />;

  return (
    <Card {...cardRuleProps}>
      <RuleMessQueryForm {...RuleFormProps} />
      <RuleMessPageTable {...tableProps} />
      <Modal {...updataRule}>
        <ModifyOneRuleForm />
      </Modal>
      <Modal {...configRuleGrop}>
        <GroupInfoForm {...RuleGropFormProps} />
      </Modal>
    </Card>
  );
};

function mapStateToProps({ ruleMessageManage }) {
  return { ruleMessageManage };
}

export default connect(mapStateToProps)(RuleMessageManage);
