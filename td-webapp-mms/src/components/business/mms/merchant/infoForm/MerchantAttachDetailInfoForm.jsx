import React, { PropTypes } from 'react';
import { Form, Row, Col } from 'antd';
import * as i18n from '../../../../../utils/i18n';
import MulUpload from '../../../../common/MulUpload';
import Config from '../../../../../../config/config.json';
import { getCookie, getToken } from '../../../../../utils/storage';

const MerchantAttachDetailInfoForm = (props) => {
  const bizMap = i18n.bizMap('mms/merchant');
  const { data, style } = props;
  const image = 'data:image/png;base64,';
  const prefix = 'group';
  const tk = getToken(getCookie(`${Config.app}_USR`));
  let imgPic01 = '';
  let imgPic02 = '';
  let imgPic03 = '';
  let imgPic04 = '';
  let imgPic05 = '';
  let imgPic06 = '';
  let imgPic07 = '';
  let imgPic08 = '';
  let imgPic09 = '';
  let imgPic10 = '';
  let imgPic11 = '';
  let imgPic12 = '';
  let imgPic13 = '';
  for (let idx = 0; idx < 6; idx++) {
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
          case 6: imgPic06 = temp; break;
          case 7: imgPic07 = temp; break;
          case 8: imgPic08 = temp; break;
          case 9: imgPic09 = temp; break;
          case 10: imgPic10 = temp; break;
          case 11: imgPic11 = temp; break;
          case 12: imgPic12 = temp; break;
          case 13: imgPic13 = temp; break;
          default: break;
        }
      }
    }
  }
  const testFiles = [
    {
      label: bizMap.fjidPic01,
      name: 'a.png',
      editable: false,
      url: imgPic01 !== '' ? imgPic01 : image + data.FJSRC_PIC_01,
      data: { LX: 'PIC', ORDERNUM: '01' },
    },
    {
      label: bizMap.fjidPic02,
      name: 'b.png',
      editable: false,
      url: imgPic02 !== '' ? imgPic02 : image + data.FJSRC_PIC_02,
      data: { LX: 'PIC', ORDERNUM: '02' },
    },
    {
      label: bizMap.fjidPic03,
      name: 'c.png',
      editable: false,
      url: imgPic03 !== '' ? imgPic03 : image + data.FJSRC_PIC_03,
      data: { LX: 'PIC', ORDERNUM: '03' },
    },
    {
      label: bizMap.fjidPic04,
      name: 'd.png',
      editable: false,
      url: imgPic04 !== '' ? imgPic04 : image + data.FJSRC_PIC_04,
      data: { LX: 'PIC', ORDERNUM: '04' },
    },
    {
      label: bizMap.fjidPic05,
      name: 'e.png',
      editable: false,
      url: imgPic05 !== '' ? imgPic05 : image + data.FJSRC_PIC_05,
      data: { LX: 'PIC', ORDERNUM: '05' },
    },
    {
      label: bizMap.fjidPic06,
      name: 'f.png',
      editable: false,
      url: imgPic06 !== '' ? imgPic06 : image + data.FJSRC_PIC_06,
      data: { LX: 'PIC', ORDERNUM: '06' },
    },
    {
      label: bizMap.fjidPic07,
      name: 'g.png',
      editable: false,
      url: imgPic07 !== '' ? imgPic07 : image + data.FJSRC_PIC_07,
      data: { LX: 'PIC', ORDERNUM: '07' },
    },
    {
      label: bizMap.fjidPic08,
      name: 'h.png',
      editable: false,
      url: imgPic08 !== '' ? imgPic08 : image + data.FJSRC_PIC_08,
      data: { LX: 'PIC', ORDERNUM: '08' },
    },
    {
      label: bizMap.fjidPic09,
      name: 'i.png',
      editable: false,
      url: imgPic09 !== '' ? imgPic09 : image + data.FJSRC_PIC_09,
      data: { LX: 'PIC', ORDERNUM: '09' },
    },
    {
      label: bizMap.fjidPic10,
      name: 'j.png',
      editable: false,
      url: imgPic10 !== '' ? imgPic10 : image + data.FJSRC_PIC_LOGO,
      data: { LX: 'PIC', ORDERNUM: 'LOGO' },
    },
    {
      label: bizMap.fjidPic11,
      name: 'k.png',
      editable: false,
      url: imgPic11 !== '' ? imgPic11 : image + data.FJSRC_PIC_10,
      data: { LX: 'PIC', ORDERNUM: '10' },
    },
        {
      label: bizMap.fjidPic12,
      name: 'l.png',
      editable: false,
      url: imgPic12 !== '' ? imgPic12 : image + data.FJSRC_PIC_11,
      data: { LX: 'PIC', ORDERNUM: '11' },
    },
   {
      label: bizMap.fjidPic13,
      name: 'm.png',
      editable: false,
      url: imgPic13 !== '' ? imgPic13 : image + data.FJSRC_PIC_12,
      data: { LX: 'PIC', ORDERNUM: '12' },
    },
  ]
  const testImgClick = () => {
    // 对于isNew为true的图片，可以考虑同步请求真实大小的图片地址并返回
    // 不返回或返回null, 则默认展现原img中的图片
  }
  return (
    <Form layout="horizontal" style={style} >
      <Row>
        <p className="br" />
        <Col sm={26} md={26}>
          <MulUpload
            files={testFiles}
            onImgClick={testImgClick.bind(this)}
          />
        </Col>
      </Row>
    </Form>
  );
}

MerchantAttachDetailInfoForm.propTypes = {
  data: PropTypes.object,
};

MerchantAttachDetailInfoForm.defaultProps = {
  data: {},
}

export default MerchantAttachDetailInfoForm;
