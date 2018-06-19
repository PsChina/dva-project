import React, { PropTypes } from 'react';
import { Spin, Form, Input, Button, Row, Col, Popover } from 'antd';
import * as i18n from '../../../../utils/i18n';
import * as pattern from '../../../../utils/pattern';
import { standUnitToMinUnit, amtMinUnitToStandUnit } from '../../../../utils/amount';

import QrQueryForm from './QrQueryForm';
import QrPageTable from './QrPageTable';

const noop = () => { };
const FormItem = Form.Item;
const QrLimitInfoForm = (props) => {
  const bizMap = i18n.bizMap('rms/qrLimit');
  const ccyMap = i18n.bizMap('currencyMap');
  const validMap = i18n.bizMap('pattern');
  const qrBizMap = i18n.bizMap('rms/qr');
  const commonMap = i18n.commonMap();
  const { form, data, loading, submiting, formSubmit, type,
    tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange,
    toggleQrTable, miniFormVisible, rowClickCallback, queryQrList } = props;
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
        dat.qrOneLimitAmt = standUnitToMinUnit(dat.qrOneLimitAmt, data.ccy || 'CNY');
        dat.qrOneTopAmt = standUnitToMinUnit(dat.qrOneTopAmt, data.ccy || 'CNY');
        dat.qrDayTopAmt = standUnitToMinUnit(dat.qrDayTopAmt, data.ccy || 'CNY');
        dat.qrMonTopAmt = standUnitToMinUnit(dat.qrMonTopAmt, data.ccy || 'CNY');
        formSubmit(dat);
      }
    });
  };

  const handleReset = () => {
    resetFields();
  }

  const toggleQr = () => {
    toggleQrTable(getFieldsValue());
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
      queryQrList(dat);
    },
  };

  const miniFormContent = [
    <QrQueryForm key="query" {...queryFormProps} />,
    <QrPageTable key="pageTable" {...tableProps} />,
  ];

  const qrNoAfter = (
    <Popover title={qrBizMap.qr} content={miniFormContent} visible={miniFormVisible} placement="bottom">
      <a onClick={toggleQr}>{commonMap.select}</a>
    </Popover>
  );

  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.qrId} {...formItemLayout}>
              {
                getFieldDecorator('qrId', {
                  initialValue: data.qrId,
                })(
                  <Input placeholder={bizMap.qrId} readOnly disabled={type === 'update'} addonAfter={qrNoAfter} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.qrOneLimitAmt} {...formItemLayout}>
              {
                getFieldDecorator('qrOneLimitAmt', {
                  initialValue: data.qrOneLimitAmt ? amtMinUnitToStandUnit(data.qrOneLimitAmt, data.ccy) : 0,
                  rules: [
                      { required: true, message: validMap.REQUIRED.replace(/{\w}/, bizMap.qrOneLimitAmt) },
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
            <FormItem label={bizMap.qrOneTopAmt} {...formItemLayout} >
              {
                getFieldDecorator('qrOneTopAmt', {
                  initialValue: data.qrOneTopAmt ? amtMinUnitToStandUnit(data.qrOneTopAmt, data.ccy) : 0,
                  rules: [
                      { required: true, message: validMap.REQUIRED.replace(/{\w}/, bizMap.qrOneTopAmt) },
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
            <FormItem label={bizMap.qrDayTopAmt} {...formItemLayout} >
              {
                getFieldDecorator('qrDayTopAmt', {
                  initialValue: data.qrDayTopAmt ? amtMinUnitToStandUnit(data.qrDayTopAmt, data.ccy) : 0,
                  rules: [
                      { required: true, message: validMap.REQUIRED.replace(/{\w}/, bizMap.qrDayTopAmt) },
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
            <FormItem label={bizMap.qrMonTopAmt} {...formItemLayout} >
              {
                getFieldDecorator('qrMonTopAmt', {
                  initialValue: data.qrMonTopAmt ? amtMinUnitToStandUnit(data.qrMonTopAmt, data.ccy) : 0,
                  rules: [
                      { required: true, message: validMap.REQUIRED.replace(/{\w}/, bizMap.qrMonTopAmt) },
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
            <FormItem label={bizMap.qrDayTopCount} {...formItemLayout} >
              {
                getFieldDecorator('qrDayTopCount', {
                  initialValue: data.qrDayTopCount ? data.qrDayTopCount : 0,
                  rules: [
                      { required: true, message: validMap.REQUIRED.replace(/{\w}/, bizMap.qrDayTopCount) },
                      { pattern: pattern.COUNT, message: validMap.COUNT },
                  ],
                })(
                  <Input placeholder={bizMap.qrDayTopCount} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.qrMonTopCount} {...formItemLayout} >
              {
                getFieldDecorator('qrMonTopCount', {
                  initialValue: data.qrMonTopCount ? data.qrMonTopCount : 0,
                  rules: [
                      { required: true, message: validMap.REQUIRED.replace(/{\w}/, bizMap.qrMonTopCount) },
                      { pattern: pattern.COUNT, message: validMap.COUNT },
                  ],
                })(
                  <Input placeholder={bizMap.qrMonTopCount} />,
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

QrLimitInfoForm.propTypes = {
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
  toggleQrTable: PropTypes.func,
  rowClickCallback: PropTypes.func,
  queryQrList: PropTypes.func,
};

QrLimitInfoForm.defaultProps = {
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
  toggleQrTable: noop,
  rowClickCallback: noop,
  queryQrList: noop,
}

export default Form.create()(QrLimitInfoForm);
