import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;

const StlShrVerifyForm = (props) => {
  const commonMap = i18n.commonMap();

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  }

  const { form, handleSubmitOk, handleSubmitReject } = props;
  const { getFieldDecorator, validateFields, getFieldsValue, resetFields } = form;

  //审核成功
  const handleSubmitModalOk = () => {
    validateFields((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        handleSubmitOk(getFieldsValue());
      }
    });
    resetFields();
  };

  //审核拒绝
  const handleSubmitModalReject = () => {
    handleSubmitReject(getFieldsValue());
    resetFields();
  }
  return (
    <Form layout="horizontal" >
      <Row gutter={16}>
        <Col span="18">
          <FormItem label={commonMap.auditSuggest} {...formItemLayout}>
            {
              getFieldDecorator('bak1')(
                <Input maxLength="200" placeholder={commonMap.pleasePutAuditSuggest} />,
              )
            }
          </FormItem>
        </Col>
        <Col span="6" style={{ textAlign: 'left' }}>
          <Button type="primary" htmlType="submit" onClick={handleSubmitModalOk} >{commonMap.agree}</Button>
          &nbsp;&nbsp;
          <Button htmlType="submit" onClick={handleSubmitModalReject} >{commonMap.refuse}</Button>
        </Col>
      </Row>
    </Form>
  );
}

StlShrVerifyForm.propTypes = {
  handleSubmitReject: PropTypes.func,
};

StlShrVerifyForm.defaultProps = {
  formSubmit: noop,
};

export default Form.create()(StlShrVerifyForm);
