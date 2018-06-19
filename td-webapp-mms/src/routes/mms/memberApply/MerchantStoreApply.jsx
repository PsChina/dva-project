import React from 'react';
import { connect } from 'dva';
import { Card, Steps, Row, Button } from 'antd';
import MerchantStoreStepForm1 from '../../../components/business/mms/merchantStore/stepForm/MerchantStoreStepForm1';
import MerchantStoreStepForm2 from '../../../components/business/mms/merchantStore/stepForm/MerchantStoreStepForm2';
import * as i18n from '../../../utils/i18n';

const MerchantStoreApply = ({ dispatch, merchantStoreApply }) => {
  const bizMap = i18n.bizMap('mms/merchantStore');
  const Step = Steps.Step;
  const { currentStep, submiting, form1Data, form2Data, merchantData, merInfoModalVisible, storeTotal } = merchantStoreApply;

  const cardProps = {
    title: bizMap.merchantStoreApply,
    style: { width: '100%' },
  };

  const stepForm1Props = {
    storeTotal,
    merchantData,
    merInfoModalVisible,
    style: { width: 848, margin: 'auto', marginTop: 24 },
    data: form1Data,
    nextClick(dat) {
      console.log('++++++++++merId:dat+++++++++++++++++++');
      console.log(dat.merId);
      dispatch({
        type: 'merchantStoreApply/queryStoreTotal',
        payload: { merId: dat.merId, dat: dat },
      });
    },
    queryMerList(tableParam) {
      dispatch({
        type: 'merchantStoreApply/queryMerchantList',
        payload: { tableParam },
      });
    },
    onCancelMerModel() {
      dispatch({
        type: 'merchantStoreApply/updateState',
        payload: { merInfoModalVisible: false },
      });
    },
  };
  const backToIndx = () => {
    dispatch({
      type: 'merchantStoreApply/updateState',
      payload: { currentStep: 1, form1Data: {}, form2Data: {} },
    });
  };
  const applyComponents = [//提交完成后返回第一步
    <Row key="button">
      <Button onClick={backToIndx} id="backToMerStoreIndx" style={{ display: 'none' }}>{}</Button>
    </Row>,
  ];
  const stepForm2Props = {
    applyComponents,
    style: { width: 848, margin: 'auto', marginTop: 24 },
    submiting,
    data: form2Data,
    prevClick() {
      dispatch({
        type: 'merchantStoreApply/updateState',
        payload: { currentStep: 1 },
      });
    },
    nextClick(dat) {
      dispatch({
        type: 'merchantStoreApply/addOne',
        payload: { form2Data: dat , submiting: true },
      });
    },
  };
  const steps = [bizMap.baseInfo, bizMap.realInfo];
  let content = null;
  switch (currentStep) {
    case 1:
      content = (<MerchantStoreStepForm1 {...stepForm1Props} />);
      break;
    case 2:
      content = (<MerchantStoreStepForm2 {...stepForm2Props} />);
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

function mapStateToProps({ merchantStoreApply }) {
  return { merchantStoreApply };
}

export default connect(mapStateToProps)(MerchantStoreApply);
