import React, { PropTypes } from 'react';
import * as i18n from '../../../../utils/i18n';
import { formatMoney } from '../../../../utils/currency';
import { amtMinUnitToStandUnit } from '../../../../utils/amount';

const StlBusinessDetailForm = (props) => {
  const bizMap = i18n.bizMap('merp/stlBusiness');
  const currency = i18n.bizMap('currency');
  const ccyMap = i18n.bizMap('currencyMap');
  const { data } = props;

  let ccyCod = '';
  currency.forEach((v) => {
    if (v.value === data.ccy) {
      ccyCod = v.label;
    }
  });

  const ccy = ccyMap[data.ccy] || ccyMap.DEFAULT;

  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.stlDat}:</td>
          <td>{data.stlDat}</td>
          <td>{bizMap.busiTyp}:</td>
          <td>{data.busiTyp}</td>
        </tr>
        <tr>
          <td>{bizMap.clrTyp}:</td>
          <td>{data.clrTyp}</td>
          <td>{bizMap.pyeMemId}:</td>
          <td>{data.pyeMemId}</td>
        </tr>
        <tr>
          <td>{bizMap.pyeMemName}:</td>
          <td>{data.pyeMemName}</td>
          <td>{bizMap.begClrDat}:</td>
          <td>{data.begClrDat}</td>
        </tr>
        <tr>
          <td>{bizMap.endClrDat}:</td>
          <td>{data.endClrDat}</td>
          <td>{bizMap.stlWay}:</td>
          <td>{data.stlWay}</td>
        </tr>
        <tr>
          <td>{bizMap.ccy}:</td>
          <td>{ccyCod}</td>
          <td>{bizMap.stlAmt}:</td>
          <td>{formatMoney(amtMinUnitToStandUnit(`${data.stlAmt}`, `${data.ccy}`), 2)}{ccy}</td>
        </tr>
        <tr>
          <td>{bizMap.txnTotCnt}:</td>
          <td>{data.txnTotCnt}</td>
          <td>{bizMap.txnTotAmt}:</td>
          <td>{formatMoney(amtMinUnitToStandUnit(`${data.txnTotAmt}`, `${data.ccy}`), 2)}{ccy}</td>
        </tr>
        <tr>
          <td>{bizMap.txnTotFee}:</td>
          <td>{formatMoney(amtMinUnitToStandUnit(`${data.txnTotFee}`, `${data.ccy}`), 2)}{ccy}</td>
          <td>{bizMap.payTotCnt}:</td>
          <td>{data.payTotCnt}</td>
        </tr>
        <tr>
          <td>{bizMap.payTotAmt}:</td>
          <td>{formatMoney(amtMinUnitToStandUnit(`${data.payTotAmt}`, `${data.ccy}`), 2)}{ccy}</td>
          <td>{bizMap.payTotFee}:</td>
          <td>{formatMoney(amtMinUnitToStandUnit(`${data.payTotFee}`, `${data.ccy}`), 2)}{ccy}</td>
        </tr>
        <tr>
          <td>{bizMap.refTotCnt}:</td>
          <td>{data.refTotCnt}</td>
          <td>{bizMap.refTotAmt}:</td>
          <td>{formatMoney(amtMinUnitToStandUnit(`${data.refTotAmt}`, `${data.ccy}`), 2)}{ccy}</td>
        </tr>
        <tr>
          <td>{bizMap.refTotFee}:</td>
          <td>{formatMoney(amtMinUnitToStandUnit(`${data.refTotFee}`, `${data.ccy}`), 2)}{ccy}</td>
          <td>{bizMap.dealSts}:</td>
          <td>{data.dealSts}</td>
        </tr>
      </tbody>
    </table>
  );
}

StlBusinessDetailForm.propTypes = {
  data: PropTypes.object,
};

StlBusinessDetailForm.defaultProps = {
  data: {},
}

export default StlBusinessDetailForm;
