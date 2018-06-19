import React, { PropTypes } from 'react';
import { Form, Input, Select, Button, Icon, Row, Col } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group;

const PersonalMemberQueryForm = (props) => {
  const bizMap = i18n.bizMap('mms/personalMember');
  const commonMap = i18n.commonMap();
  const { form, advExpand, collapseClick, formSubmit, enableClick, disableClick } = props;
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
          <FormItem label={bizMap.userName} {...formItemLayout}>
            {
              getFieldDecorator('userName')(<Input placeholder={bizMap.userName} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.realName} {...formItemLayout}>
            {
              getFieldDecorator('realName')(<Input placeholder={bizMap.realName} />)
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.mobile} {...formItemLayout}>
            {
              getFieldDecorator('mobile')(<Input placeholder={bizMap.mobile} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.email} {...formItemLayout}>
            {
              getFieldDecorator('email')(<Input placeholder={bizMap.email} />)
            }
          </FormItem>
        </Col>
      </Row>
      <Row style={{ display: advExpand ? 'block' : 'none' }}>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.certificateType} {...formItemLayout}>
            {
              getFieldDecorator('certificateType')(
                <Select initialValue="">
                  <Option value="">&nbsp;</Option>
                  <Option value="01">{bizMap['certificateType-01']}</Option>
                  <Option value="02">{bizMap['certificateType-02']}</Option>
                  <Option value="99">{bizMap['certificateType-99']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.certificateNo} {...formItemLayout}>
            {
              getFieldDecorator('certificateNo')(<Input placeholder={bizMap.certificateNo} />)
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col sm={24} md={12} style={{ marginBottom: 16 }}>
          <ButtonGroup>
            <Button icon="check" type="primary" onClick={enableClick}>{commonMap.enable}</Button>
            <Button icon="minus" onClick={disableClick}>{commonMap.disable}</Button>
          </ButtonGroup>
        </Col>
        <Col sm={24} md={12} style={{ textAlign: 'right', marginBottom: 16 }}>
          <a style={{ marginRight: 8, fontSize: 12 }} onClick={collapseClick}>
            {commonMap.advSearch} <Icon type={advExpand ? 'up' : 'down'} />
          </a>
          <Button type="primary" icon="search" htmlType="submit">{commonMap.search}</Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
        </Col>
      </Row>
    </Form>
  );
}

PersonalMemberQueryForm.propTypes = {
  advExpand: PropTypes.bool,
  collapseClick: PropTypes.func,
  formSubmit: PropTypes.func,
  enableClick: PropTypes.func,
  disableClick: PropTypes.func,
};

PersonalMemberQueryForm.defaultProps = {
  advExpand: false,
  collapseClick: noop,
  formSubmit: noop,
  enableClick: noop,
  disableClick: noop,
}

export default Form.create()(PersonalMemberQueryForm);
