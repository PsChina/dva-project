import React from 'react';
import { connect } from 'dva';
import { Card, Steps, Button, Row } from 'antd';
import AgentApplyStepForm1 from '../../../components/business/agtp/agent/stepFrom/AgentStepForm1';
import AgentApplyStepForm2 from '../../../components/business/agtp/agent/stepFrom/AgentStepForm2';
import AgentApplyStepForm3 from '../../../components/business/agtp/agent/stepFrom/AgentStepForm3';
import * as i18n from '../../../utils/i18n';

const AgentApply = ({ dispatch, agentApply }) => {
  const bizMap = i18n.bizMap('agtp/agent');
  const Step = Steps.Step;
  const { currentStep, submiting, form1Data, form2Data, form3Data, bankList, bizSaleList, agtNameChkMsg, agtMobileChkMsg, agtEmailChkMsg,
          subBankList, subBankModalVisible } = agentApply
  const cardProps = {
    title: bizMap.agentApply,
    style: { width: '100%' },
  };

  const stepForm1Props = {
    agtMobileChkMsg,
    agtEmailChkMsg,
    agtNameChkMsg,
    bizSaleList,
    style: { width: 848, margin: 'auto', marginTop: 24 },
    data: form1Data,
    nextClick(dat) {
      dispatch({
        type: 'agentApply/updateState',
        payload: { currentStep: 1, form1Data: dat },
      });
    },
    validMobile(agtMobile) {
      dispatch({
        type: 'agentApply/validProps',
        payload: { agtMobile: agtMobile, currentPage: 1, type: '1' },
      });
    },
    validEmail(agtEmail) {
      dispatch({
        type: 'agentApply/validProps',
        payload: { agtEmail: agtEmail, currentPage: 1, type: '2' },
      });
    },
    validAgtName(agtName) {
      dispatch({
        type: 'agentApply/validProps',
        payload: { agtName: agtName, currentPage: 1, type: '3' },
      });
    },
  };
  const stepForm2Props = {
    subBankModalVisible,
    bankList,
    subBankList,
    style: { width: 848, margin: 'auto', marginTop: 24 },
    data: form2Data,
    prevClick() {
      dispatch({
        type: 'agentApply/updateState',
        payload: { currentStep: 0 },
      });
    },
    nextClick(dat) {
      dispatch({
        type: 'agentApply/updateState',
        payload: { currentStep: 2, form2Data: dat },
      });
    },
    querySubBanklist(tableParam) {
      dispatch({
        type: 'agentApply/querySubBanklist',
        payload: { tableParam },
      });
    },
    onCancelSubBankModel() {
      dispatch({
        type: 'agentApply/updateState',
        payload: { subBankModalVisible: false },
      });
    },
  };
  // 提交申请后返回申请首页
  const backToIndx = () => {
    dispatch({
      type: 'agentApply/updateState',
      payload: { currentStep: 0, form1Data: {}, form2Data: {}, form3Data: {} },
    });
  };
  const applyComponents = [
    <Row key="button">
      <Button onClick={backToIndx} id="backToIndx" style={{ display: 'none' }}>{}</Button>
    </Row>,
  ];
  const stepForm3Props = {
    applyComponents,
    form1Data,
    style: { width: 848, margin: 'auto', marginTop: 24 },
    submiting,
    data: form3Data,
    prevClick() {
      dispatch({
        type: 'agentApply/updateState',
        payload: { currentStep: 1 },
      });
    },
    nextClick(dat) {
      dispatch({
        type: 'agentApply/addOne',
        payload: { form3Data: dat, submiting: true },
      });
    },
  };
  const steps = [bizMap.baseInfo, bizMap.accInfo, bizMap.attachInfo];
  let content = null;
  switch (currentStep) {
    case 0:
      content = (<AgentApplyStepForm1 {...stepForm1Props} />);
      break;
    case 1:
      content = (<AgentApplyStepForm2 {...stepForm2Props} />);
      break;
    case 2:
      content = (<AgentApplyStepForm3 {...stepForm3Props} />);
      break;
    default:
      content = null;
      break;
  }
  return (
    <Card {...cardProps}>
      <Steps current={currentStep}>
        {steps.map((item, i) => <Step key={i} title={item} />)}
      </Steps>
      {content}
    </Card>
  );
};

function mapStateToProps({ agentApply }) {
  return { agentApply };
}

export default connect(mapStateToProps)(AgentApply);
