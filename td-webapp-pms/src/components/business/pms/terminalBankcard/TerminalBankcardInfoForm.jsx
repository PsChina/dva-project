import React, { PropTypes } from 'react';
import { Spin, Form, Row, Col, Input, Button, Select, Icon } from 'antd';
import * as i18n from '../../../../utils/i18n';
import { numValid } from '../../../../utils/vaild';

const FormItem = Form.Item;
const Option = Select.Option;

const noop = () => {};

const TerminalBankcardInfoForm = (props) => {
  const bizMap = i18n.bizMap('pms/terminalBankcard');
  const validMap = i18n.bizMap('pms/terminalBankcardValid');
  const commonMap = i18n.commonMap();
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const {
    form,
    chnList,
    uuid,
    changeUuid,
    formSubmit,
    data,
    style,
    submiting,
    keys,
    aaa,
    chnMerNoList,
    queryChnMerInf,
  } = props;

  const {
    validateFieldsAndScroll,
    getFieldsValue,
    resetFields,
    getFieldDecorator,
  } = form;

  const options = [];
  chnList.forEach((v) => {
    options.push(<Option key={v.chnId} value={v.chnId}>{v.chnName}</Option>);
  });

  getFieldDecorator('keys', {
    initialValue: keys,
  })

  const chnMerNoOptions = [];
  chnMerNoList.forEach((v) => {
    chnMerNoOptions.push(<Option key={v.chnMerNo} value={v.chnMerNo}>{v.chnMerNo}</Option>);
  });


  const queryChnMerNo = (value) => {
    queryChnMerInf(value);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        dat.keys = dat.keys.toString();
        formSubmit(dat);
        resetFields();
      }
    });
  };

  const handleReset = () => {
    resetFields();
  };

  // 弹出终端号组件
  const handleClick = () => {
    const formData = getFieldsValue();
    changeUuid(uuid, keys, 'add', formData);
  };

  // 删除
  const remove = (k) => {
    const formData = getFieldsValue();
    // can use data-binding to get
    const keyArr = keys.filter((key) => {
      return key !== k;
    });
    // can use data-binding to set
    changeUuid(uuid, keyArr, 'del', formData);
  }

  const formItems = keys.map((k) => {
    return (
      <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label={`${bizMap.terNo}${k}`} key={k}>
        {
          getFieldDecorator(`name${k}`, {
            initialValue: data[`name${k}`] || '',
            rules: [
              { required: true, message: validMap.validChnTermNo }, { validator: numValid }],
            trigger: 'onBlur',
            validateFirst: true,
          })(
            <Input maxLength="8" style={{ width: '90%', marginRight: 8 }} placeholder={validMap.validTerNo} />,
          )
        }
        <a onClick={() => remove(k)}><Icon type="cross" /></a>,
      </FormItem>
    );
  });

  const advTermVDom = [
    <Row key="t1">
      <Col span={18}>
        <FormItem {...formItemLayout} hasFeedback>
          <Col span={12} />
          <a type="primary" onClick={handleClick}>{bizMap.addTerm}</a>
        </FormItem>
      </Col>
    </Row>,
    <Row key="t2">
      <Col span={18}>
        {formItems}
      </Col>
    </Row>,
  ];

  return (
    <Spin spinning={false}>
      <Form layout="horizontal" style={style} onSubmit={handleSubmit}>
        <Row>
          <Col span={18}>
            <FormItem label={bizMap.chnName} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('chnId', {
                  initialValue: data.chnId,
                  rules: [{ required: true, message: validMap.validChnId }],
                  // trigger: 'onBlur',
                  validateFirst: true,
                })(
                <Select placeholder={commonMap.select} onChange={queryChnMerNo}> 
                {options}
                </Select>,
                )
              }
            </FormItem>
            
          </Col>
        </Row>
        <Row>
          <Col span={18}>
            <FormItem label={bizMap.chnMerNo} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('chnMerNo', {
                  initialValue: data.chnMerNo,
                  rules: [{ required: true, message: validMap.validSelectChnMerNo }],
                  // trigger: 'onBlur',
                  validateFirst: true,
                })(
                  <Select placeholder={commonMap.select}>
                    {chnMerNoOptions}
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        {advTermVDom}
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
};

TerminalBankcardInfoForm.propTypes = {
  data: PropTypes.object,
  submiting: PropTypes.bool,
  style: PropTypes.object,
  chnList: PropTypes.array,
  uuid: PropTypes.number,
  formSubmit: PropTypes.func,
  keys: PropTypes.array,
};

TerminalBankcardInfoForm.defaultProps = {
  data: {},
  submiting: false,
  style: {},
  chnList: [],
  uuid: 0,
  formSubmit: noop,
  keys: [],
};

export default Form.create()(TerminalBankcardInfoForm);
