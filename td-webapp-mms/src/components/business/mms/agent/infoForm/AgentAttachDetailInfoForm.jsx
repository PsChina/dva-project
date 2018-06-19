import React, { PropTypes } from 'react';
import { Form, Row, Col } from 'antd';
import * as i18n from '../../../../../utils/i18n';
import MulUpload from '../../../../common/MulUpload';
import Config from '../../../../../../config/config.json';
import { getCookie, getToken } from '../../../../../utils/storage';

const AgentAttachDetailInfoForm = (props) => {
  const bizMap = i18n.bizMap('mms/agent');
  const { agtType, data, style } = props;
  const image = 'data:image/png;base64,';
  const prefix = 'group';
  const tk = getToken(getCookie(`${Config.app}_USR`));
  let imgPic01 = '';
  let imgPic02 = '';
  let imgPic03 = '';
  let imgPic04 = '';
  let imgPic05 = '';
  for (let idx = 0; idx < 5; idx++) {
    const i = `FJSRC_PIC_0${idx + 1}`;
    if (data[i] !== undefined && data[i].substring(0, 5) === prefix) {
      const nPic = `FJNAME_PIC_0${idx + 1}`;
      const name = data[nPic];
      const pos = name.lastIndexOf('.');
      if (pos > 0) {
        const suffix = name.substring(pos + 1, name.length);
        const srcPic = data[i].substring(0, data[i].length - 4);
        const temp = `${Config.fileHost + srcPic}?tk=${tk}&typ=${suffix}`;
        switch (idx + 1) {
          case 1: imgPic01 = temp; break;
          case 2: imgPic02 = temp; break;
          case 3: imgPic03 = temp; break;
          case 4: imgPic04 = temp; break;
          case 5: imgPic05 = temp; break;
          default: break;
        }
      }
    }
  }
  const preAdd = [
    {
      label: bizMap.preModFjsrcPic01,
      name: 'a.png',
      editable: false,
      url: imgPic01 !== '' ? imgPic01 : image + data.FJSRC_PIC_01,
      data: { LX: 'PIC', ORDERNUM: '01' },
    },
    {
      label: bizMap.preModFjsrcPic02,
      name: 'b.png',
      editable: false,
      url: imgPic02 !== '' ? imgPic02 : image + data.FJSRC_PIC_02,
      data: { LX: 'PIC', ORDERNUM: '02' },
    },
    {
      label: bizMap.preModFjsrcPic03,
      name: 'c.png',
      editable: false,
      url: imgPic03 !== '' ? imgPic03 : image + data.FJSRC_PIC_03,
      data: { LX: 'PIC', ORDERNUM: '03' },
    },
    {
      label: bizMap.preModFjsrcPic04,
      name: 'd.png',
      editable: false,
      url: imgPic04 !== '' ? imgPic04 : image + data.FJSRC_PIC_04,
      data: { LX: 'PIC', ORDERNUM: '04' },
    },
    {
      label: bizMap.preModFjsrcPicLOGO,
      name: 'e.png',
      editable: false,
      url: imgPic05 !== '' ? imgPic05 : image + data.FJSRC_PIC_LOGO,

      data: { LX: 'PIC', ORDERNUM: 'LOGO' },
    },
  ]
  const busAdd = [
    {
      label: bizMap.fjsrcPic01,
      name: 'a.png',
      editable: false,
      url: imgPic01 !== '' ? imgPic01 : image + data.FJSRC_PIC_01,
      data: { LX: 'PIC', ORDERNUM: '01' },
    },
    {
      label: bizMap.fjsrcPic02,
      name: 'b.png',
      editable: false,
      url: imgPic02 !== '' ? imgPic02 : image + data.FJSRC_PIC_02,
      data: { LX: 'PIC', ORDERNUM: '02' },
    },
    {
      label: bizMap.fjsrcPic03,
      name: 'c.png',
      editable: false,
      url: imgPic03 !== '' ? imgPic03 : image + data.FJSRC_PIC_03,
      data: { LX: 'PIC', ORDERNUM: '03' },
    },
    {
      label: bizMap.fjsrcPic04,
      name: 'd.png',
      editable: false,
      url: imgPic04 !== '' ? imgPic04 : image + data.FJSRC_PIC_04,
      data: { LX: 'PIC', ORDERNUM: '04' },
    },
    // {
    //   label: bizMap.fjsrcPic05,
    //   name: 'e.png',
    //   editable: false,
    //   url: imgPic05 !== '' ? imgPic05 : image + data.FJSRC_PIC_05,
    //   data: { LX: 'PIC', ORDERNUM: '05' },
    // },
    // {
    //   label: bizMap.fjsrcPic06,
    //   name: 'f.png',
    //   editable: false,
    //   url: imgPic06 !== '' ? imgPic06 : image + data.FJSRC_PIC_06,
    //   data: { LX: 'PIC', ORDERNUM: '06' },
    // },
    {
      label: bizMap.fjsrcPicLOGO,
      name: 'e.png',
      editable: false,
      url: imgPic05 !== '' ? imgPic05 : image + data.FJSRC_PIC_LOGO,
      data: { LX: 'PIC', ORDERNUM: 'LOGO' },
    },
  ]
  const testFiles = agtType === '0' ? preAdd : busAdd;
  const testImgClick = () => {
    // 对于isNew为true的图片，可以考虑同步请求真实大小的图片地址并返回
    // 不返回或返回null, 则默认展现原img中的图片
  }
  return (
    <Form layout="horizontal" style={style} >
      <Row>
        <p className="br" />
        <Col sm={24} md={24}>
          <MulUpload
            files={testFiles}
            onImgClick={testImgClick.bind(this)}
          />
        </Col>
      </Row>
    </Form>
  );
}

AgentAttachDetailInfoForm.propTypes = {
  data: PropTypes.object,
};

AgentAttachDetailInfoForm.defaultProps = {
  data: {},
}

export default AgentAttachDetailInfoForm;
