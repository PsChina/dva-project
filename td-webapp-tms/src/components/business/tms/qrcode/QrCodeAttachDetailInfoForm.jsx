import React, { PropTypes } from 'react';
import { Form, Row, Col } from 'antd';
import * as i18n from '../../../../utils/i18n';
import MulUpload from '../../../common/MulUpload';
import Config from '../../../../../config/config.json';
import { getCookie, getToken } from '../../../../utils/storage';

const QrCodeAttachDetailInfoForm = (props) => {
  const bizMap = i18n.bizMap('tms/qrCode');
  const { data, style } = props;
  const image = 'data:image/png;base64,';
  const prefix = 'group';
  const tk = getToken(getCookie(`${Config.app}_USR`));
  let imgPic01 = '';
  for (let idx = 0; idx < 1; idx++) {
    const i = `FJSRC_PIC_${idx + 1}`;
    if (data[i] !== undefined && data[i].substring(0, 5) === prefix) {
      const nPic = `FJNAME_PIC_${idx + 1}`;
      const name = data[nPic];
      const pos = name.lastIndexOf('.');
      if (pos > 0) {
        const suffix = name.substring(pos + 1, name.length);
        const srcPic = data[i].substring(0, data[i].length - 4);
        const temp = `${Config.fileHost + srcPic}?tk=${tk}&typ=${suffix}`;
        switch (idx + 1) {
          case 1: imgPic01 = temp; break;
          default: break;
        }
      }
    }
  }
  const preAdd = [
    {
      label: bizMap.qrCodeFjsrcPic1,
      name: 'a.png',
      editable: false,
      url: imgPic01 !== '' ? imgPic01 : image + data.FJSRC_PIC_1,
      data: { LX: 'PIC', ORDERNUM: '1' },
    },
  ]

  const testFiles = preAdd;
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

QrCodeAttachDetailInfoForm.propTypes = {
  data: PropTypes.object,
};

QrCodeAttachDetailInfoForm.defaultProps = {
  data: {},
}

export default QrCodeAttachDetailInfoForm;
