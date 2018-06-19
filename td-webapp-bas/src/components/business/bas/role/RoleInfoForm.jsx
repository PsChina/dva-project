import React, { PropTypes } from 'react';
import { Spin, Form, Input, Select, Button, Row, Col } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;

const RoleInfoForm = (props) => {
  const bizMap = i18n.bizMap('bas/role');
  const commonMap = i18n.commonMap();
  const { form, data, loading, submiting, formSubmit, type } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
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
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <Row style={{ display: 'none' }}>
          <Col span={24}>
            <FormItem label={bizMap.roleId} {...formItemLayout}>
              {
                getFieldDecorator('roleId', {
                  initialValue: data.roleId,
                })(
                  <Input />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.roleName} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('roleName', {
                  initialValue: data.roleName,
                  rules: [{
                    required: true, message: bizMap.validRoleName,
                  }],
                })(
                  <Input maxLength={20} placeholder={bizMap.roleName} disabled={type === 'update'} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.sysFrom} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('sysId', {
                  initialValue: data.sysId,
                  rules: [{
                    required: true, message: bizMap.validSysFrom,
                  }],
                })(
                  <Select>
                    <Option value="">&nbsp;</Option>
                    <Option value="000">{commonMap['sysId-000']}</Option>
                    <Option value="001">{commonMap['sysId-001']}</Option>
                    <Option value="100">{commonMap['sysId-100']}</Option>
                    <Option value="101">{commonMap['sysId-101']}</Option>
                    <Option value="102">{commonMap['sysId-102']}</Option>
                    <Option value="103">{commonMap['sysId-103']}</Option>
                    <Option value="104">{commonMap['sysId-104']}</Option>
                    <Option value="200">{commonMap['sysId-200']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.roleDesc} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('roleDesc', {
                  initialValue: data.roleDesc,
                })(
                  <Input maxLength={33} type="textarea" rows={4} placeholder={bizMap.roleDesc} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <h4>&nbsp;</h4>
        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit" loading={submiting}>{commonMap.submit}</Button>
            <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
}

RoleInfoForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
};

RoleInfoForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
}

export default Form.create()(RoleInfoForm);
