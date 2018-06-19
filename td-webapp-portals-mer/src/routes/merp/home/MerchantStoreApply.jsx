import React from 'react';
import { connect } from 'dva';
import { Card, Steps } from 'antd';
import MerchantStoreStepForm1 from '../../../components/business/merp/merchantStore/stepForm/MerchantStoreStepForm1';
import MerchantStoreStepForm2 from '../../../components/business/merp/merchantStore/stepForm/MerchantStoreStepForm2';
import * as i18n from '../../../utils/i18n';

const MerchantStoreApply = ({ dispatch, merchantStoreApply }) => {
  const bizMap = i18n.bizMap('merp/merchantStore');
  const Step = Steps.Step;
  const { currentStep, submiting, form1Data, form2Data, storeTotal } = merchantStoreApply;

  const cardProps = {
    title: bizMap.merchantStoreApply,
    style: { width: '100%' },
  };

  const stepForm1Props = {
    storeTotal,
    style: { width: 848, margin: 'auto', marginTop: 24 },
    data: form1Data,
    nextClick(dat) {
      dispatch({
        type: 'merchantStoreApply/queryStoreTotal',
        payload: { merId: dat.merId, dat: dat },
      });
    },
  };

  const stepForm2Props = {
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
        payload: { form2Data: dat },
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
