import React, { PropTypes } from 'react';
import { Spin, Form, Input, Button, Row, Col, InputNumber } from 'antd';
import * as i18n from '../../../../utils/i18n';
import { emailValid } from '../../../../utils/vaild';

const noop = () => { };
const FormItem = Form.Item;

const JobTriggerInfoForm = (props) => {
  const bizMap = i18n.bizMap('bas/jobTriggerInfo');
  const validMap = i18n.bizMap('bas/basVaild');
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
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.jobGroup} {...formItemLayout}>
              {
                getFieldDecorator('jobGroup', {
                  initialValue: 'DEFAULT',
                })(
                  <Input disabled />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.jobName} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('jobName', {
                  initialValue: data.jobName,
                  rules: [{
                    required: true, message: validMap.validJobName,
                  }],
                })(
                  <Input placeholder={bizMap.jobName} disabled={type === 'update'} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.jobCron} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('jobCron', {
                  initialValue: data.jobCron,
                  rules: [{
                    required: true, message: validMap.validJobCron,
                  }],
                })(
                  <Input placeholder={bizMap.jobCron} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.jobDesc} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('jobDesc', {
                  initialValue: data.jobDesc,
                  rules: [{
                    required: true, message: validMap.validJobDesc,
                  }],
                })(
                  <Input placeholder={bizMap.jobDesc} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.executorAddress} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('executorAddress', {
                  initialValue: data.executorAddress,
                  rules: [{
                    required: true, message: validMap.validExecutorAddress,
                  }],
                })(
                  <Input placeholder={bizMap.executorAddress} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.executorHandler} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('executorHandler', {
                  initialValue: data.executorHandler,
                  rules: [{
                    required: true, message: validMap.validExecutorHandler,
                  }],
                })(
                  <Input placeholder={bizMap.executorHandler} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.executorParam} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('executorParam', {
                  initialValue: data.executorParam,
                })(
                  <Input placeholder={bizMap.executorParam} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.author} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('author', {
                  initialValue: data.author,
                  rules: [{
                    required: true, message: validMap.validAuthor,
                  }],
                })(
                  <Input placeholder={bizMap.author} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.alarmEmail} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('alarmEmail', {
                  initialValue: data.alarmEmail,
                  rules: [{
                    required: true, message: validMap.validAlarmEmail,
                  }, { validator: emailValid }],
                  validateTrigger: 'onBlur',
                })(
                  <Input placeholder={bizMap.alarmEmail} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.alarmThreshold} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('alarmThreshold', {
                  initialValue: data.alarmThreshold,
                  rules: [{
                    required: true, message: validMap.validAlarmThreshold,
                  }],
                })(
                  <InputNumber min={1} style={{ width: 200 }} />,
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

JobTriggerInfoForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
};

JobTriggerInfoForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
}

export default Form.create()(JobTriggerInfoForm);
