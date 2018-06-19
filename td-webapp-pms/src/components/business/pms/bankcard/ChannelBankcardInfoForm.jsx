import React, { PropTypes } from 'react';
import moment from 'moment';
import { Form, Input, Button, Row, Col, Spin, Select, TimePicker, Icon } from 'antd';
import * as i18n from '../../../../utils/i18n';
import { codeValid, mobileValid, phoneValid } from '../../../../utils/vaild';
import * as pattern from '../../../../utils/pattern';
import { standUnitToMinUnit, amtMinUnitToStandUnit } from '../../../../utils/amount';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;

const ChannelBankcardInfoForm = (props) => {
  const {
    form, data, style, loading, submiting, formSubmit, advLinkClick, advExpand, handleTxnSup, pospayTxnSup, checkChnName,
    chnNameChkMsg, optType, getChnInfo, bankList, bankNo,
   } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields, setFieldsValue } = form;
  const bizMap = i18n.bizMap('pms/channelBankcard');
  const currencyList = i18n.bizMap('currency');
  const commonMap = i18n.commonMap();
  const validMap = i18n.bizMap('pms/channelBankcardValid');
  const ccyValidMap = i18n.bizMap('pattern');
  const ccyMap = i18n.bizMap('currencyMap');
  const ccy = ccyMap[data.ccy] || ccyMap.DEFAULT;
  const defaultCcy = ccyMap[data.ccy] || ccyMap.DEFAULT_CCY;
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const formItemLayout2 = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  const numberProps = {
    style: { width: '100%' },
    min: 0,
    step: 0.01,
  }

  const countNumberProps = {
    style: { width: '100%' },
    min: 0,
    step: 1,
  }
  const format = 'HH:mm';
  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        if (dat.dayCutTim._i) {
          dat.dayCutTim = dat.dayCutTim._i;
        }
        if (dat.txnChannelSupport) {
          dat.txnChannelSupport = dat.txnChannelSupport.toString();
        }
        if (dat.currencySupport) {
          dat.currencySupport = dat.currencySupport.toString();
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

  const handleReset = () => {
    resetFields();
  }

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

  const handlerDatePickerChange = (value, dateString) => {
    setFieldsValue({ dayCutTim: dateString });
  };

  // const chnNameValid = (rule, value, callback) => {
  //   if (!value) {
  //     callback(validMap.validChnName);
  //   } else {
  //     checkChnName(value);
  //     if (chnNameChkMsg) {
  //       callback(chnNameChkMsg);
  //     }
  //     callback();
  //   }
  // }

  const chnAliasValid = (rule, value, callback) => {
    if (!value) {
      callback(validMap['validChnAlias-1']);
    } else {
      checkChnName(value);
      if (chnNameChkMsg) {
        callback(chnNameChkMsg);
      }
      callback();
    }
  }

  const changeChnAlias = (value) => {
    if (value) {
      if (getFieldsValue().chnType === '0' && value === bizMap.unionPay) {
        setFieldsValue({ chnAlias: 'unionPay' });
      } else if (getFieldsValue().chnType === '0' && value === bizMap.unionPayGlobal) {
        setFieldsValue({ chnAlias: 'unionPayGlobal' });
      } else if (getFieldsValue().chnType === '2' && value === bizMap.alipay) {
        setFieldsValue({ chnAlias: 'alipay' });
      } else if (getFieldsValue().chnType === '2' && value === bizMap.alipayGlobal) {
        setFieldsValue({ chnAlias: 'alipayGlobal' });
      } else if (getFieldsValue().chnType === '2' && value === bizMap.wechat) {
        setFieldsValue({ chnAlias: 'wechat' });
      } else if (getFieldsValue().chnType === '2' && value === bizMap.wechatGlobal) {
        setFieldsValue({ chnAlias: 'wechatGlobal' });
      } else if (getFieldsValue().chnType === '1' && value !== bizMap.other) {
        for (let i = 0; i < bankList.length; i++) {
          if (value === bankList[i].bankName) {
            getChnInfo(bankList[i]);
          }
        }
      } else if (value === bizMap.other) {
        setFieldsValue({ chnAlias: '' });
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

  const getTxnChannelList = [
    { value: '0001', label: bizMap.unionPay },
    { value: '0002', label: 'Visa' },
    { value: '0003', label: 'MasterCard' },
    // { value: '1011', label: '支付宝' },
    // { value: '1012', label: '微信' },
  ]

  const advGlobalDom = [
    <Row key="ct1">
      <Col span={12}>
        <FormItem label={bizMap.txnChannelSupport} {...formItemLayout} hasFeedback>
          {
            getFieldDecorator('txnChannelSupport', {
              initialValue: data.txnChannelSupport ? data.txnChannelSupport.split(',') : [],
              rules: [{ required: true, message: validMap.validTxnChannelSupport }],
            })(
              <Select placeholder={commonMap.select} multiple>
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
              rules: [{ required: true, message: validMap.validCurrencySupport }],
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
              rules: [{ required: true, message: validMap.validPayRate }],
            })(
              <Input placeholder={validMap.validPayRate} maxLength="60" />,
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
              <Input placeholder={validMap.validFeeLim} />,
            )
          }
        </FormItem>
      </Col>
    </Row>,
  ]

  const advConnectVDom = [
    <Row key="c1">
      <Col span={12}>
        <FormItem label={bizMap.chnConter} {...formItemLayout} hasFeedback>
          {
            getFieldDecorator('chnConter', {
              initialValue: data.chnConter ? data.chnConter : '',
              rules: [{ required: true, message: validMap.validChnConter }],
              validateTrigger: 'onBlur',
            })(
              <Input placeholder={validMap.validChnConter} maxLength="60" />,
            )
          }
        </FormItem>
      </Col>
    </Row>,
    <Row key="c2">
      <Col span={12}>
        <FormItem label={bizMap.chnMobile} {...formItemLayout} hasFeedback>
          {
            getFieldDecorator('chnMobile', {
              initialValue: data.chnMobile ? data.chnMobile : '',
              rules: [{ required: true, message: validMap.validChnMobile }, { validator: mobileValid }],
              validateTrigger: 'onBlur',
            })(
              <Input placeholder={validMap.validChnMobile} maxLength="60" />,
            )
          }
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem label={bizMap.chnPhone} {...formItemLayout} hasFeedback>
          {
            getFieldDecorator('chnPhone', {
              initialValue: data.chnPhone ? data.chnPhone : '',
              rules: [{ validator: phoneValid }],
              validateTrigger: 'onBlur',
            })(
              <Input placeholder={validMap.validChnPhone} maxLength="60" />,
            )
          }
        </FormItem>
      </Col>
    </Row>,
    <Row key="c3">
      <Col span={24}>
        <FormItem label={bizMap.chnAddr} {...formItemLayout2} hasFeedback>
          {
            getFieldDecorator('chnAddr', {
              initialValue: data.chnAddr ? data.chnAddr : '',
            })(
              <Input type="textarea" placeholder={validMap.validChnAddr} maxLength="150" />,
            )
          }
        </FormItem>
      </Col>
    </Row>,
  ];

  const advLimitToggleVDom = [
    <Row key="lt1">
      <Col span={12}>
        <FormItem label={bizMap.limitInfo} {...formItemLayout} hasFeedback>
          <a
            onClick={() => {
              advLinkClick();
            }}
          >
            {advExpand ? bizMap['limitInfo-0'] : bizMap['limitInfo-1']}
            &nbsp;
            <Icon type={advExpand ? 'caret-up' : 'caret-down'} />
          </a>
        </FormItem>
      </Col>
    </Row>,
  ];
  const advLimitVDom = [
    <Row key="s1">
      <Col sm={24} md={12}>
        <FormItem label={bizMap.singleDayLimit} {...formItemLayout}>
          {
            getFieldDecorator('singleDayLimit', {
              initialValue: data.singleDayLimit ? amtMinUnitToStandUnit(data.singleDayLimit, defaultCcy) : 0,
              rules: [
                { required: true, message: ccyValidMap.REQUIRED.replace(/{\w}/, bizMap.singleDayLimit) },
                { pattern: pattern.AMT, message: ccyValidMap.AMT },
              ],
            })(
              <Input {...numberProps} addonAfter={ccy} />,
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
                { required: true, message: ccyValidMap.REQUIRED.replace(/{\w}/, bizMap.singleMonthLimit) },
                { pattern: pattern.AMT, message: ccyValidMap.AMT },
              ],
            })(
              <Input {...numberProps} addonAfter={ccy} />,
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
                { required: true, message: ccyValidMap.REQUIRED.replace(/{\w}/, bizMap.singleDayCount) },
                { pattern: pattern.COUNT, message: ccyValidMap.COUNT },
              ],
            })(
              <Input {...countNumberProps} addonAfter="笔" />,
            )
          }
        </FormItem>
      </Col>
      <Col sm={24} md={12}>
        {/*<FormItem label={bizMap.singleMonthCount} {...formItemLayout} hasFeedback>
          {
            getFieldDecorator('singleMonthCount', {
              initialValue: data.singleMonthCount ? data.singleMonthCount : '0',
            })(
              <InputNumber min={0} max={999999999} step={1000.00} style={{ width: '70%' }} maxLength="9" />,
            )
          }
        </FormItem>*/}
        <FormItem label={bizMap.singleMonthCount} {...formItemLayout}>
          {
            getFieldDecorator('singleMonthCount', {
              initialValue: data.singleMonthCount ? data.singleMonthCount : 0,
              rules: [
                { required: true, message: ccyValidMap.REQUIRED.replace(/{\w}/, bizMap.singleMonthCount) },
                { pattern: pattern.COUNT, message: ccyValidMap.COUNT },
              ],
            })(
              <Input {...countNumberProps} addonAfter="笔" />,
            )
          }
        </FormItem>
      </Col>
    </Row>,
  ];
  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" style={style} onSubmit={handleSubmit}>
        <div key="b0" hidden="true">
          <FormItem label={bizMap.chnId} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('chnId', {
                initialValue: data.chnId ? data.chnId : '',
              })(
                <Input placeholder={bizMap.chnId} disabled />,
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
                  rules: [{ required: true, message: validMap.validChnType }],
                })(
                  <Select placeholder={commonMap.select} disabled={optType === '2'} >
                    {/*<Option key={0} value="0">{bizMap['chnType-0']}</Option>*/}
                    <Option key={1} value="1">{bizMap['chnType-1']}</Option>
                    <Option key={2} value="2">{bizMap['chnType-2']}</Option>
                  </Select>,
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
                  rules: [{ required: true, message: validMap.vaildChnName }],
                })(
                  <Select onChange={changeChnAlias} showSearch disabled={optType === '2'} >
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
                    rules: [{ required: true, message: validMap.vaildChnName }],
                  })(
                    <Input placeholder={bizMap.chnName} maxLength="50" disabled={optType === '2'} />,
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
                  initialValue: data.chnAlias,
                  rules: [{ required: true, validator: chnAliasValid }, { validator: codeValid }],
                  validateTrigger: 'onBlur',
                })(
                  <Input placeholder={validMap['validChnAlias-0']} maxLength="50" disabled={optType === '2'} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12} style={{ display: getFieldsValue().chnType === '1' ? '' : 'none' }}>
            <FormItem label={bizMap.bankRelNo} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('bankRelNo', {
                  initialValue: bankNo === '' ? data.bankRelNo : bankNo,
                })(
                  <Input placeholder={validMap.validBankRelNo} maxLength="30" disabled={optType === '2'} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12} style={{ display: getFieldsValue().chnType === '2' ? '' : 'none' }}>
            <FormItem label={bizMap.chnCertNo} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('chnCertNo', {
                  initialValue: data.chnCertNo ? data.chnCertNo : '',
                })(
                  <Input placeholder={validMap.validChnCertNo} maxLength="30" disabled={optType === '2'} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        {
          optType === '2' ? null :
            <Row>
              <Col span={12}>
                <FormItem label={bizMap.pospayTxnSup} {...formItemLayout} hasFeedback>
                  <div hidden="true">
                    {
                      getFieldDecorator('pospayTxnSup', {
                        initialValue: pospayTxnSup,
                      })(
                        <Input />,
                      )
                    }
                  </div>
                  <a onClick={() => { handleTxnSup(); }}>{bizMap.pospayTxnSup}</a>
                </FormItem>
              </Col>
            </Row>
        }
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.dayCutTim} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('dayCutTim', {
                  initialValue: moment(data.dayCutTim ? data.dayCutTim : '23:00', format),
                  rules: [{ required: true, message: validMap.validDayCutTim }],
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
                  rules: [{ required: true, message: validMap.validNeedCheck }],
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
                  rules: [{ required: true, message: validMap.validHessianUrl }],
                  validateTrigger: 'onBlur',
                })(
                  <Input placeholder={validMap.validHessianUrl} maxLength="200" />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <h4 className="split">&nbsp;</h4>
        {advGlobalDom}
        <h4 className="split">&nbsp;</h4>
        {advConnectVDom}
        <h4 className="split">&nbsp;</h4>
        {advLimitToggleVDom}
        {advExpand ? advLimitVDom : null}
        <h4 key="btn-split" className="split">&nbsp;</h4>
        <Row key="btn-row">
          <Col span={24} style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit" loading={submiting}>{commonMap.submit}</Button>
            <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
}

ChannelBankcardInfoForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
  advLinkClick: PropTypes.func,
  advExpand: PropTypes.bool,
  handleTxnSup: PropTypes.func,
  pospayTxnSup: PropTypes.string,
  checkChnName: PropTypes.func,
  chnNameChkMsg: PropTypes.string,
  optType: PropTypes.string,
  getChnInfo: PropTypes.func,
  bankNo: PropTypes.string,
  bankList: PropTypes.array,
};

ChannelBankcardInfoForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
  advLinkClick: noop,
  advExpand: false,
  handleTxnSup: noop,
  pospayTxnSup: '',
  checkChnName: noop,
  chnNameChkMsg: '',
  optType: '1', // 1,添加 2,修改
  getChnInfo: noop,
  bankNo: '',
  bankList: [],
};

export default Form.create()(ChannelBankcardInfoForm);
