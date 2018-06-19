import React, {PropTypes} from 'react';
import {Link} from 'dva/router';
import {Menu} from 'antd';

const noop = () => {
};
const SubMenu = Menu.SubMenu;

/**
 * 菜单侧边栏 作为容器使用
 * 父容器高度须设置为100%
 */
class MenuHeader extends React.Component {
  render() {
    const {menuItems, menuClick} = this.props;
    const menuProps = {
      style: {borderBottom: 0, fontSize: 14},
      mode: 'horizontal',
      defaultSelectedKeys: [menuItems.length > 0 ? menuItems[0].key : ''],
      onClick(item) {
        menuClick(item)
      },
    };
    return (
      <Menu {...menuProps}>
        {
          menuItems.map((item) => {
            return (
              <SubMenu key={item.key} title={item.text}>
                {
                  item.children.map((child) => {
                    console.log(child.key)
                    return (
                      <Menu.Item key={child.key}>
                        <Link to={`${'/'}${child.to}`}>{child.text}</Link>
                      </Menu.Item>
                    )
                  })
                }
              </SubMenu>
            )
          })
        }
      </Menu>
    );
  }
}

MenuHeader.propTypes = {
  menuItems: PropTypes.array,
  menuClick: PropTypes.func,
};

MenuHeader.defaultProps = {
  menuItems: [],
  menuClick: noop,
}

export default MenuHeader;
