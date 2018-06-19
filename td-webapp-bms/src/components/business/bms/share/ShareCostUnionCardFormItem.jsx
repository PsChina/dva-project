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

const ShareCostUnionCardFormItem = (props) => {
  const { form, data, ind } = props;
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
    <div>
      {
        ind.map((item, idx) => {
          return (
            <Row key={item}>
              <Col span={24}>
                <h4 style={{ paddingLeft: 12, marginBottom: 12 }}>{bizMap[`ind-${item}`]}</h4>
              </Col>
              <Col span={24}>
                <InputGroup compact>
                  <FormItem label={bizMap.dcardCost} {...formItemLayout0} style={{ width: '40%' }}>
                    {
                      getFieldDecorator(`dcardCost${item}`, {
                        initialValue: data[`dcardCost${item}`] || '',
                        rules: [
                          { required: idx === 0, message: validMap.REQUIRED.replace(/{\w}/, bizMap.dcardCost) },
                          { pattern: pattern.PERCENT, message: validMap.PERCENT },
                        ],
                      })(<Input addonAfter="%" />)
                    }
                  </FormItem>
                  <FormItem label={bizMap.costLimit} {...formItemLayout1} style={{ width: '40%' }}>
                    {
                      getFieldDecorator(`dcardCostLimit${item}`, {
                        initialValue: data[`dcardCostLimit${item}`] ? `${amtMinUnitToStandUnit(data[`dcardCostLimit${item}`], data.ccy)}` : '',
                        rules: [
                          { required: idx === 0, message: validMap.REQUIRED.replace(/{\w}/, bizMap.costLimit) },
                          { pattern: pattern.AMT, message: validMap.AMT },
                        ],
                      })(<Input addonAfter={ccy} />)
                    }
                  </FormItem>
                </InputGroup>
              </Col>
              <Col span={24}>
                <InputGroup compact>
                  <FormItem label={bizMap.ccardCost} {...formItemLayout0} style={{ width: '40%' }}>
                    {
                      getFieldDecorator(`ccardCost${item}`, {
                        initialValue: data[`ccardCost${item}`] || '',
                        rules: [
                          { required: idx === 0, message: validMap.REQUIRED.replace(/{\w}/, bizMap.ccardCost) },
                          { pattern: pattern.PERCENT, message: validMap.PERCENT },
                        ],
                      })(<Input addonAfter="%" />)
                    }
                  </FormItem>
                  <FormItem label={bizMap.costLimit} {...formItemLayout1} style={{ width: '40%' }}>
                    {
                      getFieldDecorator(`ccardCostLimit${item}`, {
                        initialValue: data[`ccardCostLimit${item}`] ? `${amtMinUnitToStandUnit(data[`ccardCostLimit${item}`], data.ccy)}` : '',
                        rules: [
                          { required: idx === 0, message: validMap.REQUIRED.replace(/{\w}/, bizMap.costLimit) },
                          { pattern: pattern.AMT, message: validMap.AMT },
                        ],
                      })(<Input addonAfter={ccy} />)
                    }
                  </FormItem>
                </InputGroup>
              </Col>
            </Row>
          )
        })
      }
    </div>
  );
}

ShareCostUnionCardFormItem.propTypes = {
  data: PropTypes.object,
  form: PropTypes.object,
  ind: PropTypes.array,
};

ShareCostUnionCardFormItem.defaultProps = {
  data: {},
  ind: ['1', '2', '3'],
}

export default ShareCostUnionCardFormItem;
