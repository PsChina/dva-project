import React, { PropTypes } from 'react';
import { Form, Input, Select, Button, Row, Col } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;

const MerchantQueryForm = (props) => {
  const bizMap = i18n.bizMap('bms/merchant');
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
          <FormItem label={bizMap.merId} {...formItemLayout}>
            {
              getFieldDecorator('merId')(<Input placeholder={bizMap.merId} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.merName} {...formItemLayout}>
            {
              getFieldDecorator('merName')(<Input placeholder={bizMap.merName} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.merStatus} {...formItemLayout}>
            {
              getFieldDecorator('merStatus')(
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

MerchantQueryForm.propTypes = {
  formSubmit: PropTypes.func,
};

MerchantQueryForm.defaultProps = {
  formSubmit: noop,
}

export default Form.create()(MerchantQueryForm);
