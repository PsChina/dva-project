import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;

const StlAuditForm = (props) => {
  const commonMap = i18n.commonMap();

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  }

  const { form, handleAuditSubmit } = props;
  const { getFieldDecorator, validateFields, getFieldsValue, resetFields } = form;

  //审核成功或者失败
  const handleSubmitModalOK = () => {
    validateFields((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const fieldsValue = getFieldsValue();
        fieldsValue.auditFlag = 'YES';
        handleAuditSubmit(fieldsValue);
      }
    });
    resetFields();
  };

  //审核成功或者失败
  const handleSubmitModalReject = () => {
    validateFields((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const fieldsValue = getFieldsValue();
        fieldsValue.auditFlag = 'NO';
        handleAuditSubmit(fieldsValue);
      }
    });
    resetFields();
  };

  return (
    <Form layout="horizontal" >
      <Row gutter={16}>
        <Col span="18">
          <FormItem label={commonMap.auditSuggest} {...formItemLayout}>
            {
              getFieldDecorator('REMARK')(
                <Input maxLength="200" placeholder={commonMap.pleasePutAuditSuggest} />,
              )
            }
          </FormItem>
        </Col>
        <Col span="6" style={{ textAlign: 'left' }}>
          <Button type="primary" htmlType="submit" onClick={handleSubmitModalOK} >{commonMap.agree}</Button>
          &nbsp;&nbsp;
          <Button htmlType="submit" onClick={handleSubmitModalReject} >{commonMap.refuse}</Button>
        </Col>
      </Row>
    </Form>
  );
}

StlAuditForm.propTypes = {
  handleAuditSubmit: PropTypes.func,
};

StlAuditForm.defaultProps = {
  handleAuditSubmit: noop,
};

export default Form.create()(StlAuditForm);

