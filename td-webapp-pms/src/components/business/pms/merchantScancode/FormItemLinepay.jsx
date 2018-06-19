import React, { PropTypes } from 'react';
import { Form, Input, Row, Col } from 'antd';
import * as i18n from '../../../../utils/i18n';

const FormItem = Form.Item;

const FormItemLinepay = (props)=>{
    const bizMap = i18n.bizMap('pms/linepay');
    const validMap = i18n.bizMap('pms/merchantScancodeValid');
    const { form, data } = props;
    const { getFieldDecorator } = form;
    const formItemLayout2 = {
      labelCol: { span: 8 },
      wrapperCol: { span: 14 },
    };
  /*
{
  "linepayChannelId":"商户通道",
  "linepaySecretKey":"密钥"
}
  */
    return (
        <div>
        <Row key="key">
            <Col span={12}>
            <FormItem label={`${bizMap.linepayChannelId}`} {...formItemLayout2}>
                {
                getFieldDecorator('linepayChannelId', {
                    initialValue: data.linepayChannelId,
                    rules: [{ required: true, message: validMap.validLinepayChannelId }],
                })(<Input type="text" />)
                }
            </FormItem>
            </Col>
            <Col span={12}>
            <FormItem label={`${bizMap.linepaySecretKey}`} {...formItemLayout2}>
                {
                getFieldDecorator('linepaySecretKey', {
                    initialValue: data.linepaySecretKey,
                    rules: [{ required: true, message: validMap.validLinepaySecretKey }],
                })(<Input type="text" />)
                }
            </FormItem>
            </Col>
        </Row>
        </div>
    )
}

FormItemLinepay.propTypes = {
    data: PropTypes.object,
    form: PropTypes.object,
  };
  
FormItemLinepay.defaultProps = {
    data: {},
    form: {},
};

export default FormItemLinepay;
