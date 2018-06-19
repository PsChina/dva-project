import React, {PropTypes} from 'react';
import {Form, Input, Button, Row, Col} from 'antd';
import {encode} from '../../../../utils/code';
import * as i18n from '../../../../utils/i18n';

const noop = () => {
};
const commonMap = i18n.commonMap();
const bizMap = i18n.bizMap('merp/service');
const pMap = i18n.bizMap('pattern');
const FormItem = Form.Item;

const PwdUpdForm = (props) => {
  const {form, data, submiting, formSubmit, confirmDirty, confirmBlur, applyComponents} = props;
  const {getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields} = form;
  const formItemLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 16},
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        dat.oldPwd = encode(dat.oldPwd, 'md5');
        dat.newPwd = encode(dat.newPwd, 'md5');
        dat.reNewPwd = encode(dat.reNewPwd, 'md5');
        formSubmit(dat);
      }
    });
  };

  const handleReset = () => {
    resetFields();
  }

  const checkConfirm = (rule, value, callback) => {
    if (value && confirmDirty) {
      form.validateFields(['reNewPwd'], {force: true});
    }
    callback();
  }

  const checkPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('newPwd')) {
      callback(bizMap.diffTwoPwd);
    } else {
      callback();
    }
  }

  const handleConfirmBlur = (e) => {
    const value = e.target.value;
    confirmBlur(confirmDirty || !!value);
  }

  return (
    <Form layout="horizontal" onSubmit={handleSubmit} style={{maxWidth: 848}}>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.oldPwd} {...formItemLayout}>
            {
              getFieldDecorator('oldPwd', {
                initialValue: data.oldPwd,
                rules: [{
                  required: true, message: pMap.REQUIRED.replace(/{\w}/, bizMap.oldPwd),
                }],
              })(
                <Input placeholder={bizMap.oldPwd} type="password"/>,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.newPwd} {...formItemLayout}>
            {
              getFieldDecorator('newPwd', {
                initialValue: data.newPwd,
                rules: [{
                  required: true, message: pMap.REQUIRED.replace(/{\w}/, bizMap.newPwd),
                }, {
                  validator: checkConfirm,
                }],
              })(
                <Input placeholder={bizMap.newPwd} type="password"/>,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.reNewPwd} {...formItemLayout}>
            {
              getFieldDecorator('reNewPwd', {
                initialValue: data.reNewPwd,
                rules: [{
                  required: true, message: pMap.REQUIRED.replace(/{\w}/, bizMap.reNewPwd),
                }, {
                  validator: checkPassword,
                }],
              })(
                <Input placeholder={bizMap.reNewPwd} type="password" onBlur={handleConfirmBlur}/>,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <h4 className="split">&nbsp;</h4>
      <Row>
        <Col span={24} style={{textAlign: 'center'}}>
          <Button type="primary" htmlType="submit" loading={submiting}>{commonMap.submit}</Button>
          <Button style={{marginLeft: 8}} onClick={handleReset}>{commonMap.reset}</Button>
          {applyComponents}
        </Col>
      </Row>
    </Form>
  );
}

PwdUpdForm.propTypes = {
  data: PropTypes.object,
  // loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
  confirmDirty: PropTypes.bool,
  confirmBlur: PropTypes.func,
};

PwdUpdForm.defaultProps = {
  data: {},
  // loading: false,
  submiting: false,
  formSubmit: noop,
  confirmDirty: false,
  confirmBlur: noop,
}

export default Form.create()(PwdUpdForm);
