import React, { PropTypes } from 'react';
import { Form, Row, Col, Switch, Icon } from 'antd';
import * as i18n from '../../../../utils/i18n';

const FormItem = Form.Item;

const PubilcScanPayTxnAuth = (props) => {
  // const dateFormat = 'YYYY-MM-DD';
  const bizMap = i18n.bizMap('merp/terminal');
  const { form, data } = props;
  const { getFieldDecorator } = form;
  const formItemLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
  };
  return (
    <div>
      <div>
        <Row>
          <Col md={6}>
            <FormItem label={bizMap.scanSm} {...formItemLayout} >
              {
                getFieldDecorator('scanSmStatus', {
                  initialValue: data.scanSmStatus,
                })(
                  <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} defaultChecked={(data.scanSmStatus)} disabled={!data.fScanSmStatus} />,
                )
              }
            </FormItem>
          </Col>
          <Col md={6}>
            <FormItem label={bizMap.scanSk} {...formItemLayout} >
              {
                getFieldDecorator('scanSkStatus', {
                  initialValue: data.scanSkStatus,
                })(
                  <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} defaultChecked={(data.scanSkStatus)} disabled={!data.fScanSkStatus} />,
                )
              }
            </FormItem>
          </Col>
          <Col md={6}>
            <FormItem label={bizMap.scanCx} {...formItemLayout} >
              {
                getFieldDecorator('scanCxStatus', {
                  initialValue: data.scanCxStatus,
                })(
                  <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} defaultChecked={(data.scanCxStatus)} disabled={!data.fScanCxStatus} />,
                )
              }
            </FormItem>
          </Col>
          <Col md={6}>
            <FormItem label={bizMap.scanTh} {...formItemLayout} >
              {
                getFieldDecorator('scanThStatus', {
                  initialValue: data.scanThStatus,
                })(
                  <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} defaultChecked={(data.scanThStatus)} disabled={!data.fScanThStatus} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
      </div>
      <div>
        <Icon type="tag" />&nbsp;{bizMap.scanBusiness}
          <p dangerouslySetInnerHTML={{ __html: bizMap.scanDesc }} />
      </div>
    </div>
  );
}

PubilcScanPayTxnAuth.propTypes = {
  data: PropTypes.object,
};

PubilcScanPayTxnAuth.defaultProps = {
  data: {},
}

export default Form.create()(PubilcScanPayTxnAuth);
