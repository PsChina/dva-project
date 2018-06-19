import React, { PropTypes } from 'react';
import { Link } from 'dva/router';
import { Menu, Icon } from 'antd';
import styles from './index.less';

const noop = () => {};

/**
 * 菜单侧边栏 作为容器使用
 * 父容器高度须设置为100%
 */
class MenuAsider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: !props.collapse,
      mode: props.collapse ? 'inline' : 'vertical',
    };
  }

  componentDidMount() {
    const els = document.querySelectorAll(`.${styles['ant-layout-aside']} .ant-menu`);
    for (let i = 0; i < els.length; i++) {
      els[i].style.borderRight = '0px none';
    }
  }

  onCollapseChange() {
    this.setState({
      collapse: !this.state.collapse,
      mode: this.state.collapse ? 'inline' : 'vertical',
    });
  }

  buildMenu(arr, count) {
    const maxLv = this.props.menuMaxLevel;
    const navTextCls = styles['nav-text'];
    const bigIconCls = styles['big-icon'];
    return arr.map((item) => {
      let vdom = null;
      let title = (<span className={navTextCls}>{item.text}</span>);
      if (item.icon && item.icon !== '') {
        if (this.state.collapse && count === 1) {
          title = (<div><Icon className={bigIconCls} key="icon" type={item.icon} title={item.text} /></div>);
        } else {
          title = [<Icon key="icon" type={item.icon} title={item.text} />, <span key="span" className={navTextCls}>{item.text}</span>];
          // 二级菜单无图标
          // title = (<span className={navTextCls}>{item.text}</span>);
        }
      }
      if (item.children && item.children.length > 0) {
        if (maxLv === count) {
          vdom = (
            <Menu.Item key={item.key}>
              {
                <Link to={item.to ? item.to : ''}>{title}</Link>
              }
            </Menu.Item>
          )
        } else {
          vdom = (
            <Menu.SubMenu key={item.key} title={title}>
              {this.buildMenu(item.children, count + 1)}
            </Menu.SubMenu>
          )
        }
      } else {
        vdom = (
          <Menu.Item key={item.key}>
            {
              <Link to={item.to ? item.to : ''}>{title}</Link>
            }
          </Menu.Item>
        )
      }
      return vdom;
    });
  }

  render() {
    const { theme, action, logo, menuItems, menuClick } = this.props;
    const containerCls = this.state.collapse ? `${styles['ant-layout-aside']} ${styles['ant-layout-aside-collapse']}` : styles['ant-layout-aside'];
    const lightCls = (theme === 'light') ? styles['ant-layout-aside-light'] : '';
    const siderCls = styles['ant-layout-sider'];
    // const logoCls = styles['ant-layout-logo'];
    const splitCls = styles['ant-aside-split'];
    const blockCls = styles['ant-aside-block'];
    const actBtnCls = styles['ant-aside-action'];
    const mainCls = styles['ant-layout-main'];
    return (
      <div className={`${containerCls} ${lightCls}`}>
        <aside className={siderCls}>
          {logo}
          <hr className={splitCls} />
          <Menu
          defaultOpenKeys = {[ menuItems[0] !== undefined ?  'key' in menuItems[0] ? menuItems[0]['key'] : undefined  : undefined ]}
          defaultSelectedKeys={[ menuItems[0] !== undefined ? 'key' in menuItems[0] ? menuItems[0]['key'] : undefined : undefined ]}
          mode={this.state.mode} theme={theme} onClick={(item, key, keyPath) => { menuClick(item, key, keyPath); }}>
            {
              this.buildMenu(menuItems, 1)
            }
          </Menu>
          <div className={blockCls} />
          {
            !action ? null :
            <div className={actBtnCls} onClick={this.onCollapseChange.bind(this)}>
              {this.state.collapse ? <Icon type="right" /> : <Icon type="left" />}
            </div>
          }
        </aside>
        <div className={mainCls}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

MenuAsider.propTypes = {
  theme: PropTypes.string,
  action: PropTypes.bool,
  collapse: PropTypes.bool,
  logo: PropTypes.object,
  menuItems: PropTypes.array,
  menuClick: PropTypes.func,
  menuMaxLevel: PropTypes.number,
};

MenuAsider.defaultProps = {
  theme: 'dark',
  action: true,
  collapse: false,
  logo: null,
  menuItems: [],
  menuClick: noop,
  menuMaxLevel: 0,  // 指定菜单最大几层 默认0 无限
}

export default MenuAsider;
