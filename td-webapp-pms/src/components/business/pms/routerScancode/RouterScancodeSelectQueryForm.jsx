import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;

const RouterScancodeSelectQueryForm = (props) => {
  const bizMap = i18n.bizMap('pms/routerMerBankcard');
  const commonMap = i18n.commonMap();
  const { form, formSubmit, routerPayloadMerInfo } = props;
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
        <div hidden="true">
          <Col xs={24} sm={12} md={12}>
            <FormItem label={bizMap.merId} {...formItemLayout}>
              {
                getFieldDecorator('merId', { initialValue: routerPayloadMerInfo.merId })(<Input placeholder={bizMap.routerPayloadMerInfo} />)
              }
            </FormItem>
          </Col>
        </div>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.chnName} {...formItemLayout}>
            {
              getFieldDecorator('chnName')(<Input placeholder={bizMap.chnName} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.chnMerId} {...formItemLayout}>
            {
              getFieldDecorator('chnMerId')(<Input placeholder={bizMap.chnMerId} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.chnMerName} {...formItemLayout}>
            {
              getFieldDecorator('chnMerName')(<Input placeholder={bizMap.chnMerName} />)
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

RouterScancodeSelectQueryForm.propTypes = {
  formSubmit: PropTypes.func,
};

RouterScancodeSelectQueryForm.defaultProps = {
  formSubmit: noop,
}

export default Form.create()(RouterScancodeSelectQueryForm);
