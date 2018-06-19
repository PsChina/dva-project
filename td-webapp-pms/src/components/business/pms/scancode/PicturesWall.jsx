import React, {PropTypes} from 'react';
import * as i18n from '../../../../utils/i18n';
import {Modal, Upload, Icon, Button} from 'antd';

const commonMap = i18n.commonMap();

class PicturesWall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: this.props.fileList,
    }
  }

  componentWillReceiveProps(nextState) {
    const {fileList} = nextState;
    this.setState({
      fileList,
    })
  }

  handleCancel() {
    this.setState({previewVisible: false});
  }

  handleRemove(){
    this.setState({fileList: []});
    const {uploadDoneCallback} = this.props;
    uploadDoneCallback('', [])
  }

  handlePreview(file) {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange(params) {
    const {fileList} = params;
    this.setState({fileList});
  }

  handleUpload({file}) {
    const {uploadLogo} = this.props;
    uploadLogo({
      LX: 'PIC',
      ORDERNUM: 1,
      TABLENAME: 'chn_scan_inf',
      file
    })
  }

  render() {
    const {previewVisible, previewImage, fileList} = this.state;
    const {uploadDoneCallback} = this.props;
    if (fileList.length >= 1) {
      uploadDoneCallback('', fileList)
    }
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'}/>
        <div className="ant-upload-text">{commonMap.upLoad}</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          customRequest={this.handleUpload.bind(this)}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview.bind(this)}
          onChange={this.handleChange.bind(this)}
          onRemove={this.handleRemove.bind(this)}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
          <img alt="example" style={{width: '100%'}} src={previewImage}/>
        </Modal>
      </div>
    );
  };
}

const noop = () => {
};

PicturesWall.propTypes = {
  uploadLogo: PropTypes.func,
  getBase64Logo: PropTypes.func,
  fileList: PropTypes.array,
}

PicturesWall.defaultProps = {
  uploadLogo: noop,
  getBase64Logo: noop,
  fileList: [],
}

export default PicturesWall;
