import React, { PropTypes } from 'react';
import * as i18n from '../../../../utils/i18n';
import { formatDateString } from '../../../../utils/date';

const LogInfoTable = (props) => {
  const bizMap = i18n.bizMap('bas/log');
  // const commonMap = i18n.commonMap();
  const { data } = props;
  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.path}:</td>
          <td>{data.path}</td>
          <td>{bizMap.date}:</td>
          <td>{formatDateString(data.date)}</td>
        </tr>
        <tr>
          <td>{bizMap.className}:</td>
          <td>{data.className}</td>
          <td>{bizMap.logLevel}:</td>
          <td>{data.logLevel}</td>
        </tr>
        <tr>
          <td>{bizMap.detail}:</td>
          <td colSpan={3}>{data.detail}</td>
        </tr>
      </tbody>
    </table>
  );
}

LogInfoTable.propTypes = {
  data: PropTypes.object,
};

LogInfoTable.defaultProps = {
  data: {},
}

export default LogInfoTable;
