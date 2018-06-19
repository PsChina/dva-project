import React, { PropTypes } from 'react';
import { Spin, Form, Input, Button, Row, Col, Select } from 'antd';
// import { mobileValid } from '../../../../../utils/vaild';
import AREACODE from '../../../../../../config/i18n/zh-cn/continentCountryAreaCode.json';
import * as i18n from '../../../../../utils/i18n';

const Option = Select.Option;
const noop = () => { };
const FormItem = Form.Item;

const MerchantStoreInfoForm = (props) => {
  // const dateFormat = 'YYYY-MM-DD';
  const bizMap = i18n.bizMap('mms/merchantStore');
  const vaildMap = i18n.bizMap('mms/merchantStoreVaild');
  const commonMap = i18n.commonMap();
  const { form, data, loading, submiting, formSubmit } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        formSubmit(dat);
      }
    });
  };

  const handleReset = () => {
    resetFields();
  }

  const prefixSelector = getFieldDecorator('braMobileAreaCode', { 
    initialValue: data.braMobileAreaCode,
  })(
    <Select style={{ width: 120 }} showSearch filterOption={(input, option) => option.props.children.indexOf(input) >= 0}>
      {AREACODE.map(d => <Option key={d.area_code} title={d.area_code}>{d.value}</Option>)}
    </Select>
    );
  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <Row style={{ display: 'none' }}>
          <Col span={28}>
            <FormItem label={bizMap.braId} {...formItemLayout}>
              {
                getFieldDecorator('braId', {
                  initialValue: data.braId,
                })(
                  <Input placeholder={bizMap.braId} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={28}>
            <FormItem label={bizMap.braId} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('braId', {
                  initialValue: data.braId,
                })(
                  <Input placeholder={bizMap.braId} disabled />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={28}>
            <FormItem label={bizMap.braName} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('braName', {
                  initialValue: data.braName,
                })(
                  <Input placeholder={bizMap.braName} disabled />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={28}>
            <FormItem label={bizMap.braConter} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('braConter', {
                  initialValue: data.braConter,
                  rules: [{ required: true, message: vaildMap.vaildBraConter }],
                })(
                  <Input placeholder={bizMap.braConter} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={28}>
            <FormItem label={bizMap.braTel} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('braTel', {
                  initialValue: data.braTel,
                  rules: [{ required: true, message: vaildMap.vaildBraTel }],
                })(
                  <Input placeholder={bizMap.braTel} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={28}>
            <FormItem label={bizMap.braMobile} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('braMobile', {
                  initialValue: data.braMobile,
                  rules: [{ required: true, message: vaildMap.vaildBraMobile }],
                })(
                  <Input addonBefore={prefixSelector} maxLength={20} style={{ width: '100%' }} placeholder={bizMap.merMobile} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={28}>
            <FormItem label={bizMap.braAddr} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('braAddr', {
                  initialValue: data.braAddr,
                  rules: [{ required: true, message: vaildMap.vaildBraAddr }],
                })(
                  <Input placeholder={bizMap.braAddr} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <h4 className="split">&nbsp;</h4>
        <Row>
          <Col span={28} style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit" loading={submiting}>{commonMap.submit}</Button>
            <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
}

MerchantStoreInfoForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
};

MerchantStoreInfoForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
}

export default Form.create()(MerchantStoreInfoForm);
