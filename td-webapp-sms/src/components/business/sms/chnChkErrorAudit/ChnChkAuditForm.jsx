import React, { PropTypes } from 'react';
import { Spin, Form, Input, Button, Row, Col } from 'antd';
import ChnChkErrorDetailInfoForm from './ChnChkErrorDetailInfoForm';

import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const ChnChkAuditForm = (props) => {
  const bizMap = i18n.bizMap('sms/chnChkErrorAudit');
  const { form, loading, submiting, formSubmit, data, rejecting } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll } = form;
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
  };

  const handleSubmitAgree = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = Object.assign({ auditStatus: '1' }, data, getFieldsValue());
        formSubmit(dat);
      }
    });
  };
  const handleSubmitReject = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = Object.assign({ auditStatus: '0' }, data, getFieldsValue());
        formSubmit(dat);
      }
    });
  };

  return (
    <Spin spinning={loading}>
      <Form layout="horizontal">
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.auditRemark} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('auditRemark')(
                  <Input placeholder={bizMap.auditRemark} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <h4 className="split">&nbsp;</h4>
        <Row>
          <Col span={24}>
            <ChnChkErrorDetailInfoForm data={data} />
          </Col>
        </Row>
        <h4 className="split">&nbsp;</h4>
        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit" onClick={handleSubmitAgree} loading={submiting}>{bizMap.agree}</Button>
            <Button style={{ marginLeft: 8 }} htmlType="submit" onClick={handleSubmitReject} loading={rejecting}>{bizMap.reject}</Button>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
}

ChnChkAuditForm.propTypes = {
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,

  data: PropTypes.object,
  rejecting: PropTypes.bool,
};

ChnChkAuditForm.defaultProps = {
  loading: false,
  submiting: false,
  formSubmit: noop,

  data: {},
  rejecting: false,
}

export default Form.create()(ChnChkAuditForm);
