import React, { PropTypes } from 'react';
import { Form, Input, Button, Select, Row, Col } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const bizMap = i18n.bizMap('merp/merchantStore');
const commonMap = i18n.commonMap();
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const Option = Select.Option;

const MerchantStoreUsrQueryForm = (props) => {
  const { form, formSubmit, enableClick, disableClick, addOne, del } = props;
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
        <Col span={8}>
          <FormItem label={bizMap.usrNo} {...formItemLayout}>
            {
              getFieldDecorator('usrNo')(
                <Input maxLength={10} placeholder={bizMap.usrNo} />,
              )
            }
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label={bizMap.braUser} {...formItemLayout}>
            {
              getFieldDecorator('braUser')(
                <Input maxLength={10} placeholder={bizMap.braUser} />,
              )
            }
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label={bizMap.braUserName} {...formItemLayout}>
            {
              getFieldDecorator('braUserName')(
                <Input maxLength={10} placeholder={bizMap.braUserName} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col sm={24} md={12} style={{ marginBottom: 16 }}>
          <ButtonGroup>
            <Button type="primary" icon="plus" onClick={addOne}>{commonMap.add}</Button>&nbsp;&nbsp;
            <Button icon="delete" onClick={del}>{commonMap.delete}</Button>&nbsp;&nbsp;
            {/**
            <Button icon="check" onClick={enableClick}>{commonMap.enable}</Button>&nbsp;&nbsp;
            <Button icon="minus" onClick={disableClick}>{commonMap.disable}</Button>
            */}
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

MerchantStoreUsrQueryForm.propTypes = {
  formSubmit: PropTypes.func,
  enableClick: PropTypes.func,
  disableClick: PropTypes.func,
};

MerchantStoreUsrQueryForm.defaultProps = {
  advExpand: false,
  collapseClick: noop,
  formSubmit: noop,
  enableClick: noop,
  disableClick: noop,
}

export default Form.create()(MerchantStoreUsrQueryForm);
