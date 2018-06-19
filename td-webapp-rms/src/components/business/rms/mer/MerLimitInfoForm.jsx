import React, { PropTypes } from 'react';
import { Spin, Form, Input, Button, Row, Col, Popover } from 'antd';
import * as i18n from '../../../../utils/i18n';
import * as pattern from '../../../../utils/pattern';
import { standUnitToMinUnit, amtMinUnitToStandUnit } from '../../../../utils/amount';

import MerQueryForm from './MerQueryForm';
import MerPageTable from './MerPageTable';

const noop = () => { };
const FormItem = Form.Item;
const MerLimitInfoForm = (props) => {
  const bizMap = i18n.bizMap('rms/merLimit');
  const ccyMap = i18n.bizMap('currencyMap');
  const validMap = i18n.bizMap('pattern');
  const merBizMap = i18n.bizMap('rms/mer');
  const commonMap = i18n.commonMap();
  const { form, data, loading, submiting, formSubmit, type,
    tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange,
    toggleMerTable, miniFormVisible, rowClickCallback, queryMerList } = props;
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
        dat.merOneLimitAmt = standUnitToMinUnit(dat.merOneLimitAmt, data.ccy || 'CNY');
        dat.merOneTopAmt = standUnitToMinUnit(dat.merOneTopAmt, data.ccy || 'CNY');
        dat.merDayTopAmt = standUnitToMinUnit(dat.merDayTopAmt, data.ccy || 'CNY');
        dat.merMonTopAmt = standUnitToMinUnit(dat.merMonTopAmt, data.ccy || 'CNY');
        formSubmit(dat);
      }
    });
  };

  const handleReset = () => {
    resetFields();
  }

  const toggleMer = () => {
    toggleMerTable(getFieldsValue());
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
      queryMerList(dat);
    },
  };

  const miniFormContent = [
    <MerQueryForm key="query" {...queryFormProps} />,
    <MerPageTable key="pageTable" {...tableProps} />,
  ];

  const merNoAfter = (
    <Popover title={merBizMap.mer} content={miniFormContent} visible={miniFormVisible} placement="bottom">
      <a onClick={toggleMer}>{commonMap.select}</a>
    </Popover>
  );

  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.merId} {...formItemLayout}>
              {
                getFieldDecorator('merId', {
                  initialValue: data.merId,
                })(
                  <Input placeholder={bizMap.merId} readOnly disabled={type === 'update'} addonAfter={merNoAfter} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.merOneLimitAmt} {...formItemLayout}>
              {
                getFieldDecorator('merOneLimitAmt', {
                  initialValue: data.merOneLimitAmt ? amtMinUnitToStandUnit(data.merOneLimitAmt, data.ccy) : 0,
                  rules: [
                      { required: true, message: validMap.REQUIRED.replace(/{\w}/, bizMap.merOneLimitAmt) },
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
            <FormItem label={bizMap.merOneTopAmt} {...formItemLayout} >
              {
                getFieldDecorator('merOneTopAmt', {
                  initialValue: data.merOneTopAmt ? amtMinUnitToStandUnit(data.merOneTopAmt, data.ccy) : 0,
                  rules: [
                      { required: true, message: validMap.REQUIRED.replace(/{\w}/, bizMap.merOneTopAmt) },
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
            <FormItem label={bizMap.merDayTopAmt} {...formItemLayout} >
              {
                getFieldDecorator('merDayTopAmt', {
                  initialValue: data.merDayTopAmt ? amtMinUnitToStandUnit(data.merDayTopAmt, data.ccy) : 0,
                  rules: [
                      { required: true, message: validMap.REQUIRED.replace(/{\w}/, bizMap.merDayTopAmt) },
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
            <FormItem label={bizMap.merMonTopAmt} {...formItemLayout} >
              {
                getFieldDecorator('merMonTopAmt', {
                  initialValue: data.merMonTopAmt ? amtMinUnitToStandUnit(data.merMonTopAmt, data.ccy) : 0,
                  rules: [
                      { required: true, message: validMap.REQUIRED.replace(/{\w}/, bizMap.merMonTopAmt) },
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
            <FormItem label={bizMap.merDayTopCount} {...formItemLayout} >
              {
                getFieldDecorator('merDayTopCount', {
                  initialValue: data.merDayTopCount ? data.merDayTopCount : 0,
                  rules: [
                      { required: true, message: validMap.REQUIRED.replace(/{\w}/, bizMap.merDayTopCount) },
                      { pattern: pattern.COUNT, message: validMap.COUNT },
                  ],
                })(
                  <Input placeholder={bizMap.merDayTopCount} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.merMonTopCount} {...formItemLayout} >
              {
                getFieldDecorator('merMonTopCount', {
                  initialValue: data.merMonTopCount ? data.merMonTopCount : 0,
                  rules: [
                      { required: true, message: validMap.REQUIRED.replace(/{\w}/, bizMap.merMonTopCount) },
                      { pattern: pattern.COUNT, message: validMap.COUNT },
                  ],
                })(
                  <Input placeholder={bizMap.merMonTopCount} />,
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

MerLimitInfoForm.propTypes = {
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
  toggleMerTable: PropTypes.func,
  rowClickCallback: PropTypes.func,
  queryMerList: PropTypes.func,
};

MerLimitInfoForm.defaultProps = {
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
  toggleMerTable: noop,
  rowClickCallback: noop,
  queryMerList: noop,
}

export default Form.create()(MerLimitInfoForm);
