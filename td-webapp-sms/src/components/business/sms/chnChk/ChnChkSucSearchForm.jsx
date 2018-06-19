import React, { PropTypes } from 'react';
import { Form, Button, Row, Col, Select } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;

const ChnChkSucSearchForm = (props) => {
  const bizMap = i18n.bizMap('sms/chnChkSum');
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
        formSubmit(getFieldsValue());
      }
    });
  };

  const handleReset = () => {
    resetFields();
  };

  return (
    <Form layout="horizontal" onSubmit={handleSubmit}>
      <Row>
        <Col xs={24} sm={12} md={12}>
          <FormItem label={bizMap.txnChannel} {...formItemLayout}>
            {
              getFieldDecorator('txnChannel')(
                <Select placeholder={commonMap.select}>
                  <Option value="" />
                  <Option value="0001">{bizMap['txnChannel-0001']}</Option>
                  <Option value="1011">{bizMap['txnChannel-1011']}</Option>
                  <Option value="1012">{bizMap['txnChannel-1012']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={12} style={{ textAlign: 'right', marginBottom: 16 }}>
          <Button type="primary" icon="search" htmlType="submit">{commonMap.search}</Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
        </Col>
      </Row>
    </Form>
  );
}

ChnChkSucSearchForm.propTypes = {
  formSubmit: PropTypes.func,
};

ChnChkSucSearchForm.defaultProps = {
  formSubmit: noop,
};

export default Form.create()(ChnChkSucSearchForm);
