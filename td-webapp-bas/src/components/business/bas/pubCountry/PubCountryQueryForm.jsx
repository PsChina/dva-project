import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col, Select } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const Option = Select.Option;

const PubCountryQueryForm = (props) => {
  const bizMap = i18n.bizMap('bas/pubCountry');
  const commonMap = i18n.commonMap();
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const { form, formSubmit, deleteClick, addClick, enableClick, disableClick } = props;
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
          <FormItem label={bizMap.country} {...formItemLayout}>
            {
              getFieldDecorator('country')(<Input placeholder={bizMap.country} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.status} {...formItemLayout}>
            {
              getFieldDecorator('status')(
                <Select placeholder={bizMap.status}>
                  <Option value="">{}</Option>
                  <Option value="1">{bizMap['status-1']}</Option>
                  <Option value="0">{bizMap['status-0']}</Option>
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
            <Button style={{ marginLeft: 8 }} icon="check" onClick={enableClick}>{commonMap['status-1']}</Button>
            <Button style={{ marginLeft: 8 }} icon="minus" onClick={disableClick}>{commonMap['status-0']}</Button>
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

PubCountryQueryForm.propTypes = {
  formSubmit: PropTypes.func,
  addClick: PropTypes.func,
  deleteClick: PropTypes.func,
  enableClick: PropTypes.func,
  disableClick: PropTypes.func,
};

PubCountryQueryForm.defaultProps = {
  formSubmit: noop,
  addClick: noop,
  deleteClick: noop,
  enableClick: noop,
  disableClick: noop,
}

export default Form.create()(PubCountryQueryForm);
