import React, { PropTypes } from 'react';
import * as i18n from '../../../../utils/i18n';

const TerminalModelInfoTable = (props) => {
  const bizMap = i18n.bizMap('tms/terminalModel');
  const dataMap = i18n.bizMap('tms/tmsData');
  const { data } = props;
  let terTyp;
  switch (data.terTyp) {
    case '01': terTyp = dataMap['terTyp-01']; break;
    case '02': terTyp = dataMap['terTyp-02']; break;
    case '03': terTyp = dataMap['terTyp-03']; break;
    case '04': terTyp = dataMap['terTyp-04']; break;
    case '05': terTyp = dataMap['terTyp-05']; break;
    default: terTyp = '';
  }
  let terSubTyp;
  switch (data.terSubTyp) {
    case '00': terSubTyp = dataMap['terSubTyp-00']; break;
    case '01': terSubTyp = dataMap['terSubTyp-01']; break;
    case '02': terSubTyp = dataMap['terSubTyp-02']; break;
    default: terSubTyp = '';
  }
  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.copNam}:</td>
          <td>{data.copNam}</td>
          <td>{bizMap.terModNo}:</td>
          <td>{data.terModNo}</td>
        </tr>
        <tr>
          <td>{bizMap.terTyp}:</td>
          <td>{terTyp}</td>
          <td>{bizMap.terSubTyp}:</td>
          <td>{terSubTyp}</td>
        </tr>
      </tbody>
    </table>
  );
}

TerminalModelInfoTable.propTypes = {
  data: PropTypes.object,
};

TerminalModelInfoTable.defaultProps = {
  data: {},
}

export default TerminalModelInfoTable;
