import React from 'react';
import { connect } from 'dva';
import LoginForm from '../../components/business/Login/LoginForm';
// import LoginFooter from '../../components/business/Login/LoginFooter';
// import LoginHeader from '../../components/business/Login/LoginHeader';
import InfoItem from './InfoItem';
import styles from './Login.less';
import * as i18n from '../../utils/i18n';

class Login extends React.Component {
  render() {
    const infoItem = i18n.bizMap('loginInfoItem');

    // const infoItemList=[
    //   {
    //     icon:require('../../assets/image/LoginHome/kuaijie@2x.png') ,
    //     title:infoItem.part1Title,
    //     content:infoItem.part1Content,
    //   },
    //   {
    //     icon:require('../../assets/image/LoginHome/jiesuan@2x.png'),
    //     title:infoItem.part2Title,
    //     content:infoItem.part2Content,
    //   },
    //   {
    //     icon:require('../../assets/image/LoginHome/shoukuan@2x.png'),
    //     title:infoItem.part3Title,
    //     content:infoItem.part3Content,
    //   },
    //   {
    //     icon:require('../../assets/image/LoginHome/feilv@2x.png'),
    //     title:infoItem.part4Title,
    //     content:infoItem.part4Content,
    //   }
    // ]

    // const bizMap = i18n.bizMap('login');

    // <LoginForm {...queryFormProps}/>

    const { dispatch, login } = this.props;
    const queryFormProps = {
      loading: login.loginLoading,
      formSubmit: (dat) => {
        dispatch({
          type: 'login/login',
          payload: { username: dat.usrName.trim(), password: dat.usrPsw.trim() },
        });
      },
    }
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

/* <div className={styles['login-box']}>
        <div className={styles['login-right-top']}>

        </div>
        <div className={styles['login-right-center']}>
         
        </div>
        <div className={styles['login-right-bottom']}>

        </div>
      </div> */
        /* <div className={styles['login-left']}>
            <div className={styles['login-left-top']}></div>
            <div className={styles['login-left-center']}>
              <div className={styles['login-left-center-margin-left']}>

              </div>
              <div className={styles['login-left-center-content']}>
                {
                  infoItemList.map((props,index)=><InfoItem key={index+1} {...props} />)
                }
              </div>
              <div className={styles['login-left-center-margin-right']}>

              </div>
            </div>
            <div className={styles['login-left-bottom']}></div>
        </div>
        <div className={styles['login-right']}>
                <div className={styles['login-right-top']}>

                </div>
                <div className={styles['login-right-center']}>
                  <div className={styles['login-right-center-margin-left']}>

                  </div>
                  <div className={styles['login-right-center-content']}>
                    <LoginForm {...queryFormProps}/>
                  </div>
                  <div className={styles['login-right-center-margin-right']}>

                  </div>
                </div>
                <div className={styles['login-right-bottom']}>

                </div>
        </div> */