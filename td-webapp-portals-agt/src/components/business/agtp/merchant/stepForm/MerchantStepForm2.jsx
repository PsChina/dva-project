import React, { PropTypes } from 'react';
import { Form, Input, Modal, Button, Row, Col, Select, Cascader } from 'antd';
import * as i18n from '../../../../../utils/i18n';
import SuBankQueryForm from '../subBankInfo/SuBankQueryForm';
import SubBankCallBackPageTable from '../subBankInfo/SubBankCallBackPageTable';
import { getProvLabel, getCityLabel } from '../../../../../utils/continentCountryProvCityUtil';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;

const MerchantBankStepForm = (props) => {
  const bizMap = i18n.bizMap('agtp/merchant');
  const vaildMap = i18n.bizMap('agtp/merchantVaild');
  const CITYDATAS = i18n.bizMap('continentCountryProvCityData');
  const currency = i18n.bizMap('currency');
  const commonMap = i18n.commonMap();
  const { form, style, data, submiting, nextClick, prevClick, bankList, querySubBanklist, subBankList,
    onCancelSubBankModel, subBankModalVisible } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, setFieldsValue } = form;
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        if (dat.stlProvCity && dat.stlProvCity.length > 0) {
          dat.stlCity = dat.stlProvCity.join(',');
        }
        if (dat.stlBankName && dat.stlBankName.split('-').length > 1) {
          dat.stlBankName = dat.stlBankName.split('-')[1];
        }
        nextClick(dat);
      }
    });
  };
  const queryFormProps = {
    formSubmit: (datas) => {
      const formData = getFieldsValue();
      const param = {};
      if (formData.stlProvCity && formData.stlProvCity.length > 0) {
        param.provName = getProvLabel(formData.stlProvCity[2]);
        param.cityName = getCityLabel(formData.stlProvCity[3]);
      }
      param.subBranch = datas.subBranch;
      param.bankParentCode = formData.stlBankName && formData.stlBankName.split('-').length > 2 ? formData.stlBankName.split('-')[2] : '';
      querySubBanklist(Object.assign({}, param, { currentPage: 1 }));
    },
  };
  const handleQuerySubBanklist = () => {
    const formData = getFieldsValue();
    const param = {};
    if (formData.stlProvCity && formData.stlProvCity.length > 0) {
      param.provName = getProvLabel(formData.stlProvCity[2]);
      param.cityName = getCityLabel(formData.stlProvCity[3]);
    }
    param.bankParentCode = formData.stlBankName && formData.stlBankName.split('-').length > 2 ? formData.stlBankName.split('-')[2] : '';
    querySubBanklist(Object.assign(param, { currentPage: 1 }));
  }
  const stlBankNameOnSelect = (value) => {
    if (value && value.split('-').length > 0) {
      setFieldsValue({ stlBank: value.split('-')[0] });
    }
  }
  const infoModalProps = {
    width: 848,
    footer: null,
    title: bizMap.subBankDetail,
    visible: subBankModalVisible,
    onCancel: () => {
      onCancelSubBankModel();
    },
  };
  const tableProps = {
    tableCurrentPage: subBankList.tableCurrentPage,
    tableList: subBankList.tableList,
    tableTotal: subBankList.tableTotal,
    tableLoading: subBankList.tableLoading,
    tablePageChange(next) {
      const param = subBankList.tableParam;
      param.currentPage = next;
      const formData = getFieldsValue();
      param.provName = getProvLabel(formData.stlProvCity[2]);
      param.cityName = getCityLabel(formData.stlProvCity[3]);
      param.bankParentCode = formData.stlBankName && formData.stlBankName.split('-').length > 2 ? formData.stlBankName.split('-')[2] : '';
      querySubBanklist(param);
    },
    rowClickCallback(data) {
      form.setFieldsValue({ stlCnaps: data.bankCode });
      form.setFieldsValue({ stlCnapsName: data.subBranch });
      onCancelSubBankModel();
    },
  };
  return (
    <Form layout="horizontal" style={style} onSubmit={handleSubmit}>
      <Row style={{ display: 'none' }}>
        <Col span={24}>
          <FormItem label={bizMap.merId} {...formItemLayout}>
            {
              getFieldDecorator('merId', {
                initialValue: data.merId,
              })(
                <Input placeholder={bizMap.merId} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormItem label={bizMap.stlAcc} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('stlAcc', {
                initialValue: data.stlAcc,
                rules: [{ required: true, message: vaildMap.vaildStlAc }],
              })(
                <Input maxLength={19} placeholder={bizMap.stlAcc} />,
              )
            }
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label={bizMap.stlName} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('stlName', {
                initialValue: data.stlName,
                rules: [{ required: true, message: vaildMap.vaildStlName }],
              })(
                <Input maxLength={40} placeholder={bizMap.stlName} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      {/*<Row>
        <Col span={12}>
          <FormItem label={bizMap.withdrawPeriod} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('withdrawPeriod', {
                initialValue: data.withdrawPeriod,
                rules: [],
              })(
                <Input maxLength={64} placeholder={bizMap.withdrawPeriod} />,
              )
            }
          </FormItem>
        </Col>
      </Row>*/}
      <Row>
        <Col span={12}>
          <FormItem label={bizMap.ccy} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('ccy', {
                initialValue: data.ccy ? data.ccy : 'TWD',
                rules: [{ required: true, message: vaildMap.vaildCCy }],
              })(

                <Select>
                  {
                    currency.map((item, idx) => {
                      return <Option key={idx} value={item.value}>{item.label}</Option>;
                    })
                  }
                </Select>,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormItem label={bizMap.stlBankName} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('stlBankName', {
                initialValue: data.bizScope,
                rules: [{ required: true, message: vaildMap.vaildStlBankName }],
              })(
                <Select onSelect={value => stlBankNameOnSelect(value)} showSearch>
                  {
                    bankList.map((item, idx) => {
                      return <Option key={idx} value={`${item.bankCode}-${item.bankName}-${item.bankNo}`}>{item.bankName}</Option>;
                    })
                  }
                </Select>,
              )
            }
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label={bizMap.stlBank} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('stlBank', {
                initialValue: '',
                rules: [{ required: true, message: vaildMap.vaildStlBank }],
              })(
                <Input placeholder={bizMap.stlBank} readOnly="true" />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      {/*<Row>
        <Col span={12}>
          <FormItem label={bizMap.stlProvCity} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('stlProvCity', {
                initialValue: data.stlCity ? data.stlCity.split(',') : null,
                rules: [{ required: true, message: vaildMap.vaildAddress }],
              })(
                <Cascader options={CITYDATAS} placeholder={bizMap.stlProvCity} />,
              )
            }
          </FormItem>
        </Col>
      </Row>*/}
      <Row>
        <Col span={12}>
          <FormItem label={bizMap.stlCnapsName} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('stlCnapsName', {
                initialValue: data.stlCnapsName,
                rules: [{ required: true, message: vaildMap.vaildStlCnapsName }],
              })(
                <Input placeholder={bizMap.stlCnapsName} onClick={handleQuerySubBanklist} readOnly="true" />,
              )
            }
          </FormItem>
        </Col>
        {subBankModalVisible
          ? <Col>
            <Modal {...infoModalProps}>
              <SuBankQueryForm {...queryFormProps} />
              <SubBankCallBackPageTable {...tableProps} />
            </Modal>
          </Col>
          : null
        }
        <Col span={12}>
          <FormItem label={bizMap.stlCnaps} {...formItemLayout} hasFeedback >
            {
              getFieldDecorator('stlCnaps', {
                initialValue: data.stlCnaps,
                rules: [{ required: true, message: vaildMap.vaildStlCnaps }],
              })(
                <Input placeholder={bizMap.stlCnaps} readOnly="true" />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      {/*<Row>
        <Col span={12}>
          <FormItem label={bizMap.creditAutoType} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('creditAutoType', {
                initialValue: data.creditAutoType,
                rules: [{ required: true, message: vaildMap.vaildCreditAutoType }],
              })(
                <Select>
                  <Option value="">&nbsp;</Option>
                  <Option value="01">{bizMap['creditAutoType-01']}</Option>
                  <Option value="02">{bizMap['creditAutoType-02']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label={bizMap.fee} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('fee', {
                initialValue: data.fee,
                rules: [],
              })(
                <Input maxLength={64} placeholder={bizMap.fee} />,
              )
            }
          </FormItem>
        </Col>
      </Row>*/}
      <h4 key="btn-split" className="split">&nbsp;</h4>
      <Row key="btn-row">
        <Col span={24} style={{ textAlign: 'center' }}>
          <Button onClick={prevClick} style={{ marginRight: 16 }}>{commonMap.prevStep}</Button>
          <Button type="primary" htmlType="submit" loading={submiting}>{commonMap.nextStep}</Button>
        </Col>
      </Row>
    </Form>
  );
}

MerchantBankStepForm.propTypes = {
  style: PropTypes.object,
  data: PropTypes.object,
  submiting: PropTypes.bool,
  nextClick: PropTypes.func,
  prevClick: PropTypes.func,
  bankList: PropTypes.array,
  querySubBanklist: PropTypes.func,
};

MerchantBankStepForm.defaultProps = {
  style: {},
  data: {},
  submiting: false,
  nextClick: noop,
  prevClick: noop,
  bankList: [],
  querySubBanklist: noop,
}

export default Form.create()(MerchantBankStepForm);
