import React, { PropTypes } from 'react';
import { Form, Input, Select, Button, Row, Col } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const bizMap = i18n.bizMap('bms/agent');
const commonMap = i18n.commonMap();
const FormItem = Form.Item;
const Option = Select.Option;

const AgentQueryForm = (props) => {
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
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.agtStatus} {...formItemLayout}>
            {
              getFieldDecorator('agtStatus')(
                <Select initialValue="">
                  <Option value="">&nbsp;</Option>
                  <Option value="0">{commonMap['status-0']}</Option>
                  <Option value="1">{commonMap['status-1']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ textAlign: 'right', marginBottom: 16 }}>
          <Button type="primary" icon="search" htmlType="submit">{commonMap.search}</Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
        </Col>
      </Row>
    </Form>
  );
}

AgentQueryForm.propTypes = {
  formSubmit: PropTypes.func,
};

AgentQueryForm.defaultProps = {
  formSubmit: noop,
}

export default Form.create()(AgentQueryForm);
