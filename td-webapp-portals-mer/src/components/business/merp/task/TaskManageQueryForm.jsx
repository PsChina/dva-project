import React, { PropTypes } from 'react';
import { Form, Input, Button, DatePicker, Row, Col } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const dateFormat = 'YYYYMMDD';
const TaskManageQueryForm = (props) => {
  const bizMap = i18n.bizMap('merp/task');
  const commonMap = i18n.commonMap();
  const { form, formSubmit, data, changeResetData } = props;
  const { getFieldDecorator, getFieldsValue, validateFields, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFields((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        if (dat.createdate && dat.createdate.length > 0) {
          dat.startdate = dat.createdate[0].format(dateFormat);
          dat.enddate = dat.createdate[1].format(dateFormat);
          delete dat.createdate;
        }
        formSubmit(dat);
      }
    });
  };
  const handleReset = () => {
    resetFields();
  }
  if (data.formReset) {
    resetFields();
    changeResetData();
  }

  return (
    <Form layout="horizontal" onSubmit={handleSubmit}>
      <Row style={{ display: 'none' }}>
        <Col span={24}>
          <FormItem label={bizMap.braId} {...formItemLayout}>
            {
              getFieldDecorator('modeltype', {
                initialValue: data.modeltype,
              })(
                <Input />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.referbusinessname} {...formItemLayout}>
            {
              getFieldDecorator('referbusinessname')(
                <Input placeholder={bizMap.referbusinessname} />,
              )
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
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
}

TaskManageQueryForm.propTypes = {
  formSubmit: PropTypes.func,
  changeResetData: PropTypes.func,
  data: PropTypes.object,
};

TaskManageQueryForm.defaultProps = {
  formSubmit: noop,
  changeResetData: noop,
  data: {},
}

export default Form.create()(TaskManageQueryForm);
