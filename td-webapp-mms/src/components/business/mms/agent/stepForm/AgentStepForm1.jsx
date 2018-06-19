import React, { PropTypes } from 'react';
import { Form, Input, Select, DatePicker, Button, Cascader, Row, Radio, Col } from 'antd';
import moment from 'moment';
import CONTINENTS from '../../../../../../config/i18n/zh-cn/continentData.json';
import CITYDATAS from '../../../../../../config/i18n/zh-cn/continentCountryProvCityData.json';
import { apIDValid, phoneValid, faxValid, codeValid, TWapIDValid, userRealNameValidate, postValid, emailValid } from '../../../../../utils/vaild';
import { getCountryOptionList, getProvOptionList, getCityOptionList } from '../../../../../utils/continentCountryProvCityUtil';
import AREACODE from '../../../../../../config/i18n/zh-cn/continentCountryAreaCode.json';
import * as i18n from '../../../../../utils/i18n';

const RangePicker = DatePicker.RangePicker;
const RadioGroup = Radio.Group;
const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;

const AgentStepForm1 = (props) => {
  const dateFormat = 'YYYYMMDD';
  const bizMap = i18n.bizMap('mms/agent');
  const validMap = i18n.bizMap('mms/agentVaild');
  const valid = i18n.bizMap('vaild');
  const commonMap = i18n.commonMap();
  const { form, style, data, submiting, nextClick, bizSaleList, validAgtName, validMobile, validEmail, agtNameChkMsg,
    agtMobileChkMsg, agtEmailChkMsg } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, setFieldsValue } = form;
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const formItemLayout2 = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };
  const agtNameValid = (rule, value, callback) => {
    const reg = /^([\u4e00-\u9fa5\·]{1,20}|[a-zA-Z\.\s]{2,20})$/; // 允许英文，中文和英文不能同时出现，1-20位
    if (!value) {
      callback();
    } else if (reg.test(value)) {
      validAgtName(value);
      if (agtNameChkMsg) {
        callback(agtNameChkMsg);
      } else {
        callback();
      }
    } else {
      callback(valid.vaildIdentifiedZhnEn);
    }
  };

  // const agtMobileValid = (rule, value, callback) => {
  //   const mobileReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0,6,7,8]{1})|(14[5,7]{1}))+\d{8})$/;
  //   if (!value) {
  //     callback();
  //   } else if (mobileReg.test(value)) {
  //     validMobile(value);
  //     if (agtMobileChkMsg) {
  //       callback(agtMobileChkMsg);
  //     } else {
  //       callback();
  //     }
  //   } else {
  //     callback(valid.vaildMobile);
  //   }
  // };

  const agtEmailValid = (rule, value, callback) => {
    const emailReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!value) {
      callback();
    } else if (emailReg.test(value)) {
      validEmail(value);
      if (agtEmailChkMsg) {
        callback(agtEmailChkMsg);
      } else {
        callback();
      }
    } else {
      callback(valid.vaildIsCorrectEmail);
    }
  };
  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (!errors) {
        const dat = getFieldsValue();
        if (dat.idDat && dat.idDat.length > 0) {
          dat.idEffDat = dat.idDat[0].format(dateFormat);
          dat.idExpDat = dat.idDat[1].format(dateFormat);
        }
        if (dat.orgDat && dat.orgDat.length > 0) {
          dat.orgEffDat = dat.orgDat[0].format(dateFormat);
          dat.orgExpDat = dat.orgDat[1].format(dateFormat);
        }
        if (dat.licDat && dat.licDat.length > 0) {
          dat.licEffDat = dat.licDat[0].format(dateFormat);
          dat.licExpDat = dat.licDat[1].format(dateFormat);
        }
        if (dat.agtInProvCityArea && dat.agtInProvCityArea.length > 0) {
          dat.agtArea = dat.agtInProvCityArea.join(',');
        }
        if (dat.agtScope === '01') {
          dat.agtProxyContinent = (dat.agtProxyContinent[0].split('|'))[0];
        } else if (dat.agtScope === '02') {
          dat.agtProxyCountry = (dat.agtProxyCountry[0].split('|'))[0];
        } else if (dat.agtScope === '03') {
          dat.agtProxyProv = (dat.agtProxyProv[0].split('|'))[0];
        } else if (dat.agtScope === '04') {
          dat.agtProxyCity = (dat.agtProxyCity[0].split('|'))[0];
        }
        console.log('sbumit', dat)
        delete dat.idDat;
        delete dat.orgDat;
        delete dat.licDat;
        delete dat.agtInProvCityArea;
        nextClick(dat);
      }
    });
  };
  const apIdValid = (rule, value, callback) => {
    if (value) {
      if (getFieldsValue().idType === '01' || getFieldsValue().idType === '02') {
        apIDValid(rule, value, callback);
      } else {
        callback();
      }
    } else {
      callback(validMap.vaildApId);
      return;
    }
    callback();
  }
  const bizSaleOnSelect = (value, option) => {
    setFieldsValue({ bizSaleName: option.props.children })
  }
  const idDatArr = [];
  if (data.idEffDat && data.idExpDat) {
    idDatArr.push(moment(data.idEffDat, dateFormat));
    idDatArr.push(moment(data.idExpDat, dateFormat));
  }
  const licDatArr = [];
  if (data.licEffDat && data.licExpDat) {
    licDatArr.push(moment(data.licEffDat, dateFormat));
    licDatArr.push(moment(data.licExpDat, dateFormat));
  }
  const orgDatArr = [];
  if (data.orgEffDat && data.orgExpDat) {
    orgDatArr.push(moment(data.orgEffDat, dateFormat));
    orgDatArr.push(moment(data.orgExpDat, dateFormat));
  }
  const prefixSelector = getFieldDecorator('agtMobileAreaCode', {
    initialValue: '886',
  })(
    <Select style={{ width: 120 }} showSearch filterOption={(input, option) => option.props.children.indexOf(input) >= 0}>
      {AREACODE.map(d => <Option key={d.area_code} title={d.area_code}>{d.value}</Option>)}
    </Select>,
  )
  return (
    <Form layout="horizontal" style={style} onSubmit={handleSubmit}>
      <Row style={{ display: 'none' }}>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.agtId} {...formItemLayout}>
            {
              getFieldDecorator('agtId', {
                initialValue: data.agtId,
              })(
                <Input placeholder={bizMap.agtId} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.agtName} {...formItemLayout2} hasFeedback>
            {
              getFieldDecorator('agtName', {
                initialValue: data.agtName,
                rules: [{ required: true, message: validMap.vaildAgtName },
                  { validator: userRealNameValidate }],
              })(
                <Input placeholder={bizMap.agtName} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormItem label={bizMap.agtType} {...formItemLayout} >
            {
              getFieldDecorator('agtType', {
                initialValue: data.agtType ? data.agtType : '0',
                rules: [{ required: true, message: validMap.vaildAgtType }],
              })(
                <RadioGroup>
                  <Radio value="0">{bizMap['agtType-0']}</Radio>
                  <Radio value="1">{bizMap['agtType-1']}</Radio>
                </RadioGroup>,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.agtInProvCityArea} {...formItemLayout2} hasFeedback>
            {
              getFieldDecorator('agtInProvCityArea', {
                initialValue: data.agtArea ? data.agtArea.split(',') : null,
                rules: [{ required: true, message: validMap.vaildAgtInProvCityArea }],
              })(
                <Cascader
                  placeholder={bizMap.agtInProvCityArea}
                  options={CITYDATAS}
                />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.agtAddr} {...formItemLayout2} hasFeedback>
            {
              getFieldDecorator('agtAddr', {
                initialValue: data.agtAddr,
                rules: [{ required: true, message: validMap.vaildAgtAddr }],
              })(
                <Input placeholder={bizMap.agtAddr} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormItem label={bizMap.agtMobile} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('agtMobile', {
                initialValue: data.agtMobile,
                rules: [{ required: true, message: validMap.vaildAgtMobile }],
              })(
                <Input addonBefore={prefixSelector} maxLength={20} style={{ width: '100%' }} placeholder={bizMap.agtMobile} />,
              )
            }
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label={bizMap.agtPost} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('agtPost', {
                initialValue: data.agtPost,
                rules: [{ required: true, message: validMap.vaildAgtPost },
                { validator: postValid }],
              })(
                <Input placeholder={bizMap.agtPost} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormItem label={bizMap.agtEmail} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('agtEmail', {
                initialValue: data.agtEmail,
                rules: [{ required: true, message: validMap.vaildAgtEmail },
                { validator: agtEmailValid }],
                validateTrigger: 'onChange',
              })(
                <Input placeholder={bizMap.agtEmail} />,
              )
            }
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label={bizMap.agtFax} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('agtFax', {
                initialValue: data.agtFax ? data.agtFax : '',
                rules: [{ required: false, message: validMap.faxValid },
                { validator: faxValid }],
              })(
                <Input placeholder={bizMap.agtFax} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormItem label={bizMap.agtContacts} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('agtContacts', {
                initialValue: data.agtContacts ? data.agtContacts : '',
                rules: [{ required: true, message: validMap.vaildAgtContact },
                { validator: userRealNameValidate }],
              })(
                <Input placeholder={bizMap.agtContacst} />,
              )
            }
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label={bizMap.agtContactPhone} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('agtContactPhone', {
                initialValue: data.agtContactPhone ? data.agtContactPhone : '',
                rules: [{ required: true, message: validMap.vaildAgtContactPhone },
                { validator: phoneValid }],
              })(
                <Input placeholder={bizMap.agtContactPhone} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <h4 key="btn-split-1" className="split">&nbsp;</h4>
      <Row>
        <Col span={12}>
          <FormItem label={bizMap.agtAp} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('agtAp', {
                initialValue: data.agtAp,
                rules: [{ required: true, message: validMap.vaildAgtAp },
                { validator: userRealNameValidate }],
              })(
                <Input placeholder={bizMap.agtAp} />,
              )
            }
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label={bizMap.idType} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('idType', {
                initialValue: data.idType,
                rules: [{ required: true, message: validMap.vaildAgtIdType }],
              })(
                <Select initialValue="">
                  <Option value="">&nbsp;</Option>
                  <Option value="03">{bizMap['certType-01']}</Option>
                  <Option value="04">{bizMap['certType-02']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormItem label={bizMap.apId} {...formItemLayout} hasFeedback required>
            {
              getFieldDecorator('apId', {
                initialValue: data.apId,
                rules: [
                  { validator: TWapIDValid },
                ],
              })(
                <Input placeholder={bizMap.apId} />,
              )
            }
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label={bizMap.idExpDat} {...formItemLayout}>
            {
              getFieldDecorator('idDat', {
                initialValue: idDatArr,
                rules: [],
                /*rules: [{ required: true, message: validMap.vaildIdDat }],*/
              })(
                <RangePicker format={dateFormat} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      {/*<h4 key="btn-split-3" className="split">&nbsp;</h4>
      <Row>
        <Col span={12}>
          <FormItem label={bizMap.bizSale} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('bizSale', {
                initialValue: data.bizSale,
              })(
                <Select onSelect={(value, option) => bizSaleOnSelect(value, option)}>
                  <Option value="">&nbsp;</Option>
                  {
                    bizSaleList.map((bizsaleOption, idx) => {
                      return <Option key={idx} value={bizsaleOption.usrId}>{bizsaleOption.usrName}</Option>;
                    })
                  }
                </Select>,
              )
            }
          </FormItem>
        </Col>
      </Row>*/}
      <div hidden >
        {
          getFieldDecorator('bizSaleName')(<Input />)
        }
      </div>
      <h4 key="btn-split-5" className="split">&nbsp;</h4>
      <Row key="btn-row">
        <Col span={24} style={{ textAlign: 'center' }}>
          <Button type="primary" htmlType="submit" loading={submiting}>{commonMap.nextStep}</Button>
        </Col>
      </Row>
    </Form>
  );
}

AgentStepForm1.propTypes = {
  style: PropTypes.object,
  data: PropTypes.object,
  submiting: PropTypes.bool,
  nextClick: PropTypes.func,
  validMobile: PropTypes.func,
  validEmail: PropTypes.func,
  validAgtName: PropTypes.func,
};

AgentStepForm1.defaultProps = {
  style: {},
  data: {},
  submiting: false,
  nextClick: noop,
  validMobile: noop,
  validEmail: noop,
  validAgtName: noop,
}

export default Form.create()(AgentStepForm1);
