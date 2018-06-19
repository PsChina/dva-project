import React, { PropTypes } from 'react';
import { Form, Input, Select, Button, Row, Col } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;

const TerminalParamTempForm = (props) => {
  const bizMap = i18n.bizMap('tms/terminalParamTemp');
  const cascaderTerTyp = i18n.bizMap('tms/cascaderTerTyp');
  const commonMap = i18n.commonMap();
  const { form, data, formSubmit, submiting } = props;
  const { getFieldDecorator, getFieldsValue, resetFields, validateFields } = form;
  const formItemLayout = {
    labelCol: { span: 6 },
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
  }

  return (
    <Form layout="horizontal" onSubmit={handleSubmit}>
      <Row gutter={16}>
        <Col span={24}>
          <FormItem label={bizMap.tempId} {...formItemLayout}>
            {
              getFieldDecorator('tempId', {
                initialValue: data.tempId || '',
                rules: [{
                  required: true,
                }],
              })(<Input placeholder="TMP00X" maxLength={6} />)
            }
          </FormItem>
        </Col>
        <Col span={24}>
          <FormItem label={bizMap.tempName} {...formItemLayout}>
            {
              getFieldDecorator('tempName', {
                initialValue: data.tempName || '',
                rules: [{
                  required: true,
                }],
              })(<Input placeholder={bizMap.tempName} maxLength={10} />)
            }
          </FormItem>
        </Col>
        <Col span={24}>
          <FormItem label={bizMap.tempType} {...formItemLayout}>
            {
              getFieldDecorator('tempType', {
                initialValue: data.tempType || '',
                rules: [{
                  required: true,
                }],
              })(
                <Select>
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
      <h4 className="split">&nbsp;</h4>
      <Row gutter={16}>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Button type="primary" htmlType="submit" loading={submiting}>{commonMap.submit}</Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
        </Col>
      </Row>
    </Form>
  );
}

TerminalParamTempForm.propTypes = {
  submiting: PropTypes.bool,
  data: PropTypes.object,
  formSubmit: PropTypes.func,
};

TerminalParamTempForm.defaultProps = {
  submiting: false,
  data: {},
  formSubmit: noop,
}

export default Form.create()(TerminalParamTempForm);
