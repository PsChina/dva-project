import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.less';
import LoginForm from '../components/common/LoginForm';

function IndexPage({ indexPage, dispatch }) {
  const formProps = {
    loading: indexPage.loading,
    formSubmit: (dat) => {
      dispatch({
        type: 'indexPage/login',
        payload: { usrName: dat.usrName.trim(), usrPsw: dat.usrPsw.trim() },
      });
    },
  };
  return (
    <div className={styles.index_container}>
      <div className={styles.index_login_warp}>
        <LoginForm {...formProps} />
      </div>
    </div>
  );
}

function mapStateToProps({ indexPage }) {
  return { indexPage };
}

export default connect(mapStateToProps)(IndexPage);
