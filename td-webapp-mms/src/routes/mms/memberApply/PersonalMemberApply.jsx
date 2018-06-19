import React from 'react';
import { connect } from 'dva';
import { Card, Steps } from 'antd';
import PersonalMemberStepForm1 from '../../../components/business/mms/personalMember/stepForm/PersonalMemberStepForm1';
import PersonalMemberStepForm2 from '../../../components/business/mms/personalMember/stepForm/PersonalMemberStepForm2';
import * as i18n from '../../../utils/i18n';

const PersonalMemberApply = ({ dispatch, personalMemberApply }) => {
  const bizMap = i18n.bizMap('mms/personalMember');
  const Step = Steps.Step;
  const { currentStep, submiting, form1Data, form2Data } = personalMemberApply;

  const cardProps = {
    title: bizMap.personalMemberApply,
    style: { width: '100%' },
  };

  const stepForm1Props = {
    style: { width: 848, margin: 'auto', marginTop: 24 },
    data: form1Data,
    nextClick(dat) {
      dispatch({
        type: 'personalMemberApply/updateState',
        payload: { currentStep: 1, form1Data: dat },
      });
    },
  };

  const stepForm2Props = {
    style: { width: 848, margin: 'auto', marginTop: 24 },
    submiting,
    data: form2Data,
    prevClick() {
      dispatch({
        type: 'personalMemberApply/updateState',
        payload: { currentStep: 0 },
      });
    },
    nextClick(dat) {
      dispatch({
        type: 'personalMemberApply/addOne',
        payload: { form2Data: dat },
      });
    },
  };

  const steps = [bizMap.baseInfo, bizMap.realInfo];
  let content = null;
  switch (currentStep) {
    case 0:
      content = (<PersonalMemberStepForm1 {...stepForm1Props} />);
      break;
    case 1:
      content = (<PersonalMemberStepForm2 {...stepForm2Props} />);
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

function mapStateToProps({ personalMemberApply }) {
  return { personalMemberApply };
}

export default connect(mapStateToProps)(PersonalMemberApply);
