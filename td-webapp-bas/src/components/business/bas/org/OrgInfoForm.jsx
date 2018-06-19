import React, { PropTypes } from 'react';
import { Spin, Form, Input, Button, Row, Col } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;

const OrgInfoForm = (props) => {
  const bizMap = i18n.bizMap('bas/org');
  const validMap = i18n.bizMap('bas/basVaild');
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
        {
          type === 'add' ?
            <div>
              <Row>
                <Col span={22}>
                  <FormItem label={bizMap.parentOrgId} {...formItemLayout} hasFeedback>
                    {
                      getFieldDecorator('parentOrgId', {
                        initialValue: data.parentOrgId,
                      })(
                        <Input placeholder={bizMap.parentOrgId} disabled />,
                      )
                    }
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={22}>
                  <FormItem label={bizMap.orgId} {...formItemLayout} hasFeedback>
                    {
                      getFieldDecorator('orgId')(
                        <Input placeholder={bizMap.orgId} />,
                      )
                    }
                  </FormItem>
                </Col>
              </Row>
            </div>
            :
            <Row>
              <Col span={22}>
                <FormItem label={bizMap.orgId} {...formItemLayout} hasFeedback>
                  {
                    getFieldDecorator('orgId', {
                      initialValue: data.orgId,
                      rules: [{
                        required: true, message: validMap.validOrgId,
                      }],
                    })(
                      <Input placeholder={bizMap.orgId} disabled />,
                    )
                  }
                </FormItem>
              </Col>
            </Row>
        }
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.orgName} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('orgName', {
                  initialValue: data.orgName,
                  rules: [{
                    required: true, message: validMap.validOrgName,
                  }],
                })(
                  <Input placeholder={bizMap.orgName} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.orgDesc} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('orgDesc', {
                  initialValue: data.orgDesc,
                })(
                  <Input type="textarea" rows={4} placeholder={bizMap.orgDesc} />,
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

OrgInfoForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
  type: PropTypes.string,
};

OrgInfoForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
  type: '',
}

export default Form.create()(OrgInfoForm);
