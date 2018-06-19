import React, { PropTypes } from 'react';
import { Form, Spin, Row, Col, Button } from 'antd';
import * as i18n from '../../../../utils/i18n';
import PublicBankcardTxnAuth from '../temp/auth/PublicBankcardTxnAuth';

const noop = () => { };

const ChannelBankcardAuthInfoForm = (props) => {
  const {
    form,
    loading,
    formSubmit,
    submiting,
    data,
    changeAuthData,
  } = props;
  const {
    validateFieldsAndScroll,
    getFieldsValue,
  } = form;
  const commonMap = i18n.commonMap();
  const bizMap = i18n.bizMap('pms/channelBankcard');
  const authProps = {
    form: form,
    data: data,
    changeAuthData: changeAuthData,
    tag: bizMap.authTag,
    desc: bizMap.authDesc,
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
        // console.log('dat =>', submitDat);
        formSubmit(submitDat);
      }
    });
  };
  // const handleReset = () => {
  //   resetFields();
  // }
  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <Row>
          <Col span={24}>
            <PublicBankcardTxnAuth {...authProps} />
          </Col>
        </Row>
        <h4 className="split">&nbsp;</h4>
        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit" loading={submiting}>{commonMap.submit}</Button>
            {/*<Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>*/}
          </Col>
        </Row>
      </Form>
    </Spin>
  );
}

ChannelBankcardAuthInfoForm.propTypes = {
  loading: PropTypes.bool,
  formSubmit: PropTypes.func,
  submiting: PropTypes.bool,
  data: PropTypes.object,
  changeAuthData: PropTypes.func,
  // resetFields: PropTypes.func,
};

ChannelBankcardAuthInfoForm.defaultProps = {
  loading: false,
  formSubmit: noop,
  submiting: false,
  data: {},
  changeAuthData: noop,
  // resetFields: noop,
};

export default Form.create()(ChannelBankcardAuthInfoForm);
