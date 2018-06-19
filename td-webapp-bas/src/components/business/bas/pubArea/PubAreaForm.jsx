import React, { PropTypes } from 'react';
import { Spin, Form, Input, Button, Row, Col, Select, Cascader } from 'antd';
import * as i18n from '../../../../utils/i18n';
import STATEDATAS from '../../../../../config/i18n/zh-cn/continentData.json';
import COUNTRYDATAS from '../../../../../config/i18n/zh-cn/continentCountryData.json';
import PROVDATAS from '../../../../../config/i18n/zh-cn/continentCountryProvData.json';
import CITYSDATAS from '../../../../../config/i18n/zh-cn/continentCountryProvCityData.json';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const PubAreaForm = (props) => {
  const bizMap = i18n.bizMap('bas/pubArea');
  const commonMap = i18n.commonMap();
  const { form, data, loading, submiting, formSubmit, type } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };
  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        if (typeof (dat.parentPath) !== 'string') {
          dat.parentPath = dat.parentPath.join(',');
        }
        formSubmit(dat);
      }
    });
  };

  typeof (data.parentPath) === 'string' ? data.parentPath = data.parentPath.split(',') : ''

  const handleReset = () => {
    resetFields();
  }

  let OPTIONS = [];
  switch (getFieldsValue().areaLevel || data.areaLevel) {
    case '2':
      OPTIONS = STATEDATAS;
      break;
    case '3':
      OPTIONS = COUNTRYDATAS;
      break;
    case '4':
      OPTIONS = PROVDATAS;
      break;
    default:
      break;
  }
  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <div hidden={type === 'update'}>
          <Row>
            <Col >
              <FormItem label={bizMap.areaParentCode} {...formItemLayout}>
                {
                  getFieldDecorator('areaParentCode', {
                    initialValue: data.areaParentCode,
                  })(
                    <Input disabled />,
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col >
              <FormItem label={bizMap.areaParentName} {...formItemLayout}>
                {
                  getFieldDecorator('areaParentName', {
                    initialValue: data.areaParentName,
                  })(
                    <Input disabled />,
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col >
              <FormItem label={bizMap.areaParentName} {...formItemLayout}>
                {
                  getFieldDecorator('areaParentName', {
                    initialValue: data.areaParentName,
                  })(
                    <Input disabled />,
                  )
                }
              </FormItem>
            </Col>
          </Row>
        </div>
        <Row>
          <Col >
            <FormItem label={bizMap.areaCode} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('areaCode', {
                  initialValue: data.areaCode,
                  rules: [{
                    required: true, message: bizMap.validAreaCode,
                  }],
                })(
                  <Input maxLength={30} placeholder={bizMap.areaCode} disabled={type === 'update'} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col >
            <FormItem label={bizMap.areaName} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('areaName', {
                  initialValue: data.areaName,
                  rules: [{
                    required: true, message: bizMap.validAreaName,
                  }],
                })(
                  <Input maxLength={20} placeholder={bizMap.areaName} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col >
            <FormItem label={bizMap.areaNameEn} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('areaNameEn', {
                  initialValue: data.areaNameEn,
                })(
                  <Input maxLength={30} placeholder={bizMap.areaName} />,
                )
              }
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col >
            <FormItem label={bizMap.code} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('code', {
                  initialValue: data.code,
                })(
                  <Input maxLength={4} placeholder={bizMap.areaName} />,
                )
              }
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col >
            <FormItem label={bizMap.areaLevel} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('areaLevel', {
                  initialValue: data.areaLevel,
                  rules: [{
                    required: true, message: bizMap.vaildAreaLevel,
                  }],
                })(
                  <Select placeholder={bizMap.areaLevel}>
                    <Option value="">&nbsp;</Option>
                    <Option value="1">{bizMap['areaLevel-1']}</Option>
                    <Option value="2">{bizMap['areaLevel-2']}</Option>
                    <Option value="3">{bizMap['areaLevel-3']}</Option>
                    <Option value="4">{bizMap['areaLevel-4']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          {
           getFieldsValue().areaLevel === '2' || getFieldsValue().areaLevel === '3' || getFieldsValue().areaLevel === '4' ?
             <Col>
               <FormItem label={bizMap.areaParentPath} {...formItemLayout} hasFeedback>
                 {
                getFieldDecorator('parentPath', {
                  initialValue: data.parentPath,
                  rules: [{
                    required: true, message: bizMap.vaildAreaParentPath,
                  }],
                })(
                  <Cascader
                    placeholder={bizMap.areaParentPath}
                    options={OPTIONS}
                  />,
                )
              }
               </FormItem>
             </Col> : null
          }
        </Row>
        <h4>&nbsp;</h4>
        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit" loading={submiting}>{commonMap.submit}</Button>
            <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
          </Col>
        </Row>
      </Form >
    </Spin >
  );
}

PubAreaForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
};

PubAreaForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
}

export default Form.create()(PubAreaForm);
