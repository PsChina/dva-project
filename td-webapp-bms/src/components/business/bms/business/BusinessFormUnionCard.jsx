import React, { PropTypes } from 'react';
import { Spin, Form, Input, Select, Button, Row, Col } from 'antd';
import BusinessItemSettlement from './BusinessItemSettlement';
import * as i18n from '../../../../utils/i18n';
import * as pattern from '../../../../utils/pattern';
import { standUnitToMinUnit, amtMinUnitToStandUnit } from '../../../../utils/amount';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const commonMap = i18n.commonMap();
const ccyMap = i18n.bizMap('currencyMap');
const bizMap = i18n.bizMap('bms/businessUnionCard');
const validMap = i18n.bizMap('pattern');

const BusinessFormUnionCard = (props) => {
  const { form, data, loading, submiting, formSubmit, formCancel } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll } = form;
  const ccy = ccyMap[data.ccy] || ccyMap.DEFAULT;
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
        dat.dcardLim = standUnitToMinUnit(dat.dcardLim, data.ccy);
        dat.ccardLim = standUnitToMinUnit(dat.ccardLim, data.ccy);
        formSubmit(dat);
      }
    });
  };

  const handleCancel = () => {
    formCancel();
  }

  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <div className="ant-modal-title" style={{ marginBottom: 16 }}>
          {bizMap.unionCardBizConfig}
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
            <FormItem label={bizMap.merInd} {...formItemLayout}>
              {
                getFieldDecorator('merInd', {
                  initialValue: data.merInd || '1',
                })(
                  <Select>
                    <Option value="1">{bizMap['ind-1']}</Option>
                    <Option value="2">{bizMap['ind-2']}</Option>
                    <Option value="3">{bizMap['ind-3']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.merMcc} {...formItemLayout}>
              {
                getFieldDecorator('merMcc', {
                  initialValue: data.merMcc,
                  rules: [{ required: true, message: validMap.REQUIRED.replace(/{\w}/, bizMap.merMcc) }],
                })(
                  <Input maxLength={4}  placeholder={bizMap.merMcc} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={`${bizMap.dcardRate}`} {...formItemLayout}>
              {
                getFieldDecorator('dcardRate', {
                  initialValue: data.dcardRate,
                  rules: [
                    { required: true, message: validMap.REQUIRED.replace(/{\w}/, bizMap.dcardRate) },
                    { pattern: pattern.PERCENT, message: validMap.PERCENT },
                  ],
                })(
                  <Input {...numberProps} addonAfter="%" />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.dcardLim} {...formItemLayout}>
              {
                getFieldDecorator('dcardLim', {
                  initialValue: data.dcardLim ? amtMinUnitToStandUnit(data.dcardLim, data.ccy) : 0,
                  rules: [
                    { required: true, message: validMap.REQUIRED.replace(/{\w}/, bizMap.dcardLim) },
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
            <FormItem label={`${bizMap.ccardRate}`} {...formItemLayout}>
              {
                getFieldDecorator('ccardRate', {
                  initialValue: data.ccardRate,
                  rules: [
                    { required: true, message: validMap.REQUIRED.replace(/{\w}/, bizMap.ccardRate) },
                    { pattern: pattern.PERCENT, message: validMap.PERCENT },
                  ],
                })(
                  <Input {...numberProps} addonAfter="%" />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.ccardLim} {...formItemLayout}>
              {
                getFieldDecorator('ccardLim', {
                  initialValue: data.ccardLim ? amtMinUnitToStandUnit(data.ccardLim, data.ccy) : 0,
                  rules: [
                    { required: true, message: validMap.REQUIRED.replace(/{\w}/, bizMap.ccardLim) },
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
        <BusinessItemSettlement form={form} data={data} />
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

BusinessFormUnionCard.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
  formCancel: PropTypes.func,
};

BusinessFormUnionCard.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
  formCancel: noop,
}

export default Form.create()(BusinessFormUnionCard);
