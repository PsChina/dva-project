import React, { PropTypes } from 'react';
import { Spin, Form, Input, Select, DatePicker, TimePicker, Cascader, InputNumber, Button, Row, Col } from 'antd';
import moment from 'moment';
import { apIdValid, limitNameSpaceValid, postValid, faxValid, phoneValid, mobileValid, emailValid, codeValid, TWapIDValid, taxNoValid, bizLicValid, passportValid } from '../../../../../utils/vaild';
import * as i18n from '../../../../../utils/i18n';
import AREACODE from '../../../../../../config/i18n/zh-cn/continentCountryAreaCode.json';
import CITYDATAS from '../../../../../../config/i18n/zh-cn/continentCountryProvCityData.json';

const noop = () => { };
const FormItem = Form.Item;
const {TextArea} = Input;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const MerchantBaseInfoForm = (props) => {
  const dateFormat = 'YYYYMMDD';
  const timeFormat = 'HH:mm';
  const bizMap = i18n.bizMap('agtp/merchant');
  const vaildMap = i18n.bizMap('agtp/merchantVaild');
  const commonMap = i18n.commonMap();
  const { form, data, loading, submiting, formBaseSubmit, bizSaleList, industryList } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
  };
  const formItemLayout2 = {
    labelCol: { span: 4 },
    wrapperCol: { span: 19 },
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        if (dat.openingTime) {
          dat.openingTime = dat.openingTime._i;
        }
        if (dat.closingTime) {
          dat.closingTime = dat.closingTime._i;
        }
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
        if (dat.certDat && dat.certDat.length > 0) {
          dat.certEffDat = dat.certDat[0].format(dateFormat);
          dat.certExpDat = dat.certDat[1].format(dateFormat);
        }
        if (dat.lawDat && dat.lawDat.length > 0) {
          dat.lawEffDat = dat.lawDat[0].format(dateFormat);
          dat.lawExpDat = dat.lawDat[1].format(dateFormat);
        }
        if (dat.merAddress && dat.merAddress.length > 0) {
          dat.merArea = dat.merAddress.join(',');
        }
        delete dat.merAddress;
        delete dat.idDat;
        delete dat.orgDat;
        delete dat.licDat;
        delete dat.certDat;
        delete dat.lawDat;
        formBaseSubmit(dat);
      }
    });
  };
  const idDatArr = [];
  if (data.idEffDat && data.idExpDat) {
    idDatArr.push(moment(data.idEffDat, dateFormat));
    idDatArr.push(moment(data.idExpDat, dateFormat));
  }
  const handlerTimePickerStartChange = (value, dateString) => {
    setFieldsValue({openingTime: dateString});
  };
  const handlerTimePickerEndChange = (value, dateString) => {
    setFieldsValue({closingTime: dateString});
  };
  const handleReset = () => {
    resetFields();
  };
  const merPrefixSelector = getFieldDecorator('merMobileAreaCode', {
    initialValue: '886',
  })(
    <Select style={{width: 120}} showSearch filterOption={(input, option) => option.props.children.indexOf(input) >= 0}>
      {AREACODE.map(d => <Option key={d.area_code} title={d.area_code}>{d.value}</Option>)}
    </Select>,
  );
  const merPrefixSelector2 = getFieldDecorator('merSupervisorMobileAreaCode', {
    initialValue: '886',
  })(
    <Select style={{width: 120}} showSearch filterOption={(input, option) => option.props.children.indexOf(input) >= 0}>
      {AREACODE.map(d => <Option key={d.area_code} title={d.area_code}>{d.value}</Option>)}
    </Select>,
  );
  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <Row style={{ display: 'none' }}>
          <Col span={24}>
            <FormItem label={bizMap.merId} {...formItemLayout}>
              {
                getFieldDecorator('merId', {
                  initialValue: data.merId || '',
                })(
                  <Input placeholder={bizMap.merId} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.merName} {...formItemLayout2} hasFeedback>
              {
                getFieldDecorator('merName', {
                  initialValue: data.merName,
                  rules: [{required: true, message: vaildMap.vaildMerName}],
                })(
                  <Input placeholder={bizMap.merName}/>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.merchantDesc} {...formItemLayout2} hasFeedback>
              {
                getFieldDecorator('merchantDesc', {
                  initialValue: data.merchantDesc,
                  rules: [{required: true, message: vaildMap.vaildMerDesc}],
                })(
                  <TextArea height={20} maxLength={200} placeholder={bizMap.merchantDesc}
                            autosize={{minRows: 2, maxRows: 6}}/>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.merFax} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('merFax', {
                  initialValue: data.merFax,
                  rules: [{validator: faxValid}],
                })(
                  <Input maxLength={20} placeholder={bizMap.merFax}/>,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.merAddress} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('merAddress', {
                  initialValue: data.merArea ? data.merArea.split(',') : null,
                  rules: [{required: true, type: 'array', message: vaildMap.vaildAddress}],
                })(
                  <Cascader
                    placeholder={bizMap.merAddress}
                    options={CITYDATAS}
                  />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.merAddr} {...formItemLayout2} hasFeedback>
              {
                getFieldDecorator('merAddr', {
                  initialValue: data.merAddr,
                  rules: [{required: true, message: vaildMap.vaildAddr}, {validator: limitNameSpaceValid}],
                })(
                  <Input maxLength={200} placeholder={bizMap.merAddr}/>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.merRegAddress} {...formItemLayout2} hasFeedback>
              {
                getFieldDecorator('merRegAddress', {
                  initialValue: data.merRegAddress,
                  rules: [{required: true, message: vaildMap.vaildMerRegAddress}, {validator: limitNameSpaceValid}],
                })(
                  <Input maxLength={200} placeholder={bizMap.merRegAddress}/>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Col sm={14} md={8}>
              <FormItem labelCol={{span: 12}} wrapperCol={{span: 12}} label={bizMap.licTime}>
                {
                  getFieldDecorator('openingTime', {
                    initialValue: moment(data.openingTime ? data.openingTime : '06:00', timeFormat),
                    rules: [{required: true, message: vaildMap.vaildOpeningTime}],
                  })(
                    <TimePicker minuteStep={15} onChange={handlerTimePickerStartChange} format={timeFormat}/>,
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem {...formItemLayout} hasFeedback>
                {
                  getFieldDecorator('closingTime', {
                    initialValue: moment(data.closingTime ? data.closingTime : '23:00', timeFormat),
                    rules: [{required: true, message: vaildMap.vaildClosingTime}],
                  })(
                    <TimePicker minuteStep={15} onChange={handlerTimePickerEndChange} format={timeFormat}/>,
                  )
                }
              </FormItem>
            </Col>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.merContName} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('merContName', {
                  initialValue: data.merContName,
                  rules: [{required: true, message: vaildMap.vaildMerContName}, {validator: limitNameSpaceValid}],
                })(
                  <Input maxLength={50} placeholder={bizMap.merContName}/>,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.merContPhone} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('merContPhone', {
                  initialValue: data.merContPhone,
                  rules: [{required: true, message: vaildMap.vaildMerContPhone}, {validator: phoneValid}],
                })(
                  <Input maxLength={20} placeholder={bizMap.merContPhone}/>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.merContMobile} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('merContMobile', {
                  initialValue: data.merContMobile,
                  rules: [{required: true, message: vaildMap.vaildMerContMobile}, {validator: mobileValid}],
                })(
                  <Input addonBefore={merPrefixSelector} maxLength={11} placeholder={bizMap.merContMobile}/>,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.merContEmail} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('merContEmail', {
                  initialValue: data.merContEmail,
                  rules: [{required: true, message: vaildMap.vaildMerContEmail},
                    {validator: emailValid}],
                })(
                  <Input maxLength={50} placeholder={bizMap.merContEmail}/>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.merSupervisorName} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('merSupervisorName', {
                  initialValue: data.merSupervisorName,
                  rules: [{required: true, message: vaildMap.vaildMerSupervisorName}],
                })(
                  <Input maxLength={100} placeholder={bizMap.merSupervisorName}/>,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.merSupervisorNameE} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('merSupervisorNameE', {
                  initialValue: data.merSupervisorNameE,
                  rules: [],
                })(
                  <Input maxLength={100} placeholder={bizMap.merSupervisorNameE}/>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.merSupervisorPhone} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('merSupervisorPhone', {
                  initialValue: data.merSupervisorPhone,
                  rules: [{required: true, message: vaildMap.merSupervisorPhone}, {validator: phoneValid}],
                })(
                  <Input maxLength={20} placeholder={bizMap.merSupervisorPhone}/>,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.merSupervisorMobile} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('merSupervisorMobile', {
                  initialValue: data.merSupervisorMobile,
                  rules: [{required: true, message: vaildMap.vaildMerSupervisorMobile}, {validator: mobileValid}],
                })(
                  <Input addonBefore={merPrefixSelector2} maxLength={11} placeholder={bizMap.merSupervisorMobile}/>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.merSupervisorEmail} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('merSupervisorEmail', {
                  initialValue: data.merSupervisorEmail,
                  rules: [{required: true, message: vaildMap.vaildMerSupervisorEmail},
                    {validator: emailValid}],
                })(
                  <Input maxLength={50} placeholder={bizMap.merSupervisorEmail}/>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <h4 key="btn-split1" className="split">&nbsp;</h4>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.merAp} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('merAp', {
                  initialValue: data.merAp || '',
                  rules: [{ required: true, message: vaildMap.vaildApName }],
                })(
                  <Input placeholder={bizMap.merAp} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.idType} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('idType', {
                  initialValue: data.idType,
                  rules: [{required: true, message: vaildMap.vaildIdType}],
                })(
                  <Select>
                    <Option value="">&nbsp;</Option>
                    <Option value="03">{bizMap['idType-01']}</Option>
                    <Option value="04">{bizMap['idType-02']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.apId} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('apId', {
                  initialValue: data.apId,
                  rules: [
                    {required: true, message: vaildMap.vaildApId},
                    {validator: TWapIDValid},
                  ],
                })(
                  <Input maxLength={64} placeholder={bizMap.apId}/>,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.idValidDat} {...formItemLayout} >
              {
                getFieldDecorator('idDat', {
                  initialValue: idDatArr,
                  rules: [{required: true, message: vaildMap.vaildIdDat}],
                })(
                  <RangePicker format={dateFormat}/>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <h4 key="btn-split2" className="split">&nbsp;</h4>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.merType} {...formItemLayout} >
              {
                getFieldDecorator('merType', {
                  initialValue: data.merType,
                  rules: [{required: true, message: vaildMap.vaildMerType}],
                })(
                  <Select>
                    <Option value="">&nbsp;</Option>
                    <Option value="0">{bizMap['merType-10']}</Option>
                    <Option value="1">{bizMap['merType-11']}</Option>
                    <Option value="2">{bizMap['merType-12']}</Option>
                    <Option value="3">{bizMap['merType-13']}</Option>
                    <Option value="4">{bizMap['merType-14']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.regFund} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('regFund', {
                  initialValue: data.regFund,
                })(
                  <InputNumber min={1} max={9999999999999} step={1} placeholder="" style={{width: 260}}/>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.bizLic} {...formItemLayout} >
              {
                getFieldDecorator('bizLic', {
                  initialValue: data.bizLic,
                  rules: [{required: true, message: vaildMap.vaildCode},
                    {validator: bizLicValid}],
                })(
                  <Input maxLength={64} placeholder={bizMap.bizLic}/>,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.taxNo} {...formItemLayout} >
              {
                getFieldDecorator('taxNo', {
                  initialValue: data.taxNo,
                  rules: [{required: true, message: vaildMap.vaildTaxNo}, {validator: taxNoValid}],
                })(
                  <Input maxLength={64} placeholder={bizMap.taxNo}/>,
                )
              }
            </FormItem>
          </Col>
          {/*<Col span={12}>
          {
            getFieldsValue().merType === '0' || getFieldsValue().merType === '1' ?
              <FormItem label={bizMap.licValidDat} {...formItemLayout} >
                {
                  getFieldDecorator('licDat', {idValidDat
                    initialValue: licDatArr,
                    rules: [{ required: true, message: vaildMap.vaildLicDat }],
                  })(
                    <RangePicker format={dateFormat} />,
                  )
                }
              </FormItem>
              :
              null
          }
          {
            getFieldsValue().merType === '2' ?
              <FormItem label={bizMap.instCert} {...formItemLayout} >
                {
                  getFieldDecorator('certDat', {
                    rules: [{ required: true, message: vaildMap.vaildCertDat }],
                  })(
                    <RangePicker format={dateFormat} />,
                  )
                }
              </FormItem>
              :
              null
          }
          {
            getFieldsValue().merType === '3' ?
              <FormItem label={bizMap.lawCert} {...formItemLayout} >
                {
                  getFieldDecorator('lawDat', {
                    initialValue: lawDatArr,
                    rules: [{ required: true, message: vaildMap.vaildLawDat }],
                  })(
                    <RangePicker format={dateFormat} />,
                  )
                }
              </FormItem>
              :
              null
          }
        </Col>*/}
        </Row>
        <h4 key="btn-split3" className="split">&nbsp;</h4>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.taxNo} {...formItemLayout} >
              {
                getFieldDecorator('taxNo', {
                  initialValue: data.taxNo || '',
                  rules: [{ required: true, message: vaildMap.vaildTaxNo }, { validator: taxNoValid }],
                })(
                  <Input placeholder={bizMap.taxNo} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <h4 key="btn-split4" className="split">&nbsp;</h4>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.industryId} {...formItemLayout} >
              {
                getFieldDecorator('industryId', {
                  initialValue: data.industryId,
                  rules: [{required: true, message: vaildMap.vaildIndustryId}],
                })(
                  <Select >
                    <Option value="">&nbsp;</Option>
                    {
                      industryList.map((industryOption, idx) => {
                        return <Option key={idx} value={industryOption.code}>{industryOption.desc}</Option>;
                      })
                    }
                  </Select>,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.merchantType} {...formItemLayout} >
              {
                getFieldDecorator('merchantType', {
                  initialValue: data.merchantType,
                  rules: [],
                })(
                  <Select>
                    <Option value="">&nbsp;</Option>
                    <Option value="1">{bizMap['merchantType-01']}</Option>
                    <Option value="2">{bizMap['merchantType-02']}</Option>
                    <Option value="3">{bizMap['merchantType-03']}</Option>
                    <Option value="4">{bizMap['merchantType-04']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.monthlyTurnover} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('monthlyTurnover', {
                  initialValue: data.monthlyTurnover,
                })(
                  <InputNumber min={1} max={9999999999999} step={1} placeholder="" style={{width: 260}}/>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.bizSale} {...formItemLayout} >
              {
              getFieldDecorator('bizsaleId', {
                initialValue: data.bizSale,
              })(
                <Select >
                  <Option value="">&nbsp;</Option>
                  {
                    bizSaleList.map((bizsaleOption, idx) => {
                      return <Option key={idx} value={`${bizsaleOption.usrId}-${bizsaleOption.usrName}`}>{bizsaleOption.usrName}</Option>;
                    })
                  }
                </Select>,
              )
            }
            </FormItem>
          </Col>
        </Row>
        <h4 className="split">&nbsp;</h4>
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

MerchantBaseInfoForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formBaseSubmit: PropTypes.func,
  bizSaleList: PropTypes.array,
  industryList: PropTypes.array,
};

MerchantBaseInfoForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formBaseSubmit: noop,
  bizSaleList: [],
  industryList: [],
}

export default Form.create()(MerchantBaseInfoForm);
