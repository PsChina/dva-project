import React, { PropTypes } from 'react';
import { Spin, Form, Input, Select, Button, Row, Col } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;

const ProcedureInfoForm = (props) => {
  const bizMap = i18n.bizMap('bas/procedure');
  const bizMapModel = i18n.bizMap('bas/modelMain');
  const bizMapPosition = i18n.bizMap('bas/position');
  const commonMap = i18n.commonMap();
  const { form, data, loading, submiting, formSubmit, type, modelMainOptions, positionOptions } = props;
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
        <Row style={{ display: 'none' }}>
          <Col span={24}>
            <FormItem label={bizMap.nodeno} {...formItemLayout}>
              {
                getFieldDecorator('nodeno', {
                  initialValue: data.nodeno,
                })(
                  <Input />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMapModel.modelname} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('modelno', {
                  initialValue: data.modelno,
                  rules: [{
                    required: true, message: bizMapModel.validModelName,
                  }],
                })(
                  <Select showSearch disabled={type === 'update'}>
                    <Option value="">&nbsp;</Option>
                    {
                      modelMainOptions.map((modelMainOption, idx) => {
                        return <Option key={idx} value={modelMainOption.attrMap.DICT_VALUE}>{modelMainOption.attrMap.DICT_NAME}</Option>;
                      })
                    }
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMapPosition.positionname} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('positioncode', {
                  initialValue: data.positioncode,
                  rules: [{
                    required: true, message: bizMap.validPositionName,
                  }],
                })(
                  <Select disabled={type === 'update'}>
                    <Option value="">&nbsp;</Option>
                    {
                      positionOptions.map((positionOption, idx) => {
                        return <Option key={idx} value={positionOption.attrMap.DICT_VALUE}>{positionOption.attrMap.DICT_NAME}</Option>;
                      })
                    }
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.nodename} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('nodename', {
                  initialValue: data.nodename,
                  rules: [{
                    required: true, message: bizMap.validNodelName,
                  }],
                })(
                  <Input maxLength={75} placeholder={bizMap.nodename} />,
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

ProcedureInfoForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
  modelMainOptions: PropTypes.array,
  positionOptions: PropTypes.array,
};

ProcedureInfoForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
  modelMainOptions: [],
  positionOptions: [],
}

export default Form.create()(ProcedureInfoForm);
