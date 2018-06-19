import React, { PropTypes } from 'react';
import { Spin, Form, Input, Button, Row, Col } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;

const ChannelTransferInfoForm = (props) => {
  // const dateFormat = 'YYYY-MM-DD';
  const bizMap = i18n.bizMap('pms/channelTransfer');
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
        <Row style={{ display: 'block' }}>
          <Col span={24}>
            <FormItem label={bizMap.chnId} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('chnId', {
                  initialValue: data.chnId,
                  rules: [{ required: true, message: bizMap.validChnId }],
                })(
                  <Input placeholder={bizMap.chnId} disabled />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.chnName} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('chnName', {
                  initialValue: data.chnName,
                  rules: [{ required: true, message: bizMap.validChnName }],
                })(
                  <Input placeholder={bizMap.chnName} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.chnConter} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('chnConter', {
                  initialValue: data.chnConter,
                })(
                  <Input placeholder={bizMap.chnConter} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.chnMobile} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('chnMobile', {
                  initialValue: data.chnMobile,
                })(
                  <Input placeholder={bizMap.chnMobile} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.chnPhone} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('chnPhone', {
                  initialValue: data.chnPhone,
                })(
                  <Input placeholder={bizMap.chnPhone} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.chnAddr} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('chnAddr', {
                  initialValue: data.chnAddr,
                })(
                  <Input type="textarea" rows="3" placeholder={bizMap.chnAddr} />,
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

ChannelTransferInfoForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
};

ChannelTransferInfoForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
}

export default Form.create()(ChannelTransferInfoForm);
