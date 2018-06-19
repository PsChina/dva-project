import React, { PropTypes } from 'react';
import { Spin, Form, Input, Select, Button, Row, Col } from 'antd';
import * as i18n from '../../../../utils/i18n';

import { num100Valid } from '../../../../utils/vaild';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const PubExchangeRateForm = (props) => {
  const bizMap = i18n.bizMap('bas/pubExchangeRate');
  const currencyBizMap = i18n.bizMap('bas/pubCurrency');
  const commonMap = i18n.commonMap();
  const { form, data, loading, submiting, formSubmit, type, currencyList } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const data = getFieldsValue();
        if (data.toCurrency) {
          Object.assign(data, { toCurrency: data.toCurrency.toString() });
        }
        console.log('data=>', data)
        formSubmit(data);
      }
    });
  };

  const currencySelect = [];
  for (let i = 0; i < currencyList.length; i++) {
    currencySelect.push(<Option key={currencyList[i].currencyShortName}>{`${currencyList[i].currencyShortName}`}</Option>);
  }

  let currencySelected = [];
  if (data.toCurrency) {
    currencySelected = data.toCurrency.split(',');
  }
  const handleReset = () => {
    resetFields();
  }
  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        {
          type === 'update' ?
            <div hidden>
              <Row>
                <Col span={22}>
                  <FormItem label={bizMap.exchangeRateId} {...formItemLayout} hasFeedback>
                    {
                      getFieldDecorator('exchangeRateId', {
                        initialValue: data.exchangeRateId,
                        rules: [{
                          required: true,
                        }],
                      })(
                        <Input placeholder={bizMap.exchangeRateId} />,
                      )
                    }
                  </FormItem>
                </Col>
              </Row>
            </div>
          : null
        }
        <Row key="u1">
          <Col span={10}>
            <FormItem label={bizMap.fromCurrency} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('fromCurrency', {
                  initialValue: data.fromCurrency,
                  rules: [{
                    required: true, message: bizMap.validFromCurrency,
                  }],
                })(
                  <Select
                    showSearch
                    optionFilterProp="children"
                    placeholder={currencyBizMap.validCurrency}
                    style={{ width: '100%' }}
                  >
                    {currencySelect}
                  </Select>,
                )
              }
            </FormItem>
          </Col>
          <Col span={14}>
            <FormItem label={bizMap.toCurrency} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('toCurrency', {
                  initialValue: type === 'update' ? currencySelected : data.toCurrency,
                  rules: [{
                    required: true, message: bizMap.validToCurrency,
                  }],
                })(
                  <Select
                    multiple
                    showSearch
                    optionFilterProp="children"
                    placeholder={currencyBizMap.validCurrency}
                    style={{ width: '100%' }}
                  >
                    {currencySelect}
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={10}>
            <FormItem label={bizMap.dataSource} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('dataSource', {
                  initialValue: data.dataSource,
                  rules: [{
                    required: true, message: bizMap.validDataSource,
                  }],
                })(
                  <Input placeholder={bizMap.dataSource} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={14}>
            <FormItem label={bizMap.sourceKey} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('sourceKey', {
                  initialValue: data.sourceKey,
                  rules: [{
                    required: true, message: bizMap.validSourceKey,
                  }],
                })(
                  <Input placeholder={bizMap.sourceKey} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={10}>
            <FormItem label={bizMap.upRate} {...formItemLayout}>
              {
                getFieldDecorator('upRate', {
                  initialValue: data.upRate,
                  rules: [{
                    required: true, message: bizMap.validUpRate,
                  }, { validator: num100Valid }],
                })(
                  <Input placeholder={bizMap.upRate} maxLength="6" addonAfter="%" />,
                )
              }
            </FormItem>
          </Col>
          <Col span={14}>
            <FormItem label={bizMap.downRate} {...formItemLayout}>
              {
                getFieldDecorator('downRate', {
                  initialValue: data.downRate,
                  rules: [{
                    required: true, message: bizMap.validDownRate,
                  }, { validator: num100Valid }],
                })(
                  <Input placeholder={bizMap.downRate} maxLength="6" addonAfter="%" />,
                )
              }
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={10}>
            <FormItem label={bizMap.riskRateFloat} {...formItemLayout}>
              {
                getFieldDecorator('riskRateFloat', {
                  initialValue: data.riskRateFloat,
                  rules: [{
                    required: true, message: bizMap.validRiskRateFloat,
                  }, { validator: num100Valid }],
                })(
                  <Input placeholder={bizMap.riskRateFloat} maxLength="6" addonAfter="%" />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={10}>
            <FormItem label={bizMap.status} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('status', {
                  initialValue: data.status,
                  rules: [{
                    required: true, message: bizMap.validStatus,
                  }],
                })(
                  <Select placeholder={commonMap.select}>
                    <Option value="1">{bizMap['status-1']}</Option>
                    <Option value="0">{bizMap['status-0']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <h4>&nbsp;</h4>
        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit" loading={submiting}>{commonMap.submit}</Button>
            <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
}

PubExchangeRateForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
  currencyList: PropTypes.array,
};

PubExchangeRateForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
  currencyList: [],
}

export default Form.create()(PubExchangeRateForm);
