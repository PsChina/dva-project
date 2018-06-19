import React, { PropTypes } from 'react';
import { Link } from 'dva/router';
import { Form, Input, Button, Row, Col, Icon } from 'antd';
import * as i18n from '../../../utils/i18n';
import styles from './LoginForm.less';

const noop = () => { };
const FormItem = Form.Item;

const LoginForm = (props) => {
  const bizMap = i18n.bizMap('login');
  const commonMap = i18n.commonMap();
  const { form, data, loading, formSubmit } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll } = form;
  const formItemLayout = {
    labelCol: { span: 24 },
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

  return (
    <Form className={styles['login-form-box']} layout="horizontal" onSubmit={handleSubmit}>
    {/* 盒子 */}
      <Row className={styles['login-top-gap']}>
      </Row>
      <div className={styles['login-form-logo']}>
      <img src={require('../../../assets/image/LoginHome/logo.png')} alt=""/>     
      </div>
      <h1>{bizMap.bussLogin}</h1>
      <Row className={styles['login-inputs-part']}>
        <Col span={24}>
          <FormItem>
            {
              getFieldDecorator('usrName', {
                initialValue: data.usrName,
                rules: [{
                  required: true, message: bizMap.validUsername,
                }],
              })(
                <Input prefix={<img src={require('../../../assets/image/LoginHome/yonghum@2x.png')} style={{ width:'.24rem', height:'.24rem' }} />} size="large" placeholder={bizMap.validUsername} />,
              )
            }
          </FormItem>
        </Col>
        <Col className={styles['login-gaps']}></Col>
        <Col span={24}>
          <FormItem size="xlarge" type="password">
            {
              getFieldDecorator('usrPsw', {
                initialValue: data.usrPsw,
                rules: [{
                  required: true, message: bizMap.validPassword,
                }],
              })(
                <Input prefix={<img src={require('../../../assets/image/LoginHome/mimah@2x.png')} style={{ width:'.24rem', height:'.24rem' }} />} size="large" placeholder={bizMap.validPassword} type="password" />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row className={styles['login-login-btn-part']}
        style={{ marginBottom: '12px' }}
      >
        <Col span={24}>
          <Button className={styles['login-button']} style={{ width: '100%' }} size="large" type="primary" htmlType="submit" loading={loading}>{commonMap.login}</Button>
        </Col>
        <Col span={24} style={{ textAlign: 'right' }}><Link to="/loginPwdBack">{bizMap.forgetPas}</Link></Col>
      </Row>
    </Form>
  );
}

LoginForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  formSubmit: PropTypes.func,
};

LoginForm.defaultProps = {
  data: {},
  loading: false,
  formSubmit: noop,
}

export default Form.create()(LoginForm);
