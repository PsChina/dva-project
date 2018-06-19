import React, { PropTypes } from 'react';
import { Spin, Form, Input, Button, Row, Col, Checkbox, Radio } from 'antd';
import * as i18n from '../../../../utils/i18n';
import styles from './GroupInfoForm.less';

const noop = () => { };
const FormItem = Form.Item;

const GroupInfoForm = (props) => {
  const bizMap = i18n.bizMap('rms/warnRule');
  const commonMap = i18n.commonMap();
  const { form, loading, ruleWarnType, submiting, grpRuleId, formSubmit, warnGrps, warnGroupList } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields } = form;
  const CheckboxGroup = Checkbox.Group;
  const RadioGroup = Radio.Group;

  const sendWayOptions = [
    { label: bizMap['warnType-1'], value: '1' },
    { label: bizMap['warnType-2'], value: '2' },
  ];
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
//根据规则对应关系查询配置好的预警组
  const group0Slected = [];
  const group1Slected = [];

  //   let reg=/,$/gi
  // str=str.replace(reg,"")
  if (warnGrps !== null) {
    const arrList = warnGrps.split(',');
    for (let j = 0; j < arrList.length; j++) {
      const warns = arrList[j].split('|');
      for (let i = 0; i < warnGroupList.length; i++) {
        if (warnGroupList[i].grpId === warns[0] && warnGroupList[i].grpOrgId.indexOf(warns[1]) !== -1 && warns[1] === '01') {
          group0Slected.push(warns[0]);
        }
        if (warnGroupList[i].grpId === warns[0] && warnGroupList[i].grpOrgId.indexOf(warns[1]) !== -1 && warns[1] === '02') {
          group1Slected.push(warns[0]);
        }
      }
    }
  }

  const buildCheckboxGroup = (arr, orgType) => {
    const opts = [];
    for (let i = 0; i < arr.length; i++) {
      const curOrg = arr[i].grpOrgId;
      if (curOrg.indexOf(orgType) !== -1) {
        opts.push({
          label: arr[i].grpName,
          value: arr[i].grpId,
        });
      }
    }
    return (
      <CheckboxGroup options={opts} />
    )
  }
  const styleMB = { marginBottom: 0 };
  const styleLine = { borderBottom: 0, borderTop: 0 };
  const handleReset = () => {
    resetFields();
  }
  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <FormItem label={bizMap.ruleId} style={{ display: 'none' }}>
          {
            getFieldDecorator('ruleId', {
              initialValue: grpRuleId,
            })(
              <Input />,
            )
          }
        </FormItem>
        <FormItem label={bizMap.warnWay}>
          {
            getFieldDecorator('ruleWarnType', {
              initialValue: ruleWarnType,
            })(
              <RadioGroup options={sendWayOptions} disabled={ruleWarnType === '2'} />,
            )
          }
        </FormItem>

        <FormItem style={styleMB} label={bizMap.groupName}>
          <table className={styles.tab}>
            <tbody>
              <tr>
                <td className={styles.label}>{bizMap['warnRange-01']}</td>
                <td>
                  {
                    getFieldDecorator('group01', {
                      initialValue: group0Slected,
                    })(
                     buildCheckboxGroup(warnGroupList, '01'),
                    )
                  }
                </td>
              </tr>
            </tbody>
          </table>
        </FormItem>
        <FormItem style={styleMB}>
          <table className={styles.tab}>
            <tbody>
              <tr>
                <td style={styleLine} className={styles.label}>{bizMap['warnRange-02']}</td>
                <td style={styleLine}>
                  {
                    getFieldDecorator('group02', {
                      initialValue: group1Slected,
                    })(
                      buildCheckboxGroup(warnGroupList, '02'),
                    )
                  }
                </td>
              </tr>
            </tbody>
          </table>
        </FormItem>
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

GroupInfoForm.propTypes = {
  grpRuleId: PropTypes.string,
  warnGroupList: PropTypes.array,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
  warnGrps: PropTypes.string,
  ruleWarnType: PropTypes.string,
};

GroupInfoForm.defaultProps = {
  warnGrps: '',
  groupList: [],
  loading: false,
  submiting: false,
  formSubmit: noop,
  warnGroupList: [],
  ruleWarnType: '',
  grpRuleId: '',
}

export default Form.create()(GroupInfoForm);
