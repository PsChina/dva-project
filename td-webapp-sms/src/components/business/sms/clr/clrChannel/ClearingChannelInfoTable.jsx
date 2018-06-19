import React, { PropTypes } from 'react';
import * as i18n from '../../../../../utils/i18n';
import * as date from '../../../../../utils/date';
import { formatMoney } from '../../../../../utils/currency';
import { amtMinUnitToStandUnit } from '../../../../../utils/amount';

/**
 * 渠道清分详情
 */
const ClearingChannelInfoTable = (props) => {
  const bizMap = i18n.bizMap('sms/clearingSum');
  const currency = i18n.bizMap('currency');
  const ccyMap = i18n.bizMap('currencyMap');
  const { channelData } = props;

  let ccyCod = '';
  currency.forEach((v) => {
    if (v.value === channelData.ccy) {
      ccyCod = v.label;
    }
  });

  let stlStsCod = '';
  switch (channelData.stlSts) {
    case '0': stlStsCod = bizMap['stlSts-01']; break;
    case '1': stlStsCod = bizMap['stlSts-02']; break;
    default: break;
  }

  let clrTyp = '';
  switch (channelData.clrTyp) {
    case '01': clrTyp = bizMap['clrTyp-01']; break;
    case '02': clrTyp = bizMap['clrTyp-02']; break;
    case '03': clrTyp = bizMap['clrTyp-03']; break;
    case '04': clrTyp = bizMap['clrTyp-04']; break;
    default: break;
  }

  let busiTyp = '';
  switch (channelData.busiTyp) {
    case '0001': busiTyp = bizMap['busiTyp-01']; break;
    case '0002': busiTyp = bizMap['busiTyp-02']; break;
    case '0003': busiTyp = bizMap['busiTyp-03']; break;
    case '0004': busiTyp = bizMap['busiTyp-04']; break;
    case '1011': busiTyp = bizMap['busiTyp-05']; break;
    case '1012': busiTyp = bizMap['busiTyp-06']; break;
    default: break;
  }

  const ccy = ccyMap[channelData.ccy] || ccyMap.DEFAULT;

  const tr1Dom = [
    <tr key="t1">
      <td>{bizMap.clrTyp}:</td>
      <td>{clrTyp}</td>
      <td>{bizMap.ccy}:</td>
      <td>{ccyCod}</td>
    </tr>,
  ];

  const tr2Dom = [
    <tr key="t2">
      <td>{bizMap.clrTyp}:</td>
      <td>{clrTyp}</td>
      <td>{bizMap.busiTyp}:</td>
      <td>{busiTyp}</td>
    </tr>,
    <tr key="t3" colSpan="4">
      <td>{bizMap.ccy}:</td>
      <td>{ccyCod}</td>
    </tr>,
  ];

  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.pyeMemId}:</td>
          <td>{channelData.pyeMemId}</td>
          <td>{bizMap.pyeMemName}:</td>
          <td>{channelData.pyeMemName}</td>
        </tr>
        {
          channelData.busiTyp === undefined ? tr1Dom : tr2Dom
        }
        <tr>
          <td>{bizMap.txnTotCnt}:</td>
          <td>{channelData.txnTotCnt}</td>
          <td>{bizMap.txnTotAmt}:</td>
          <td>{formatMoney(amtMinUnitToStandUnit(`${channelData.txnTotAmt}`, `${channelData.ccy}`), 2)}{ccy}</td>
        </tr>
        <tr colSpan="4">
          <td>{bizMap.txnTotFee}:</td>
          <td>{formatMoney(amtMinUnitToStandUnit(`${channelData.txnTotFee}`, `${channelData.ccy}`), 2)}{ccy}</td>
        </tr>
        <tr>
          <td>{bizMap.payTotCnt}:</td>
          <td>{channelData.payTotCnt}</td>
          <td>{bizMap.payTotAmt}:</td>
          <td>{formatMoney(amtMinUnitToStandUnit(`${channelData.payTotAmt}`, `${channelData.ccy}`), 2)}{ccy}</td>
        </tr>
        <tr colSpan="4">
          <td>{bizMap.payTotFee}:</td>
          <td>{formatMoney(amtMinUnitToStandUnit(`${channelData.payTotFee}`, `${channelData.ccy}`), 2)}{ccy}</td>
        </tr>
        <tr>
          <td>{bizMap.refTotCnt}:</td>
          <td>{channelData.refTotCnt}</td>
          <td>{bizMap.refTotAmt}:</td>
          <td>{formatMoney(amtMinUnitToStandUnit(`${channelData.refTotAmt}`, `${channelData.ccy}`), 2)}{ccy}</td>
        </tr>
        <tr colSpan="4">
          <td>{bizMap.refTotFee}:</td>
          <td>{formatMoney(amtMinUnitToStandUnit(`${channelData.refTotFee}`, `${channelData.ccy}`), 2)}{ccy}</td>
        </tr>
        <tr colSpan="4" style={{ display: channelData.chnFeeTot ? '' : 'none' }}>
          <td>{bizMap.chnFeeTot}:</td>
          <td>{formatMoney(amtMinUnitToStandUnit(`${channelData.chnFeeTot}`, `${channelData.ccy}`), 2)}{ccy}</td>
        </tr>
        <tr>
          <td>{bizMap.agtId}:</td>
          <td>{channelData.agtId}</td>
          <td>{bizMap.stlDat}:</td>
          <td>{date.formatDateString(channelData.stlDat)}</td>
        </tr>
        <tr colSpan="4">
          <td>{bizMap.stlSts}:</td>
          <td>{stlStsCod}</td>
        </tr>
      </tbody>
    </table>
  );
}

ClearingChannelInfoTable.propTypes = {
  channelData: PropTypes.object,
};

ClearingChannelInfoTable.defaultProps = {
  channelData: {},
};

export default ClearingChannelInfoTable;

