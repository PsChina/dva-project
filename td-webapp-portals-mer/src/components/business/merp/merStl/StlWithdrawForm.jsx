import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col, InputNumber, Icon } from 'antd';
import { encode } from '../../../../utils/code';
import * as i18n from '../../../../utils/i18n';
import { amtMinUnitToStandUnit, standUnitToMinUnit } from '../../../../utils/amount';

const noop = () => { };
const commonMap = i18n.commonMap();
const bizMap = i18n.bizMap('merp/stlWithdraw');
const drawValidMap = i18n.bizMap('vaild');
const FormItem = Form.Item;

const StlWithdrawForm = (props) => {
  const { form, data, submiting, formSubmit } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 12 },
    wrapperCol: { span: 6 },
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        dat.withdrawLoginPwd = encode(dat.withdrawLoginPwd, 'md5');
        dat.withdrawAmount = standUnitToMinUnit(dat.withdrawAmount, dat.ccy);
        formSubmit(dat);
        resetFields();
      }
    });
  };

  const handleReset = () => {
    resetFields();
  }

  const checkMaxAmount = (rule, value, callback) => {
    if (value > data.amount) {
      callback(drawValidMap.validStlWithdrawAmount);
    } else {
      callback();
    }
  }

  return (
    <Form layout="horizontal" onSubmit={handleSubmit} style={{ maxWidth: 848 }}>
      <div hidden="true">
        <FormItem>
          {
            getFieldDecorator('ccy', {
              initialValue: data.ccy !== undefined ? data.ccy : 'TWD',
            })(
              <Input />,
            )
          }
        </FormItem>
      </div>
      <Row>
        <Col span={24}>
          <FormItem 
          label={(
            <span>
              <b><Icon type="pay-circle-o" /></b>
              {bizMap.withdrawalAmount}
            </span>
          )}
          {...formItemLayout}>
            {data.amount !== undefined ? amtMinUnitToStandUnit(data.amount, data.ccy) : 0}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.withdrawAmount} {...formItemLayout}>
            {
              getFieldDecorator('withdrawAmount', {
                rules: [{
                  required: true, message: drawValidMap.vaildIsAllNum,
                }, {
                  validator: checkMaxAmount,
                }],
              })(
                <InputNumber min={1} max={999999} maxLength={6} style={{width:120}} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.withdrawLoginPwd} {...formItemLayout}>
            {
              getFieldDecorator('withdrawLoginPwd', {
                rules: [{
                  required: true, message: drawValidMap.validLoginPwd,
                }],
              })(
                <Input size="large" type="password" maxLength={10} style={{width:120}} />,
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
  );
}

StlWithdrawForm.propTypes = {
  data: PropTypes.object,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
};

StlWithdrawForm.defaultProps = {
  data: {},
  submiting: false,
  formSubmit: noop,
}

export default Form.create()(StlWithdrawForm);
