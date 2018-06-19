import React, { PropTypes } from 'react';
import { Form, Input, Select, Button, Icon, Row, Col, DatePicker } from 'antd';
import qs from 'qs';
import { encode } from '../../../../utils/code';
import * as i18n from '../../../../utils/i18n';
import { getCookie } from '../../../../utils/storage';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group;
const RangePicker = DatePicker.RangePicker;
const BankcardHisOrderQueryForm = (props) => {
  const bizMap = i18n.bizMap('merp/bankcardOrder');
  const dataMap = i18n.bizMap('merp/omsData');
  const commonMap = i18n.commonMap();
  const { form, advExpand, collapseClick, formSubmit, handlerFrozenBtnClick, handlerUnfrozenBtnClick } = props;
  const { getFieldDecorator, getFieldsValue, validateFields, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const dateFormat = 'YYYYMMDD';
  const dat = getFieldsValue();
  if (dat.txnTime && dat.txnTime.length > 0) {
    dat.startTime = dat.txnTime[0].format(dateFormat);
    dat.endTime = dat.txnTime[1].format(dateFormat);
  }
  if (dat.merId === undefined) {
    dat.merId = getCookie('merId');
  }
  const param = encode(qs.stringify(dat), 'base64');
  const downloadUrl = `rest/merp/orders/bankCard/export/his?p=${param}`;
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
          <FormItem label={bizMap.chnName} {...formItemLayout}>
            {
              getFieldDecorator('chnName')(<Input placeholder={bizMap.chnName} />)
            }
          </FormItem>
        </Col>
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
      <Row style={{ display: advExpand ? 'block' : 'none' }}>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.braName} {...formItemLayout}>
            {
              getFieldDecorator('braName')(<Input placeholder={bizMap.braName} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.cardType} {...formItemLayout}>
            {
              getFieldDecorator('cardType')(
                <Select>
                  <Option value="">&nbsp;</Option>
                  <Option value="01">{dataMap['cardType-01']}</Option>
                  <Option value="02">{dataMap['cardType-02']}</Option>
                  <Option value="03">{dataMap['cardType-03']}</Option>
                  <Option value="04">{dataMap['cardType-04']}</Option>
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
          <FormItem label={bizMap.stlStatus} {...formItemLayout}>
            {
              getFieldDecorator('stlStatus')(
                <Select initialValue="">
                  <Option value="">&nbsp;</Option>
                  <Option value="0">{dataMap['stlStatus-0']}</Option>
                  <Option value="1">{dataMap['stlStatus-1']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.freezeStatus} {...formItemLayout}>
            {
              getFieldDecorator('freezeStatus')(
                <Select initialValue="">
                  <Option value="">&nbsp;</Option>
                  <Option value="0">{dataMap['freezeStatus-0']}</Option>
                  <Option value="1">{dataMap['freezeStatus-1']}</Option>
                  <Option value="2">{dataMap['freezeStatus-2']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col sm={24} md={12} style={{ marginBottom: 16 }}>
          <ButtonGroup>
            <a href={downloadUrl}><Button icon="export" type="primary">{commonMap.export}</Button></a>
            <Button icon="check" type="primary" onClick={handlerFrozenBtnClick}>{bizMap.frozen}</Button>
            <Button icon="minus" onClick={handlerUnfrozenBtnClick}>{bizMap.unfrozen}</Button>
          </ButtonGroup>
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

BankcardHisOrderQueryForm.propTypes = {
  advExpand: PropTypes.bool,
  collapseClick: PropTypes.func,
  formSubmit: PropTypes.func,
  handlerFrozenBtnClick: PropTypes.func,
  handlerUnfrozenBtnClick: PropTypes.func,
};

BankcardHisOrderQueryForm.defaultProps = {
  advExpand: false,
  collapseClick: noop,
  formSubmit: noop,
  handlerFrozenBtnClick: noop,
  handlerUnfrozenBtnClick: PropTypes.func,
}

export default Form.create()(BankcardHisOrderQueryForm);
