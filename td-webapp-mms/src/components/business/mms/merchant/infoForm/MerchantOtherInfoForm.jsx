import React, { PropTypes } from 'react';
import { Spin, Form, Input, Select, DatePicker, Button, Row, Col } from 'antd';
import moment from 'moment';
import { limitNameSpaceValid } from '../../../../../utils/vaild';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const MerchantOtherInfoForm = (props) => {
  const dateFormat = 'YYYYMMDD';
  const bizMap = i18n.bizMap('mms/merchant');
  const vaildMap = i18n.bizMap('mms/merchantVaild');
  const commonMap = i18n.commonMap();
  const { form, data, loading, submiting, formBaseSubmit } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
  };
  const formItemLayout2 = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        dat.merSupervisorBirth = dat.merSupervisorBirth.format(dateFormat);
        dat.merOwnerBirth = dat.merOwnerBirth.format(dateFormat);
        dat.merRegDat = dat.merRegDat.format(dateFormat);
        formBaseSubmit(dat);
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
            <FormItem label={bizMap.merId} {...formItemLayout}>
              {
                getFieldDecorator('merId', {
                  initialValue: data.merId,
                })(
                  <Input placeholder={bizMap.merId} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.merRegId} {...formItemLayout2}>
              {
                getFieldDecorator('merRegId', {
                  initialValue: data.merRegId || '',
                })(
                  <Input placeholder={bizMap.merRegId} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.merRegDat} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('merRegDat', {
                  initialValue: data.merRegDat ? moment(data.merRegDat, dateFormat) : null,
                  rules: [],
                })(
                  <DatePicker showTime format="YYYYMMDD" />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.merRegAddress} {...formItemLayout2} hasFeedback>
              {
                getFieldDecorator('merRegAddress', {
                  initialValue: data.merRegAddress || '',
                  rules: [{ required: false, message: vaildMap.vaildAddr }, { validator: limitNameSpaceValid }],
                })(
                  <Input placeholder={bizMap.merRegAddress} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.merBizAddress} {...formItemLayout2} hasFeedback>
              {
                getFieldDecorator('merBizAddress', {
                  initialValue: data.merBizAddress || '',
                  rules: [{ required: false, message: vaildMap.vaildAddr }, { validator: limitNameSpaceValid }],
                })(
                  <Input placeholder={bizMap.merBizAddress} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.merOwner} {...formItemLayout2} hasFeedback>
              {
                getFieldDecorator('merOwner', {
                  initialValue: data.merOwner || '',
                  rules: [],
                })(
                  <Input placeholder={bizMap.merOwner} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.merOwnerBirth} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('merOwnerBirth', {
                  initialValue: data.merOwnerBirth ? moment(data.merOwnerBirth, dateFormat) : null,
                  rules: [],
                })(
                  <DatePicker showTime format="YYYYMMDD" />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.merOwnerAddr} {...formItemLayout2} hasFeedback>
              {
                getFieldDecorator('merOwnerAddr', {
                  initialValue: data.merOwnerAddr,
                  rules: [],
                })(
                  <Input placeholder={bizMap.merOwnerAddr} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.merOwnerPassport} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('merOwnerPassport', {
                  initialValue: data.merOwnerPassport,
                  rules: [],
                })(
                  <Input placeholder={bizMap.merOwnerPassport} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.merOwnerDivingLicense} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('merOwnerDivingLicense', {
                  initialValue: data.merOwnerDivingLicense,
                  rules: [],
                })(
                  <Input placeholder={bizMap.merOwnerDivingLicense} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.merSupervisorName} {...formItemLayout2} hasFeedback>
              {
                getFieldDecorator('merSupervisorName', {
                  initialValue: data.merSupervisorName || '',
                  rules: [],
                })(
                  <Input placeholder={bizMap.merSupervisorName} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.merSupervisorBirth} {...formItemLayout} >
              {
                getFieldDecorator('merSupervisorBirth', {
                  initialValue: data.merSupervisorBirth ? moment(data.merSupervisorBirth, dateFormat) : null,
                  rules: [],
                })(
                  <DatePicker showTime format="YYYYMMDD" />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.merSupervisorAddr} {...formItemLayout2} hasFeedback>
              {
                getFieldDecorator('merSupervisorAddr', {
                  initialValue: data.merSupervisorAddr,
                  rules: [],
                })(
                  <Input placeholder={bizMap.merSupervisorAddr} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.merSupervisorPassport} {...formItemLayout2} hasFeedback>
              {
                getFieldDecorator('merSupervisorPassport', {
                  initialValue: data.merSupervisorPassport || '',
                  rules: [],
                })(
                  <Input placeholder={bizMap.merSupervisorPassport} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.merSupervisorDivingLicense} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('merSupervisorDivingLicense', {
                  initialValue: data.merSupervisorDivingLicense || '',
                  rules: [],
                })(
                  <Input placeholder={bizMap.merSupervisorDivingLicense} />,
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

MerchantOtherInfoForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formBaseSubmit: PropTypes.func,
};

MerchantOtherInfoForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formBaseSubmit: noop,
}

export default Form.create()(MerchantOtherInfoForm);
