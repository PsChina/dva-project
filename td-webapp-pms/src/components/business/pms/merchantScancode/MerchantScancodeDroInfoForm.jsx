import React, { PropTypes } from 'react';
import { Spin, Form, Row, Col, Select, Input, Button, Upload, Icon } from 'antd';
import * as i18n from '../../../../utils/i18n';
import { callNotice } from '../../../../utils/alert';


const FormItem = Form.Item;
const Option = Select.Option;
const Dragger = Upload.Dragger;

const noop = () => {};

const MerchantBankcardDroInfoForm = (props) => {
  const uploadUrl = 'rest/pms/common/upload';
  const downloadUrl = 'rest/pms/common/download/bussTermScan/xlsx';
  const bizMap = i18n.bizMap('pms/merchantBankcard');
  const validMap = i18n.bizMap('pms/merchantBankcardValid');
  const commonMap = i18n.commonMap();
  const { form, loading, style, formSubmit, data, chnList, submiting, changeFileData, filePath } = props;
  const { validateFieldsAndScroll, getFieldsValue, resetFields, getFieldDecorator } = form;
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const options = [];
  chnList.forEach((v) => {
    options.push(<Option key={v.chnId} value={v.chnId}>{v.chnName}</Option>);
  });
  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        formSubmit(dat);
        resetFields();
        document.querySelector('.buss-card-upload .ant-upload-list-item-done .anticon-cross').click();
      }
    });
  };
  const uploadProps = {
    action: uploadUrl,
    name: 'file',
    data: { TABLENAME: 'buss_term_scan_inf', LX: 'EXCL', ORDERNUM: '1' },
    multiple: false,
    showUploadList: true,
    onChange(info) {
      console.log(info);
      const status = info.file.status;
      if (status === 'done') {
        changeFileData(info.file.response.FJSRC_EXCL_1);
        callNotice(commonMap.success, bizMap.fileUploadSuccess, 'success');
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
      <Form layout="horizontal" style={style} onSubmit={handleSubmit}>
        <Row>
          <Col span={18}>
            <FormItem label={bizMap.chnName} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('chnId', {
                  initialValue: data.chnName,
                  rules: [{ required: true, message: validMap.validChnName }],
                })(
                  <Select placeholder={commonMap.select}>
                    {options}
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <h4 className="split">&nbsp;</h4>
        <Row>
          <Col span={18}>
            <FormItem {...formItemLayout} label={bizMap.inputFile} >
              <a href={downloadUrl}>{bizMap.downloadFile}</a>
              <div hidden>
                {
                  getFieldDecorator('filePath', {
                    initialValue: filePath,
                    rules: [{ required: false, message: validMap.validFilePath }],
                  })(
                    <Input placeholder="" hidden />,
                  )
                }
              </div>
              <div className="buss-card-upload" style={{ marginTop: 16, height: 180 }}>
                <Dragger {...uploadProps} >
                  <p className="ant-upload-drag-icon"><Icon type="inbox" /></p>
                  <p className="ant-upload-text">{commonMap.uploadText}</p>
                  <p className="ant-upload-hint">{commonMap.uploadHint}</p>
                </Dragger>
              </div>
            </FormItem>
          </Col>
        </Row>
        <h4 key="btn-split" className="split">&nbsp;</h4>
        <Row key="btn-row">
          <Col span={24} style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit" loading={submiting}>{commonMap.submit}</Button>
            {/*<Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>*/}
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};

MerchantBankcardDroInfoForm.propTypes = {
  loading: PropTypes.bool,
  style: PropTypes.object,
  data: PropTypes.object,
  chnList: PropTypes.array,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
};

MerchantBankcardDroInfoForm.defaultProps = {
  loading: false,
  style: {},
  data: {},
  chnList: [],
  submiting: false,
  formSubmit: noop,
};

export default Form.create()(MerchantBankcardDroInfoForm);
