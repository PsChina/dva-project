import React, { PropTypes } from 'react';
import { Spin, Form, Input, Button, Row, Col } from 'antd';
import * as i18n from '../../../../utils/i18n';
import * as pattern from '../../../../utils/pattern';
import { standUnitToMinUnit, amtMinUnitToStandUnit } from '../../../../utils/amount';

const noop = () => { };
const commonMap = i18n.commonMap();
const ccyMap = i18n.bizMap('currencyMap');
const bizMap = i18n.bizMap('bms/businessRealTimeStl');
const validMap = i18n.bizMap('pattern');
const FormItem = Form.Item;

const BusinessFormRealTimeStl = (props) => {
  const { form, biz, data, loading, submiting, formSubmit, formCancel } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields } = form;
  const ccy = ccyMap[data.ccy] || ccyMap.DEFAULT;
  let title = bizMap.bizConfig;
  switch (biz) {
    case 't0': title = bizMap.t0BizConfig; break;
    case 'd0': title = bizMap.d0BizConfig; break;
    default: break;
  }
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
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
        dat.serviceMaxLimit = standUnitToMinUnit(dat.serviceMaxLimit, data.ccy);
        dat.serviceFeeLimit = standUnitToMinUnit(dat.serviceFeeLimit, data.ccy);
        formSubmit(dat);
      }
    });
  };

  const handleCancel = () => {
    resetFields();
    formCancel();
  }

  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <div className="ant-modal-title" style={{ marginBottom: 16 }}>
          {title}
        </div>
        <h4 className="split">&nbsp;</h4>
        <Row style={{ display: 'none' }}>
          <Col span={24}>
            <FormItem>
              { getFieldDecorator('merId', { initialValue: data.merId || '' })(<Input />) }
            </FormItem>
            <FormItem>
              { getFieldDecorator('biz', { initialValue: biz })(<Input />) }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={`${bizMap.serviceMaxLimit}`} {...formItemLayout}>
              {
                getFieldDecorator('serviceMaxLimit', {
                  initialValue: data.serviceMaxLimit ? amtMinUnitToStandUnit(data.serviceMaxLimit, data.ccy) : 0,
                  rules: [
                    { required: true, message: validMap.REQUIRED.replace(/{\w}/, bizMap.serviceMaxLimit) },
                    { pattern: pattern.AMT, message: validMap.AMT },
                  ],
                })(
                  <Input {...numberProps} addonAfter={ccy} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={`${bizMap.serviceFee}(%)`} {...formItemLayout}>
              {
                getFieldDecorator('serviceFee', {
                  initialValue: data.serviceFee,
                  rules: [
                    { required: true, message: validMap.REQUIRED.replace(/{\w}/, bizMap.serviceFee) },
                    { pattern: pattern.PERCENT, message: validMap.PERCENT },
                  ],
                })(
                  <Input {...numberProps} addonAfter="%" />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.serviceFeeLimit} {...formItemLayout}>
              {
                getFieldDecorator('serviceFeeLimit', {
                  initialValue: data.serviceFeeLimit ? amtMinUnitToStandUnit(data.serviceFeeLimit, data.ccy) : 0,
                  rules: [
                    { required: true, message: validMap.REQUIRED.replace(/{\w}/, bizMap.serviceFeeLimit) },
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
          <Col span={24} style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit" loading={submiting}>{commonMap.submit}</Button>
            <Button style={{ marginLeft: 8 }} onClick={handleCancel}>{commonMap.cancel}</Button>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
}

BusinessFormRealTimeStl.propTypes = {
  biz: PropTypes.string,
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
  formCancel: PropTypes.func,
};

BusinessFormRealTimeStl.defaultProps = {
  biz: '',
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
  formCancel: noop,
}

export default Form.create()(BusinessFormRealTimeStl);
