import React, { PropTypes } from 'react';
import { Icon } from 'antd';

const noop = () => { };

class MiniFormTitle extends React.Component {
  render() {
    const { title, popoverOncancel } = this.props;
    return (
      <div>
        <span>{title}</span>
        <Icon type="cross" style={{ cursor: 'pointer', marginTop: 12, float: 'right' }} onClick={popoverOncancel} />
      </div>
    );
  }
}

MiniFormTitle.propTypes = {
  title: PropTypes.string,
  popoverOncancel: PropTypes.func,
};

MiniFormTitle.defaultProps = {
  title: '',
  popoverOncancel: noop,
}

export default MiniFormTitle;
