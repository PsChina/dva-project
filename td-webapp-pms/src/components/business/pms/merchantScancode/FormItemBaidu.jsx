import React, { PropTypes } from 'react';
import { Form, Input, Row, Col } from 'antd';
import * as i18n from '../../../../utils/i18n';

const FormItem = Form.Item;

const FormItemBaidu = (props) => {
  const bizMap = i18n.bizMap('pms/baidu');
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
      <Row>
        <Col span={12}>
          <FormItem label={`${bizMap.baiduMerNo}`} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('baiduMerNo', {
                initialValue: data.baiduMerNo,
                rules: [{ required: true, message: validMap.validBaiduMerNo }],
              })(<Input placeholder={validMap.validBaiduMerNo} />)
            }
          </FormItem>
        </Col>
        <Col span={24}>
          <FormItem label={`${bizMap.baiduTxnKey}`} {...formItemLayout2} hasFeedback>
            {
              getFieldDecorator('baiduTxnKey', {
                initialValue: data.baiduTxnKey,
                rules: [{ required: true, message: validMap.validBaiduTxnKey }],
              })(<Input type="textarea" placeholder={validMap.validBaiduTxnKey} />)
            }
          </FormItem>
        </Col>
      </Row>
    </div>
  );
}

FormItemBaidu.propTypes = {
  data: PropTypes.object,
  form: PropTypes.object,
};

FormItemBaidu.defaultProps = {
  data: {},
  form: {},
};

export default FormItemBaidu;
