import React from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import { Link } from 'dva/router';
// import LoginFooter from '../../components/business/Login/LoginFooter';
// import LoginHeader from '../../components/business/Login/LoginHeader';
import LoginPwdBackStep from '../../components/business/Login/loginPwdBack/LoginPwdBackStep';
import * as i18n from '../../utils/i18n';
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
  const bizMap = i18n.bizMap('login');
  const ReturnToLoginPage = (props)=>{
    return (
      <div {...props}>
        <Link to="/login" className={styles['mer-login-back']}>{bizMap.retoLogin}</Link>
      </div>
    )
  }
  const LoginPwdBack = (props)=>{
    return (
      <div {...props}>
        <div className={styles['mer-login-forget-top-gap']}>1</div>
        <div className={styles['mer-login-forget-title']}>{bizMap.loginPwdBackTitle}</div>
        <div className={styles['mer-login-forget-bottom-gap']}>3</div>
        <div className={styles['mer-login-forget-email']}>4</div>
        <div className={styles['mer-login-forget-auth-code']}>5</div>
        <div className={styles['mer-login-forget-new-psw']}>6</div>
        <div className={styles['mer-login-forget-btn']}>7</div>
      </div>
    )
  }
  return (
    <div className={styles['mer-login-forget-box']}>
      <ReturnToLoginPage className={styles['mer-login-forget-top']} />
      <Card className={styles['mer-login-forget-body']} style={{ marginTop: '.12rem' }}>
        <LoginPwdBack style={ { width:'100%', height:'100%', display:'flex', flexDirection:'column' } }/>
        {/* <LoginPwdBackStep {...stepProps} /> */}
      </Card>
    </div>
  );
}

function mapStateToProps({ loginPwdBack }) {
  return { loginPwdBack };
}


export default connect(mapStateToProps)(LoginPwdBack);
