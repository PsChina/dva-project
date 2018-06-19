import React, { PropTypes } from 'react';
import { Spin, Form, Row, Col, Select, Input, Button, InputNumber, Icon, Switch } from 'antd';
import * as i18n from '../../../../utils/i18n';
import { standUnitToMinUnit, amtMinUnitToStandUnit } from '../../../../utils/amount';

const FormItem = Form.Item;
const Option = Select.Option;
const noop = () => { };

const MerchantTransferInfoForm = (props) => {
  const bizMap = i18n.bizMap('pms/merchantTransfer');
  const validMap = i18n.bizMap('pms/merchantScancodeValid');
  const ccyMap = i18n.bizMap('currencyMap');
  const defaultCcy = ccyMap.DEFAULT_CCY;
  const commonMap = i18n.commonMap();
  const {
    form,
    loading,
    advLinkClick,
    style,
    formSubmit,
    advExpand,
    data,
    chnList,
    submiting,
    optType,
    getChnInfo,
    chnType,
    handlerTransfer,
  } = props;
  const {
    validateFieldsAndScroll,
    getFieldsValue,
    resetFields,
    getFieldDecorator,
  } = form;
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
  };
  const options = [];
  chnList.forEach((v) => {
    options.push(<Option key={v.chnId} value={v.chnId}>{v.chnName}</Option>);
  });

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
        if (dat.singleDayLimit) {
          dat.singleDayLimit = standUnitToMinUnit(dat.singleDayLimit, defaultCcy);
        } else {
          dat.singleDayLimit = '0';
        }
        if (dat.singleMinAmt) {
          dat.singleMinAmt = standUnitToMinUnit(dat.singleMinAmt, defaultCcy);
        } else {
          dat.singleMinAmt = '0';
        }
        if (dat.singleMaxAmt) {
          dat.singleMaxAmt = standUnitToMinUnit(dat.singleMaxAmt, defaultCcy);
        } else {
          dat.singleMaxAmt = '0';
        }
        if (dat.outSingleAmt) {
          dat.outSingleAmt = standUnitToMinUnit(dat.outSingleAmt, defaultCcy);
        } else {
          dat.outSingleAmt = '0';
        }
        if (dat.inSingleAmt) {
          dat.inSingleAmt = standUnitToMinUnit(dat.inSingleAmt, defaultCcy);
        } else {
          dat.inSingleAmt = '0';
        }
        if (dat.inAmtMax) {
          dat.inAmtMax = standUnitToMinUnit(dat.inAmtMax, defaultCcy);
        } else {
          dat.inAmtMax = '0';
        }
        if (dat.outAmtMax) {
          dat.outAmtMax = standUnitToMinUnit(dat.outAmtMax, defaultCcy);
        } else {
          dat.outAmtMax = '0';
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

  const advLimitToggleVDom = [
    <Row key="lt1">
      <Col span="12">
        <FormItem label={bizMap.limitInfo} {...formItemLayout} hasFeedback>
          <a
            onClick={() => {
              const dat = getFieldsValue();
              const value = Object.assign({}, { ...dat });
              value.chnId = data.chnId;
              value.chnName = data.chnName;
              advLinkClick(value);
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
    <Row key="l1">
      <Col span="12">
        <FormItem label={bizMap.singleDayLimit} {...formItemLayout} hasFeedback>
          {
            getFieldDecorator('singleDayLimit', {
              initialValue: data.singleDayLimit ? amtMinUnitToStandUnit(data.singleDayLimit, defaultCcy) : '0',
            })(
              <InputNumber maxLength="9" min={0} max={999999999} style={{ width: '100%' }} step={0.1} />,
            )
          }
        </FormItem>
      </Col>
      <Col span="12">
        <FormItem label={bizMap.singleDayCount} {...formItemLayout} hasFeedback>
          {
            getFieldDecorator('singleDayCount', {
              initialValue: data.singleDayCount ? data.singleDayCount : '0',
            })(
              <InputNumber maxLength="10" min={0} max={9999999999} style={{ width: '100%' }} />,
            )
          }
        </FormItem>
      </Col>
    </Row>,
    <Row key="l3">
      <Col span="12">
        <FormItem label={bizMap.singleMinAmt} {...formItemLayout} hasFeedback>
          {
            getFieldDecorator('singleMinAmt', {
              initialValue: data.singleMinAmt ? amtMinUnitToStandUnit(data.singleMinAmt, defaultCcy) : '0',
            })(
              <InputNumber min={0} maxLength="12" max={999999999} style={{ width: '100%' }} step={0.1} />,
            )
          }
        </FormItem>
      </Col>
      <Col span="12">
        <FormItem label={bizMap.singleMaxAmt} {...formItemLayout} hasFeedback>
          {
            getFieldDecorator('singleMaxAmt', {
              initialValue: data.singleMaxAmt ? amtMinUnitToStandUnit(data.singleMaxAmt, defaultCcy) : '0',
            })(
              <InputNumber min={0} maxLength="13" max={999999999} style={{ width: '100%' }} step={0.1} />,
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
        <Row>
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
        </Row>
        <Row key="b3">
          <Col span="12">
            <FormItem label={bizMap.chnMerNo} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('chnMerNo', {
                  initialValue: data.chnMerNo,
                  rules: [{ required: true, message: validMap.validChnMerNo }],
                })(
                  <Input placeholder={validMap.validChnMerNo} maxLength="150" disabled={optType === '2'} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row key="b2">
          <Col span="12">
            <FormItem label={bizMap.chnMerName} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('chnMerName', {
                  initialValue: data.chnMerName,
                })(
                  <Input placeholder={validMap.validChnMerName} maxLength="150" disabled={optType === '2'} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label={bizMap.insideTransferStatus} {...formItemLayout} >
              {
                getFieldDecorator('insideTransferStatus', {
                  initialValue: data.insideTransferStatus,
                })(
                  <Switch
                    checkedChildren={'on'}
                    unCheckedChildren={'off'}
                    disabled={chnType === '0' || chnType === '2' || data.chnType === '0' || data.chnType === '2'}
                    checked={data.insideTransferStatus}
                    onChange={() => handlerTransfer(Object.assign({}, { data }, { insideTransferStatus: !getFieldsValue().insideTransferStatus }))}
                  />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        {
          data.insideTransferStatus ?
            <Row>
              <Col span="12">
                <FormItem label={bizMap.inChargeType} {...formItemLayout} hasFeedback>
                  {
                    getFieldDecorator('inChargeType', {
                      initialValue: data.inChargeType ? data.inChargeType : '',
                      rules: [{ required: true, message: validMap.validInChargeType }],
                    })(
                      <Select placeholder={commonMap.select}>
                        <Option value="0">{bizMap['inChargeType-0']}</Option>
                        <Option value="1">{bizMap['inChargeType-1']}</Option>
                      </Select>,
                    )
                  }
                </FormItem>
              </Col>
            </Row>
            :
            null
        }
        {
          getFieldsValue().inChargeType === '1' ?
            <Row>
              <Col span="12">
                <FormItem label={bizMap.inTxnRate} {...formItemLayout} hasFeedback>
                  {
                    getFieldDecorator('inTxnRate', {
                      initialValue: data.inTxnRate ? data.inTxnRate : 0,
                      rules: [{ required: true, message: validMap.validInTxnRate }],
                    })(
                      <InputNumber placeholder={bizMap.inTxnRate} min={0} step={0.01} />,
                    )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label={bizMap.inAmtMax} {...formItemLayout} hasFeedback>
                  {
                    getFieldDecorator('inAmtMax', {
                      initialValue: data.inAmtMax ? amtMinUnitToStandUnit(data.inAmtMax, defaultCcy) : '0',
                    })(
                      <InputNumber maxLength="9" min={0} max={999999999} style={{ width: '100%' }} step={0.1} />,
                    )
                  }
                </FormItem>
              </Col>
            </Row>
            :
            null
        }
        {
          getFieldsValue().inChargeType === '0' ?
            <Row>
              <Col span="12">
                <FormItem label={bizMap.inSingleAmt} {...formItemLayout} hasFeedback>
                  {
                    getFieldDecorator('inSingleAmt', {
                      initialValue: data.inSingleAmt ? amtMinUnitToStandUnit(data.inSingleAmt, defaultCcy) : '0',
                    })(
                      <InputNumber maxLength="9" min={0} max={999999999} style={{ width: '100%' }} step={0.1} />,
                    )
                  }
                </FormItem>
              </Col>
            </Row>
            :
            null
        }

        <Row key="b4" >
          <Col span="12">
            <FormItem label={bizMap.outsideTransferStatus} {...formItemLayout} >
              {
                getFieldDecorator('outsideTransferStatus', {
                  initialValue: data.outsideTransferStatus,
                })(
                  <Switch
                    checkedChildren={'on'}
                    unCheckedChildren={'off'}
                    checked={data.outsideTransferStatus}
                    onChange={() => handlerTransfer(Object.assign({}, { data }, { outsideTransferStatus: !getFieldsValue().outsideTransferStatus }))}
                  />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        {
          data.outsideTransferStatus ?
            <Row>
              <Col span="12">
                <FormItem label={bizMap.outChargeType} {...formItemLayout} hasFeedback>
                  {
                    getFieldDecorator('outChargeType', {
                      initialValue: data.outChargeType ? data.outChargeType : '',
                      rules: [{ required: true, message: validMap.validOutChargeType }],
                    })(
                      <Select placeholder={commonMap.select}>
                        <Option value="0">{bizMap['outChargeType-0']}</Option>
                        <Option value="1">{bizMap['outChargeType-1']}</Option>
                      </Select>,
                    )
                  }
                </FormItem>
              </Col>
            </Row>
            :
            null
        }
        {
          getFieldsValue().outChargeType === '1' ?
            <Row>
              <Col span="12">
                <FormItem label={bizMap.outTxnRate} {...formItemLayout} hasFeedback>
                  {
                    getFieldDecorator('outTxnRate', {
                      initialValue: data.outTxnRate ? data.outTxnRate : 0,
                      rules: [{ required: true, message: validMap.validOutTxnRate }],
                    })(
                      <InputNumber placeholder={bizMap.outTxnRate} min={0} step={0.01} />,
                    )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label={bizMap.outAmtMax} {...formItemLayout} hasFeedback>
                  {
                    getFieldDecorator('outAmtMax', {
                      initialValue: data.outAmtMax ? amtMinUnitToStandUnit(data.outAmtMax, defaultCcy) : '0',
                    })(
                      <InputNumber maxLength="9" min={0} max={999999999} style={{ width: '100%' }} step={0.1} />,
                    )
                  }
                </FormItem>
              </Col>
            </Row>
            :
            null
        }
        {
          getFieldsValue().outChargeType === '0' ?
            <Row>
              <Col span="12" >
                <FormItem label={bizMap.outSingleAmt} {...formItemLayout} hasFeedback>
                  {
                    getFieldDecorator('outSingleAmt', {
                      initialValue: data.outSingleAmt ? amtMinUnitToStandUnit(data.outSingleAmt, defaultCcy) : '0',
                    })(
                      <InputNumber maxLength="9" min={0} max={999999999} style={{ width: '100%' }} step={0.1} />,
                    )
                  }
                </FormItem>
              </Col>
            </Row>
            :
            null
        }
        <h4 key="split" className="split">&nbsp;</h4>
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

MerchantTransferInfoForm.propTypes = {
  loading: PropTypes.bool,
  style: PropTypes.object,
  data: PropTypes.object,
  chnList: PropTypes.array,
  submiting: PropTypes.bool,

  advLinkClick: PropTypes.func,
  advExpand: PropTypes.bool,

  formSubmit: PropTypes.func,

  optType: PropTypes.string,
  getChnInfo: PropTypes.func,
  chnType: PropTypes.string,
  handlerTransfer: PropTypes.func,

};

MerchantTransferInfoForm.defaultProps = {
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
  chnType: '',  // 0,银联 1,银行，2第三方
  handlerTransfer: noop,

};

export default Form.create()(MerchantTransferInfoForm);

