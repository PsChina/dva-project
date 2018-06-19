import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col, Select, DatePicker } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;

const ChnChkStlQueryForm = (props) => {
  const bizMap = i18n.bizMap('merp/stling');
  const commonMap = i18n.commonMap();
  const dateFormat = 'YYYY-MM-DD';
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const { form, formSubmit, exportClick, applyForMoneyClick } = props;
  const { getFieldDecorator, validateFields, getFieldsValue, resetFields } = form;

  //搜索
  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFields((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        if (dat.stlDat && dat.stlDat.length > 0) {
          dat.stlBegDat = dat.stlDat[0].format(dateFormat);
          dat.stlEndDat = dat.stlDat[1].format(dateFormat);
          delete dat.stlDat;
        }
        formSubmit(dat);
      }
    });
  };

  //重置
  const handleReset = () => {
    resetFields();
  }
  return (
    <Form layout="horizontal" onSubmit={handleSubmit}>
      <Row>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.stlDat} {...formItemLayout}>
            {
              getFieldDecorator('stlDat')(
                <RangePicker size={'default'} format={dateFormat} />,
              )
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.stlSts} {...formItemLayout}>
            {
              getFieldDecorator('stlSts')(
                <Select placeholder={commonMap.select}>
                  <Option value="0">{bizMap.stlSuccessSts}</Option>
                  <Option value="1">{bizMap.stlToAudit}</Option>
                  <Option value="2">{bizMap.stlAuditFail}</Option>
                  <Option value="3">{bizMap.stlToApplyForMoney}</Option>
                  <Option value="4">{bizMap.stlCancel}</Option>
                  <Option value="5">{bizMap.stlUnsettled}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.stlMod} {...formItemLayout}>
            {
              getFieldDecorator('stlMod')(
                <Select placeholder={commonMap.select}>
                  <Option value="0">{bizMap['stlMod-c']}</Option>
                  <Option value="1">{bizMap['stlMod-n']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col sm={24} md={12} style={{ textAlign: 'right', marginBottom: 16 }}>
          <Button type="primary" icon="search" htmlType="submit">{commonMap.search}</Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
        </Col>
      </Row>
    </Form>
  );
}

ChnChkStlQueryForm.propTypes = {
  exportClick: PropTypes.func,
  formSubmit: PropTypes.func,
};

ChnChkStlQueryForm.defaultProps = {
  exportClick: noop,
  formSubmit: noop,
};

export default Form.create()(ChnChkStlQueryForm);
