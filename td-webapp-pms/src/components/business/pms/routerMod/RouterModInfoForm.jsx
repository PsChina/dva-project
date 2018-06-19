import React, { PropTypes } from 'react';
import { Spin, Form, Row, Col, Input, Button, Select } from 'antd';
import * as i18n from '../../../../utils/i18n';
import { codeValid } from '../../../../utils/vaild';

const FormItem = Form.Item;
const Option = Select.Option;

const noop = () => { };

const RouterModInfoForm = (props) => {
  const bizMap = i18n.bizMap('pms/routerMod');
  const validMap = i18n.bizMap('pms/routerModValid');
  const commonMap = i18n.commonMap();
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const { form, formSubmit, data, style, submiting, type, flag, checkmodNo, checkModNoChkMsg, onlyRead } = props;
  const { validateFieldsAndScroll, getFieldsValue, resetFields, getFieldDecorator } = form;

  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        formSubmit(getFieldsValue());
        resetFields();
      }
    });
  };

  const handleReset = () => {
    resetFields();
  };

  const chnRouteModNo = (rule, value, callback) => {
    if (!value) {
      callback(validMap['validmodNo-0"']);
    } else {
      checkmodNo(getFieldsValue());
      if (checkModNoChkMsg) {
        callback(validMap.validModNoRepeat);
      }
      callback();
    }
  }
  const defaultMod = () => data.modNo.indexOf('dft') !== -1
  const sancodeTxnChannel = [
    (<Option key="1011" value="1011">{bizMap['txnChannel-1011']}</Option>), 
    (<Option key="1012" value="1012">{bizMap['txnChannel-1012']}</Option>),
    (<Option key="1014" value="1014">{bizMap['txnChannel-1014']}</Option>),
    (<Option key="1015" value="1015">{bizMap['txnChannel-1015']}</Option>),
    (<Option key="1016" value="1016">{bizMap['txnChannel-1016']}</Option>),
  ]

  const bankcardTxnChannel = [(<Option key="0001" value="0001">{bizMap['txnChannel-0001']}</Option>), (<Option key="0002" value="0002">{bizMap['txnChannel-0002']}</Option>), (<Option key="0003" value="0003">{bizMap['txnChannel-0003']}</Option>)]

  return (
    <Spin spinning={false}>
      <Form layout="horizontal" style={style} onSubmit={handleSubmit}>
        <Row>
          <Col span={18}>
            {
              /*chnRouteModNo校验返回遇到的问题：data带回modal，校验没带回modal*/
            }
            {/*<FormItem label={bizMap.modNo} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('modNo', {
                  initialValue: data.modNo,
                  rules: [{ required: true, validator: chnRouteModNo }, { validator: codeValid }],
                  validateTrigger: 'onBlur',
                })(
                  <Input placeholder={validMap['validModNo-0']} maxLength="6" disabled={type === 'update'} />,
                )
              }
            </FormItem>*/}
            <FormItem label={bizMap.modNo} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('modNo', {
                  initialValue: data.modNo,
                  rules: [{ required: true, message: validMap.validModNo }, { validator: codeValid }],
                  validateTrigger: 'onBlur',
                })(
                  <Input placeholder={validMap['validModNo-0']} maxLength="6" disabled={type === 'update'} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={18}>
            <FormItem label={bizMap.modName} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('modName', {
                  initialValue: data.modName,
                  rules: [{ required: true, message: validMap.validModName }],
                })(
                  <Input placeholder={validMap.validModName} disabled={ onlyRead && defaultMod }/>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={18}>
            <FormItem label={bizMap.txnChannel} {...formItemLayout}>
              {
                getFieldDecorator('txnChannel', {
                  initialValue: data.txnChannel,
                  rules: [{ required: true, message: validMap.validModNo }],
                })(
                  <Select placeholder={commonMap.select} disabled={ onlyRead && defaultMod }>
                    {flag === 'scancode' ? sancodeTxnChannel : bankcardTxnChannel}
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={18}>
            <FormItem label={bizMap.smartRoute} {...formItemLayout}>
              {
                getFieldDecorator('smartRoute', {
                  initialValue: data.smartRoute,
                  rules: [{ required: true, message: validMap.validModSmartRoute }],
                })(
                  <Select placeholder={commonMap.select} disabled={onlyRead && defaultMod}>
                    <Option key="1" value="1">{bizMap['smartRoute-1']}</Option>
                    <Option key="0" value="0">{bizMap['smartRoute-0']}</Option>
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
    </Spin>
  );
};

RouterModInfoForm.propTypes = {
  data: PropTypes.object,
  submiting: PropTypes.bool,
  style: PropTypes.object,
  formSubmit: PropTypes.func,
  checkmodNo: PropTypes.func,
  checkModNoChkMsg: PropTypes.string,
};

RouterModInfoForm.defaultProps = {
  data: {},
  submiting: false,
  style: {},
  formSubmit: noop,
  checkmodNo: noop,
  checkModNoChkMsg: '',
};

export default Form.create()(RouterModInfoForm);
