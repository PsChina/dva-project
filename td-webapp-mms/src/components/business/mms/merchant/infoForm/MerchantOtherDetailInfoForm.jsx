import React, { PropTypes } from 'react';
import * as i18n from '../../../../../utils/i18n';
import { formatDateString } from '../../../../../utils/date';

const MerchantOtherDetailInfoForm = (props) => {
  const bizMap = i18n.bizMap('mms/merchant');
  const { data } = props;

  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.merRegId}:</td>
          <td>{data.merRegId}</td>
          <td>{bizMap.merRegDat}:</td>
          <td>{formatDateString(data.merRegDat)}</td>
        </tr>
        <tr>
          <td>{bizMap.merRegAddress}:</td>
          <td>{data.merRegAddress}</td>
        </tr>
        <tr>
          <td>{bizMap.merBizAddress}:</td>
          <td>{data.merBizAddress}</td>
        </tr>
        <tr>
          <td>{bizMap.merOwner}:</td>
          <td>{data.merOwner}</td>
          <td>{bizMap.merOwnerBirth}:</td>
          <td>{formatDateString(data.merOwnerBirth)}</td>
        </tr>
        <tr>
          <td>{bizMap.merOwnerAddr}:</td>
          <td>{data.merOwnerAddr}</td>
        </tr>
        <tr>
          <td>{bizMap.merOwnerPassport}:</td>
          <td>{data.merOwnerPassport}</td>
          <td>{bizMap.merOwnerDivingLicense}:</td>
          <td>{data.merOwnerDivingLicense}</td>
        </tr>
        <tr>
          <td>{bizMap.merSupervisorName}:</td>
          <td>{data.merSupervisorName}</td>
          <td>{bizMap.merSupervisorBirth}</td>
          <td>{formatDateString(data.merSupervisorBirth)}</td>
        </tr>
        <tr>
          <td>{bizMap.merSupervisorAddr}:</td>
          <td>{data.merSupervisorAddr}</td>
        </tr>
        <tr>
          <td>{bizMap.merSupervisorPassport}:</td>
          <td>{data.merSupervisorPassport}</td>
          <td>{bizMap.merSupervisorDivingLicense}:</td>
          <td>{data.merSupervisorDivingLicense}</td>
        </tr>
      </tbody>
    </table>
  );
}

MerchantOtherDetailInfoForm.propTypes = {
  data: PropTypes.object,
};

MerchantOtherDetailInfoForm.defaultProps = {
  data: {},
}

export default MerchantOtherDetailInfoForm;
