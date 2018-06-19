import React, { PropTypes } from 'react';
import { Form, Input, Select, Button, Row, Col } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const TerminalParamTempQueryForm = (props) => {
  const bizMap = i18n.bizMap('tms/terminalParamTemp');
  const cascaderTerTyp = i18n.bizMap('tms/cascaderTerTyp');
  const commonMap = i18n.commonMap();
  const { form, formSubmit, formReset, addClick } = props;
  const { getFieldDecorator, getFieldsValue, validateFields, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
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
    formReset();
  }

  return (
    <Form layout="horizontal" onSubmit={handleSubmit}>
      <Row gutter={16}>
        <Col span={12}>
          <FormItem label={bizMap.tempName} {...formItemLayout}>
            {
              getFieldDecorator('tempName')(<Input placeholder={bizMap.tempName} />)
            }
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label={bizMap.tempType} {...formItemLayout}>
            {
              getFieldDecorator('tempType')(
                <Select>
                  <Option value="">&nbsp;</Option>
                  {
                    cascaderTerTyp.map((item, idx) => {
                      return <Option key={idx} value={item.value}>{item.label}</Option>;
                    })
                  }
                </Select>,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col sm={24} md={12} style={{ marginBottom: 16 }}>
          <Col span={8}>
            <Button type="primary" onClick={addClick} icon="plus">{commonMap.add}</Button>
          </Col>
        </Col>
        <Col sm={24} md={12} style={{ textAlign: 'right', marginBottom: 16 }}>
          <Button type="primary" icon="search" htmlType="submit">{commonMap.search}</Button>
          <Button type="default" style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
        </Col>
      </Row>
    </Form>
  );
}

TerminalParamTempQueryForm.propTypes = {
  formSubmit: PropTypes.func,
  formReset: PropTypes.func,
  addClick: PropTypes.func,
};

TerminalParamTempQueryForm.defaultProps = {
  formSubmit: noop,
  formReset: noop,
  addClick: noop,
}

export default Form.create()(TerminalParamTempQueryForm);
