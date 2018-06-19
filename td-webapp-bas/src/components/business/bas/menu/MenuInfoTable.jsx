import React, { PropTypes } from 'react';
import * as i18n from '../../../../utils/i18n';
import { formatDateString } from '../../../../utils/date';

const MenuInfoTable = (props) => {
  const bizMap = i18n.bizMap('bas/menu');
  const commonMap = i18n.commonMap();
  const { data } = props;
  let menuStatus = '';
  switch (data.menuStatus) {
    case '1': menuStatus = commonMap['status-1']; break;
    case '0': menuStatus = commonMap['status-0']; break;
    default: menuStatus = ''; break;
  }
  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.menuName}:</td>
          <td>{data.menuName}</td>
        </tr>
        <tr>
          <td>{bizMap.menuStatus}:</td>
          <td>{menuStatus}</td>
        </tr>
        <tr>
          <td>{bizMap.menuIcon}:</td>
          <td>{data.menuIcon}</td>
        </tr>
        <tr>
          <td>{bizMap.menuUrl}:</td>
          <td>{data.menuUrl}</td>
        </tr>
        <tr>
          <td>{bizMap.creObjName}:</td>
          <td>{data.creObjName}</td>
          <td>{bizMap.updObjName}:</td>
          <td>{data.updObjName}</td>
        </tr>
        <tr>
          <td>{bizMap.creTim}:</td>
          <td>{formatDateString(data.creTim)}</td>
          <td>{bizMap.updTim}:</td>
          <td>{formatDateString(data.updTim)}</td>
        </tr>
        <tr>
          <td>{bizMap.menuDesc}:</td>
          <td colSpan={3}>{data.menuDesc}</td>
        </tr>
      </tbody>
    </table>
  );
}

MenuInfoTable.propTypes = {
  data: PropTypes.object,
};

MenuInfoTable.defaultProps = {
  data: {},
}

export default MenuInfoTable;
