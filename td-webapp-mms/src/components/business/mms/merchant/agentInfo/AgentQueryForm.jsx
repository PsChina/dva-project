import React, { PropTypes } from 'react';
import { Form, Input, Select, Button, Row, Col } from 'antd';
import * as i18n from '../../../../../utils/i18n';


const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;

const AgentQueryForm = (props) => {
  const bizMap = i18n.bizMap('mms/agent');
  const commonMap = i18n.commonMap();
  const { form, formSubmit } = props;
  const { getFieldDecorator, getFieldsValue, validateFields, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFields((errors) => {
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
    <Form layout="horizontal" onSubmit={handleSubmit}>
      <Row>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.agtId} {...formItemLayout}>
            {
              getFieldDecorator('agtId')(<Input placeholder={bizMap.agtId} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.agtName} {...formItemLayout}>
            {
              getFieldDecorator('agtName')(<Input placeholder={bizMap.agtName} />)
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.agtType} {...formItemLayout}>
            {
              getFieldDecorator('agtType')(
                <Select initialValue="">
                  <Option value="">&nbsp;</Option>
                  <Option value="0">{bizMap['agtType-0']}</Option>
                  <Option value="1">{bizMap['agtType-1']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.agtScope} {...formItemLayout}>
            {
              getFieldDecorator('agtScope')(
                <Select initialValue="">
                  <Option value="">&nbsp;</Option>
                  <Option value="01">{bizMap['agtScope-01']}</Option>
                  <Option value="02">{bizMap['agtScope-02']}</Option>
                  <Option value="03">{bizMap['agtScope-03']}</Option>
                  <Option value="04">{bizMap['agtScope-04']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col sm={24} md={12} style={{ marginBottom: 16 }}>
          &nbsp;
        </Col>
        <Col sm={24} md={12} style={{ textAlign: 'right', marginBottom: 16 }}>
          <Button type="primary" icon="search" htmlType="submit">{commonMap.search}</Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
        </Col>
      </Row>
    </Form >
  );
}

AgentQueryForm.propTypes = {
  formSubmit: PropTypes.func,
};

AgentQueryForm.defaultProps = {
  formSubmit: noop,
}

export default Form.create()(AgentQueryForm);
