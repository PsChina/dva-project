import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, TreeSelect, Col, Select, Tree } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;
const UserQueryForm = (props) => {
  const bizMap = i18n.bizMap('bas/user');
  const commonMap = i18n.commonMap();
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const { form, formSubmit, deleteClick, enableClick, disableClick, addClick, orgTreeData } = props;
  const { getFieldDecorator, validateFields, getFieldsValue, resetFields } = form;
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
  return (
    <Form layout="horizontal" onSubmit={handleSubmit}>
      <Row>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.usrName} {...formItemLayout}>
            {
              getFieldDecorator('usrName')(<Input maxLength={60} placeholder={bizMap.usrName} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.usrRealName} {...formItemLayout}>
            {
              getFieldDecorator('usrRealName')(<Input maxLength={60} placeholder={bizMap.usrRealName} />)
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.usrStatus} {...formItemLayout}>
            {
              getFieldDecorator('usrStatus')(
                <Select placeholder={commonMap.select}>
                  <Option value="0">{commonMap['status-0']}</Option>
                  <Option value="1">{commonMap['status-1']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.orgName} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('orgId')(
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
        <Col sm={24} md={12} style={{ marginBottom: 16 }}>
          <ButtonGroup>
            <Button icon="plus" type="primary" onClick={addClick}>{commonMap.add}</Button>
            <Button style={{ marginLeft: 8 }} icon="check" onClick={enableClick}>{commonMap['status-1']}</Button>
            <Button style={{ marginLeft: 8 }} icon="minus" onClick={disableClick}>{commonMap['status-0']}</Button>
            <Button style={{ marginLeft: 8 }} icon="delete" onClick={deleteClick}>{commonMap.delete}</Button>
          </ButtonGroup>
        </Col>
        <Col sm={24} md={12} style={{ textAlign: 'right', marginBottom: 16 }}>
          <Button type="primary" icon="search" htmlType="submit">{commonMap.search}</Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
        </Col>
      </Row>
    </Form>
  );
};

UserQueryForm.propTypes = {
  formSubmit: PropTypes.func,
  addClick: PropTypes.func,
  deleteClick: PropTypes.func,
  orgTreeData: PropTypes.array,
};

UserQueryForm.defaultProps = {
  formSubmit: noop,
  addClick: noop,
  deleteClick: noop,
  orgTreeData: [],
}

export default Form.create()(UserQueryForm);
