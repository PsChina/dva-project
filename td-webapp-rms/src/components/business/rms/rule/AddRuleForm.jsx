import React, { PropTypes } from 'react';
import { Spin, Form, Input, Button, Row, Col, InputNumber, Select } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;

const AddRuleForm = (props) => {
  const bizMap = i18n.bizMap('rms/warnRule');
  const commonMap = i18n.commonMap();
  const { form, data, loading, submiting, formSubmit, addTmpId, addTmpName } = props;
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
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <FormItem label={bizMap.tmpId} style={{ display: 'none' }}>
          {
            getFieldDecorator('tmpId', {
              initialValue: addTmpId,
            })(
              <Input />,
            )
          }
        </FormItem>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.ruleTemp} {...formItemLayout1}>
              {
                getFieldDecorator('ruleName', {
                  initialValue: addTmpName,
                })(
                  <Input type="textarea" disabled />,
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
                getFieldDecorator('ruleTriRate')(
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
                  initialValue: data.param1 || 0,
                })(
                  <InputNumber min={0} step={1} placeholder={bizMap.param1} />,
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
                  initialValue: data.param2 || 0,
                })(
                  <InputNumber min={0} step={1} placeholder={bizMap.param2} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.param3} {...formItemLayout} >
              {
                getFieldDecorator('ruleParam3', {
                  initialValue: data.param3 || 0,
                })(
                  <InputNumber min={0} step={1} placeholder={bizMap.param3} />,
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
                  initialValue: data.param4 || 0,
                })(
                  <InputNumber min={0} step={1} placeholder={bizMap.param4} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.param5} {...formItemLayout} >
              {
                getFieldDecorator('ruleParam5', {
                  initialValue: data.param5 || 0,
                })(
                  <InputNumber min={0} step={1} placeholder={bizMap.param5} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.remarks} {...formItemLayout1}>
              {
                getFieldDecorator('ruleRemark')(
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

AddRuleForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
  addTmpName: PropTypes.string,
};

AddRuleForm.defaultProps = {
  data: {},
  addTmpName: '',
  loading: false,
  submiting: false,
  formSubmit: noop,
}

export default Form.create()(AddRuleForm);
