import React, { PropTypes } from 'react';
import { Spin, Form, Input, Button, Row, Col, Select, Radio, Upload, Icon } from 'antd';
import * as i18n from '../../../../utils/i18n';
import { callNotice } from '../../../../utils/alert';
import { numValidFirstNotZero } from '../../../../utils/vaild';
import { standUnitToMinUnit } from '../../../../utils/amount';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const Dragger = Upload.Dragger;
const TerminalStockAddOneForm = (props) => {
  const uploadUrl = 'rest/tms/common/upload';
  const downloadUrl = 'rest/tms/common/download/termAdd/xlsx';
  const bizMap = i18n.bizMap('tms/terminalStock');
  const dataMap = i18n.bizMap('tms/tmsData');
  const validMap = i18n.bizMap('tms/tmsValid');
  const currencyArray = i18n.bizMap('currency');
  const commonMap = i18n.commonMap();
  const { form, loading, submiting, formSubmit, companyOptions, modelOptions, queryModelOptionData, changeFileData, filePath } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields, setFieldsValue } = form;
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const termAddBatchFromData = getFieldsValue();
        termAddBatchFromData.terAddCur = termAddBatchFromData.terAddCur === undefined ? 'TWD' : termAddBatchFromData.terAddCur;
        if (termAddBatchFromData.terAddAmt !== undefined) {
          termAddBatchFromData.terAddAmt = standUnitToMinUnit(termAddBatchFromData.terAddAmt);
        }
        if (termAddBatchFromData.terNetinAmt !== undefined) {
          termAddBatchFromData.terNetinAmt = standUnitToMinUnit(termAddBatchFromData.terNetinAmt);
        }
        formSubmit(termAddBatchFromData);
        resetFields();
      }
    });
  };
  const handleReset = () => {
    resetFields();
  }
  const copIdOnSelect = (value, option) => {
    setFieldsValue({ copNam: option.props.children })
  }
  const modIdOnSelect = (value, option) => {
    setFieldsValue({ terModNo: option.props.children })
  }
  const prefixSelectorCurrency = getFieldDecorator('terAddCur', {
    initialValue: 'TWD',
  })(
    <Select style={{ width: 90 }}>
      {
        currencyArray.map((item) => {
          return <Option value={item.value}>{item.label}</Option>
        })
      }
    </Select>,
    );
  const uploadProps = {
    action: uploadUrl,
    name: 'file',
    data: { TABLENAME: 'term_store_inf', LX: 'EXCL', ORDERNUM: '1' },
    multiple: false,
    showUploadList: true,
    onChange(info) {
      const status = info.file.status;
      if (status === 'done') {
        changeFileData(info.file.response.FJSRC_EXCL_1);
        callNotice(commonMap.warning, bizMap.fileUploadSuccess, 'success');
      } else if (status === 'error') {
        callNotice(commonMap.warning, bizMap.fileUploadWarn, 'warning');
      }
      if (status === 'removed') {
        changeFileData('');
      }
    },
  };
  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit} style={{ width: 480 }}>
        <div hidden>
          {
            getFieldDecorator('copNam')(
              <Input placeholder="" />,
            )
          }
          {
            getFieldDecorator('terModNo')(
              <Input placeholder="" />,
            )
          }
        </div>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.terSrc} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('terSrc', {
                  rules: [{ required: true, message: validMap.validTerSrc }],
                })(
                  <Select>
                    <Option value="">&nbsp;</Option>
                    <Option value="1">{dataMap['terSrc-1']}</Option>
                    <Option value="2">{dataMap['terSrc-2']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.copNam} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('terCopId', {
                  rules: [{ required: true, message: validMap.validCopNam }],
                })(
                  <Select onChange={(k) => { queryModelOptionData(k); }} onSelect={(value, option) => copIdOnSelect(value, option)} >
                    <Option value="">&nbsp;</Option>
                    {
                      companyOptions.map((companyOption, idx) => {
                        return <Option key={idx} value={companyOption.copId}>{companyOption.copNam}</Option>;
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
            <FormItem label={bizMap.terModNo} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('terModId', {
                  rules: [{ required: true, message: validMap.validModNo }],
                })(
                  <Select onSelect={(value, option) => modIdOnSelect(value, option)} >
                    <Option value="">&nbsp;</Option>
                    {
                      modelOptions.map((modelOption, idx) => {
                        return <Option key={idx} value={modelOption.terModId}>{modelOption.terModNo}</Option>;
                      })
                    }
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        {
          getFieldsValue().terSrc === '1' ?
            <Row>
              <Col span={24}>
                <FormItem label={bizMap.terAddAmt} {...formItemLayout} hasFeedback>
                  {
                    getFieldDecorator('terAddAmt', {
                      rules: [{ required: true, message: validMap.validTerAddAmt },
                      { validator: numValidFirstNotZero }],
                    })(
                      <Input addonBefore={prefixSelectorCurrency} maxLength="13" style={{ width: 260 }} />,
                    )
                  }
                </FormItem>
              </Col>
            </Row>
            :
            null
        }
        {
          getFieldsValue().terSrc === '2' ?
            <Row>
              <Col span={24}>
                <FormItem label={bizMap.terNetinAmt} {...formItemLayout} hasFeedback>
                  {
                    getFieldDecorator('terNetinAmt', {
                      rules: [{ required: true, message: validMap.validTerNetinAmt },
                      { validator: numValidFirstNotZero }],
                    })(
                      <Input addonBefore={prefixSelectorCurrency} maxLength="13" style={{ width: 260 }} />,
                    )
                  }
                </FormItem>
              </Col>
            </Row>
            :
            null
        }
        <Row>
          <Col span={24}>
            <FormItem {...formItemLayout} label={bizMap.addPhynoType}>
              {
                getFieldDecorator('addPhynoType', {
                  initialValue: '1',
                })(
                  <RadioGroup size="large">
                    <RadioButton value="1">{bizMap.rangeAdd}</RadioButton>
                    <RadioButton value="2">{bizMap.fileAdd}</RadioButton>
                  </RadioGroup>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        {getFieldsValue().addPhynoType === '1' ?
          <Row>
            <Col span={24}>
              <FormItem {...formItemLayout} label={bizMap.phynoRange} >
                {
                  getFieldDecorator('terPhynoStr', {
                    rules: [{ required: true, message: validMap.validTerPhyno }],
                  })(
                    <Input placeholder={bizMap.terPhyno} style={{ width: 140 }} />,
                  )
                }
                &nbsp; ~ &nbsp;
              {
                  getFieldDecorator('terPhynoEnd', {
                    rules: [{ required: true, message: validMap.validTerPhyno }],
                  })(
                    <Input placeholder={bizMap.terPhyno} style={{ width: 140 }} />,
                  )
                }
              </FormItem>
            </Col>
          </Row>
          :
          <Row>
            <Col span={24}>
              <FormItem {...formItemLayout} label={bizMap.inputFile} >
                <a href={downloadUrl}>{bizMap.downloadFile}</a>
                <div hidden>
                  {
                    getFieldDecorator('filePath', {
                      initialValue: filePath,
                    })(
                      <Input placeholder="" hidden />,
                    )
                  }
                </div>
                <Dragger {...uploadProps} >
                  <p className="ant-upload-drag-icon"><Icon type="inbox" /></p>
                  <p className="ant-upload-text">{commonMap.uploadText}</p>
                  <p className="ant-upload-hint">{commonMap.uploadHint}</p>
                </Dragger>
              </FormItem>
            </Col>
          </Row>
        }
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

TerminalStockAddOneForm.propTypes = {
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
  companyOptions: PropTypes.array,
  modelOptions: PropTypes.array,
  queryModelOptionData: PropTypes.func,
  changeFileData: PropTypes.func,
  filePath: PropTypes.string,
};

TerminalStockAddOneForm.defaultProps = {
  loading: false,
  submiting: false,
  formSubmit: noop,
  companyOptions: [],
  modelOptions: [],
  queryModelOptionData: noop,
  changeFileData: noop,
  filePath: '',
}

export default Form.create()(TerminalStockAddOneForm);
