import React, { PropTypes } from 'react';
import { Spin, Form, Input, Select, Button, Row, Col } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;

const ProductQueryForm = (props) => {
  const bizMap = i18n.bizMap('demo/product');
  const commonMap = i18n.commonMap();
  const { form, data, loading, submiting, formSubmit } = props;
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
        <Row style={{ display: 'none' }}>
          <Col span={24}>
            <FormItem label={bizMap.prodId} {...formItemLayout}>
              {
                getFieldDecorator('prodId', {
                  initialValue: data.prodId,
                })(
                  <Input placeholder={bizMap.prodId} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.prodName} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('prodName', {
                  initialValue: data.prodName,
                  rules: [{
                    required: true, message: bizMap.validProdName,
                  }],
                })(
                  <Input placeholder={bizMap.prodName} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.prodType} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('prodType', {
                  initialValue: data.prodType,
                  rules: [{
                    required: true, message: bizMap.validProdType,
                  }],
                })(
                  <Select>
                    <Option value="">&nbsp;</Option>
                    <Option value="1">{bizMap['prodType-1']}</Option>
                    <Option value="2">{bizMap['prodType-2']}</Option>
                    <Option value="3">{bizMap['prodType-3']}</Option>
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

ProductQueryForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
};

ProductQueryForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
}

export default Form.create()(ProductQueryForm);
