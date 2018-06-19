import React, { PropTypes } from 'react';
import * as i18n from '../../../../../utils/i18n';
import { formatMoney } from '../../../../../utils/currency';
import { amtMinUnitToStandUnit } from '../../../../../utils/amount';

/**
 * 渠道清分详情
 */
const ClearingBusinessInfoTable = (props) => {
  const bizMap = i18n.bizMap('sms/clearingBusiness');
  const currency = i18n.bizMap('currency');
  const ccyMap = i18n.bizMap('currencyMap');
  const { data } = props;

  let ccyCod = '';
  currency.forEach((v) => {
    if (v.value === data.ccy) {
      ccyCod = v.label;
    }
  });

  let stlStsCod = '';
  switch (data.stlSts) {
    case '0': stlStsCod = bizMap['stlSts-01']; break;
    case '1': stlStsCod = bizMap['stlSts-02']; break;
    default: break;
  }

  let clrTyp = '';
  switch (data.clrTyp) {
    case '01': clrTyp = bizMap['clrTyp-01']; break;
    case '02': clrTyp = bizMap['clrTyp-02']; break;
    case '03': clrTyp = bizMap['clrTyp-03']; break;
    case '04': clrTyp = bizMap['clrTyp-04']; break;
    default: break;
  }

  let busiTyp = '';
  switch (data.busiTyp) {
    case '01': busiTyp = bizMap['busiTyp-01']; break;
    case '02': busiTyp = bizMap['busiTyp-02']; break;
    case '03': busiTyp = bizMap['busiTyp-03']; break;
    case '04': busiTyp = bizMap['busiTyp-04']; break;
    default: break;
  }

  const ccy = ccyMap[data.ccy] || ccyMap.DEFAULT;

  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.pyeMemId}:</td>
          <td>{data.pyeMemId}</td>
          <td>{bizMap.pyeMemName}:</td>
          <td>{data.pyeMemName}</td>
        </tr>
        <tr>
          <td>{bizMap.clrTyp}:</td>
          <td>{clrTyp}</td>
          <td>{bizMap.busiTyp}:</td>
          <td>{busiTyp}</td>
        </tr>
        <tr colSpan="4">
          <td>{bizMap.ccy}:</td>
          <td>{ccyCod}</td>
        </tr>
        <tr>
          <td>{bizMap.txnTotCnt}:</td>
          <td>{data.txnTotCnt}</td>
          <td>{bizMap.txnTotAmt}:</td>
          <td>{formatMoney(amtMinUnitToStandUnit(`${data.txnTotAmt}`, `${data.ccy}`), 2)}{ccy}</td>
        </tr>
        <tr colSpan="4">
          <td>{bizMap.txnTolFee}:</td>
          <td>{formatMoney(amtMinUnitToStandUnit(`${data.txnTolFee}`, `${data.ccy}`), 2)}{ccy}</td>
        </tr>
        <tr>
          <td>{bizMap.payTotCnt}:</td>
          <td>{data.payTotCnt}</td>
          <td>{bizMap.payTolAmt}:</td>
          <td>{formatMoney(amtMinUnitToStandUnit(`${data.payTolAmt}`, `${data.ccy}`), 2)}{ccy}</td>
        </tr>
        <tr colSpan="4">
          <td>{bizMap.payTolFee}:</td>
          <td>{formatMoney(amtMinUnitToStandUnit(`${data.payTolFee}`, `${data.ccy}`), 2)}{ccy}</td>
        </tr>
        <tr>
          <td>{bizMap.refTotCnt}:</td>
          <td>{data.refTotCnt}</td>
          <td>{bizMap.refTotAmt}:</td>
          <td>{formatMoney(amtMinUnitToStandUnit(`${data.refTotAmt}`, `${data.ccy}`), 2)}{ccy}</td>
        </tr>
        <tr colSpan="4">
          <td>{bizMap.refTotFee}:</td>
          <td>{formatMoney(amtMinUnitToStandUnit(`${data.refTotFee}`, `${data.ccy}`), 2)}{ccy}</td>
        </tr>
        <tr colSpan="4">
          <td>{bizMap.chnFeeTot}:</td>
          <td>{formatMoney(amtMinUnitToStandUnit(`${data.chnFeeTot}`, `${data.ccy}`), 2)}{ccy}</td>
        </tr>
        <tr>
          <td>{bizMap.agtId}:</td>
          <td>{data.agtId}</td>
          <td>{bizMap.shrAmt}:</td>
          <td>{formatMoney(amtMinUnitToStandUnit(`${data.shrAmt}`, `${data.ccy}`), 2)}{ccy}</td>
        </tr>
        <tr>
          <td>{bizMap.stlDat}:</td>
          <td>{data.stlDat}</td>
          <td>{bizMap.stlSts}:</td>
          <td>{stlStsCod}</td>
        </tr>
      </tbody>
    </table>
  );
}

ClearingBusinessInfoTable.propTypes = {
  data: PropTypes.object,
};

ClearingBusinessInfoTable.defaultProps = {
  data: {},
};

export default ClearingBusinessInfoTable;

