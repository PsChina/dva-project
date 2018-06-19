import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col, Select } from 'antd';
import { userRealNameValidate, codePWValid } from '../../../../utils/vaild';
import * as i18n from '../../../../utils/i18n';

const FormItem = Form.Item;
const Option = Select.Option;
const noop = () => { };
const bizMap = i18n.bizMap('merp/merchantStore');
const vaildMap = i18n.bizMap('merp/merchantStoreVaild');
const commonMap = i18n.commonMap();

const MerchantStoreUsrInfoForm = (props) => {
  const { form, style, data, submiting, formBaseSubmit, addFormSubmit, braOptions } = props;
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
        if (dat.usrId !== undefined ) {
          formBaseSubmit(dat);
        } else {
          addFormSubmit(dat);
        }
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
          <FormItem label={bizMap.usrId} {...formItemLayout}>
            {
              getFieldDecorator('usrId', {
                initialValue: data.usrId,
              })(
                <Input maxLength={10} placeholder={bizMap.usrId} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row style={{ display: 'none' }}>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.braId} {...formItemLayout}>
            {
              getFieldDecorator('braId', {
                initialValue: data.braId,
              })(
                <Input maxLength={10} placeholder={bizMap.braId} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      {
        (typeof data.usrNo === 'undefined') || (data.usrNo === null) || (data.usrNo === '') ?
          null
          :
          <Row>
            <Col span={24}>
              <FormItem label={bizMap.usrNo} {...formItemLayout} hasFeedback>
                {
                  getFieldDecorator('usrNo', {
                    initialValue: data.usrNo,
                    rules: [],
                  })(
                    <Input disabled={true} placeholder={bizMap.usrNo} />,
                  )
                }
              </FormItem>
            </Col>
          </Row>
      }
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.braUserName} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('braUserName', {
                initialValue: data.braUserName,
                rules: [{ required: true, message: vaildMap.vaildUsrRealName }, { validator: userRealNameValidate }],
              })(
                <Input placeholder={bizMap.braUserName} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.braUserPW} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('braPsd', {
                initialValue: data.braPsd,
                rules: [{ required: true, message: vaildMap.vaildUsrPW }, { validator: codePWValid }],
              })(
                <Input placeholder={bizMap.braUserPW} type="password"/>,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.braRole} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('braRole', {
                initialValue: data.braRole,
                rules: [{ required: true, message: vaildMap.vaildBraUsrRole }],
              })(
                <Select initialValue="">
                  <Option value="">&nbsp;</Option>
                  <Option value="2">{bizMap['braRole-1']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
          <Col span={24}>
            <FormItem label={bizMap.braName} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('braId', {
                  initialValue: data.braId,
                  rules: [{ required: true, message: vaildMap.vaildBraUsrId }],
                })(
                  <Select>
                    <Option value="">&nbsp;</Option>
                    {
                      braOptions.map((braOption, idx) => {
                        return <Option key={idx} value={braOption.braId}>{braOption.braName}</Option>;
                      })
                    }
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
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

MerchantStoreUsrInfoForm.propTypes = {
  style: PropTypes.object,
  data: PropTypes.object,
  submiting: PropTypes.bool,
  formBaseSubmit: PropTypes.func,
  addFormSubmit: PropTypes.func,
  braOptions: PropTypes.func,
};

MerchantStoreUsrInfoForm.defaultProps = {
  style: {},
  data: {},
  submiting: false,
  nextClick: noop,
  formBaseSubmit: noop,
  addFormSubmit: noop,
  braOptions: noop,
}

export default Form.create()(MerchantStoreUsrInfoForm);
