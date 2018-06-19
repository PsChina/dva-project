import React, { PropTypes } from 'react';
import { Spin, Form, Input, Button, Row, Col, Popover } from 'antd';
import * as i18n from '../../../../utils/i18n';
import * as pattern from '../../../../utils/pattern';
import { standUnitToMinUnit, amtMinUnitToStandUnit } from '../../../../utils/amount';

import TermQueryForm from './TermQueryForm';
import TermPageTable from './TermPageTable';

const noop = () => { };
const FormItem = Form.Item;
const TermLimitInfoForm = (props) => {
  const bizMap = i18n.bizMap('rms/termLimit');
  const ccyMap = i18n.bizMap('currencyMap');
  const validMap = i18n.bizMap('pattern');
  const termBizMap = i18n.bizMap('rms/term');
  const commonMap = i18n.commonMap();
  const { form, data, loading, submiting, formSubmit, type,
    tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange,
    toggleTermTable, miniFormVisible, rowClickCallback, queryTermList } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields } = form;
  const ccy = ccyMap[data.ccy] || ccyMap.DEFAULT;
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const numberProps = {
    style: { width: '100%' },
    min: 0,
    step: 0.01,
  }

  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        dat.terOneLimitAmt = standUnitToMinUnit(dat.terOneLimitAmt, data.ccy || 'CNY');
        dat.terOneTopAmt = standUnitToMinUnit(dat.terOneTopAmt, data.ccy || 'CNY');
        dat.terDayTopAmt = standUnitToMinUnit(dat.terDayTopAmt, data.ccy || 'CNY');
        dat.terMonTopAmt = standUnitToMinUnit(dat.terMonTopAmt, data.ccy || 'CNY');
        formSubmit(dat);
      }
    });
  };

  const handleReset = () => {
    resetFields();
  }

  const toggleTerm = () => {
    toggleTermTable(getFieldsValue());
  };

  const tableProps = {
    tableList,
    tableTotal,
    tableLoading,
    tableCurrentPage,
    rowSelection: null,
    scroll: { y: 150 },
    tablePageChange(next) {
      tablePageChange(next);
    },
    clickCallback(record) {
      rowClickCallback(record);
    },
  };

  const queryFormProps = {
    formSubmit(dat) {
      queryTermList(dat);
    },
  };

  const miniFormContent = [
    <TermQueryForm key="query" {...queryFormProps} />,
    <TermPageTable key="pageTable" {...tableProps} />,
  ];

  const termNoAfter = (
    <Popover title={termBizMap.term} content={miniFormContent} visible={miniFormVisible} placement="bottom">
      <a onClick={toggleTerm}>{commonMap.select}</a>
    </Popover>
  );

  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.terId} {...formItemLayout}>
              {
                getFieldDecorator('terId', {
                  initialValue: data.terId,
                })(
                  <Input placeholder={bizMap.terId} readOnly disabled={type === 'update'} addonAfter={termNoAfter} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.terOneLimitAmt} {...formItemLayout} >
              {
                getFieldDecorator('terOneLimitAmt', {
                  initialValue: data.terOneLimitAmt ? amtMinUnitToStandUnit(data.terOneLimitAmt, data.ccy) : 0,
                  rules: [
                      { required: true, message: validMap.REQUIRED.replace(/{\w}/, bizMap.terOneLimitAmt) },
                      { pattern: pattern.AMT, message: validMap.AMT },
                  ],
                })(
                  <Input {...numberProps} addonAfter={ccy} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.terOneTopAmt} {...formItemLayout} >
              {
                getFieldDecorator('terOneTopAmt', {
                  initialValue: data.terOneTopAmt ? amtMinUnitToStandUnit(data.terOneTopAmt, data.ccy) : 0,
                  rules: [
                      { required: true, message: validMap.REQUIRED.replace(/{\w}/, bizMap.terOneTopAmt) },
                      { pattern: pattern.AMT, message: validMap.AMT },
                  ],
                })(
                  <Input {...numberProps} addonAfter={ccy} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.terDayTopAmt} {...formItemLayout} >
              {
                getFieldDecorator('terDayTopAmt', {
                  initialValue: data.terDayTopAmt ? amtMinUnitToStandUnit(data.terDayTopAmt, data.ccy) : 0,
                  rules: [
                      { required: true, message: validMap.REQUIRED.replace(/{\w}/, bizMap.terDayTopAmt) },
                      { pattern: pattern.AMT, message: validMap.AMT },
                  ],
                })(
                  <Input {...numberProps} addonAfter={ccy} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.terMonTopAmt} {...formItemLayout} >
              {
                getFieldDecorator('terMonTopAmt', {
                  initialValue: data.terMonTopAmt ? amtMinUnitToStandUnit(data.terMonTopAmt, data.ccy) : 0,
                  rules: [
                      { required: true, message: validMap.REQUIRED.replace(/{\w}/, bizMap.terMonTopAmt) },
                      { pattern: pattern.AMT, message: validMap.AMT },
                  ],
                })(
                  <Input {...numberProps} addonAfter={ccy} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.terDayTopCount} {...formItemLayout} >
              {
                getFieldDecorator('terDayTopCount', {
                  initialValue: data.terDayTopCount ? data.terDayTopCount : 0,
                  rules: [
                      { required: true, message: validMap.REQUIRED.replace(/{\w}/, bizMap.terDayTopCount) },
                      { pattern: pattern.COUNT, message: validMap.COUNT },
                  ],
                })(
                  <Input placeholder={bizMap.terDayTopCount} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.terMonTopCount} {...formItemLayout} >
              {
                getFieldDecorator('terMonTopCount', {
                  initialValue: data.terMonTopCount ? data.terMonTopCount : 0,
                  rules: [
                      { required: true, message: validMap.REQUIRED.replace(/{\w}/, bizMap.terMonTopCount) },
                      { pattern: pattern.COUNT, message: validMap.COUNT },
                  ],
                })(
                  <Input placeholder={bizMap.terMonTopCount} />,
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

TermLimitInfoForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  miniFormVisible: PropTypes.bool,
  toggleTermTable: PropTypes.func,
  rowClickCallback: PropTypes.func,
  queryTermList: PropTypes.func,
};

TermLimitInfoForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tablePageChange: noop,
  miniFormVisible: false,
  toggleTermTable: noop,
  rowClickCallback: noop,
  queryTermrList: noop,
}

export default Form.create()(TermLimitInfoForm);
