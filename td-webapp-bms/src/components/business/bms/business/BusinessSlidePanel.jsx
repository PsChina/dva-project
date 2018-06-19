import React, { PropTypes } from 'react';
import { Icon } from 'antd';
import styles from './BusinessSlidePanel.less';

class BusinessSlidePanel extends React.Component {
  constructor(props) {
    super(props);
    const baseCls = `${styles.slide_panel} ${styles.slide_panel_lr}`;
    this.state = {
      visible: props.visible,
      baseCls,
      panelCls: `${baseCls} ${props.visible ? styles[`slide_panel_${props.position}_in`] : styles[`slide_panel_${props.position}_out`]}`,
    }
  }

  componentDidMount() {
    const { visible } = this.props;
    if (visible) {
      this.handleVisible(visible);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible !== this.state.visible) {
      this.setState({ visible: nextProps.visible }, () => {
        this.handleVisible(nextProps.visible);
      });
    }
  }

  handleVisible(visible) {
    const { position } = this.props;
    if (visible) {
      this.setState({ panelCls: `${this.state.baseCls} ${styles[`slide_panel_${position}_out`]} ${styles[`slide_panel_${position}_fade_in`]}` });
    } else {
      this.setState({ panelCls: `${this.state.baseCls} ${styles[`slide_panel_${position}_in`]} ${styles[`slide_panel_${position}_fade_out`]}` });
    }
  }

  render() {
    const { title, contentStyle, zIndex, onCloseClick } = this.props;
    let zIdx = zIndex;
    if (zIndex > 999) {
      zIdx = 999;
    } else if (zIndex < 900) {
      zIdx = 900;
    }
    return (
      <div className={this.state.panelCls} style={{ zIndex: zIdx }}>
        {
          title === '' ? null :
          <h3 className={styles.slide_panel_title}>
            {title}
            <Icon type="cross" style={{ float: 'right', marginTop: 5 }} onClick={onCloseClick} />
          </h3>
        }
        <div className={styles.slide_panel_content} style={contentStyle}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

BusinessSlidePanel.propTypes = {
  title: PropTypes.string,
  visible: PropTypes.bool,
  position: PropTypes.string,
  contentStyle: PropTypes.object,
  zIndex: PropTypes.number,
  onCloseClick: PropTypes.func,
};

BusinessSlidePanel.defaultProps = {
  title: '',
  visible: true,
  position: 'left',  // left and right
  contentStyle: {},
  zIndex: 900,       // between 900 and 999
  onCloseClick: () => {},
}

export default BusinessSlidePanel;
