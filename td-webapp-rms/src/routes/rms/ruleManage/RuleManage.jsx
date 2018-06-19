import React from 'react';
import { connect } from 'dva';
import { Card, Row, Col, Modal } from 'antd';
import RuleQueryForm from '../../../components/business/rms/rule/RuleQueryForm';
import WarnRuleTempQueryForm from '../../../components/business/rms/rule/RuleTempQueryForm';
import RuleInfoPageTable from '../../../components/business/rms/rule/RuleInfoPageTable';
import GroupInfoForm from '../../../components/business/rms/rule/GroupInfoForm';
import AddRuleForm from '../../../components/business/rms/rule/AddRuleForm';
import ModifyRuleForm from '../../../components/business/rms/rule/ModifyRuleForm';
import RuleInfoForm from '../../../components/business/rms/rule/RuleInfoForm';
import RulePageTable from '../../../components/business/rms/rule/RulePageTable';
import * as i18n from '../../../utils/i18n';
import { callNotice, callConfirm } from '../../../utils/alert';


const RuleManage = ({ dispatch, ruleManage }) => {
  const bizMap = i18n.bizMap('rms/warnRule');
  const commonMap = i18n.commonMap();
  const { tableList, tableLoading, tableTotal, ruleDesc, tableParam, loading, tableDetailList, tableDetailTotal, tableCurrentPage, configModalVisible,
   addModalVisible, tmpId, tmpType, tableRuleSelects, tableRuleParam,
   updataModalVisible, updataList, warnGroupList, ruleGropModalVisible, updateloading,
   warnGroupRuleId, warnGroupRuleType, tableRuleCurrentPage, infoTmpId, addTmpId, addTmpType,
   tableRuleLoading, warnGrps, ruleWarnType, addTmpName, infoTmpName, grpRuleId, messageList } = ruleManage;
  const selectIds = [];
  for (let i = 0; i < tableRuleSelects.length; i++) {
    selectIds.push(tableRuleSelects[i].ruleId);
  }
  const cardProps = {
    title: bizMap.ruleTempManage,
  };
  const cardRuleProps = {
    title: bizMap.ruleTitle,
  };
  const queryRuleFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'ruleManage/queryList',
        payload: { ...dat, tableParam: { ...dat, currentPage: 1 } },
      });
    },
  }


  let Ttype = '';
  switch (addTmpType || tmpType) {
    case '0':
      Ttype = bizMap['tmpType-0'];
      break;
    case '1':
      Ttype = bizMap['tmpType-1'];
      break;
    case '2':
      Ttype = bizMap['tmpType-2'];
      break;
    case '3':
      Ttype = bizMap['tmpType-3'];
      break;
    default:
      Ttype = '';
  }

  //配置消息
  const RuleInfoModalProps = {
    footer: null,
    title: commonMap.configMes,
    visible: configModalVisible,
    onCancel: () => {
      dispatch({
        type: 'ruleManage/toggleModal',
        payload: { type: 'config', data: {}, messageList: messageList },
      });
    },
  };
  const ruleInfoProps = {
    infoTmpId,
    infoTmpName,
    messageList,
    formSubmit: (dat) => {
      dispatch({
        type: 'ruleManage/configMess',
        payload: { ...dat },
      });
    },
  }
  const addRule = {
    footer: null,
    title: commonMap.addRule,
    visible: addModalVisible,
    width: 700,
    onCancel: () => {
      dispatch({
        type: 'ruleManage/toggleModal',
        payload: { type: 'add', data: {} },
      });
    },
  }
  const updataRule = {
    footer: null,
    title: commonMap.updataRule,
    visible: updataModalVisible,
    width: 700,
    onCancel: () => {
      dispatch({
        type: 'ruleManage/toggleModal',
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
        type: 'ruleManage/toggleModal',
        payload: { type: 'group', data: {} },
      });
    },
  }

// 启用 & 禁用
  const RuleFormProps = {
    enableClick: () => {
      if (tableRuleSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        const ruleStatus = tableRuleSelects[0].ruleStatus;
        for (let i = 0; i < tableRuleSelects.length; i++) {
          if (ruleStatus !== tableRuleSelects[i].ruleStatus) {
            callNotice(commonMap.warning, bizMap.statusNotMatch, 'warning');
            return;
          }
          if (tableRuleSelects[i].ruleStatus !== '1' && tableRuleSelects[i].ruleStatus !== '2') {
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
            type: 'ruleManage/updateStatus',
            payload: { ruleId: selectIds.toString(), ruleStatus: '1' },
          });
        });
      }
    },
    disableClick: () => {
      if (tableRuleSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        const ruleStatus = tableRuleSelects[0].ruleStatus;
        for (let i = 0; i < tableRuleSelects.length; i++) {
          if (ruleStatus !== tableRuleSelects[i].ruleStatus) {
            callNotice(commonMap.warning, bizMap.statusNotMatch, 'warning');
            return;
          }        
          if (tableRuleSelects[i].ruleStatus !== '1' && tableRuleSelects[i].ruleStatus !== '2') {
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
            type: 'ruleManage/updateStatus',
            payload: { ruleId: selectIds.toString(), ruleStatus: '2' },
          });
        });
      }
    },
  }
  const addFormProps = {
    addTmpName,
    addTmpId,
    loading,
    formSubmit: (dat) => {
      dispatch({
        type: 'ruleManage/addOne',
        payload: { ...dat, tmpId: dat.tmpId },
      });
    },
  }
  // 修改
  const updataFormProps = {
    data: updataList,
    ruleDesc,
    updateloading,
    formSubmit: (dat) => {
      dispatch({
        type: 'ruleManage/updateOne',
        payload: { ...dat, ruleId: dat.ruleId },
      });
    },
  }
  // 配置预警组
  const RuleGropFormProps = {
    loading,
    grpRuleId,
    ruleWarnType,
    warnGrps: warnGrps,
    ruleId: warnGroupRuleId,
    ruleType: warnGroupRuleType,
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
        type: 'ruleManage/addWarnGroup',
        payload: { ...dat, ruleWarnGrp: ruleWarnGrp },
      });
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
        type: 'ruleManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'ruleManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleAddClick(record) {
      dispatch({
        type: 'ruleManage/toggleModal',
        payload: { type: 'add', addTmpId: record.tmpId, addTmpType: record.tmpType, addTmpName: record.tmpName },
      });
    },
    handleInfoClick(record) {
      dispatch({
        type: 'ruleManage/queryMessages',
        payload: { infoTmpId: record.tmpId, infoTmpName: record.tmpName },
      });
      // dispatch({
      //   type: 'ruleManage/toggleModal',
      //   payload: { type: 'config', infoTmpId: record.tmpId, infoTmpName: record.tmpName },
      // });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'ruleManage/ruleDetail',
        payload: { tableRuleParam: { ...tableRuleParam, tmpId: record.tmpId, tmpType: record.tmpType } },
      });
    },
  };
  const tableDetailProps = {
    tmpId: tmpId,
    tmpType: tmpType,
    tableLoading: tableRuleLoading,
    tableList: tableDetailList,
    tableTotal: tableDetailTotal,
    tableCurrentPage: tableRuleCurrentPage,
    handleUpdataClick(record) {
      dispatch({
        type: 'ruleManage/toggleModal',
        payload: { type: 'updata', data: record },
      });
    },
    handleGropClick(record) {
      dispatch({
        type: 'ruleManage/toggleModal',
        payload: { type: 'group', warnGrps: record.ruleWarnGrp, ruleWarnType: record.ruleWarnType, grpRuleId: record.ruleId },
      });
    },
    tablePageChange(next) {
      dispatch({
        type: 'ruleManage/ruleDetail',
        payload: { tableRuleParam: { ...tableRuleParam, currentPage: next, tmpId: tmpId, tmpType: tmpType } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'ruleManage/updateState',
        payload: { tableRuleSelects: selectedRows },
      });
    },
  };
  const styleM = { marginTop: '-36px', width: '200px', position: 'absolute' };
  const AddOneRuleForm = () => <AddRuleForm {...addFormProps} />;
  const ModifyOneRuleForm = () => <ModifyRuleForm {...updataFormProps} />;
  return (
    <Row gutter={16}>
      <Col sm={24} md={12}>
        <Card {...cardProps}>
          <WarnRuleTempQueryForm {...queryRuleFormProps} />
          <RulePageTable {...tableProps} />
          <Modal {...RuleInfoModalProps}>
            <RuleInfoForm {...ruleInfoProps} />
          </Modal>
          <Modal {...addRule}>
            <AddOneRuleForm />
          </Modal>
        </Card>
      </Col>
      <Col sm={24} md={12}>
        <Card {...cardRuleProps}>
          <RuleQueryForm {...RuleFormProps} />
          <RuleInfoPageTable {...tableDetailProps} />
          <Modal {...updataRule}>
            <ModifyOneRuleForm />
          </Modal>
          <Modal {...configRuleGrop}>
            <GroupInfoForm {...RuleGropFormProps} />
          </Modal>
          <span style={styleM}>{bizMap.tmpId} {tmpId || addTmpId} {bizMap.tmpType} {Ttype} </span>
        </Card>
      </Col>
    </Row>
  );
};

function mapStateToProps({ ruleManage }) {
  return { ruleManage };
}

export default connect(mapStateToProps)(RuleManage);
