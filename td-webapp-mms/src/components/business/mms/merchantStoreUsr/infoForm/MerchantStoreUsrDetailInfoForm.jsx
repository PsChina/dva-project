import React, { PropTypes } from 'react';
import { Form } from 'antd';
import * as i18n from '../../../../../utils/i18n';

const MerchantStoreUsrDetailInfoForm = (props) => {
  const bizMap = i18n.bizMap('mms/merchantStore');
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
          <td>{bizMap.braUser}:</td>
          <td>{data.braUser}</td>
          <td>{bizMap.braUserName}:</td>
          <td>{data.braUserName}</td>
        </tr>
        <tr>
          <td>{bizMap.braName}:</td>
          <td>{data.braName}</td>
          <td>{bizMap.merName}:</td>
          <td>{data.merName}</td>
        </tr>
        <tr>
          <td>{bizMap.braRole}:</td>
          <td>{data.braRole === '1' ? bizMap['braRole-0'] : bizMap['braRole-1']}</td>
        </tr>
      </tbody>
    </table>
  );
}

MerchantStoreUsrDetailInfoForm.propTypes = {
  data: PropTypes.object,
};

MerchantStoreUsrDetailInfoForm.defaultProps = {
  data: {},
  submiting: false,
}

export default Form.create()(MerchantStoreUsrDetailInfoForm);
