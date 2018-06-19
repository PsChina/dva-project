import React, { PropTypes } from 'react';
import { Spin, Form, Row, Col, Select, Input, Button, Radio, Icon } from 'antd';
import * as i18n from '../../../../utils/i18n';
import FormItemWechat from './FormItemWechat';
import FormItemAlipay from './FormItemAlipay';
import FormItemBaidu from './FormItemBaidu';
import FormItemGamapay from './FormItemGamapay';
import FormItemLinepay from './FormItemLinepay';
import * as pattern from '../../../../utils/pattern';
import { standUnitToMinUnit, amtMinUnitToStandUnit } from '../../../../utils/amount';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const noop = () => { };

const MerchantScancodeInfoForm = (props) => {
  const {
    form, loading, advLinkClick, style, formSubmit, advExpand, data, chnList, submiting, qryChnMerInf,
    chnMerNoChkMsg, optType, getChnInfo, linkType, scanType, txnChannelSupportList, changeTxnChannelList,
  } = props;
  const { validateFieldsAndScroll, getFieldsValue, resetFields, getFieldDecorator, getFieldValue } = form;

  const bizMap = i18n.bizMap('pms/merchantScancode');
  const validMap = i18n.bizMap('pms/merchantScancodeValid');
  const ccyValidMap = i18n.bizMap('pattern');
  const ccyMap = i18n.bizMap('currencyMap');
  const currencyList = i18n.bizMap('currency');
  const txnChannelList = i18n.bizMap('pms/txnChannelScancode');
  const ccy = ccyMap[data.ccy] || ccyMap.DEFAULT;
  const defaultCcy = ccyMap.DEFAULT_CCY;
  const commonMap = i18n.commonMap();

  const numberProps = {
    style: { width: '100%' },
    min: 0,
    step: 0.01,
  }

  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
  };
  const formItemLayout2 = {
    labelCol: { span: 4 },
    wrapperCol: { span: 19 },
  };
  const options = [];
  chnList.forEach((v) => {
    let linkType = '';
    switch (v.linkType) {
      case '0': linkType = bizMap['linkType-0']; break;
      case '1': linkType = bizMap['linkType-1']; break;
      default: linkType = ''; break;
    }
    options.push(<Option key={v.chnId} value={v.chnId}>{v.chnName}({linkType})</Option>);
  });
  let txnMerType = '';
  switch (data.txnMerType) {
    case '0': txnMerType = bizMap['scanType-0']; break;
    case '1': txnMerType = bizMap['scanType-1']; break;
    case '2': txnMerType = bizMap['scanType-2']; break;
    case '3': txnMerType = bizMap['scanType-3']; break;
    case '4': txnMerType = bizMap['scanType-4']; break;
    case '5': txnMerType = bizMap['scanType-5']; break;
    default: txnMerType = ''; break;
  }

  const scantypes = [];
  if (scanType === '0') {
    scantypes.push(<Option key={0} value={0}> {bizMap['scanType-0']} </Option>)
  } else if (scanType === '1') {
    scantypes.push(<Option key={1} value={1}> {bizMap['scanType-1']} </Option>)
  } else if (scanType === '2') {
    scantypes.push(<Option key={2} value={2}> {bizMap['scanType-2']} </Option>)
  } else if (scanType === '0,1') {
    scantypes.push(<Option key={0} value={0}> {bizMap['scanType-0']} </Option>)
    scantypes.push(<Option key={1} value={1}> {bizMap['scanType-1']} </Option>)
  } else if (scanType === '0,2') {
    scantypes.push(<Option key={0} value={0}> {bizMap['scanType-0']} </Option>)
    scantypes.push(<Option key={2} value={2}> {bizMap['scanType-2']} </Option>)
  } else if (scanType === '1,2') {
    scantypes.push(<Option key={1} value={1}> {bizMap['scanType-1']} </Option>)
    scantypes.push(<Option key={2} value={2}> {bizMap['scanType-2']} </Option>)
  } else if (scanType === '1,2,3') {
    scantypes.push(<Option key={1} value={1}> {bizMap['scanType-1']} </Option>)
    scantypes.push(<Option key={2} value={2}> {bizMap['scanType-2']} </Option>)
    scantypes.push(<Option key={3} value={3}> {bizMap['scanType-3']} </Option>)
  }
  getFieldDecorator('keys', {
    initialValue: [0],
  })
  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        if (optType === '2') {
          dat.chnId = data.chnId;
        }
        if (dat.txnChannel1011) {
          dat.txnChannel1011 = dat.txnChannel1011.toString();
        }
        if (dat.txnChannel1012) {
          dat.txnChannel1012 = dat.txnChannel1012.toString();
        }
        if (dat.txnChannel1014) {
          dat.txnChannel1014 = dat.txnChannel1014.toString();
        }
        if (dat.txnChannel1015) {
          dat.txnChannel1015 = dat.txnChannel1015.toString();
        }
        if(dat.txnChannel1016){
          dat.txnChannel1016 = dat.txnChannel1016.toString();
        }
        if (dat.txnChannelSupport) {
          dat.txnChannelSupport = dat.txnChannelSupport.toString();
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
        if (dat.singleMaxAmt) {
          dat.singleMaxAmt = standUnitToMinUnit(dat.singleMaxAmt, defaultCcy);
        } else {
          dat.singleMaxAmt = '0';
        }
        if (dat.singleMinAmt) {
          dat.singleMinAmt = standUnitToMinUnit(dat.singleMinAmt, defaultCcy);
        } else {
          dat.singleMinAmt = '0';
        }
        formSubmit(dat);
        resetFields();
      }
    });
  };
  const getChnLinkInfo = (value) => {
    if (value) {
      for (let i = 0; i < chnList.length; i++) {
        if (value === chnList[i].chnId) {
          getChnInfo(chnList[i]);
        }
      }
    }
  };

  const chnMerNoValid = (rule, value, callback) => {
    const chnId = getFieldValue('chnId');
    if (!chnId) {
      callback(validMap.validPreChnName);
      return;
    }
    if (!value) {
      callback(validMap.validChnMerNo);
    } else if (/^[0-9]*$/.test(value)) {
      // 后台查询此商户号是否存在，存在显示当前商户信息
      const datas = {
        chnMerId: value,
        chnId: chnId,
      };
      qryChnMerInf(datas);
      if (chnMerNoChkMsg) {
        callback(chnMerNoChkMsg);
      }
    } else if (value) {
      callback(validMap.validChnMerNo);
    }
    callback();
  };
  const advLimitToggleVDom = [
    <Row key="lt1">
      <Col span="12">
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
  console.log(linkType,scanType, data.scanType);
  let ruleValue = ''
  let advBaseVDom = null;
  if (linkType === '0' && scanType === '0') {
    advBaseVDom = [
      <FormItemWechat key="b1" form={form} data={data} />,
    ];
    ruleValue = '0'
  } else if (linkType === '0' && scanType === '1') {
    advBaseVDom = [
      <FormItemAlipay key="b6" form={form} data={data} />,
    ];
    ruleValue = '1'
  } else if (linkType === '0' && scanType === '2') {
    advBaseVDom = [
      <FormItemBaidu key="b7" form={form} data={data} />,
    ];
    ruleValue = '2'
  } else if (linkType === '0' && scanType === '3') {
    advBaseVDom = [
      <FormItemGamapay key="b9" form={form} data={data} />,
    ]
    ruleValue = '3'
  } else if (linkType === '0' && scanType === '5') {
    advBaseVDom = [
      <FormItemLinepay key="b10" form={form} data={data} />,
    ]
    ruleValue = '5'
  } else if (data.linkType === '0' && data.scanType === '0') {
    advBaseVDom = [
      <FormItemWechat key="b6" form={form} data={data} />,
    ];
    ruleValue = '0'
  } else if (data.linkType === '0' && data.scanType === '1') {
    advBaseVDom = [
      <FormItemAlipay key="b6" form={form} data={data} />,
    ];
    ruleValue = '1'
  } else if (data.linkType === '0' && data.scanType === '2') {
    advBaseVDom = [
      <FormItemBaidu key="b6" form={form} data={data} />,
    ];
    ruleValue = '2'
  } else if (data.linkType === '0' && data.scanType === '3') {
    advBaseVDom = [
      <FormItemGamapay key="b6" form={form} data={data} />,
    ]
    ruleValue = '3'
  } else if (data.linkType === '0' && data.scanType === '5') {
    advBaseVDom = [
      <FormItemLinepay key="b6" form={form} data={data} />,
    ]
    ruleValue = '5'
  } else {
    ruleValue = '99'
    advBaseVDom = [
      <Row key="b8">
        <Col span="12">
          <FormItem label={bizMap.txnAppid} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('txnAppid', {
                initialValue: data.txnAppid,
              })(
                <Input placeholder={validMap.validTxnAppid} maxLength="150" />,
              )
            }
          </FormItem>
        </Col>
      </Row>,
      <Row key="b4">
        <Col span="12">
          <FormItem label={bizMap.txnMerNo} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('txnMerNo', {
                initialValue: data.txnMerNo,
                rules: [{ required: true, message: validMap.validTxnMerNo }],
              })(
                <Input placeholder={validMap.validTxnMerNo} maxLength="150" />,
              )
            }
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label={bizMap.txnMerType} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('txnMerType', {
                initialValue: txnMerType,
                rules: [{ required: true, message: validMap.txnMerType }],
                validateFirst: true,
              })(
                <Select placeholder={commonMap.select} onChange={getChnLinkInfo} disabled={optType === '2'}>
                  {scantypes}
                </Select>,
              )
            }
          </FormItem>
        </Col>
      </Row>,
      <Row key="b5">
        <Col span="24">
          <FormItem label={bizMap.txnKey} {...formItemLayout2} hasFeedback>
            {
              getFieldDecorator('txnKey', {
                initialValue: data.txnKey,
                rules: [{ required: true, message: validMap.validTxnKey }],
              })(
                <Input placeholder={validMap.vaildTxnKey} type="textarea" />,
              )
            }
          </FormItem>
        </Col>
      </Row>,
    ];
  }

  const advLimitVDom = [
    <Row key="l1">
      <Col span="12">
        {/*<FormItem label={bizMap.singleDayLimit} {...formItemLayout} hasFeedback>
          {
            getFieldDecorator('singleDayLimit', {
              initialValue: data.singleDayLimit ? data.singleDayLimit : '0',
            })(
              <InputNumber maxLength="9" min={0} max={999999999} style={{ width: '100%' }} step={0.1} />,
            )
          }
        </FormItem>*/}
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
      <Col span="12">
        {/*<FormItem label={bizMap.singleMonthLimit} {...formItemLayout} hasFeedback>
          {
            getFieldDecorator('singleMonthLimit', {
              initialValue: data.singleMonthLimit ? data.singleMonthLimit : '0',
            })(
              <InputNumber maxLength="9" min={0} max={999999999} style={{ width: '100%' }} step={0.1} />,
            )
          }
        </FormItem>*/}
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
    <Row key="l2">
      <Col span="12">
        {/*<FormItem label={bizMap.singleDayCount} {...formItemLayout} hasFeedback>
          {
            getFieldDecorator('singleDayCount', {
              initialValue: data.singleMonthLimit ? data.singleMonthLimit : '0',
            })(
              <InputNumber maxLength="10" min={0} max={9999999999} style={{ width: '100%' }} />,
            )
          }
        </FormItem>*/}
        <FormItem label={bizMap.singleDayCount} {...formItemLayout}>
          {
            getFieldDecorator('singleDayCount', {
              initialValue: data.singleDayCount ? data.singleDayCount : 0,
              rules: [
                { required: true, message: ccyValidMap.REQUIRED.replace(/{\w}/, bizMap.singleDayCount) },
                { pattern: pattern.COUNT, message: ccyValidMap.COUNT },
              ],
            })(
              <Input {...numberProps} addonAfter="笔" />,
            )
          }
        </FormItem>
      </Col>
      <Col span="12">
        {/*<FormItem label={bizMap.singleMonthCount} {...formItemLayout} hasFeedback>
          {
            getFieldDecorator('singleMonthCount', {
              initialValue: data.singleMonthCount ? data.singleMonthCount : '0',
            })(
              <InputNumber maxLength="10" min={0} max={9999999999} style={{ width: '100%' }} />,
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
              <Input {...numberProps} addonAfter="笔" />,
            )
          }
        </FormItem>
      </Col>
    </Row>,
    <Row key="l3">
      <Col span="12">
        {/*<FormItem label={bizMap.singleMinAmt} {...formItemLayout} hasFeedback>
          {
            getFieldDecorator('singleMinAmt', {
              initialValue: data.singleMinAmt ? data.singleMinAmt : '0',
            })(
              <InputNumber min={0} maxLength="12" max={999999999} style={{ width: '100%' }} step={0.1} />,
            )
          }
        </FormItem>*/}
        <FormItem label={bizMap.singleMinAmt} {...formItemLayout}>
          {
            getFieldDecorator('singleMinAmt', {
              initialValue: data.singleMinAmt ? amtMinUnitToStandUnit(data.singleMinAmt, defaultCcy) : 0,
              rules: [
                { required: true, message: ccyValidMap.REQUIRED.replace(/{\w}/, bizMap.singleMinAmt) },
                { pattern: pattern.AMT, message: ccyValidMap.AMT },
              ],
            })(
              <Input {...numberProps} addonAfter={ccy} />,
            )
          }
        </FormItem>
      </Col>
      <Col span="12">
        {/*<FormItem label={bizMap.singleMaxAmt} {...formItemLayout} hasFeedback>
          {
            getFieldDecorator('singleMaxAmt', {
              initialValue: data.singleMaxAmt ? data.singleMaxAmt : '0',
            })(
              <InputNumber min={0} maxLength="13" max={999999999} style={{ width: '100%' }} step={0.1} />,
            )
          }
        </FormItem>*/}
        <FormItem label={bizMap.singleMaxAmt} {...formItemLayout}>
          {
            getFieldDecorator('singleMaxAmt', {
              initialValue: data.singleMaxAmt ? amtMinUnitToStandUnit(data.singleMaxAmt, defaultCcy) : 0,
              rules: [
                { required: true, message: ccyValidMap.REQUIRED.replace(/{\w}/, bizMap.singleMaxAmt) },
                { pattern: pattern.AMT, message: ccyValidMap.AMT },
              ],
            })(
              <Input {...numberProps} addonAfter={ccy} />,
            )
          }
        </FormItem>
      </Col>
    </Row>,
  ];

  const handleGolbalChange = (value) => {
    changeTxnChannelList(value);
  }
  const currencySupportItemsDom = txnChannelSupportList.map((k) => {
    let labeltext = ''
    switch (k) {
      case '1011':
        labeltext = bizMap['txnChannel-1011']
        break;
      case '1012':
        labeltext = bizMap['txnChannel-1012']
        break;
      case '1014':
        labeltext = bizMap['txnChannel-1014']
        break;
      case '1015':
        labeltext = bizMap['txnChannel-1015']
        break;
      case '1016':
        labeltext = bizMap['txnChannel-1016']
        break;
      default:
        labeltext = null
        break;
    }
    return (
      <Row key={k}>
        <Col sm={24} md={12}>
          <FormItem {...formItemLayout} label={bizMap.currencySupport} key={k}>
            {
              getFieldDecorator(`txnChannel${k}`, {
                initialValue: data.currencySupport ? data.currencySupport.split(',') : ['TWD'],
                rules: [{ required: true }],
              })(
                <Select placeholder={commonMap.select} multiple key={`s${k}`}>
                  {
                    currencyList.map((item, idx) => {
                      return <Option key={`${k}${idx}`} value={item.value}>{`${item.label}(${item.value})`}</Option>;
                    })
                  }
                </Select>,
              )
            }
          </FormItem>
        </Col>
      </Row>
    );
  });

  const advGlobalDom = [
    <Row key="g1">
      <Col sm={24} md={12}>
        <FormItem label={bizMap.txnChannelSupport} {...formItemLayout} hasFeedback>
          {
            getFieldDecorator('txnChannelSupport', {
              initialValue: data.txnChannel,
              rules: [{ required: true }],
            })(
              <Select placeholder={commonMap.select} onChange={handleGolbalChange} multiple={linkType === '1'} disabled={optType === '2'}>
                {
                  txnChannelList.map((item, idx) => {
                    return <Option key={idx} value={item.value}>{item.label}</Option>;
                  })
                }
              </Select>,
            )
          }
        </FormItem>
      </Col>
    </Row>,
  ];

  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" style={style} onSubmit={handleSubmit}>
        <Row>
          <Col span="12">
            <FormItem label={bizMap.chnName} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('chnId', {
                  initialValue: data.chnName,
                  rules: [{ required: true, message: validMap.validChnName }],
                  validateFirst: true,
                })(
                  <Select placeholder={commonMap.select} onChange={getChnLinkInfo} disabled={optType === '2'}>
                    {options}
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Col span="12" style={{ display: 'none' }}>
          <FormItem label={bizMap.linkTyp} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('ruleValue', {
                initialValue: ruleValue,
                rules: [{ required: true }],
              })(
                <Input placeholder={validMap.validChnMerName} maxLength="150" disabled={optType === '2'} />,
              )
            }
          </FormItem>
        </Col>
        <Col span="12" style={{ display: 'none' }}>
          <FormItem label={bizMap.chnMerId} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('chnMerId', {
                initialValue: data.chnMerId,
              })(
                <Input placeholder={validMap.validChnMerName} maxLength="150" disabled={optType === '2'} />,
              )
            }
          </FormItem>
        </Col>
        <Row key="b2">
          <Col span="12">
            <FormItem label={bizMap.chnMerName} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('chnMerName', {
                  initialValue: data.chnMerName,
                  rules: [{ required: true, message: validMap.validChnMerName }],
                })(
                  <Input placeholder={validMap.validChnMerName} maxLength="150" disabled={optType === '2'} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        {/*<Row key="b3" hidden="true">
          <Col span="12">
            <FormItem label={bizMap.chnMerType} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('chnMerType', {
                  initialValue: data.chnMerType ? data.chnMerType : '1',
                  rules: [{ required: true }],
                })(
                  <RadioGroup>
                    <Radio value="1">{bizMap['chnMerType-1']}</Radio>
                    <Radio value="2">{bizMap['chnMerType-2']}</Radio>
                  </RadioGroup>,
                )
              }
            </FormItem>
          </Col>
        </Row>*/}
        {advBaseVDom}
        <h4 key="global-split" className="split">&nbsp;</h4>
        {advGlobalDom}
        {currencySupportItemsDom}
        <h4 key="split" className="split">&nbsp;</h4>
        <Row>
          <Col span="12">
            {/*<FormItem label={bizMap.txnRate} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('txnRate', {
                  initialValue: data.txnRate ? data.txnRate : 0,
                  rules: [{ required: true }],
                })(
                  <InputNumber placeholder={bizMap.txnRate} min={0} step={0.01} />,
                )
              }
            </FormItem>*/}
            <FormItem label={`${bizMap.txnRate}`} {...formItemLayout}>
              {
                getFieldDecorator('txnRate', {
                  initialValue: data.txnRate,
                  rules: [
                    { required: true, message: ccyValidMap.REQUIRED.replace(/{\w}/, bizMap.txnRate) },
                    { pattern: pattern.PERCENT, message: ccyValidMap.PERCENT },
                  ],
                })(
                  <Input {...numberProps} addonAfter="%" />,
                )
              }
            </FormItem>
          </Col>
          {/*<Col span="12">
            <FormItem label={bizMap.stlMemTyp} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('stlMemTyp', {
                  initialValue: data.stlMemTyp ? data.stlMemTyp : '0',
                  rules: [{ required: true }],
                })(
                  <Select placeholder={commonMap.select}>
                    <Option value="0">{bizMap['stlMemTyp-0']}</Option>
                    <Option value="1">{bizMap['stlMemTyp-1']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>*/}
        </Row>
        {advLimitToggleVDom}
        {advExpand ? advLimitVDom : null}
        <h4 key="btn-split" className="split">&nbsp;</h4>
        <Row key="btn-row">
          <Col span={24} style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit" loading={submiting}>{commonMap.submit}</Button>
            {/*<Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>*/}
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};

MerchantScancodeInfoForm.propTypes = {
  loading: PropTypes.bool,
  style: PropTypes.object,
  data: PropTypes.object,
  chnList: PropTypes.array,
  submiting: PropTypes.bool,

  qryChnMerInf: PropTypes.func,
  chnMerNoChkMsg: PropTypes.string,

  advLinkClick: PropTypes.func,
  advExpand: PropTypes.bool,

  formSubmit: PropTypes.func,

  optType: PropTypes.string,
  getChnInfo: PropTypes.func,

  linkType: PropTypes.string,
  scanType: PropTypes.string,
  txnChannelSupportList: PropTypes.array,
  changeTxnChannelList: PropTypes.func,
};

MerchantScancodeInfoForm.defaultProps = {
  loading: false,
  style: {},
  data: {},
  chnList: [],
  submiting: false,

  advExpand: false,
  advLinkClick: noop,

  qryChnMerInf: noop,
  chnMerNoChkMsg: '',

  formSubmit: noop,

  getChnInfo: noop,
  optType: '1', // 1,添加 2,修改

  linkType: '1',  // 0,直连 1,间连
  scanType: '',  //扫码方式
  txnChannelSupportList: [],
  changeTxnChannelList: noop,
};

export default Form.create()(MerchantScancodeInfoForm);

