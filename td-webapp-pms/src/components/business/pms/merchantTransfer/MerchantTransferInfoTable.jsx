import React, { PropTypes } from 'react';
import * as i18n from '../../../../utils/i18n';
import { amtMinUnitToStandUnit } from '../../../../utils/amount';

const MerchantTransferInfoTable = (props) => {
  const { data } = props;
  const bizMap = i18n.bizMap('pms/merchantTransfer');
  const ccyMap = i18n.bizMap('currencyMap');
  const defaultCcy = ccyMap.DEFAULT_CCY;
  let chnType = '';
  switch (data.chnType) {
    case '0': chnType = bizMap['chnType-0']; break;
    case '1': chnType = bizMap['chnType-1']; break;
    case '2': chnType = bizMap['chnType-2']; break;
    default: chnType = ''; break;
  }
  let outsideTransferStatus = '';
  switch (data.outsideTransferStatus) {
    case '0': outsideTransferStatus = bizMap['outsideTransferStatus-0']; break;
    case '1': outsideTransferStatus = bizMap['outsideTransferStatus-1']; break;
    default: outsideTransferStatus = ''; break;
  }
  let insideTransferStatus = '';
  switch (data.insideTransferStatus) {
    case '0': insideTransferStatus = bizMap['insideTransferStatus-0']; break;
    case '1': insideTransferStatus = bizMap['insideTransferStatus-1']; break;
    default: insideTransferStatus = ''; break;
  }
  let inChargeType = '';
  switch (data.inChargeType) {
    case '0': inChargeType = bizMap['inChargeType-0']; break;
    case '1': inChargeType = bizMap['inChargeType-1']; break;
    default: inChargeType = ''; break;
  }
  let outChargeType = '';
  switch (data.outChargeType) {
    case '0': outChargeType = bizMap['outChargeType-0']; break;
    case '1': outChargeType = bizMap['outChargeType-1']; break;
    default: outChargeType = ''; break;
  }
  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.chnName}:</td>
          <td>{data.chnName}</td>
          <td>{bizMap.chnType}:</td>
          <td>{chnType}</td>
        </tr>
        <tr>
          <td>{bizMap.chnMerName}:</td>
          <td>{data.chnMerName}</td>
        </tr>
        <tr>
          <td>{bizMap.insideTransferStatus}:</td>
          <td>{insideTransferStatus}</td>
        </tr>
        <tr>
          <td>{bizMap.inChargeType}:</td>
          <td>{inChargeType}</td>
        </tr>
        <tr>
          <td>{bizMap.inTxnRate}:</td>
          <td>{data.inTxnRate}</td>
          <td>{bizMap.inAmtMax}:</td>
          <td>{amtMinUnitToStandUnit(data.inAmtMax, defaultCcy)}</td>
        </tr>
        <tr>
          <td>{bizMap.inSingleAmt}:</td>
          <td>{amtMinUnitToStandUnit(data.inSingleAmt, defaultCcy)}</td>
        </tr>
        <tr>
          <td>{bizMap.outsideTransferStatus}:</td>
          <td>{outsideTransferStatus}</td>
        </tr>
        <tr>
          <td>{bizMap.outChargeType}:</td>
          <td>{outChargeType}</td>
        </tr>
        <tr>
          <td>{bizMap.outTxnRate}:</td>
          <td>{data.outTxnRate}</td>
          <td>{bizMap.outAmtMax}:</td>
          <td>{amtMinUnitToStandUnit(data.outAmtMax, defaultCcy)}</td>
        </tr>
        <tr>
          <td>{bizMap.outSingleAmt}:</td>
          <td>{amtMinUnitToStandUnit(data.outSingleAmt, defaultCcy)}</td>
        </tr>
        <tr>
          <td>{bizMap.singleDayLimit}:</td>
          <td>{amtMinUnitToStandUnit(data.singleDayLimit, defaultCcy)}</td>
          <td>{bizMap.singleDayCount}:</td>
          <td>{data.singleDayCount ? data.singleDayCount : '0'}</td>
        </tr>
        <tr>
          <td>{bizMap.singleMinAmt}:</td>
          <td>{amtMinUnitToStandUnit(data.singleMinAmt, defaultCcy)}</td>
          <td>{bizMap.singleMaxAmt}:</td>
          <td>{amtMinUnitToStandUnit(data.singleMaxAmt, defaultCcy)}</td>
        </tr>
      </tbody>
    </table>
  );
};

MerchantTransferInfoTable.propTypes = {
  data: PropTypes.object,
};

MerchantTransferInfoTable.defaultProps = {
  data: {},
};

export default MerchantTransferInfoTable;
