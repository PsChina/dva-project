import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;

const RouterMerchantQueryForm = (props) => {
  const bizMap = i18n.bizMap('pms/routerMerBankcard');
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
        {/*<Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.merId} {...formItemLayout}>
            {
              getFieldDecorator('merId')(<Input placeholder={bizMap.merId} />)
            }
          </FormItem>
        </Col>*/}
        <Col xs={24} sm={24} md={12}>
          <FormItem label={bizMap.merName} {...formItemLayout}>
            {
              getFieldDecorator('merName')(<Input placeholder={bizMap.merName} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={24} md={12}>
          <FormItem label={bizMap.merNo} {...formItemLayout}>
            {
              getFieldDecorator('merNo')(<Input placeholder={bizMap.merNo} />)
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
}

RouterMerchantQueryForm.propTypes = {
  formSubmit: PropTypes.func,
};

RouterMerchantQueryForm.defaultProps = {
  formSubmit: noop,
}

export default Form.create()(RouterMerchantQueryForm);
