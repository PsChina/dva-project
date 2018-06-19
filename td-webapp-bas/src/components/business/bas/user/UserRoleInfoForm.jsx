import React, { PropTypes } from 'react';
import { Transfer, Form, Button, Row, Col, Input } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };

const UserRoleInfoForm = (props) => {
  const bizMap = i18n.bizMap('bas/user');
  const commonMap = i18n.commonMap();
  const { data, form, submiting, formSubmit, changeData } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields } = form;
  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        dat.roleIds = dat.roleIds.join();
        formSubmit(dat);
      }
    });
  };
  const handleReset = () => {
    resetFields();
  }
  const handleChange = (targetKeys) => {
    data.usrCurrRoleIdList = targetKeys;
    changeData(data);
  }
  return (
    <Form layout="horizontal" onSubmit={handleSubmit}>
      <div hidden>
        {
          getFieldDecorator('usrId', {
            initialValue: data.usrId,
          })(
            <Input />,
          )
        }
        {
          getFieldDecorator('roleIds', {
            initialValue: data.usrCurrRoleIdList,
          })(
            <Input />,
          )
        }
      </div>
      <Transfer
        dataSource={data.allRoleList}
        showSearch
        listStyle={{ width: 200, height: 300, marginLeft: 20 }}
        titles={[bizMap.noSelectedRole, bizMap.selectedRole]}
        operations={[bizMap.addUsrRole, bizMap.deleteUsrRole]}
        targetKeys={data.usrCurrRoleIdList}
        onChange={handleChange}
        render={item => `${item.roleName}`}
      />
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

UserRoleInfoForm.propTypes = {
  data: PropTypes.object,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
  changeData: PropTypes.func,
};

UserRoleInfoForm.defaultProps = {
  data: {},
  submiting: false,
  formSubmit: noop,
  changeData: noop,
}

export default Form.create()(UserRoleInfoForm);
