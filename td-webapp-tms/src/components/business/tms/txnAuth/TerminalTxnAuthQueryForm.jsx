import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col, Select } from 'antd';
import * as i18n from '../../../../utils/i18n';

const Option=Select.Option;
const noop = () => { };
const FormItem = Form.Item;
const ButtonGroup = Button.Group;

const TerminalTxnAuthQueryForm = (props) => {
  const bizMap = i18n.bizMap('tms/terminalTxnAuth');
  const commonMap = i18n.commonMap();
  const { form, formSubmit, addClick, enableClick, disableClick, deleteClick, refreshCacheClick } = props;
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
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.txnAuthName} {...formItemLayout}>
            {
              getFieldDecorator('txnAuthName')(<Input placeholder={bizMap.txnAuthName} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>

          <FormItem label={bizMap.txnType} {...formItemLayout}>
            {
              getFieldDecorator('txnType', {
                initialValue: ""
              })(
              <Select>
                <Option value="">{bizMap['txnTypeIsRequired']}</Option>
                <Option value="1">{bizMap['txnType-1']}</Option>
                <Option value="2">{bizMap['txnType-2']}</Option>
                <Option value="3">{bizMap['txnType-3']}</Option>
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
            <Button style={{ marginLeft: 8 }} icon="check" onClick={enableClick}>{commonMap.enable}</Button>
            <Button style={{ marginLeft: 8 }} icon="minus" onClick={disableClick}>{commonMap.disable}</Button>
            <Button style={{ marginLeft: 8 }} icon="delete" onClick={deleteClick}>{commonMap.delete}</Button>
            <Button style={{ marginLeft: 6 }} icon="reload" type="primary" onClick={refreshCacheClick}>{commonMap.refreshCache}</Button>
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

TerminalTxnAuthQueryForm.propTypes = {
  formSubmit: PropTypes.func,
  addClick: PropTypes.func,
  deleteClick: PropTypes.func,
  refreshCacheClick: PropTypes.func,
};

TerminalTxnAuthQueryForm.defaultProps = {
  formSubmit: noop,
  addClick: noop,
  deleteClick: noop,
  refreshCacheClick: noop,
}

export default Form.create()(TerminalTxnAuthQueryForm);
