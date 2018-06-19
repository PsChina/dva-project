import React, { PropTypes } from 'react';
import { Upload, Icon, Modal } from 'antd';
import { callNotice } from '../../../utils/alert';
import { bizMap } from '../../../utils/i18n';
import styles from './index.less';

const uploadMap = bizMap('upload');

/**
 * Antd中的Upload组件进行二次封装
 * <MulUpload />上传组件
 * 标签属性：
 * url：上传地址
 * data：上传公共参数
 * type: 上传类型(0：图片，1：文件， 2：全部), 默认2全部
 * suffixes: 上传文件后缀名列表，默认空数组
 * files：上传文件对象数组
 *  对象属性：
 *  label：文件名称/标题
 *  name：文件名(默认展现文件的文件名, 可选)
 *  url：文件地址(默认展现的文件地址, 可选)
 *  editable：是否可编辑(是否可编辑默认文件，可选)
 *  data：上传个性化参数(上传时与公共参数合并)
 * onImgClick：点击图片事件(可返回正常大小图片地址, 可选)
 *  方法参数：idx 文件索引, isNew 是否为新上传(false代表点击默认图片), ev 点击事件对象
 * uploadDoneCallback：文件上传完成回调方法
 *  方法参数：idx 文件索引, file 文件对象, list 文件列表, ev 事件
 * uploadRemoveCallback：文件移除回调方法(可选)
 *  方法参数：同上
 * uploadErrorCallback：文件上传失败回调方法(可选)
 *  方法参数：同上
 * 使用配置示例：
 * const testUrl = 'http://xxx.do';
 * const testData = { xxx: 'xxx' }
 * const testFiles = [
 *  { label: '用户身份证正面', data: { LX: 'PIC', ORDERNUM: '01' } },
 *  { label: '用户身份证反面', data: { LX: 'PIC', ORDERNUM: '02' } },
 *  { label: '不可编辑的已上传的附件', name: 'doge.png', editable: false, url: 'http://pic.weifengke.com/attachments/2/2547/9af0b373bf8eed9ee653067e5f30d1b9.jpg', data: { LX: 'PIC', ORDERNUM: '04' } },
 *  // 对于非图片, 组件会根据url是否存在, 设置下载链接
 *  { label: '已上传的某个非图片文件', name: 'xxx.doc', url: '', data: { LX: 'PIC', ORDERNUM: '05' } }
 * ];
 * const testImgClick = (idx, isNew, ev) => {
 *   // 对于isNew为true的图片，可以考虑同步请求真实大小的图片地址并返回
 *   // 不返回或返回null, 则默认展现原img中的图片
 * }
 * const testDoneCallback = (idx, file, list, ev) => {
 *  const rsp = file.file.response,
 *   f = `FJSRC_${testFiles[idx].data.LX}_${testFiles[idx].data.ORDERNUM}`,
 *   n = `FJNAME_${testFiles[idx].data.LX}_${testFiles[idx].data.ORDERNUM}`,
 *   name = rsp[n], pos = name.lastIndexOf('.');
 *  let img = null;
 *  if (pos > 0) {
 *    const suffix = name.substring(pos + 1, name.length);
 *    if ('jpg,jpeg,bmp,png,gif'.indexOf(suffix) !== -1) {
 *      img = 'data:image/png;base64,' + file.file.response[f];
 *    }
 *  }
 *  return img;
 * }
 */
class MulUpload extends React.Component {
  constructor(props) {
    super(props);
    const { files } = props;
    const arr1 = [];
    const arr2 = [];
    const arr3 = [];
    const arr4 = [];
    for (let i = 0; i < files.length; i++) {
      arr1.push('standby');
      arr2.push(null);
      arr3.push('');
      arr4.push(!!files[i].name);
    }
    this.state = {
      modalVisible: false,
      barDom: null,
      upInterval: null,
      downInterval: null,
      imageUrl: '',
      imageWidth: 480,
      fileStates: arr1, // 上传文件状态数组(standby, uploading, done, error)
      fileUrls: arr2,   // 上传文件url数组
      fileNames: arr3,  // 上传文件名数组
      oldFiles: arr4,   // 初始化附件显示数组
      fileList: new Array(files.length),
    };
  }

  componentDidMount() {
    const bar = document.createElement('div');
    bar.className = styles['mul-upload-bar'];
    document.body.appendChild(bar);
    const up = document.createElement('i');
    up.className = 'anticon anticon-plus-square';
    up.is = 'null';
    up.title = uploadMap.zoomIn;
    up.onmousedown = (ev) => {
      if (ev && ev.button === 0) {
        this.state.upInterval = setInterval(() => {
          this.setState({ imageWidth: this.state.imageWidth + 10 });
        }, 10);
      }
    };
    up.onmouseup = up.onmouseleave = () => {
      if (this.state.upInterval !== null) {
        clearInterval(this.state.upInterval);
        this.state.upInterval = null;
      }
    };
    const down = document.createElement('i');
    down.className = 'anticon anticon-minus-square';
    down.is = 'null';
    down.title = uploadMap.zoomOut;
    down.onmousedown = (ev) => {
      if (ev && ev.button === 0) {
        this.state.downInterval = setInterval(() => {
          if (this.state.imageWidth >= 240) {
            this.setState({ imageWidth: this.state.imageWidth - 10 });
          } else {
            clearInterval(this.state.downInterval);
            this.state.downInterval = null;
          }
        }, 10);
      }
    };
    down.onmouseup = down.onmouseleave = () => {
      if (this.state.downInterval !== null) {
        clearInterval(this.state.downInterval);
        this.state.downInterval = null;
      }
    };
    const rtn = document.createElement('i');
    rtn.className = 'anticon anticon-rollback';
    rtn.is = 'null';
    rtn.title = uploadMap.restore;
    rtn.onclick = () => {
      this.setState({ imageWidth: 480 });
    };
    bar.appendChild(up);
    bar.appendChild(down);
    bar.appendChild(rtn);
    this.state.barDom = bar;
  }

  componentWillReceiveProps(nextProps) {
    // 重置上传的图片或文件
    if (nextProps.reset === true && this.props.reset === false) {
      const resetFileStates = [];
      const resetFileUrls = [];
      const resetFileNames = [];
      const resetOldFiles = [];
      const fl = this.props.files.length;
      for (let index = 0; index < fl; index++) {
        resetFileStates.push('standby');
        resetFileUrls.push(null);
        resetFileNames.push('');
        resetOldFiles.push(false);
      }
      this.setState({ fileList: new Array(this.props.files.length), fileStates: resetFileStates, fileUrls: resetFileUrls, fileNames: resetFileNames, oldFiles: resetOldFiles });
    }
  }

  componentWillUnmount() {
    if (this.state.barDom !== null) {
      document.body.removeChild(this.state.barDom);
    }
  }

  getImgUrl(idx) {
    let result = '';
    if (this.state.fileUrls !== null) {
      result = this.state.fileUrls[idx] !== null ? this.state.fileUrls[idx] : '';
    }
    return result;
  }
  getFileName(idx) {
    let result = '';
    if (this.state.fileNames !== null) {
      result = this.state.fileNames[idx] !== null ? this.state.fileNames[idx] : '';
    }
    return result;
  }
  getFileSuffix(name) {
    let suffix = '';
    const pos = name ? name.lastIndexOf('.') : -1;
    if (pos > 0) {
      suffix = name.substring(pos + 1);
    }
    return suffix;
  }

  handleBeforeUpload(file) {
    const { type, suffixes } = this.props;
    const isImage = (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/bmp');
    let result = true;
    switch (type) {
      case 0: {
        if (!isImage) {
          result = false;
          callNotice(uploadMap.uploadFail, uploadMap.uploadPicTip, 'error');
        }
        break;
      }
      case 1: {
        if (isImage) {
          result = false;
          callNotice(uploadMap.uploadFail, uploadMap.uploadFileTip, 'error');
        }
        break;
      }
      default:
        break;
    }
    if (result && suffixes.length > 0) {
      const name = file.name;
      // 取后缀名
      const nameType = name.split('.')[1];
      const str = suffixes.toString();
      if (str.indexOf(nameType) === -1) {
        result = false;
        callNotice(uploadMap.uploadFail, `${uploadMap.uploadTypeTip}[${str}]`, 'error');
      }
    }
    return result;
  }

  handleUploadChange(idx, file, list, ev) {
    const arr1 = this.state.fileStates;
    const arr2 = this.state.fileUrls;
    const arr3 = this.state.fileNames;
    const name = file.file.name;
    const { uploadDoneCallback, uploadRemoveCallback, uploadErrorCallback } = this.props;
    let status = file.file.status;
    if (ev && ev.type === 'progress') {
      status = 'uploading';
    }

    switch (status) {
      case 'done':
        if (arr1[idx] !== 'done') {
          arr1[idx] = 'done';
          arr3[idx] = name;
          this.setState({ fileStates: arr1, fileNames: arr3 }, () => {
            const url = uploadDoneCallback(idx, file, list, ev);
            if (url) {
              arr2[idx] = url;
              this.setState({ fileUrls: arr2 });
            }
          });
        }
        break;
      case 'error':
        arr1[idx] = 'error';
        arr2[idx] = null;
        arr3[idx] = name;
        this.setState({ fileStates: arr1, fileUrls: arr2, fileNames: arr3 }, () => {
          uploadErrorCallback(idx, file, list, ev);
        });
        break;
      case 'removed':
        arr1[idx] = 'standby';
        arr2[idx] = null;
        arr3[idx] = '';
        this.setState({ fileStates: arr1, fileUrls: arr2, fileNames: arr3 }, () => {
          uploadRemoveCallback(idx, file, list, ev);
        });
        break;
      default: // default is uploading
        if (arr1[idx] !== 'uploading') {
          arr1[idx] = 'uploading';
          this.setState({ fileStates: arr1 });
        }
        break;
    }
    const fileArr = this.state.fileList.concat();
    fileArr[idx] = file.fileList;
    this.setState({ fileList: fileArr });
  }

  handleEditClick(idx, oper) {
    const arr4 = this.state.oldFiles;
    arr4[idx] = oper;
    this.setState({ oldFiles: arr4 });
  }

  displayStandby(idx) {
    let result = 'inline-block';
    const status = this.state.fileStates[idx];
    if (this.state.fileStates !== null) {
      result = status === 'standby' || status === 'error' ? 'inline-block' : 'none';
    }
    return result;
  }
  displayError(idx) {
    let result = 'block';
    if (this.state.fileStates !== null) {
      result = this.state.fileStates[idx] === 'error' ? 'inline-block' : 'none';
    }
    return result;
  }
  displayUploading(idx) {
    let result = 'none';
    if (this.state.fileStates !== null) {
      result = this.state.fileStates[idx] === 'uploading' ? 'inline-block' : 'none';
    }
    return result;
  }
  displayDone(idx) {
    let result = 'none';
    if (this.state.fileStates !== null) {
      result = this.state.fileStates[idx] === 'done' ? 'inline-block' : 'none';
    }
    return result;
  }
  displayImg(idx) {
    let result = 'none';
    if (this.state.fileUrls !== null) {
      result = this.state.fileUrls[idx] !== null ? 'block' : 'none';
    }
    return result;
  }
  isImage(name) {
    const suffix = this.getFileSuffix(name);
    return 'jpg,jpeg,bmp,png,gif'.indexOf(suffix) !== -1;
  }
  showModal(ev, idx, isNew) {
    const ele = ev.srcElement || ev.target;
    const { onImgClick } = this.props;
    const src = onImgClick(idx, isNew, ev);
    this.setState({ modalVisible: true, imageUrl: src || ele.src }, () => {
      this.state.barDom.style.display = 'block';
    });
  }
  hideModal() {
    this.state.barDom.style.display = 'none';
    this.setState({ modalVisible: false }, () => {
      this.setState({ imageUrl: '', imageWidth: 480 });
    });
  }

  render() {
    const { url, data, files } = this.props;
    return (
      <div className={styles['mul-upload']}>
        {
          files.map((item, idx) => {
            const dat = Object.assign({}, data, item.data ? item.data : {});
            return (
              <div className={styles['mul-upload-item']} key={idx}>
                {
                  item.label && item.label !== '' ? (
                    <p className={styles['mul-upload-label']}>
                      <span className={styles['mul-upload-desc']} title={item.label} >{item.label}</span>
                      {
                        item.name && item.editable !== false ? [
                          <Icon
                            key={`edit-${idx}`} type="edit" style={{ cursor: 'pointer', display: this.state.oldFiles[idx] ? 'inline-block' : 'none' }}
                            onClick={() => { this.handleEditClick(idx, false); }}
                          />,
                          <Icon
                            key={`back-${idx}`} type="rollback" style={{ cursor: 'pointer', display: this.state.oldFiles[idx] ? 'none' : 'inline-block' }}
                            onClick={() => { this.handleEditClick(idx, true); }}
                          />,
                        ] : null
                      }
                    </p>
                  ) : null
                }
                <div className={styles['mul-upload-file']} title={this.getFileName(idx)}>
                  <Upload
                    action={url} data={dat} multiple={false} beforeUpload={(file) => { return this.handleBeforeUpload(file); }}
                    onChange={(file, list, ev) => { this.handleUploadChange(idx, file, list, ev) }}
                    fileList={this.state.fileList[idx]}
                  >
                    <Icon type="plus" style={{ display: this.displayStandby(idx) }} />
                    <p className={styles['mul-upload-info']} style={{ display: this.displayError(idx), color: '#ff6600' }}><Icon type="exclamation-circle-o" />{uploadMap.uploadFail}</p>
                  </Upload>
                  <div className={styles['mul-upload-mask']} style={{ display: this.displayUploading(idx) }}>
                    <Icon type="loading" />
                    <p className={styles['mul-upload-info']}>{uploadMap.uploading}</p>
                  </div>
                  <div className={styles['mul-upload-mask']} style={{ display: this.displayDone(idx) }}>
                    <div style={{ display: this.displayImg(idx) === 'none' ? 'block' : 'none' }}>
                      <Icon type="file" />
                    </div>
                    <img style={{ display: this.displayImg(idx) }} src={this.getImgUrl(idx)} onClick={(ev) => { this.showModal(ev, idx, true) }} role="presentation" />
                    <p className={styles['mul-upload-info']}><Icon type="check-circle-o" />{uploadMap.uploadFin}</p>
                  </div>
                  {
                    this.state.oldFiles[idx] ?
                      <div className={styles['mul-upload-mask']} style={{ cursor: 'default' }} title={item.name}>
                        {
                          this.isImage(item.name) ? <img src={item.url} onClick={(ev) => { this.showModal(ev, idx, false); }} role="presentation" /> :
                          <div><a href={item.url || 'javascript:void(0);'}><Icon type="file" /></a></div>
                        }
                      </div> : null
                  }
                </div>
              </div>
            );
          })
        }
        <Modal
          width={this.state.imageWidth} style={{ textAlign: 'center' }}
          visible={this.state.modalVisible} footer={null} onCancel={this.hideModal.bind(this)}
        >
          <img src={this.state.imageUrl} className={styles['mul-upload-image']} role="presentation" />
        </Modal>
      </div>
    );
  }
}

const noop = () => {};
MulUpload.propTypes = {
  url: PropTypes.string,
  type: PropTypes.number,
  reset: PropTypes.bool,
  data: PropTypes.object,
  suffixes: PropTypes.array,
  files: PropTypes.array,
  onImgClick: PropTypes.func,
  uploadDoneCallback: PropTypes.func,
  uploadRemoveCallback: PropTypes.func,
  uploadErrorCallback: PropTypes.func,
};
MulUpload.defaultProps = {
  url: '',
  type: 2,
  reset: false,
  data: {},
  suffixes: [],
  files: [],
  onImgClick: noop,
  uploadDoneCallback: noop,
  uploadRemoveCallback: noop,
  uploadErrorCallback: noop,
};

export default MulUpload;
