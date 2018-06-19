import React, { PropTypes } from 'react';
import * as i18n from '../../../../utils/i18n';
import { amtMinUnitToStandUnit } from '../../../../utils/amount';
import { formatDateString } from '../../../../utils/date';

const ChannelScancodeInfoTable = (props) => {
  const bizMap = i18n.bizMap('pms/channelScancode');
  const commonMap = i18n.commonMap();
  const ccyMap = i18n.bizMap('currencyMap');
  const defaultCcy = ccyMap.DEFAULT_CCY;
  const { data } = props;
  let chnType = '';
  switch (data.chnType) {
    case '0': chnType = bizMap['chnType-0']; break;
    case '1': chnType = bizMap['chnType-1']; break;
    case '2': chnType = bizMap['chnType-2']; break;
    case '3': chnType = bizMap['chnType-3']; break;
    case '4': chnType = bizMap['chnType-4']; break;
    default: chnType = ''; break;
  }
  let needCheck = '';
  switch (data.needCheck) {
    case '0': needCheck = commonMap['check-0']; break;
    case '1': needCheck = commonMap['check-1']; break;
    default: needCheck = ''; break;
  }
  const gettime = (time) => {
    let dayCutTim = '';
    if (time) {
      dayCutTim = `${time.substring(0, 2)}:${time.substring(2, 4)}`;
    }
    return dayCutTim;
  };
  let scanType = '';
  switch (data.scanType) {
    case '0,1': scanType = bizMap['scanType-01']; break;
    case '0,2': scanType = bizMap['scanType-02']; break;
    case '1,2': scanType = bizMap['scanType-12']; break;
    case '1': scanType = bizMap['scanType-1']; break;
    case '2': scanType = bizMap['scanType-2']; break;
    case '0': scanType = bizMap['scanType-0']; break;
    case '3': scanType = bizMap['scanType-3']; break;
    case '4': scanType = bizMap['scanType-4']; break;
    case '5': scanType = bizMap['scanType-5']; break;
    case '0,1,2': scanType = bizMap['scanType-012']; break;
    default: scanType = ''; break;
  }
  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.chnType}:</td>
          <td>{chnType}</td>
          <td style={{ display: data.chnType === '1' ? '' : 'none' }}>{bizMap.bankRelNo}:</td>
          <td style={{ display: data.chnType === '1' ? '' : 'none' }}>{data.bankRelNo}</td>
          <td style={{ display: data.chnType === '2' ? '' : 'none' }}>{bizMap.chnCertNo}:</td>
          <td style={{ display: data.chnType === '2' ? '' : 'none' }}>{data.chnCertNo}</td>
        </tr>
        <tr>
          <td>{bizMap.chnName}:</td>
          <td>{data.chnName}</td>
          <td>{bizMap.chnAlias}:</td>
          <td>{data.chnAlias}</td>
        </tr>
        <tr>
          <td>{bizMap.scanType}:</td>
          <td colSpan={3}>{scanType}</td>
        </tr>
        <tr>
          <td>{bizMap.dayCutTim}:</td>
          <td>{gettime(data.dayCutTim)}</td>
          <td>{bizMap.needCheck}:</td>
          <td>{needCheck}</td>
        </tr>
        <tr>
          <td>{bizMap.hessianUrl}:</td>
          <td colSpan={3}>{data.hessianUrl}</td>
        </tr>
        <tr>
          <td>{bizMap.txnChannelSupport}:</td>
          <td>{data.txnChannelSupport}</td>
          <td>{bizMap.currencySupport}:</td>
          <td>{data.currencySupport}</td>
        </tr>
        <tr>
          <td>{bizMap.chnConter}:</td>
          <td>{data.chnConter}</td>
          <td>{bizMap.chnMobile}:</td>
          <td>{data.chnMobile}</td>
        </tr>
        <tr>
          <td>{bizMap.chnPhone}:</td>
          <td colSpan={3}>{data.chnPhone}</td>
        </tr>
        <tr>
          <td>{bizMap.chnAddr}:</td>
          <td colSpan={3}>{data.chnAddr}</td>
        </tr>
        <tr >
          <td>{bizMap.singleDayLimit}:</td>
          <td>{amtMinUnitToStandUnit(data.singleDayLimit, defaultCcy)}</td>
          <td>{bizMap.singleMonthLimit}:</td>
          <td>{amtMinUnitToStandUnit(data.singleMonthLimit, defaultCcy)}</td>
        </tr>
        <tr>
          <td>{bizMap.singleDayCount}:</td>
          <td>{data.singleDayCount}</td>
          <td>{bizMap.singleMonthCount}:</td>
          <td>{data.singleMonthCount}</td>
        </tr>
        <tr>
          <td>{bizMap.creTim}:</td>
          <td>{formatDateString(data.creTim)}</td>
          <td>{bizMap.uptTim}:</td>
          <td>{formatDateString(data.uptTim)}</td>
        </tr>
      </tbody>
    </table>
  );
}

ChannelScancodeInfoTable.propTypes = {
  data: PropTypes.object,
};

ChannelScancodeInfoTable.defaultProps = {
  data: {},
}

export default ChannelScancodeInfoTable;
