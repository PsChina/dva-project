import React, { PropTypes } from 'react';
import { Form, Input, Select, DatePicker, Button, Row, Col } from 'antd';
import moment from 'moment';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;

const PersonalMemberStepForm1 = (props) => {
  const dateFormat = 'YYYY-MM-DD';
  const bizMap = i18n.bizMap('mms/personalMember');
  const commonMap = i18n.commonMap();
  const { form, style, data, submiting, nextClick } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll } = form;
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
        nextClick(dat);
      }
    });
  };

  return (
    <Form layout="horizontal" style={style} onSubmit={handleSubmit}>
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
                rules: [{ required: true }],
              })(
                <Input placeholder={bizMap.userName} />,
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
                initialValue: data.birthday ? moment(data.birthday, dateFormat) : null,
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
      <h4 key="btn-split" className="split">&nbsp;</h4>
      <Row key="btn-row">
        <Col span={24} style={{ textAlign: 'center' }}>
          <Button type="primary" htmlType="submit" loading={submiting}>{commonMap.nextStep}</Button>
        </Col>
      </Row>
    </Form>
  );
}

PersonalMemberStepForm1.propTypes = {
  style: PropTypes.object,
  data: PropTypes.object,
  submiting: PropTypes.bool,
  nextClick: PropTypes.func,
};

PersonalMemberStepForm1.defaultProps = {
  style: {},
  data: {},
  submiting: false,
  nextClick: noop,
}

export default Form.create()(PersonalMemberStepForm1);
