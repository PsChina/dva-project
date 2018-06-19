import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col, Select } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const Option = Select.Option;

const PubAnnmentQueryForm = (props) => {
  const bizMap = i18n.bizMap('bas/pubAnnment');
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
          <FormItem label={bizMap.title} {...formItemLayout}>
            {
              getFieldDecorator('title')(<Input maxLength={50} placeholder={bizMap.title} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.annType} {...formItemLayout}>
            {
              getFieldDecorator('annType')(
                <Select placeholder={commonMap.select}>
                  <Option value="">{}</Option>
                  <Option value="000">{bizMap['annType-000']}</Option>
                  <Option value="001">{bizMap['annType-001']}</Option>
                  <Option value="002">{bizMap['annType-002']}</Option>
                  <Option value="003">{bizMap['annType-003']}</Option>
                  <Option value="004">{bizMap['annType-004']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.issuestate} {...formItemLayout}>
            {
              getFieldDecorator('issuestate')(
                <Select placeholder={commonMap.select}>
                  <Option value="">{}</Option>
                  <Option value="0">{bizMap['issuestate-0']}</Option>
                  <Option value="1">{bizMap['issuestate-1']}</Option>
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

PubAnnmentQueryForm.propTypes = {
  formSubmit: PropTypes.func,
  addClick: PropTypes.func,
  deleteClick: PropTypes.func,
};

PubAnnmentQueryForm.defaultProps = {
  formSubmit: noop,
  addClick: noop,
  deleteClick: noop,
}

export default Form.create()(PubAnnmentQueryForm);
