import React, { PropTypes } from 'react';
import { Form, Button, Row, Col, Select, Input } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;

const ChnChkErrorAccDealForm = (props) => {
  const bizMap = i18n.bizMap('sms/chnChkError');
  const commonMap = i18n.commonMap();
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const { form, formSubmit, formCancel, data } = props;
  const { getFieldDecorator, validateFields, getFieldsValue, resetFields } = form;

  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFields((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        if (dat.dealType === '01') {
          dat.dealAmt = data.txnAmt;
        }
        if (dat.dealType === '03') {
          dat.dealAmt = data.ttxnAmt;
        }
        if (dat.dealType === '04') {
          dat.dealAmt = data.ttxnAmt - data.txnAmt;
        }
        formSubmit(dat);
        resetFields();
      }
    });
  };

  const handleCancel = () => {
    resetFields();
    formCancel();
  }

  return (
    <Form layout="horizontal" onSubmit={handleSubmit}>
      <div hidden={data.chnChkSts === '02' ? false : true}>
        <Row>
          <Col sm={24} md={20}>
            <FormItem label={bizMap.dealType} {...formItemLayout} required hasFeedback>
              {
                getFieldDecorator('dealType', {
                  rules: [{ required: true, message: bizMap.pleaseSelectErrorDealType }],
                })(
                  <Select placeholder={commonMap.select}>
                    <Option value="">{commonMap.select}</Option>
                    <Option value="00">{bizMap['dealType-00']}</Option>
                    <Option value="01">{bizMap['dealType-01']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
      </div>
      <div hidden={data.chnChkSts === '03' ? false : true}>
        <Row>
          <Col sm={24} md={20}>
            <FormItem label={bizMap.dealType} {...formItemLayout} required hasFeedback>
              {
                getFieldDecorator('dealType', {
                  rules: [{ required: true, message: bizMap.pleaseSelectErrorDealType }],
                })(
                  <Select placeholder={commonMap.select}>
                    <Option value="">{commonMap.select}</Option>
                    <Option value="02">{bizMap['dealType-02']}</Option>
                    <Option value="03">{bizMap['dealType-03']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
      </div>
      <div hidden={data.chnChkSts === '04' ? false : true}>
        <Row>
          <Col sm={24} md={20}>
            <FormItem label={bizMap.dealType} {...formItemLayout} required hasFeedback>
              {
                getFieldDecorator('dealType', {
                  rules: [{ required: true, message: bizMap.pleaseSelectErrorDealType }],
                })(
                  <Select placeholder={commonMap.select}>
                    <Option value="">{commonMap.select}</Option>
                    <Option value="01">{bizMap['dealType-01']}</Option>
                    <Option value="03">{bizMap['dealType-03']}</Option>
                    <Option value="04">{bizMap['dealType-04']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
      </div>
      <div>
        <Row>
          <Col sm={24} md={20}>
            <FormItem label={bizMap.dealRemark} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('dealRemark')(
                  <Input type="textarea" rows={8} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
      </div>
      <h4 className="split">&nbsp;</h4>
      <Row>
        <Col sm={24} md={24} style={{ textAlign: 'right', marginBottom: 16 }}>
          <Button style={{ marginLeft: 8 }} onClick={handleCancel}>{commonMap.cancel}</Button>
          <Button style={{ marginLeft: 8 }} type="primary" htmlType="submit">{commonMap.submit}</Button>
        </Col>
      </Row>
    </Form>
  );
}

ChnChkErrorAccDealForm.propTypes = {
  formSubmit: PropTypes.func,
  formCancel: PropTypes.func,

  data: PropTypes.object,
};

ChnChkErrorAccDealForm.defaultProps = {
  formSubmit: noop,
  formCancel: noop,

  data: {},
};

export default Form.create()(ChnChkErrorAccDealForm);
