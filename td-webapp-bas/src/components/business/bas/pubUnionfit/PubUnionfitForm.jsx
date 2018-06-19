import React, { PropTypes } from 'react';
import { Spin, Form, Input, Select, Button, Row, Col } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const PubUnionfitForm = (props) => {
  const bizMap = i18n.bizMap('bas/pubUnionfit');
  const commonMap = i18n.commonMap();
  const { form, data, loading, submiting, formSubmit, type } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
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
          <Col span={12}>
            <FormItem label={bizMap.binctt} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('binctt', {
                  initialValue: data.binctt,
                  rules: [{
                    required: true, message: bizMap.validBinctt,
                  }],
                })(
                  <Input maxLength={13} placeholder={bizMap.binctt} disabled={type === 'update'} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.issnam} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('issnam', {
                  initialValue: data.issnam,
                  rules: [{
                    required: true, message: bizMap.validIssnam,
                  }],
                })(
                  <Input maxLength={66} placeholder={bizMap.issnam} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.issno} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('issno', {
                  initialValue: data.issno,
                  rules: [{
                    required: true, message: bizMap.validIssno,
                  }],
                })(
                  <Input maxLength={10} placeholder={bizMap.issno} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.crdnam} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('crdnam', {
                  initialValue: data.crdnam,
                  rules: [{
                    required: true, message: bizMap.validCrdnam,
                  }],
                })(
                  <Input maxLength={66} placeholder={bizMap.crdnam} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.fitcrk} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('fitcrk', {
                  initialValue: data.fitcrk,
                  rules: [{
                    required: true, message: bizMap.validFitcrk,
                  }],
                })(
                  <Input maxLength={3} placeholder={bizMap.fitcrk} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.fitoff} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('fitoff', {
                  initialValue: data.fitoff,
                  rules: [{
                    required: true, message: bizMap.validFitoff,
                  }],
                })(
                  <Input maxLength={3} placeholder={bizMap.fitoff} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.fitlen} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('fitlen', {
                  initialValue: data.fitlen,
                  rules: [{
                    required: true, message: bizMap.validFitlen,
                  }],
                })(
                  <Input maxLength={7} placeholder={bizMap.fitlen} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.crdoff} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('crdoff', {
                  initialValue: data.crdoff,
                  rules: [{
                    required: true, message: bizMap.validCrdoff,
                  }],
                })(
                  <Input maxLength={3} placeholder={bizMap.crdoff} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.crdlen} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('crdlen', {
                  initialValue: data.crdlen,
                  rules: [{
                    required: true, message: bizMap.validCrdlen,
                  }],
                })(
                  <Input maxLength={2} placeholder={bizMap.crdlen} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.crdctt} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('crdctt', {
                  initialValue: data.crdctt,
                  rules: [{
                    required: true, message: bizMap.validCrdctt,
                  }],
                })(
                  <Input maxLength={20} placeholder={bizMap.crdctt} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.crdcrk} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('crdcrk', {
                  initialValue: data.crdcrk,
                  rules: [{
                    required: true, message: bizMap.validcrdcrk,
                  }],
                })(
                  <Input maxLength={3} placeholder={bizMap.crdcrk} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.binoff} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('binoff', {
                  initialValue: data.binoff,
                  rules: [{
                    required: true, message: bizMap.validBinoff,
                  }],
                })(
                  <Input maxLength={3} placeholder={bizMap.binoff} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.binlen} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('binlen', {
                  initialValue: data.binlen,
                  rules: [{
                    required: true, message: bizMap.validBinlen,
                  }],
                })(
                  <Input maxLength={2} placeholder={bizMap.binlen} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.bincrk} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('bincrk', {
                  initialValue: data.bincrk,
                  rules: [{
                    required: true, message: bizMap.validBincrk,
                  }],
                })(
                  <Input maxLength={3} placeholder={bizMap.bincrk} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.dcflag} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('dcflag', {
                  initialValue: data.dcflag,
                  rules: [{
                    required: true, message: bizMap.validDcflag,
                  }],
                })(
                  <Select>
                    <Option value="">&nbsp;</Option>
                    <Option value="01">{bizMap['dcflag-01']}</Option>
                    <Option value="02">{bizMap['dcflag-02']}</Option>
                    <Option value="03">{bizMap['dcflag-03']}</Option>
                    <Option value="04">{bizMap['dcflag-04']}</Option>
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

PubUnionfitForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
};

PubUnionfitForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
}

export default Form.create()(PubUnionfitForm);
