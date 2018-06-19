import React, { PropTypes } from 'react';
import * as i18n from '../../../../utils/i18n';

const MerchantInfoTable = (props) => {
  const bizMap = i18n.bizMap('bms/merchant');
  const { data } = props;
  return (
    <table className="detail_table" style={{ width: '100%' }}>
      <tbody>
        <tr>
          <td>{bizMap.merId}:</td>
          <td>{data.merId}</td>
          <td>{bizMap.merName}:</td>
          <td colSpan={3}>{data.merName}</td>
        </tr>
        <tr>
          <td>{bizMap.merSname}:</td>
          <td>{data.merSname}</td>
          <td>{bizMap.merType}</td>
          <td>{bizMap[`merType-${data.merType}`]}</td>
          <td>{bizMap.merStatus}:</td>
          <td>{bizMap[`merStatus-${data.merStatus}`]}</td>
        </tr>
        <tr>
          <td>{bizMap.bizScope}:</td>
          <td colSpan={3}>{data.bizScope}</td>
        </tr>
        <tr>
          <td>{bizMap.merPost}:</td>
          <td>{data.merPost}</td>
          <td>{bizMap.merAddr}:</td>
          <td colSpan={3}>{data.merAddr}</td>
        </tr>
        <tr>
          <td>{bizMap.merPhone}:</td>
          <td>{data.merPhone}</td>
          <td>{bizMap.merMobile}:</td>
          <td>{data.merMobile}</td>
        </tr>
        <tr>
          <td>{bizMap.merEmail}:</td>
          <td>{data.merEmail}</td>
          <td>{bizMap.merFax}:</td>
          <td>{data.merFax}</td>
        </tr>
        <tr>
          <td>{bizMap.stlAc}:</td>
          <td>{data.stlAc}</td>
          <td>{bizMap.stlName}:</td>
          <td>{data.stlName}</td>
        </tr>
        <tr>
          <td>{bizMap.stlBnkName}:</td>
          <td>{data.stlBnkName}</td>
          <td>{bizMap.stlCnapsName}:</td>
          <td colSpan={3}>{data.stlCnapsName}</td>
        </tr>
      </tbody>
    </table>
  );
}

MerchantInfoTable.propTypes = {
  data: PropTypes.object,
};

MerchantInfoTable.defaultProps = {
  data: {},
}

export default MerchantInfoTable;
