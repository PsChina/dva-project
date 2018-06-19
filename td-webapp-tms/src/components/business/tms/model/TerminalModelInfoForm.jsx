import React, { PropTypes } from 'react';
import { Spin, Form, Input, Select, Button, Row, Col, Cascader } from 'antd';
import moment from 'moment';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;

const TerminalModelInfoForm = (props) => {
  const bizMap = i18n.bizMap('tms/terminalModel');
  const validMap = i18n.bizMap('tms/tmsValid');
  const cascaderTerTyp = i18n.bizMap('tms/cascaderTerTyp');
  const commonMap = i18n.commonMap();
  const { form, data, loading, submiting, formSubmit, companyOptions } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        if (dat.terTyp && dat.terTyp.length > 0) {
          dat.terSubTyp = dat.terTyp[1];
          dat.terTyp = dat.terTyp[0];
        }
        formSubmit(dat);
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
            <FormItem label={bizMap.terModId} {...formItemLayout}>
              {
                getFieldDecorator('terModId', {
                  initialValue: data.terModId,
                })(
                  <Input placeholder={bizMap.terModId} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.copNam} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('copId', {
                  initialValue: data.copId,
                  rules: [{ required: true, message: validMap.validCopNam }],
                })(
                  <Select>
                    {
                      companyOptions.map((companyOption, idx) => {
                        return <Option key={idx} value={companyOption.copId} title={companyOption.copNam}>{companyOption.copNam}</Option>;
                      })
                    }
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.terModNo} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('terModNo', {
                  initialValue: data.terModNo,
                  rules: [{ required: true, message: validMap.validModNo }],
                })(
                  <Input placeholder={bizMap.terModNo} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.terTyp} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('terTyp', {
                  initialValue: data.terTyp ? [data.terTyp, data.terSubTyp] : null,
                  rules: [{ required: true, message: validMap.validTerTyp }],
                })(
                  <Cascader options={cascaderTerTyp} placeholder={bizMap.terTyp} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <h4 className="split">&nbsp;</h4>
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

TerminalModelInfoForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
  companyOptions: PropTypes.array,
};

TerminalModelInfoForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
  companyOptions: [],
}

export default Form.create()(TerminalModelInfoForm);
