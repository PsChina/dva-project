import React, { PropTypes } from 'react';
import { Spin, Form, Input, Button, Row, Col, Select } from 'antd';
import * as i18n from '../../../../utils/i18n';
import { numValidFirstNotZero } from '../../../../utils/vaild';
import { standUnitToMinUnit } from '../../../../utils/amount';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;

const TerminalStockAddOneForm = (props) => {
  const bizMap = i18n.bizMap('tms/terminalStock');
  const dataMap = i18n.bizMap('tms/tmsData');
  const validMap = i18n.bizMap('tms/tmsValid');
  const currencyArray = i18n.bizMap('currency');
  const commonMap = i18n.commonMap();
  const { form, loading, submiting, formSubmit, companyOptions, modelOptions, queryModelOptionData } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields, setFieldsValue } = form;
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
        const termAddOneFromData = getFieldsValue();
        termAddOneFromData.terAddCur = termAddOneFromData.terAddCur === undefined ? 'TWD' : termAddOneFromData.terAddCur;
        if (termAddOneFromData.terAddAmt !== undefined) {
          termAddOneFromData.terAddAmt = standUnitToMinUnit(termAddOneFromData.terAddAmt);
        }
        if (termAddOneFromData.terNetinAmt !== undefined) {
          termAddOneFromData.terNetinAmt = standUnitToMinUnit(termAddOneFromData.terNetinAmt);
        }
        formSubmit(termAddOneFromData);
        resetFields();
      }
    });
  };

  const handleReset = () => {
    resetFields();
  }
  const copIdOnSelect = (value, option) => {
    setFieldsValue({ copNam: option.props.children })
  }
  const modIdOnSelect = (value, option) => {
    setFieldsValue({ terModNo: option.props.children })
  }
  const prefixSelectorCurrency = getFieldDecorator('terAddCur', {
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
      <Form layout="horizontal" onSubmit={handleSubmit} style={{ width: 480 }}>
        <div hidden>
          {
            getFieldDecorator('copNam')(
              <Input placeholder="" />,
            )
          }
          {
            getFieldDecorator('terModNo')(
              <Input placeholder="" />,
            )
          }
        </div>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.terSrc} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('terSrc', {
                  rules: [{ required: true, message: validMap.validTerSrc }],
                })(
                  <Select>
                    <Option value="">&nbsp;</Option>
                    <Option value="1">{dataMap['terSrc-1']}</Option>
                    <Option value="2">{dataMap['terSrc-2']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.copNam} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('terCopId', {
                  rules: [{ required: true, message: validMap.validCopNam }],
                })(
                  <Select onChange={(k) => { queryModelOptionData(k); }} onSelect={(value, option) => copIdOnSelect(value, option)} >
                    <Option value="">&nbsp;</Option>
                    {
                      companyOptions.map((companyOption, idx) => {
                        return <Option key={idx} value={companyOption.copId}>{companyOption.copNam}</Option>;
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
            <FormItem label={bizMap.terModNo} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('terModId', {
                  rules: [{ required: true, message: validMap.validModNo }],
                })(
                  <Select onSelect={(value, option) => modIdOnSelect(value, option)} >
                    <Option value="">&nbsp;</Option>
                    {
                      modelOptions.map((modelOption, idx) => {
                        return <Option key={idx} value={modelOption.terModId}>{modelOption.terModNo}</Option>;
                      })
                    }
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        {
          getFieldsValue().terSrc === '1' ?
            <Row>
              <Col span={24}>
                <FormItem label={bizMap.terAddAmt} {...formItemLayout} hasFeedback>
                  {
                    getFieldDecorator('terAddAmt', {
                      rules: [{ required: true, message: validMap.validTerAddAmt },
                      { validator: numValidFirstNotZero }],
                    })(
                      <Input addonBefore={prefixSelectorCurrency} maxLength="13" style={{ width: 260 }} />,
                    )
                  }
                </FormItem>
              </Col>
            </Row>
            :
            null
        }
        {
          getFieldsValue().terSrc === '2' ?
            <Row>
              <Col span={24}>
                <FormItem label={bizMap.terNetinAmt} {...formItemLayout} hasFeedback>
                  {
                    getFieldDecorator('terNetinAmt', {
                      rules: [{ required: true, message: validMap.validTerNetinAmt },
                      { validator: numValidFirstNotZero }],
                    })(
                      <Input addonBefore={prefixSelectorCurrency} maxLength="13" style={{ width: 260 }} />,
                    )
                  }
                </FormItem>
              </Col>
            </Row>
            :
            null
        }
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.terPhyno} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('terPhyno', {
                  rules: [{ required: true, message: validMap.validTerPhyno }],
                })(
                  <Input placeholder={bizMap.terPhyno} />,
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

TerminalStockAddOneForm.propTypes = {
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
  companyOptions: PropTypes.array,
  modelOptions: PropTypes.array,
  queryModelOptionData: PropTypes.func,
};

TerminalStockAddOneForm.defaultProps = {
  loading: false,
  submiting: false,
  formSubmit: noop,
  companyOptions: [],
  modelOptions: [],
  queryModelOptionData: noop,
}

export default Form.create()(TerminalStockAddOneForm);
