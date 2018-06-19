import React, { PropTypes } from 'react';
import { Spin, Form, Input, Button, Row, Col, Upload, Icon } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const Dragger = Upload.Dragger;
const OrderTransRecInfoForm = (props) => {
  // const dateFormat = 'YYYY-MM-DD';
  const bizMap = i18n.bizMap('oms/orderTransRec');
  const commonMap = i18n.commonMap();
  const { form, data, loading, submiting, formSubmit,
    uploadFile, changeFileData, filePath, fileList } = props;
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
        console.log('dat =>', dat);
        formSubmit(dat);
      }
    });
  };

  const handleReset = () => {
    resetFields();
  }
  const getFileSuffix = (name) => {
    let suffix = '';
    const pos = name ? name.lastIndexOf('.') : -1;
    if (pos > 0) {
      suffix = name.substring(pos + 1);
    }
    return suffix;
  }
  const uploadProps = {
    name: 'file',
    multiple: false,
    showUploadList: true,
    action: '',
    data: { TABLENAME: 'TERM_POS_STORE_INF', LX: 'EXCL', ORDERNUM: '1' },
    beforeUpload: (file, list) => {
      // 在此判断file的类型和后缀名，可参考 TdMulUploader 中的 getFileSuffix 方法
      console.log(file);
      console.log(list);
      const suffix = getFileSuffix(file.name);
      if ('xlsx,xlsm,xlt'.indexOf(suffix) !== -1) {
        console.log('上传成功');
      } else {
        console.log('请上传EXCL文件');
      }
    },
    onChange(info) {
      console.log('info==', info);
      const status = info.file.status;
      const fileData = {};
      if (status === 'uploading') {
        const suffix = getFileSuffix(info.file.name);
        if ('xlsx,xlsm,xlt'.indexOf(suffix) !== -1) {
          // fileData.filePath = info.file.file.response.FJ_PATH;
          fileData.fileList = info.fileList;
          changeFileData(fileData, getFieldsValue());
        }
      } else if (status === 'error') {
        console.log('文件上传失败');
      } else if (status === 'removed') {
        console.log('文件移除');
        fileData.filePath = '';
        fileData.fileList = [];
        changeFileData(fileData, getFieldsValue());
      }
    },
  };
  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.seqNo} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('seqNo', {
                  initialValue: data.seqNo,
                })(
                  <Input placeholder={bizMap.seqNo} disabled />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.recId} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('recId', {
                  initialValue: data.recId,
                })(
                  <Input placeholder={bizMap.recId} disabled />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.validDate} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('validDate', {
                  initialValue: data.validDate,
                })(
                  <Input placeholder={bizMap.validDate} disabled />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.operDesc} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('operDesc', {
                  initialValue: data.operDesc,
                })(
                  <Input type="textarea" rows="4" placeholder={bizMap.operDesc} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem {...formItemLayout} label={bizMap.inputFile} >
              <a href="javascript:void(0);">{bizMap.downloadFile}</a>
              {
                getFieldDecorator('filePath', {
                  initialValue: filePath,
                })(
                  <Input placeholder="" />,
                )
              }
              <Dragger {...uploadProps} fileList={fileList} >
                <p className="ant-upload-drag-icon"><Icon type="inbox" /></p>
                <p className="ant-upload-text">{commonMap.uploadText}</p>
                <p className="ant-upload-hint">{commonMap.uploadHint}</p>
              </Dragger>
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

OrderTransRecInfoForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
  uploadFile: PropTypes.func,
  changeFileData: PropTypes.func,
  filePath: PropTypes.string,
  fileList: PropTypes.array,
};

OrderTransRecInfoForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
  uploadFile: noop,
  changeFileData: noop,
  filePath: '',
  fileList: [],
}

export default Form.create()(OrderTransRecInfoForm);
