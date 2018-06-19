import React, { PropTypes } from 'react';
import { Spin, Form, Input, Button, Row, Col, Select, Popover } from 'antd';
import * as i18n from '../../../../utils/i18n';

import StoreQueryForm from './StoreQueryForm';
import StorePageTable from './StorePageTable';
import MiniFormTitle from '../../../common/MiniFormTitle';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const StoreBlackListInfoForm = (props) => {
  const bizMap = i18n.bizMap('rms/storeBlackList');
  const storeBizMap = i18n.bizMap('rms/store');
  const commonMap = i18n.commonMap();
  const { form, data, loading, submiting, formSubmit, type, tableList, tableTotal, tableLoading, tableCurrentPage,
    tablePageChange, toggleStoreTable, miniFormVisible, rowClickCallback, queryStoreList, popoverOncancel } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
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

  const toggleStore = () => {
    toggleStoreTable(getFieldsValue());
  };

  const handleReset = () => {
    resetFields();
  }
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

  const miniFormTitleProps = {
    title: storeBizMap.store,
    popoverOncancel() {
      popoverOncancel();
    },
  };

  const miniFormTitle = (
    <MiniFormTitle {...miniFormTitleProps} />
  );


  const storeNoAfter = (
    <Popover title={miniFormTitle} content={miniFormContent} visible={miniFormVisible} placement="bottom">
      <a onClick={toggleStore}>{commonMap.select}</a>
    </Popover>
  );

  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <Row>
          <Col span={22}>
            <FormItem label={storeBizMap.braId} {...formItemLayout}>
              {
                getFieldDecorator('braId', {
                  initialValue: data.braId,
                })(
                  <Input placeholder={storeBizMap.braId} readOnly disabled={type === 'update'} addonAfter={storeNoAfter} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={storeBizMap.braName} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('braName', {
                  initialValue: data.braName,
                  rules: [{
                    required: true, message: storeBizMap.validBraName,
                  }],
                })(
                  <Input placeholder={storeBizMap.braName} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.listType} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('listTyp', {
                  initialValue: data.listType,
                  rules: [{
                    required: true, message: bizMap.validListType,
                  }],
                })(
                  <Select>
                    <Option value="">&nbsp;</Option>
                    <Option value="0">{bizMap['listType-0']}</Option>
                    <Option value="1">{bizMap['listType-1']}</Option>
                    <Option value="2">{bizMap['listType-2']}</Option>
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

StoreBlackListInfoForm.propTypes = {
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
  popoverOncancel: PropTypes.func,
};

StoreBlackListInfoForm.defaultProps = {
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
  popoverOncancel: noop,
}

export default Form.create()(StoreBlackListInfoForm);
