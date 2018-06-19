import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;

const TerminalMerQueryForm = (props) => {
  const bizMap = i18n.bizMap('agtp/terminalMer');
  const commonMap = i18n.commonMap();
  const { form, formSubmit } = props;
  const { getFieldDecorator, getFieldsValue, validateFields, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 17 },
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
          <FormItem label={bizMap.merId} {...formItemLayout}>
            {
              getFieldDecorator('merId')(<Input placeholder={bizMap.merId} />)
            }
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label={bizMap.merName} {...formItemLayout}>
            {
              getFieldDecorator('merName')(<Input placeholder={bizMap.merName} />)
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormItem label={bizMap.braId} {...formItemLayout}>
            {
              getFieldDecorator('braId')(<Input placeholder={bizMap.braId} />)
            }
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label={bizMap.braName} {...formItemLayout}>
            {
              getFieldDecorator('braName')(<Input placeholder={bizMap.braName} />)
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

TerminalMerQueryForm.propTypes = {
  formSubmit: PropTypes.func,
};

TerminalMerQueryForm.defaultProps = {
  formSubmit: noop,
}

export default Form.create()(TerminalMerQueryForm);
