import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col, DatePicker } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const dateFormat = 'YYYY-MM-DD';
const JobTriggerLogQueryForm = (props) => {
  const bizMap = i18n.bizMap('bas/jobTriggerLog');
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
          dat.dateStart = dat.date[0].format(dateFormat);
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
          <FormItem label={bizMap.jobName} {...formItemLayout}>
            {
              getFieldDecorator('jobName')(<Input placeholder={bizMap.jobName} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.handleTime} {...formItemLayout}>
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

JobTriggerLogQueryForm.propTypes = {
  formSubmit: PropTypes.func,
};

JobTriggerLogQueryForm.defaultProps = {
  formSubmit: noop,
}

export default Form.create()(JobTriggerLogQueryForm);
