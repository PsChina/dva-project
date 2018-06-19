import React, { PropTypes } from 'react';
import { Spin, Form, Input, Select, DatePicker, Cascader, InputNumber, Button, Row, Col } from 'antd';
import moment from 'moment';
import { apIDValid, limitNameSpaceValid, postValid, faxValid, phoneValid, codeValid, merSnameValid, emailValid, userRealNameValidate, passportValid } from '../../../../../utils/vaild';
import * as i18n from '../../../../../utils/i18n';
import AREACODE from '../../../../../../config/i18n/zh-cn/continentCountryAreaCode.json';
import CITYDATAS from '../../../../../../config/i18n/zh-cn/continentCountryProvCityData.json';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const MerchantBaseInfoForm = (props) => {
  const dateFormat = 'YYYY-MM-DD';
  const dateUpdFormat = 'YYYYMMDD';
  const bizMap = i18n.bizMap('mms/merchant');
  const vaildMap = i18n.bizMap('mms/merchantVaild');
  const commonMap = i18n.commonMap();
  const { form, data, loading, submiting, formBaseSubmit, bizSaleList } = props;
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
        if (dat.idDat && dat.idDat.length > 0) {
          dat.idEffDat = dat.idDat[0].format(dateUpdFormat);
          dat.idExpDat = dat.idDat[1].format(dateUpdFormat);
        }
        if (dat.orgDat && dat.orgDat.length > 0) {
          dat.orgEffDat = dat.orgDat[0].format(dateUpdFormat);
          dat.orgExpDat = dat.orgDat[1].format(dateUpdFormat);
        }
        if (dat.licDat && dat.licDat.length > 0) {
          dat.licEffDat = dat.licDat[0].format(dateUpdFormat);
          dat.licExpDat = dat.licDat[1].format(dateUpdFormat);
        }
        if (dat.certDat && dat.certDat.length > 0) {
          dat.certEffDat = dat.certDat[0].format(dateUpdFormat);
          dat.certExpDat = dat.certDat[1].format(dateUpdFormat);
        }
        if (dat.lawDat && dat.lawDat.length > 0) {
          dat.lawEffDat = dat.lawDat[0].format(dateUpdFormat);
          dat.lawExpDat = dat.lawDat[1].format(dateUpdFormat);
        }
        if (dat.merAddress && dat.merAddress.length > 0) {
          dat.merArea = dat.merAddress.join(',');
        }
       // delete dat.merAddress;
        delete dat.idDat;
        delete dat.orgDat;
        delete dat.licDat;
        delete dat.certDat;
        delete dat.lawDat;
        formBaseSubmit(dat);
      }
    });
  };
  const handleReset = () => {
    resetFields();
  }
  const merPrefixSelector = getFieldDecorator('merMobileAreaCode', {
    initialValue: data.merMobileAreaCode,
  })(
    <Select style={{ width: 120 }} showSearch filterOption={(input, option) => option.props.children.indexOf(input) >= 0}>
      {AREACODE.map(d => <Option key={d.area_code} title={d.area_code}>{d.value}</Option>)}
    </Select>
    );
  const contPrefixSelector = getFieldDecorator('merContMobileAreaCode', {
    initialValue: data.merContMobileAreaCode,
  })(
    <Select style={{ width: 120 }} showSearch filterOption={(input, option) => option.props.children.indexOf(input) >= 0}>
      {AREACODE.map(d => <Option key={d.area_code} title={d.area_code}>{d.value}</Option>)}
    </Select>
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
                  initialValue: data.merName || '',
                  rules: [{ required: true, message: vaildMap.vaildMerName }],
                })(
                  <Input placeholder={bizMap.merName} disabled />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.merSname} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('merSname', {
                  initialValue: data.merSname || '',
                  rules: [{ required: true, message: vaildMap.vaildMerSname },
                    { validator: merSnameValid }],
                })(
                  <Input placeholder={bizMap.merSname} disabled />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.bizScope} {...formItemLayout2} hasFeedback>
              {
                getFieldDecorator('bizScope', {
                  initialValue: data.bizScope || '',
                  rules: [{ required: true, message: vaildMap.vaildBizScope }],
                })(
                  <Input placeholder={bizMap.bizScope} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.merPhone} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('merPhone', {
                  initialValue: data.merPhone || '',
                  rules: [{ validator: phoneValid }],
                })(
                  <Input placeholder={bizMap.merPhone} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.merMobile} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('merMobile', {
                  initialValue: data.merMobile || '',
                  rules: [{ required: true, message: vaildMap.vaildMobile }],
                })(
                  <Input addonBefore={merPrefixSelector} maxLength={20} style={{ width: '100%' }} placeholder={bizMap.merMobile} />,
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
                  initialValue: data.merFax || '',
                  rules: [{ validator: faxValid }],
                })(
                  <Input placeholder={bizMap.merFax} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.merEmail} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('merEmail', {
                  initialValue: data.merEmail || '',
                  rules: [{ required: true, message: vaildMap.vaildEmail },
                    { validator: emailValid }],
                })(
                  <Input placeholder={bizMap.merEmail} disabled />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.merAddress} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('merAddress', {
                  initialValue: data.merArea ? data.merArea.split(',') : null,
                  rules: [{ required: true, type: 'array', message: vaildMap.vaildAddress }],
                })(
                  <Cascader placeholder={bizMap.merAddress} options={CITYDATAS} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.merPost} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('merPost', {
                  initialValue: data.merPost || '',
                  rules: [{ validator: postValid }],
                })(
                  <Input placeholder={bizMap.merPost} />,
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
                  initialValue: data.merAddr || '',
                  rules: [{ required: true, message: vaildMap.vaildAddr }, { validator: limitNameSpaceValid }],
                })(
                  <Input placeholder={bizMap.merAddr} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.contName} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('merContName', {
                  initialValue: data.merContName || '',
                  rules: [{ validator: limitNameSpaceValid }],
                })(
                  <Input placeholder={bizMap.contName} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.contMobile} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('merContMobile', {
                  initialValue: data.merContMobile || '',
                  rules: [],
                })(
                  <Input addonBefore={contPrefixSelector} maxLength={20} style={{ width: '100%' }} placeholder={bizMap.contMobile} />,
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
                  rules: [{ required: true, message: vaildMap.vaildApName }, { validator: userRealNameValidate }],
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
                  initialValue: data.idType || '',
                  rules: [{ required: true, message: vaildMap.vaildIdType }],
              validateTrigger: 'onBlur',
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
                  initialValue: data.apId || '',
                  rules: [{ required: true, message: vaildMap.vaildApId }, {validator : null } ],
                })(
                  <Input placeholder={bizMap.apId} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.idValidDat} {...formItemLayout} >
              {
                getFieldDecorator('idDat', {
                  initialValue: [
                    data.idEffDat ? moment(data.idEffDat, dateFormat) : null,
                    data.idExpDat ? moment(data.idExpDat, dateFormat) : null,
                  ],
                  rules: [{ required: true, message: vaildMap.vaiIdDat }],
                })(
                  <RangePicker format={dateFormat} />,
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
                  initialValue: data.merType || '',
                  rules: [{ required: true, message: vaildMap.vaildMerType }],
                })(
                  <Select>
                    <Option value="">&nbsp;</Option>
                    <Option value="0">{bizMap['merType-0']}</Option>
                    <Option value="1">{bizMap['merType-1']}</Option>
                    <Option value="2">{bizMap['merType-2']}</Option>
                    <Option value="3">{bizMap['merType-3']}</Option>
                    <Option value="4">{bizMap['merType-4']}</Option>
                    <Option value="5">{bizMap['merType-5']}</Option>
                    <Option value="6">{bizMap['merType-6']}</Option>
                    <Option value="7">{bizMap['merType-7']}</Option>
                    <Option value="8">{bizMap['merType-8']}</Option>
                    <Option value="9">{bizMap['merType-9']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.regFund} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('regFund', {
                  initialValue: data.regFund || '',
                })(
                  <InputNumber min={1} max={9999999999999} step={0.01} maxLength="13" placeholder="" style={{ width: 260 }} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            {
              getFieldsValue().merType === '0' || getFieldsValue().merType === '1' ?
                <FormItem label={bizMap.bizLic} {...formItemLayout} >
                  {
                    getFieldDecorator('bizLic', {
                      initialValue: data.bizLic || '',
                      rules: [{ required: true, message: vaildMap.vaildCode },
                      { validator: codeValid }],
                    })(
                      <Input placeholder={bizMap.bizLic} />,
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
                    getFieldDecorator('instCert', {
                      initialValue: data.instCert || '',
                      rules: [{ required: true, message: vaildMap.vaildInstCert },
                        { validator: codeValid }],
                    })(
                      <Input placeholder={bizMap.instCert} />,
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
                    getFieldDecorator('lawCert', {
                      initialValue: data.lawCert || '',
                      rules: [{ required: true, message: vaildMap.vaildLawCert }],
                    })(
                      <Input placeholder={bizMap.lawCert} />,
                    )
                  }
                </FormItem>
                :
                null
            }
          </Col>
          <Col span={12}>
            {
              getFieldsValue().merType === '0' || getFieldsValue().merType === '1' ?
                <FormItem label={bizMap.bizLic} {...formItemLayout} >
                  {
                    getFieldDecorator('licDat', {
                      initialValue: [
                        data.licEffDat ? moment(data.licEffDat, dateFormat) : null,
                        data.licExpDat ? moment(data.licExpDat, dateFormat) : null,
                      ],
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
                      initialValue: [
                        data.certEffDat ? moment(data.certEffDat, dateFormat) : null,
                        data.certExpDat ? moment(data.certExpDat, dateFormat) : null,
                      ],
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
                      initialValue: [
                        data.lawEffDat ? moment(data.lawEffDat, dateFormat) : null,
                        data.lawExpDat ? moment(data.lawExpDat, dateFormat) : null,
                      ],
                      rules: [{ required: true, message: vaildMap.vaildLawDat }],
                    })(
                      <RangePicker format={dateFormat} />,
                    )
                  }
                </FormItem>
                :
                null
            }
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.orgCod} {...formItemLayout} >
              {
                getFieldDecorator('orgCod', {
                  initialValue: data.orgCod || '',
                  rules: [{ required: true, message: vaildMap.vaildOrdCod }, { validator: codeValid }],
                })(
                  <Input placeholder={bizMap.orgCod} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.orgValidDat} {...formItemLayout} >
              {
                getFieldDecorator('orgDat', {
                  initialValue: [
                    data.orgEffDat ? moment(data.orgEffDat, dateFormat) : null,
                    data.orgExpDat ? moment(data.orgExpDat, dateFormat) : null,
                  ],
                  rules: [{ required: true, message: vaildMap.vaildOrdDat }],
                })(
                  <RangePicker format={dateFormat} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.taxNo} {...formItemLayout} >
              {
                getFieldDecorator('taxNo', {
                  initialValue: data.taxNo || '',
                  rules: [{ required: true, message: vaildMap.vaildTaxNo }, { validator: codeValid }],
                })(
                  <Input placeholder={bizMap.taxNo} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <h4 key="btn-split3" className="split">&nbsp;</h4>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.bizSale} {...formItemLayout} >
              {
                getFieldDecorator('bizSaleId', {
                  initialValue: data.bizSale,
                })(
                  <Select>
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
};

MerchantBaseInfoForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formBaseSubmit: noop,
  bizSaleList: [],
}

export default Form.create()(MerchantBaseInfoForm);
