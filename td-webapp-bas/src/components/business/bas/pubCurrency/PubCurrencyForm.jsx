import React, { PropTypes } from 'react';
import { Spin, Form, Input, Select, Button, Row, Col, Popover } from 'antd';
import * as i18n from '../../../../utils/i18n';
import { numValid, codeUpperValid } from '../../../../utils/vaild';

import MiniFormTitle from '../../../common/MiniFormTitle';

import MiniCountryPageTable from '../pubCountry/MiniCountryPageTable';
import MiniCountryQueryForm from '../pubCountry/MiniCountryQueryForm';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const PubCountryForm = (props) => {
  const bizMap = i18n.bizMap('bas/pubCurrency');
  const countryBizMap = i18n.bizMap('bas/pubCountry');
  const commonMap = i18n.commonMap();
  const { form, data, loading, submiting, formSubmit, type, miniFormVisible, tablePageChange, popoverOncancel,
    tableList, tableTotal, tableLoading, tableCurrentPage, queryCountryList, rowClickCallback, toggleCountryTable } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        formSubmit(getFieldsValue());
      }
    });
  };

  const handleReset = () => {
    resetFields();
  }

  const toggleCountry = () => {
    toggleCountryTable(getFieldsValue());
  };

  const miniFormTitleProps = {
    title: countryBizMap.country,
    popoverOncancel() {
      popoverOncancel();
    },
  };

  const queryFormProps = {
    formSubmit(dat) {
      console.log('dat===', dat)
      queryCountryList(dat);
    },
  };

  const tableProps = {
    tableList,
    tableTotal,
    tableLoading,
    tableCurrentPage,
    rowSelection: null,
    scroll: { y: 240 },
    tablePageChange(next) {
      tablePageChange(next);
    },
    clickCallback(record) {
      rowClickCallback(record);
    },
  };

  const miniFormTitle = (
    <MiniFormTitle {...miniFormTitleProps} />
  );

  const miniFormContent = [
    <MiniCountryQueryForm key="query" {...queryFormProps} />,
    <MiniCountryPageTable key="pageTable" {...tableProps} />,
  ];

  const countryAfter = (
    <Popover title={miniFormTitle} content={miniFormContent} visible={miniFormVisible} placement="bottom">
      <a onClick={toggleCountry}>{commonMap.select}</a>
    </Popover>
  );
  const updateCountryDom = [
    <Row key="a1">
      <Col span={22}>
        <FormItem label={countryBizMap.country} {...formItemLayout} >
          {
            getFieldDecorator('country', {
              initialValue: data.country,
              rules: [{
                required: true, message: countryBizMap.validCountryCode,
              }],
            })(
              <Input placeholder={countryBizMap.country} readOnly disabled={type === 'update'} addonAfter={countryAfter} />,
            )
          }
        </FormItem>
      </Col>
    </Row>,
    <Row key="a2">
      <Col span={22}>
        <FormItem label={countryBizMap.countryCode} {...formItemLayout} hasFeedback>
          {
            getFieldDecorator('countryCode', {
              initialValue: data.countryCode,
              rules: [{
                required: true, message: countryBizMap.validCountryCode,
              }],
            })(
              <Input placeholder={countryBizMap.countryCode} maxLength="3" disabled />,
            )
          }
        </FormItem>
      </Col>
    </Row>,
    <Row key="a3">
      <Col span={22}>
        <FormItem label={countryBizMap.countryShortName} {...formItemLayout} hasFeedback>
          {
            getFieldDecorator('countryShortName', {
              initialValue: data.countryShortName,
              rules: [{
                required: true, message: countryBizMap.validCountryAbbreviations,
              }],
            })(
              <Input placeholder={countryBizMap.countryShortName} maxLength="3" disabled />,
            )
          }
        </FormItem>
      </Col>
    </Row>,
    <Row key="a4">
      <Col span={22}>
        <FormItem label={bizMap.currencyCode} {...formItemLayout} hasFeedback>
          {
             getFieldDecorator('currencyCode', {
               initialValue: data.currencyCode,
               rules: [{
                 required: true, message: bizMap.validCurrencyCode,
               }, { validator: numValid }],
             })(
               <Input placeholder={bizMap.currencyCode} disabled maxLength="3" />,
              )
            }
        </FormItem>
      </Col>
    </Row>,
  ]
  const addCountryDom = [
    <Row key="u1">
      <Col span={22}>
        <FormItem label={countryBizMap.country} {...formItemLayout} hasFeedback>
          {
            getFieldDecorator('country', {
              initialValue: data.country,
              rules: [{
                required: true, message: countryBizMap.validCountryCode,
              }],
            })(
              <Input placeholder={countryBizMap.country} readOnly disabled={type === 'update'} addonAfter={countryAfter} />,
            )
          }
        </FormItem>
      </Col>
    </Row>,
    <Row key="u2">
      <Col span={22}>
        <FormItem label={bizMap.currencyCode} {...formItemLayout} hasFeedback>
          {
             getFieldDecorator('currencyCode', {
               initialValue: data.currencyCode,
               rules: [{
                 required: true, message: bizMap.validCurrencyCode,
               }, { validator: numValid }],
             })(
               <Input placeholder={bizMap.currencyCode} maxLength="3" />,
              )
            }
        </FormItem>
      </Col>
    </Row>,
  ]
  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        {/**
        <div hidden>
          <Row>
            <Col span={22}>
              <FormItem label={countryBizMap.countryId} {...formItemLayout} hasFeedback>
                {
                  getFieldDecorator('countryId', {
                    initialValue: data.countryId,
                    rules: [{
                      required: true, message: countryBizMap.validCountryCode,
                    }],
                  })(
                    <Input placeholder={countryBizMap.countryId} disabled />,
                  )
                }
              </FormItem>
            </Col>
          </Row>
        </div>
         */}
        {type === 'update' ? updateCountryDom : null}
        {type === 'add' ? addCountryDom : null}
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.currencyName} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('currencyName', {
                  initialValue: data.currencyName,
                  rules: [{
                    required: true, message: bizMap.validCurrencyName,
                  }],
                })(
                  <Input placeholder={bizMap.currencyName} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.currencyShortName} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('currencyShortName', {
                  initialValue: data.currencyShortName,
                  rules: [{
                    required: true, message: bizMap.validCurrencyCode,
                  }, { validator: codeUpperValid }],
                })(
                  <Input placeholder={bizMap.currencyShortName} maxLength="3" />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.currencyAbbreviations} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('currencyAbbreviations', {
                  initialValue: data.currencyAbbreviations,
                  rules: [{
                    required: true, message: bizMap.validCurrencyAbbreviations,
                  }, { validator: numValid }],
                })(
                  <Input placeholder={bizMap.currencyAbbreviations} maxLength="3" />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.decimalDigit} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('decimalDigit', {
                  initialValue: data.decimalDigit,
                  rules: [{
                    required: true, message: bizMap.validDecimalDigit,
                  }, { validator: numValid }],
                })(
                  <Input placeholder={bizMap.decimalDigit} maxLength="3" />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.status} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('status', {
                  initialValue: data.status,
                  rules: [{
                    required: true, message: bizMap.validStatus,
                  }],
                })(
                  <Select placeholder={commonMap.select}>
                    <Option value="1">{bizMap['status-1']}</Option>
                    <Option value="0">{bizMap['status-0']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <h4>&nbsp;</h4>
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

PubCountryForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
  miniFormVisible: PropTypes.bool,
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  popoverOncancel: PropTypes.func,
  queryCountryList: PropTypes.func,
  rowClickCallback: PropTypes.func,
  toggleCountryTable: PropTypes.func,
};

PubCountryForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
  miniFormVisible: false,
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tablePageChange: noop,
  popoverOncancel: noop,
  queryCountryList: noop,
  rowClickCallback: noop,
  toggleCountryTable: noop,
}

export default Form.create()(PubCountryForm);
