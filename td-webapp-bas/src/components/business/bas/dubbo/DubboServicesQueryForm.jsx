import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col, Select } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const DubboServicesQueryForm = (props) => {
  const bizMap = i18n.bizMap('bas/dubbo');
  const commonMap = i18n.commonMap();
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const { form, formSubmit } = props;
  const { getFieldDecorator, validateFields, getFieldsValue, resetFields } = form;
  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFields((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        formSubmit(dat);
      }
    });
  };
  const handleReset = () => {
    resetFields();
  }
  return (
    <Form layout="horizontal" onSubmit={handleSubmit}>
      <Row>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.name} {...formItemLayout}>
            {
              getFieldDecorator('name')(<Input placeholder={bizMap.name} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.status} {...formItemLayout}>
            {
              getFieldDecorator('status')(
                <Select placeholder={commonMap.select}>
                  <Option value="1">{bizMap['status-1']}</Option>
                  <Option value="2">{bizMap['status-2']}</Option>
                  <Option value="3">{bizMap['status-3']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col sm={24} md={24} style={{ textAlign: 'right', marginBottom: 16 }}>
          <Button type="primary" icon="search" htmlType="submit">{commonMap.search}</Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
        </Col>
      </Row>
    </Form>
  );
};

DubboServicesQueryForm.propTypes = {
  formSubmit: PropTypes.func,
};

DubboServicesQueryForm.defaultProps = {
  formSubmit: noop,
}

export default Form.create()(DubboServicesQueryForm);
