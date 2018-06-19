import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const ButtonGroup = Button.Group;

const RouterMerBankcardQueryForm = (props) => {
  const bizMap = i18n.bizMap('pms/routerMerBankcard');
  const modBizMap = i18n.bizMap('pms/routerMod');
  const commonMap = i18n.commonMap();
  const { form, formSubmit, routerPayloadMerInfo, addClick, ApplyModClick, routerPayloadCurrency } = props;
  const { getFieldDecorator, getFieldsValue, validateFields, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
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

  const handleAddClick = () => {
    addClick(getFieldsValue());
  }

  const handleImportModClick = () => {
    ApplyModClick(getFieldsValue());
  }

  return (
    <Form layout="horizontal" onSubmit={handleSubmit}>
      <Row>
        <div hidden="true">
          <Col xs={24} sm={12} md={12}>
            <FormItem label={bizMap.merId} {...formItemLayout}>
              {
                getFieldDecorator('merId', { initialValue: routerPayloadMerInfo.merId })(<Input placeholder={bizMap.routerPayloadMerInfo} />)
              }
            </FormItem>
          </Col>
          <Col xs={24} sm={12} md={12}>
            <FormItem label={bizMap.currency} {...formItemLayout}>
              {
                getFieldDecorator('currency', { initialValue: routerPayloadCurrency.currency })(<Input placeholder={bizMap.currency} />)
              }
            </FormItem>
          </Col>
        </div>
        <Col xs={24} sm={12} md={12}>
          <FormItem label={bizMap.chnName} {...formItemLayout}>
            {
              getFieldDecorator('chnName')(<Input placeholder={bizMap.chnName} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={12}>
          <FormItem label={bizMap.chnMerNo} {...formItemLayout}>
            {
              getFieldDecorator('chnMerNo')(<Input placeholder={bizMap.chnMerNo} />)
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={12} md={12}>
          <FormItem label={bizMap.chnMerName} {...formItemLayout}>
            {
              getFieldDecorator('chnMerName')(<Input placeholder={bizMap.chnMerName} />)
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col sm={24} md={12} style={{ marginBottom: 16 }}>
          <ButtonGroup>
            <Button icon="plus" type="primary" onClick={handleAddClick}>{commonMap.add}</Button>
            <Button style={{ marginLeft: 8 }} icon="plus" onClick={handleImportModClick}>{modBizMap.applyMod}</Button>
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

RouterMerBankcardQueryForm.propTypes = {
  formSubmit: PropTypes.func,
  addClick: PropTypes.func,
};

RouterMerBankcardQueryForm.defaultProps = {
  formSubmit: noop,
  addClick: noop,
}

export default Form.create()(RouterMerBankcardQueryForm);
