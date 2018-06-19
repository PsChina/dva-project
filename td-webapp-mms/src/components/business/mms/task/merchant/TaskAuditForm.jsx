import React, { PropTypes } from 'react';
import { Spin, Form, Input, Button, Row, Col } from 'antd';
import MerchantInfoTable from './MerchantInfoTable';

import * as i18n from '../../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const TaskAuditForm = (props) => {
  const bizMap = i18n.bizMap('mms/task');
  const { form, data, loading, submiting, formSubmitReject, formSubmitAgree } = props;
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
        const dat = getFieldsValue();
        formSubmitAgree(dat);
      }
    });
  };
  const handleSubmitReject = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        formSubmitReject(dat);
      }
    });
  };
  console.log('data==', data);

  return (
    <Spin spinning={loading}>
      <Form layout="horizontal">
        <Row style={{ display: 'none' }}>
          <Col span={24}>
            <FormItem label={bizMap.flowstatusno} {...formItemLayout}>
              {
                getFieldDecorator('flowstatusno', {
                  initialValue: data.flowstatusno,
                })(
                  <Input />,
                )
              }
              {
                getFieldDecorator('flowbusinesstoken', {
                  initialValue: data.flowbusinesstoken,
                })(
                  <Input />,
                )
              }
              {
                getFieldDecorator('modeltype', {
                  initialValue: data.modeltype,
                })(
                  <Input />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.approvedescription} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('remark')(
                  <Input placeholder={bizMap.approvedescription} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            {
              data.modeltype === '0010' || data.modeltype === '0110' ?
                <MerchantInfoTable data={data.merchant} />
                :
                null
            }
          </Col>
        </Row>
        <h4 className="split">&nbsp;</h4>
        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit" onClick={handleSubmitAgree} loading={submiting}>{bizMap.agree}</Button>
            <Button htmlType="submit" onClick={handleSubmitReject}>{bizMap.reject}</Button>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
}

TaskAuditForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmitAgree: PropTypes.func,
  formSubmitReject: PropTypes.func,
};

TaskAuditForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmitAgree: noop,
  formSubmitReject: noop,
}

export default Form.create()(TaskAuditForm);
