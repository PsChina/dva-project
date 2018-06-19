import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col, Select } from 'antd';
import { limitNameSpaceValid, emailValid, userRealNameValidate } from '../../../../../utils/vaild';
import AREACODE from '../../../../../../config/i18n/zh-cn/continentCountryAreaCode.json';
import * as i18n from '../../../../../utils/i18n';

const Option = Select.Option;
const noop = () => { };
const FormItem = Form.Item;
const MerchantUsrInfoForm = (props) => {
  const bizMap = i18n.bizMap('mms/merchant');
  const vaildMap = i18n.bizMap('mms/merchantVaild');
  const commonMap = i18n.commonMap();
  const { form, style, data, submiting, formBaseSubmit } = props;
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
        const dat = getFieldsValue();
        formBaseSubmit(dat);
      }
    });
  };
  const usrPrefixSelector = getFieldDecorator('usrMobileAreaCode', {
    initialValue: data.usrMobileAreaCode,
  })(
    <Select style={{ width: 120 }} showSearch filterOption={(input, option) => option.props.children.indexOf(input) >= 0}>
      {AREACODE.map(d => <Option key={d.area_code} title={d.area_code}>{d.value}</Option>)}
    </Select>,
  );
  const handleReset = () => {
    resetFields();
  }
  return (
    <Form layout="horizontal" style={style} onSubmit={handleSubmit}>
      <Row style={{ display: 'none' }}>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.usrId} {...formItemLayout}>
            {
              getFieldDecorator('usrId', {
                initialValue: data.usrId,
              })(
                <Input placeholder={bizMap.usrId} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.usrName} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('usrName', {
                initialValue: data.usrName,
                rules: [{ required: true, message: vaildMap.vaildUsrName }, { validator: limitNameSpaceValid }],
              })(
                <Input placeholder={bizMap.usrName} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.usrRealName} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('usrRealName', {
                initialValue: data.usrRealName,
                rules: [{ required: false, message: vaildMap.vaildUsrRealName }, { validator: userRealNameValidate }],
              })(
                <Input placeholder={bizMap.usrRealName} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.usrEmail} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('usrEmail', {
                initialValue: data.usrEmail,
                rules: [{ required: true, message: vaildMap.vaildEmail }, { validator: emailValid }],
              })(
                <Input placeholder={bizMap.usrEmail} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.usrMobile} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('usrMobile', {
                initialValue: data.usrMobile,
                rules: [{ required: true, message: vaildMap.vaildMobile }],
              })(
                <Input addonBefore={usrPrefixSelector} maxLength={20} style={{ width: '100%' }} placeholder={bizMap.usrMobile} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.usrDesc} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('usrDesc', {
                initialValue: data.usrDesc,
                rules: [{ required: false }],
              })(
                <Input placeholder={bizMap.usrDesc} />,
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
  );
}

MerchantUsrInfoForm.propTypes = {
  style: PropTypes.object,
  data: PropTypes.object,
  submiting: PropTypes.bool,
  formBaseSubmit: PropTypes.func,
};

MerchantUsrInfoForm.defaultProps = {
  style: {},
  data: {},
  submiting: false,
  nextClick: noop,
  formBaseSubmit: noop,
}

export default Form.create()(MerchantUsrInfoForm);
