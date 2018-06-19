import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col, DatePicker, Select } from 'antd';
import qs from 'qs';
import * as i18n from '../../../../utils/i18n';
import { encode } from '../../../../utils/code';
import { getCookie } from '../../../../utils/storage';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const ScanHisOrderQueryForm = (props) => {
  const bizMap = i18n.bizMap('merp/scanOrder');
  const dataMap = i18n.bizMap('merp/omsData');
  const commonMap = i18n.commonMap();
  const { form, formSubmit } = props;
  const { getFieldDecorator, getFieldsValue, validateFields, resetFields } = form;
  const dateFormat = 'YYYYMMDD';
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const dat = getFieldsValue();
  if (dat.txnTime && dat.txnTime.length > 0) {
    dat.startTime = dat.txnTime[0].format(dateFormat);
    dat.endTime = dat.txnTime[1].format(dateFormat);
  }
  if (dat.merId === undefined) {
    dat.merId = getCookie('merId');
  }
  const param = encode(qs.stringify(dat), 'base64');
  const downloadUrl = `rest/merp/orders/scanPay/export/his?p=${param}`;
  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFields((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        if (dat.txnTime && dat.txnTime.length > 0) {
          dat.startTime = dat.txnTime[0].format(dateFormat);
          dat.endTime = dat.txnTime[1].format(dateFormat);
        }
        delete dat.txnTime;
        formSubmit(dat);
      }
    });
  };

  const handleReset = () => {
    resetFields();
  }

  return (
    <Form layout="horizontal" onSubmit={handleSubmit}>
      <Row>
        <Col xs={24} sm={12} md={8}>
          <FormItem>
            {
              getFieldDecorator('merId')(<Input placeholder={bizMap.merId} type="hidden" />)
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.merName} {...formItemLayout}>
            {
              getFieldDecorator('merName')(<Input placeholder={bizMap.merName} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.agtName} {...formItemLayout}>
            {
              getFieldDecorator('agtName')(<Input placeholder={bizMap.agtName} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.terNo} {...formItemLayout}>
            {
              getFieldDecorator('terNo')(<Input placeholder={bizMap.terNo} />)
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.txnType} {...formItemLayout}>
            {
              getFieldDecorator('txnType')(
                <Select initialValue="">
                  <Option value="">&nbsp;</Option>
                  <Option value="A">{dataMap['txnType-A']}</Option>
                  <Option value="S">{dataMap['txnType-S']}</Option>
                  <Option value="C">{dataMap['txnType-C']}</Option>
                  <Option value="R">{dataMap['txnType-R']}</Option>
                  <Option value="P">{dataMap['txnType-P']}</Option>
                  <Option value="T">{dataMap['txnType-T']}</Option>
                  <Option value="U">{dataMap['txnType-U']}</Option>
                  <Option value="M">{dataMap['txnType-M']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.chnName} {...formItemLayout}>
            {
              getFieldDecorator('chnName')(<Input placeholder={bizMap.chnName} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.txnStatus} {...formItemLayout}>
            {
              getFieldDecorator('txnStatus')(
                <Select initialValue="">
                  <Option value="">&nbsp;</Option>
                  <Option value="0">{dataMap['txnStatus-0']}</Option>
                  <Option value="S">{dataMap['txnStatus-S']}</Option>
                  <Option value="F">{dataMap['txnStatus-F']}</Option>
                  <Option value="C">{dataMap['txnStatus-C']}</Option>
                  <Option value="R">{dataMap['txnStatus-R']}</Option>
                  <Option value="T">{dataMap['txnStatus-T']}</Option>
                  <Option value="E">{dataMap['txnStatus-E']}</Option>
                  <Option value="P">{dataMap['txnStatus-P']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.txnTime} {...formItemLayout}>
            {
              getFieldDecorator('txnTime')(
                <RangePicker format={dateFormat} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col sm={24} md={12} style={{ marginBottom: 16 }}>
          <a href={downloadUrl}><Button icon="export" type="primary">{commonMap.export}</Button></a>
        </Col>
        <Col sm={24} md={12} style={{ textAlign: 'right', marginBottom: 16 }}>
          <Button type="primary" icon="search" htmlType="submit">{commonMap.search}</Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
        </Col>
      </Row>
    </Form>
  );
}

ScanHisOrderQueryForm.propTypes = {
  formSubmit: PropTypes.func,
};

ScanHisOrderQueryForm.defaultProps = {
  formSubmit: noop,
  exportClick: noop,
}

export default Form.create()(ScanHisOrderQueryForm);
