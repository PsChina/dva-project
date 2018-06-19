import React, { PropTypes } from 'react';
import { Form } from 'antd';
import * as i18n from '../../../../../utils/i18n';

const MerchantUsrDetailInfoForm = (props) => {
  const bizMap = i18n.bizMap('mms/merchant');
  const { data } = props;
  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.usrId}:</td>
          <td>{data.usrId}</td>
          <td>{bizMap.merId}:</td>
          <td>{data.merId}</td>
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
          <td>{data.usrStatus === '0' ? bizMap['usrStatus-01'] : bizMap['usrStatus-02']}</td>
        </tr>
        <tr>
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

MerchantUsrDetailInfoForm.propTypes = {
  data: PropTypes.object,
};

MerchantUsrDetailInfoForm.defaultProps = {
  data: {},
  submiting: false,
}

export default Form.create()(MerchantUsrDetailInfoForm);
