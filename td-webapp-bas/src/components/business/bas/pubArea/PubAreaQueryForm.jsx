import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col, Select } from 'antd';
import * as i18n from '../../../../utils/i18n';
import { encode } from '../../../../utils/code';

const noop = () => { };
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const Option = Select.Option;
const PubAreaQueryForm = (props) => {
  const bizMap = i18n.bizMap('bas/pubArea');
  const commonMap = i18n.commonMap();
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const { form, formSubmit, deleteClick, addClick, enableClick, disableClick } = props;
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
  const exportdUrl = 'rest/bas/pubAreas/exportList';
  return (
    <Form layout="horizontal" onSubmit={handleSubmit}>
      <Row>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.areaCode} {...formItemLayout}>
            {
              getFieldDecorator('areaCode')(<Input maxLength={30} placeholder={bizMap.areaCode} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.areaName} {...formItemLayout}>
            {
              getFieldDecorator('areaName')(<Input maxLength={20} placeholder={bizMap.areaName} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.areaNameEn} {...formItemLayout}>
            {
              getFieldDecorator('areaNameEn')(<Input maxLength={30} placeholder={bizMap.areaNameEn} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.areaStatus} {...formItemLayout}>
            {
              getFieldDecorator('areaStatus')(
                <Select placeholder={commonMap.select}>
                  <Option value="">{}</Option>
                  <Option value="0">{commonMap['status-0']}</Option>
                  <Option value="1">{commonMap['status-1']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col sm={24} md={12} style={{ marginBottom: 16 }}>
          <ButtonGroup>
            <Button icon="plus" type="primary" onClick={addClick}>{commonMap.add}</Button>
            <a href={exportdUrl} ><Button style={{ marginLeft: 8 }} icon="plus" >{commonMap.export}</Button></a>
            <Button style={{ marginLeft: 8 }} icon="check" onClick={enableClick}>{commonMap['status-1']}</Button>
            <Button style={{ marginLeft: 8 }} icon="minus" onClick={disableClick}>{commonMap['status-0']}</Button>
            <Button style={{ marginLeft: 8 }} icon="delete" onClick={deleteClick}>{commonMap.delete}</Button>
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

PubAreaQueryForm.propTypes = {
  formSubmit: PropTypes.func,
  addClick: PropTypes.func,
  deleteClick: PropTypes.func,
  enableClick: PropTypes.func,
  disableClick: PropTypes.func,
};

PubAreaQueryForm.defaultProps = {
  formSubmit: noop,
  addClick: noop,
  deleteClick: noop,
  enableClick: noop,
  disableClick: noop,
  exportClick: noop,
}

export default Form.create()(PubAreaQueryForm);
