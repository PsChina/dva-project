import React, { PropTypes } from 'react';
import { Spin, Form, Input, Button, Row, Col } from 'antd';
import * as i18n from '../../../../utils/i18n';
import { encode } from '../../../../utils/code';

const noop = () => { };
const FormItem = Form.Item;

const PasswordForm = (props) => {
  const validMap = i18n.bizMap('tms/tmsValid');
  const commonMap = i18n.commonMap();
  const { form, submiting, formSubmit } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll } = form;
  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        dat.sysPassword = encode(dat.sysPassword, 'md5');
        formSubmit(dat);
      }
    });
  };

  return (
    <Form layout="horizontal" onSubmit={handleSubmit}>
      <Row gutter={16} style={{ marginTop: 8 }}>
        <Col span={16}>
          <FormItem>
            {
              getFieldDecorator('sysPassword', {
                rules: [{ required: true, message: validMap.validPassword }],
              })(
                <Input type="password" />,
              )
            }
          </FormItem>
        </Col>
        <Col span={8} style={{ textAlign: 'left' }}>
          <Button type="primary" htmlType="submit" loading={submiting}>{commonMap.submit}</Button>
        </Col>
      </Row>
    </Form>
  );
}

PasswordForm.propTypes = {
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
};

PasswordForm.defaultProps = {
  submiting: false,
  formSubmit: noop,
}

export default Form.create()(PasswordForm);
