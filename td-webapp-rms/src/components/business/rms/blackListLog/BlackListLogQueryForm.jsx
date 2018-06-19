import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col, Select, DatePicker } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group;
const RangePicker = DatePicker.RangePicker;
const dateFormat = 'YYYYMMDD';
const BlackListLogQueryForm = (props) => {
  const bizMap = i18n.bizMap('rms/blackListLog');
  const commonMap = i18n.commonMap();
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const { form, formSubmit, deleteClick, addClick } = props;
  const { getFieldDecorator, validateFields, getFieldsValue, resetFields } = form;
  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFields((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        if (dat.operTim && dat.operTim.length > 0) {
          dat.operStartTime = dat.operTim[0].format(dateFormat);
          dat.operEndTime = dat.operTim[1].format(dateFormat);
          delete dat.operTim;
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
        <Col span={8}>
          <FormItem label={bizMap.objTyp} {...formItemLayout}>
            {
              getFieldDecorator('objTyp')(
                <Select placeholder={commonMap.select}>
                  <Option value="">&nbsp;</Option>
                  <Option value="01">{bizMap['objTyp-01']}</Option>
                  <Option value="02">{bizMap['objTyp-02']}</Option>
                  <Option value="03">{bizMap['objTyp-03']}</Option>
                  <Option value="04">{bizMap['objTyp-04']}</Option>
                  <Option value="05">{bizMap['objTyp-05']}</Option>
                  <Option value="06">{bizMap['objTyp-06']}</Option>
                  <Option value="07">{bizMap['objTyp-07']}</Option>
                  <Option value="99">{bizMap['objTyp-99']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label={bizMap.blackLogTyp} {...formItemLayout}>
            {
              getFieldDecorator('blackLogTyp')(
                <Select placeholder={commonMap.select}>
                  <Option value="">&nbsp;</Option>
                  <Option value="01">{bizMap['blackLogTyp-01']}</Option>
                  <Option value="02">{bizMap['blackLogTyp-02']}</Option>
                  <Option value="03">{bizMap['blackLogTyp-03']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
         <Col span={8}>
          <FormItem label={bizMap.operId} {...formItemLayout}>
            {
              getFieldDecorator('operId')(<Input placeholder={bizMap.operId} />)
            }
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label={bizMap.operTim} {...formItemLayout}>
            {
              getFieldDecorator('operTim')(
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

BlackListLogQueryForm.propTypes = {
  formSubmit: PropTypes.func,
  addClick: PropTypes.func,
  deleteClick: PropTypes.func,
};

BlackListLogQueryForm.defaultProps = {
  formSubmit: noop,
  addClick: noop,
  deleteClick: noop,
}

export default Form.create()(BlackListLogQueryForm);
