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

const ShareRangeFormItem = (props) => {
  const { form, data, rangeCount } = props;
  const { getFieldDecorator } = form;
  const formItemLayout = {
    labelCol: { span: 12 },
    wrapperCol: { span: 12 },
  };
  const formItemLayout2 = {
    labelCol: { span: 10 },
    wrapperCol: { span: 10 },
  };
  const ccy = ccyMap[data.ccy] || ccyMap.DEFAULT;
  const style = { width: 24, marginLeft: 10, borderLeft: 0, borderRight: 0, pointerEvents: 'none' };
  return (
    <div>
      {
        rangeCount.map((item, idx) => {
          return (
            <Row key={idx}>
              <Col span={14}>
                <InputGroup compact>
                  <FormItem label={bizMap.txnRange} {...formItemLayout}>
                    {
                      getFieldDecorator(`txnRange${idx + 1}Start`, {
                        initialValue: data[`txnRange${idx + 1}Start`] ? `${amtMinUnitToStandUnit(data[`txnRange${idx + 1}Start`], data.ccy)}` : (idx === 0 ? '0' : ''),
                        rules: [
                          { pattern: pattern.AMT, message: validMap.AMT },
                        ],
                      })(<Input style={{ width: 90 }} />)
                    }
                  </FormItem>
                  <FormItem>
                    <Input style={style} placeholder="~" />
                  </FormItem>
                  <FormItem>
                    {
                      getFieldDecorator(`txnRange${idx + 1}End`, {
                        initialValue: data[`txnRange${idx + 1}End`] ? `${amtMinUnitToStandUnit(data[`txnRange${idx + 1}End`], data.ccy)}` : '',
                        rules: [
                          { pattern: pattern.AMT, message: validMap.AMT },
                        ],
                      })(<Input style={{ width: 114 }} addonAfter={ccy} />)
                    }
                  </FormItem>
                </InputGroup>
              </Col>
              <Col span={8}>
                <FormItem label={bizMap.sharePercent} {...formItemLayout2}>
                  {
                    getFieldDecorator(`sharePercent${idx + 1}`, {
                      initialValue: data[`sharePercent${idx + 1}`] || '',
                      rules: [
                        { pattern: pattern.PERCENT, message: validMap.PERCENT },
                      ],
                    })(<Input addonAfter="%" />)
                  }
                </FormItem>
              </Col>
            </Row>
          );
        })
      }
    </div>
  );
}

ShareRangeFormItem.propTypes = {
  data: PropTypes.object,
  form: PropTypes.object,
  rangeCount: PropTypes.array,
};

ShareRangeFormItem.defaultProps = {
  data: {},
  rangeCount: ['1', '2', '3', '4', '5'],
}

export default ShareRangeFormItem;
