import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;

const TerminalAgentQueryForm = (props) => {
  const bizMap = i18n.bizMap('agtp/terminalAgent');
  const commonMap = i18n.commonMap();
  const { form, formSubmit } = props;
  const { getFieldDecorator, getFieldsValue, validateFields, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
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
        <Col span={12}>
          <FormItem label={bizMap.agtId} {...formItemLayout}>
            {
              getFieldDecorator('agtId')(<Input placeholder={bizMap.agtId} />)
            }
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label={bizMap.agtName} {...formItemLayout}>
            {
              getFieldDecorator('agtName')(<Input placeholder={bizMap.agtName} />)
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

TerminalAgentQueryForm.propTypes = {
  formSubmit: PropTypes.func,
};

TerminalAgentQueryForm.defaultProps = {
  formSubmit: noop,
}

export default Form.create()(TerminalAgentQueryForm);
