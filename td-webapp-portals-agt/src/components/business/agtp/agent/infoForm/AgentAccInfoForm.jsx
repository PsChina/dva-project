import React, { PropTypes } from 'react';
import { Form, Input, Modal, Button, Select, Row, Cascader, Col } from 'antd';
import * as i18n from '../../../../../utils/i18n';
import CITYDATAS from '../../../../../../config/i18n/zh-cn/continentCountryProvCityData.json';
import { numValid, userRealNameValidate } from '../../../../../utils/vaild';
import SuBankQueryForm from '../subBankInfo/SuBankQueryForm';
import SubBankCallBackPageTable from '../subBankInfo/SubBankCallBackPageTable';
import { getProvLabel, getCityLabel } from '../../../../../utils/continentCountryProvCityUtil';


const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;

const AgentAccInfoForm = (props) => {
  const bizMap = i18n.bizMap('agtp/agent');
  const vaildMap = i18n.bizMap('agentVaild');
  const currency = i18n.bizMap('currency');
  const commonMap = i18n.commonMap();
  const { form, style, data, submiting, formAccSubmit, bankList, querySubBanklist,
    subBankList, subBankModalVisible, onCancelSubBankModel } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields, setFieldsValue } = form;
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
  };
  const stlBankNameOnSelect = (value) => {
    if (value && value.split('-').length > 0) {
      setFieldsValue({ stlBank: value.split('-')[0] });
    }
  }

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
  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        dat.stlCity = dat.agtprovCityArea.join(',');
        delete dat.agtprovCityArea;
        if (dat.stlBankName && dat.stlBankName.split('-').length > 1) {
          dat.stlBankName = dat.stlBankName.split('-')[1];
        }
        formAccSubmit(dat);
      }
    });
  };
  const handleReset = () => {
    resetFields();
  }
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
          <FormItem label={bizMap.stlName} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('stlName', {
                initialValue: data.stlName,
                rules: [{ required: true, message: vaildMap.vaildAgtStlName },
                { validator: userRealNameValidate }],
              })(
                <Input placeholder={bizMap.stlName} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
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
        <Col span={24}>
          <FormItem label={bizMap.stlAcc} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('stlAcc', {
                initialValue: data.stlAcc,
                rules: [{ required: true, message: vaildMap.vaildAgtStlAc },
                { validator: numValid }],
              })(
                <Input placeholder={bizMap.stlAcc} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.stlBankName} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('stlBankName', {
                initialValue: data.stlBankName,
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
      </Row>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.stlBank} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('stlBank', {
                initialValue: data.stlBank ? data.stlBank : '',
                rules: [{ required: true, message: vaildMap.vaildStlBank }],
              })(
                <Input placeholder={bizMap.stlBank} readOnly="true" />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.agtprovCityArea} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('agtprovCityArea', {
                initialValue: data.stlCity ? data.stlCity.split(',') : null,
                rules: [{ required: true, message: vaildMap.vaildAddress }],
              })(
                <Cascader placeholder={bizMap.provCityArea} options={CITYDATAS} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
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
        <Col span={24}>
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
      <h4 key="btn-split" className="split">&nbsp;</h4>
      <Row key="btn-row">
        <Col span={24} style={{ textAlign: 'center' }}>
          <Button type="primary" htmlType="submit" loading={submiting}>{commonMap.submit}</Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
        </Col>
      </Row>
    </Form>
  );
}

AgentAccInfoForm.propTypes = {
  style: PropTypes.object,
  data: PropTypes.object,
  submiting: PropTypes.bool,
  formAccSubmit: PropTypes.func,
  querySubBanklist: PropTypes.func,
  bankList: PropTypes.array,
};

AgentAccInfoForm.defaultProps = {
  style: {},
  data: {},
  submiting: false,
  formAccSubmit: noop,
  querySubBanklist: noop,
  bankList: [],

}

export default Form.create()(AgentAccInfoForm);
