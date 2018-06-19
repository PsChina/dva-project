import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col, Select, DatePicker } from 'antd';
import * as i18n from '../../../../../utils/i18n';
import { encode } from '../../../../../utils/code';
import qs from 'qs';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;

/**
 *  划款记录form表单
 */
const StlOrderSearchForm = (props) => {
  const bizMap = i18n.bizMap('sms/stlOrder');
  const commonMap = i18n.commonMap();
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const { form, formSubmit, exportClick, chnList, handlBatchOutAmtClick } = props;
  const { getFieldDecorator, validateFields, getFieldsValue, resetFields, setFieldsValue } = form;

  const dat = getFieldsValue();
  const param = encode(qs.stringify(dat), 'base64');
  const downloadUrl = `rest/sms/settles/stlOutWard/export?p=${param}`;


  const chnOptions = [];
  chnList.forEach((v) => {
    chnOptions.push(<Option key={v.chnId} value={v.chnId}>{v.chnName}</Option>);
  });

  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFields((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        delete dat.outDate;
        formSubmit(dat);
      }
    });
  };

  const handleReset = () => {
    resetFields();
  }

  const handleOutDatePicker = (value, dateString) => {
    setFieldsValue({ outDateStr: dateString[0], outDateEnd: dateString[1] });
  }

  return (
    <Form layout="horizontal" onSubmit={handleSubmit}>
      <div hidden="true">
        <FormItem>
          {
            getFieldDecorator('outDateStr')(
              <Input />,
            )
          }
        </FormItem>
        <FormItem>
          {
            getFieldDecorator('outDateEnd')(
              <Input />,
            )
          }
        </FormItem>
      </div>
      <Row>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.stlWay} {...formItemLayout}>
            {
              getFieldDecorator('stlWay')(
                <Select placeholder={commonMap.select}>
                  <Option value="01">{bizMap['stlWay-01']}</Option>
                  <Option value="02">{bizMap['stlWay-02']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.outSts} {...formItemLayout}>
            {
              getFieldDecorator('outSts')(
                <Select placeholder={commonMap.select}>
                  <Option value="0">{bizMap['outSts-01']}</Option>
                  <Option value="1">{bizMap['outSts-02']}</Option>
                  <Option value="2">{bizMap['outSts-03']}</Option>
                  <Option value="3">{bizMap['outSts-04']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.outDate} {...formItemLayout}>
            {
              getFieldDecorator('outDate')(
                <RangePicker onChange={handleOutDatePicker} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col sm={24} md={12} style={{ textAlign: 'left', marginBottom: 16 }}>
          {/*<Button type="primary" icon="download" onClick={exportClick}>{commonMap.export}</Button>*/}
          <a href={downloadUrl}><Button icon="export" type="primary">{commonMap.export}</Button></a>
          <Button type="primary" icon="minus-circle" style={{ marginLeft: 8 }} onClick={handlBatchOutAmtClick}>{bizMap.batchOutAmt}</Button>
        </Col>
        <Col sm={24} md={12} style={{ textAlign: 'right', marginBottom: 16 }}>
          <Button type="primary" icon="search" htmlType="submit">{commonMap.search}</Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
        </Col>
      </Row>
    </Form>
  );
}

StlOrderSearchForm.propTypes = {
  formSubmit: PropTypes.func,
  exportClick: PropTypes.func,
  handlBatchOutAmtClick: PropTypes.func,
};

StlOrderSearchForm.defaultProps = {
  formSubmit: noop,
  exportClick: noop,
  handlBatchOutAmtClick: noop,
};

export default Form.create()(StlOrderSearchForm);
