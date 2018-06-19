import React, { PropTypes } from 'react';
import * as i18n from '../../../../utils/i18n';
import { formatDateString } from '../../../../utils/date';

const UserInfoTable = (props) => {
  const bizMap = i18n.bizMap('bas/user');
  // const commonMap = i18n.commonMap();
  const { data } = props;
  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.usrName}:</td>
          <td>{data.usrName}</td>
        </tr>
        <tr>
          <td>{bizMap.usrRealName}:</td>
          <td>{data.usrRealName}</td>
        </tr>
        <tr>
          <td>{bizMap.orgName}:</td>
          <td>{data.orgName}</td>
        </tr>
        <tr>
          <td>{bizMap.usrEmail}:</td>
          <td>{data.usrEmail}</td>
        </tr>
        <tr>
          <td>{bizMap.usrMobile}:</td>
          <td>{data.usrMobileAreaCode}-{data.usrMobile}</td>
        </tr>
        <tr>
          <td>{bizMap.lastLoginTime}:</td>
          <td>{data.lastLoginTime}</td>
        </tr>
        <tr>
          <td>{bizMap.creTim}:</td>
          <td>{formatDateString(data.creTim)}</td>
        </tr>
        <tr>
          <td>{bizMap.updTim}:</td>
          <td>{formatDateString(data.updTim)}</td>
        </tr>
        <tr>
          <td>{bizMap.creObjName}:</td>
          <td>{data.creObj}</td>
          <td>{bizMap.updObjName}:</td>
          <td>{data.updObj}</td>
        </tr>
        <tr>
          <td>{bizMap.usrDesc}:</td>
          <td colSpan={3}>{data.usrDesc}</td>
        </tr>
      </tbody>
    </table>
  );
}

UserInfoTable.propTypes = {
  data: PropTypes.object,
};

UserInfoTable.defaultProps = {
  data: {},
}

export default UserInfoTable;
