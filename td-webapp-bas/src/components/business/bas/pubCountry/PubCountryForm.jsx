import React, { PropTypes } from 'react';
import { Spin, Form, Input, Select, Button, Row, Col } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const PubCountryForm = (props) => {
  const bizMap = i18n.bizMap('bas/pubCountry');
  const commonMap = i18n.commonMap();
  const { form, data, loading, submiting, formSubmit, type } = props;
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
        formSubmit(getFieldsValue());
      }
    });
  };

  const handleReset = () => {
    resetFields();
  }

  const addCountryDom = [
    <Row key="u1">
      <Col span={22}>
        <FormItem label={bizMap.countryCode} {...formItemLayout} hasFeedback>
          {
            getFieldDecorator('countryCode', {
              initialValue: data.countryCode,
              rules: [{
                required: true, message: bizMap.validCountryCode,
              }],
            })(
              <Input placeholder={bizMap.countryCode} maxLength="3" />,
            )
          }
        </FormItem>
      </Col>
    </Row>,
  ]

  const updateCountryDom = [
    <Row key="u1">
      <Col span={22}>
        <FormItem label={bizMap.countryCode} {...formItemLayout} hasFeedback>
          {
            getFieldDecorator('countryCode', {
              initialValue: data.countryCode,
              rules: [{
                required: true, message: bizMap.validCountryCode,
              }],
            })(
              <Input placeholder={bizMap.countryCode} maxLength="3" disabled />,
            )
          }
        </FormItem>
      </Col>
    </Row>,
  ]

  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        { type === 'add' ? addCountryDom : updateCountryDom }
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.country} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('country', {
                  initialValue: data.country,
                  rules: [{
                    required: true, message: bizMap.validCountryCode,
                  }],
                })(
                  <Input placeholder={bizMap.country} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.countryShortName} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('countryShortName', {
                  initialValue: data.countryShortName,
                  rules: [{
                    required: true, message: bizMap.validCountryAbbreviations,
                  }],
                })(
                  <Input placeholder={bizMap.countryShortName} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
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

PubCountryForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
};

PubCountryForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
}

export default Form.create()(PubCountryForm);
