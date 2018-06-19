import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col, Select, DatePicker } from 'antd';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;

/**
 * 分润form表单
 */
const StlShrVerifySearchForm = (props) => {
  const bizMap = i18n.bizMap('sms/stlShr');
  const commonMap = i18n.commonMap();
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const { form, formSubmit } = props;
  const { getFieldDecorator, validateFields, getFieldsValue, resetFields, setFieldsValue } = form;

  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFields((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        dat.shrSts = '1';
        delete dat.shrDat;
        formSubmit(dat);
      }
    });
  };

  const handleReset = () => {
    resetFields();
  }

  const handleDatePicker = (value, dateString) => {
    setFieldsValue({ shrDatStr: dateString[0], shrDatEnd: dateString[1] });
  }

  return (
    <Form layout="horizontal" onSubmit={handleSubmit}>
      <div hidden="true">
        <FormItem>
          {
            getFieldDecorator('shrDatStr')(
              <Input />,
            )
          }
        </FormItem>
        <FormItem>
          {
            getFieldDecorator('shrDatEnd')(
              <Input />,
            )
          }
        </FormItem>
      </div>
      <Row>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.clrTyp} {...formItemLayout}>
            {
              getFieldDecorator('clrTyp')(
                <Select placeholder={commonMap.select}>
                  <Option value="01">{bizMap['clrTyp-01']}</Option>
                  <Option value="02">{bizMap['clrTyp-02']}</Option>
                  <Option value="03">{bizMap['clrTyp-03']}</Option>
                  <Option value="04">{bizMap['clrTyp-04']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.pyeMemName} {...formItemLayout}>
            {
              getFieldDecorator('pyeMemName')(
                <Input placeholder={bizMap.pyeMemName} maxLength="33" />,
              )
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.shrDat} {...formItemLayout}>
            {
              getFieldDecorator('shrDat')(
                <RangePicker onChange={handleDatePicker} />,
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

StlShrVerifySearchForm.propTypes = {
  formSubmit: PropTypes.func,
};

StlShrVerifySearchForm.defaultProps = {
  formSubmit: noop,
};

export default Form.create()(StlShrVerifySearchForm);
