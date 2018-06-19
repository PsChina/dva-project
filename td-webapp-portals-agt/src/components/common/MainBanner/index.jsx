import React, { PropTypes } from 'react';
import styles from './index.less';

const MainBanner = (props) => {
  const { style, shadow, border } = props;
  const cls = `${styles.main_banner} ${border ? styles.main_banner_border : ''}  ${shadow ? styles.main_banner_shadow : ''}`;
  return (
    <div className={cls} style={style}>
      {props.children}
    </div>
  );
}

MainBanner.propTypes = {
  style: PropTypes.object,
  shadow: PropTypes.bool,
  border: PropTypes.bool,
};

MainBanner.defaultProps = {
  style: {},
  shadow: false,
  border: true,
}

export default MainBanner;
