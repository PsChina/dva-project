import React, { PropTypes } from 'react';
import * as i18n from '../../../../utils/i18n';
import { formatDateString } from '../../../../utils/date';

const TerminalFirmwareInfoTable = (props) => {
  const bizMap = i18n.bizMap('tms/terminalFirmware');
  const dataMap = i18n.bizMap('tms/tmsData');
  const { data } = props;
  let verTyp;
  switch (data.verTyp) {
    case '1': verTyp = dataMap['verTyp-1']; break;
    case '2': verTyp = dataMap['verTyp-2']; break;
    default: verTyp = '';
  }
  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.verNo}:</td>
          <td>{data.verNo}</td>
        </tr>
        <tr>
          <td>{bizMap.verTyp}:</td>
          <td>{verTyp}</td>
        </tr>
        <tr>
          <td>{bizMap.copNam}:</td>
          <td>{data.copNam}</td>
        </tr>
        <tr>
          <td>{bizMap.terModNo}:</td>
          <td>{data.terModNo}</td>
        </tr>
        <tr>
          <td>{bizMap.verTim}:</td>
          <td>{formatDateString(data.verTim)}</td>
        </tr>
        <tr>
          <td>{bizMap.verRemark}:</td>
          <td>{data.verRemark}</td>
        </tr>
      </tbody>
    </table>
  );
}

TerminalFirmwareInfoTable.propTypes = {
  data: PropTypes.object,
};

TerminalFirmwareInfoTable.defaultProps = {
  data: {},
}

export default TerminalFirmwareInfoTable;
