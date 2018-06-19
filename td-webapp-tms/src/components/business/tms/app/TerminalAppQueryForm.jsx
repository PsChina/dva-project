import React, { PropTypes } from 'react';
import { Form, Select, Button, Row, Col, DatePicker, Cascader, Input } from 'antd';
import * as i18n from '../../../../utils/i18n';
import cascaderAppPlatformQuery from '../../../../../config/i18n/zh-cn/tms/cascaderAppPlatformQuery.json';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group;

const TerminalAppQueryForm = (props) => {
  const bizMap = i18n.bizMap('tms/terminalApp');
  const dataMap = i18n.bizMap('tms/tmsData');
  const commonMap = i18n.commonMap();
  const { form, formSubmit, addClick, deleteClick } = props;
  const { getFieldDecorator, getFieldsValue, validateFields, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const dateFormat = 'YYYY-MM-DD';
  const dateFormat1 = 'YYYYMMDD';
  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFields((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        if (dat.appIssueDate && dat.appIssueDate.length > 0) {
          dat.appIssueDateStart = dat.appIssueDate[0].format(dateFormat1);
          dat.appIssueDateEnd = dat.appIssueDate[1].format(dateFormat1);
          delete dat.appIssueDate;
        }
        if (dat.appPlatform && dat.appPlatform.length > 0) {
          dat.appTerTyp = dat.appPlatform[1];
          dat.appPlatform = dat.appPlatform[0];
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
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.appName} {...formItemLayout}>
            {
              getFieldDecorator('appName')(<Input placeholder={bizMap.appName} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.appPlatform} {...formItemLayout}>
            {
              getFieldDecorator('appPlatform')(
                <Cascader options={cascaderAppPlatformQuery} placeholder={bizMap.appPlatform} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.appAutoUpdate} {...formItemLayout}>
            {
              getFieldDecorator('appAutoUpdate')(
                <Select initialValue="">
                  <Option value="">&nbsp;</Option>
                  <Option value="01">{dataMap['appAutoUpdate-01']}</Option>
                  <Option value="02">{dataMap['appAutoUpdate-02']}</Option>
                  <Option value="03">{dataMap['appAutoUpdate-03']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.appIssueDate} {...formItemLayout}>
            {
              getFieldDecorator('appIssueDate')(
                <DatePicker format={dateFormat} style={{ width: 200 }} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col sm={24} md={12} style={{ marginBottom: 16 }}>
          <ButtonGroup>
            <Button type="primary" icon="plus" onClick={addClick}>{commonMap.add}</Button>
            <Button icon="cross" onClick={deleteClick}>{commonMap.delete}</Button>
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

TerminalAppQueryForm.propTypes = {
  formSubmit: PropTypes.func,
  addClick: PropTypes.func,
  deleteClick: PropTypes.func,
};

TerminalAppQueryForm.defaultProps = {
  formSubmit: noop,
  addClick: noop,
  deleteClick: noop,
}

export default Form.create()(TerminalAppQueryForm);
