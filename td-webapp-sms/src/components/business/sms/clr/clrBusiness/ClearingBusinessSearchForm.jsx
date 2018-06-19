import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col, Select, DatePicker } from 'antd';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;

/**
 * 平台清分form表单
 */
const ClearingBusinessSearchForm = (props) => {
  const bizMap = i18n.bizMap('sms/clearingBusiness');
  const commonMap = i18n.commonMap();
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const { form, formSubmit, chnList } = props;
  const { getFieldDecorator, validateFields, getFieldsValue, resetFields, setFieldsValue } = form;

  const chnOptions = [];
  chnList.forEach((v) => {
    chnOptions.push(<Option key={v.chnId} value={v.chnId}>{v.chnName}</Option>);
  });

  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFields((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        delete dat.stlDat;
        delete dat.clrDat;
        formSubmit(getFieldsValue(dat));
      }
    });
  };

  const handleReset = () => {
    resetFields();
  }

  const handleClearDatePicker = (value, dateString) => {
    setFieldsValue({ clrDatStr: dateString[0], clrDatEnd: dateString[1] });
  }
  const handleSettDatePicker = (value, dateString) => {
    setFieldsValue({ stlDatStr: dateString[0], stlDatEnd: dateString[1] });
  }
  return (
    <Form layout="horizontal" onSubmit={handleSubmit}>
      <div hidden="true">
        <FormItem>
          {
            getFieldDecorator('stlDatStr')(
              <Input />,
            )
          }
        </FormItem>
        <FormItem>
          {
            getFieldDecorator('stlDatEnd')(
              <Input />,
            )
          }
        </FormItem>
        <FormItem>
          {
            getFieldDecorator('clrDatStr')(
              <Input />,
            )
          }
        </FormItem>
        <FormItem>
          {
            getFieldDecorator('clrDatEnd')(
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
          <FormItem label={bizMap.stlSts} {...formItemLayout}>
            {
              getFieldDecorator('stlSts')(
                <Select placeholder={commonMap.select}>
                  <Option value="0">{bizMap['stlSts-01']}</Option>
                  <Option value="1">{bizMap['stlSts-02']}</Option>
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
      </Row>
      <Row>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.busiTyp} {...formItemLayout}>
            {
              getFieldDecorator('busiTyp')(
                <Select placeholder={commonMap.select}>
                  <Option value="01">{bizMap['busiTyp-01']}</Option>
                  <Option value="02">{bizMap['busiTyp-02']}</Option>
                  <Option value="03">{bizMap['busiTyp-03']}</Option>
                  <Option value="04">{bizMap['busiTyp-04']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.clrDat} {...formItemLayout}>
            {
              getFieldDecorator('clrDat')(
                <RangePicker onChange={handleClearDatePicker} />,
              )
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.stlDat} {...formItemLayout}>
            {
              getFieldDecorator('stlDat')(
                <RangePicker onChange={handleSettDatePicker} />,
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

ClearingBusinessSearchForm.propTypes = {
  formSubmit: PropTypes.func,
};

ClearingBusinessSearchForm.defaultProps = {
  formSubmit: noop,
};

export default Form.create()(ClearingBusinessSearchForm);
