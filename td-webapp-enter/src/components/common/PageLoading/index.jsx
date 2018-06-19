import React, { PropTypes } from 'react';
import { Icon } from 'antd';
import styles from './index.less';

class PageLoading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: -100,
      interval: null,
      visible: false,
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.loading === true) {
      this.startLoading();
    } else {
      this.endLoading();
    }
  }
  startLoading() {
    this.stopLoading();
    this.setState({ visible: true, percent: -100 }, () => {
      this.state.interval = setInterval(() => {
        if (this.state.percent < -2) {
          this.setState({ percent: this.state.percent + 1 });
        } else {
          this.stopLoading();
        }
      }, 100);
    });
  }
  stopLoading() {
    if (this.state.interval !== null) {
      clearTimeout(this.state.interval);
      this.state.interval = null;
    }
  }
  endLoading(cb) {
    this.stopLoading();
    this.setState({ percent: 0 }, () => {
      this.setState({ percent: -100, visible: false }, () => {
        if (typeof cb === 'function') { cb(); }
      });
    });
  }
  render() {
    const curStyle = {
      transform: `translate3d(${this.state.percent}%, 0px, 0px)`,
    };
    return (
      <div className={styles['page-loading']} hidden={!this.state.visible}>
        <div className={styles.bar} style={curStyle} />
        <Icon type="loading" />
      </div>
    );
  }
}

PageLoading.propTypes = {
  loading: PropTypes.bool,
};

PageLoading.defaultProps = {
  loading: false,
}

export default PageLoading;
