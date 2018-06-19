import React from 'react';
import { Link } from 'dva/router';
import * as i18n from '../../../utils/i18n';
import styles from '../../../routes/login/Login.less';


const LoginHeader = (props) => {
  const commonMap = i18n.commonMap();
  const bizMap = i18n.bizMap('login');
  return (
    <header>
      <div className={styles['td-login-header-top']}>
        <ul>
          <li><a href="javascript:void(0);">{bizMap.how}</a></li>
          <li>{bizMap.phone}{ commonMap.customerServicePhone }</li>
        </ul>
      </div>
      <div className={styles['td-login-header-content']}>
        <ul className={styles['td-login-header-left']}>
          {/* <li><div className={styles['td-login-header-logo']} /></li> */}
          <li> | </li>
          <li>{bizMap.buss}</li>
        </ul>
        <ul>
          <li><Link target="_blank" >{bizMap.help}</Link></li>
          {/*
            <li>|</li>
            <li><a href="javascript:void(0);">{bizMap.people}</a></li>
          */}
        </ul>
      </div>
    </header>
  );
}


export default LoginHeader;
