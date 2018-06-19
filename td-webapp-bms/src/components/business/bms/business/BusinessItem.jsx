import React, { PropTypes } from 'react';
import { Switch, Popover } from 'antd';
import styles from './BusinessItem.less';
import * as i18n from '../../../../utils/i18n';

const noop = () => {};
const BussinessItem = (props) => {
  const commonMap = i18n.commonMap();
  const { biz, title, checked, onChange, detailClick, updateClick } = props;
  const cls = `${styles.item} ${styles[`item_${biz}`]}`;
  const switchProps = {
    checkedChildren: 'ON',
    unCheckedChildren: 'OFF',
    checked,
    style: { marginTop: 6, float: 'left' },
    onChange,
  };
  const links = (
    <span>
      <a href="javascript:void(0);" onClick={detailClick}>{commonMap.detail}&nbsp;</a>
      <a href="javascript:void(0);" onClick={updateClick}>&nbsp;{commonMap.update}</a>
    </span>
  );
  const content = checked ? (
    <Popover content={links} title={null}>
      <div className={styles.business_item}>
        <div className={cls} />
        <div className={styles.title} style={props.switch ? { margin: '4px 0px 8px 16px' } : {}}>
          <div>{title}</div>
          { props.switch ? <div><Switch {...switchProps} /></div> : null }
        </div>
      </div>
    </Popover>
  ) : (
    <div className={styles.business_item}>
      <div className={cls} />
      <div className={styles.title} style={props.switch ? { margin: '4px 0px 8px 16px' } : {}}>
        <div>{title}</div>
        { props.switch ? <div><Switch {...switchProps} /></div> : null }
      </div>
    </div>
  )
  return content;
}

BussinessItem.propTypes = {
  biz: PropTypes.string,
  title: PropTypes.string,
  switch: PropTypes.bool,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  detailClick: PropTypes.func,
  updateClick: PropTypes.func,
};

BussinessItem.defaultProps = {
  biz: '',  // support unionCard,alipay,wechat,baidu,unionPay
  title: '',
  switch: false,
  checked: false,
  onChange: noop,
  detailClick: noop,
  updateClick: noop,
}

export default BussinessItem;
