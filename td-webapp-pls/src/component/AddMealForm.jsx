import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Row, Col, Select, Upload, Icon, Modal, DatePicker } from 'antd'; // eslint-disable-line
import { bizMap } from '../utils/i18n';
import * as services from '../services/PackageList';

const bMap = bizMap('PackageList');
const FormItem = Form.Item; // eslint-disable-line
const { Option } = Select;
const { RangePicker } = DatePicker;

/*
  "smartPOS":"智能POS",
  "cajas":"收银终端",
*/

const LevelA = () => '';
LevelA.propTypes = {
  smartPOSList: PropTypes.array,
};
LevelA.defaultProps = {
  smartPOSList: [],
};

const LevelB = (props) => {
  const formItemLayout = {
    labelCol: {
      xs: { span: 23 },
      sm: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 23 },
      sm: { span: 16 },
    },
  };
  return (
    <Col>
      <FormItem label={bMap.smartPOS} {...formItemLayout} >
        {/* 智能pos */}
        <Select
          getPopupContainer={() => document.getElementById('mealForm')}
          onChange={
            (value) => {
              props.updataState({
                pakTermPosId: value,
              });
            }
          }
        >
          {
            props.smartPOSList.map(item =>
              <Option key={item.terModId} value={item.terModId}> { `${item.copNam}/${item.terModNo}` } </Option>)
          }
        </Select>
      </FormItem>
    </Col>
  );
};
LevelB.propTypes = {
  smartPOSList: PropTypes.array,
  updataState: PropTypes.func,
};
LevelB.defaultProps = {
  smartPOSList: [],
  updataState: () => undefined,
};

const LevelC = (props) => {
  const formItemLayout1 = {
    labelCol: {
      xs: { span: 23 },
      sm: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 23 },
      sm: { span: 16 },
    },
  };
  const formItemLayout2 = {
    labelCol: {
      xs: { span: 23 },
      sm: { span: 11 },
    },
    wrapperCol: {
      xs: { span: 23 },
      sm: { span: 12 },
    },
  };
  /*
terTyp
  */
  return (
    <Col>
      <FormItem label={bMap.smartPOS} {...formItemLayout1} >
        {/* 智能pos */}
        <Select
          getPopupContainer={() => document.getElementById('mealForm')}
          onChange={
            (value) => {
              props.updataState({
                pakTermPosId: value,
              });
            }
          }
        >
          {
            props.smartPOSList.map(item =>
              <Option key={item.terModId} value={item.terModId}> { `${item.copNam}/${item.terModNo}` } </Option>)
          }
        </Select>
      </FormItem>
      <FormItem label={bMap.cajas} {...formItemLayout2} >
        {/* 收银终端 */}
        <Select
          getPopupContainer={() => document.getElementById('mealForm')}
          onChange={
            (value) => {
              props.updataState({
                pakTermPayId: value,
              });
            }
          }
        >
          {props.cajasList.map(item =>
            <Option key={item.terModId} value={item.terModId}> { `${item.copNam}/${item.terModNo}` } </Option>)}
        </Select>
      </FormItem>
    </Col>
  );
};
LevelC.propTypes = {
  smartPOSList: PropTypes.array,
  cajasList: PropTypes.array,
  updataState: PropTypes.func,
};
LevelC.defaultProps = {
  smartPOSList: [],
  cajasList: [],
  updataState: () => undefined,
};


class AddMealForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      level: null,
      activityList: [],
      discountTime: 0,
      activityMap: {},
      defaultValue: null,

      previewVisible: false,
      previewImage: '',
      fileList: [],

      smartPOSList: [],
      cajasList: [],
    };
  }
  componentWillMount() {
    services.getSmartPOSList({
      terTyp: '01',
    }).then((result) => {
      if ('data' in result && 'rspCod' in result.data) {
        const { rspCod, rspList } = result.data;
        switch (rspCod) {
          case '200': this.setState({ smartPOSList: rspList }); break;
          case '_SSO_ERR': window.infoBus.$emit('relogin'); break;
          default: break;
        }
      }
    });
    services.getCajasList({
      terTyp: '02',
    }).then((result) => {
      if ('data' in result && 'rspCod' in result.data) {
        const { rspCod, rspList } = result.data;
        switch (rspCod) {
          case '200': this.setState({ cajasList: rspList }); break;
          case '_SSO_ERR': window.infoBus.$emit('relogin'); break;
          default: break;
        }
      }
    });
  }
  handleCancel() {
    this.setState({ previewVisible: false });
  }
  handlePreview(file) {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  handleChange(params) {
    const { fileList } = params;
    this.setState({ fileList });
  }
  handleUpload({ file }) {
    console.log(file);
    services.uploadLogo({
      LX: 'pic',
      ORDERNUM: 1,
      TABLENAME: 'package_inf',
      file,
    }).then((result) => {
      services.getLogoBase64({
        PKID: result.data.FJID_pic_1,
        TABLENAME: 'package_inf',
        attachInfoModalVisible: true,
      }).then((img) => {
        if ('data' in img && 'rspData' in img.data) {
          this.setState({
            fileList: [
              {
                uid: `${result.data.FJID_pic_1}`,
                name: `${result.data.FJNAME_pic_1}`,
                status: 'done',
                url: `data:image/png;base64,${img.data.rspData.FJSRC_pic_1}`,
              },
            ],
          });
        }
      });
      this.props.updataState({
        pakLogoUrl: result.data.FJID_pic_1,
      });
    });
  }
  render() {
    const PicturesWall = () => {
      const { previewVisible, previewImage, fileList } = this.state;
      const uploadButton = (
        <Button
          className="upload-demo-start"
          type="primary"
        >
          <Icon type="plus" /> Select File
        </Button>
      );
      return (
        <div className="clearfix">
          <Upload
            customRequest={this.handleUpload.bind(this)}
            listType="picture-card"
            fileList={fileList}
            onPreview={this.handlePreview.bind(this)}
            onChange={this.handleChange.bind(this)}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </div>
      );
    };
    const formItemLayout = {
      labelCol: {
        xs: { span: 23 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 23 },
        sm: { span: 18 },
      },
    };
    let SubItem;
    switch (this.state.level) {
      case 'B':
        SubItem = LevelB;
        break;
      case 'C':
        SubItem = LevelC;
        break;
      default:
        SubItem = LevelA;
        break;
    }
    return (
      <Form id="mealForm" >
        <Row>
          <Col>
            <FormItem label={bMap.name} {...formItemLayout} >
              <Input
                type="text"
                onChange={
                  (event) => {
                    this.props.updataState({
                      papName: event.target.value,
                    });
                }
              }
              />
            </FormItem>
          </Col>
          <Col>
            <FormItem label={bMap.logo} {...formItemLayout} >
              <PicturesWall />
            </FormItem>
          </Col>
          <Col>
            <FormItem label={bMap.type} {...formItemLayout} >
              <Select
                onChange={
                  (value) => {
                    this.props.updataState({
                      pkiName: value,
                    });
                  }
                }
                getPopupContainer={() => document.getElementById('mealForm')}
              >
                {
                  this.props.typeList.map(item =>
                    (
                      <Option
                        value={item.pkiName}
                        key={item.pkiId}
                      >
                        {item.pkiName}
                      </Option>
                    ))
                }
              </Select>
            </FormItem>
          </Col>
          <Col>
            <FormItem label={bMap.level} {...formItemLayout} >
              <Select
                getPopupContainer={() => document.getElementById('mealForm')}
                onChange={
                  (value) => {
                    this.props.updataState({
                      pacCode: value,
                    });
                    this.setState({
                      level: value,
                      discountTime: 0,
                      defaultValue: null,
                    });
                    services.getFavourableActivity({
                      papClass: value,
                    })
                    .then((result) => {
                      if ('data' in result && 'rspCod' in result.data) {
                        if (result.data.rspCod === '_SSO_ERR') {
                          window.infoBus.$emit('relogin');
                        } else if (result.data.rspList instanceof Array) {
                          const activityMap = {};
                          const activityList =
                          result.data.rspList.map(({ papProText, papProDisMon, papId }) => {
                              activityMap[papId] = papProDisMon;
                              return {
                                  papProText,
                                  papProDisMon,
                                  papId,
                               };
                              });
                          this.setState({
                            activityList,
                            activityMap,
                          });
                          }
                      }
                    });
                  }
                }
              >
                {
                    this.props.levelList.map(item =>
                      <Option value={item.pacCode} key={item.pacName}>{item.pacName}</Option>)
                }
              </Select>
            </FormItem>
          </Col>
          <SubItem
            smartPOSList={this.state.smartPOSList}
            cajasList={this.state.cajasList}
            updataState={this.props.updataState}
          />
          <Col>
            <FormItem label={bMap.monthlyOriginalPrice} {...formItemLayout} >
              <Input
                type="text"
                onChange={
                  (event) => {
                    this.props.updataState({
                      pakPriceMon: event.target.value,
                    });
                }}
              />
            </FormItem>
          </Col>
          <Col>
            <FormItem label={bMap.monthlyCurrentPrice} {...formItemLayout} >
              <Input
                type="text"
                onChange={
                (event) => {
                  this.props.updataState({
                    pakPriceDisMon: event.target.value,
                  });
              }}
              />
            </FormItem>
          </Col>
          <Col>
            <FormItem label={bMap.offer} {...formItemLayout}>
              <Select
                value={this.state.defaultValue}
                getPopupContainer={() => document.getElementById('mealForm')}
                onChange={
                  (value) => {
                    this.setState({
                      discountTime: this.state.activityMap[value],
                      defaultValue: value,
                    });
                    this.props.updataState({
                      pakNewPropId: value,
                    });
                  }
                }
              >
                {this.state.activityList.map(item =>
                  <Option key={item.papId} value={item.papId}>{item.papProText}</Option>)
                }
              </Select>
              <span>{ bMap.timeText.replace('[d]', this.state.discountTime)}</span>
            </FormItem>
          </Col>
          <Col>
            <FormItem label={bMap.usefulLife} {...formItemLayout}>
              <Select
                getPopupContainer={() => document.getElementById('mealForm')}
                onChange={(termType) => {
                  this.props.updataState({
                    timeRange: {
                      startTime: null,
                      endTime: null,
                    },
                  });
                  this.setState({
                    termType,
                  });
                }
                }
              >
                {
                  [
                    <Option key={1} value="long"> { bMap.longTerm } </Option>,
                    <Option key={2} value="short"> { bMap.shortTerm } </Option>,
                  ]
                }
              </Select>
            </FormItem>
          </Col>
          {
            this.state.termType === 'short' ?
              <FormItem label={bMap.setUsefulLife} {...formItemLayout}>
                <RangePicker
                  onChange={(timeDateArr, timeStrArr) =>
                    this.props.updataState({
                      timeRange: {
                        startTime: timeStrArr[0],
                        endTime: timeStrArr[1],
                      },
                    })
                  }
                />
              </FormItem>
            : ''
          }
        </Row>
      </Form>
    );
  }
}

AddMealForm.propTypes = {
  typeList: PropTypes.array,
  levelList: PropTypes.array,
  updataState: PropTypes.func,
};

AddMealForm.defaultProps = {
  typeList: [],
  levelList: [],
  updataState: () => undefined,
};

export default Form.create()(AddMealForm);
