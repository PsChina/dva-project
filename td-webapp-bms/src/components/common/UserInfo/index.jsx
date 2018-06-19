import React, { PropTypes } from 'react';
import { Icon, Popover } from 'antd';
import styles from './index.less';

const noop = () => {};

const UserInfo = (props) => {
  const { style, username, content, userText, welcomeText } = props;
  return (
    <ul className={styles.user_info} style={style}>
      <li className={styles.user_avatar}>
        <Icon type="user" />
      </li>
      <li className={styles.user_name}>
        {userText}：
        {
          content === null ? (<span>{username}</span>) : (
            <Popover content={content} title={username} trigger="hover" placement="bottomRight">
              <font><span>{username}</span></font>
            </Popover>
          )
        }
      </li>
      <li className={styles.user_welcome}>
        {welcomeText}！
      </li>
    </ul>
  );
}

UserInfo.propTypes = {
  style: PropTypes.object,
  username: PropTypes.string,
  // content: PropTypes.func,
  userText: PropTypes.string,
  welcomeText: PropTypes.string,
};

UserInfo.defaultProps = {
  handleOffClick: noop,
  style: {},
  username: '',
  content: null,
  userText: 'User',
  welcomeText: 'Welcome',
}

export default UserInfo;
