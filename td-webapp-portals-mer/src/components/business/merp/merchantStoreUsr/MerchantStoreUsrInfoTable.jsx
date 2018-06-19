import React, { PropTypes } from 'react';
import * as i18n from '../../../../utils/i18n';

const bizMap = i18n.bizMap('merp/merchantStore');
const MerchantStoreUsrInfoTable = (props) => {
  const { data } = props;

  const braRole = (role) => {
    let braRole = '';
    switch (role) {
      case '1':
        braRole = bizMap['braRole-0'];
        break;
      case '2':
        braRole = bizMap['braRole-1'];
        break;
      default: braRole = '';
        break;
    }
    return braRole;
  };

  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.usrNo}:</td>
          <td>{data.usrNo}</td>
          <td>{bizMap.usrId}:</td>
          <td>{data.usrId}</td>
        </tr>
        <tr>
          {/*<td>{bizMap.braUser}:</td>
          <td>{data.braUser}</td>*/}
          <td>{bizMap.merId}:</td>
          <td>{data.merId}</td>
          <td>{bizMap.braUserName}:</td>
          <td>{data.braUserName}</td>
        </tr>
        <tr>
          <td>{bizMap.braName}:</td>
          <td>{data.braName}</td>
          <td>{bizMap.braRole}:</td>
          <td>{braRole(data.braRole)}</td>
        </tr>
      </tbody>
    </table>
  );
}

MerchantStoreUsrInfoTable.propTypes = {
  data: PropTypes.object,
};

MerchantStoreUsrInfoTable.defaultProps = {
  data: {},
}

export default MerchantStoreUsrInfoTable;
