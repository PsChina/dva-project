import React, { PropTypes } from 'react';
import { Form, Button, Row, Col, Select } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const Option = Select.Option;

const RuleTempQueryForm = (props) => {
  const bizMap = i18n.bizMap('rms/warnRule');
  const commonMap = i18n.commonMap();
  const { form, formSubmit } = props;
  const { getFieldDecorator, getFieldsValue, validateFields, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
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
        <Col xs={24} sm={12}>
          <FormItem label={bizMap.tmpType} {...formItemLayout}>
            {
              getFieldDecorator('tmpType')(
                <Select>
                  <Option value="">&nbsp;</Option>
                  <Option value="0">{bizMap['tmpType-0']}</Option>
                  <Option value="1">{bizMap['tmpType-1']}</Option>
                  <Option value="2">{bizMap['tmpType-2']}</Option>
                  <Option value="3">{bizMap['tmpType-3']}</Option>
                </Select>,
                )
            }
          </FormItem>
        </Col>
        <Col sm={24} md={12} style={{ textAlign: 'right', marginBottom: 16 }}>
          <Button type="primary" icon="search" htmlType="submit">{commonMap.search}</Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
        </Col>
      </Row>
    </Form>
  );
}

RuleTempQueryForm.propTypes = {
  formSubmit: PropTypes.func,
  addClick: PropTypes.func,
  deleteClick: PropTypes.func,
};

RuleTempQueryForm.defaultProps = {
  collapseClick: noop,
  formSubmit: noop,
  addClick: noop,
  deleteClick: noop,
}

export default Form.create()(RuleTempQueryForm);
