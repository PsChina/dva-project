import React, { PropTypes } from 'react';
import { Tabs, Form, Row, Col, Button, Input } from 'antd';
import * as i18n from '../../../../utils/i18n';

const TabPane = Tabs.TabPane;

const noop = () => { };
const FormItem = Form.Item;

// 配置消息
const RuleInfoForm = (props) => {
  const bizMap = i18n.bizMap('rms/warnRule');
  const commonMap = i18n.commonMap();
  const { form, submiting, formSubmit, data, infoTmpId, infoTmpName, messageList } = props;
  const { getFieldDecorator, resetFields, validateFieldsAndScroll, getFieldsValue } = form;

  const handleSubmit = (ev) => {
    ev.preventDefault();

    validateFieldsAndScroll((errors) => {
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
  const convertTxt = (text) => {
    let desc = text;
    if (desc != null) {
      desc = desc.replace(/<br>/g, '\n');
    }
    return desc;
  }

  //   <FormItem label={bizMap.WechatId} style={{ display: 'none' }}>
  //   {
  //     getFieldDecorator('msgId', {
  //       initialValue: '',
  //     })(
  //       <Input placeholder={bizMap.WechatId} />,
  //     )
  //   }
  // </FormItem>
  return (
    <Form layout="horizontal" onSubmit={handleSubmit}>
      <FormItem label={bizMap.tmpId} style={{ display: 'none' }}>
        {
          getFieldDecorator('tmpId', {
            initialValue: infoTmpId,
          })(
            <Input />,
          )
        }
      </FormItem>
      <FormItem>
        <div><h3>{infoTmpName}</h3></div>
      </FormItem>
      <Tabs defaultActiveKey="1" >
        <TabPane tab={bizMap.smsTxt} key="1">
          <p className="br" />
          <FormItem>
            {
              getFieldDecorator('PHONE_TXT', {
                initialValue: messageList[0]=== null ?convertTxt(messageList[0].msgContent) : '',
                rules: [{
                  required: true, message: bizMap.validSmsTxt,
                }],
              })(
                <Input type="textarea" rows={4} placeholder={bizMap.smsTxt} />,
              )
            }
          </FormItem>
        </TabPane>
        <TabPane tab={bizMap.WechatTxt} key="2">
          <FormItem>
            {
              getFieldDecorator('WECHAT_TXT', {
                initialValue: messageList[0]=== null ?convertTxt(messageList[0].msgContent) : '',
                rules: [{
                  required: true, message: bizMap.validWechatTxt,
                }],
              })(
                <Input type="textarea" rows={6} placeholder={bizMap.WechatTxt} />,
              )
            }
          </FormItem>
        </TabPane>
      </Tabs>
      <h4>&nbsp;</h4>
      <Row>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Button type="primary" htmlType="submit" loading={submiting}>{commonMap.submit}</Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
        </Col>
      </Row>
    </Form>
  );
}

RuleInfoForm.propTypes = {
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
  data: PropTypes.object,
  infoTmpId: PropTypes.string,
  infoTmpName: PropTypes.string,
};

RuleInfoForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
  infoTmpId: '',
  infoTmpName: '',
}
export default Form.create()(RuleInfoForm);
