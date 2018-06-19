import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col, Select } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const Option = Select.Option;

const AgentUsrQueryForm = (props) => {
  const bizMap = i18n.bizMap('mms/merchant');
  const commonMap = i18n.commonMap();
  const { form, formSubmit, enableClick, disableClick, addOne, del } = props;
  const { getFieldDecorator, getFieldsValue, validateFields, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
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
        <Col span={8}>
          <FormItem label={bizMap.usrName} {...formItemLayout} hasFeedback>
            {
                getFieldDecorator('usrName')(
                  <Input placeholder={bizMap.usrName} />,
                )
              }
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label={bizMap.usrRealName} {...formItemLayout} hasFeedback>
            {
                getFieldDecorator('usrRealName')(
                  <Input placeholder={bizMap.usrRealName} />,
                )
              }
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label={bizMap.usrStatus} {...formItemLayout} hasFeedback>
            {
                getFieldDecorator('usrStatus')(
                  <Select initialValue="">
                    <Option value="">&nbsp;</Option>
                    <Option value="0">{bizMap['usrStatus-01']}</Option>
                    <Option value="1">{bizMap['usrStatus-02']}</Option>
                  </Select>,
                )
              }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <FormItem label={bizMap.usrEmail} {...formItemLayout} hasFeedback>
            {
                getFieldDecorator('usrEmail')(
                  <Input placeholder={bizMap.usrEmail} />,
                )
              }
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label={bizMap.usrMobile} {...formItemLayout} hasFeedback>
            {
                getFieldDecorator('usrMobile')(
                  <Input placeholder={bizMap.usrMobile} />,
                )
              }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col sm={24} md={12} style={{ marginBottom: 16 }}>
          {/*<ButtonGroup>
            <Button type="primary" icon="plus" onClick={addOne}>{commonMap.add}</Button>
            <Button type="default" icon="cross" onClick={del}>{commonMap.delete}</Button> &nbsp;
            <Button icon="check" type="primary" onClick={enableClick}>{commonMap.enable}</Button>
            <Button icon="minus" onClick={disableClick}>{commonMap.disable}</Button>
          </ButtonGroup>*/}
        </Col>
        <Col sm={24} md={12} style={{ textAlign: 'right', marginBottom: 16 }}>
          <Button type="primary" icon="search" htmlType="submit">{commonMap.search}</Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
        </Col>
      </Row>
    </Form>
  );
}

AgentUsrQueryForm.propTypes = {
  formSubmit: PropTypes.func,
  enableClick: PropTypes.func,
  disableClick: PropTypes.func,
};

AgentUsrQueryForm.defaultProps = {
  advExpand: false,
  collapseClick: noop,
  formSubmit: noop,
  enableClick: noop,
  disableClick: noop,
}

export default Form.create()(AgentUsrQueryForm);
