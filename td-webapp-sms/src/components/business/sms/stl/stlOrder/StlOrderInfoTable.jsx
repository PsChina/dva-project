import React, { PropTypes } from 'react';
import * as i18n from '../../../../../utils/i18n';
import * as date from '../../../../../utils/date';
import { formatMoney } from '../../../../../utils/currency';
import { amtMinUnitToStandUnit } from '../../../../../utils/amount';

/**
 * 渠道清分详情
 */
const StlOrderInfoTable = (props) => {
  const bizMap = i18n.bizMap('sms/stlOrder');
  const currency = i18n.bizMap('currency');
  const ccyMap = i18n.bizMap('currencyMap');
  const { data } = props;

  let ccyCod = '';
  currency.forEach((v) => {
    if (v.value === data.ccy) {
      ccyCod = v.label;
    }
  });

  let outSts = '';
  switch (data.outSts) {
    case '0': outSts = bizMap['outSts-01']; break;
    case '1': outSts = bizMap['outSts-02']; break;
    case '2': outSts = bizMap['outSts-03']; break;
    case '3': outSts = bizMap['outSts-04']; break;
    default: break;
  }

  let stlWay = '';
  switch (data.stlWay) {
    case '01': stlWay = bizMap['stlWay-01']; break;
    case '02': stlWay = bizMap['stlWay-02']; break;
    default: break;
  }

  let coreAccSts = '';
  switch (data.coreAccSts) {
    case 'U': coreAccSts = bizMap['coreAccSts-01']; break;
    case 'S': coreAccSts = bizMap['coreAccSts-02']; break;
    case 'F': coreAccSts = bizMap['coreAccSts-03']; break;
    default: break;
  }

  const ccy = ccyMap[data.ccy] || ccyMap.DEFAULT;

  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.id}:</td>
          <td>{data.id}</td>
          <td>{bizMap.stlWay}:</td>
          <td>{stlWay}</td>
        </tr>
        <tr colSpan="4">
          <td>{bizMap.ccy}:</td>
          <td>{ccyCod}</td>
        </tr>
        <tr>
          <td>{bizMap.outAcc}:</td>
          <td>{data.outAcc}</td>
          <td>{bizMap.outBank}:</td>
          <td>{data.outBank}</td>
        </tr>
        <tr>
          <td>{bizMap.outAmt}:</td>
          <td>{formatMoney(amtMinUnitToStandUnit(`${data.outAmt}`, `${data.ccy}`), 2)}{ccy}</td>
          <td>{bizMap.outDate}:</td>
          <td>{date.formatDateString(data.outDate)}</td>
        </tr>
        <tr>
          <td>{bizMap.coreJrnNo}:</td>
          <td>{data.coreJrnNo}</td>
          <td>{bizMap.coreAccSts}:</td>
          <td>{coreAccSts}</td>
        </tr>
        <tr colSpan="4">
          <td>{bizMap.coreActDat}:</td>
          <td>{date.formatDateString(data.coreActDat)}</td>
        </tr>
        <tr>
          <td>{bizMap.outChnId}:</td>
          <td>{data.outChnId}</td>
          <td>{bizMap.outChnName}:</td>
          <td>{data.outChnName}</td>
        </tr>
        <tr>
          <td>{bizMap.outChnJrnNo}:</td>
          <td>{data.outChnJrnNo}</td>
          <td>{bizMap.outFee}:</td>
          <td>{formatMoney(amtMinUnitToStandUnit(`${data.outFee}`, `${data.ccy}`), 2)}{ccy}</td>
        </tr>
        <tr>
          <td>{bizMap.outChnTim}:</td>
          <td>{date.formatDateString(data.outChnTim)}</td>
          <td>{bizMap.outSts}:</td>
          <td>{outSts}</td>
        </tr>
      </tbody>
    </table>
  );
}

StlOrderInfoTable.propTypes = {
  data: PropTypes.object,
};

StlOrderInfoTable.defaultProps = {
  data: {},
};

export default StlOrderInfoTable;

