import React, { PropTypes } from 'react';
import { Form, Input, Select, Button, Icon, Row, Col } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group;

const ProductQueryForm = (props) => {
  const bizMap = i18n.bizMap('demo/product');
  const commonMap = i18n.commonMap();
  const { form, advExpand, collapseClick, formSubmit, addClick, deleteClick, enableClick, disableClick } = props;
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

  return (
    <Form horizontal onSubmit={handleSubmit}>
      <Row>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.prodName} {...formItemLayout}>
            {
              getFieldDecorator('prodName')(<Input placeholder={bizMap.prodName} />)
            }
          </FormItem>
        </Col>
      </Row>
      <Row style={{ display: advExpand ? 'block' : 'none' }}>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.prodType} {...formItemLayout}>
            {
              getFieldDecorator('prodType')(
                <Select initialValue="">
                  <Option value="">&nbsp;</Option>
                  <Option value="1">{bizMap['prodType-1']}</Option>
                  <Option value="2">{bizMap['prodType-2']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col sm={24} md={12} style={{ marginBottom: 16 }}>
          <ButtonGroup>
            <Button type="primary" icon="plus" onClick={addClick}>{commonMap.add}</Button>
            <Button icon="cross" onClick={deleteClick}>{commonMap.delete}</Button>
            <Button icon="check" type="primary" onClick={enableClick}>{commonMap.enable}</Button>
            <Button icon="minus" onClick={disableClick}>{commonMap.disable}</Button>
          </ButtonGroup>
        </Col>
        <Col sm={24} md={12} style={{ textAlign: 'right', marginBottom: 16 }}>
          <a style={{ marginRight: 8, fontSize: 12 }} onClick={collapseClick}>
            {commonMap.advSearch} <Icon type={advExpand ? 'up' : 'down'} />
          </a>
          <Button type="primary" icon="search" htmlType="submit">{commonMap.search}</Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
        </Col>
      </Row>
    </Form>
  );
}

ProductQueryForm.propTypes = {
  advExpand: PropTypes.bool,
  collapseClick: PropTypes.func,
  formSubmit: PropTypes.func,
  addClick: PropTypes.func,
  deleteClick: PropTypes.func,
  enableClick: PropTypes.func,
  disableClick: PropTypes.func,
};

ProductQueryForm.defaultProps = {
  advExpand: false,
  collapseClick: noop,
  formSubmit: noop,
  addClick: noop,
  deleteClick: noop,
  enableClick: noop,
  disableClick: noop,
}

export default Form.create()(ProductQueryForm);
