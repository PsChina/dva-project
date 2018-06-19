import React, { PropTypes } from 'react';
import { Spin, Form, Input, Select, Button, Row, Col } from 'antd';
import BusinessItemSettlement from './BusinessItemSettlement';
import * as i18n from '../../../../utils/i18n';
import * as pattern from '../../../../utils/pattern';
import { standUnitToMinUnit, amtMinUnitToStandUnit } from '../../../../utils/amount';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const ccyMap = i18n.bizMap('currencyMap');
const bizMap = i18n.bizMap('bms/businessGamapay');
const validMap = i18n.bizMap('pattern');

const BusinessFormGamapay = (props) => {
  const commonMap = i18n.commonMap();
  const { form, data, loading, submiting, formSubmit, formCancel, modeChange } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll } = form;
  const ccy = ccyMap[data.ccy] || ccyMap.DEFAULT;
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
  };
  const formItemLayout2 = {
    labelCol: { span: 9 },
    wrapperCol: { span: 13 },
  };
  const numberProps = {
    style: { width: '100%' },
    min: 0,
    step: 0.01,
  }

  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        dat.feeLim = standUnitToMinUnit(dat.feeLim, data.ccy);
        formSubmit(dat);
      }
    });
  }
  const handleCancel = () => {
    formCancel();
  }
  const handleModeChange = (val) => {
    const dat = getFieldsValue();
    modeChange(val, dat);
  }

  const merMod = getFieldsValue().merMod;
  let vmod = null;
  if (merMod === '1') {
    vmod = [
      <Row key="key">
        <Col span={12}>
          <FormItem label={`${bizMap.gamapayMerchantID}`} {...formItemLayout2}>
            {
              getFieldDecorator('gamapayMerchantID', {
                initialValue: data.gamapayMerchantID,
                rules: [{ required: true, message: validMap.REQUIRED.replace(/{\w}/, bizMap.gamapayMerchantID) }],
              })(<Input type="text" />)
            }
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label={`${bizMap.gamapaySubMerchantID}`} {...formItemLayout2}>
            {
              getFieldDecorator('gamapaySubMerchantID', {
                initialValue: data.gamapaySubMerchantID,
                rules: [{ message: validMap.REQUIRED.replace(/{\w}/, bizMap.gamapaySubMerchantID) }],
              })(<Input type="text" />)
            }
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label={`${bizMap.gamapayHashKey}`} {...formItemLayout2}>
            {
              getFieldDecorator('gamapayHashKey', {
                initialValue: data.gamapayHashKey,
                rules: [{ required: true, message: validMap.REQUIRED.replace(/{\w}/, bizMap.gamapayHashKey) }],
              })(<Input type="input" />)
            }
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label={`${bizMap.gamapayHashIv}`} {...formItemLayout2}>
            {
              getFieldDecorator('gamapayHashIv', {
                initialValue: data.gamapayHashIv,
                rules: [{ required: true, message: validMap.REQUIRED.replace(/{\w}/, bizMap.gamapayHashIv) }],
              })(<Input type="input" />)
            }
          </FormItem>
        </Col>
      </Row>,
    ];
  } else if (merMod === '2') {
    vmod = [
      <h4 key="split" className="split">&nbsp;</h4>,
      <BusinessItemSettlement key="stl" form={form} data={data} />,
    ]
  }

  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <div className="ant-modal-title" style={{ marginBottom: 16 }}>
          {bizMap.gamapayBizConfig}
        </div>
        <h4 className="split">&nbsp;</h4>
        <Row style={{ display: 'none' }}>
          <Col span={24}>
            <FormItem>
              { getFieldDecorator('merId', { initialValue: data.merId })(<Input placeholder={bizMap.merId} />) }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={`${bizMap.payRate}`} {...formItemLayout}>
              {
                getFieldDecorator('payRate', {
                  initialValue: data.payRate,
                  rules: [
                    { required: true, message: validMap.REQUIRED.replace(/{\w}/, bizMap.payRate) },
                    { pattern: pattern.PERCENT, message: validMap.PERCENT },
                  ],
                })(
                  <Input {...numberProps} addonAfter="%" />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.feeLim} {...formItemLayout}>
              {
                getFieldDecorator('feeLim', {
                  initialValue: data.feeLim ? amtMinUnitToStandUnit(data.feeLim, data.ccy) : 0,
                  rules: [
                    { required: true, message: validMap.REQUIRED.replace(/{\w}/, bizMap.feeLim) },
                    { pattern: pattern.AMT, message: validMap.AMT },
                  ],
                })(
                  <Input {...numberProps} addonAfter={ccy} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <h4 className="split">&nbsp;</h4>
        <Row>
          <Col span={12}>
            <FormItem label={`${bizMap.merMod}`} {...formItemLayout}>
              {
                getFieldDecorator('merMod', {
                  initialValue: data.merMod,
                  rules: [{ required: true, message: validMap.REQUIRED.replace(/{\w}/, bizMap.merMod) }],
                })(
                  <Select onChange={handleModeChange}>
                    <Option value="">&nbsp;</Option>
                    <Option value="1">{bizMap['merMod-1']}</Option>
                    <Option value="2">{bizMap['merMod-2']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        { vmod }
        <h4 className="split">&nbsp;</h4>
        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit" loading={submiting}>{commonMap.submit}</Button>
            <Button style={{ marginLeft: 8 }} onClick={handleCancel}>{commonMap.cancel}</Button>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
}

BusinessFormGamapay.propTypes = {
  data: PropTypes.object,
  // merOptions: PropTypes.array,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
  formCancel: PropTypes.func,
  modeChange: PropTypes.func,
};

BusinessFormGamapay.defaultProps = {
  data: {},
  // merOptions: [],
  loading: false,
  submiting: false,
  formSubmit: noop,
  formCancel: noop,
  modeChange: noop,
}

export default Form.create()(BusinessFormGamapay);
