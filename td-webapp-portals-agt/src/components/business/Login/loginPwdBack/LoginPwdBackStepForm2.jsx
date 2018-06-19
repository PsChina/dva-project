import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Row, Col } from 'antd';
import { encode } from '../../../../utils/code';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const commMap = i18n.commonMap();
const bizMap = i18n.bizMap('login');
const FormItem = Form.Item;

const LoginPwdBackStepForm2 = (props) => {
  const { form, prevClick, formSubmit, loading, confirmDirty, confirmBlur } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll } = form;
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        const newPsw = encode(dat.newPsw, 'md5');
        formSubmit({ newPsw });
      }
    });
  };

  const checkConfirm = (rule, value, callback) => {
    if (value && confirmDirty) {
      form.validateFields(['reNewPsw'], { force: true });
    }
    callback();
  }

  const checkPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('newPsw')) {
      callback(bizMap.diffTwoPwd);
    } else {
      callback();
    }
  }

  const handleConfirmBlur = (e) => {
    const value = e.target.value;
    confirmBlur(confirmDirty || !!value);
  }

  return (
    <Form layout="horizontal" onSubmit={handleSubmit} style={{ width: 430, margin: 'auto' }}>
      <Row>
        <Col span={24}>
          <FormItem {...formItemLayout} label={bizMap.newPassword}>
            {
              getFieldDecorator('newPsw', {
                initialValue: '',
                rules: [{
                  required: true, message: bizMap.validNewPwd,
                }, {
                  validator: checkConfirm,
                }],
              })(
                <Input size="large" type="password" />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem {...formItemLayout} label={bizMap.reNewPassword}>
            {
              getFieldDecorator('reNewPsw', {
                initialValue: '',
                rules: [{
                  required: true, message: bizMap.validReNewPwd,
                }, {
                  validator: checkPassword,
                }],
              })(
                <Input size="large" type="password" onBlur={handleConfirmBlur} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <h4 className="split" style={{ marginTop: 8 }}>&nbsp;</h4>
      <Row style={{ marginTop: 8 }}>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button style={{ float: 'left' }} onClick={prevClick}>{commMap.prevStep}</Button>
          <Button type="primary" htmlType="submit" loading={loading}>{commMap.finish}</Button>
        </Col>
      </Row>
    </Form>
  );
}

LoginPwdBackStepForm2.propTypes = {
  prevClick: PropTypes.func,
  formSubmit: PropTypes.func,
  loading: PropTypes.bool,
  confirmDirty: PropTypes.bool,
  confirmBlur: PropTypes.func,
};

LoginPwdBackStepForm2.defaultProps = {
  prevClick: noop,
  formSubmit: noop,
  loading: false,
  confirmDirty: false,
  confirmBlur: noop,
}

export default Form.create()(LoginPwdBackStepForm2);
