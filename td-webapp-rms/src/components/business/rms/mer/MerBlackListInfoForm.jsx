import React, { PropTypes } from 'react';
import { Spin, Form, Input, Button, Row, Col, Select, Popover } from 'antd';
import * as i18n from '../../../../utils/i18n';
import MiniFormTitle from '../../../common/MiniFormTitle';


import MerQueryForm from './MerQueryForm';
import MerPageTable from './MerPageTable';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const MerBlackListInfoForm = (props) => {
  const bizMap = i18n.bizMap('rms/merBlackList');
  const merBizMap = i18n.bizMap('rms/mer');
  const commonMap = i18n.commonMap();
  const { form, data, loading, submiting, formSubmit, type, tableList, tableTotal, tableLoading, tableCurrentPage,
    tablePageChange, toggleMerTable, miniFormVisible, rowClickCallback, queryMerList, popoverOncancel } = props;
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

  const toggleMer = () => {
    toggleMerTable(getFieldsValue());
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
    scroll: { y: 240 },
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

  const miniFormTitleProps = {
    title : merBizMap.merId,
    popoverOncancel() {
      popoverOncancel ();
    },
  };

  const miniFormTitle = (
    <MiniFormTitle {...miniFormTitleProps} />
  );

  const merNoAfter = (
    <Popover title={miniFormTitle} content={miniFormContent} visible={miniFormVisible} placement="bottom">
      <a onClick={toggleMer}>{commonMap.select}</a>
    </Popover>
  );

  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <Row>
          <Col span={22}>
            <FormItem label={merBizMap.merId} {...formItemLayout}>
              {
                getFieldDecorator('merId', {
                  initialValue: data.merId,
                })(
                  <Input placeholder={merBizMap.merId} readOnly disabled={type === 'update'} addonAfter={merNoAfter} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
         <Row>
          <Col span={22}>
            <FormItem label={merBizMap.merName} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('merName', {
                  initialValue: data.merName,
                  rules: [{
                    required: true, message: merBizMap.validMerName,
                  }],
                })(
                  <Input placeholder={merBizMap.merName} />,
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

MerBlackListInfoForm.propTypes = {
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
  popoverOncancel: PropTypes.func,
};

MerBlackListInfoForm.defaultProps = {
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
  popoverOncancel: noop,
}

export default Form.create()(MerBlackListInfoForm);
