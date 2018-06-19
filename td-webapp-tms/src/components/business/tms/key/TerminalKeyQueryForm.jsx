import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col, Popover } from 'antd';
import qs from 'qs';
import { encode } from '../../../../utils/code';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;

const TerminalCompanyQueryForm = (props) => {
  const bizMap = i18n.bizMap('tms/terminalKey');
  const commonMap = i18n.commonMap();
  const { form, formSubmit, formReset, detailContent, keysExport, chargeKeysExport } = props;
  const { getFieldDecorator, getFieldsValue, validateFields, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  if (keysExport === '1') {
    const dat = getFieldsValue();
    const param = encode(qs.stringify(dat), 'base64');
    const downloadUrl = `rest/tms/terminal/keys/export?p=${param}`;
    window.location.href = downloadUrl;
    chargeKeysExport();
  }
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
    formReset();
  }

  return (
    <Form layout="horizontal" onSubmit={handleSubmit}>
      <Row>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.terPhyno} {...formItemLayout}>
            {
              getFieldDecorator('terPhyno')(<Input placeholder={bizMap.terPhyno} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.terNo} {...formItemLayout}>
            {
              getFieldDecorator('terNo')(<Input placeholder={bizMap.terNo} />)
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col sm={24} md={12} style={{ marginBottom: 16 }}>
          <Popover content={detailContent} title={bizMap.setManaPassword} trigger="hover" placement="topLeft">
            <Button icon="export" type="primary">{commonMap.export}</Button>
          </Popover>
        </Col>
        <Col sm={24} md={12} style={{ textAlign: 'right', marginBottom: 16 }}>
          <Button type="primary" icon="search" htmlType="submit">{commonMap.search}</Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
        </Col>
      </Row>
    </Form>
  );
}

TerminalCompanyQueryForm.propTypes = {
  formSubmit: PropTypes.func,
  formReset: PropTypes.func,
  detailContent: PropTypes.object,
  keysExport: PropTypes.string,
  chargeKeysExport: PropTypes.func,
};

TerminalCompanyQueryForm.defaultProps = {
  formSubmit: noop,
  formReset: noop,
  detailContent: null,
  keysExport: '0',
  chargeKeysExport: noop,
}

export default Form.create()(TerminalCompanyQueryForm);
