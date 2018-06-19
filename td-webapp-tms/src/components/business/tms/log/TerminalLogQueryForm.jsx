import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col, Select } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const TerminalLogQueryForm = (props) => {
  const bizMap = i18n.bizMap('tms/terminalLog');
  const dataMap = i18n.bizMap('tms/tmsData');
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
          <FormItem label={bizMap.terId} {...formItemLayout}>
            {
              getFieldDecorator('terId')(<Input placeholder={bizMap.terId} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.optTerPhyno} {...formItemLayout}>
            {
              getFieldDecorator('optTerPhyno')(<Input placeholder={bizMap.optTerPhyno} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.optStep} {...formItemLayout}>
            {
              getFieldDecorator('optStep')(
                <Select initialValue="">
                  <Option value="">&nbsp;</Option>
                  <Option value="0">{dataMap['optStep-0']}</Option>
                  <Option value="1">{dataMap['optStep-1']}</Option>
                  <Option value="2">{dataMap['optStep-2']}</Option>
                  <Option value="3">{dataMap['optStep-3']}</Option>
                  <Option value="4">{dataMap['optStep-4']}</Option>
                  <Option value="5">{dataMap['optStep-5']}</Option>
                  <Option value="6">{dataMap['optStep-6']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.optOrg} {...formItemLayout}>
            {
              getFieldDecorator('optOrg')(
                <Select initialValue="">
                  <Option value="">&nbsp;</Option>
                  <Option value="1">{commonMap['org-1']}</Option>
                  <Option value="2">{commonMap['org-2']}</Option>
                  <Option value="3">{commonMap['org-3']}</Option>
                  <Option value="4">{commonMap['org-4']}</Option>
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
    </Form>
  );
}

TerminalLogQueryForm.propTypes = {
  formSubmit: PropTypes.func,
  // addClick: PropTypes.func,
  // deleteClick: PropTypes.func,
};

TerminalLogQueryForm.defaultProps = {
  formSubmit: noop,
  addClick: noop,
  deleteClick: noop,
}

export default Form.create()(TerminalLogQueryForm);
