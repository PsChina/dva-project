import React, { PropTypes } from 'react';
import { Form, Input, Select, Button, Row, Col } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group;

const WarnGroupQueryForm = (props) => {
  const bizMap = i18n.bizMap('rms/warnGroup');
  const commonMap = i18n.commonMap();
  const { form, formSubmit, addClick, deleteClick, value } = props;
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
        <Col xs={24} sm={8} md={8}>
          <FormItem label={bizMap.groupName} {...formItemLayout}>
            {
              getFieldDecorator('grpName')(<Input placeholder={bizMap.groupName} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={8} md={8}>
          <FormItem label={bizMap.grpOrgId} {...formItemLayout}>
            {
              getFieldDecorator('grpOrgId')(
                <Select mode="multiple">
                  <Option value="">&nbsp;</Option>
                  <Option value="01">{bizMap['grpOrgId-01']}</Option>
                  <Option value="02">{bizMap['grpOrgId-02']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col sm={24} md={8} style={{ marginBottom: 16 }}>
          <ButtonGroup>
            <Button type="primary" icon="plus" onClick={addClick}>{commonMap.add}</Button>
            <Button icon="cross" onClick={deleteClick}>{commonMap.delete}</Button>
          </ButtonGroup>
        </Col>
        <Col sm={24} md={16} style={{ textAlign: 'right', marginBottom: 16 }}>
          <Button type="primary" icon="search" htmlType="submit">{commonMap.search}</Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
        </Col>
      </Row>
    </Form>
  );
}

WarnGroupQueryForm.propTypes = {
  formSubmit: PropTypes.func,
  addClick: PropTypes.func,
  deleteClick: PropTypes.func,
};

WarnGroupQueryForm.defaultProps = {
  formSubmit: noop,
  addClick: noop,
  deleteClick: noop,
}

export default Form.create()(WarnGroupQueryForm);
