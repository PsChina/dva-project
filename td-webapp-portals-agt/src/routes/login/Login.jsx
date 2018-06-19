import React from 'react';
import { connect } from 'dva';
import LoginForm from '../../components/business/Login/LoginForm';
import LoginFooter from '../../components/business/Login/LoginFooter';
import LoginHeader from '../../components/business/Login/LoginHeader';
import styles from './Login.less';
import InfoItem from './InfoItem';
import * as i18n from '../../utils/i18n';
class Login extends React.Component {
  render() {
    const { dispatch, login } = this.props;
    const queryFormProps = {
      loading: login.loginLoading,
      formSubmit: (dat) => {
        dispatch({
          type: 'login/login',
          payload: { username: dat.usrName.trim(), password: dat.usrPsw.trim() },
        });
      },
    };
    return (
      <div className={styles['login-box']}>
        <div className={styles['login-left']}>

        </div>
        <div className={styles['login-center']}>
          <div className={styles['login-content-top']}>

          </div>
          <div className={styles['login-content-center']}>
              <LoginForm {...queryFormProps}/>
          </div>
          <div className={styles['login-content-bottom']}>

          </div>
        </div>
        <div className={styles['login-right']}>

        </div>
      </div>
    );
  }
}

function mapStateToProps({ login }) {
  return { login };
}

export default connect(mapStateToProps)(Login);

// 废弃代码


/**
 * 
      <div className={styles['td-mer-login']}>
        <div className={styles['td-mer-log']} />
        <div className={styles['td-mer-login-left']}>
          <div className={styles['td-mer-login-left-row']}>
            <div className={styles['td-mer-login-left-col']}>
              <div className={`${styles['td-mer-login-left-item']} ${styles['td-mer-login-left-item-rb']}`} />
            </div>
            <div className={styles['td-mer-login-left-col']}>
              <div className={`${styles['td-mer-login-left-item']} ${styles['td-mer-login-left-item-lb']}`} />
            </div>
          </div>
          <div className={styles['td-mer-login-left-row']}>
            <div className={styles['td-mer-login-left-col']}>
              <div className={`${styles['td-mer-login-left-item']} ${styles['td-mer-login-left-item-rt']}`} />
            </div>
            <div className={styles['td-mer-login-left-col']}>
              <div className={`${styles['td-mer-login-left-item']} ${styles['td-mer-login-left-item-lt']}`} />
              <span className={styles['td-mer-login-center-btn']}>{bizMap.more}</span>
            </div>
          </div>
        </div>
        <div className={`${styles['td-mer-login-center']} ${styles['td-mer-login-center-top']}`} />
        <div className={`${styles['td-mer-login-center']} ${styles['td-mer-login-center-bottom']}`} />
        <div className={styles['td-mer-login-right']} >
          <div className={styles['td-mer-login-form']} >
            <LoginForm {...queryFormProps} />
          </div>
        </div>
        <LoginHeader />
        <LoginFooter />
      </div> 
 * 
*/