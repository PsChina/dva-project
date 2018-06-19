import React, { PropTypes } from 'react';
import { Spin, Form, Input, Button, Row, Col, Select, Popover } from 'antd';
import * as i18n from '../../../../utils/i18n';
import MiniFormTitle from '../../../common/MiniFormTitle';

import TermBlackListQueryForm from './TermQueryForm';
import TermBlackListPageTable from './TermPageTable';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const TermBlackListInfoForm = (props) => {
  const bizMap = i18n.bizMap('rms/termBlackList');
  const termBizMap = i18n.bizMap('rms/term');
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
    <TermBlackListQueryForm key="query" {...queryFormProps} />,
    <TermBlackListPageTable key="pageTable" {...tableProps} />,
  ];

  const miniFormTitleProps = {
    title: termBizMap.term,
    popoverOncancel() {
      popoverOncancel();
    },
  };

  const miniFormTitle = (
    <MiniFormTitle {...miniFormTitleProps} />
  );

  const termNoAfter = (
    <Popover title={miniFormTitle} content={miniFormContent} visible={miniFormVisible} placement="bottom">
      <a onClick={toggleStore}>{commonMap.select}</a>
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
                  rules: [{
                    required: true,
                  }],
                })(
                  <Input placeholder={bizMap.terId} readOnly disabled={type === 'update'} addonAfter={termNoAfter} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.terNo} {...formItemLayout}>
              {
                getFieldDecorator('terNo', {
                  initialValue: data.terNo,
                  rules: [{
                    required: true, message: termBizMap.validTerNo,
                  }],
                })(
                  <Input placeholder={bizMap.terNo} readOnly disabled={type === 'update'}  />,
                )
              }
            </FormItem>
          </Col>
        </Row>

          <Row>
          <Col span={22}>
            <FormItem label={bizMap.terPhyno} {...formItemLayout}>
              {
                getFieldDecorator('terPhyno', {
                  initialValue: data.terPhyno,
                  rules: [{
                    required: true, message: termBizMap.validTerPhyNo,
                  }],
                })(
                  <Input placeholder={bizMap.terPhyno} readOnly disabled={type === 'update'}  />,
                )
              }
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={22}>
            <FormItem label={bizMap.listTyp} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('listTyp', {
                  initialValue: data.listTyp,
                  rules: [{
                    required: true, message: bizMap.validlistTyp,
                  }],
                })(
                  <Select>
                    <Option value="">&nbsp;</Option>
                    <Option value="0">{bizMap['listTyp-0']}</Option>
                    <Option value="1">{bizMap['listTyp-1']}</Option>
                    <Option value="2">{bizMap['listTyp-2']}</Option>
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

TermBlackListInfoForm.propTypes = {
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

TermBlackListInfoForm.defaultProps = {
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

export default Form.create()(TermBlackListInfoForm);
