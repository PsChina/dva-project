import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const ButtonGroup = Button.Group;

const RouterModBankcardQueryForm = (props) => {
  const bizMap = i18n.bizMap('pms/routerMod');
  const commonMap = i18n.commonMap();
  const { form, formSubmit, addClick } = props;
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

  const handleReset = () => {
    resetFields();
  }

  const handleAddClick = () => {
    addClick();
  }

  return (
    <Form layout="horizontal" onSubmit={handleSubmit}>
      <Row>
        {/*<Col xs={24} sm={24} md={12}>
          <FormItem label={bizMap.modNo} {...formItemLayout}>
            {
              getFieldDecorator('modNo')(;<Input placeholder={bizMap.modNo} />)
            }
          </FormItem>
        </Col>*/}
        <Col xs={24} sm={24} md={24}>
          <FormItem label={bizMap.modName} {...formItemLayout}>
            {
              getFieldDecorator('modName')(<Input placeholder={bizMap.modName} />)
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col sm={24} md={12} style={{ marginBottom: 16 }}>
          <ButtonGroup>
            <Button icon="plus" type="primary" onClick={handleAddClick}>{commonMap.add}</Button>
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

RouterModBankcardQueryForm.propTypes = {
  formSubmit: PropTypes.func,
  addClick: PropTypes.func,
};

RouterModBankcardQueryForm.defaultProps = {
  formSubmit: noop,
  addClick: noop,
}

export default Form.create()(RouterModBankcardQueryForm);
