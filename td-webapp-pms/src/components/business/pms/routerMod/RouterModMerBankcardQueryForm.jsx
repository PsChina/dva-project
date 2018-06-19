import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const ButtonGroup = Button.Group;

const RouterModMerBankcardQueryForm = (props) => {
  const bizMap = i18n.bizMap('pms/routerMerBankcard');
  const commonMap = i18n.commonMap();
  const { form, formSubmit, routerPayloadModInfo, routerPayloadCurrency, addClick } = props;
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

  return (
    <Form layout="horizontal" onSubmit={handleSubmit}>
      <Row>
        <div hidden="true">
          <Col xs={24} sm={12} md={12}>
            <FormItem label={bizMap.modNo} {...formItemLayout}>
              {
                getFieldDecorator('modNo', { initialValue: routerPayloadModInfo.modNo })(<Input placeholder={bizMap.modNo} />)
              }
            </FormItem>
          </Col>
          <Col xs={24} sm={12} md={12}>
            <FormItem label={bizMap.txnChannel} {...formItemLayout}>
              {
                getFieldDecorator('txnChannel', { initialValue: routerPayloadModInfo.txnChannel })(<Input placeholder={bizMap.txnChannel} />)
              }
            </FormItem>
          </Col>
          <Col xs={24} sm={12} md={12}>
            <FormItem label={bizMap.moName} {...formItemLayout}>
              {
                getFieldDecorator('modName', { initialValue: routerPayloadModInfo.modName })(<Input placeholder={bizMap.modName} />)
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

RouterModMerBankcardQueryForm.propTypes = {
  formSubmit: PropTypes.func,
  addClick: PropTypes.func,
};

RouterModMerBankcardQueryForm.defaultProps = {
  formSubmit: noop,
  addClick: noop,
}

export default Form.create()(RouterModMerBankcardQueryForm);
