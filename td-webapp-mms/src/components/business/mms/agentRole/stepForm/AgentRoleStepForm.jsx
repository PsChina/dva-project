import React, { PropTypes } from 'react';
import { Form, Input, Select, Button, Row, Col } from 'antd';
import * as i18n from '../../../../../utils/i18n';


const noop = () => { };
const FormItem = Form.Item;

const AgentRoleStepForm = (props) => {
  const bizMap = i18n.bizMap('mms/agent');
  const vaildMap = i18n.bizMap('mms/agentVaild');
  const commonMap = i18n.commonMap();
  const { form, style, data, submiting, addFormSubmit } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };
  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        addFormSubmit(dat);
      }
    });
  };

  const handleReset = () => {
    resetFields();
  }
  return (
    <Form layout="horizontal" style={style} onSubmit={handleSubmit}>
      <Row style={{ display: 'none' }}>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.roleId} {...formItemLayout}>
            {
              getFieldDecorator('roleId', {
                initialValue: data.roleId,
              })(
                <Input placeholder={bizMap.roleId} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.roleName} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('roleName', {
                initialValue: data.roleName,
                rules: [{ required: true, message: vaildMap.vaildAgtRoleName }],
              })(
                <Input placeholder={bizMap.roleName} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.roleDesc} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('roleDesc', {
                initialValue: data.roleDesc,
                rules: [{ required: false, max: 100, message: vaildMap.vaildAgtRoleDesc }],
              })(
                <Input type="textarea" placeholder={bizMap.roleDesc} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <h4 key="btn-split-5" className="split">&nbsp;</h4>
      <Row key="btn-row">
        <Col span={24} style={{ textAlign: 'center' }}>
          <Button type="primary" htmlType="submit" loading={submiting}>{commonMap.submit}</Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
        </Col>
      </Row>
    </Form>
  );
}

AgentRoleStepForm.propTypes = {
  style: PropTypes.object,
  data: PropTypes.object,
  submiting: PropTypes.bool,
  addFormSubmit: PropTypes.func,
};

AgentRoleStepForm.defaultProps = {
  style: {},
  data: {},
  submiting: false,
  addFormSubmit: noop,
}

export default Form.create()(AgentRoleStepForm);
