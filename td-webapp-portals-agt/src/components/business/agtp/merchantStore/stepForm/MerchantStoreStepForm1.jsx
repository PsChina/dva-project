import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col, Modal, Cascader, Select } from 'antd';
import * as i18n from '../../../../../utils/i18n';
import CITYDATAS from '../../../../../../config/i18n/zh-cn/continentCountryProvCityData.json';
import AREACODE from '../../../../../../config/i18n/zh-cn/continentCountryAreaCode.json';
import { postValid, phoneValid, mobileValid, userRealNameValidate } from '../../../../../utils/vaild';
import MerchantQueryForm from '../merchantInfo/MerchantQueryForm';
import MerchantCallBackPageTable from '../merchantInfo/MerchantCallBackPageTable';

const noop = () => { };
const Option = Select.Option;
const FormItem = Form.Item;

const MerchatStoreStepForm1 = (props) => {
  const bizMap = i18n.bizMap('agtp/merchantStore');
  const vaildMap = i18n.bizMap('agtp/merchantStoreVaild');
  const commonMap = i18n.commonMap();
  const { form, style, data, submiting, nextClick, queryMerList, onCancelMerModel,
    merInfoModalVisible, merchantData } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll } = form;
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const formItemLayout1 = {
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
        if (dat.braAddress && dat.braAddress.length > 0) {
          dat.braArea = dat.braAddress.join(',');
        }
        delete dat.braAddress;
        nextClick(dat);
      }
    });
  };
  const queryFormProps = {
    formSubmit: (dat) => {
      queryMerList(Object.assign({}, dat, { currentPage: 1 }));
    },
  };
  const handQueryMerList = () => {
    queryMerList(Object.assign({}, { currentPage: 1 }, { isFirst: true }));
  }
  const infoModalProps = {
    width: 848,
    footer: null,
    title: bizMap.memQueryList,
    visible: merInfoModalVisible,
    onCancel: () => {
      onCancelMerModel();
    },
  };
  const tableProps = {
    tableCurrentPage: merchantData.tableCurrentPage,
    tableList: merchantData.tableList,
    tableTotal: merchantData.tableTotal,
    tableLoading: merchantData.tableLoading,
    tablePageChange(next) {
      const param = merchantData.tableParam;
      param.currentPage = next;
      queryMerList(param);
    },
    rowClickCallback(data) {
      form.setFieldsValue({ merId: data.merId });
      onCancelMerModel();
    },
  };
  const prefixSelector = getFieldDecorator('braMobileAreaCode', {
    initialValue: '886',
  })(
    <Select style={{ width: 120 }} showSearch filterOption={(input, option) => option.props.children.indexOf(input) >= 0}>
      {AREACODE.map(d => <Option key={d.area_code} title={d.area_code}>{d.value}</Option>)}
    </Select>,
  );
  return (
    <Form layout="horizontal" style={style} onSubmit={handleSubmit}>
      <Row style={{ display: 'none' }}>
        <Col span={24}>
          <FormItem label={bizMap.braId} {...formItemLayout}>
            {
              getFieldDecorator('braId', {
                initialValue: data.braId,
              })(
                <Input placeholder={bizMap.braId} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormItem label={bizMap.merId} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('merId', {
                initialValue: data.merId,
                rules: [{ required: true, message: vaildMap.vaildMerId }],
              })(
                <Input placeholder={bizMap.merId} onClick={handQueryMerList} readOnly="true" id="storeMerId" />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.braName} {...formItemLayout1} hasFeedback>
            {
              getFieldDecorator('braName', {
                initialValue: data.braName,
                rules: [{ required: true, message: vaildMap.vaildBraName }],
              })(
                <Input maxLength={150} placeholder={bizMap.braName} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormItem label={bizMap.braShortName} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('braShortName', {
                initialValue: data.braShortName,
                rules: [{ required: true, message: vaildMap.vaildBraShortName }],
              })(
                <Input maxLength={150} placeholder={bizMap.braShortName} />,
              )
            }
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label={bizMap.braMobile} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('braMobile', {
                initialValue: data.braMobile,
                rules: [{ required: true, message: vaildMap.vaildMobile }, { validator: mobileValid }],
              })(
                <Input addonBefore={prefixSelector} maxLength={11} placeholder={bizMap.braMobile} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormItem label={bizMap.braConter} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('braConter', {
                initialValue: data.braConter,
                rules: [{ required: true, message: vaildMap.braConter }, { validator: userRealNameValidate }],
              })(
                <Input maxLength={50} placeholder={bizMap.braConter} />,
              )
            }
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label={bizMap.braTel} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('braTel', {
                initialValue: data.braTel,
                rules: [{ required: true, message: vaildMap.braTel }, { validator: phoneValid }],
              })(
                <Input maxLength={20} placeholder={bizMap.braTel} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormItem label={bizMap.braAddress} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('braAddress', {
                initialValue: data.braArea ? data.braArea.split(',') : null,
                rules: [{ required: true, type: 'array', message: vaildMap.vaildAddress }],
              })(
                <Cascader placeholder={bizMap.braAddress} options={CITYDATAS} />,
              )
            }
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label={bizMap.braPost} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('braPost', {
                initialValue: data.braPost,
                rules: [{ required: true, message: vaildMap.braPost }, { validator: postValid }],
              })(
                <Input maxLength={6} placeholder={bizMap.braPost} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormItem label={bizMap.braLongitude} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('braLongitude', {
                initialValue: data.braLongitude,
                rules: [{ required: false }],
              })(
                <Input maxLength={50} placeholder={bizMap.braLongitude} />,
              )
            }
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label={bizMap.braLatidute} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('braLatidute', {
                initialValue: data.braLatidute,
                rules: [{ required: false }],
              })(
                <Input maxLength={50} placeholder={bizMap.braLatidute} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      {merInfoModalVisible
        ? <Row>
          <Modal {...infoModalProps}>
            <MerchantQueryForm {...queryFormProps} />
            <MerchantCallBackPageTable {...tableProps} />
          </Modal>
        </Row>
        : null
      }
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.braAddr} {...formItemLayout1} hasFeedback>
            {
              getFieldDecorator('braAddr', {
                initialValue: data.braAddr,
                rules: [{ required: true, message: vaildMap.vaildBraAddr }],
              })(
                <Input maxLength={200} placeholder={bizMap.braAddr} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <h4 key="btn-split" className="split">&nbsp;</h4>
      <Row key="btn-row">
        <Col span={24} style={{ textAlign: 'center' }}>
          <Button type="primary" htmlType="submit" loading={submiting}>{commonMap.nextStep}</Button>
        </Col>
      </Row>
    </Form>
  );
}

MerchatStoreStepForm1.propTypes = {
  style: PropTypes.object,
  data: PropTypes.object,
  submiting: PropTypes.bool,
  nextClick: PropTypes.func,
  merchantData: PropTypes.object,
  merInfoModalVisible: PropTypes.bool,
  queryMerList: PropTypes.func,
  onCancelMerModel: PropTypes.func,
};

MerchatStoreStepForm1.defaultProps = {
  style: {},
  data: {},
  submiting: false,
  nextClick: noop,
  merchantData: {},
  merInfoModalVisible: false,
  queryMerList: noop,
  onCancelMerModel: noop,
}

export default Form.create()(MerchatStoreStepForm1);
