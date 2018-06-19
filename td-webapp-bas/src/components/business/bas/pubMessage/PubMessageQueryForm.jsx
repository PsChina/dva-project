import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col, Select, DatePicker } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD';
const dateFormat1 = 'YYYYMMDD';
const PubMessageQueryForm = (props) => {
  const bizMap = i18n.bizMap('bas/pubMessage');
  const commonMap = i18n.commonMap();
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const { form, formSubmit } = props;
  const { getFieldDecorator, validateFields, getFieldsValue, resetFields } = form;
  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFields((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        if (dat.SEND_TIM && dat.SEND_TIM.length > 0) {
          dat.sendTimStart = dat.SEND_TIM[0].format(dateFormat1);
          dat.sendTimEnd = dat.SEND_TIM[1].format(dateFormat1);
          delete dat.SEND_TIM;
        }
        formSubmit(dat);
      }
    });
  };
  const handleReset = () => {
    resetFields();
  }
  return (
    <Form layout="horizontal" onSubmit={handleSubmit}>
      <Row>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.stitle} {...formItemLayout}>
            {
              getFieldDecorator('STITLE')(<Input maxLength={16} placeholder={bizMap.stitle} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.sendChannel} {...formItemLayout}>
            {
              getFieldDecorator('SEND_CHANNEL')(
                <Select placeholder={commonMap.select}>
                  <Option value="">{}</Option>
                  <Option value="00">{bizMap['sendChannel-00']}</Option>
                  <Option value="01">{bizMap['sendChannel-01']}</Option>
                  <Option value="02">{bizMap['sendChannel-02']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.receiver} {...formItemLayout}>
            {
              getFieldDecorator('RECEIVER')(<Input maxLength={50} placeholder={bizMap.receiver} />)
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.sstate} {...formItemLayout}>
            {
              getFieldDecorator('SSTATE')(
                <Select placeholder={commonMap.select}>
                  <Option value="">{}</Option>
                  <Option value="00">{bizMap['sstate-00']}</Option>
                  <Option value="01">{bizMap['sstate-01']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.sendTim} {...formItemLayout}>
            {
              getFieldDecorator('SEND_TIM')(
                <RangePicker format={dateFormat} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col sm={24} md={12} style={{ marginBottom: 16 }}>
          &nbsp;
        </Col>
        <Col sm={24} md={12} style={{ textAlign: 'right', marginBottom: 16 }}>
          <Button type="primary" icon="search" htmlType="submit">{commonMap.search}</Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
        </Col>
      </Row>
    </Form>
  );
};

PubMessageQueryForm.propTypes = {
  formSubmit: PropTypes.func,
};

PubMessageQueryForm.defaultProps = {
  formSubmit: noop,
}

export default Form.create()(PubMessageQueryForm);
