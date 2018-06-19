import React, { PropTypes } from 'react';
import { Spin, Form, Input, Button, Row, Col, Switch, Icon } from 'antd';
import * as i18n from '../../../../utils/i18n';
import PubilcBankCardTxnAuth from './PubilcBankCardTxnAuth';


const noop = () => { };
const FormItem = Form.Item;
const TerminalAuthInfoForm = (props) => {
  const bizMap = i18n.bizMap('tms/terminal');
  const commonMap = i18n.commonMap();
  const { form, data, loading, submiting, formSubmit, changeAuthData } = props;
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
        const dat = getFieldsValue();
        const submitDat = {};
        let pospayTxnSup = '';
        pospayTxnSup = `${dat.yecxStatus ? '1' : '0'}${dat.xfStatus ? '1' : '0'}` +
          `${dat.xfczStatus ? '1' : '0'}${dat.cxStatus ? '1' : '0'}` +
          `${dat.cxczStatus ? '1' : '0'}${dat.thStatus ? '1' : '0'}` +
          `${dat.ysqStatus ? '1' : '0'}${dat.ysqczStatus ? '1' : '0'}` +
          `${dat.ysqcxStatus ? '1' : '0'}${dat.ysqcxczStatus ? '1' : '0'}` +
          `${dat.ysqwcStatus ? '1' : '0'}${dat.ysqwcczStatus ? '1' : '0'}` +
          `${dat.ysqwccxStatus ? '1' : '0'}${dat.ysqwccxczStatus ? '1' : '0'}`;
        submitDat.pospayTxnSup = pospayTxnSup;
        submitDat.terId = dat.terId;
        if (dat.bankCardSup) {
          submitDat.bankCardSup = '1';
        } else {
          submitDat.bankCardSup = '0';
        }
        formSubmit(submitDat);
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
            <FormItem label={bizMap.terId} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('terId', {
                  initialValue: data.terId,
                })(
                  <Input placeholder={bizMap.terId} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.bankcardBusiness} {...formItemLayout} >
              {
                getFieldDecorator('bankCardSup', {
                  initialValue: data.bankCardSup,
                })(
                  <Switch
                    checkedChildren={<Icon type="check" />}
                    unCheckedChildren={<Icon type="cross" />}
                    defaultChecked={(data.bankCardSup === '1')}
                  />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        {
          getFieldsValue().bankCardSup ?
            <Row>
              <Col span={24}>
                <PubilcBankCardTxnAuth form={form} data={data} changeAuthData={changeAuthData} />
              </Col>
            </Row>
            :
            null
        }
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

TerminalAuthInfoForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
  changeAuthData: PropTypes.func,
};

TerminalAuthInfoForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
  changeAuthData: noop,
}

export default Form.create()(TerminalAuthInfoForm);
