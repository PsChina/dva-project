import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col, Select } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const Option = Select.Option;

const PubMccQueryForm = (props) => {
  const bizMap = i18n.bizMap('bas/pubMcc');
  const commonMap = i18n.commonMap();
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const { form, formSubmit, deleteClick, addClick } = props;
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
  }
  return (
    <Form layout="horizontal" onSubmit={handleSubmit}>
      <Row>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.mccChannel} {...formItemLayout}>
            {
              getFieldDecorator('mccChannel')(
                <Select placeholder={commonMap.select}>
                  <Option value="">{}</Option>
                  <Option value="UnionPay">{bizMap['mccChannel-01']}</Option>
                  <Option value="AliPay">{bizMap['mccChannel-02']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.mccCode} {...formItemLayout}>
            {
              getFieldDecorator('mccCode')(<Input maxLength={4} placeholder={bizMap.mccCode} />)
            }
          </FormItem>
        </Col>
        {/**
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.mccCls} {...formItemLayout}>
            {
              getFieldDecorator('mccCls')(<Input maxLength={166} placeholder={bizMap.mccCls} />)
            }
          </FormItem>
        </Col>
       */}
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.mccUnistdrat} {...formItemLayout}>
            {
              getFieldDecorator('mccUnistdrat')(
                <Select placeholder={commonMap.select}>
                  <Option value="">{}</Option>
                  <Option value="1">{bizMap['mccUnistdrat-01']}</Option>
                  <Option value="2">{bizMap['mccUnistdrat-02']}</Option>
                  <Option value="3">{bizMap['mccUnistdrat-03']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col sm={24} md={12} style={{ marginBottom: 16 }}>
          <ButtonGroup>
            <Button icon="plus" type="primary" onClick={addClick}>{commonMap.add}</Button>
            <Button style={{ marginLeft: 8 }} icon="delete" onClick={deleteClick}>{commonMap.delete}</Button>
          </ButtonGroup>
        </Col>
        <Col sm={24} md={12} style={{ textAlign: 'right', marginBottom: 16 }}>
          <Button type="primary" icon="search" htmlType="submit">{commonMap.search}</Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
        </Col>
      </Row>
    </Form>
  );
};

PubMccQueryForm.propTypes = {
  formSubmit: PropTypes.func,
  addClick: PropTypes.func,
  deleteClick: PropTypes.func,
};

PubMccQueryForm.defaultProps = {
  formSubmit: noop,
  addClick: noop,
  deleteClick: noop,
}

export default Form.create()(PubMccQueryForm);
