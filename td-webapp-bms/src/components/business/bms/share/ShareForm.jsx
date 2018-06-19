import React, { PropTypes } from 'react';
import { Spin, Form, Radio, Button, Popover, Row, Col } from 'antd';
import ShareCostCommonFormItem from './ShareCostCommonFormItem';
import ShareCostUnionCardFormItem from './ShareCostUnionCardFormItem';
import ShareRangeFormItem from './ShareRangeFormItem';
import { standUnitToMinUnit } from '../../../../utils/amount';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const commonMap = i18n.commonMap();
const bizMap = i18n.bizMap('bms/share');
const datMap = i18n.bizMap('bms/business');

const BusinessFormAlipay = (props) => {
  const { form, biz, data, loading, submiting, formSubmit, formCancel } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
  };
  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        // 数据处理
        for (const key in dat) {
          // 属性值存在并且为指定属性
          if (dat[key] && (key === 'costLimit' || key.indexOf('txnRange') === 0 ||
            key.indexOf('dcardCostLimit') === 0 || key.indexOf('ccardCostLimit') === 0)) {
            dat[key] = standUnitToMinUnit(dat[key], data.ccy);
          }
        }
        formSubmit(dat);
      }
    });
  }
  const handleCancel = () => {
    resetFields();
    formCancel();
  }
  const cost = biz === 'unionCard' ? <ShareCostUnionCardFormItem data={data} form={form} /> : <ShareCostCommonFormItem data={data} form={form} />
  const type = getFieldsValue().shareType || '1';
  let content = null;
  switch (type) {
    case '1':
      content = <ShareRangeFormItem data={data} form={form} />;
      break;
    case '2':
      content = 2;
      break;
    case '3':
      content = 3;
      break;
    default: break;
  }
  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <div className="ant-modal-title" style={{ marginBottom: 16 }}>
          {`${datMap[biz] || ''}${bizMap.shareConfig}`}
        </div>
        <h4 className="split">&nbsp;</h4>
        { cost }
        <h4 className="split">&nbsp;</h4>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.shareType} {...formItemLayout}>
              {
                getFieldDecorator('shareType', {
                  initialValue: data.shareType || '1',
                })(
                  <RadioGroup>
                    <RadioButton value="1">
                      <Popover content={bizMap['formula-1']} title={bizMap.formula}>
                        {bizMap['shareType-1']}
                      </Popover>
                    </RadioButton>
                    {
                      /**
                      <RadioButton value="2">{bizMap['shareType-2']}</RadioButton>
                      <RadioButton value="3">{bizMap['shareType-3']}</RadioButton>
                       */
                    }
                  </RadioGroup>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <h4 className="split">&nbsp;</h4>
        { content }
        <h4 className="split">&nbsp;</h4>
        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit" loading={submiting}>{commonMap.submit}</Button>
            <Button style={{ marginLeft: 8 }} onClick={handleCancel}>{commonMap.cancel}</Button>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
}

BusinessFormAlipay.propTypes = {
  biz: PropTypes.string,
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
  formCancel: PropTypes.func,
};

BusinessFormAlipay.defaultProps = {
  biz: 'unionCard',
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
  formCancel: noop,
}

export default Form.create()(BusinessFormAlipay);
