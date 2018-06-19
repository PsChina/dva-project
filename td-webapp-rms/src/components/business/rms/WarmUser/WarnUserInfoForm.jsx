import React, { PropTypes } from 'react';
import { Spin, Form, Input, Select, Button, Row, Col, Popover } from 'antd';
import * as i18n from '../../../../utils/i18n';
import { mobileValid } from '../../../../utils/vaild';
import MiniFormTitle from '../../../common/MiniFormTitle';

import UserQueryForm from './UserQueryForm';
import UserPageTable from './UserPageTable';


const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;

const WarnUserQueryForm = (props) => {
  const bizMap = i18n.bizMap('rms/warnUser');
  const commonMap = i18n.commonMap();
  const { form, data, loading, submiting, formSubmit, handleOnChange, orgDataList, agentList, org, queryUserList, popoverOncancel, miniFormVisible,ordType,
    tableList, tableTotal, tableLoading, tableCurrentPage, rowClickCallback, type, agentUserList, handleAgtChange, handleSelectChange,stateClickCallback,
    tablePageChange, toggleMerTable, } = props;
  const { getFieldDecorator, getFieldsValue, validateFields, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };
  const handleOrgOnChange = (val) => {
    handleOnChange(val);  
      stateClickCallback();
  }
  const handleAgtOnChange = (val) => {
    handleAgtChange(val);
  }
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

  const toggleMer = () => {
    toggleMerTable(getFieldsValue());
  };

  const handleReset = () => {
    resetFields();
  }


  const tableProps = {
    tableList,
    tableTotal,
    tableLoading,
    tableCurrentPage,
    rowSelection: null,
    scroll: { y: 240 },
    tablePageChange(next) {
      tablePageChange(next);
    },
    clickCallback(record) {
      rowClickCallback(record);
    },
  };

  const queryFormProps = {
    formSubmit(dat) {
      queryUserList(dat);
    },
  };

  const miniFormContent = [
    <UserQueryForm key="query" {...queryFormProps} />,
    <UserPageTable key="pageTable" {...tableProps} />,
  ];

  const miniFormTitleProps = {
    title: bizMap.staffName,
    popoverOncancel() {
      popoverOncancel();
    },
  };

  const miniFormTitle = (
    <MiniFormTitle {...miniFormTitleProps} />
  );

  const merNoAfter = (
    <Popover title={miniFormTitle} content={miniFormContent} visible={miniFormVisible} placement="bottom">
      <a onClick={toggleMer}>{commonMap.select}</a>
    </Popover>
  );
  const options = [];
  agentUserList.forEach((v) => {
    options.push(<Option key={v.agtId} value={v.agtName}>{v.agtName}</Option>);
  });

  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        {/*<Row>
          <Col span={24}>
            <FormItem disabled label={bizMap.userId} {...formItemLayout}>
              {
                getFieldDecorator('userId', {
                  initialValue: data.userId,
                  rules: [{
                    required: true, message: bizMap.validUserID,
                  }],
                })(
                  <Input readOnly={data.userId ? 'true' : false} placeholder={bizMap.userId} />,
                )
              }
            </FormItem>
          </Col>
        </Row>*/}
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.staffOrgType} {...formItemLayout} >
              {
                getFieldDecorator('staffOrgType', {
                  initialValue: data.staffOrgType || org,
                  rules: [{
                    required: true, message: bizMap.validStaffOrgType,
                  }],
                })(
                  <Select onChange={handleOrgOnChange} disabled={(ordType === '2')}>
                    <Option value="01">{bizMap['orgType-01']}</Option>
                    <Option value="02">{bizMap['orgType-02']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
        </Row>
        <Row>
          <Col span={24} style={{ display: 'none' }}>
            <FormItem label={bizMap.organization} {...formItemLayout} >
              {
                getFieldDecorator('staffId', {
                  initialValue: data.staffId,
                })(
                  <Select
                    notFoundContent={bizMap.noData}
                  >
                    <Option value="">&nbsp;</Option>
                    {
                      orgDataList.map((item, i) => {
                        return (<Option key={i} value={item.orgId}> {item.orgName} </Option>)
                      })
                    }
                  </Select>,
                )
              }
            </FormItem>
          </Col>
          <Col span={24} style={{ display: getFieldsValue().staffOrgType === '02' ? '' : 'none' }}>
            <FormItem label={bizMap.organization} {...formItemLayout} >
              {
                getFieldDecorator('staffOrgId', {
                  initialValue:  getFieldsValue().staffOrgType === '01' ? '000000001' : data.staffOrgId,
                })(
                  <Select
                    onChange={handleAgtOnChange}
                    notFoundContent={bizMap.noData}
                  >
                    <Option value="">&nbsp;</Option>
                    {
                      orgDataList.map((item, i) => {
                        return (<Option key={i} value={item.agtId}> {item.agtName} </Option>)
                      })
                    }
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.staffName} {...formItemLayout} >
              {
                getFieldDecorator('staffName', {
                  initialValue: data.staffName,
                  rules: [{
                    required: true, message: bizMap.validStaffName,
                  }],
                })(
                  <Input placeholder={bizMap.staffName} readOnly disabled={type === 'update'} addonAfter={merNoAfter} disabled={(ordType === '2')}/>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.staffPhone} {...formItemLayout} >
              {
                getFieldDecorator('staffPhone', {
                  initialValue: data.staffPhone,
                  rules: [
                    { required: true, message: bizMap.validUserMobile },
                    { validator: mobileValid },

                  ],
                })(
                  <Input placeholder={bizMap.userMobile} disabled={(data.staffPhone !== null && ordType === '1')} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.staffEmail} {...formItemLayout} >
              {
                getFieldDecorator('staffEmail', {
                  initialValue: data.staffEmail,
                  rules: [
                    { required: true, message: bizMap.validUserEmail },
                  ],
                })(
                  <Input placeholder={bizMap.staffEmail} disabled={(data.staffEmail !== null  && ordType === '1')} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.staffWechat} {...formItemLayout} >
              {
                getFieldDecorator('staffWechat', {
                  initialValue: data.staffWechat,
                  rules: [{
                    required: false, message: bizMap.validStaffWechat,
                  }],
                })(
                  <Input placeholder={bizMap.staffWechat}  />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.staffFrom} {...formItemLayout} >
              {
                getFieldDecorator('staffFrom', {
                  initialValue: getFieldsValue().staffOrgType,
                  rules: [{
                    required: true, message: bizMap.validUserSrc,
                  }],
                })(
                  <Select disabled={true}>
                    <Option value="">&nbsp;</Option>
                    <Option value="01">{bizMap['userSrc-01']}</Option>
                    <Option value="02">{bizMap['userSrc-02']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.staffFromId} {...formItemLayout} >
              {
                getFieldDecorator('staffFromId', {
                  initialValue: data.staffId,
                  rules: [{
                    required: false, message: bizMap.validUserSrcIdd,
                  }],
                })(
                  <Input placeholder={bizMap.userSrcId} disabled={true} />,
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

WarnUserQueryForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
  onChange: PropTypes.func,
  orgDataList: PropTypes.array,
  agentList: PropTypes.array,
  agentUserList: PropTypes.array,
  //orgId: PropTypes.string,
  org: PropTypes.string,
  queryUserList: PropTypes.func,
  popoverOncancel: PropTypes.func,
  miniFormVisible: PropTypes.bool,
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  toggleMerTable: PropTypes.func,
  ordType : PropTypes.string,

};

WarnUserQueryForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
  onChange: noop,
  queryUserList: noop,
  orgDataList: [],
  agentList: [],
  agentUserList: [],
  //orgId: '',
  org: '',
  popoverOncancel: noop,
  miniFormVisible: false,
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tablePageChange: noop,
  toggleMerTable: noop,
  ordType: '1',
}

export default Form.create()(WarnUserQueryForm);
