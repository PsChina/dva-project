import React, { PropTypes } from 'react';
import { Spin, Form, Input, Select, Button, Row, Col } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const PubMccForm = (props) => {
  const bizMap = i18n.bizMap('bas/pubMcc');
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

  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.mccChannel} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('mccChannel', {
                  initialValue: data.mccChannel,
                  rules: [{
                    required: true, message: bizMap.validMccChannel,
                  }],
                })(
                  <Select>
                    <Option value="UnionPay">{bizMap['mccChannel-01']}</Option>
                    <Option value="AliPay">{bizMap['mccChannel-02']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.mccCode} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('mccCode', {
                  initialValue: data.mccCode,
                  rules: [{
                    required: true, message: bizMap.validMccCode,
                  }],
                })(
                  <Input maxLength={4} placeholder={bizMap.mccCode} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.mccCls} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('mccCls', {
                  initialValue: data.mccCls,
                  rules: [{
                    required: true, message: bizMap.validMccCls,
                  }],
                })(
                  <Input maxLength={166} placeholder={bizMap.mccCls} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.mccUnistdrat} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('mccUnistdrat', {
                  initialValue: data.mccUnistdrat,
                  rules: [{
                    required: true, message: bizMap.validMccUnistdrat,
                  }],
                })(
                  <Select>
                    <Option value="1">{bizMap['mccUnistdrat-01']}</Option>
                    <Option value="2">{bizMap['mccUnistdrat-02']}</Option>
                    <Option value="3">{bizMap['mccUnistdrat-03']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.mccDesc} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('mccDesc', {
                  initialValue: data.mccDesc,
                  rules: [{
                    required: true, message: bizMap.validMccDesc,
                  }],
                })(
                  <Input maxLength={666} placeholder={bizMap.mccDesc} />,
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

PubMccForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
};

PubMccForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
}

export default Form.create()(PubMccForm);
