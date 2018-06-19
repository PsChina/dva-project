import React from 'react';
import PropTypes from 'prop-types';
import * as services from '../services/PackageList';


class Logo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src: '',
    };
  }
  componentWillMount() {
    services.getLogoBase64({
      PKID: this.props.pakLogoUrl,
      TABLENAME: 'package_inf',
      attachInfoModalVisible: true,
    }).then((img) => {
      console.log(img);
      if ('data' in img && img.data) {
        if ('rspData' in img.data) {
          if (img.data.rspData && 'FJSRC_pic_1' in img.data.rspData) {
            this.setState({
              src: `data:image/png;base64,${img.data.rspData.FJSRC_pic_1 ? img.data.rspData.FJSRC_pic_1 : img.data.rspData.FJSRC_logo_1}`,
            });
          }
        }
      }
    });
  }
  render() {
    return (<img
      style={{
      width: '25px', height: '25px', margin: '0', padding: '0',
      }}
      alt="logo"
      src={this.state.src}
    />);
  }
}

Logo.propTypes = {
  pakLogoUrl: PropTypes.string,
};
Logo.defaultProps = {
  pakLogoUrl: '',
};

export default Logo;
