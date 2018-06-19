import React, { PropTypes } from 'react';
import { Spin, Form, Input, Select, DatePicker, Button, Row, Col } from 'antd';
import moment from 'moment';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;

const PersonalMemberStepBaseInfoForm = (props) => {
  const dateFormat = 'YYYY-MM-DD';
  const bizMap = i18n.bizMap('mms/personalMember');
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
            <FormItem label={bizMap.id} {...formItemLayout}>
              {
                getFieldDecorator('id', {
                  initialValue: data.id,
                })(
                  <Input placeholder={bizMap.id} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.userName} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('userName', {
                  initialValue: data.userName,
                })(
                  <Input placeholder={bizMap.userName} disabled />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.gender} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('gender', {
                  initialValue: data.gender,
                  rules: [{ required: true }],
                })(
                  <Select>
                    <Option value="">&nbsp;</Option>
                    <Option value="0">{commonMap['gender-0']}</Option>
                    <Option value="1">{commonMap['gender-1']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.birthday} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('birthday', {
                  initialValue: moment(data.birthday, dateFormat),
                  rules: [{ required: true }],
                })(
                  <DatePicker placeholder={bizMap.birthday} style={{ width: '100%' }} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.mobile} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('mobile', {
                  initialValue: data.mobile,
                  rules: [{ required: true }],
                })(
                  <Input placeholder={bizMap.mobile} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.email} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('email', {
                  initialValue: data.email,
                  rules: [{ required: true }],
                })(
                  <Input placeholder={bizMap.email} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.address} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('address', {
                  initialValue: data.address,
                  rules: [{ required: true }],
                })(
                  <Input placeholder={bizMap.address} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.remark} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('remark', {
                  initialValue: data.remark,
                  rules: [{ required: true }],
                })(
                  <Input placeholder={bizMap.remark} />,
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

PersonalMemberStepBaseInfoForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
};

PersonalMemberStepBaseInfoForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
}

export default Form.create()(PersonalMemberStepBaseInfoForm);
