import React, { PropTypes } from 'react';
import { Spin, Form, Input, Button, Row, Col } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;

const MenuInfoForm = (props) => {
  const bizMap = i18n.bizMap('bas/menu');
  const commonMap = i18n.commonMap();
  const { form, data, loading, submiting, formSubmit, type } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
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
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <div hidden>
          {
            getFieldDecorator('menuId', {
              initialValue: data.menuId,
            })(
              <Input />,
            )
          }
          {
            getFieldDecorator('parentMenuId', {
              initialValue: data.parentMenuId,
            })(
              <Input />,
            )
          }
        </div>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.parentMenuName} {...formItemLayout}>
              {
                getFieldDecorator('parentMenuName', {
                  initialValue: data.parentMenuName,
                })(
                  <Input disabled />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.menuName} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('menuName', {
                  initialValue: data.menuName,
                  rules: [{
                    required: true, message: bizMap.validMenuName,
                  }],
                })(
                  <Input maxLength={30} placeholder={bizMap.menuName} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.menuIcon} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('menuIcon', {
                  initialValue: data.menuIcon,
                })(
                  <Input maxLength={30} placeholder={bizMap.menuIcon} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.menuUrl} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('menuUrl', {
                  initialValue: data.menuUrl,
                })(
                  <Input maxLength={100} placeholder={bizMap.menuUrl} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.menuDesc} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('menuDesc', {
                  initialValue: data.menuDesc,
                })(
                  <Input maxLength={33} type="textarea" rows={4} placeholder={bizMap.menuDesc} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <h4>&nbsp;</h4>
        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit" loading={submiting}>{commonMap.submit}</Button>
            <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
}

MenuInfoForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
};

MenuInfoForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
}

export default Form.create()(MenuInfoForm);
