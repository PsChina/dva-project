import React, { PropTypes } from 'react';
import { Spin, Form, Input, Icon, Switch, Button, Row, Col } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;

const PositionInfoForm = (props) => {
  const bizMap = i18n.bizMap('bas/position');
  const commonMap = i18n.commonMap();
  const { form, data, loading, submiting, formSubmit } = props;
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
  };

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  }
  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <Row style={{ display: 'none' }}>
          <Col span={24}>
            <FormItem label={bizMap.positionno} {...formItemLayout}>
              {
                getFieldDecorator('positionno', {
                  initialValue: data.positionno,
                })(
                  <Input />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.positioncode} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('positioncode', {
                  initialValue: data.positioncode,
                  rules: [{
                    required: true, message: bizMap.validPositionCode,
                  }],
                })(
                  <Input maxLength={40} placeholder={bizMap.positioncode} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.positionname} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('positionname', {
                  initialValue: data.positionname,
                  rules: [{
                    required: true, message: bizMap.validPositionName,
                  }],
                })(
                  <Input maxLength={75} placeholder={bizMap.nodename} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col sm={24} md={24}>
            <FormItem label="业务处理：" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }} >
              <Input maxLength="15" type="hidden" {...getFieldDecorator('IS_GET_MCC')} />
              <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} onChange={onChange} defaultChecked={false} />&nbsp; &nbsp; 配置商户MCC
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

PositionInfoForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
};

PositionInfoForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
}

export default Form.create()(PositionInfoForm);
