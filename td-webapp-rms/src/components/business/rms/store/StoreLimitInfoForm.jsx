import React, { PropTypes } from 'react';
import { Spin, Form, Input, Button, Row, Col, Popover } from 'antd';
import * as i18n from '../../../../utils/i18n';
import * as pattern from '../../../../utils/pattern';
import { standUnitToMinUnit, amtMinUnitToStandUnit } from '../../../../utils/amount';

import StoreQueryForm from './StoreQueryForm';
import StorePageTable from './StorePageTable';

const noop = () => { };
const FormItem = Form.Item;
const StoreLimitInfoForm = (props) => {
  const bizMap = i18n.bizMap('rms/storeLimit');
  const ccyMap = i18n.bizMap('currencyMap');
  const validMap = i18n.bizMap('pattern');
  const storeBizMap = i18n.bizMap('rms/store');
  const commonMap = i18n.commonMap();
  const { form, data, loading, submiting, formSubmit, type,
    tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange,
    toggleStoreTable, miniFormVisible, rowClickCallback, queryStoreList } = props;
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
        dat.braOneLimitAmt = standUnitToMinUnit(dat.braOneLimitAmt, data.ccy || 'CNY');
        dat.braOneTopAmt = standUnitToMinUnit(dat.braOneTopAmt, data.ccy || 'CNY');
        dat.braDayTopAmt = standUnitToMinUnit(dat.braDayTopAmt, data.ccy || 'CNY');
        dat.braMonTopAmt = standUnitToMinUnit(dat.braMonTopAmt, data.ccy || 'CNY');
        formSubmit(dat);
      }
    });
  };

  const handleReset = () => {
    resetFields();
  }

  const toggleStore = () => {
    toggleStoreTable(getFieldsValue());
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
      queryStoreList(dat);
    },
  };

  const miniFormContent = [
    <StoreQueryForm key="query" {...queryFormProps} />,
    <StorePageTable key="pageTable" {...tableProps} />,
  ];

  const storeNoAfter = (
    <Popover title={storeBizMap.store} content={miniFormContent} visible={miniFormVisible} placement="bottom">
      <a onClick={toggleStore}>{commonMap.select}</a>
    </Popover>
  );

  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.braId} {...formItemLayout}>
              {
                getFieldDecorator('braId', {
                  initialValue: data.braId,
                })(
                  <Input placeholder={bizMap.braId} readOnly disabled={type === 'update'} addonAfter={storeNoAfter} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.braOneLimitAmt} {...formItemLayout}>
              {
                getFieldDecorator('braOneLimitAmt', {
                  initialValue: data.braOneLimitAmt ? amtMinUnitToStandUnit(data.braOneLimitAmt, data.ccy) : 0,
                  rules: [
                      { required: true, message: validMap.REQUIRED.replace(/{\w}/, bizMap.braOneLimitAmt) },
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
            <FormItem label={bizMap.braOneTopAmt} {...formItemLayout} >
              {
                getFieldDecorator('braOneTopAmt', {
                  initialValue: data.braOneTopAmt ? amtMinUnitToStandUnit(data.braOneTopAmt, data.ccy) : 0,
                  rules: [
                      { required: true, message: validMap.REQUIRED.replace(/{\w}/, bizMap.braOneTopAmt) },
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
            <FormItem label={bizMap.braDayTopAmt} {...formItemLayout} >
              {
                getFieldDecorator('braDayTopAmt', {
                  initialValue: data.braDayTopAmt ? amtMinUnitToStandUnit(data.braDayTopAmt, data.ccy) : 0,
                  rules: [
                      { required: true, message: validMap.REQUIRED.replace(/{\w}/, bizMap.braDayTopAmt) },
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
            <FormItem label={bizMap.braMonTopAmt} {...formItemLayout} >
              {
                getFieldDecorator('braMonTopAmt', {
                  initialValue: data.braMonTopAmt ? amtMinUnitToStandUnit(data.braMonTopAmt, data.ccy) : 0,
                  rules: [
                      { required: true, message: validMap.REQUIRED.replace(/{\w}/, bizMap.braMonTopAmt) },
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
            <FormItem label={bizMap.braDayTopCount} {...formItemLayout} >
              {
                getFieldDecorator('braDayTopCount', {
                  initialValue: data.braDayTopCount ? data.braDayTopCount : 0,
                  rules: [
                      { required: true, message: validMap.REQUIRED.replace(/{\w}/, bizMap.braDayTopCount) },
                      { pattern: pattern.COUNT, message: validMap.COUNT },
                  ],
                })(
                  <Input placeholder={bizMap.braDayTopCount} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.braMonTopCount} {...formItemLayout} >
              {
                getFieldDecorator('braMonTopCount', {
                  initialValue: data.braMonTopCount ? data.braMonTopCount : 0,
                  rules: [
                      { required: true, message: validMap.REQUIRED.replace(/{\w}/, bizMap.braMonTopCount) },
                      { pattern: pattern.COUNT, message: validMap.COUNT },
                  ],
                })(
                  <Input placeholder={bizMap.braMonTopCount} />,
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

StoreLimitInfoForm.propTypes = {
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
  toggleStoreTable: PropTypes.func,
  rowClickCallback: PropTypes.func,
  queryStoreList: PropTypes.func,
};

StoreLimitInfoForm.defaultProps = {
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
  toggleStoreTable: noop,
  rowClickCallback: noop,
  queryStoreList: noop,
}

export default Form.create()(StoreLimitInfoForm);
