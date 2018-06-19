import React, { PropTypes } from 'react';
import { Modal, Row, Col, Form, Input, Button, Icon } from 'antd';
import styles from './index.less';
import * as i18n from '../../../utils/i18n';

const noop = () => {};

const ReLoginModal = (props) => {
  const FormItem = Form.Item;
  const { form, user, loading, visible, submit } = props;
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
        const data = getFieldsValue();
        data.username = user;
        console.log(data)
        submit(data);
      }
    });
  };

  const passwordProps = {
    addonBefore: <Icon type="lock" />,
    type: 'password',
    placeholder: commonMap.password,
  };

  const modalProps = {
    visible,
    title: `${user} ${bizMap.reLogin}`,
    width: 320,
    footer: null,
    maskClosable: false,
    closable: false,
  };

  const btnProps = {
    loading,
    type: 'primary',
    htmlType: 'submit',
    className: styles.relogin_form_submit,
  }

  return (
    <Modal {...modalProps}>
      <Form onSubmit={handleSubmit}>
        <FormItem {...formItemLayout}>
          {
            getFieldDecorator('password', {
              rules: [{
                required: true, message: bizMap.validPassword,
              }],
            })(<Input {...passwordProps} />)
          }
        </FormItem>
        <hr className={styles.relogin_form_split} />
        <Row>
          <Col span={24}>
            <Button {...btnProps}>{bizMap.reLogin}</Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

ReLoginModal.propTypes = {
  visible: PropTypes.bool,
  loading: PropTypes.bool,
  submit: PropTypes.func,
  user: PropTypes.string,
};

ReLoginModal.defaultProps = {
  visible: false,
  loading: false,
  submit: noop,
  user: '',
}

export default Form.create()(ReLoginModal);
