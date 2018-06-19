import React, { PropTypes } from 'react';
import { Spin, Form, Input, Button, Row, Col, InputNumber, Select } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;

const ModifyRuleForm = (props) => {
  const bizMap = i18n.bizMap('rms/warnRule');
  const commonMap = i18n.commonMap();
  const { form, data, updateloading, submiting, formSubmit } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };
  const formItemLayout1 = {
    labelCol: { span: 3 },
    wrapperCol: { span: 21 },
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
    <Spin spinning={updateloading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.ruleName} {...formItemLayout1}>
              {
                getFieldDecorator('ruleName', {
                  initialValue: data.ruleName,
                })(
                  <Input type="textarea" disabled />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.ruleId} {...formItemLayout}>
              {
                getFieldDecorator('ruleId', {
                  initialValue: data.ruleId,
                })(
                  <Input disabled />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.tmpId} {...formItemLayout}>
              {
                getFieldDecorator('tmpId', {
                  initialValue: data.tmpId,
                })(
                  <Input disabled />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.ruleTriType} {...formItemLayout}>
              {
                getFieldDecorator('ruleTriType', {
                  initialValue: data.ruleTriType,
                  rules: [{
                    required: true, message: bizMap.validRuleTriType,
                  }],
                })(
                  <Select>
                    <Option value="">&nbsp;</Option>
                    <Option value="1">{bizMap['TriType-1']}</Option>
                    <Option value="2">{bizMap['TriType-2']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.ruleTriRate} {...formItemLayout}>
              {
                getFieldDecorator('ruleTriRate', {
                  initialValue: data.ruleTriRate,
                })(
                  <Input />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.ruleWarnType} {...formItemLayout}>
              {
                getFieldDecorator('ruleWarnType', {
                  initialValue: data.ruleWarnType,
                  rules: [{
                    required: true, message: bizMap.validRuleWarnType,
                  }],
                })(
                  <Select>
                    <Option value="">&nbsp;</Option>
                    <Option value="1">{bizMap['warnType-1']}</Option>
                    <Option value="2">{bizMap['warnType-2']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.param1} {...formItemLayout} >
              {
                getFieldDecorator('ruleParam1', {
                  initialValue: data.ruleParam1 || 0,
                })(
                  <InputNumber min={0} step={1} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.param2} {...formItemLayout} >
              {
                getFieldDecorator('ruleParam2', {
                  initialValue: data.ruleParam2 || 0,
                })(
                  <InputNumber min={0} step={1} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.param3} {...formItemLayout} >
              {
                getFieldDecorator('ruleParam3', {
                  initialValue: data.ruleParam3 || 0,
                })(
                  <InputNumber min={0} step={1} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.param4} {...formItemLayout} >
              {
                getFieldDecorator('ruleParam4', {
                  initialValue: data.ruleParam4 || 0,
                })(
                  <InputNumber min={0} step={1} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.param5} {...formItemLayout} >
              {
                getFieldDecorator('ruleParam5', {
                  initialValue: data.ruleParam5 || 0,
                })(
                  <InputNumber min={0} step={1} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.remarks} {...formItemLayout1}>
              {
                getFieldDecorator('ruleRemark', {
                  initialValue: data.ruleRemark,
                })(
                  <Input type="textarea" />,
                )
              }
            </FormItem>
          </Col>
        </Row>
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

ModifyRuleForm.propTypes = {
  data: PropTypes.object,
  updateloading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
};

ModifyRuleForm.defaultProps = {
  data: {},
  updateloading: false,
  submiting: false,
  formSubmit: noop,
}

export default Form.create()(ModifyRuleForm);
