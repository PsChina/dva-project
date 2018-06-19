import React, { PropTypes } from 'react';
import styles from './index.less';

const DesktopIcon = (props) => {
  const { sysName, icon, size, url } = props;
  const iconCls = `${styles.icon} ${styles[`icon_${icon}`]}`;
  const titleCls = styles.icon_title;
  const aProps = {
    className: size === 'large' ? `${styles.desktop_icon} ${styles.desktop_icon_large}` : styles.desktop_icon,
    href: url,
    target: url === 'javascript:;' ? '_self' : '_blank',
    rel: 'noopener noreferrer',
  };
  return (
    <a {...aProps}>
      <div className={iconCls} />
      <div className={titleCls}>{sysName}</div>
    </a>
  );
}

DesktopIcon.propTypes = {
  sysName: PropTypes.string,
  icon: PropTypes.string,
  size: PropTypes.string,
  url: PropTypes.string,
};

DesktopIcon.defaultProps = {
  sysName: '',
  icon: '',
  size: 'middle',
  url: 'javascript:;',
}

export default DesktopIcon;
