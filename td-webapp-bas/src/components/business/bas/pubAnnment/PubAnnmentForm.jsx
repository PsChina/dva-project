import React, { PropTypes } from 'react';
import { Spin, Form, Input, Select, Button, Row, Col, Upload, Icon } from 'antd';
import * as i18n from '../../../../utils/i18n';
import { callNotice } from '../../../../utils/alert';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const Dragger = Upload.Dragger;
const PubAnnmentForm = (props) => {
  const bizMap = i18n.bizMap('bas/pubAnnment');
  const commonMap = i18n.commonMap();
  const uploadUrl = 'rest/bas/common/upload';
  const { form, data, loading, submiting, formSubmit, type } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        formSubmit(getFieldsValue());
      }
    });
  };

  const handleReset = () => {
    resetFields();
  }
  const uploadProps = {
    action: uploadUrl,
    name: 'file',
    data: { TABLENAME: 'pub_annment_info', LX: 'PIC', ORDERNUM: '1' },
    multiple: true,
    showUploadList: true,
    onChange(info) {
      console.log(info);
      const status = info.file.status;
      if (status === 'done') {
        let ids = '';
        if (getFieldsValue().attachmentIds) {
          ids = `${getFieldsValue().attachmentIds},${info.file.response.FJID_PIC_1}`;
        } else {
          ids = info.file.response.FJID_PIC_1;
        }
        form.setFieldsValue({ attachmentIds: ids });
        callNotice(commonMap.warning, bizMap.fileUploadSuccess, 'success');
      } else if (status === 'error') {
        callNotice(commonMap.warning, bizMap.fileUploadWarn, 'warning');
      }
      if (status === 'removed') {
        form.setFieldsValue({ ATTACHMENT_IDS: info.file.response.FJID_API_1 });
      }
    },
  };

  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <Row style={{ display: 'none' }}>
          <Col span={24}>
            <FormItem label={bizMap.annId} {...formItemLayout}>
              {
                getFieldDecorator('annId', {
                  initialValue: data.annId,
                })(
                  <Input />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.title} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('title', {
                  initialValue: data.title,
                  rules: [{
                    required: true, message: bizMap.validTitle,
                  }],
                })(
                  <Input maxLength={50} placeholder={bizMap.title} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.content} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('content', {
                  initialValue: data.content,
                  rules: [{
                    required: true, message: bizMap.validContent,
                  }],
                })(
                  <Input maxLength={200} type="textarea" rows={4} placeholder={bizMap.content} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.priority} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('priority', {
                  initialValue: data.priority,
                  rules: [{
                    required: true, message: bizMap.validPriority,
                  }],
                })(
                  <Select>
                    <Option value="">&nbsp;</Option>
                    <Option value="01">{bizMap['priority-01']}</Option>
                    <Option value="02">{bizMap['priority-02']}</Option>
                    <Option value="03">{bizMap['priority-03']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.annType} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('annType', {
                  initialValue: data.annType,
                  rules: [{
                    required: true, message: bizMap.validAnnType,
                  }],
                })(
                  <Select>
                    <Option value="">&nbsp;</Option>
                    <Option value="000">{bizMap['annType-000']}</Option>
                    <Option value="001">{bizMap['annType-001']}</Option>
                    <Option value="002">{bizMap['annType-002']}</Option>
                    <Option value="003">{bizMap['annType-003']}</Option>
                    <Option value="004">{bizMap['annType-004']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.issuestate} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('issuestate', {
                  initialValue: data.issuestate,
                  rules: [{
                    required: true, message: bizMap.issuestate,
                  }],
                })(
                  <Select>
                    <Option value="">&nbsp;</Option>
                    <Option value="0">{bizMap['issuestate-0']}</Option>
                    <Option value="1">{bizMap['issuestate-1']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem {...formItemLayout} label={commonMap.uploadFile} >
              <div hidden>
                <Input {...getFieldDecorator('attachmentIds')} />
              </div>
              <Dragger {...uploadProps} >
                <p className="ant-upload-drag-icon"><Icon type="inbox" /></p>
                {
                  type === 'add' ?
                    <p className="ant-upload-text">{commonMap.uploadText}</p>
                    :
                    <p className="ant-upload-text">{commonMap.reuploadText}</p>
                }
                <p className="ant-upload-hint">{commonMap.uploadHint}</p>
              </Dragger>
            </FormItem>
          </Col>
        </Row>
        <h4>&nbsp;</h4>
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

PubAnnmentForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
};

PubAnnmentForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
}

export default Form.create()(PubAnnmentForm);
