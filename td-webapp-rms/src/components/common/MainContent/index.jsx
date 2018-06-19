import React, { PropTypes } from 'react';
import styles from './index.less';

const MainContent = (props) => {
  const { style, children } = props;
  return (
    <div className={styles.main_content} style={style}>
      {children}
    </div>
  );
}

MainContent.propTypes = {
  style: PropTypes.object,
};

MainContent.defaultProps = {
  style: {},
}

export default MainContent;
