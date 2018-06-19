import React, { PropTypes } from 'react';
import { Link } from 'dva/router';
import { Breadcrumb } from 'antd';
import styles from './index.less';

const MainBreadcrumb = (props) => {
  const { path, style, homeIdx, homePath } = props;
  return (
    <div className={styles['main-breadcrumb']} style={style}>
      <Breadcrumb>
        {
          path.map((item, idx) => {
            return idx !== homeIdx ? (<Breadcrumb.Item key={idx}>{item}</Breadcrumb.Item>) :
              (<Breadcrumb.Item key={idx}><Link to={homePath}>{item}</Link></Breadcrumb.Item>)
          })
        }
      </Breadcrumb>
    </div>
  );
}

MainBreadcrumb.propTypes = {
  path: PropTypes.array,
  style: PropTypes.object,
  homeIdx: PropTypes.number,
  homePath: PropTypes.string,
}

MainBreadcrumb.defaultProps = {
  path: [],
  style: {},
  homeIdx: -1,
  homePath: '/',
};

export default MainBreadcrumb;
