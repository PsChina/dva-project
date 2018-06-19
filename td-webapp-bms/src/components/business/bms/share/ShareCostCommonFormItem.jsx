import React, { PropTypes } from 'react';
import { Form, Input, Row, Col } from 'antd';
import * as i18n from '../../../../utils/i18n';
import * as pattern from '../../../../utils/pattern';
import { amtMinUnitToStandUnit } from '../../../../utils/amount';

const FormItem = Form.Item;
const InputGroup = Input.Group;
const bizMap = i18n.bizMap('bms/share');
const ccyMap = i18n.bizMap('currencyMap');
const validMap = i18n.bizMap('pattern');

const ShareCostCommonFormItem = (props) => {
  const { form, data } = props;
  const { getFieldDecorator } = form;
  const formItemLayout0 = {
    labelCol: { span: 10 },
    wrapperCol: { span: 12 },
  };
  const formItemLayout1 = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
  };
  const ccy = ccyMap[data.ccy] || ccyMap.DEFAULT;
  return (
    <Row>
      <Col span={24}>
        <InputGroup compact>
          <FormItem label={bizMap.shareCost} {...formItemLayout0} style={{ width: '40%' }}>
            {
              getFieldDecorator('shareCost', {
                initialValue: data.shareCost || '',
                rules: [
                  { required: true, message: validMap.REQUIRED.replace(/{\w}/, bizMap.shareCost) },
                  { pattern: pattern.PERCENT, message: validMap.PERCENT },
                ],
              })(<Input maxLength={5} addonAfter="%" />)
            }
          </FormItem>
          <FormItem label={bizMap.costLimit} {...formItemLayout1} style={{ width: '40%' }}>
            {
              getFieldDecorator('costLimit', {
                initialValue: data.costLimit ? `${amtMinUnitToStandUnit(data.costLimit, data.ccy)}` : '0',
                rules: [
                  { required: true, message: validMap.REQUIRED.replace(/{\w}/, bizMap.costLimit) },
                  { pattern: pattern.AMT, message: validMap.AMT },
                ],
              })(<Input maxLength={12} addonAfter={ccy} />)
            }
          </FormItem>
        </InputGroup>
      </Col>
    </Row>
  );
}

ShareCostCommonFormItem.propTypes = {
  data: PropTypes.object,
  form: PropTypes.object,
};

ShareCostCommonFormItem.defaultProps = {
  data: {},
}

export default ShareCostCommonFormItem;
