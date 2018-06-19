import React, { PropTypes } from 'react';
import { Spin, Form, Input, Button, Row, Col, Select } from 'antd';
import * as i18n from '../../../../utils/i18n';

const Option = Select.Option;
const noop = () => { };
const FormItem = Form.Item;

const TerminalTxnAuthInfoForm = (props) => {
  const bizMap = i18n.bizMap('tms/terminalTxnAuth');
  const validMap = i18n.bizMap('tms/tmsValid');
  const commonMap = i18n.commonMap();
  const { form, data, loading, submiting, formSubmit, onlyRead } = props;
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
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.txnAuthNo} {...formItemLayout} hasFeedback required>
              {
                getFieldDecorator('txnAuthNo', {
                  initialValue: data.txnAuthNo,
                  rules: [{ required: true, message: validMap.validTxnAuthNo }],
                })(
                  <Input placeholder={bizMap.txnAuthNo} disabled ={onlyRead} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.txnAuthName} {...formItemLayout} required>
              {
                getFieldDecorator('txnAuthName', {
                  initialValue: data.txnAuthName,
                  rules: [{ required: true, message: validMap.validTxnAuthName }],
                })(
                  <Input placeholder={bizMap.txnAuthName} disabled ={onlyRead}/>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.txnDesc} {...formItemLayout} >
              {
                getFieldDecorator('txnDesc', {
                  initialValue: data.txnDesc,
                })(
                  <Input placeholder={bizMap.txnDesc} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.txnType} {...formItemLayout} >
              {
                getFieldDecorator('txnType', {
                  initialValue: data.txnType,
                  rules: [{ required: true, message: validMap.validTxnType }],
                })(
                <Select disabled ={onlyRead} >
                  <Option value="1">{bizMap['txnType-1']}</Option>
                  <Option value="2">{bizMap['txnType-2']}</Option>
                  <Option value="3">{bizMap['txnType-3']}</Option>
                </Select>,
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

TerminalTxnAuthInfoForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
};

TerminalTxnAuthInfoForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
}

export default Form.create()(TerminalTxnAuthInfoForm);
