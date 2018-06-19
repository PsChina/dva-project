import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const ButtonGroup = Button.Group;

const MerSmartRouterQueryForm = (props) => {
  const bizMap = i18n.bizMap('pms/merchant');
  const commonMap = i18n.commonMap();
  const { form, formSubmit, addClick, deleteClick, enableClick, disableClick } = props;
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
        formSubmit(getFieldsValue());
      }
    });
  };

  const handleAddClick = () => {
    addClick(getFieldsValue());
  }

  const handleReset = () => {
    resetFields();
  }

  return (
    <Form layout="horizontal" onSubmit={handleSubmit}>
      <Row>
        {/*<Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.merId} {...formItemLayout}>
            {
              getFieldDecorator('merId')(<Input placeholder={bizMap.merId} />)
            }
          </FormItem>
        </Col>*/}
        <Col xs={24} sm={24} md={12}>
          <FormItem label={bizMap.merName} {...formItemLayout}>
            {
              getFieldDecorator('merName')(<Input placeholder={bizMap.merName} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={24} md={12}>
          <FormItem label={bizMap.merNo} {...formItemLayout}>
            {
              getFieldDecorator('merNo')(<Input placeholder={bizMap.merNo} />)
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col sm={24} md={12} style={{ marginBottom: 16 }}>
          <ButtonGroup>
            <Button icon="plus" type="primary" onClick={handleAddClick}>{commonMap.add}</Button>
            <Button style={{ marginLeft: 8 }} icon="check" onClick={enableClick}>{commonMap.enable}</Button>
            <Button style={{ marginLeft: 8 }} icon="minus" onClick={disableClick}>{commonMap.disable}</Button>
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
}

MerSmartRouterQueryForm.propTypes = {
  formSubmit: PropTypes.func,
  addClick: PropTypes.func,
  deleteClick: PropTypes.func,
  enableClick: PropTypes.func,
  disableClick: PropTypes.func,
};

MerSmartRouterQueryForm.defaultProps = {
  formSubmit: noop,
  addClick: noop,
  deleteClick: noop,
  enableClick: noop,
  disableClick: noop,
}

export default Form.create()(MerSmartRouterQueryForm);
