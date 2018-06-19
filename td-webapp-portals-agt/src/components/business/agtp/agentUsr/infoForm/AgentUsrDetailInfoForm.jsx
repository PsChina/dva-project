import React, { PropTypes } from 'react';
import { Form } from 'antd';
import * as i18n from '../../../../../utils/i18n';

const AgentUsrDetailInfoForm = (props) => {
  const bizMap = i18n.bizMap('agtp/agent');
  const commonMap = i18n.commonMap();
  const { data } = props;
  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.usrId}:</td>
          <td>{data.usrId}</td>
          <td>{bizMap.agtId}:</td>
          <td>{data.agtId}</td>
        </tr>
        <tr>
          <td>{bizMap.usrName}:</td>
          <td>{data.usrName}</td>
          <td>{bizMap.usrRealName}:</td>
          <td>{data.usrRealName}</td>
        </tr>
        <tr>
          <td>{bizMap.usrEmail}:</td>
          <td>{data.usrEmail}</td>
          <td>{bizMap.usrMobile}:</td>
          <td>{data.usrMobileAreaCode}-{data.usrMobile}</td>
        </tr>
        <tr>
          <td>{bizMap.usrDesc}:</td>
          <td>{data.usrDesc}</td>
          <td>{bizMap.usrStatus}:</td>
          <td>{data.usrStatus === '0' ? commonMap['status-0'] : commonMap['status-1']}</td>
        </tr>
        <tr>
          <td>{bizMap.isLock}:</td>
          <td>{data.isLock}</td>
          <td>{bizMap.creTim}:</td>
          <td>{data.creTim}</td>
        </tr>
        <tr>
          <td>{bizMap.creObj}:</td>
          <td>{data.creObj}</td>
        </tr>
        <tr>
          <td>{bizMap.updObj}:</td>
          <td>{data.updObj}</td>
          <td>{bizMap.updTim}:</td>
          <td>{data.updTim}</td>
        </tr>
      </tbody>
    </table>
  );
}

AgentUsrDetailInfoForm.propTypes = {
  data: PropTypes.object,
};

AgentUsrDetailInfoForm.defaultProps = {
  data: {},
  submiting: false,
}

export default Form.create()(AgentUsrDetailInfoForm);
