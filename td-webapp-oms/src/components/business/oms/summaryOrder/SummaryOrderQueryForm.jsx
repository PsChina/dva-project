import React, { PropTypes } from 'react';
import { Form, Input, Select, Button, Icon, Row, Col } from 'antd';
import qs from 'qs';
import { encode } from '../../../../utils/code';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;

const SummaryOrderQueryForm = (props) => {
  const bizMap = i18n.bizMap('oms/summaryOrder');
  const dataMap = i18n.bizMap('oms/omsData');
  const commonMap = i18n.commonMap();
  const { form, advExpand, collapseClick, formSubmit } = props;
  const { getFieldDecorator, getFieldsValue, validateFields, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const dat = getFieldsValue();
  const param = encode(qs.stringify(dat), 'base64');
  const downloadUrl = `rest/oms/order/summaryOrder/export/today?p=${param}`;

  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFields((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        formSubmit(getFieldsValue());
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
      <Row style={{ display: advExpand ? 'block' : 'none' }}>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.braName} {...formItemLayout}>
            {
              getFieldDecorator('braName')(<Input placeholder={bizMap.braName} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.payType} {...formItemLayout}>
            {
              getFieldDecorator('payType')(
                <Select initialValue="">
                  <Option value="">&nbsp;</Option>
                  <Option value="00">{dataMap['payType-00']}</Option>
                  <Option value="01">{dataMap['payType-01']}</Option>
                </Select>,
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
          <a style={{ marginRight: 8, fontSize: 12 }} onClick={collapseClick}>
            {commonMap.advSearch} <Icon type={advExpand ? 'up' : 'down'} />
          </a>
          <Button type="primary" icon="search" htmlType="submit">{commonMap.search}</Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
        </Col>
      </Row>
    </Form>
  );
}

SummaryOrderQueryForm.propTypes = {
  advExpand: PropTypes.bool,
  collapseClick: PropTypes.func,
  formSubmit: PropTypes.func,
};

SummaryOrderQueryForm.defaultProps = {
  advExpand: false,
  collapseClick: noop,
  formSubmit: noop,
  exportClick: noop,
}

export default Form.create()(SummaryOrderQueryForm);
