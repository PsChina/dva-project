import React, { PropTypes } from 'react';
import { Form, Input, Row, Col } from 'antd';
import * as i18n from '../../../../utils/i18n';

const FormItem = Form.Item;

const FormItemGamapay = (props)=>{
    const bizMap = i18n.bizMap('pms/gamapay');
    const validMap = i18n.bizMap('pms/merchantScancodeValid');
    const { form, data } = props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 14 },
    };
  /*
{
    "gamaPayMerchantID":"橘子支商户账号",
    "gamaPaySubMerchantID":"橘子支商户子账号",
    "gamaPayHashKey":"gamaPayHashKey",
    "gamaPayHashIv":"hashIV"
}
  */
    return (
        <div>
            <Row>
                {/* 橘子支商户账号 */}
                <Col span={12}>
                    <FormItem label={`${bizMap.gamaPayMerchantID}`} {...formItemLayout} hasFeedback>
                    {
                    getFieldDecorator('gamaPayMerchantID', {
                        initialValue: data.gamaPayMerchantID,
                        rules: [{ required: true, message: validMap.validGamapayMerchantID }],
                    })(<Input placeholder={validMap.validGamapayMerchantID} />)
                    }                    
                    </FormItem>
                </Col>
                {/* 橘子支商户子账号 */}
                <Col span={12}>
                    <FormItem  label={`${bizMap.gamaPaySubMerchantID}`} {...formItemLayout} hasFeedback>
                    {
                    getFieldDecorator('gamaPaySubMerchantID', {
                        initialValue: data.gamaPaySubMerchantID,
                        rules: [{ required: false, message: '' }],
                    })(<Input placeholder={ '' } />)
                    } 
                    </FormItem>                    
                </Col>
                {/* hashKey */}
                <Col span={12}>
                    <FormItem  label={`${bizMap.gamaPayHashKey}`} {...formItemLayout} hasFeedback>
                    {
                    getFieldDecorator('gamaPayHashKey', {
                        initialValue: data.gamaPayHashKey,
                        rules: [{ required: true, message: validMap.validGamapayHashKey }],
                    })(<Input placeholder={validMap.validGamapayHashKey} />)
                    }                      
                    </FormItem>                    
                </Col>
                {/* hashIV */}
                <Col span={12}>
                    <FormItem  label={`${bizMap.gamaPayHashIv}`} {...formItemLayout} hasFeedback>
                    {
                    getFieldDecorator('gamaPayHashIv', {
                        initialValue: data.gamaPayHashIv,
                        rules: [{ required: true, message: validMap.validGamapayHashIV }],
                    })(<Input placeholder={validMap.validGamapayHashIV} />)
                    }                           
                    </FormItem>                    
                </Col>
            </Row>
        </div>
    )
}

FormItemGamapay.propTypes = {
    data: PropTypes.object,
    form: PropTypes.object,
  };
  
FormItemGamapay.defaultProps = {
data: {},
form: {},
};

export default FormItemGamapay;