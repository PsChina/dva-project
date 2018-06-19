import React, { PropTypes } from 'react';
import { Form, Row, Col, Switch, Icon } from 'antd';
import * as i18n from '../../../../../utils/i18n';

const FormItem = Form.Item;
const noop = () => { };
const PublicBankCardTxnAuth = (props) => {
  // const dateFormat = 'YYYY-MM-DD';
  const bizMap = i18n.bizMap('pms/publicBankcardTxnAuth');
  const { form, data, changeAuthData, tag, desc } = props;
  const { getFieldDecorator, getFieldsValue } = form;
  const formItemLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
  };

  return (
    <div>
      <div>
        <h3 className="split">{bizMap.commAuth}</h3>
        <Row>
          <Col md={6}>
            <FormItem label={bizMap.xfStatus} {...formItemLayout} >
              {
                getFieldDecorator('xfStatus', {
                  initialValue: data.xfStatus,
                })(
                  <Switch
                    checkedChildren={<Icon type="check" />}
                    unCheckedChildren={<Icon type="cross" />}
                    checked={(data.xfStatus)}
                    disabled={!data.fXfStatus}
                    onChange={() => changeAuthData(Object.assign({}, { data }, { xfStatus: !getFieldsValue().xfStatus }))}
                  />,
                )
              }
            </FormItem>
          </Col>
          <Col md={6}>
            <FormItem label={bizMap.cxStatus} {...formItemLayout} >
              {
                getFieldDecorator('cxStatus', {
                  initialValue: data.cxStatus,
                })(
                  <Switch
                    checkedChildren={<Icon type="check" />}
                    unCheckedChildren={<Icon type="cross" />}
                    checked={(data.cxStatus)}
                    disabled={!data.fCxStatus}
                    onChange={() => changeAuthData(Object.assign({}, { data }, { cxStatus: !getFieldsValue().cxStatus }))}
                  />,
                )
              }
            </FormItem>
          </Col>
          <Col md={6}>
            <FormItem label={bizMap.thStatus} {...formItemLayout} >
              {
                getFieldDecorator('thStatus', {
                  initialValue: data.thStatus,
                })(
                  <Switch
                    checkedChildren={<Icon type="check" />}
                    unCheckedChildren={<Icon type="cross" />}
                    checked={(data.thStatus)}
                    disabled={!data.fThStatus}
                    onChange={() => changeAuthData(Object.assign({}, { data }, { thStatus: !getFieldsValue().thStatus }))}
                  />,
                )
              }
            </FormItem>
          </Col>
          <Col md={6}>
            <FormItem label={bizMap.yecxStatus} {...formItemLayout} >
              {
                getFieldDecorator('yecxStatus', {
                  initialValue: data.yecxStatus,
                })(
                  <Switch
                    checkedChildren={<Icon type="check" />}
                    unCheckedChildren={<Icon type="cross" />}
                    checked={(data.yecxStatus)}
                    disabled={!data.fYecxStatus}
                    onChange={() => changeAuthData(Object.assign({}, { data }, { yecxStatus: !getFieldsValue().yecxStatus }))}
                  />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <FormItem label={bizMap.xfczStatus} {...formItemLayout} >
              {
                getFieldDecorator('xfczStatus', {
                  initialValue: data.xfczStatus && getFieldsValue().xfStatus,
                })(
                  <Switch
                    checkedChildren={<Icon type="check" />}
                    unCheckedChildren={<Icon type="cross" />}
                    checked={data.xfczStatus && getFieldsValue().xfStatus}
                    disabled={!data.fXfczStatus || !getFieldsValue().xfStatus}
                    onChange={() => changeAuthData(Object.assign({}, { data }, { xfczStatus: !getFieldsValue().xfczStatus }))}
                  />,
                )
              }
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label={bizMap.cxczStatus} {...formItemLayout} >
              {
                getFieldDecorator('cxczStatus', {
                  initialValue: data.cxczStatus && getFieldsValue().cxStatus,
                })(
                  <Switch
                    checkedChildren={<Icon type="check" />}
                    unCheckedChildren={<Icon type="cross" />}
                    checked={(data.cxczStatus) && getFieldsValue().cxStatus}
                    disabled={!data.fCxczStatus || !getFieldsValue().cxStatus}
                    onChange={() => changeAuthData(Object.assign({}, { data }, { cxczStatus: !getFieldsValue().cxczStatus }))}
                  />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <h4 key="btn-split2" className="split">&nbsp;</h4>
        <h3 className="split">{bizMap.ysqAuth}</h3>
        <Row>
          <Col md={6}>
            <FormItem label={bizMap.ysqStatus} {...formItemLayout} >
              {
                getFieldDecorator('ysqStatus', {
                  initialValue: data.ysqStatus,
                })(
                  <Switch
                    checkedChildren={<Icon type="check" />}
                    unCheckedChildren={<Icon type="cross" />}
                    checked={(data.ysqStatus)}
                    disabled={!data.fYsqStatus}
                    onChange={() => changeAuthData(Object.assign({}, { data }, { ysqStatus: !getFieldsValue().ysqStatus }))}
                  />,
                )
              }
            </FormItem>
          </Col>
          <Col md={6}>
            <FormItem label={bizMap.ysqwcStatus} {...formItemLayout} >
              {
                getFieldDecorator('ysqwcStatus', {
                  initialValue: data.ysqwcStatus && getFieldsValue().ysqStatus,
                })(
                  <Switch
                    checkedChildren={<Icon type="check" />}
                    unCheckedChildren={<Icon type="cross" />}
                    checked={(data.ysqwcStatus) && getFieldsValue().ysqStatus}
                    disabled={!data.fYsqwcStatus || !getFieldsValue().ysqStatus}
                    onChange={() => changeAuthData(Object.assign({}, { data }, { ysqwcStatus: !getFieldsValue().ysqwcStatus }))}
                  />,
                )
              }
            </FormItem>
          </Col>
          <Col md={6}>
            <FormItem label={bizMap.ysqcxStatus} {...formItemLayout} >
              {
                getFieldDecorator('ysqcxStatus', {
                  initialValue: data.ysqcxStatus && getFieldsValue().ysqStatus,
                })(
                  <Switch
                    checkedChildren={<Icon type="check" />}
                    unCheckedChildren={<Icon type="cross" />}
                    checked={(data.ysqcxStatus) && getFieldsValue().ysqStatus}
                    disabled={!data.fYsqcxStatus || !getFieldsValue().ysqStatus}
                    onChange={() => changeAuthData(Object.assign({}, { data }, { ysqcxStatus: !getFieldsValue().ysqcxStatus }))}
                  />,
                )
              }
            </FormItem>
          </Col>
          <Col md={6}>
            <FormItem label={bizMap.ysqwccxStatus} {...formItemLayout} >
              {
                getFieldDecorator('ysqwccxStatus', {
                  initialValue: data.ysqwccxStatus && getFieldsValue().ysqStatus,
                })(
                  <Switch
                    checkedChildren={<Icon type="check" />}
                    unCheckedChildren={<Icon type="cross" />}
                    checked={(data.ysqwccxStatus) && getFieldsValue().ysqStatus}
                    disabled={!data.fYsqwccxStatus || !getFieldsValue().ysqStatus}
                    onChange={() => changeAuthData(Object.assign({}, { data }, { ysqwccxStatus: !getFieldsValue().ysqwccxStatus }))}
                  />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormItem label={bizMap.ysqczStatus} {...formItemLayout} >
              {
                getFieldDecorator('ysqczStatus', {
                  initialValue: data.ysqczStatus && getFieldsValue().ysqStatus,
                })(
                  <Switch
                    checkedChildren={<Icon type="check" />}
                    unCheckedChildren={<Icon type="cross" />}
                    checked={(data.ysqczStatus) && getFieldsValue().ysqStatus}
                    disabled={!data.fYsqczStatus || !getFieldsValue().ysqStatus}
                    onChange={() => changeAuthData(Object.assign({}, { data }, { ysqczStatus: !getFieldsValue().ysqczStatus }))}
                  />,
                )
              }
            </FormItem>
          </Col>
          <Col md={6}>
            <FormItem label={bizMap.ysqwcczStatus} {...formItemLayout} >
              {
                getFieldDecorator('ysqwcczStatus', {
                  initialValue: data.ysqwcczStatus && getFieldsValue().ysqStatus,
                })(
                  <Switch
                    checkedChildren={<Icon type="check" />}
                    unCheckedChildren={<Icon type="cross" />}
                    checked={(data.ysqwcczStatus) && getFieldsValue().ysqStatus && getFieldsValue().ysqwcStatus}
                    disabled={!data.fYsqwcczStatus || !getFieldsValue().ysqStatus || !getFieldsValue().ysqwcStatus}
                    onChange={() => changeAuthData(Object.assign({}, { data }, { ysqwcczStatus: !getFieldsValue().ysqwcczStatus }))}
                  />,
                )
              }
            </FormItem>
          </Col>
          <Col md={6}>
            <FormItem label={bizMap.ysqcxczStatus} {...formItemLayout} >
              {
                getFieldDecorator('ysqcxczStatus', {
                  initialValue: data.ysqcxczStatus && getFieldsValue().ysqStatus,
                })(
                  <Switch
                    checkedChildren={<Icon type="check" />}
                    unCheckedChildren={<Icon type="cross" />}
                    checked={(data.ysqcxczStatus) && getFieldsValue().ysqStatus && getFieldsValue().ysqcxStatus}
                    disabled={!data.fYsqcxczStatus || !getFieldsValue().ysqStatus || !getFieldsValue().ysqcxStatus}
                    onChange={() => changeAuthData(Object.assign({}, { data }, { ysqcxczStatus: !getFieldsValue().ysqcxczStatus }))}
                  />,
                )
              }
            </FormItem>
          </Col>
          <Col md={6}>
            <FormItem label={bizMap.ysqwccxczStatus} {...formItemLayout} >
              {
                getFieldDecorator('ysqwccxczStatus', {
                  initialValue: data.ysqwccxczStatus && getFieldsValue().ysqStatus,
                })(
                  <Switch
                    checkedChildren={<Icon type="check" />}
                    unCheckedChildren={<Icon type="cross" />}
                    checked={(data.ysqwccxczStatus) && getFieldsValue().ysqStatus && getFieldsValue().ysqwccxStatus}
                    disabled={!data.fYsqwccxczStatus || !getFieldsValue().ysqStatus || !getFieldsValue().ysqwccxStatus}
                    onChange={() => changeAuthData(Object.assign({}, { data }, { ysqwccxczStatus: !getFieldsValue().ysqwccxczStatus }))}
                  />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <h4 key="btn-split3" className="split">&nbsp;</h4>
      </div>
      <div>
        <Icon type="tag" />&nbsp; <span style={{ fontWeight: 'bold', fontSize: 14 }}>{tag}</span>
        <p dangerouslySetInnerHTML={{ __html: desc }} />
      </div>
    </div>
  );
}

PublicBankCardTxnAuth.propTypes = {
  data: PropTypes.object,
  changeAuthData: PropTypes.func,
  tag: PropTypes.string,
  desc: PropTypes.string,
};

PublicBankCardTxnAuth.defaultProps = {
  data: {},
  changeAuthData: noop,
  tag: '',
  desc: '',
}

export default Form.create()(PublicBankCardTxnAuth);
