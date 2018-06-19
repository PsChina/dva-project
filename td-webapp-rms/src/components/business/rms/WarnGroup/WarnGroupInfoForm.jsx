import React, { PropTypes } from 'react';
import { Spin, Form, Input, Select, Button, Row, Col } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;

const WarnGroupQueryForm = (props) => {
  const bizMap = i18n.bizMap('rms/warnGroup');
  const commonMap = i18n.commonMap();
  const { form, data, loading, submiting, formSubmit } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 6 },
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

  let arrData = [];
  if (typeof (data.grpOrgId) === 'string') {
    arrData = data.grpOrgId.split(',');
  }

  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>

        <FormItem style={{ display: 'none' }} label={bizMap.grpId} {...formItemLayout} >
          {
                getFieldDecorator('grpId', {
                  initialValue: data.grpId,
                })(
                  <Input />,
                )
              }
        </FormItem>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.groupName} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('grpName', {
                  initialValue: data.grpName,
                  rules: [{
                    required: true, message: bizMap.validGroupName,
                  }],
                })(
                  <Input placeholder={bizMap.grpName} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.grpOrgId} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('grpOrgId', {
                  initialValue: arrData,
                  rules: [{
                    required: true, message: bizMap.validOrgType,
                  }],
                })(
                  <Select mode="multiple">
                    <Option value="">&nbsp;</Option>
                    <Option value="01">{bizMap['grpOrgId-01']}</Option>
                    <Option value="02">{bizMap['grpOrgId-02']}</Option>
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

WarnGroupQueryForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
};

WarnGroupQueryForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
}

export default Form.create()(WarnGroupQueryForm);
