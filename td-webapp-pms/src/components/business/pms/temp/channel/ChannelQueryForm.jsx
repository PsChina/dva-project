import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col, Select } from 'antd';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const Option = Select.Option;

const ChannelQueryForm = (props) => {
  const bizMap = i18n.bizMap('pms/channel');
  const commonMap = i18n.commonMap();
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const { form, formSubmit, deleteClick, enableClick, disableClick } = props;
  const { getFieldDecorator, validateFields, getFieldsValue, resetFields } = form;
  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFields((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        formSubmit(getFieldsValue());
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
          <FormItem label={bizMap.chnType} {...formItemLayout}>
            {
              getFieldDecorator('chnType')(
                <Select placeholder={commonMap.select}>
                  <Option value="0">{bizMap['chnType-0']}</Option>
                  <Option value="1">{bizMap['chnType-1']}</Option>
                  <Option value="2">{bizMap['chnType-2']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.chnName} {...formItemLayout}>
            {
              getFieldDecorator('chnName')(<Input placeholder={bizMap.chnName} />)
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.chnStatus} {...formItemLayout}>
            {
              getFieldDecorator('chnStatus')(
                <Select placeholder={commonMap.select}>
                  <Option value="">&nbsp;</Option>
                  <Option value="0">{commonMap['status-0']}</Option>
                  <Option value="1">{commonMap['status-1']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.chnConter} {...formItemLayout}>
            {
              getFieldDecorator('chnConter')(<Input placeholder={bizMap.chnConter} />)
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col sm={24} md={12} style={{ marginBottom: 16 }}>
          <ButtonGroup>
            <Button icon="check" type="primary" onClick={enableClick}>{commonMap.enable}</Button>
            <Button icon="minus" style={{ marginLeft: 8 }} onClick={disableClick}>{commonMap.disable}</Button>
            <Button style={{ marginLeft: 8 }} type="primary" icon="delete" onClick={deleteClick}>{commonMap.delete}</Button>
          </ButtonGroup>
        </Col>
        <Col sm={24} md={12} style={{ textAlign: 'right', marginBottom: 16 }}>
          <Button type="primary" icon="search" htmlType="submit">{commonMap.search}</Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
        </Col>
      </Row>
    </Form>
  );
};

ChannelQueryForm.propTypes = {
  formSubmit: PropTypes.func,
  enableClick: PropTypes.func,
  disableClick: PropTypes.func,
  deleteClick: PropTypes.func,
};

ChannelQueryForm.defaultProps = {
  formSubmit: noop,
  enableClick: noop,
  disableClick: noop,
  deleteClick: noop,
}

export default Form.create()(ChannelQueryForm);
