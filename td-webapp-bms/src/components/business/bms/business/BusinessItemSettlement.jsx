import React, { PropTypes } from 'react';
import { Form, Input, Select, Row, Col } from 'antd';
import * as i18n from '../../../../utils/i18n';

const FormItem = Form.Item;
const Option = Select.Option;
const bizMap = i18n.bizMap('bms/businessSettlement');

const BusinessItemSettlement = (props) => {
  const { form, data } = props;
  const { getFieldDecorator, getFieldsValue } = form;
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
  };
  const cycleProps = {
    addonBefore: getFieldsValue().stlType === '0' ? 'D +' : 'T +',
  };
  const hz = getFieldsValue().stlHz;
  let stlDays = [];
  switch (hz) {
    case '2': {
      stlDays = []
      for (let i = 0; i < 7; i++) {
        stlDays.push(bizMap[`stlDay-2-${i + 1}`])
      }
      break;
    }
    case '3': {
      stlDays = []
      for (let i = 0; i < 31; i++) {
        stlDays.push(bizMap[`stlDay-3-${i + 1}`])
      }
      break;
    }
    default:
      stlDays = [];
      break;
  }
  return (
    <div>
      <Row style={{ display: 'none' }}>
        <Col span={12}>
          <FormItem label={bizMap.stlObj} {...formItemLayout}>
            {
              getFieldDecorator('stlObj', {
                initialValue: data.stlObj || '1',
              })(
                <Select>
                  <Option value="0">{bizMap['stlObj-0']}</Option>
                  <Option value="1">{bizMap['stlObj-1']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormItem label={bizMap.stlType} {...formItemLayout}>
            {
              getFieldDecorator('stlType', {
                initialValue: data.stlType || '1',
              })(
                <Select>
                  <Option value="0">{bizMap['stlType-0']}</Option>
                  <Option value="1">{bizMap['stlType-1']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label={bizMap.stlCycle} {...formItemLayout}>
            {
              getFieldDecorator('stlCycle', {
                initialValue: data.stlCycle || '1',
                rules: [
                  { required: true },
                ],
              })(
                <Input {...cycleProps} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormItem label={bizMap.stlHz} {...formItemLayout}>
            {
              getFieldDecorator('stlHz', {
                initialValue: data.stlHz || '1',
              })(
                <Select>
                  <Option value="1">{bizMap['stlHz-1']}</Option>
                  <Option value="2">{bizMap['stlHz-2']}</Option>
                  <Option value="3">{bizMap['stlHz-3']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
        {
          stlDays.length === 0 ? null :
          <Col span={12}>
            <FormItem label={bizMap.stlDay} {...formItemLayout}>
              {
                getFieldDecorator('stlDay', {
                  initialValue: data.stlDay || '1',
                })(
                  <Select>
                    {
                      stlDays.map((item, idx) => {
                        return <Option key={idx} value={String(idx + 1)}>{item}</Option>
                      })
                    }
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        }
      </Row>
    </div>
  );
}

BusinessItemSettlement.propTypes = {
  data: PropTypes.object,
  form: PropTypes.object,
};

BusinessItemSettlement.defaultProps = {
  data: {},
  // form: {},
}

export default BusinessItemSettlement;
