import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col, Select } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const Option = Select.Option;
const TerminalFirmwareQueryForm = (props) => {
  const bizMap = i18n.bizMap('tms/terminalFirmware');
  const dataMap = i18n.bizMap('tms/tmsData');
  const commonMap = i18n.commonMap();
  const { form, formSubmit, addClick, deleteClick, companyOptions } = props;
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
          <FormItem label={bizMap.verNo} {...formItemLayout}>
            {
              getFieldDecorator('verNo')(<Input placeholder={bizMap.verNo} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.copNam} {...formItemLayout}>
            {
              getFieldDecorator('copId')(
                <Select>
                  {
                    companyOptions.map((companyOption, idx) => {
                      return <Option key={idx} value={companyOption.copId}>{companyOption.copNam}</Option>;
                    })
                  }
                </Select>)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.verTyp} {...formItemLayout}>
            {
              getFieldDecorator('verTyp')(<Select initialValue="">
                <Option value="">&nbsp;</Option>
                <Option value="1">{dataMap['verTyp-1']}</Option>
                <Option value="2">{dataMap['verTyp-2']}</Option>
              </Select>)
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col sm={24} md={12} style={{ marginBottom: 16 }}>
          <ButtonGroup>
            <Button icon="plus" type="primary" onClick={addClick}>{commonMap.add}</Button>
            <Button icon="delete" onClick={deleteClick}>{commonMap.delete}</Button>
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

TerminalFirmwareQueryForm.propTypes = {
  formSubmit: PropTypes.func,
  addClick: PropTypes.func,
  deleteClick: PropTypes.func,
  companyOptions: PropTypes.array,
};

TerminalFirmwareQueryForm.defaultProps = {
  formSubmit: noop,
  addClick: noop,
  deleteClick: noop,
  companyOptions: [],
}

export default Form.create()(TerminalFirmwareQueryForm);
