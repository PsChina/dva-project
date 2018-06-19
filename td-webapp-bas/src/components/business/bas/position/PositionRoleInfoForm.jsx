import React, { PropTypes } from 'react';
import { Transfer, Form, Button, Row, Col, Input } from 'antd';
import * as i18n from '../../../../utils/i18n';
import { callNotice } from '../../../../utils/alert';

const noop = () => { };

const PositionRoleInfoForm = (props) => {
  const bizMap = i18n.bizMap('bas/position');
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
        if (dat.rolecodes.length > 0) {
          const dat = getFieldsValue();
          dat.rolecodes = dat.rolecodes.join();
          formSubmit(dat);
        } else {
          callNotice(commonMap.warning, bizMap.addPositionRoleMsg, 'warning');
        }
      }
    });
  };
  const handleReset = () => {
    resetFields();
  }
  const handleChange = (targetKeys) => {
    data.positionHavedRoles = targetKeys;
    changeData(data);
  }
  return (
    <Form layout="horizontal" onSubmit={handleSubmit}>
      <div hidden>
        {
          getFieldDecorator('positionno', {
            initialValue: data.positionno,
          })(
            <Input />,
          )
        }
        {
          getFieldDecorator('rolecodes', {
            initialValue: data.positionHavedRoles,
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
        operations={[bizMap.addPositionRole, bizMap.deletePositionRole]}
        targetKeys={data.positionHavedRoles}
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

PositionRoleInfoForm.propTypes = {
  data: PropTypes.object,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
  changeData: PropTypes.func,
};

PositionRoleInfoForm.defaultProps = {
  data: {},
  submiting: false,
  formSubmit: noop,
  changeData: noop,
}

export default Form.create()(PositionRoleInfoForm);
