import React, { PropTypes } from 'react';
import styles from './index.less';

class SlidePanel extends React.Component {
  constructor(props) {
    super(props);
    const baseCls = `${styles.slide_panel} ${(props.position === 'left' || props.position === 'right') ? styles.slide_panel_lr : styles.slide_panel_tb}`;
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
    const { contentStyle, zIndex } = this.props;
    let zIdx = zIndex;
    if (zIndex > 999) {
      zIdx = 999;
    } else if (zIndex < 900) {
      zIdx = 900;
    }
    return (
      <div className={this.state.panelCls} style={{ zIndex: zIdx }}>
        <div className={styles.slide_panel_content} style={contentStyle}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

SlidePanel.propTypes = {
  visible: PropTypes.bool,
  position: PropTypes.string,
  contentStyle: PropTypes.object,
  zIndex: PropTypes.number,
};

SlidePanel.defaultProps = {
  visible: true,
  position: 'right',  // support left right top bottom, default right
  contentStyle: {},
  zIndex: 900,        // between 900 and 999
}

export default SlidePanel;
