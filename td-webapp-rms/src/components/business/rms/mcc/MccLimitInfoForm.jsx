import React, { PropTypes } from 'react';
import { Spin, Form, Input, Button, Row, Col, Popover } from 'antd';
import * as i18n from '../../../../utils/i18n';
import * as pattern from '../../../../utils/pattern';
import { standUnitToMinUnit, amtMinUnitToStandUnit } from '../../../../utils/amount';

import MccQueryForm from './MccQueryForm';
import MccPageTable from './MccPageTable';

const noop = () => { };
const FormItem = Form.Item;
const MccLimitInfoForm = (props) => {
  const bizMap = i18n.bizMap('rms/mccLimit');
  const ccyMap = i18n.bizMap('currencyMap');
  const validMap = i18n.bizMap('pattern');
  const mccBizMap = i18n.bizMap('rms/mcc');
  const commonMap = i18n.commonMap();
  const { form, data, loading, submiting, formSubmit, type,
    tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange,
    toggleMccTable, miniFormVisible, rowClickCallback, queryMccList } = props;
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
        dat.mccOneLimitAmt = standUnitToMinUnit(dat.mccOneLimitAmt, data.ccy || 'CNY');
        dat.mccOneTopAmt = standUnitToMinUnit(dat.mccOneTopAmt, data.ccy || 'CNY');
        dat.mccDayTopAmt = standUnitToMinUnit(dat.mccDayTopAmt, data.ccy || 'CNY');
        dat.mccMonTopAmt = standUnitToMinUnit(dat.mccMonTopAmt, data.ccy || 'CNY');
        formSubmit(dat);
      }
    });
  };

  const handleReset = () => {
    resetFields();
  }

  const toggleMcc = () => {
    toggleMccTable(getFieldsValue());
  };

  const tableProps = {
    tableList,
    tableTotal,
    tableLoading,
    tableCurrentPage,
    rowSelection: null,
    tablePageChange(next) {
      tablePageChange(next);
    },
    clickCallback(record) {
      rowClickCallback(record);
    },
  };

  const queryFormProps = {
    formSubmit(dat) {
      queryMccList(dat);
    },
  };

  const miniFormContent = [
    <MccQueryForm key="query" {...queryFormProps} />,
    <MccPageTable key="pageTable" {...tableProps} />,
  ];

  const mccNoAfter = (
    <Popover title={mccBizMap.mcc} content={miniFormContent} visible={miniFormVisible} placement="bottom">
      <a onClick={toggleMcc}>{commonMap.select}</a>
    </Popover>
  );

  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.mccNo} {...formItemLayout}>
              {
                getFieldDecorator('mccNo', {
                  initialValue: data.mccNo,
                })(
                  <Input placeholder={bizMap.mccNo} readOnly disabled={type === 'update'} addonAfter={mccNoAfter} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.mccOneLimitAmt} {...formItemLayout}>
              {
                getFieldDecorator('mccOneLimitAmt', {
                  initialValue: data.mccOneLimitAmt ? amtMinUnitToStandUnit(data.mccOneLimitAmt, data.ccy) : 0,
                  rules: [
                      { required: true, message: validMap.REQUIRED.replace(/{\w}/, bizMap.mccOneLimitAmt) },
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
            <FormItem label={bizMap.mccOneTopAmt} {...formItemLayout} >
              {
                getFieldDecorator('mccOneTopAmt', {
                  initialValue: data.mccOneTopAmt ? amtMinUnitToStandUnit(data.mccOneTopAmt, data.ccy) : 0,
                  rules: [
                      { required: true, message: validMap.REQUIRED.replace(/{\w}/, bizMap.mccOneTopAmt) },
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
            <FormItem label={bizMap.mccDayTopAmt} {...formItemLayout} >
              {
                getFieldDecorator('mccDayTopAmt', {
                  initialValue: data.mccDayTopAmt ? amtMinUnitToStandUnit(data.mccDayTopAmt, data.ccy) : 0,
                  rules: [
                      { required: true, message: validMap.REQUIRED.replace(/{\w}/, bizMap.mccDayTopAmt) },
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
            <FormItem label={bizMap.mccMonTopAmt} {...formItemLayout} >
              {
                getFieldDecorator('mccMonTopAmt', {
                  initialValue: data.mccMonTopAmt ? amtMinUnitToStandUnit(data.mccMonTopAmt, data.ccy) : 0,
                  rules: [
                      { required: true, message: validMap.REQUIRED.replace(/{\w}/, bizMap.mccMonTopAmt) },
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
            <FormItem label={bizMap.mccDayTopCount} {...formItemLayout} >
              {
                getFieldDecorator('mccDayTopCount', {
                  initialValue: data.mccDayTopCount ? data.mccDayTopCount : 0,
                  rules: [
                      { required: true, message: validMap.REQUIRED.replace(/{\w}/, bizMap.mccDayTopCount) },
                      { pattern: pattern.COUNT, message: validMap.COUNT },
                  ],
                })(
                  <Input placeholder={bizMap.mccDayTopCount} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.mccMonTopCount} {...formItemLayout} >
              {
                getFieldDecorator('mccMonTopCount', {
                  initialValue: data.mccMonTopCount ? data.mccMonTopCount : 0,
                  rules: [
                      { required: true, message: validMap.REQUIRED.replace(/{\w}/, bizMap.mccMonTopCount) },
                      { pattern: pattern.COUNT, message: validMap.COUNT },
                  ],
                })(
                  <Input placeholder={bizMap.mccMonTopCount} />,
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

MccLimitInfoForm.propTypes = {
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
  toggleMccTable: PropTypes.func,
  rowClickCallback: PropTypes.func,
  queryMccList: PropTypes.func,
};

MccLimitInfoForm.defaultProps = {
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
  toggleMccTable: noop,
  rowClickCallback: noop,
  queryMccList: noop,
}

export default Form.create()(MccLimitInfoForm);
