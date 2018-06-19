import React, { PropTypes } from 'react';
import * as i18n from '../../../../utils/i18n';
import * as date from '../../../../utils/date';
import { formatMoney } from '../../../../utils/currency';
import { amtMinUnitToStandUnit } from '../../../../utils/amount';

const PayOrderInfoTable = (props) => {
  const bizMap = i18n.bizMap('sms/chnChkError');
  const currency = i18n.bizMap('currency');
  const ccyMap = i18n.bizMap('currencyMap');
  const { data } = props;

  let txnType = '';
  switch (data.txnType) {
    case 'A': txnType = bizMap['txnType-A']; break;
    case 'S': txnType = bizMap['txnType-S']; break;
    case 'C': txnType = bizMap['txnType-C']; break;
    case 'R': txnType = bizMap['txnType-R']; break;
    case 'P': txnType = bizMap['txnType-P']; break;
    case 'T': txnType = bizMap['txnType-T']; break;
    case 'U': txnType = bizMap['txnType-U']; break;
    case 'M': txnType = bizMap['txnType-M']; break;
    case 'E': txnType = bizMap['txnType-E']; break;
    default:
      break;
  }

  let txnChannel = '';
  switch (data.txnChannel) {
    case '0001': txnChannel = bizMap['txnChannel-0001']; break;
    case '0002': txnChannel = bizMap['txnChannel-0002']; break;
    case '0003': txnChannel = bizMap['txnChannel-0003']; break;
    case '0004': txnChannel = bizMap['txnChannel-0004']; break;
    case '1011': txnChannel = bizMap['txnChannel-1011']; break;
    case '1012': txnChannel = bizMap['txnChannel-1012']; break;
    default: break;
  }

  let ccyCod = '';
  currency.forEach((v) => {
    if (v.value === data.ccyCod) {
      ccyCod = v.label;
    }
  });

  const ccy = ccyMap[data.ccyCod] || ccyMap.DEFAULT;

  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td style={{ display: data.txnId ? '' : 'none' }}>{bizMap.txnId}:</td>
          <td style={{ display: data.txnId ? '' : 'none' }}>{data.txnId}</td>
          <td style={{ display: data.ttxnId ? '' : 'none' }}>{bizMap.ttxnId}:</td>
          <td style={{ display: data.ttxnId ? '' : 'none' }}>{data.ttxnId}</td>
        </tr>
        <tr>
          <td>{bizMap.chnName}:</td>
          <td>{data.chnName}</td>
          <td>{bizMap.tmerNo}:</td>
          <td>{data.tmerNo}</td>
        </tr>
        <tr>
          <td>{bizMap.txnType}:</td>
          <td>{txnType}</td>
          <td>{bizMap.txnChannel}:</td>
          <td>{txnChannel}</td>
        </tr>
        <tr>
          <td>{bizMap.txnTime}:</td>
          <td>{date.formatDateString(`${data.txnDate}${data.txnTime}`)}</td>
          <td>{bizMap.ccyCod}:</td>
          <td>{ccyCod}</td>
        </tr>
        <tr>
          <td>{bizMap.txnAmt}:</td>
          <td>{formatMoney(amtMinUnitToStandUnit(`${data.txnAmt}`, `${data.ccyCod}`), 2)}{ccy}</td>
          <td style={{ display: data.txnFee ? '' : 'none' }}>{bizMap.txnFee}:</td>
          <td style={{ display: data.txnFee ? '' : 'none' }}>{formatMoney(amtMinUnitToStandUnit(`${data.txnFee}`, `${data.ccyCod}`), 2)}{ccy}</td>
        </tr>
        <tr>
          <td style={{ display: data.seqNo ? '' : 'none' }}>{bizMap.seqNo}: </td>
          <td style={{ display: data.seqNo ? '' : 'none' }}>{data.seqNo}</td>
          <td style={{ display: data.batNo ? '' : 'none' }}>{bizMap.batNo}:</td>
          <td style={{ display: data.batNo ? '' : 'none' }}>{data.batNo}</td>
        </tr>
      </tbody>
    </table>
  );
}

PayOrderInfoTable.propTypes = {
  data: PropTypes.object,
};

PayOrderInfoTable.defaultProps = {
  data: {},
};

export default PayOrderInfoTable;

