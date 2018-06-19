import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import * as i18n from '../../../../../utils/i18n';


const noop = () => { };
const FormItem = Form.Item;

const SuBankQueryForm = (props) => {
  const bizMap = i18n.bizMap('mms/merchant');
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
        <Col span={8}>
          <FormItem label={bizMap.bankName} {...formItemLayout}>
            {
              getFieldDecorator('subBranch')(<Input placeholder={bizMap.bankName} />)
            }
          </FormItem>
        </Col>
        <Col span={8} >
          &nbsp;
        </Col>
        <Col span={8} style={{ textAlign: 'right', float: 'right' }}>
          <Button type="primary" icon="search" htmlType="submit">{commonMap.search}</Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
        </Col>
      </Row>
    </Form >
  );
}

SuBankQueryForm.propTypes = {
  formSubmit: PropTypes.func,
};

SuBankQueryForm.defaultProps = {
  formSubmit: noop,
}

export default Form.create()(SuBankQueryForm);
