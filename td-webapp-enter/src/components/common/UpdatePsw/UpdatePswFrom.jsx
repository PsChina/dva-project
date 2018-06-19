import React, { PropTypes } from 'react';
import { Spin, Form, Input, Select, Button, Row, Col, Icon } from 'antd';
import * as i18n from '../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const UpdatePswFrom = (props) => {
  const bizMap = i18n.bizMap('login');
  const commonMap = i18n.commonMap();
  const { form, data, loading, submiting, formSubmit, confirmDirty } = props;
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


  const checkConfirm = (rule, value, callback) => {
    if (value && confirmDirty) {
      form.validateFields(['reNewPwd'], { force: true });
    }
    callback();
  }

  const checkPassword = (rule, value, callback) => {
    if (value && value !== getFieldsValue().newPasswd) {
      callback(bizMap.diffTwoPwd);
    } else {
      callback();
    }
  }

  const handleReset = () => {
    resetFields();
  }

  const passwordProps = {
    addonBefore: <Icon type="lock" />,
    size: 'large',
    type: 'password',
    // placeholder: commonMap.password,
  };

  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        {/*<div hidden>
          <Row>
            <Col span={22}>
              <FormItem label={bizMap.userName} {...formItemLayout} hasFeedback>
                {
                  getFieldDecorator('userName', {
                    initialValue: data.userName,
                    rules: [{
                      required: true, message: bizMap.validUserName,
                    }],
                  })(
                    <Input placeholder={bizMap.userName} disabled />,
                  )
                }
              </FormItem>
            </Col>
          </Row>
        </div>*/}
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.oldPasswd} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('oldPasswd', {
                  initialValue: data.oldPasswd,
                  rules: [{
                    required: true, message: bizMap.validOldPasswd,
                  }],
                })(
                  <Input placeholder={bizMap.oldPasswd} {...passwordProps} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.newPasswd} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('newPasswd', {
                  initialValue: data.newPasswd,
                  rules: [{
                    required: true, message: bizMap.validNewPasswd,
                  }, {
                    validator: checkConfirm,
                  }],
                })(
                  <Input placeholder={bizMap.newPasswd} {...passwordProps} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.newPasswdConfirm} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('newPasswdConfirm', {
                  initialValue: data.newPasswdConfirm,
                  rules: [{
                    required: true, message: bizMap.validNewPasswdConfirm,
                  }, { validator: checkPassword }],
                })(
                  <Input placeholder={bizMap.newPasswdConfirm} {...passwordProps} />,
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

UpdatePswFrom.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
};

UpdatePswFrom.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
}

export default Form.create()(UpdatePswFrom);
