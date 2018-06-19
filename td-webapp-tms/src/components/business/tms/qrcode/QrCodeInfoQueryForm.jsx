import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import qs from 'qs';
import { encode } from '../../../../utils/code';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const ButtonGroup = Button.Group;

const TerminalQueryForm = (props) => {
  const bizMap = i18n.bizMap('tms/qrCode');
  const commonMap = i18n.commonMap();
  const { form, formSubmit, deleteClick, enableClick, disableClick, addClick } = props;
  const { getFieldDecorator, getFieldsValue, validateFields, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const dat = getFieldsValue();
  const param = encode(qs.stringify(dat), 'base64');
  const downloadUrl = `rest/tms/termQrCode/qrcodes/export?p=${param}`;

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
        <Col xs={24} sm={9} md={8}>
          <FormItem label={bizMap.qrId} {...formItemLayout}>
            {
              getFieldDecorator('qrId')(<Input placeholder={bizMap.qrId} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={9} md={8}>
          <FormItem label={bizMap.qrContent} {...formItemLayout}>
            {
              getFieldDecorator('qrContent')(<Input placeholder={bizMap.qrContent} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={9} md={8}>
          <FormItem label={bizMap.merName} {...formItemLayout}>
            {
              getFieldDecorator('merName')(<Input placeholder={bizMap.merName} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={9} md={8}>
          <FormItem label={bizMap.storeName} {...formItemLayout}>
            {
              getFieldDecorator('storeName')(<Input placeholder={bizMap.storeName} />)
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col sm={24} md={12} style={{ marginBottom: 16 }}>
          <a href={downloadUrl} ><Button style={{ marginRight: 8 }} icon="export" type="primary" >{commonMap.export}</Button></a>
          <ButtonGroup>
            <Button icon="plus" onClick={addClick}>{commonMap.add}</Button>
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

TerminalQueryForm.propTypes = {
  formSubmit: PropTypes.func,
  addClick: PropTypes.func,
  deleteClick: PropTypes.func,
  enableClick: PropTypes.func,
  disableClick: PropTypes.func,
};

TerminalQueryForm.defaultProps = {
  formSubmit: noop,
  addClick: noop,
  deleteClick: noop,
  enableClick: noop,
  disableClick: noop,
  exportClick: noop,
}

export default Form.create()(TerminalQueryForm);
