import React, { PropTypes } from 'react';
import BASE64 from 'crypto-js/enc-base64';
import ENC_UTF8 from 'crypto-js/enc-utf8';
import { openNotice } from '../../common/antdUtil';
import { agtPath } from '../../config/server';
import { callAjax } from '../../common/request';
import { setLoginInfo, setLocalToken } from '../../common/dataUtil';
import { getUrlVal } from '../../common/util';
import { rspInfo } from '../../common/authConstant';
import './GetTkn.less';

class GetTkn extends React.Component {
  componentDidMount() {
    const lclUrl = window.location.href;
    const tk = BASE64.parse(decodeURI(getUrlVal(lclUrl, 'tk'))).toString(ENC_UTF8);
    const nm = getUrlVal(lclUrl, 'usr');
    const si = getUrlVal(lclUrl, 'sys');
    callAjax({
      url: agtPath.agtAuth.getAgtInfoByToken,
      skip: true,
      data: { token: tk, agtSys: si },
    }, (result) => {
      if (result.rspCod === rspInfo.RSP_SUCCESS) {
        setLoginInfo({ usrName: nm, token: tk, sysId: si, usrAgt: result.rspData.agtId,imageUrl: result.rspData.imageUrl});
        setLocalToken(tk);
        this.context.router.replace('/main');
      } else {
        openNotice('warning', result.rspMsg);
      }
    }, () => {
      this.setState({ loading: false });
      openNotice('error', rspInfo.RSP_NETWORK_ERROR, '提示');
    });
  }

  render() {
    return (
      <div className="cssload-thecube">
        <div className="cssload-cube cssload-c1"></div>
        <div className="cssload-cube cssload-c2"></div>
        <div className="cssload-cube cssload-c4"></div>
        <div className="cssload-cube cssload-c3"></div>
      </div>
    );
  }
}
// 应用contextTypes(不做手工页面跳转则不需要)
GetTkn.contextTypes = {
  router: PropTypes.object.isRequired,
};
export default GetTkn;
