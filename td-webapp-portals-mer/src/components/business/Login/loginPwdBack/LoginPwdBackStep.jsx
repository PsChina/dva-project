import React from 'react';
import PropTypes from 'prop-types';
import { Steps } from 'antd';
import LoginPwdBackStepForm1 from './LoginPwdBackStepForm1';
import LoginPwdBackStepForm2 from './LoginPwdBackStepForm2';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const Step = Steps.Step;
const bizMap = i18n.bizMap('login');

const LoginPwdBackStep = (props) => {
  const { current, sendCode, validCode, validLoading, prevClick, submitPwd, submitLoading, confirmDirty, confirmBlur } = props;
  const form1Props = {
    codeSend: sendCode,
    formSubmit: validCode,
    loading: validLoading,
  };
  const form2Props = {
    prevClick,
    formSubmit: submitPwd,
    loading: submitLoading,
    confirmDirty,
    confirmBlur,
  };
  return (
    <div>
      <Steps current={current}>
        <Step title={bizMap.typeVerCode} />
        <Step title={bizMap.setNewPassword} />
      </Steps>
      <div style={{ margin: 32, marginTop: 48 }}>
        {
          current === 0 ? <LoginPwdBackStepForm1 {...form1Props} /> : <LoginPwdBackStepForm2 {...form2Props} />
        }
      </div>
    </div>
  );
}

LoginPwdBackStep.propTypes = {
  current: PropTypes.number,
  sendCode: PropTypes.func,
  validCode: PropTypes.func,
  validLoading: PropTypes.bool,
  prevClick: PropTypes.func,
  submitPwd: PropTypes.func,
  submitLoading: PropTypes.bool,
  confirmDirty: PropTypes.bool,
  confirmBlur: PropTypes.func,
};

LoginPwdBackStep.defaultProps = {
  current: 0,
  sendCode: noop,
  validCode: noop,
  validLoading: false,
  prevClick: noop,
  submitPwd: noop,
  submitLoading: false,
  confirmDirty: false,
  confirmBlur: noop,
}

export default LoginPwdBackStep;
