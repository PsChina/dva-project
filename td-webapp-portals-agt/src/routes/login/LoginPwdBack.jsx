import React from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import LoginFooter from '../../components/business/Login/LoginFooter';
import LoginHeader from '../../components/business/Login/LoginHeader';
import LoginPwdBackStep from '../../components/business/Login/loginPwdBack/LoginPwdBackStep';
import styles from './Login.less';

/**
 * LoginPwdBack 登录密码找回
 */
const LoginPwdBack = ({ dispatch, loginPwdBack }) => {
  const { currentStep, validLoading, submitLoading, checkInvalid } = loginPwdBack;
  const stepProps = {
    current: currentStep,
    validLoading,
    submitLoading,
    sendCode(name) {
      dispatch({
        type: 'loginPwdBack/sendCode',
        payload: { name },
      });
    },
    validCode(dat) {
      dispatch({
        type: 'loginPwdBack/validCode',
        payload: { ...dat },
      });
    },
    prevClick() {
      dispatch({
        type: 'loginPwdBack/updateState',
        payload: { currentStep: 0, userName: '', verCode: '' },
      });
    },
    submitPwd(dat) {
      dispatch({
        type: 'loginPwdBack/updatePwd',
        payload: { ...dat },
      });
    },
    confirmDirty: checkInvalid,
    confirmBlur(val) {
      dispatch({
        type: 'pwdService/updateState',
        payload: { checkInvalid: val },
      });
    },
  }
  return (
    <div className={styles['td-mer-login']}>
      <LoginHeader />
      <Card style={{ margin: 160, marginTop: 128 }}>
        <LoginPwdBackStep {...stepProps} />
      </Card>
      <LoginFooter />
    </div>
  );
}

function mapStateToProps({ loginPwdBack }) {
  return { loginPwdBack };
}

export default connect(mapStateToProps)(LoginPwdBack);
