import React, { PropTypes } from 'react';
import { Spin, Form, Input, Button, Row, Col, Select } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const PaperBlackListInfoForm = (props) => {
  const bizMap = i18n.bizMap('rms/paperBlackList');
  const paperBizMap = i18n.bizMap('rms/paper');
  const commonMap = i18n.commonMap();
  const { form, data, loading, submiting, formSubmit } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
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
        <Row>
          <Col span={22}>
            <FormItem label={paperBizMap.paperId} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('paperId', {
                  initialValue: data.paperId,
                  rules: [{
                    required: true, message: paperBizMap.validPaperId,
                  }],
                })(
                  <Input placeholder={paperBizMap.paperId} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={paperBizMap.paperTyp} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('paperTyp', {
                  initialValue: data.paperTyp,
                  rules: [{
                    required: true, message: paperBizMap.validPaperTyp,
                  }],
                })(
                  <Select>
                    <Option value="">&nbsp;</Option>
                    <Option value="01">{paperBizMap['paperTyp-01']}</Option>
                    <Option value="02">{paperBizMap['paperTyp-02']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.listTyp} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('listTyp', {
                  initialValue: data.listTyp,
                  rules: [{
                    required: true, message: bizMap.validListType,
                  }],
                })(
                  <Select>
                    <Option value="">&nbsp;</Option>
                    <Option value="0">{bizMap['listTyp-0']}</Option>
                    <Option value="1">{bizMap['listTyp-1']}</Option>
                    <Option value="2">{bizMap['listTyp-2']}</Option>
                  </Select>,
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

PaperBlackListInfoForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
};

PaperBlackListInfoForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
}

export default Form.create()(PaperBlackListInfoForm);
