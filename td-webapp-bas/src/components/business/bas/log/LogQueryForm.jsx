import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col, DatePicker } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const dateFormat = 'YYYY-MM-DD';
const LogQueryForm = (props) => {
  const bizMap = i18n.bizMap('bas/log');
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
        if (dat.date && dat.date.length > 0) {
          dat.dateStr = dat.date[0].format(dateFormat);
          dat.dateEnd = dat.date[1].format(dateFormat);
          delete dat.date;
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
          <FormItem label={bizMap.path} {...formItemLayout}>
            {
              getFieldDecorator('path')(<Input placeholder={bizMap.path} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.className} {...formItemLayout}>
            {
              getFieldDecorator('className')(<Input placeholder={bizMap.className} />)
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.logLevel} {...formItemLayout}>
            {
              getFieldDecorator('logLevel')(<Input placeholder={bizMap.logLevel} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.date} {...formItemLayout}>
            {
              getFieldDecorator('date')(
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

LogQueryForm.propTypes = {
  formSubmit: PropTypes.func,
};

LogQueryForm.defaultProps = {
  formSubmit: noop,
}

export default Form.create()(LogQueryForm);
