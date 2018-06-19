import React, { PropTypes } from 'react';
import { Form, Input, InputNumber, Select, Button, Row, Col } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;

const TerminalParamAddForm = (props) => {
  const bizMap = i18n.bizMap('tms/terminalParamTemp');
  const commonMap = i18n.commonMap();
  const { form, data, addClick, paramItems, fieldItems } = props;
  const { getFieldDecorator, getFieldsValue, validateFields } = form;
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFields((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        addClick(getFieldsValue());
      }
    });
  };

  const display = getFieldsValue().paramItem ? 'block' : 'none';

  return (
    <Form layout="horizontal" onSubmit={handleSubmit}>
      <Row gutter={16}>
        <Col span={8}>
          <FormItem label={bizMap.paramItem} {...formItemLayout}>
            {
              getFieldDecorator('paramItem', {
                initialValue: data.paramItem || '',
              })(
                <Select>
                  <Option value="">&nbsp;</Option>
                  {
                    paramItems.map((item, idx) => {
                      return <Option key={idx} value={item.value}>{item.text}</Option>;
                    })
                  }
                </Select>,
              )
            }
          </FormItem>
        </Col>
        <Col span={16} style={{ display }}>
          <Button icon="plus" type="dashed" htmlType="submit" style={{ marginTop: 2 }}>{commonMap.add}</Button>
        </Col>
      </Row>
      <Row gutter={16} style={{ display }}>
        <Col span={8}>
          <FormItem label={bizMap.itemField} {...formItemLayout}>
            {
              getFieldDecorator('itemField', {
                initialValue: data.itemField || '1',
                rules: [{
                  required: true,
                }],
              })(
                <Select>
                  {
                    fieldItems.map((item, idx) => {
                      return <Option key={idx} value={(idx + 1).toString()}>{`F${idx + 1}`}</Option>;
                    })
                  }
                </Select>,
              )
            }
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label={bizMap.itemLenType} {...formItemLayout}>
            {
              getFieldDecorator('itemLenType', {
                initialValue: data.itemLenType || '1',
                rules: [{
                  required: true,
                }],
              })(
                <Select>
                  <Option value="1">{bizMap['itemLenType-1']}</Option>
                  <Option value="2">{bizMap['itemLenType-2']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label={bizMap.itemAlign} {...formItemLayout}>
            {
              getFieldDecorator('itemAlign', {
                initialValue: data.itemAlign || '1',
                rules: [{
                  required: true,
                }],
              })(
                <Select>
                  <Option value="1">{bizMap['itemAlign-1']}</Option>
                  <Option value="2">{bizMap['itemAlign-2']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row gutter={16} style={{ display }}>
        <Col span={8}>
          <FormItem label={bizMap.itemType} {...formItemLayout}>
            {
              getFieldDecorator('itemType', {
                initialValue: data.itemType || '1',
                rules: [{
                  required: true,
                }],
              })(
                <Select>
                  <Option value="1">{bizMap['itemType-1']}</Option>
                  <Option value="2">{bizMap['itemType-2']}</Option>
                  <Option value="3">{bizMap['itemType-3']}</Option>
                  <Option value="4">{bizMap['itemType-4']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label={bizMap.itemLength} {...formItemLayout}>
            {
              getFieldDecorator('itemLength', {
                initialValue: data.itemLength || '256',
                rules: [{
                  required: true,
                }],
              })(<InputNumber maxLength={3} min={1} max={999} style={{ width: '100%' }} />)
            }
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label={bizMap.itemSup} {...formItemLayout}>
            {
              getFieldDecorator('itemSup', {
                initialValue: data.itemSup || '',
              })(<Input maxLength={1} />)
            }
          </FormItem>
        </Col>
      </Row>
      <h4 className="split">&nbsp;</h4>
    </Form>
  );
}

TerminalParamAddForm.propTypes = {
  data: PropTypes.object,
  addClick: PropTypes.func,
  paramItems: PropTypes.array,
  fieldItems: PropTypes.array,
};

TerminalParamAddForm.defaultProps = {
  data: {},
  addClick: noop,
  paramItems: [],
  fieldItems: new Array(64).fill(0),
}

export default Form.create()(TerminalParamAddForm);
