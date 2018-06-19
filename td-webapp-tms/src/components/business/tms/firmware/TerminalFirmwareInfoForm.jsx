import React, { PropTypes } from 'react';
import { Spin, Form, Input, Button, Row, Col, Upload, Select, Icon } from 'antd';
import * as i18n from '../../../../utils/i18n';
import { callNotice } from '../../../../utils/alert';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const Dragger = Upload.Dragger;

const TerminalFirmwareInfoForm = (props) => {
  const uploadUrl = 'rest/tms/common/upload';
  const bizMap = i18n.bizMap('tms/terminalFirmware');
  const dataMap = i18n.bizMap('tms/tmsData');
  const validMap = i18n.bizMap('tms/tmsValid');
  const commonMap = i18n.commonMap();
  const { form, data, loading, submiting, formSubmit, companyOptions, queryModelOptionData } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields } = form;
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
        const dat = getFieldsValue();
        let terModId = '';
        if (dat.terModId) {
          dat.terModId.forEach(v => (terModId += `,${v}`));
          dat.terModId = terModId.substring(1, terModId.length);
        }
        formSubmit(dat);
        resetFields();
      }
    });
  };

  const handleReset = () => {
    resetFields();
  }
  const uploadProps = {
    action: uploadUrl,
    name: 'file',
    multiple: false,
    showUploadList: true,
    data: { TABLENAME: 'term_pro_verison', LX: 'VERISON', ORDERNUM: '1' },
    onChange(info) {
      const status = info.file.status;
      if (status === 'done') {
        form.setFieldsValue({ filePath: info.file.response.FJSRC_VERISON_1, fileId: info.file.response.FJID_VERISON_1 });
        callNotice(commonMap.success, bizMap.fileUploadSuccess, 'success');
      } else if (status === 'error') {
        callNotice(commonMap.warning, bizMap.fileUploadWarn, 'warning');
      }
      if (status === 'removed') {
        form.setFieldsValue({ filePath: '', fileId: '' });
      }
    },
  };
  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <Row style={{ display: 'none' }}>
          <Col span={24}>
            <FormItem label={bizMap.verId} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('verId', {
                  initialValue: data.verId,
                })(
                  <Input placeholder={bizMap.verId} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.verNo} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('verNo', {
                  initialValue: data.verNo,
                  rules: [{ required: true, message: validMap.validVerNo }],
                })(
                  <Input placeholder={bizMap.verNo} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.copNam} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('copId', {
                  initialValue: data.copId,
                  rules: [{ required: true, message: validMap.validCopNam }],
                })(
                  <Select onChange={(k) => { queryModelOptionData(k, getFieldsValue()); }} >
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
            <FormItem label={bizMap.verTyp} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('verTyp', {
                  initialValue: data.verTyp,
                  rules: [{ required: true, message: validMap.validVerTyp }],
                })(
                  <Select>
                    <Option value="">&nbsp;</Option>
                    <Option value="1">{dataMap['verTyp-1']}</Option>
                    <Option value="2">{dataMap['verTyp-2']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem {...formItemLayout} label={bizMap.inputFile} >
              <div hidden>
                {
                  getFieldDecorator('filePath', {
                    initialValue: data.filePath,
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
        <div hidden>
          <FormItem {...formItemLayout} label={bizMap.inputFile} >
            {
              getFieldDecorator('fileId', {
                initialValue: data.fileId,
              })(<Input placeholder="" />)
            }
          </FormItem>
        </div>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.verRemark} {...formItemLayout} >
              {
                getFieldDecorator('verRemark', {
                  initialValue: data.verRemark,
                })(
                  <Input type="textarea" rows="4" placeholder={bizMap.verRemark} />,
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

TerminalFirmwareInfoForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
  companyOptions: PropTypes.array,
  queryModelOptionData: PropTypes.func,
};

TerminalFirmwareInfoForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
  companyOptions: [],
  queryModelOptionData: noop,
}

export default Form.create()(TerminalFirmwareInfoForm);
