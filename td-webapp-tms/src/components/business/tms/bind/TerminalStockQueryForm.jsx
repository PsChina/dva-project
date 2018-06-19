import React, { PropTypes } from 'react';
import { Form, Input, Select, DatePicker, Button, Row, Col, Popconfirm } from 'antd';
import * as i18n from '../../../../utils/i18n';

const dateFormat = 'YYYY-MM-DD';
const dateFormat1 = 'YYYYMMDD';
const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

const TerminalStockQueryForm = (props) => {
  const bizMap = i18n.bizMap('tms/terminalStock');
  const dataMap = i18n.bizMap('tms/tmsData');
  const commonMap = i18n.commonMap();
  const terminalMap = i18n.bizMap('tms/terminal');
  const agentBizMap = i18n.bizMap('tms/terminalAgent');
  const { form, formSubmit, selectRowsTermBind, allRowsTermBind } = props;
  const { getFieldDecorator, getFieldsValue, validateFields, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 17 },
  };
  const InputGroup = Input.Group;

  const formData = () => {
    const dat = getFieldsValue();
    if (dat.outDat && dat.outDat.length > 0) {
      dat.outDatStr = dat.outDat[0].format(dateFormat1);
      dat.outDatEnd = dat.outDat[1].format(dateFormat1);
      delete dat.outDat;
    }
    return dat;
  }

  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFields((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        formSubmit(formData());
      }
    });
  };

  const handleReset = () => {
    resetFields();
  }

  const handleSelectRowsTermBind = () => {
    selectRowsTermBind();
  };

  const handleAllRowsTermBind = () => {
    allRowsTermBind(formData());
  };

  return (
    <Form layout="horizontal" onSubmit={handleSubmit}>
      <Row>
        <Col md={8}>
          <FormItem label={bizMap.terPhynoRange} {...formItemLayout} >
            {
              <InputGroup compact>
                <Input {...getFieldDecorator('terPhynoStart')} style={{ width: 78 }} placeholder={bizMap.terPhyno} />
                <Input style={{ width: 24, borderLeft: 0, pointerEvents: 'none' }} placeholder="~" />
                <Input {...getFieldDecorator('terPhynoEnd')} style={{ width: 78, borderLeft: 0 }} placeholder={bizMap.terPhyno} />
              </InputGroup>
            }
          </FormItem>
        </Col>
        <Col md={8}>
          <FormItem label={bizMap.outDat} {...formItemLayout} >
            {
              getFieldDecorator('outDat')(
                <RangePicker format={dateFormat} />,
              )
            }
          </FormItem>
        </Col>
        <Col md={8}>
          <FormItem label={bizMap.terSrc} {...formItemLayout}>
            {
              getFieldDecorator('terSrc')(
                <Select initialValue="">
                  <Option value="">&nbsp; </Option>
                  <Option value="1">{dataMap['terSrc-1']}</Option>
                  <Option value="2">{dataMap['terSrc-2']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col md={12} style={{ textAlign: 'left', marginBottom: 16 }}>
          <Popconfirm title={agentBizMap.agtSureBindSelect} onConfirm={handleSelectRowsTermBind}>
            <Button type="primary">
              {terminalMap.bindSelect}
            </Button></Popconfirm>
          <Popconfirm title={agentBizMap.agtSureBindAll} onConfirm={handleAllRowsTermBind}>
            <Button style={{ marginLeft: 8 }} type="primary" onClick={handleSubmit}>
              {terminalMap.bindAll}
            </Button></Popconfirm>
        </Col>
        <Col md={12} style={{ textAlign: 'right', marginBottom: 16 }}>
          <Button type="primary" icon="search" htmlType="submit">{commonMap.search}</Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
        </Col>
      </Row>
    </Form>
  );
}

TerminalStockQueryForm.propTypes = {
  formSubmit: PropTypes.func,
  selectRowsTermBind: PropTypes.func,
  allRowsTermBind: PropTypes.func,
};

TerminalStockQueryForm.defaultProps = {
  formSubmit: noop,
  selectRowsTermBind: noop,
  allRowsTermBind: noop,
}

export default Form.create()(TerminalStockQueryForm);
