import React, { PropTypes } from 'react';
import { Form, Input, Select, Button, Row, Col } from 'antd';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;

const PersonalMemberStepForm2 = (props) => {
  const bizMap = i18n.bizMap('mms/personalMember');
  const commonMap = i18n.commonMap();
  const { form, style, data, submiting, nextClick, prevClick } = props;
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
        nextClick(dat);
      }
    });
  };

  return (
    <Form layout="horizontal" style={style} onSubmit={handleSubmit}>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.realName} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('realName', {
                initialValue: data.realName,
                rules: [{ required: true }],
              })(
                <Input placeholder={bizMap.realName} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.certificateType} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('certificateType', {
                initialValue: data.certificateType,
                rules: [{ required: true }],
              })(
                <Select>
                  <Option value="">&nbsp;</Option>
                  <Option value="01">{bizMap['certificateType-01']}</Option>
                  <Option value="02">{bizMap['certificateType-02']}</Option>
                  <Option value="99">{bizMap['certificateType-99']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.certificateNo} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('certificateNo', {
                initialValue: data.certificateNo,
                rules: [{ required: true }],
              })(
                <Input placeholder={bizMap.certificateNo} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <h4 key="btn-split" className="split">&nbsp;</h4>
      <Row key="btn-row">
        <Col span={24} style={{ textAlign: 'center' }}>
          <Button onClick={prevClick} style={{ marginRight: 16 }}>{commonMap.prevStep}</Button>
          <Button type="primary" htmlType="submit" loading={submiting}>{commonMap.finish}</Button>
        </Col>
      </Row>
    </Form>
  );
}

PersonalMemberStepForm2.propTypes = {
  style: PropTypes.object,
  data: PropTypes.object,
  submiting: PropTypes.bool,
  nextClick: PropTypes.func,
  prevClick: PropTypes.func,
};

PersonalMemberStepForm2.defaultProps = {
  style: {},
  data: {},
  submiting: false,
  nextClick: noop,
  prevClick: noop,
}

export default Form.create()(PersonalMemberStepForm2);
