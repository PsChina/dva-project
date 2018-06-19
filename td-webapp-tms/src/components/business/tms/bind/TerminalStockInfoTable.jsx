import React, { PropTypes } from 'react';
import * as i18n from '../../../../utils/i18n';
import { amtMinUnitToStandUnit } from '../../../../utils/amount';
import { formatDateString } from '../../../../utils/date';

const TerminalStockInfoTable = (props) => {
  const bizMap = i18n.bizMap('tms/terminalStock');
  const dataMap = i18n.bizMap('tms/tmsData');
  const commonMap = i18n.commonMap();
  const { infoTableData } = props;
  const data = infoTableData;
  let terAddMod;
  switch (data.terAddMod) {
    case '1': terAddMod = dataMap['terAddMod-1']; break;
    case '2': terAddMod = dataMap['terAddMod-2']; break;
    default: terAddMod = '';
  }
  let stoStatus;
  switch (data.stoStatus) {
    case '0': stoStatus = dataMap['stoStatus-0']; break;
    case '1': stoStatus = dataMap['stoStatus-1']; break;
    case '2': stoStatus = dataMap['stoStatus-2']; break;
    default: stoStatus = '';
  }
  let terUseMod;
  switch (data.terUseMod) {
    case '1': terUseMod = dataMap['terUseMod-1']; break;
    case '2': terUseMod = dataMap['terUseMod-2']; break;
    default: terUseMod = '';
  }
  let terSrc;
  switch (data.terSrc) {
    case '1': terSrc = dataMap['terSrc-1']; break;
    case '2': terSrc = dataMap['terSrc-2']; break;
    default: terSrc = '';
  }
  let terOwn;
  switch (data.terOwn) {
    case '1': terOwn = commonMap['org-1']; break;
    case '2': terOwn = commonMap['org-2']; break;
    case '3': terOwn = commonMap['org-3']; break;
    case '4': terOwn = commonMap['org-4']; break;
    default: terOwn = '';
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
          <td>{bizMap.terVer}:</td>
          <td>{data.terVer}</td>
          <td>{bizMap.terAddMod}:</td>
          <td>{terAddMod}</td>
        </tr>
        <tr>
          <td>{bizMap.addDat}:</td>
          <td>{formatDateString(data.addDat)}</td>
          <td>{bizMap.outDat}:</td>
          <td>{formatDateString(data.outDat)}</td>
        </tr>
        <tr>
          <td>{bizMap.addBatno}:</td>
          <td>{data.addBatno}</td>
          <td>{bizMap.stoStatus}:</td>
          <td>{stoStatus}</td>
        </tr>
        <tr>
          <td>{bizMap.strDat}:</td>
          <td>{data.strDat}</td>
          <td>{bizMap.endDat}:</td>
          <td>{data.endDat}</td>
        </tr>
        <tr>
          <td>{bizMap.terSrc}:</td>
          <td>{terSrc}</td>
          <td>{bizMap.terUseMod}:</td>
          <td>{terUseMod}</td>
        </tr>
        <tr>
          <td>{bizMap.terAddAmt}:</td>
          <td>{data.terAddAmt && data.terAddCur ? amtMinUnitToStandUnit(data.terAddAmt, data.terAddCur) : ''}</td>
          <td>{bizMap.terOutAmt}:</td>
          <td>{data.terOutAmt && data.terOutCur ? amtMinUnitToStandUnit(data.terOutAmt, data.terOutCur) : ''}</td>
        </tr>
        <tr>
          <td>{bizMap.terNetinAmt}:</td>
          <td>{data.terNetinAmt && data.terAddCur ? amtMinUnitToStandUnit(data.terNetinAmt, data.terAddCur) : ''}</td>
          <td>{bizMap.currency}:</td>
          <td>{data.currency}</td>
        </tr>
        <tr>
          <td>{bizMap.inOprId}:</td>
          <td>{data.inOprId}</td>
          <td>{bizMap.outOprId}:</td>
          <td>{data.outOprId}</td>
        </tr>
        <tr>
          <td>{bizMap.terOwn}:</td>
          <td>{terOwn}</td>
        </tr>
      </tbody>
    </table>
  );
}

TerminalStockInfoTable.propTypes = {
  infoTableData: PropTypes.object,
};

TerminalStockInfoTable.defaultProps = {
  infoTableData: {},
}

export default TerminalStockInfoTable;
