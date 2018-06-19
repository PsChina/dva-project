import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col, Select } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const Option = Select.Option;

const ProcedureQueryForm = (props) => {
  const bizMap = i18n.bizMap('bas/procedure');
  const bizMapModel = i18n.bizMap('bas/modelMain');
  const bizMapPosition = i18n.bizMap('bas/position');
  const commonMap = i18n.commonMap();
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const { form, formSubmit, enableClick, disableClick, addClick } = props;
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
          <FormItem label={bizMap.nodename} {...formItemLayout}>
            {
              getFieldDecorator('nodename')(<Input maxLength={75} placeholder={bizMap.nodename} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.status} {...formItemLayout}>
            {
              getFieldDecorator('status')(
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
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMapModel.modelname} {...formItemLayout}>
            {
              getFieldDecorator('modelname')(<Input maxLength={75} placeholder={bizMapModel.modelname} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMapPosition.positionname} {...formItemLayout}>
            {
              getFieldDecorator('positionname')(<Input maxLength={75} placeholder={bizMapPosition.positionname} />)
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col sm={24} md={12} style={{ marginBottom: 16 }}>
          <ButtonGroup>
            <Button icon="plus" type="primary" onClick={addClick}>{commonMap.add}</Button>
            <Button style={{ marginLeft: 8 }} icon="check" onClick={enableClick}>{commonMap['status-1']}</Button>
            <Button style={{ marginLeft: 8 }} icon="minus" onClick={disableClick}>{commonMap['status-0']}</Button>
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

ProcedureQueryForm.propTypes = {
  formSubmit: PropTypes.func,
  addClick: PropTypes.func,
};

ProcedureQueryForm.defaultProps = {
  formSubmit: noop,
  addClick: noop,
}

export default Form.create()(ProcedureQueryForm);
