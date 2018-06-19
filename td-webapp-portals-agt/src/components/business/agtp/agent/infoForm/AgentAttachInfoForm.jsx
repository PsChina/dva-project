import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;

const UpdateAttachForm = (props) => {
  const bizMap = i18n.bizMap('agtp/agent');
  const commonMap = i18n.commonMap();
  const { form, style, data, submiting, formAttachSubmit } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 12 },
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        formAttachSubmit(dat);
      }
    });
  };
  const handleReset = () => {
    resetFields();
  }
  return (
    <Form layout="horizontal" style={style} onSubmit={handleSubmit}>
      <Row style={{ display: 'none' }}>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.agtId} {...formItemLayout}>
            {
              getFieldDecorator('agtId', {
                initialValue: data.agtId,
              })(
                <Input placeholder={bizMap.agtId} />,
              )
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.agtType} {...formItemLayout} hasFeedback>
            {
                getFieldDecorator('agtType', {
                  initialValue: data.agtType,
                })(
                  <Input placeholder={bizMap.agtType} />,
                )
              }
          </FormItem>
        </Col>
      </Row>
      {
        data.agtType === '0' ? [
          <Row key="f1">
            <Col xs={24} sm={12} md={8}>
              <FormItem label={bizMap.preModFjsrcPic01} {...formItemLayout} hasFeedback>
                {
                  getFieldDecorator('preModFjsrcPic01', {
                    initialValue: data.preModFjsrcPic01,
                    // rules: [{ required: true }],
                  })(
                    <Input placeholder={bizMap.preModFjsrcPic01} />,
                  )
                }
              </FormItem>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <FormItem label={bizMap.preModFjsrcPic02} {...formItemLayout} hasFeedback>
                {
                  getFieldDecorator('preModFjsrcPic02', {
                    initialValue: data.preModFjsrcPic02,
                    // rules: [{ required: true }],
                  })(
                    <Input placeholder={bizMap.preModFjsrcPic02} />,
                  )
                }
              </FormItem>
            </Col>
          </Row>,
          <Row key="f2">
            <Col xs={24} sm={12} md={8}>
              <FormItem label={bizMap.preModFjsrcPic03} {...formItemLayout} hasFeedback>
                {
                  getFieldDecorator('preModFjsrcPic03', {
                    initialValue: data.preModFjsrcPic03,
                    // rules: [{ required: true }],
                  })(
                    <Input placeholder={bizMap.preModFjsrcPic03} />,
                  )
                }
              </FormItem>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <FormItem label={bizMap.preModFjsrcPic04} {...formItemLayout} hasFeedback>
                {
                  getFieldDecorator('preModFjsrcPic04', {
                    initialValue: data.preModFjsrcPic04,
                    rules: [{ required: true }],
                  })(
                    <Input placeholder={bizMap.preModFjsrcPic04} />,
                  )
                }
              </FormItem>
            </Col>
          </Row>,
            <Row key="f3">
            <Col xs={24} sm={12} md={8}>
              <FormItem label={bizMap.preModFjsrcPic05} {...formItemLayout} hasFeedback>
                {
                  getFieldDecorator('preModFjsrcPic05', {
                    initialValue: data.preModFjsrcPic05,
                    rules: [{ required: true }],
                  })(
                    <Input placeholder={bizMap.preModFjsrcPic05} />,
                  )
                }
              </FormItem>
            </Col>
          </Row>,
        ] : [
          <Row key="f1">
            <Col xs={24} sm={12} md={8}>
              <FormItem label={bizMap.busModFjsrcPic01} {...formItemLayout} hasFeedback>
                {
                  getFieldDecorator('busModFjsrcPic01', {
                    initialValue: data.busModFjsrcPic01,
                    rules: [{ required: true }],
                  })(
                    <Input placeholder={bizMap.busModFjsrcPic01} />,
                  )
                }
              </FormItem>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <FormItem label={bizMap.busModFjsrcPic02} {...formItemLayout} hasFeedback>
                {
                  getFieldDecorator('busModFjsrcPic02', {
                    initialValue: data.busModFjsrcPic02,
                    rules: [{ required: true }],
                  })(
                    <Input placeholder={bizMap.busModFjsrcPic02} />,
                  )
                }
              </FormItem>
            </Col>
          </Row>,
          <Row key="f2">
            <Col xs={24} sm={12} md={8}>
              <FormItem label={bizMap.busModFjsrcPic03} {...formItemLayout} hasFeedback>
                {
                  getFieldDecorator('busModFjsrcPic03', {
                    initialValue: data.busModFjsrcPic03,
                    rules: [{ required: true }],
                  })(
                    <Input placeholder={bizMap.busModFjsrcPic03} />,
                  )
                }
              </FormItem>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <FormItem label={bizMap.busModFjsrcPic04} {...formItemLayout} hasFeedback>
                {
                  getFieldDecorator('busModFjsrcPic04', {
                    initialValue: data.busModFjsrcPic04,
                    rules: [{ required: true }],
                  })(
                    <Input placeholder={bizMap.busModFjsrcPic04} />,
                  )
                }
              </FormItem>
            </Col>
          </Row>,
          <Row key="f3">
            <Col xs={24} sm={12} md={8}>
              <FormItem label={bizMap.busModFjsrcPic05} {...formItemLayout} hasFeedback>
                {
                  getFieldDecorator('busModFjsrcPic05', {
                    initialValue: data.busModFjsrcPic05,
                    rules: [{ required: true }],
                  })(
                    <Input placeholder={bizMap.busModFjsrcPic05} />,
                  )
                }
              </FormItem>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <FormItem label={bizMap.busModFjsrcPic06} {...formItemLayout} hasFeedback>
                {
                  getFieldDecorator('busModFjsrcPic06', {
                    initialValue: data.busModFjsrcPic06,
                    rules: [{ required: true }],
                  })(
                    <Input placeholder={bizMap.busModFjsrcPic06} />,
                  )
                }
              </FormItem>
            </Col>
          </Row>,
          <Row key="f3">
            <Col xs={24} sm={12} md={8}>
              <FormItem label={bizMap.busModFjsrcPic07} {...formItemLayout} hasFeedback>
                {
                  getFieldDecorator('busModFjsrcPic07', {
                    initialValue: data.busModFjsrcPic07,
                    rules: [{ required: true }],
                  })(
                    <Input placeholder={bizMap.busModFjsrcPic07} />,
                  )
                }
              </FormItem>
            </Col>
          </Row>,
        ]}
      <h4 key="btn-split" className="split">&nbsp;</h4>
      <Row key="btn-row">
        <Col span={24} style={{ textAlign: 'center' }}>
          <Button type="primary" htmlType="submit" loading={submiting}>{commonMap.submit}</Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
        </Col>
      </Row>
    </Form>
  );
}

UpdateAttachForm.propTypes = {
  style: PropTypes.object,
  data: PropTypes.object,
  submiting: PropTypes.bool,
  formAttachSubmit: PropTypes.func,
};

UpdateAttachForm.defaultProps = {
  style: {},
  data: {},
  submiting: false,
  nextClick: noop,
  prevClick: noop,
  formAttachSubmit: noop,
}

export default Form.create()(UpdateAttachForm);
