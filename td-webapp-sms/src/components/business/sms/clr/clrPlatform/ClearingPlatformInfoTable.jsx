import React, { PropTypes } from 'react';
import * as i18n from '../../../../../utils/i18n';
import * as date from '../../../../../utils/date';
import { formatMoney } from '../../../../../utils/currency';
import { amtMinUnitToStandUnit } from '../../../../../utils/amount';

/**
 * 平台清分详情
 */
const ClearingPaltformInfoTable = (props) => {
  const bizMap = i18n.bizMap('sms/clearingSum');
  const currency = i18n.bizMap('currency');
  const ccyMap = i18n.bizMap('currencyMap');
  const { platformData } = props;

  let ccyCod = '';
  currency.forEach((v) => {
    if (v.value === platformData.ccy) {
      ccyCod = v.label;
    }
  });

  let stlStsCod = '';
  switch (platformData.stlSts) {
    case '0': stlStsCod = bizMap['stlSts-01']; break;
    case '1': stlStsCod = bizMap['stlSts-02']; break;
    default: break;
  }

  let clrTyp = '';
  switch (platformData.clrTyp) {
    case '01': clrTyp = bizMap['clrTyp-01']; break;
    case '02': clrTyp = bizMap['clrTyp-02']; break;
    case '03': clrTyp = bizMap['clrTyp-03']; break;
    case '04': clrTyp = bizMap['clrTyp-04']; break;
    default: break;
  }

  let busiTyp = '';
  switch (platformData.busiTyp) {
    case '0001': busiTyp = bizMap['busiTyp-01']; break;
    case '0002': busiTyp = bizMap['busiTyp-02']; break;
    case '0003': busiTyp = bizMap['busiTyp-03']; break;
    case '0004': busiTyp = bizMap['busiTyp-04']; break;
    case '1011': busiTyp = bizMap['busiTyp-05']; break;
    case '1012': busiTyp = bizMap['busiTyp-06']; break;
    default: break;
  }

  const ccy = ccyMap[platformData.ccy] || ccyMap.DEFAULT;

  const tr1Dom = [
    <tr key="d1">
      <td>{bizMap.clrTyp}:</td>
      <td>{clrTyp}</td>
      <td>{bizMap.ccy}:</td>
      <td>{ccyCod}</td>
    </tr>,
  ];

  const tr2Dom = [
    <tr key="d2">
      <td>{bizMap.clrTyp}:</td>
      <td>{clrTyp}</td>
      <td>{bizMap.busiTyp}:</td>
      <td>{busiTyp}</td>
    </tr>,
    <tr colSpan="4" key="d3">
      <td>{bizMap.ccy}:</td>
      <td>{ccyCod}</td>
    </tr>,
  ];

  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.pyeMemId}:</td>
          <td>{platformData.pyeMemId}</td>
          <td>{bizMap.pyeMemName}:</td>
          <td>{platformData.pyeMemName}</td>
        </tr>
        {
          platformData.busiTyp === undefined ? tr1Dom : tr2Dom
        }
        <tr>
          <td>{bizMap.txnTotCnt}:</td>
          <td>{platformData.txnTotCnt}</td>
          <td>{bizMap.txnTotAmt}:</td>
          <td>{formatMoney(amtMinUnitToStandUnit(`${platformData.txnTotAmt}`, `${platformData.ccy}`), 2)}{ccy}</td>
        </tr>
        <tr colSpan="4">
          <td>{bizMap.txnTotFee}:</td>
          <td>{formatMoney(amtMinUnitToStandUnit(`${platformData.txnTotFee}`, `${platformData.ccy}`), 2)}{ccy}</td>
        </tr>
        <tr>
          <td>{bizMap.payTotCnt}:</td>
          <td>{platformData.payTotCnt}</td>
          <td>{bizMap.payTotAmt}:</td>
          <td>{formatMoney(amtMinUnitToStandUnit(`${platformData.payTotAmt}`, `${platformData.ccy}`), 2)}{ccy}</td>
        </tr>
        <tr colSpan="4">
          <td>{bizMap.payTotFee}:</td>
          <td>{formatMoney(amtMinUnitToStandUnit(`${platformData.payTotFee}`, `${platformData.ccy}`), 2)}{ccy}</td>
        </tr>
        <tr>
          <td>{bizMap.refTotCnt}:</td>
          <td>{platformData.refTotCnt}</td>
          <td>{bizMap.refTotAmt}:</td>
          <td>{formatMoney(amtMinUnitToStandUnit(`${platformData.refTotAmt}`, `${platformData.ccy}`), 2)}{ccy}</td>
        </tr>
        <tr colSpan="4">
          <td>{bizMap.refTotFee}:</td>
          <td>{formatMoney(amtMinUnitToStandUnit(`${platformData.refTotFee}`, `${platformData.ccy}`), 2)}{ccy}</td>
        </tr>
        <tr colSpan="4" style={{ display: platformData.chnFeeTot ? '' : 'none' }}>
          <td>{bizMap.chnFeeTot}:</td>
          <td>{formatMoney(amtMinUnitToStandUnit(`${platformData.chnFeeTot}`, `${platformData.ccy}`), 2)}{ccy}</td>
        </tr>
        <tr>
          <td>{bizMap.agtId}:</td>
          <td>{platformData.agtId}</td>
          <td>{bizMap.stlDat}:</td>
          <td>{date.formatDateString(platformData.stlDat)}</td>
        </tr>
        <tr colSpan="4">
          <td>{bizMap.stlSts}:</td>
          <td>{stlStsCod}</td>
        </tr>
      </tbody>
    </table>
  );
}

ClearingPaltformInfoTable.propTypes = {
  platformData: PropTypes.object,
};

ClearingPaltformInfoTable.defaultProps = {
  platformData: {},
};

export default ClearingPaltformInfoTable;

