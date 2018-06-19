import React, { PropTypes } from 'react';
import { Spin, Form, Input, Button, Row, Col } from 'antd';
import * as i18n from '../../../../utils/i18n';
import { phoneValid, userRealNameValidate } from '../../../../utils/vaild';

const noop = () => { };
const FormItem = Form.Item;

const TerminalCompanyInfoForm = (props) => {
  const bizMap = i18n.bizMap('tms/terminalCompany');
  const validMap = i18n.bizMap('tms/tmsValid');
  const commonMap = i18n.commonMap();
  const { form, data, loading, submiting, formSubmit } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
  };
  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        console.log('dat =>', dat);
        //日期格式化
        //dat.birthday = dat.birthday.format(dateFormat);
        formSubmit(dat);
      }
    });
  };

  const handleReset = () => {
    resetFields();
  }
  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <Row style={{ display: 'none' }}>
          <Col span={24}>
            <FormItem label={bizMap.copId} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('copId', {
                  initialValue: data.copId,
                })(
                  <Input placeholder={bizMap.copId} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.copNam} {...formItemLayout} required>
              {
                getFieldDecorator('copNam', {
                  initialValue: data.copNam,
                  rules: [{ required: true, message: validMap.validCopNam }],
                })(
                  <Input placeholder={bizMap.copNam} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.copShNam} {...formItemLayout} >
              {
                getFieldDecorator('copShNam', {
                  initialValue: data.copShNam,
                })(
                  <Input placeholder={bizMap.copShNam} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.copContacts} {...formItemLayout}>
              {
                getFieldDecorator('copContacts', {
                  initialValue: data.copContacts,
                  rules: [{ validator: userRealNameValidate }],
                })(
                  <Input placeholder={bizMap.copContacts} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.copTel} {...formItemLayout}>
              {
                getFieldDecorator('copTel', {
                  initialValue: data.copTel,
                  rules: [{ validator: phoneValid }],
                })(
                  <Input placeholder={bizMap.copTel} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.copAddr} {...formItemLayout} >
              {
                getFieldDecorator('copAddr', {
                  initialValue: data.copAddr,
                })(
                  <Input placeholder={bizMap.copAddr} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.copDesc} {...formItemLayout} >
              {
                getFieldDecorator('copDesc', {
                  initialValue: data.copDesc,
                })(
                  <Input type="textarea" rows="4" placeholder={bizMap.copDesc} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <h4 className="split">&nbsp;</h4>
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

TerminalCompanyInfoForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
};

TerminalCompanyInfoForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
}

export default Form.create()(TerminalCompanyInfoForm);
