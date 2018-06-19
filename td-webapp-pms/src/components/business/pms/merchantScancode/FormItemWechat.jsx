import React, { PropTypes } from 'react';
import { Form, Input, Row, Col } from 'antd';
import * as i18n from '../../../../utils/i18n';

const FormItem = Form.Item;

const FormItemWechat = (props) => {
  const bizMap = i18n.bizMap('pms/wechat');
  const validMap = i18n.bizMap('pms/merchantScancodeValid');
  const { form, data } = props;
  const { getFieldDecorator } = form;
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
  };

  const formItemLayout2 = {
    labelCol: { span: 4 },
    wrapperCol: { span: 19 },
  };

  return (
    <div>
      <Row key="b1">
        <Col span={12}>
          <FormItem label={`${bizMap.wechatAppId}`} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('wechatAppId', {
                initialValue: data.wechatAppId,
                rules: [{ required: true, message: validMap.validWechatAppId }],
              })(<Input placeholder={validMap.validWechatAppId} />)
            }
          </FormItem>
        </Col>
      </Row>
      <Row key="b2">
        <Col span={12}>
          <FormItem label={`${bizMap.wechatMerNo}`} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('wechatMerNo', {
                initialValue: data.wechatMerNo,
                rules: [{ required: true, message: validMap.validWechatMerNo }],
              })(<Input placeholder={validMap.validWechatMerNo} />)
            }
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label={`${bizMap.wechatMerSubNo}`} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('wechatMerSubNo', {
                initialValue: data.wechatMerSubNo,
                rules: [{ required: true, message: validMap.validwechatMerSubNo }],
              })(<Input placeholder={validMap.validwechatMerSubNo} />)
            }
          </FormItem>
        </Col>
        <Col span={24}>
          <FormItem label={`${bizMap.wechatTxnKey}`} {...formItemLayout2} hasFeedback>
            {
              getFieldDecorator('wechatTxnKey', {
                initialValue: data.wechatTxnKey,
                rules: [{ required: true, message: validMap.validWechatTxnKey }],
              })(<Input type="textarea" placeholder={validMap.validWechatTxnKey} />)
            }
          </FormItem>
        </Col>
        <Col span={24}>
          <FormItem label={`${bizMap.wechatTxnCert}`} {...formItemLayout2} hasFeedback>
            {
              getFieldDecorator('wechatTxnCert', {
                initialValue: data.wechatTxnCert,
                rules: [{ required: true, message: validMap.validWechatTxnCert }],
              })(<Input type="textarea" placeholder={validMap.validWechatTxnCert} />)
            }
          </FormItem>
        </Col>
        {/*<Col span={24}>
          <FormItem label={`${bizMap.wechatSecret}`} {...formItemLayout2} hasFeedback>
            {
              getFieldDecorator('wechatSecret', {
                initialValue: data.wechatSecret,
              })(<Input type="textarea" placeholder={validMap.validWechatSecret} />)
            }
          </FormItem>
        </Col>
        <Col span={24}>
          <FormItem label={`${bizMap.wechatAccessTk}`} {...formItemLayout2} hasFeedback>
            {
              getFieldDecorator('wechatAccessTk', {
                initialValue: data.wechatAccessTk,
              })(<Input type="textarea" placeholder={validMap.validWechatAccessTk} />)
            }
          </FormItem>
        </Col>
        <Col span={24}>
          <FormItem label={`${bizMap.wechatJsapiTiket}`} {...formItemLayout2} hasFeedback>
            {
              getFieldDecorator('wechatJsapiTiket', {
                initialValue: data.wechatJsapiTiket,
              })(<Input type="textarea" placeholder={validMap.validWechatJsapiTiket} />)
            }
          </FormItem>
        </Col>*/}
      </Row>
    </div>
  );
}

FormItemWechat.propTypes = {
  data: PropTypes.object,
  form: PropTypes.object,
};

FormItemWechat.defaultProps = {
  data: {},
  form: {},
};

export default FormItemWechat;
