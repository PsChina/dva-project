import React, { PropTypes } from 'react';
import * as i18n from '../../../../utils/i18n';
import { formatDateString } from '../../../../utils/date';

const TerminalFirmwareInfoTable = (props) => {
  const bizMap = i18n.bizMap('tms/terminal');
  const dataMap = i18n.bizMap('tms/tmsData');
  const commonMap = i18n.commonMap();
  const { data } = props;
  let terStatue;
  switch (data.terStatue) {
    case '0': terStatue = commonMap['status-0']; break;
    case '1': terStatue = commonMap['status-1']; break;
    default: terStatue = '';
  }
  let terTyp;
  switch (data.terTyp) {
    case '01': terTyp = dataMap['terTyp-01']; break;
    case '02': terTyp = dataMap['terTyp-02']; break;
    case '03': terTyp = dataMap['terTyp-03']; break;
    case '04': terTyp = dataMap['terTyp-04']; break;
    case '05': terTyp = dataMap['terTyp-05']; break;
    default: terTyp = '';
  }
  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.terId}:</td>
          <td>{data.terId}</td>
          <td>{bizMap.terPhyno}:</td>
          <td>{data.terPhyno}</td>
        </tr>
        <tr>
          <td>{bizMap.copNam}:</td>
          <td>{data.copNam}</td>
          <td>{bizMap.terModNo}:</td>
          <td>{(data.terModNo)}</td>
        </tr>
        <tr>
          <td>{bizMap.terTyp}:</td>
          <td>{terTyp}</td>
          <td>{bizMap.terStatue}:</td>
          <td>{terStatue}</td>
        </tr>
        <tr>
          <td>{bizMap.braName}:</td>
          <td>{data.terBraName}</td>
          <td>{bizMap.merName}:</td>
          <td>{data.terMerName}</td>
        </tr>
        <tr>
          <td>{bizMap.agtName}:</td>
          <td>{data.terAgtName}</td>
          <td>{bizMap.terNo}:</td>
          <td>{data.terNo}</td>
        </tr>
        <tr>
          <td>{bizMap.addDat}:</td>
          <td>{formatDateString(data.addDat)}</td>
          <td>{bizMap.outDat}:</td>
          <td>{formatDateString(data.outDat)}</td>
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
