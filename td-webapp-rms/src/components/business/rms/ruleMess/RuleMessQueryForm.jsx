import React, { PropTypes } from 'react';
import { Form, Button, Row, Col, Select, Input } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const Option = Select.Option;

const RuleMessQueryForm = (props) => {
  const bizMap = i18n.bizMap('rms/warnRule');
  const commonMap = i18n.commonMap();
  const { form, formSubmit, enableClick, disableClick } = props;
  const { getFieldDecorator, getFieldsValue, validateFields, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
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
        <Col xs={24} sm={8} md={6}>
          <FormItem label={bizMap.ruleId} {...formItemLayout}>
            {
              getFieldDecorator('ruleId')(
                <Input />,
                )
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={8} md={6}>
          <FormItem label={bizMap.ruleName} {...formItemLayout}>
            {
              getFieldDecorator('ruleName')(
                <Input />,
                )
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={8} md={6}>
          <FormItem label={bizMap.ruleStatus} {...formItemLayout}>
            {
              getFieldDecorator('ruleStatus')(
                <Select>
                  <Option value="">&nbsp;</Option>
                  <Option value="1">{bizMap['ruleStatus-1']}</Option>
                  <Option value="2">{bizMap['ruleStatus-2']}</Option>
                </Select>,
                )
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={8} md={6}>
          <FormItem label={bizMap.ruleTriType} {...formItemLayout}>
            {
              getFieldDecorator('ruleTriType')(
                <Select>
                  <Option value="">&nbsp;</Option>
                  <Option value="1">{bizMap['TriType-1']}</Option>
                  <Option value="2">{bizMap['TriType-2']}</Option>
                </Select>,
                )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={12} style={{ marginBottom: 16 }}>
          <ButtonGroup>
            <Button icon="check" type="primary" onClick={enableClick}>{commonMap.enable}</Button>
            <Button icon="minus" onClick={disableClick}>{commonMap.disable}</Button>
          </ButtonGroup>
        </Col>
        <Col sm={12} md={12} style={{ textAlign: 'right', marginBottom: 16 }}>
          <Button type="primary" icon="search" htmlType="submit">{commonMap.search}</Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
        </Col>
      </Row>
    </Form>
  );
}

RuleMessQueryForm.propTypes = {
  formSubmit: PropTypes.func,
  enableClick: PropTypes.func,
  disableClick: PropTypes.func,
};

RuleMessQueryForm.defaultProps = {
  formSubmit: noop,
  enableClick: noop,
  disableClick: noop,
}

export default Form.create()(RuleMessQueryForm);
