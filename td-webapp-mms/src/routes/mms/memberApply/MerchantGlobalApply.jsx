import React from 'react';
import { connect } from 'dva';
import { Card, Steps, Button, Row } from 'antd';
import MerchantGlobalStepForm1 from '../../../components/business/mms/merchant/stepForm/MerchantGlobalStepForm1';
import MerchantGlobalStepForm2 from '../../../components/business/mms/merchant/stepForm/MerchantGlobalStepForm2';
import MerchantGlobalStepForm3 from '../../../components/business/mms/merchant/stepForm/MerchantGlobalStepForm3';
import * as i18n from '../../../utils/i18n';

const MerchantGlobalApply = ({ dispatch, merchantGlobalApply }) => {
  const bizMap = i18n.bizMap('mms/merchant');
  const Step = Steps.Step;
  const { currentStep, submiting, form1Data, form2Data, form3Data, agentData,
     subBankList, agentModalVisible, subBankModalVisible, bankList, bizSaleList } = merchantGlobalApply;

  let merArea = ''; 

  if (form1Data !== null && form1Data.merArea !== undefined) {
    merArea = form1Data.merArea.split(',');
  }

  const cardProps = {
    title: bizMap.merchantGlobalApply,
    style: { width: '100%' },
  };

  const stepForm1Props = {
    bizSaleList,
    agentData,
    agentModalVisible,
    style: { width: 940, margin: 'auto', marginTop: 24 },
    data: form1Data,
    nextClick(dat) {
      dispatch({
        type: 'merchantGlobalApply/updateState',
        payload: { currentStep: 1, form1Data: dat },
      });
    },
    queryAgentList(tableParam) {
      dispatch({
        type: 'merchantGlobalApply/queryAgentList',
        payload: { tableParam },
      });
    },
    onCancelAgentModel() {
      dispatch({
        type: 'merchantGlobalApply/updateState',
        payload: { agentModalVisible: false },
      });
    },
  };

  const stepForm2Props = {
    subBankModalVisible,
    subBankList,
    bankList,
    merArea,
    style: { width: 940, margin: 'auto', marginTop: 24 },
    submiting,
    data: form2Data,
    prevClick() {
      dispatch({
        type: 'merchantGlobalApply/updateState',
        payload: { currentStep: 0 },
      });
    },
    nextClick(dat) {
      dispatch({
        type: 'merchantGlobalApply/updateState',
        payload: { currentStep: 2, form2Data: dat },
      });
    },
    querySubBanklist(tableParam) {
      dispatch({
        type: 'merchantGlobalApply/querySubBanklist',
        payload: { tableParam },
      });
    },
    onCancelSubBankModel() {
      dispatch({
        type: 'merchantGlobalApply/updateState',
        payload: { subBankModalVisible: false },
      });
    },
  };
  // 提交申请后返回申请首页
  const backToIndx = () => {
    dispatch({
      type: 'merchantGlobalApply/updateState',
      payload: { currentStep: 0, form1Data: {}, form2Data: {}, form3Data: {} },
    });
  };
  const applyComponents = [
    <Row key="button">
      <Button onClick={backToIndx} id="backToMerIndx" style={{ display: 'none' }}>{}</Button>
    </Row>,
  ];
  const stepForm3Props = {
    applyComponents,
    merArea,
    style: { width: 940, margin: 'auto', marginTop: 24 },
    submiting,
    data: form3Data,
    prevClick() {
      dispatch({
        type: 'merchantGlobalApply/updateState',
        payload: { currentStep: 1 },
      });
    },
    nextClick(dat) {
      dispatch({
        type: 'merchantGlobalApply/addOne',
        payload: { form3Data: dat },
      });
    },
  };

  const steps = [bizMap.merBaseInfo, bizMap.merBankInfo, bizMap.merAttachInfo];
  let content = null;
  switch (currentStep) {
    case 0:
      content = (<MerchantGlobalStepForm1 {...stepForm1Props} />);
      break;
    case 1:
      content = (<MerchantGlobalStepForm2 {...stepForm2Props} />);
      break;
    case 2:
      content = (<MerchantGlobalStepForm3 {...stepForm3Props} />);
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
      { content }
    </Card>
  );
};

function mapStateToProps({ merchantGlobalApply }) {
  return { merchantGlobalApply };
}

export default connect(mapStateToProps)(MerchantGlobalApply);
