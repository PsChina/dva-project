import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col, Select, DatePicker } from 'antd';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;

const StlBusinessQueryForm = (props) => {
  const bizMap = i18n.bizMap('sms/stlBusiness');
  const commonMap = i18n.commonMap();
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const { form, advExpand, formSubmit, chnList } = props;
  const { getFieldDecorator, validateFields, getFieldsValue, resetFields, setFieldsValue } = form;

  const chnOptions = [];
  chnList.forEach((v) => {
    chnOptions.push(<Option key={v.chnId} value={v.chnId}>{v.chnName}</Option>);
  });

  //搜索
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

  //重置
  const handleReset = () => {
    resetFields();
  }

  //rangePicker
  const handleDatePicker = (value, dateString) => {
    setFieldsValue({ chkDatStr: dateString[0], chkDatEnd: dateString[1] });
  }
  return (
    <Form layout="horizontal" onSubmit={handleSubmit}>
      <div hidden="true">
        <FormItem>
          {
            getFieldDecorator('chkDatStr')(
              <Input />,
            )
          }
        </FormItem>
        <FormItem>
          {
            getFieldDecorator('chkDatEnd')(
              <Input />,
            )
          }
        </FormItem>
      </div>
      <Row>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.stlDat} {...formItemLayout}>
            {
              getFieldDecorator('chkDat')(
                <RangePicker size={'default'} onChange={handleDatePicker} />,
              )
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.pyeMemName} {...formItemLayout}>
            {
              getFieldDecorator('pyeMemName')(
                <Input maxLength="33" />,
              )
            }
          </FormItem>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.busiTyp} {...formItemLayout}>
            {
              getFieldDecorator('busiTyp')(
                <Select placeholder={commonMap.select}>
                  <Option value="0100">{commonMap.onlineinternet}</Option>
                  <Option value="0001">{commonMap.unionpaycard}</Option>
                  <Option value="0002">{commonMap.visa}</Option>
                  <Option value="0003">{commonMap.mastercard}</Option>
                  <Option value="0004">{commonMap.prepaidcard}</Option>
                  <Option value="1011">{commonMap.alipay}</Option>
                  <Option value="1012">{commonMap.wechat}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.clrTyp} {...formItemLayout}>
            {
              getFieldDecorator('clrTyp')(
                <Select placeholder={commonMap.select}>
                  <Option value="01">{commonMap.individualMem}</Option>
                  <Option value="02">{commonMap.merchantman}</Option>
                  <Option value="03">{commonMap.store}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
      </Row>

      <Row style={{ display: advExpand ? 'block' : 'none' }}>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.dealSts} {...formItemLayout}>
            {
              getFieldDecorator('prodType111')(
                <Select placeholder={commonMap.select}>
                  <Option value="00">{bizMap['dealSts-00']}</Option>
                  <Option value="01">{bizMap['dealSts-01']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col sm={24} md={24} style={{ textAlign: 'right', marginBottom: 16 }}>
          <Button type="primary" icon="search" htmlType="submit">{commonMap.search}</Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
        </Col>
      </Row>
    </Form>
  );
}

StlBusinessQueryForm.propTypes = {
  advExpand: PropTypes.bool,
  formSubmit: PropTypes.func,
};

StlBusinessQueryForm.defaultProps = {
  advExpand: false,
  formSubmit: noop,
};

export default Form.create()(StlBusinessQueryForm);
