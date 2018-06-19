import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col, Spin, TimePicker, Select } from 'antd';
import moment from 'moment';
import * as i18n from '../../../../utils/i18n';
import { phoneValid, mobileValid } from '../../../../utils/vaild';

const Option = Select.Option;
const noop = () => { };
const FormItem = Form.Item;

const ChannelTransferApplyInfoForm = (props) => {
  // const dateFormat = 'YYYY-MM-DD';
  const bizMap = i18n.bizMap('pms/channelTransfer');
  const commonMap = i18n.commonMap();
  const vaildMap = i18n.bizMap('pms/channelTransferVaild')
  const { form, data, style, loading, submiting, formSubmit, handleTxnSup, optType, bankList, bankNos, bankNo, getChnInfo } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields } = form;
  const format = 'HH:mm:ss';
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const formItemLayout2 = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };
  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        if (dat.transferTimeStr) {
          dat.transferTimeStr = dat.transferTimeStr._i;
        }
        if (dat.transferTimeEnd) {
          dat.transferTimeEnd = dat.transferTimeEnd._i;
        }
        if (optType === '2') {
          dat.chnId = data.chnId;
        }
        console.log('dat =>', dat);
        if (dat.keys) {
          dat.keys = dat.keys.toString();
        }
        if (dat.areaCode) {
          dat.areaCode = dat.areaCode.toString();
        }
        formSubmit(dat);
        resetFields();
      }
    });
  };
  const options = [];
  bankList.forEach((v) => {
    options.push(<Option key={v.bankNo} value={v.bankName}>{v.bankName}</Option>);
  });

  const handleReset = () => {
    resetFields();
  }
  const getChnLinkInfo = (value) => {
    console.log('2222', value);
    if (value) {
      for (let i = 0; i < bankList.length; i++) {
        if (value === bankList[i].bankName) {
          getChnInfo(bankList[i]);
        }
      }
    }
  };

  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" style={style} onSubmit={handleSubmit}>
        <div hidden="true">
          <FormItem label={bizMap.chnId} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('chnId', {
                initialValue: data.chnId,
              })(
                <Input placeholder={bizMap.chnId} disabled />,
              )
            }
          </FormItem>
        </div>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.chnType} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('chnType', {
                  initialValue: data.chnType,
                  rules: [{ required: true, message: vaildMap.validChnType }],
                })(
                  <Select placeholder={commonMap.select} disabled={optType === '2'}>
                    <Option value="0">{bizMap['chnType-0']}</Option>
                    <Option value="1">{bizMap['chnType-1']}</Option>
                    <Option value="2">{bizMap['chnType-2']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
          <Col span={12} style={{ display: getFieldsValue().chnType === '1' ? '' : 'none' }}>
            <FormItem label={bizMap.bankRelNo} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('bankRelNo', {
                  initialValue: bankNo === '' ? data.bankRelNo : bankNo,
                })(
                  <Input placeholder={vaildMap.validBankRelNo} disabled={optType === '2'} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12} style={{ display: getFieldsValue().chnType === '2' ? '' : 'none' }}>
            <FormItem label={bizMap.chnCertNo} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('chnCertNo', {
                  initialValue: data.chnCertNo,
                })(
                  <Input placeholder={vaildMap.validChnCertNo} disabled={optType === '2'} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ display: getFieldsValue().chnType === '1' ? 'none' : '' }}>
            <FormItem label={bizMap.chnName} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('chnName', {
                  initialValue: data.chnName,
                  rules: [{ required: true, message: vaildMap.vaildChnName }],
                })(
                  <Input placeholder={bizMap.chnName} disabled={optType === '2'} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12} style={{ display: getFieldsValue().chnType === '1' ? '' : 'none' }}>
            <FormItem label={bizMap.chnName} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('chnName', {
                  initialValue: data.chnName,
                  rules: [{ required: true, message: vaildMap.vaildChnName }],
                })(
                  <Select disabled={optType === '2'} onChange={getChnLinkInfo} showSearch >
                    {options}
                  </Select>,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.chnAlias} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('chnAlias', {
                  initialValue: data.chnAlias,
                  rules: [{ required: true, message: vaildMap.vaildChnAlias }],
                })(
                  <Input placeholder={bizMap.chnAlias} disabled={optType === '2'} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        {optType === '2' ? null :
          <Row>
            <Col span={12}>
              <FormItem label={bizMap.bankTxnSup} {...formItemLayout} hasFeedback>
                <div hidden="true">
                  {
                    getFieldDecorator('bankNos', {
                      initialValue: bankNos,
                    })(
                      <Input />,
                    )
                  }
                </div>
                <a onClick={() => { handleTxnSup(); }}>{bizMap.bankTxnSup}</a>
              </FormItem>
            </Col>
          </Row>
        }
        {/*<Row>
         <Transfer
        dataSource={data.bankName}
        showSearch
        listStyle={{ width: 200, height: 300, marginLeft: 20 }}
        titles={[bizMap.noSelectedRole, bizMap.selectedRole]}
        operations={[bizMap.addUsrRole, bizMap.deleteUsrRole]}
        targetKeys={data.usrCurrRoleIdList}
        onChange={handleChange}
        render={item => `${item.bankName}`}
      />
        </Row>*/}
        <Row>
          <Col span={24}>
            <Col sm={14} md={8}>
              <FormItem labelCol={{ span: 12 }} wrapperCol={{ span: 12 }} label={bizMap.transferTime}>
                {
                  getFieldDecorator('transferTimeStr', {
                    initialValue: moment(data.transferTimeStr ? data.transferTimeStr : '06:00:00', format),
                    rules: [{ required: true, message: vaildMap.validTransferTimeStr }],
                    trigger: 'onBlur',
                    validateFirst: true,
                  })(
                    <TimePicker
                      format={format}
                    />,
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem {...formItemLayout} hasFeedback>
                {
                  getFieldDecorator('transferTimeEnd', {
                    initialValue: moment(data.transferTimeEnd ? data.transferTimeEnd : '23:00:00', format),
                    rules: [{ required: true, message: vaildMap.validTransferTimeEnd }],
                    trigger: 'onBlur',
                    validateFirst: true,
                  })(
                    <TimePicker
                      format={format}
                    />,
                  )
                }
              </FormItem>
            </Col>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.needCheck} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('needCheck', {
                  initialValue: data.needCheck ? data.needCheck : '0',
                  rules: [{ required: true, message: vaildMap.vaildNeeCheck }],
                })(
                  <Select>
                    <Option value="0">{commonMap['check-0']}</Option>
                    <Option value="1">{commonMap['check-1']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <h4 className="split">&nbsp;</h4>

        <Row>
          <Col span={12}>
            <FormItem label={bizMap.chnConter} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('chnConter', {
                  initialValue: data.chnConter,
                  rules: [{ required: true, message: vaildMap.vaildChnConterName }],
                })(
                  <Input placeholder={bizMap.chnConter} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.chnMobile} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('chnMobile', {
                  initialValue: data.chnMobile,
                  rules: [{ required: true, message: vaildMap.vaildChnMobile }, { validator: mobileValid }],
                })(
                  <Input placeholder={bizMap.chnMobile} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.chnPhone} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('chnPhone', {
                  initialValue: data.chnPhone,
                  rules: [{ validator: phoneValid }],
                })(
                  <Input placeholder={bizMap.chnPhone} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.chnAddr} {...formItemLayout2} hasFeedback>
              {
                getFieldDecorator('chnAddr', {
                  initialValue: data.chnAddr,
                })(
                  <Input type="textarea" rows="3" placeholder={bizMap.chnAddr} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <h4 key="btn-split" className="split">&nbsp;</h4>
        <Row key="btn-row">
          <Col span={24} style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit" loading={submiting}>{commonMap.submit}</Button>
            <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
}

ChannelTransferApplyInfoForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
  handleTxnSup: PropTypes.func,
  bankTxnSup: PropTypes.string,
  optType: PropTypes.string,
  bankList: PropTypes.array,
  bankNos: PropTypes.string,
  bankNo: PropTypes.string,
  getChnInfo: PropTypes.func,
};

ChannelTransferApplyInfoForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
  handleTxnSup: noop,
  bankTxnSup: '',
  optType: '1', // 1,添加 2,修改
  bankList: [],
  bankNos: '',
  bankNo: '',  //扫码方式
  getChnInfo: noop,
}

export default Form.create()(ChannelTransferApplyInfoForm);
