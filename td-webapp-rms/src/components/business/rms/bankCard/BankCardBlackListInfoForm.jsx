import React, { PropTypes } from 'react';
import { Spin, Form, Input, Button, Row, Col, Select } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const BankCardBlackListInfoForm = (props) => {
  const bizMap = i18n.bizMap('rms/bankCardBlackList');
  const bankCardBizMap = i18n.bizMap('rms/bankCard');
  const commonMap = i18n.commonMap();
  const { form, data, loading, submiting, formSubmit } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
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

  const handleReset = () => {
    resetFields();
  }


  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <Row>
          <Col span={22}>
            <FormItem label={bankCardBizMap.bankCardNo} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('bankcardNo', {
                  initialValue: data.bankCardNo,
                  rules: [{
                    required: true, message: bankCardBizMap.validBankCardNo,
                  }],
                })(
                  <Input placeholder={bankCardBizMap.bankCardNo} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bankCardBizMap.bankCardType} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('bankcardTyp', {
                  initialValue: data.bankCardType,
                  rules: [{
                    required: true, message: bankCardBizMap.validBankCardType,
                  }],
                })(
                  <Select>
                    <Option value="">&nbsp;</Option>
                    <Option value="01">{bankCardBizMap['bankCardType-01']}</Option>
                    <Option value="02">{bankCardBizMap['bankCardType-02']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.listType} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('listTyp', {
                  initialValue: data.listType,
                  rules: [{
                    required: true, message: bizMap.validListType,
                  }],
                })(
                  <Select>
                    <Option value="">&nbsp;</Option>
                    <Option value="0">{bizMap['listType-0']}</Option>
                    <Option value="1">{bizMap['listType-1']}</Option>
                    <Option value="2">{bizMap['listType-2']}</Option>
                  </Select>,
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

BankCardBlackListInfoForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
};

BankCardBlackListInfoForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
}

export default Form.create()(BankCardBlackListInfoForm);
