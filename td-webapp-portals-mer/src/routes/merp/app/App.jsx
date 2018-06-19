import React from 'react';
import { connect } from 'dva';
import styles from './App.less';

/**
 * 首页
 * 此处由于需要使用生命周期方法 因此采用es6写法
 */
class App extends React.Component {
  render() {
    return (
      <div className={styles.app}>
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps({ app }) {
  return { app };
}

export default connect(mapStateToProps)(App);
