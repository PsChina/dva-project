import React, { PropTypes } from 'react';
import { Spin, Form, Input, Select, DatePicker, Button, Row, Col, Upload, Icon, Cascader, Popover } from 'antd';
import moment from 'moment';
import * as i18n from '../../../../utils/i18n';
import { callNotice } from '../../../../utils/alert';
import MulUpload from '../../../common/MulUpload';
import cascaderAppPlatform from '../../../../../config/i18n/zh-cn/tms/cascaderAppPlatform.json';
import { getCookie, getToken } from '../../../../utils/storage';
import Config from '../../../../../config/config.json';

import TerModNoQueryForm from '../../../common/TerModNo/TerModNoQueryForm';
import TerModNoPageTable from '../../../common/TerModNo/TerModNoPageTable';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const TerminalAppInfoForm = (props) => {
  const bizMap = i18n.bizMap('tms/terminalApp');
  const dataMap = i18n.bizMap('tms/tmsData');
  const validMap = i18n.bizMap('tms/tmsValid');
  const terMap = i18n.bizMap('tms/terminal');
  const commonMap = i18n.commonMap();
  const uploadUrl = 'rest/tms/common/upload';
  const dateFormat = 'YYYY-MM-DD HH:mm:ss';
  const image = 'data:image/png;base64,';
  const { form, data, loading, submiting, formSubmit, type,
    tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange,
    toggleTerModNoTable, miniFormVisible, rowClickCallback, queryTerModNoList } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };
  const formItemLayout2 = {
    labelCol: { span: 3 },
    wrapperCol: { span: 20 },
  };
  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        if (!dat.FJID_API_1) {
          callNotice(commonMap.warning, validMap.validAppFile, 'warning');
        } else {
          dat.appIssueDate = dat.appIssueDate.format(dateFormat);
          dat.appFile = dat.FJID_API_1;
          dat.appIcon = dat.FJID_PIC_1;
          dat.appDescPic1 = dat.FJID_PIC_01;
          dat.appDescPic2 = dat.FJID_PIC_02;
          dat.appDescPic3 = dat.FJID_PIC_03;
          dat.appDescPic4 = dat.FJID_PIC_04;
          delete dat.FJID_API_1;
          delete dat.FJID_PIC_1;
          delete dat.FJID_PIC_01;
          delete dat.FJID_PIC_02;
          delete dat.FJID_PIC_03;
          delete dat.FJID_PIC_04;
          if (dat.appPlatform && dat.appPlatform.length > 0) {
            dat.appTerTyp = dat.appPlatform[1];
            dat.appPlatform = dat.appPlatform[0];
          }
          formSubmit(dat);
        }
      }
    });
  };

  const handleReset = () => {
    resetFields();
  }
  const appFileProps = {
    multiple: false,
    action: uploadUrl,
    showUploadList: true,
    data: { TABLENAME: 'term_app_inf', LX: 'API', ORDERNUM: '1' },
    onChange(info) {
      const status = info.file.status;
      if (status === 'done') {
        if (info.file.response.FJID_API_1) {
          form.setFieldsValue({ FJID_API_1: info.file.response.FJID_API_1 });
        }
      } else if (status === 'error') {
        callNotice(commonMap.warning, bizMap.fileUploadWarn, 'warning');
      } else if (status === 'removed') {
        form.setFieldsValue({ FJID_API_1: '' });
      }
    },
  };
  const logoFilesAdd = [
    {
      label: 'APP LOGO',
      data: { LX: 'PIC', ORDERNUM: '1' },
    },
  ];
  const logoFilesMod = [
    {
      label: 'APP LOGO',
      editable: true,
      name: 'logo.png',
      url: image + data.fjsrcsPic1,
      data: { LX: 'PIC', ORDERNUM: '1' },
    },
  ];
  const tableName = { TABLENAME: 'term_app_inf' };
  const logoUploadFiles = type === 'add' ? logoFilesAdd : logoFilesMod;
  const uploadDoneCallback = (idx, file) => {
    const rsp = file.file.response;
    const f = `FJSRC_${logoUploadFiles[idx].data.LX}_${logoUploadFiles[idx].data.ORDERNUM}`;
    const n = `FJNAME_${logoUploadFiles[idx].data.LX}_${logoUploadFiles[idx].data.ORDERNUM}`;
    const name = rsp[n];
    const pos = name.lastIndexOf('.');
    // 赋值
    if (rsp.FJID_PIC_1) {
      form.setFieldsValue({ FJID_PIC_1: rsp.FJID_PIC_1 });
    }
    let img = null;
    if (pos > 0) {
      const suffix = name.substring(pos + 1, name.length);
      // 后台使用了fastdfs上传附件
      const prefix = 'group';
      if (rsp[f] !== undefined && rsp[f].substring(0, 5) === prefix) {
        const srcPic = rsp[f].substring(0, rsp[f].length - 4);
        const tk = getToken(getCookie(`${Config.app}_USR`));
        img = `${Config.tmsFileHost + srcPic}?tk=${tk}&typ=${suffix}`;
        // 后台没使用fastdfs上传附件
      } else if ('jpg,jpeg,bmp,png,gif'.indexOf(suffix) !== -1) {
        img = image + file.file.response[f];
      }
    }
    return img;
  };
  const uploadRemoveCallback = (idx, file) => {
    const rsp = file.file.response;
    if (rsp.FJID_PIC_1) {
      form.setFieldsValue({ FJID_PIC_1: '' });
    }
  };
  const descFilesAdd = [
    {
      label: 'appDesc1',
      data: { LX: 'PIC', ORDERNUM: '01' },
    },
    {
      label: 'appDesc2',
      data: { LX: 'PIC', ORDERNUM: '02' },
    },
    {
      label: 'appDesc3',
      data: { LX: 'PIC', ORDERNUM: '03' },
    },
    {
      label: 'appDesc4',
      data: { LX: 'PIC', ORDERNUM: '04' },
    },
  ];
  const descFilesMod = [
    {
      label: 'appDesc1',
      name: 'a.png',
      editable: true,
      url: image + data.fjsrcsPic01,
      data: { LX: 'PIC', ORDERNUM: '01' },
    },
    {
      label: 'appDesc2',
      name: 'b.png',
      editable: true,
      url: image + data.fjsrcsPic02,
      data: { LX: 'PIC', ORDERNUM: '02' },
    },
    {
      label: 'appDesc3',
      name: 'c.png',
      editable: true,
      url: image + data.fjsrcsPic03,
      data: { LX: 'PIC', ORDERNUM: '03' },
    },
    {
      label: 'appDesc4',
      name: 'd.png',
      editable: true,
      url: image + data.fjsrcsPic04,
      data: { LX: 'PIC', ORDERNUM: '04' },
    },
  ];
  const descUploadFiles = type === 'add' ? descFilesAdd : descFilesMod;
  const descUploadDoneCallback = (idx, file) => {
    const rsp = file.file.response;
    const f = `FJSRC_${descUploadFiles[idx].data.LX}_${descUploadFiles[idx].data.ORDERNUM}`;
    const n = `FJNAME_${descUploadFiles[idx].data.LX}_${descUploadFiles[idx].data.ORDERNUM}`;
    const name = rsp[n];
    const pos = name.lastIndexOf('.');
    // 赋值
    if (rsp.FJID_PIC_01) {
      form.setFieldsValue({ FJID_PIC_01: rsp.FJID_PIC_01 });
    }
    if (rsp.FJID_PIC_02) {
      form.setFieldsValue({ FJID_PIC_02: rsp.FJID_PIC_02 });
    }
    if (rsp.FJID_PIC_03) {
      form.setFieldsValue({ FJID_PIC_03: rsp.FJID_PIC_03 });
    }
    if (rsp.FJID_PIC_04) {
      form.setFieldsValue({ FJID_PIC_04: rsp.FJID_PIC_04 });
    }
    let img = null;
    if (pos > 0) {
      const suffix = name.substring(pos + 1, name.length);
      // 后台使用了fastdfs上传附件
      const prefix = 'group';
      if (rsp[f] !== undefined && rsp[f].substring(0, 5) === prefix) {
        const srcPic = rsp[f].substring(0, rsp[f].length - 4);
        const tk = getToken(getCookie(`${Config.app}_USR`));
        img = `${Config.tmsFileHost + srcPic}?tk=${tk}&typ=${suffix}`;
        // 后台没使用fastdfs上传附件
      } else if ('jpg,jpeg,bmp,png,gif'.indexOf(suffix) !== -1) {
        img = image + file.file.response[f];
      }
    }
    return img;
  };
  const descUploadRemoveCallback = (idx, file) => {
    const rsp = file.file.response;
    if (rsp.FJID_PIC_01) {
      form.setFieldsValue({ FJID_PIC_01: '' });
    }
    if (rsp.FJID_PIC_02) {
      form.setFieldsValue({ FJID_PIC_02: '' });
    }
    if (rsp.FJID_PIC_03) {
      form.setFieldsValue({ FJID_PIC_03: '' });
    }
    if (rsp.FJID_PIC_04) {
      form.setFieldsValue({ FJID_PIC_04: '' });
    }
  };


  const toggleModNo = () => {
    toggleTerModNoTable(getFieldsValue());
  };

  const tableProps = {
    tableList,
    tableTotal,
    tableLoading,
    tableCurrentPage,
    rowSelection: null,
    scroll: { y: 150 },
    tablePageChange(next) {
      tablePageChange(next);
    },
    clickCallback(record) {
      rowClickCallback(record);
    },
  };

  const queryFormProps = {
    formSubmit(dat) {
      queryTerModNoList(dat);
    },
  };


  const miniFormContent = [
    <TerModNoQueryForm key="query" {...queryFormProps} />,
    <TerModNoPageTable key="pageTable" {...tableProps} />,
  ];

  const TerModNoAfter = (
    <Popover title={terMap.terModNo} content={miniFormContent} visible={miniFormVisible} placement="bottom">
      <a onClick={toggleModNo}>{commonMap.select}</a>
    </Popover>
  );
  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <Row style={{ display: 'none' }}>
          <Col span={24}>
            <FormItem label={bizMap.appId} {...formItemLayout}>
              {
                getFieldDecorator('appId', {
                  initialValue: data.appId,
                })(
                  <Input placeholder={bizMap.appId} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.appName} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('appName', {
                  initialValue: data.appName,
                  rules: [{ required: true, message: validMap.validAppName }],
                })(
                  <Input placeholder={bizMap.appName} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.appPackage} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('appPackage', {
                  initialValue: data.appPackage,
                  rules: [{ required: true, message: validMap.validAppPackage }],
                })(
                  <Input placeholder={bizMap.appPackage} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.appVersion} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('appVersion', {
                  initialValue: data.appVersion,
                  rules: [{ required: true, message: validMap.validAppVersion }],
                })(
                  <Input placeholder={bizMap.appVersion} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.appIssueDate} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('appIssueDate', {
                  initialValue: data.appIssueDate ? moment(data.appIssueDate, dateFormat) : null,
                  rules: [{ required: true, message: validMap.validAppIssueDate }],
                })(
                  <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{ width: '100%' }} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.appPlatform} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('appPlatform', {
                  initialValue: data.appPlatform ? [data.appPlatform, data.appTerTyp] : null,
                  rules: [{ required: true, message: validMap.validAppPlatform }],
                })(
                  <Cascader options={cascaderAppPlatform} placeholder={bizMap.appPlatform} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.appAutoUpdate} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('appAutoUpdate', {
                  initialValue: data.appAutoUpdate,
                  rules: [{ required: true, message: validMap.validAppAutoUpdate }],
                })(
                  <Select>
                    <Option value="01">{dataMap['appAutoUpdate-01']}</Option>
                    <Option value="02">{dataMap['appAutoUpdate-02']}</Option>
                    <Option value="03">{dataMap['appAutoUpdate-03']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={terMap.terModNo} {...formItemLayout} required>
              {
                getFieldDecorator('terModNo', {
                  initialValue: data.terModNo,
                  rules: [{ required: true, message: validMap.validModNo }],
                })(
                  <Input placeholder={terMap.terModNo} addonAfter={TerModNoAfter} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={terMap.terModId} {...formItemLayout} style={{ display: 'none' }} >
              {
                getFieldDecorator('terModId', {
                  initialValue: data.terModId,
                  rules: [{ required: true, message: validMap.validModId }],
                })(
                  <Input placeholder={terMap.terModNo} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.appFile} {...formItemLayout} required>
              <Upload {...appFileProps}>
                <Button><Icon type="upload" />{commonMap.uploadFile}</Button>
              </Upload>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.appDesc} {...formItemLayout2} hasFeedback>
              {
                getFieldDecorator('appDesc', {
                  initialValue: data.appDesc,
                  rules: [{ required: true, message: validMap.validAppDesc }],
                })(
                  <Input type="textarea" rows={4} placeholder={bizMap.appDesc} />,
                )
              }
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <FormItem label={bizMap.appLogo} {...formItemLayout2} hasFeedback>
              <MulUpload
                url={uploadUrl}
                data={tableName}
                files={logoUploadFiles}
                uploadDoneCallback={uploadDoneCallback.bind(this)}
                uploadRemoveCallback={uploadRemoveCallback.bind(this)}
              />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.appDescPic} {...formItemLayout2} hasFeedback>
              <MulUpload
                url={uploadUrl}
                data={tableName}
                files={descUploadFiles}
                uploadDoneCallback={descUploadDoneCallback.bind(this)}
                uploadRemoveCallback={descUploadRemoveCallback.bind(this)}
              />
            </FormItem>
          </Col>
        </Row>
        <div style={{ display: 'none' }}>
          <Input {...getFieldDecorator('FJID_API_1', { initialValue: data.appFile }) } />
          <Input {...getFieldDecorator('FJID_PIC_1', { initialValue: data.appIcon }) } />
          <Input {...getFieldDecorator('FJID_PIC_01', { initialValue: data.appDescPic1 }) } />
          <Input {...getFieldDecorator('FJID_PIC_02', { initialValue: data.appDescPic2 }) } />
          <Input {...getFieldDecorator('FJID_PIC_03', { initialValue: data.appDescPic3 }) } />
          <Input {...getFieldDecorator('FJID_PIC_04', { initialValue: data.appDescPic4 }) } />
        </div>
        <h4 className="split">&nbsp;</h4>
        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit" loading={submiting}>{commonMap.submit}</Button>
            <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
          </Col>
        </Row>
      </Form>
    </Spin >
  );
}

TerminalAppInfoForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  miniFormVisible: PropTypes.bool,
  toggleTerModNoTable: PropTypes.func,
  rowClickCallback: PropTypes.func,
  queryTerModNoList: PropTypes.func,
  formSubmit: PropTypes.func,
  type: PropTypes.string,
};

TerminalAppInfoForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tablePageChange: noop,
  miniFormVisible: false,
  toggleTerModNoTable: noop,
  rowClickCallback: noop,
  queryTerModNoList: noop,
  formSubmit: noop,
  type: 'add',
}

export default Form.create()(TerminalAppInfoForm);
