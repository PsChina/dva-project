import React, { PropTypes } from 'react';
import { Spin, Form, Button, Row, Col, Checkbox } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };

const ConfigWarnGroupForm = (props) => {
  const bizMap = i18n.bizMap('rms/warnUser');
  const commonMap = i18n.commonMap();
  const { form, orgType, loading, submiting, formSubmit, headquartersGroupList, branchOfficeGroupList, agentGroupList, updateGroupList } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields } = form;

  const CheckboxGroup = Checkbox.Group;
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

  let groupTitle = '';
  let groupList = [];
  switch (orgType) {
    case '0':
      groupList = headquartersGroupList;
      groupTitle = bizMap.headquarters;
      break;
    case '1':
      groupList = branchOfficeGroupList;
      groupTitle = bizMap.branchOffice;
      break;
    case '2':
      groupList = agentGroupList;
      groupTitle = bizMap.agent;
      break;
    default:
      break;
  }
  const group = [];
  for (let i = 0; i < groupList.length; i++) {
    const item = groupList[i];
    switch (item.orgType) {
      case '0':
        group.push(item); break;
      case '1':
        group.push(item); break;
      case '2':
        group.push(item); break;
      default:
        break;
    }
  }
  const buildCheckboxGroup = (arr) => {
    const opts = [];
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      opts.push({
        label: item.groupName,
        value: item.groupId,
      });
    }
    return (
      <CheckboxGroup options={opts} />
    )
  }
// 默认配置
  const groupSelected = [];
  if (updateGroupList.length > 0) {
    for (let i = 0; i < updateGroupList.length; i++) {
      const item = updateGroupList[i];
      groupSelected.push(item.groupId)
    }
  }
  const handleReset = () => {
    resetFields();
  }

  return (
    <Spin spinning={loading}>
      <h4 style={{ marginBottom: '15px' }}>{groupTitle}</h4>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td style={{ lineHeight: '34px' }}>
                {
                    getFieldDecorator('groupIds', {
                      initialValue: groupSelected,
                    })(
                      buildCheckboxGroup(group),
                    )
                  }
              </td>
            </tr>
          </tbody>
        </table>
        <Row>
          <Col span={24} style={{ textAlign: 'center', marginTop: '20px' }}>
            <Button type="primary" htmlType="submit" loading={submiting}>{commonMap.submit}</Button>
            <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
}

ConfigWarnGroupForm.propTypes = {
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
  headquartersGroupList: PropTypes.array,
  branchOfficeGroupList: PropTypes.array,
  agentGroupList: PropTypes.array,
  orgType: PropTypes.string,
  updateGroupList: PropTypes.array,
};

ConfigWarnGroupForm.defaultProps = {
  loading: false,
  submiting: false,
  formSubmit: noop,
  data: [],
  headquartersGroupList: [],
  branchOfficeGroupList: [],
  agentGroupList: [],
  updateGroupList: [],
  orgType: '',
}

export default Form.create()(ConfigWarnGroupForm);
