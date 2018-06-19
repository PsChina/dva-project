import React, {PropTypes} from 'react';
import moment from 'moment';
import {Form, Input, Button, Row, Col, Spin, Select, TimePicker, Icon, Switch} from 'antd';
import * as i18n from '../../../../utils/i18n';
import {codeValid, mobileValid, phoneValid} from '../../../../utils/vaild';
import * as pattern from '../../../../utils/pattern';
import {standUnitToMinUnit, amtMinUnitToStandUnit} from '../../../../utils/amount';
import PicturesWall from './PicturesWall';
// mark
const noop = () => {
};
const FormItem = Form.Item;
const Option = Select.Option;

const ChannelScancodeInfoForm = (props) => {
  let picId = "";
  const {
    form, data, style, loading, submiting, formSubmit, advLinkClick, advExpand, getChnInfo, bankList, bankNo, optType,
    uploadLogo, getBase64Logo, fileList
  } = props;
  const {getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields, setFieldsValue} = form;

  // const dateFormat = 'YYYY-MM-DD';
  const bizMap = i18n.bizMap('pms/channelScancode');
  const commonMap = i18n.commonMap();
  const validMap = i18n.bizMap('pms/channelScancodeValid');
  const ccyValidMap = i18n.bizMap('pattern');
  const currencyList = i18n.bizMap('currency');
  const ccyMap = i18n.bizMap('currencyMap');
  const ccy = ccyMap[data.ccy] || ccyMap.DEFAULT;
  const defaultCcy = ccyMap[data.ccy] || ccyMap.DEFAULT_CCY;

  const formItemLayout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
  };
  const formItemLayout2 = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
  };
  const numberProps = {
    style: {width: '100%'},
    min: 0,
    step: 0.01,
  }

  const countNumberProps = {
    style: {width: '100%'},
    min: 0,
    step: 1,
  }

  const picturesWallProps = {
    uploadLogo,
    getBase64Logo,
    fileList,
  }

  // 图片上传回传
  const testDoneCallback = (idx, file) => {
    const dat = getFieldsValue();
    if (file.length > 0) {
      dat.FJID_PIC_1 = file[0].uid;
      picId = file[0].uid;
    } else {
      dat.FJID_PIC_1 = '';
      picId = '';
    }
  }

  const format = 'HH:mm';
  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        dat.FJID_PIC_1 = picId;
        if (typeof (dat.scanType) !== 'string') {
          dat.scanType = dat.scanType.join(',');
        }
        if (dat.dayCutTim._i) {
          dat.dayCutTim = dat.dayCutTim._i;
        }
        if (typeof (dat.txnChannelSupport) !== 'string') {
          dat.txnChannelSupport = dat.txnChannelSupport.join(',');
        }
        if (typeof (dat.currencySupport) !== 'string') {
          dat.currencySupport = dat.currencySupport.join(',');
        }
        if (dat.singleDayLimit) {
          dat.singleDayLimit = standUnitToMinUnit(dat.singleDayLimit, defaultCcy);
        } else {
          dat.singleDayLimit = '0';
        }
        if (dat.singleMonthLimit) {
          dat.singleMonthLimit = standUnitToMinUnit(dat.singleMonthLimit, defaultCcy);
        } else {
          dat.singleMonthLimit = '0';
        }
        if (dat.chnName === bizMap.other) {
          dat.chnName = dat.chnNameInput;
        }
        formSubmit(dat);
        if (optType === '1') {
          resetFields();
        }
      }
    });
  };

  const newArray = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  const disabledHours = () => {
    const hours = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
    return hours;
  };

  const disabledMinutes = (h) => {
    if (h === 1) {
      return newArray(1, 60);
    } else if (h === 23 || h === 0) {
      return [];
    }
    return [];
  };
  const changeChnAlias = (value) => {
    if (value) {
      if (getFieldsValue().chnType === '0' && value === bizMap.unionPay) {
        setFieldsValue({chnAlias: 'unionPay'});
      } else if (getFieldsValue().chnType === '0' && value === bizMap.unionPayGlobal) {
        setFieldsValue({chnAlias: 'unionPayGlobal'});
      } else if (getFieldsValue().chnType === '2' && value === bizMap.alipay) {
        setFieldsValue({chnAlias: 'alipay'});
      } else if (getFieldsValue().chnType === '2' && value === bizMap.alipayGlobal) {
        setFieldsValue({chnAlias: 'alipayGlobal'});
      } else if (getFieldsValue().chnType === '2' && value === bizMap.wechat) {
        setFieldsValue({chnAlias: 'wechat'});
      } else if (getFieldsValue().chnType === '2' && value === bizMap.wechatGlobal) {
        setFieldsValue({chnAlias: 'wechatGlobal'});
      } else if (getFieldsValue().chnType === '1' && value !== bizMap.other) {
        for (let i = 0; i < bankList.length; i++) {
          if (value === bankList[i].bankName) {
            getChnInfo(bankList[i]);
          }
        }
      } else if (value === bizMap.other) {
        setFieldsValue({chnAlias: ''});
      }
    }
  };

  const chnNameoptions = [];
  if (getFieldsValue().chnType === '0') {
    chnNameoptions.push(<Option key={'00'} value={bizMap.unionPay}>{bizMap.unionPay}</Option>);
    chnNameoptions.push(<Option key={'01'} value={bizMap.unionPayGlobal}>{bizMap.unionPayGlobal}</Option>);
  } else if (getFieldsValue().chnType === '1') {
    bankList.forEach((v) => {
      chnNameoptions.push(<Option key={v.bankNo} value={v.bankName}>{v.bankName}</Option>);
    });
  } else if (getFieldsValue().chnType === '2') {
    chnNameoptions.push(<Option key={'20'} value={bizMap.spgateway}>{bizMap.spgateway}</Option>);
    chnNameoptions.push(<Option key={'21'} value={bizMap.linePay}>{bizMap.linePay}</Option>);
    chnNameoptions.push(<Option key={'22'} value={bizMap.OPay}>{bizMap.OPay}</Option>);
    chnNameoptions.push(<Option key={'23'} value={bizMap.gamaPay}>{bizMap.gamaPay}</Option>);
  }
  chnNameoptions.push(<Option key={'other'} value={bizMap.other}>{bizMap.other}</Option>);

  const handlerDatePickerChange = (value, dateString) => {
    setFieldsValue({dayCutTim: dateString});
  };

  let chnNameValue = ''
  if (getFieldsValue().chnType === '2' && getFieldsValue().linkType === '0' && getFieldsValue().scanType === '0') {
    chnNameValue = bizMap['scanType-0']
  } else if (getFieldsValue().chnType === '2' && getFieldsValue().linkType === '0' && getFieldsValue().scanType === '1') {
    chnNameValue = bizMap['scanType-1']
  } else if (getFieldsValue().chnType === '2' && getFieldsValue().linkType === '0' && getFieldsValue().scanType === '2') {
    chnNameValue = bizMap['scanType-2']
  } else if (getFieldsValue().chnType === '2' && getFieldsValue().linkType === '0' && getFieldsValue().scanType === '3') {
    chnNameValue = bizMap['scanType-3']
  } else if (getFieldsValue().chnType === '2' && getFieldsValue().linkType === '0' && getFieldsValue().scanType === '4') {
    chnNameValue = bizMap['scanType-4']
  } else if (getFieldsValue().chnType === '2' && getFieldsValue().linkType === '0' && getFieldsValue().scanType === '5') {
    chnNameValue = bizMap['scanType-5']
  } else if (getFieldsValue().chnType === '2' && getFieldsValue().linkType === '0' && getFieldsValue().scanType === '6') {
    chnNameValue = bizMap['scanType-6']
  } else {
    chnNameValue = data.chnName
  }

  let chnAliasValue = ''
  if (getFieldsValue().chnType === '2' && getFieldsValue().linkType === '0' && getFieldsValue().scanType === '0') {
    chnAliasValue = 'wechat'
  } else if (getFieldsValue().chnType === '2' && getFieldsValue().linkType === '0' && getFieldsValue().scanType === '1') {
    chnAliasValue = 'alipay'
  } else if (getFieldsValue().chnType === '2' && getFieldsValue().linkType === '0' && getFieldsValue().scanType === '2') {
    chnAliasValue = 'baidu'
  } else if (getFieldsValue().chnType === '2' && getFieldsValue().linkType === '0' && getFieldsValue().scanType === '3') {
    chnAliasValue = 'gamapay'
  } else if (getFieldsValue().chnType === '2' && getFieldsValue().linkType === '0' && getFieldsValue().scanType === '4') {
    chnAliasValue = 'opay'
  } else if (getFieldsValue().chnType === '2' && getFieldsValue().linkType === '0' && getFieldsValue().scanType === '5') {
    chnAliasValue = 'linepay'
  } else {
    chnAliasValue = data.chnAlias
  }


  const advLimitVDom = [
    <Row key="s1">
      <Col sm={24} md={12}>
        <FormItem label={bizMap.singleDayLimit} {...formItemLayout}>
          {
            getFieldDecorator('singleDayLimit', {
              initialValue: data.singleDayLimit ? amtMinUnitToStandUnit(data.singleDayLimit, defaultCcy) : 0,
              rules: [
                {required: true, message: ccyValidMap.REQUIRED.replace(/{\w}/, bizMap.singleDayLimit)},
                {pattern: pattern.AMT, message: ccyValidMap.AMT},
              ],
            })(
              <Input {...numberProps} addonAfter={ccy}/>,
            )
          }
        </FormItem>
      </Col>
      <Col sm={24} md={12}>
        <FormItem label={bizMap.singleMonthLimit} {...formItemLayout}>
          {
            getFieldDecorator('singleMonthLimit', {
              initialValue: data.singleMonthLimit ? amtMinUnitToStandUnit(data.singleMonthLimit, defaultCcy) : 0,
              rules: [
                {required: true, message: ccyValidMap.REQUIRED.replace(/{\w}/, bizMap.singleMonthLimit)},
                {pattern: pattern.AMT, message: ccyValidMap.AMT},
              ],
            })(
              <Input {...numberProps} addonAfter={ccy}/>,
            )
          }
        </FormItem>
      </Col>
    </Row>,
    <Row key="s2">
      <Col sm={24} md={12}>
        <FormItem label={bizMap.singleDayCount} {...formItemLayout}>
          {
            getFieldDecorator('singleDayCount', {
              initialValue: data.singleDayCount ? data.singleDayCount : 0,
              rules: [
                {required: true, message: ccyValidMap.REQUIRED.replace(/{\w}/, bizMap.singleDayCount)},
                {pattern: pattern.COUNT, message: ccyValidMap.COUNT},
              ],
            })(
              <Input {...countNumberProps} addonAfter="笔"/>,
            )
          }
        </FormItem>
      </Col>
      <Col sm={24} md={12}>
        <FormItem label={bizMap.singleMonthCount} {...formItemLayout}>
          {
            getFieldDecorator('singleMonthCount', {
              initialValue: data.singleMonthCount ? data.singleMonthCount : 0,
              rules: [
                {required: true, message: ccyValidMap.REQUIRED.replace(/{\w}/, bizMap.singleMonthCount)},
                {pattern: pattern.COUNT, message: ccyValidMap.COUNT},
              ],
            })(
              <Input {...countNumberProps} addonAfter="笔"/>,
            )
          }
        </FormItem>
      </Col>
    </Row>,
  ];

  // 约定好的收款方式 value 参数
  const getTxnChannelList = [
    /*{value: '1011', label: bizMap['scanType-1']},
    {value: '1012', label: bizMap['scanType-0']},*/
    {value: '1014', label: bizMap['scanType-3']},
    {value: '1015', label: bizMap['scanType-4']},
    {value: '1016', label: bizMap['scanType-5']},
    {value: '1017', label: bizMap['scanType-6']},
  ]

  const advGlobalDom = [
    <Row key="ct1">
      <Col span={12}>
        <FormItem label={bizMap.txnChannelSupport} {...formItemLayout} hasFeedback>
          {
            getFieldDecorator('txnChannelSupport', {
              initialValue: data.txnChannelSupport ? data.txnChannelSupport.split(',') : [],
              rules: [{required: true, message: validMap.validTxnChannelSupport}],
            })(
              <Select placeholder={commonMap.select}>
                {/*multiple={getFieldsValue().linkType === '1'}*/}
                {
                  getTxnChannelList.map((item, idx) => {
                    return <Option key={idx} value={item.value}>{item.label}</Option>;
                  })
                }
              </Select>,
            )
          }
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem label={bizMap.currencySupport} {...formItemLayout} hasFeedback>
          {
            getFieldDecorator('currencySupport', {
              initialValue: data.currencySupport ? data.currencySupport.split(',') : ['TWD'],
              rules: [{required: true, message: validMap.validCurrencySupport}],
            })(
              <Select placeholder={commonMap.select} multiple>
                {
                  currencyList.map((item, idx) => {
                    return <Option key={idx} value={item.value}>{item.label}({item.value})</Option>;
                  })
                }
              </Select>,
            )
          }
        </FormItem>
      </Col>
    </Row>,
    <Row key="ct2">
      <Col span={12}>
        <FormItem label={bizMap.payRate} {...formItemLayout} hasFeedback>
          {
            getFieldDecorator('payRate', {
              initialValue: data.payRate ? data.payRate : '',
              rules: [{required: true, message: validMap.validPayRate}],
            })(
              <Input placeholder={validMap.validPayRate} maxLength="60"/>,
            )
          }
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem label={bizMap.feeLim} {...formItemLayout} hasFeedback>
          {
            getFieldDecorator('feeLim', {
              initialValue: data.feeLim ? data.feeLim : '',
              rules: [],
            })(
              <Input placeholder={validMap.validFeeLim}/>,
            )
          }
        </FormItem>
      </Col>
    </Row>,
  ]

  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" style={style} onSubmit={handleSubmit}>
        <div hidden="true">
          <FormItem label={bizMap.chnId} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('chnId', {
                initialValue: data.chnId,
              })(
                <Input placeholder={bizMap.chnId} disabled/>,
              )
            }
          </FormItem>
        </div>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.chnType} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('chnType', {
                  initialValue: data.chnType,
                  rules: [{required: true, message: validMap.validChnType}],
                })(
                  <Select placeholder={commonMap.select} disabled={optType === '2'}>
                    {/*<Option value="0">{bizMap['chnType-0']}</Option>*/}
                    <Option value="1">{bizMap['chnType-1']}</Option>
                    <Option value="2">{bizMap['chnType-2']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={commonMap.logo}  {...formItemLayout}>
              {
                getFieldDecorator('FJID_PIC_1', {
                  initialValue: data.FJID_PIC_1,
                  rules: [
                    {required: true, message: validMap.vaildLogo}
                  ]
                })(
                  <div>
                    <PicturesWall {...picturesWallProps} uploadDoneCallback={testDoneCallback.bind(this)}/>
                    <Input style={{display: 'none'}} />
                  </div>
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.chnName} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('chnName', {
                  initialValue: data.chnName,
                  rules: [{required: true, message: validMap.vaildChnName}],
                })(
                  <Select onChange={changeChnAlias} showSearch disabled={optType === '2'}>
                    {chnNameoptions}
                  </Select>,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={' '} {...formItemLayout} hasFeedback>
              {
                getFieldsValue().chnName === bizMap.other ?
                  getFieldDecorator('chnNameInput', {
                    initialValue: data.chnName,
                    rules: [{required: true, message: validMap.vaildChnName}],
                  })(
                    <Input placeholder={bizMap.chnName} maxLength="50" disabled={optType === '2'}/>,
                  )
                  :
                  null
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.chnAlias} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('chnAlias', {
                  //initialValue: chnAliasValue,
                  initialValue: data.chnAlias,
                  rules: [{required: true, message: validMap['validChnAlias-1']}, {validator: codeValid}],
                  validateTrigger: 'onBlur',
                })(
                  <Input placeholder={validMap['validChnAlias-0']} disabled={optType === '2'}/>,
                )
              }
            </FormItem>
          </Col>
          <Col span={12} style={{display: getFieldsValue().chnType === '1' ? '' : 'none'}}>
            <FormItem label={bizMap.bankRelNo} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('bankRelNo', {
                  initialValue: bankNo === '' ? data.bankRelNo : bankNo,
                })(
                  <Input placeholder={validMap.validBankRelNo} maxLength="30" disabled={optType === '2'}/>,
                )
              }
            </FormItem>
          </Col>
          <Col span={12} style={{display: getFieldsValue().chnType === '2' ? '' : 'none'}}>
            <FormItem label={bizMap.chnCertNo} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('chnCertNo', {
                  initialValue: data.chnCertNo ? data.chnCertNo : '',
                })(
                  <Input placeholder={validMap.validChnCertNo} maxLength="30" disabled={optType === '2'}/>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{display: getFieldsValue().chnType === '2' ? '' : 'none'}}>
            <FormItem label={bizMap.linkType} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('linkType', {
                  initialValue: data.linkType ? data.linkType : '1',
                  rules: [{required: true, message: validMap.validLinkType}],
                })(
                  <Select>
                    <Option value="0">{bizMap['linkType-0']}</Option>
                    <Option value="1">{bizMap['linkType-1']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col sm={24} md={12}>
            <FormItem {...formItemLayout} label={bizMap.scanType} hasFeedback>
              {
                getFieldDecorator('scanType', {
                  initialValue: data.scanType ? data.scanType.split(',') : [],
                  rules: [{required: true, message: validMap.validChnType}],
                })(
                  <Select placeholder={commonMap.select}>
                    {/*mode={(getFieldsValue().chnType === '2' && getFieldsValue().linkType === '0') || (data.chnType === '2' && data.linkType === '0') ? '' : 'multiple'}
                    <Option value="0">{bizMap['scanType-0']}</Option>
                    <Option value="1">{bizMap['scanType-1']}</Option>
                    <Option value="2">{bizMap['scanType-2']}</Option>*/}
                    <Option value="3">{bizMap['scanType-3']}</Option>
                    <Option value="4">{bizMap['scanType-4']}</Option>
                    <Option value="5">{bizMap['scanType-5']}</Option>
                    <Option value="6">{bizMap['scanType-6']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
          <Col sm={24} md={12}>
            <FormItem {...formItemLayout} label={bizMap.reverseScanning} hasFeedback>
              {
                getFieldDecorator('codepaySupport', {
                  initialValue: data.codepaySupport ? data.codepaySupport : '0',
                  rules: [{required: true}],
                })(
                  <Select>
                    <Option value="0">{commonMap['check-0']}</Option>
                    <Option value="1">{commonMap['check-1']}</Option>
                  </Select>
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.dayCutTim} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('dayCutTim', {
                  initialValue: moment(data.dayCutTim ? data.dayCutTim : '23:00', format),
                  rules: [{required: true, message: validMap.vaildDayCutTim}],
                })(
                  <TimePicker
                    format={format}
                    onChange={handlerDatePickerChange}
                    disabledHours={disabledHours}
                    disabledMinutes={disabledMinutes}
                  />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.needCheck} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('needCheck', {
                  initialValue: data.needCheck ? data.needCheck : '0',
                  rules: [{required: true, message: validMap.vaildNeeCheck}],
                })(
                  <Select>
                    <Option value="0">{commonMap['check-0']}</Option>
                    <Option value="1">{commonMap['check-1']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.hessianUrl} {...formItemLayout2} hasFeedback>
              {
                getFieldDecorator('hessianUrl', {
                  initialValue: data.hessianUrl,
                  rules: [{required: true, message: validMap.validHessianUrl}],
                  validateTrigger: 'onBlur',
                })(
                  <Input placeholder={validMap.validHessianUrl}/>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <h4 className="split">&nbsp;</h4>
        {advGlobalDom}
        <h4 className="split">&nbsp;</h4>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.chnConter} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('chnConter', {
                  initialValue: data.chnConter,
                  rules: [{required: true, message: validMap.validChnConter}],
                  validateTrigger: 'onBlur',
                })(
                  <Input placeholder={validMap.validChnConter}/>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.chnMobile} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('chnMobile', {
                  initialValue: data.chnMobile,
                  rules: [{required: true, message: validMap.validChnMobile}, {validator: mobileValid}],
                  validateTrigger: 'onBlur',
                })(
                  <Input placeholder={validMap.validChnMobile}/>,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.chnPhone} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('chnPhone', {
                  initialValue: data.chnPhone,
                  rules: [{validator: phoneValid}],
                  validateTrigger: 'onBlur',
                })(
                  <Input placeholder={validMap.validChnPhone}/>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.chnAddr} {...formItemLayout2} hasFeedback>
              {
                getFieldDecorator('chnAddr', {
                  initialValue: data.chnAddr,
                })(
                  <Input type="textarea" placeholder={validMap.validChnAddr}/>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <h4 className="split">&nbsp;</h4>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.limitInfo} {...formItemLayout} hasFeedback>
              <a
                onClick={() => {
                  advLinkClick();
                }}
              >
                {advExpand ? bizMap['limitInfo-0'] : bizMap['limitInfo-1']}
                &nbsp;
                <Icon type={advExpand ? 'caret-up' : 'caret-down'}/>
              </a>
            </FormItem>
          </Col>
        </Row>
        {advExpand ? advLimitVDom : null}
        <h4 key="btn-split" className="split">&nbsp;</h4>
        <Row key="btn-row">
          <Col span={24} style={{textAlign: 'center'}}>
            <Button type="primary" htmlType="submit" loading={submiting}>{commonMap.submit}</Button>
            {/*<Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>*/}
          </Col>
        </Row>
      </Form>
    </Spin>
  );
}

ChannelScancodeInfoForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
  advLinkClick: PropTypes.func,
  advExpand: PropTypes.bool,
  getChnInfo: PropTypes.func,
  optType: PropTypes.string,
  bankList: PropTypes.array,
  bankNo: PropTypes.string,
  uploadLogo: PropTypes.func,
  getBase64Logo: PropTypes.func,
  fileList: PropTypes.array,
};

ChannelScancodeInfoForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
  advLinkClick: noop,
  advExpand: false,
  getChnInfo: noop,
  optType: '1', // 1,添加 2,修改
  bankList: [],
  bankNo: '',
  uploadLogo: noop,
  getBase64Logo: noop,
  fileList: [],
};

export default Form.create()(ChannelScancodeInfoForm);
