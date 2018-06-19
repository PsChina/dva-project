import React, { PropTypes } from 'react';
import { Tree, Form, Button, Row, Col, Input } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const TreeNode = Tree.TreeNode;
const RoleMenuInfoForm = (props) => {
  const bizMap = i18n.bizMap('agtp/agent');
  const commonMap = i18n.commonMap();
  const { data, form, submiting, roleAssignFormSubmit, changeData } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields } = form;
  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        dat.menuIds = dat.menuIds.join();
        roleAssignFormSubmit(dat);
      }
    });
  };
  const handleReset = () => {
    resetFields();
  }
  const onCheck = (checkedKeys) => {
    data.roleCurrMenuIdList = checkedKeys;
    changeData(data);
  }
  const loop = data => data.map((menu) => {
    if (menu && menu.children) {
      return (
        <TreeNode key={menu.menuId} title={menu.menuName}>
          {loop(menu.children)}
        </TreeNode>
      );
    }
    return <TreeNode key={menu.menuId} title={menu.menuName} />;
  });
  return (
    <Form layout="horizontal" onSubmit={handleSubmit}>
      <div hidden>
        {
          getFieldDecorator('roleId', {
            initialValue: data.roleId,
          })(
            <Input />,
          )
        }
        {
          getFieldDecorator('menuIds', {
            initialValue: data.roleCurrMenuIdList,
          })(
            <Input />,
          )
        }
      </div>
      <hr />
      <h4>{bizMap.roleMenu} </h4>
      <Tree
        showLine multiple checkable
        checkedKeys={data.roleCurrMenuIdList}
        onCheck={onCheck}
      >
        {data.menuTree ? loop(data.menuTree.children) : null}
      </Tree>
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

RoleMenuInfoForm.propTypes = {
  data: PropTypes.object,
  submiting: PropTypes.bool,
  roleAssignFormSubmit: PropTypes.func,
  changeData: PropTypes.func,
};

RoleMenuInfoForm.defaultProps = {
  data: {},
  submiting: false,
  roleAssignFormSubmit: noop,
  changeData: noop,
}

export default Form.create()(RoleMenuInfoForm);
