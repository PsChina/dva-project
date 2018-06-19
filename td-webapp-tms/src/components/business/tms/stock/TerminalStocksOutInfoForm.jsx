import React, { PropTypes } from 'react';
import { Spin, Form, Input, Button, Row, Col, Select } from 'antd';
import * as i18n from '../../../../utils/i18n';
import { numValidFirstNotZero } from '../../../../utils/vaild';
import { standUnitToMinUnit } from '../../../../utils/amount';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;

const TerminalStocksOutInfoForm = (props) => {
  const bizMap = i18n.bizMap('tms/terminalStock');
  const validMap = i18n.bizMap('tms/tmsValid');
  const currencyArray = i18n.bizMap('currency');
  const commonMap = i18n.commonMap();
  const { form, loading, submiting, formSubmit, terVerOptions, parModOptions, ids } = props;
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
        const termOutFromData = getFieldsValue();
        termOutFromData.terOutCur = termOutFromData.terOutCur === undefined ? 'TWD' : termOutFromData.terOutCur;
        if (termOutFromData.terOutAmt !== undefined) {
          termOutFromData.terOutAmt = standUnitToMinUnit(termOutFromData.terOutAmt);
        }
        formSubmit(termOutFromData);
        resetFields();
      }
    });
  };

  const handleReset = () => {
    resetFields();
  }
  const prefixSelectorCurrency = getFieldDecorator('terOutCur', {
    initialValue: 'TWD',
  })(
    <Select style={{ width: 90 }}>
      {
        currencyArray.map((item) => {
          return <Option value={item.value}>{item.label}</Option>
        })
      }
    </Select>,
    );
  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <div hidden>
          {
            getFieldDecorator('ids', {
              initialValue: ids,
            })(
              <Input />,
            )
          }
        </div>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.terVer} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('terVer', {
                  rules: [{ required: true, message: validMap.validTerVer }],
                })(
                  <Select>
                    <Option value="">&nbsp;</Option>
                    {
                      terVerOptions.map((terVerOption, idx) => {
                        return <Option key={idx} value={terVerOption.verId}>{terVerOption.verNo}</Option>;
                      })
                    }
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.parMod} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('parMod', {
                  rules: [{ required: true }],
                })(
                  <Select>
                    <Option value="">&nbsp;</Option>
                    {
                      parModOptions.map((parModOptions, idx) => {
                        return <Option key={idx} value={parModOptions.value}>{parModOptions.text}</Option>;
                      })
                    }
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.terOutAmt} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('terOutAmt', {
                  rules: [{ required: true, message: validMap.validTerOutAmt },
                  { validator: numValidFirstNotZero }],
                })(
                  <Input addonBefore={prefixSelectorCurrency} maxLength="13" style={{ width: '100%' }} />,
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

TerminalStocksOutInfoForm.propTypes = {
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
  terVerOptions: PropTypes.array,
  parModOptions: PropTypes.array,
  ids: PropTypes.string,
};

TerminalStocksOutInfoForm.defaultProps = {
  loading: false,
  submiting: false,
  formSubmit: noop,
  terVerOptions: [],
  parModOptions: [],
  ids: '',
}

export default Form.create()(TerminalStocksOutInfoForm);
