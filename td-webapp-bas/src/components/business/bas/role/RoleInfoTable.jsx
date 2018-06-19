import React, { PropTypes } from 'react';
import * as i18n from '../../../../utils/i18n';
import { formatDateString } from '../../../../utils/date';

const RoleInfoTable = (props) => {
  const bizMap = i18n.bizMap('bas/role');
  // const commonMap = i18n.commonMap();
  const { data } = props;
  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.roleName}:</td>
          <td>{data.roleName}</td>
        </tr>
        <tr>
          <td>{bizMap.sysId}:</td>
          <td>{data.sysId}</td>
        </tr>
        <tr>
          <td>{bizMap.creObjName}:</td>
          <td>{data.creObj}</td>
          <td>{bizMap.updObjName}:</td>
          <td>{data.updObj}</td>
        </tr>
        <tr>
          <td>{bizMap.creTim}:</td>
          <td>{formatDateString(data.creTim)}</td>
          <td>{bizMap.updTim}:</td>
          <td>{formatDateString(data.updTim)}</td>
        </tr>
        <tr>
          <td>{bizMap.roleDesc}:</td>
          <td colSpan={3}>{data.roleDesc}</td>
        </tr>
      </tbody>
    </table>
  );
}

RoleInfoTable.propTypes = {
  data: PropTypes.object,
};

RoleInfoTable.defaultProps = {
  data: {},
}

export default RoleInfoTable;
