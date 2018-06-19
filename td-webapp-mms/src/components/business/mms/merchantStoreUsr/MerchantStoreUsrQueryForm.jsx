import React, { PropTypes } from 'react';
import { Form, Input, Select, Button, Row, Col } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group;

const MerchantStoreUsrQueryForm = (props) => {
  const bizMap = i18n.bizMap('mms/merchantStore');
  const commonMap = i18n.commonMap();
  const { form, formSubmit, enableClick, disableClick, sysInfoList, addOne, del } = props;
  const { getFieldDecorator, getFieldsValue, validateFields, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
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
          <FormItem label={bizMap.braUser} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('braUser')(
                <Input placeholder={bizMap.braUser} />,
              )
            }
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label={bizMap.braUserName} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('braUserName')(
                <Input placeholder={bizMap.braUserName} />,
              )
            }
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label={bizMap.braRole} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('braRole')(
                <Select initialValue="">
                  <Option value="">&nbsp;</Option>
                  <Option value="1">{bizMap['braRole-0']}</Option>
                  <Option value="2">{bizMap['braRole-1']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col sm={24} md={12} style={{ marginBottom: 16 }}>
          {/*<ButtonGroup>
            <Button type="primary" icon="plus" onClick={addOne}>{commonMap.add}</Button>
            <Button type="default" icon="cross" onClick={del}>{commonMap.delete}</Button> &nbsp;
            <Button icon="check" type="primary" onClick={enableClick}>{commonMap.enable}</Button>
            <Button icon="minus" onClick={disableClick}>{commonMap.disable}</Button>
          </ButtonGroup>*/}
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
