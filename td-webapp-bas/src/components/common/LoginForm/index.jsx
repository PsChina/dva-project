import React, { PropTypes } from 'react';
import { Row, Col, Form, Input, Button, Icon } from 'antd';
import styles from './index.less';
import * as i18n from '../../../utils/i18n';

const noop = () => {};

const LoginForm = (props) => {
  const FormItem = Form.Item;
  const { form, title, loading, formSubmit } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll } = form;

  const commonMap = i18n.commonMap();
  const bizMap = i18n.bizMap('login');
  const formItemLayout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 },
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

  const usernameProps = {
    addonBefore: <Icon type="user" />,
    size: 'large',
    placeholder: commonMap.username,
  };
  const passwordProps = {
    addonBefore: <Icon type="lock" />,
    size: 'large',
    type: 'password',
    placeholder: commonMap.password,
  };
  const btnProps = {
    loading,
    className: styles.login_submit_btn,
    size: 'large',
    type: 'ghost',
    htmlType: 'submit',
  };

  return (
    <Form className={styles.login_form} onSubmit={handleSubmit}>
      <div className={styles.login_form_banner}>
        <h2>{title}</h2>
      </div>
      <div className={styles.login_form_content}>
        <FormItem {...formItemLayout}>
          {
            getFieldDecorator('username', {
              rules: [{
                required: true, message: bizMap.validUsername,
              }],
            })(<Input {...usernameProps} />)
          }
        </FormItem>
        <FormItem {...formItemLayout}>
          {
            getFieldDecorator('password', {
              rules: [{
                required: true, message: bizMap.validPassword,
              }],
            })(<Input {...passwordProps} />)
          }
        </FormItem>
        <hr className={styles.login_form_split} />
        <Row>
          <Col span={24}>
            <Button {...btnProps}>{commonMap.login}</Button>
          </Col>
        </Row>
      </div>
    </Form>
  );
}

LoginForm.propTypes = {
  title: PropTypes.string,
  loading: PropTypes.bool,
  formSubmit: PropTypes.func,
};

LoginForm.defaultProps = {
  title: '用户登录',
  loading: false,
  formSubmit: noop,
}

export default Form.create()(LoginForm);
