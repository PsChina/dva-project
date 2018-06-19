import React, { PropTypes } from 'react';
import { Spin, Form, Input, Cascader, Button, Row, Select, Col, Modal } from 'antd';
import * as i18n from '../../../../../utils/i18n';
import SuBankQueryForm from '../subBankInfo/SuBankQueryForm';
import SubBankCallBackPageTable from '../subBankInfo/SubBankCallBackPageTable';
import { getProvLabel, getCityLabel } from '../../../../../utils/continentCountryProvCityUtil';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;

const MerchantBankInfoForm = (props) => {
  const bizMap = i18n.bizMap('mms/merchant');
  const CITYDATAS = i18n.bizMap('continentCountryProvCityData');
  const currency = i18n.bizMap('currency');
  const vaildMap = i18n.bizMap('mms/merchantVaild');
  const commonMap = i18n.commonMap();
  const { form, data, loading, submiting, formBankSubmit, querySubBanklist, subBankList, bankList,
    onCancelSubBankModel, subBankModalVisible } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields, setFieldsValue } = form;
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
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
        formBankSubmit(dat);
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
      param.bankParentCode = formData.stlBankName && formData.stlBankName.split('-').length > 2 ? formData.stlBankName.split('-')[2] : '';
      param.subBranch = datas.subBranch;
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

  const handleReset = () => {
    resetFields();
  }
  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
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
                  <Input placeholder={bizMap.stlAcc} />,
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
                  <Input placeholder={bizMap.stlName} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.ccy} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('ccy', {
                  initialValue: data.ccy ? data.ccy : 'TWD',
                  rules: [{ required: true, message: vaildMap.vaildCcy }],
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
                  initialValue: data.stlBankName,
                  rules: [{ required: true, message: vaildMap.vaildStlBnkName }],
                })(
                  <Select onSelect={value => stlBankNameOnSelect(value)}>
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
                  initialValue: data.stlBank,
                  rules: [{ required: true, message: vaildMap.vaildStlBank }],
                })(
                  <Input placeholder={bizMap.stlBank} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
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
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.stlCnapsName} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('stlCnapsName', {
                  initialValue: data.stlCnapsName,
                  rules: [{ required: true, message: vaildMap.vaildStlCnapsName }],
                })(
                  <Input placeholder={bizMap.stlCnapsName} onClick={handleQuerySubBanklist} />,
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
            <FormItem label={bizMap.stlCnaps} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('stlCnaps', {
                  initialValue: data.stlCnaps,
                  rules: [{ required: true, message: vaildMap.vaildStlCnaps }],
                })(
                  <Input placeholder={bizMap.stlCnaps} />,
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

MerchantBankInfoForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formBankSubmit: PropTypes.func,
  querySubBanklist: PropTypes.func,
  bankList: PropTypes.array,
};

MerchantBankInfoForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formBankSubmit: noop,
  querySubBanklist: noop,
  bankList: [],
}

export default Form.create()(MerchantBankInfoForm);
