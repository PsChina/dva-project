import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col, Select, DatePicker } from 'antd';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;

const StlAuditQueryForm = (props) => {
  const bizMap = i18n.bizMap('sms/stling');
  const commonMap = i18n.commonMap();
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const dateFormat = 'YYYY-MM-DD';
  const { form, advExpand, formSubmit } = props;
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
                <RangePicker format={dateFormat} size={'default'} />,
              )
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.pyeMemName} {...formItemLayout}>
            {
              getFieldDecorator('pyeMemName')(
                <Input maxLength="33" />,
              )
            }
          </FormItem>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.clrTyp} {...formItemLayout}>
            {
              getFieldDecorator('clrTyp')(
                <Select placeholder={commonMap.select}>
                  <Option value="01">{commonMap.individualMem}</Option>
                  <Option value="02">{commonMap.merchantman}</Option>
                  <Option value="03">{commonMap.store}</Option>
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

      <Row style={{ display: advExpand ? 'block' : 'none' }}>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.dealSts} {...formItemLayout}>
            {
              getFieldDecorator('prodType111')(
                <Select placeholder={commonMap.select}>
                  <Option value="00">{bizMap['dealSts-00']}</Option>
                  <Option value="01">{bizMap['dealSts-01']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col sm={24} md={24} style={{ textAlign: 'right', marginBottom: 16 }}>
          <Button type="primary" icon="search" htmlType="submit">{commonMap.search}</Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
        </Col>
      </Row>
    </Form>
  );
}

StlAuditQueryForm.propTypes = {
  advExpand: PropTypes.bool,
  formSubmit: PropTypes.func,
};

StlAuditQueryForm.defaultProps = {
  advExpand: false,
  formSubmit: noop,
};

export default Form.create()(StlAuditQueryForm);
