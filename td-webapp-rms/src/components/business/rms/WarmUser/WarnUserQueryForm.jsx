import React, { PropTypes } from 'react';
import { Form, Input, Select, Button, Icon, Row, Col } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group;

const WarnUserQueryForm = (props) => {
  const bizMap = i18n.bizMap('rms/warnUser');
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

  const handleReset = () => {
    resetFields();
  }

  return (
    <Form layout="horizontal" onSubmit={handleSubmit}>
      <Row>
        <Col xs={24} sm={24} md={8}>
          <FormItem label={bizMap.staffName} {...formItemLayout}>
            {
              getFieldDecorator('staffName')(<Input placeholder={bizMap.userName} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <FormItem label={bizMap.staffOrgType} {...formItemLayout}>
            {
              getFieldDecorator('staffOrgType')(
                <Select initialValue="">
                  <Option value="">&nbsp;</Option>
                  <Option value="01">{bizMap['orgType-01']}</Option>
                  <Option value="02">{bizMap['orgType-02']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col sm={24} md={8} style={{ marginBottom: 16 }}>
          <ButtonGroup>
            <Button type="primary" icon="plus" onClick={addClick}>{commonMap.add}</Button>
            <Button icon="cross" onClick={deleteClick}>{commonMap.delete}</Button>
            {/*<Button icon="check" type="primary" onClick={enableClick}>{commonMap.enable}</Button>
            <Button icon="minus" onClick={disableClick}>{commonMap.disable}</Button>*/}
          </ButtonGroup>
        </Col>
        <Col sm={24} md={16} style={{ textAlign: 'right', marginBottom: 16 }}>
          <Button type="primary" icon="search" htmlType="submit">{commonMap.search}</Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
        </Col>
      </Row>
    </Form>
  );
}

WarnUserQueryForm.propTypes = {
  formSubmit: PropTypes.func,
  addClick: PropTypes.func,
  deleteClick: PropTypes.func,
  enableClick: PropTypes.func,
  disableClick: PropTypes.func,
};

WarnUserQueryForm.defaultProps = {
  advExpand: false,
  collapseClick: noop,
  formSubmit: noop,
  addClick: noop,
  deleteClick: noop,
  enableClick: noop,
  disableClick: noop,
}

export default Form.create()(WarnUserQueryForm);
