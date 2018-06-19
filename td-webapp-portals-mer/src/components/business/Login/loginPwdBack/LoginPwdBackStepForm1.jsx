import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'dva/router';
import { Form, Input, Button, Row, Col } from 'antd';
import { callNotice } from '../../../../utils/alert';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const commMap = i18n.commonMap();
const bizMap = i18n.bizMap('login');
const FormItem = Form.Item;

const LoginPwdBackStepForm1 = (props) => {
  const { form, codeSend, formSubmit, loading } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll } = form;
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  const handleFormSubmit = (dat) => {
    if (!dat.verCode) {
      callNotice(commMap.tip, bizMap.validVerCode, 'warning');
    } else {
      formSubmit(dat);
    }
  }

  // type: 1: send code, 0: next step
  const handleSubmit = (ev, type) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        type === 1 ? codeSend(dat.usrName) : handleFormSubmit(dat);
      }
    });
  };

  return (
    <Form layout="horizontal" onSubmit={handleSubmit} style={{ width: 430, margin: 'auto' }}>
      <Row>
        <Col span={24}>
          <FormItem {...formItemLayout} label={bizMap.usrEmail}>
            {
              getFieldDecorator('usrName', {
                initialValue: '',
                rules: [{
                  required: true, message: bizMap.validUserEmail,
                }, {
                  type: 'email', message: bizMap.validUserEmail,
                }],
              })(
                <Input size="large" />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem {...formItemLayout} label={bizMap.verCode}>
            {
              getFieldDecorator('verCode', {
                initialValue: '',
              })(
                <Input size="large" maxLength={6} addonAfter={<a href="javascript:void(0)" onClick={(ev) => { handleSubmit(ev, 1) }}>{bizMap.getVerCode}</a>} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <h4 className="split" style={{ marginTop: 8 }}>&nbsp;</h4>
      <Row style={{ marginTop: 8 }}>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Link to="/login" style={{ marginTop: 4, float: 'left' }}>{bizMap.retoLogin}</Link>
          <Button type="primary" htmlType="submit" loading={loading}>{commMap.nextStep}</Button>
        </Col>
      </Row>
    </Form>
  );
}

LoginPwdBackStepForm1.propTypes = {
  loading: PropTypes.bool,
  codeSend: PropTypes.func,
  formSubmit: PropTypes.func,
};

LoginPwdBackStepForm1.defaultProps = {
  loading: false,
  codeSend: noop,
  formSubmit: noop,
}

export default Form.create()(LoginPwdBackStepForm1);
