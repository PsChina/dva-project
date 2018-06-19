import React, { PropTypes } from 'react';
import { Spin, Form, Input, Select, DatePicker, Button, Row, Col } from 'antd';
import moment from 'moment';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;

const AgentInfoForm = (props) => {
  const dateFormat = 'YYYY-MM-DD';
  const bizMap = i18n.bizMap('mms/agent');
  const vaildMap = i18n.bizMap('mms/agentVaild');
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
        dat.birthday = dat.birthday.format(dateFormat);
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
            <FormItem label={bizMap.agtId} {...formItemLayout}>
              {
                getFieldDecorator('agtId', {
                  initialValue: data.agtId,
                })(
                  <Input placeholder={bizMap.agtId} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.agtName} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('agtName', {
                  initialValue: data.agtName,
                })(
                  <Input placeholder={bizMap.agtName} disabled />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.agtParentName} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('agtParentName', {
                  initialValue: data.agtParentName,
                  rules: [{ required: true, message: vaildMap.vaildAgtParentName }],
                })(
                  <Input placeholder={bizMap.agtParentName} disabled />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.agtScope} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('agtScope', {
                  initialValue: data.agtScope,
                  rules: [{ required: false, message: vaildMap.vaildAgtScope }],
                })(
                  <Input placeholder={bizMap.agtScope} disabled />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.bizSale} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('bizsaleId', {
                  initialValue: data.bizSale,
                  rules: [{ required: true, message: vaildMap.vaildBizsaleId }],
                })(
                  <Input placeholder={bizMap.bizSale} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.agtEmail} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('agtEmail', {
                  initialValue: data.agtEmail,
                  rules: [{ required: true, message: vaildMap.vaildAgtEmail }],
                })(
                  <Input placeholder={bizMap.agtEmail} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.agtAddr} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('agtAddr', {
                  initialValue: data.agtAddr,
                  rules: [{ required: true, message: vaildMap.vaildAgtAddr }],
                })(
                  <Input placeholder={bizMap.agtAddr} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.idType} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('idType', {
                  initialValue: data.idType,
                  rules: [{ required: true, message: vaildMap.vaildIdType }],
                })(
                  <Select>
                    <Option value="">&nbsp;</Option>
                    <Option value="03">{bizMap['certType-01']}</Option>
                    <Option value="04">{bizMap['certType-02']}</Option>
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

AgentInfoForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
};

AgentInfoForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
}

export default Form.create()(AgentInfoForm);
