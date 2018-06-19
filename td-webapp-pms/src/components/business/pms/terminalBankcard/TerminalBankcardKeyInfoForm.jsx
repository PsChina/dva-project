import React, { PropTypes } from 'react';
import { Spin, Form, Row, Col, Input, Button, Select, Icon } from 'antd';
import * as i18n from '../../../../utils/i18n';
import { codeValid } from '../../../../utils/vaild';

const FormItem = Form.Item;
const Option = Select.Option;

const noop = () => {};

const TerminalBankcardKeyInfoForm = (props) => {
  const bizMap = i18n.bizMap('pms/terminalBankcard');
  const validMap = i18n.bizMap('pms/terminalBankcardValid');
  const commonMap = i18n.commonMap();
  const { form, loading, style, formSubmit, data, submiting } = props;
  const { validateFieldsAndScroll, getFieldsValue, resetFields, getFieldDecorator } = form;
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
        const dat = getFieldsValue();
        formSubmit(dat);
        resetFields();
      }
    });
  };

  const handleReset = () => {
    resetFields();
  };
  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" style={style} onSubmit={handleSubmit}>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.chnName} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('chnName', {
                  initialValue: data.chnName,
                })(
                  <Input disabled />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.chnId} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('chnId', {
                  initialValue: data.chnId,
                })(
                  <Input disabled />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.chnTermNo} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('chnTermNo', {
                  initialValue: data.chnTermNo,
                })(
                  <Input disabled />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.chnMerNo} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('chnMerNo', {
                  initialValue: data.chnMerNo,
                })(
                  <Input disabled />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.isSign} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('isSign', {
                  initialValue: data.isSign ? data.isSign : '0',
                })(
                  <Select placeholder={commonMap.select} disabled>
                    <Option value="0">{bizMap['isSign-0']}</Option>
                    <Option value="1">{bizMap['isSign-1']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.signTime} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('signTime', {
                  initialValue: data.signTime,
                })(
                  <Input disabled />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col sm={24} md={12}>
            <FormItem label={bizMap.chnTmkkey} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('chnTmkkey', {
                  initialValue: data.chnTmkkey,
                  rules: [{ validator: codeValid }],
                  trigger: 'onBlur',
                  validateFirst: true,
                })(
                  <Input placeholder={validMap.validChnTmkkey} />,
                )
              }
            </FormItem>
          </Col>
          <Col sm={24} md={12}>
            <FormItem label={bizMap.checkValue} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('checkValue', {
                  initialValue: data.checkValue,
                  rules: [{ validator: codeValid }],
                  trigger: 'onBlur',
                  validateFirst: true,
                })(
                  <Input placeholder={validMap.validCheckValue} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col sm={24} md={12}>
            <FormItem label={bizMap.chnPinkey} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('chnPinkey', {
                  initialValue: data.chnPinkey,
                  rules: [{ validator: codeValid }],
                  trigger: 'onBlur',
                  validateFirst: true,
                })(
                  <Input placeholder={validMap.validChnPinkey} />,
                )
              }
            </FormItem>
          </Col>
          <Col sm={24} md={12}>
            <FormItem label={bizMap.chnMackey} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('chnMackey', {
                  initialValue: data.chnMackey,
                  rules: [{ validator: codeValid }],
                  trigger: 'onBlur',
                  validateFirst: true,
                })(
                  <Input placeholder={validMap.validChnMackey} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col sm={24} md={12}>
            <FormItem label={bizMap.chnTdkkey} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('chnTdkkey', {
                  initialValue: data.chnTdkkey,
                  rules: [{ validator: codeValid }],
                  trigger: 'onBlur',
                  validateFirst: true,
                })(
                  <Input placeholder={validMap.validChnTdkkey} />,
                )
              }
            </FormItem>
          </Col>
          <Col sm={24} md={12}>
            <FormItem label={bizMap.checkStatus} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('checkStatus', {
                  initialValue: data.checkStatus ? data.checkStatus : '0',
                })(
                  <Select placeholder={commonMap.select} disabled>
                    <Option value="0">{bizMap['checkStatus-0']}</Option>
                    <Option value="1">{bizMap['checkStatus-1']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
      
        <h4 key="btn-split" className="split">&nbsp;</h4>
        <Row key="btn-row">
          <Col span={24} style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit" loading={submiting}>{commonMap.submit}</Button>
            <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};

TerminalBankcardKeyInfoForm.propTypes = {
  loading: PropTypes.bool,
  style: PropTypes.object,
  data: PropTypes.object,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
};

TerminalBankcardKeyInfoForm.defaultProps = {
  loading: false,
  style: {},
  data: {},
  submiting: false,
  formSubmit: noop,
};

export default Form.create()(TerminalBankcardKeyInfoForm);
