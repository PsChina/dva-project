import React, { PropTypes } from 'react';
import { Form, Input, Select, Button, Row, Col } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const bizMap = i18n.bizMap('merp/terminal');
// const dataMap = i18n.bizMap('merp/tmsData');
const commonMap = i18n.commonMap();
const FormItem = Form.Item;
const Option = Select.Option;

const TerminalQueryForm = (props) => {
  const { form, formSubmit } = props;
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
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.terStatue} {...formItemLayout}>
            {
              getFieldDecorator('terStatue')(
                <Select initialValue="">
                  <Option value="">&nbsp;</Option>
                  <Option value="0">{commonMap['status-0']}</Option>
                  <Option value="1">{commonMap['status-1']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
      </Row>
      {
        /*
        <Row>
          <Col xs={24} sm={12} md={8}>
            <FormItem label={bizMap.terTyp} {...formItemLayout}>
              {
                getFieldDecorator('terTyp')(
                  <Select initialValue="">
                    <Option value="">&nbsp;</Option>
                    <Option value="01">{dataMap['terTyp-01']}</Option>
                    <Option value="02">{dataMap['terTyp-02']}</Option>
                    <Option value="03">{dataMap['terTyp-03']}</Option>
                    <Option value="04">{dataMap['terTyp-04']}</Option>
                    <Option value="05">{dataMap['terTyp-05']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        */
      }
      <Row>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.braId} {...formItemLayout}>
            {
              getFieldDecorator('braId')(<Input placeholder={bizMap.braId} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.braName} {...formItemLayout}>
            {
              getFieldDecorator('braName')(<Input placeholder={bizMap.braName} />)
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ textAlign: 'right', marginBottom: 16 }}>
          <Button type="primary" icon="search" htmlType="submit">{commonMap.search}</Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
        </Col>
      </Row>
    </Form>
  );
}

TerminalQueryForm.propTypes = {
  // advExpand: PropTypes.bool,
  // collapseClick: PropTypes.func,
  formSubmit: PropTypes.func,
};

TerminalQueryForm.defaultProps = {
  // advExpand: false,
  // collapseClick: noop,
  formSubmit: noop,
}

export default Form.create()(TerminalQueryForm);
