import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import * as i18n from '../../../../../utils/i18n';
import MulUpload from '../../../../common/MulUpload';
import Config from '../../../../../../config/config.json';
import { getCookie, getToken } from '../../../../../utils/storage';

const noop = () => { };

const MerchantStoreStepForm2 = (props) => {
  const uploadUrl = 'rest/agtp/common/upload';
  const testData = { TABLENAME: 'store_info' };
  const image = 'data:image/png;base64,';
  const bizMap = i18n.bizMap('agtp/merchantStore');
  const commonMap = i18n.commonMap();
  const { form, style, submiting, nextClick, prevClick } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields } = form;
  const testFiles = [
    {
      label: bizMap.fjsrcPic01,
      data: { LX: 'PIC', ORDERNUM: '01' },
    },
    {
      label: bizMap.fjsrcPic02,
      data: { LX: 'PIC', ORDERNUM: '02' },
    },
    {
      label: bizMap.fjsrcPic03,
      data: { LX: 'PIC', ORDERNUM: '03' },
    },
    {
      label: bizMap.fjsrcPic04,
      data: { LX: 'PIC', ORDERNUM: '04' },
    },
    {
      label: bizMap.fjsrcPic05,
      data: { LX: 'PIC', ORDERNUM: '05' },
    },
    {
      label: bizMap.fjsrcPic06,
      data: { LX: 'PIC', ORDERNUM: '06' },
    },
  ]
  const testDoneCallback = (idx, file) => {
    const rsp = file.file.response;
    const f = `FJSRC_${testFiles[idx].data.LX}_${testFiles[idx].data.ORDERNUM}`;
    const n = `FJNAME_${testFiles[idx].data.LX}_${testFiles[idx].data.ORDERNUM}`;
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
    if (rsp.FJID_PIC_05) {
      form.setFieldsValue({ FJID_PIC_05: rsp.FJID_PIC_05 });
    }
    if (rsp.FJID_PIC_06) {
      form.setFieldsValue({ FJID_PIC_06: rsp.FJID_PIC_06 });
    }
    let img = null;
    if (pos > 0) {
      const suffix = name.substring(pos + 1, name.length);
      // 后台使用了fastdfs上传附件
      const prefix = 'group';
      if (rsp[f] !== undefined && rsp[f].substring(0, 5) === prefix) {
        const srcPic = rsp[f].substring(0, rsp[f].length - 4);
        const tk = getToken(getCookie(`${Config.app}_USR`));
        img = Config.agtpFileHost + srcPic + '?tk=' + tk + '&typ=' + suffix;
      // 后台没使用fastdfs上传附件
      } else {
        if ('jpg,jpeg,bmp,png,gif'.indexOf(suffix) !== -1) {
          img = image + file.file.response[f];
        }
      }
    }
    return img;
  }
  const testImgClick = () => {
    // 对于isNew为true的图片，可以考虑同步请求真实大小的图片地址并返回
    // 不返回或返回null, 则默认展现原img中的图片
  }
  const testRemoveCallback = (idx, file) => {
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
    if (rsp.FJID_PIC_05) {
      form.setFieldsValue({ FJID_PIC_05: '' });
    }
    if (rsp.FJID_PIC_06) {
      form.setFieldsValue({ FJID_PIC_06: '' });
    }
  }
  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        dat.attachmentIds = [dat.FJID_PIC_01, dat.FJID_PIC_02, dat.FJID_PIC_03, dat.FJID_PIC_04, dat.FJID_PIC_05, dat.FJID_PIC_06].toString();
        nextClick(dat);
      }
      resetFields();
    });
  };
  return (
    <Form layout="horizontal" style={style} onSubmit={handleSubmit}>
      <Row>
        <p className="br" />
        <Col sm={24} md={24}>
          <MulUpload
            url={uploadUrl}
            data={testData}
            files={testFiles}
            onImgClick={testImgClick.bind(this)}
            uploadDoneCallback={testDoneCallback.bind(this)}
            uploadRemoveCallback={testRemoveCallback.bind(this)}
          />
        </Col>
        <Col sm={24} md={24}>
          <div style={{ display: 'none' }}>
            <Input {...getFieldDecorator('FJID_PIC_01', { initialValue: form.FJID_PIC_01 }) } />
            <Input {...getFieldDecorator('FJID_PIC_02', { initialValue: form.FJID_PIC_02 }) } />
            <Input {...getFieldDecorator('FJID_PIC_03', { initialValue: form.FJID_PIC_03 }) } />
            <Input {...getFieldDecorator('FJID_PIC_04', { initialValue: form.FJID_PIC_04 }) } />
            <Input {...getFieldDecorator('FJID_PIC_05', { initialValue: form.FJID_PIC_05 }) } />
            <Input {...getFieldDecorator('FJID_PIC_06', { initialValue: form.FJID_PIC_06 }) } />
          </div>
        </Col>
      </Row>
      <h4 key="btn-split" className="split">&nbsp;</h4>
      <Row key="btn-row">
        <Col span={24} style={{ textAlign: 'center' }}>
          <Button onClick={prevClick} style={{ marginRight: 16 }}>{commonMap.prevStep}</Button>
          <Button type="primary" htmlType="submit" loading={submiting}>{commonMap.finish}</Button>
        </Col>
      </Row>
    </Form>
  );
}

MerchantStoreStepForm2.propTypes = {
  style: PropTypes.object,
  data: PropTypes.object,
  submiting: PropTypes.bool,
  nextClick: PropTypes.func,
  prevClick: PropTypes.func,
};

MerchantStoreStepForm2.defaultProps = {
  style: {},
  data: {},
  submiting: false,
  nextClick: noop,
  prevClick: noop,
}

export default Form.create()(MerchantStoreStepForm2);

