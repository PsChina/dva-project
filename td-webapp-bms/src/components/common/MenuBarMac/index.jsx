import React, { PropTypes } from 'react';
import styles from './index.less';

let MenuBar = null;
let MenuItems = null;
const noop = () => {};

class MenuBarMac extends React.Component {
  constructor(props) {
    super(props);
    const styleList = [];
    for (let i = 0; i < props.menuItems.length; i++) {
      styleList.push({ width: 64, height: 64 });
    }
    this.state = {
      event1: null,
      event2: null,
      event3: null,
      styleList,
      marginLeft: (parseInt(window.innerWidth, 10) - (props.menuItems.length * 70)) / 2,
      animate: !(parseInt(window.innerWidth, 10) < 960),
    };
  }

  componentDidMount() {
    MenuBar = document.getElementsByClassName(styles.menu_bar_mac)[0];
    MenuItems = document.getElementsByClassName(styles.menuItem);
    this.state.event1 = this.handleMouseMove.bind(this);
    this.state.event2 = this.handleMouseLeave.bind(this);
    this.state.event3 = this.handleWindowResize.bind(this);
    MenuBar.addEventListener('mousemove', this.state.event1);
    MenuBar.addEventListener('mouseleave', this.state.event2);
    window.addEventListener('resize', this.state.event3);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.menuItems.length !== this.props.menuItems.length) {
      this.resetBarPosition(nextProps.menuItems);
    }
  }

  componentWillUnmount() {
    MenuBar.removeEventListener('mousemove', this.state.event1);
    MenuBar.removeEventListener('mouseleave', this.state.event2);
    window.removeEventListener('resize', this.state.event3);
  }

  resetBarPosition(items) {
    this.setState({
      marginLeft: (parseInt(window.innerWidth, 10) - (items.length * 70)) / 2,
      animate: !(parseInt(window.innerWidth, 10) < 960),
    });
  }

  handleMouseMove(ev) {
    if (this.state.animate) {
      for (let i = 0; i < MenuItems.length; i++) {
        const item = MenuItems[i];
        const imgX = item.offsetLeft + MenuBar.offsetLeft
          + (item.offsetWidth / 2);
        const imgY = item.offsetTop + MenuBar.offsetTop
          + (item.offsetHeight / 2);
        const a = imgX - ev.clientX;
        const b = imgY - ev.clientY;
        const c = Math.sqrt((a * a) + (b * b));
        let scale = 1 - (c / 300);
        if (scale < 0.5) {
          scale = 0.5;
        }
        const size = Math.ceil(128 * scale);
        const list = this.state.styleList;
        list[i] = { ...list[i], width: size, height: size };
        this.setState({ styleList: list });
      }
    }
  }

  handleMouseLeave() {
    const list = this.state.styleList;
    for (let i = 0; i < list.length; i++) {
      list[i] = { ...list[i], width: 64, height: 64 };
    }
    this.setState({ styleList: list });
  }

  handleWindowResize() {
    this.resetBarPosition(this.props.menuItems);
  }

  handleItemClick(ev, item) {
    this.props.menuClick(ev, item);
  }

  render() {
    const { menuItems } = this.props;
    return (
      <div className={styles.menu_bar_mac} style={{ marginLeft: this.state.marginLeft }}>
        {
          menuItems.map((item, idx) => {
            return (
              <div
                key={idx} title={item.title} style={this.state.styleList[idx]} onClick={(ev) => { this.handleItemClick(ev, item) }}
                className={`${styles.menuItem} ${styles[`${item.title.toLowerCase()}-menuItem`]}`}
              />
            );
          })
        }
      </div>
    );
  }
}

MenuBarMac.propTypes = {
  menuItems: PropTypes.array,
  menuClick: PropTypes.func,
};

MenuBarMac.defaultProps = {
  menuItems: [],  // 小于等于10最佳
  menuClick: noop,
}

export default MenuBarMac;
