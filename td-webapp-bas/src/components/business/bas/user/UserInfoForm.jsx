import React, { PropTypes } from 'react';
import { Spin, Form, Input, Tree, TreeSelect, Button, Row, Col, Select } from 'antd';
import * as i18n from '../../../../utils/i18n';
import AREACODE from '../../../../../config/i18n/zh-cn/continentCountryAreaCode.json';
import { userRealNameValidate, emailValid } from '../../../../utils/vaild';

const noop = () => { };
const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;
const Option = Select.Option;
const UserInfoForm = (props) => {
  const bizMap = i18n.bizMap('bas/user');
  const commonMap = i18n.commonMap();
  const { form, data, loading, submiting, formSubmit, type, orgTreeData } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

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
  const loopTreeSelect = dat => dat.map((item) => {
    if (item.children && item.isUse === '1') {
      return (
        <TreeNode value={item.orgId} key={item.orgId} title={item.orgName} >
          {loopTreeSelect(item.children)}
        </TreeNode>
      );
    }
    if (item.isUse === '1') {
      return (<TreeNode value={item.orgId} key={item.orgId} title={item.orgName} />);
    } else {
      return (<TreeNode value={item.orgId} key={item.orgId} title={item.orgName} className="td-displayNone" disabled />);
    }
  });
  const prefixSelector = getFieldDecorator('usrMobileAreaCode', {
    initialValue: data.usrMobileAreaCode ? data.usrMobileAreaCode : '886',
  })(
    <Select style={{ width: 120 }} showSearch filterOption={(input, option) => option.props.children.indexOf(input) >= 0}>
      {AREACODE.map(d => <Option key={d.area_code} title={d.area_code}>{d.value}</Option>)}
    </Select>,
  );
  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <Row style={{ display: 'none' }}>
          <Col span={24}>
            <FormItem label={bizMap.usrId} {...formItemLayout}>
              {
                getFieldDecorator('usrId', {
                  initialValue: data.usrId,
                })(
                  <Input />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.usrName} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('usrName', {
                  initialValue: data.usrName,
                  rules: [{
                    required: true, message: bizMap.validUsrName,
                  }],
                })(
                  <Input maxLength={60} placeholder={bizMap.usrName} disabled={type === 'update'} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.usrRealName} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('usrRealName', {
                  initialValue: data.usrRealName,
                  rules: [{
                    required: true, message: bizMap.validUsrRealName,
                  }, { validator: userRealNameValidate }],
                  validateTrigger: 'onBlur',
                })(
                  <Input maxLength={60} placeholder={bizMap.usrRealName} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.orgName} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('orgId', {
                  initialValue: data.orgId,
                  rules: [{
                    required: true, message: bizMap.validOrgName,
                  }],
                })(
                  <TreeSelect
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    treeDefaultExpandAll
                  >
                    {loopTreeSelect(orgTreeData)}
                  </TreeSelect>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.usrEmail} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('usrEmail', {
                  initialValue: data.usrEmail,
                  rules: [{
                    required: true, message: bizMap.validusrEmail,
                  }, { validator: emailValid }],
                  validateTrigger: 'onBlur',
                })(
                  <Input maxLength={60} placeholder={bizMap.usrEmail} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.usrMobile} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('usrMobile', {
                  initialValue: data.usrMobile,
                  rules: [{
                    required: true, message: bizMap.validUsrMobile,
                  }],
                  validateTrigger: 'onBlur',
                })(
                  <Input addonBefore={prefixSelector} maxLength={20} placeholder={bizMap.usrMobile} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.usrDesc} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('usrDesc', {
                  initialValue: data.usrDesc,
                })(
                  <Input maxLength={100} type="textarea" rows={4} placeholder={bizMap.usrDesc} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <h4>&nbsp;</h4>
        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit" loading={submiting}>{commonMap.submit}</Button>
            <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
}

UserInfoForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
  orgTreeData: PropTypes.array,
};

UserInfoForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
  orgTreeData: [],
}

export default Form.create()(UserInfoForm);
