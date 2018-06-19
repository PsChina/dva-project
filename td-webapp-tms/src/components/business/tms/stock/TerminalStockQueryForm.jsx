import React, { PropTypes } from 'react';
import { Form, Input, Select, DatePicker, Button, Icon, Row, Col } from 'antd';
import * as i18n from '../../../../utils/i18n';

const dateFormat = 'YYYY-MM-DD';
const dateFormat1 = 'YYYYMMDD';
const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group;
const RangePicker = DatePicker.RangePicker;

const TerminalStockQueryForm = (props) => {
  const bizMap = i18n.bizMap('tms/terminalStock');
  const dataMap = i18n.bizMap('tms/tmsData');
  const commonMap = i18n.commonMap();
  const { form, formSubmit, deleteClick, recoveryClick, stocksOutClick } = props;
  const { getFieldDecorator, getFieldsValue, validateFields, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 17 },
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFields((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        if (dat.addDat && dat.addDat.length > 0) {
          dat.addDatStr = dat.addDat[0].format(dateFormat1);
          dat.addDatEnd = dat.addDat[1].format(dateFormat1);
          delete dat.addDat;
        }
        if (dat.outDat && dat.outDat.length > 0) {
          dat.outDatStr = dat.outDat[0].format(dateFormat1);
          dat.outDatEnd = dat.outDat[1].format(dateFormat1);
          delete dat.outDat;
        }
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
        <Col xs={24} sm={8}>
          <FormItem label={bizMap.terPhyno} {...formItemLayout}>
            {
              getFieldDecorator('terPhyno')(<Input placeholder={bizMap.terPhyno} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={8}>
          <FormItem label={bizMap.stoStatus} {...formItemLayout}>
            {
              getFieldDecorator('stoStatus')(
                <Select initialValue="">
                  <Option value="">&nbsp;</Option>
                  <Option value="0">{dataMap['stoStatus-0']}</Option>
                  <Option value="1">{dataMap['stoStatus-1']}</Option>
                  <Option value="2">{dataMap['stoStatus-2']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={8}>
          <FormItem label={bizMap.terSrc} {...formItemLayout}>
            {
              getFieldDecorator('terSrc')(
                <Select initialValue="">
                  <Option value="">&nbsp;</Option>
                  <Option value="1">{dataMap['terSrc-1']}</Option>
                  <Option value="2">{dataMap['terSrc-2']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={8}>
          <FormItem label={bizMap.addDat} {...formItemLayout} >
            {
              getFieldDecorator('addDat')(
                <RangePicker format={dateFormat} style={{ width: '100%' }} />,
              )
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={8}>
          <FormItem label={bizMap.outDat} {...formItemLayout} >
            {
              getFieldDecorator('outDat')(
                <RangePicker format={dateFormat} style={{ width: '100%' }} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col sm={24} md={12} style={{ marginBottom: 16 }}>
          <ButtonGroup>
            <Button icon="share-alt" type="primary" onClick={stocksOutClick}>{bizMap.stocksOut}</Button>
            <Button icon="cross" onClick={recoveryClick}>{bizMap.recovery}</Button>
            <Button icon="delete" onClick={deleteClick}>{commonMap.delete}</Button>
          </ButtonGroup>
        </Col>
        <Col sm={24} md={12} style={{ textAlign: 'right', marginBottom: 16 }}>
          <Button type="primary" icon="search" htmlType="submit">{commonMap.search}</Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
        </Col>
      </Row>
    </Form>
  );
}

TerminalStockQueryForm.propTypes = {
  // advExpand: PropTypes.bool,
  // collapseClick: PropTypes.func,
  formSubmit: PropTypes.func,
  stocksOutClick: PropTypes.func,
  recoveryClick: PropTypes.func,
  deleteClick: PropTypes.func,
};

TerminalStockQueryForm.defaultProps = {
  // advExpand: false,
  // collapseClick: noop,
  formSubmit: noop,
  stocksOutClick: noop,
  recoveryClick: noop,
  deleteClick: noop,
}

export default Form.create()(TerminalStockQueryForm);
