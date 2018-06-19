import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col, Select, DatePicker } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const dateFormat = 'YYYY-MM-DD';

const TaskMonitorQueryForm = (props) => {
  const bizMap = i18n.bizMap('bas/taskMonitor');
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
        if (dat.createdate && dat.createdate.length > 0) {
          dat.startcreatedate = dat.createdate[0].format(dateFormat);
          dat.endcreatedate = dat.createdate[1].format(dateFormat);
          delete dat.createdate;
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
        <Col sm={12} md={8}>
          <FormItem label={bizMap.referbusinessname} {...formItemLayout}>
            {
              getFieldDecorator('referbusinessname')(<Input maxLength={225} placeholder={bizMap.referbusinessname} />)
            }
          </FormItem>
        </Col>
        <Col sm={12} md={8}>
          <FormItem label={bizMap.flowstatus} {...formItemLayout}>
            {
              getFieldDecorator('flowstatus')(
                <Select placeholder={commonMap.select}>
                  <Option value="">{}</Option>
                  <Option value="01">{commonMap['flowstatus-01']}</Option>
                  <Option value="02">{commonMap['flowstatus-02']}</Option>
                  <Option value="03">{commonMap['flowstatus-03']}</Option>
                  <Option value="06">{commonMap['flowstatus-06']}</Option>
                  <Option value="99">{commonMap['flowstatus-99']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
        <Col sm={12} md={8}>
          <FormItem label={bizMap.createdate} {...formItemLayout}>
            {
              getFieldDecorator('createdate')(
                <RangePicker format={dateFormat} />,
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
};

TaskMonitorQueryForm.propTypes = {
  formSubmit: PropTypes.func,
};

TaskMonitorQueryForm.defaultProps = {
  formSubmit: noop,
}

export default Form.create()(TaskMonitorQueryForm);
