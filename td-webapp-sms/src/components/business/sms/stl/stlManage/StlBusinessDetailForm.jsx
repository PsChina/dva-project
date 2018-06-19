import React, { PropTypes } from 'react';
import * as i18n from '../../../../../utils/i18n';
import * as date from '../../../../../utils/date';
import { formatMoney } from '../../../../../utils/currency';
import { amtMinUnitToStandUnit } from '../../../../../utils/amount';

const StlBusinessDetailForm = (props) => {
  const bizMap = i18n.bizMap('sms/stlBusiness');
  const currency = i18n.bizMap('currency');
  const ccyMap = i18n.bizMap('currencyMap');
  const commonMap = i18n.commonMap();
  const { data } = props;
  let busiTyp = '';
  switch (data.busiTyp) {
    case '0100': busiTyp = commonMap.onlineinternet; break;
    case '0001': busiTyp = commonMap.unionpaycard; break;
    case '0002': busiTyp = commonMap.visa; break;
    case '0003': busiTyp = commonMap.mastercard; break;
    case '0004': busiTyp = commonMap.prepaidcard; break;
    case '1011': busiTyp = commonMap.alipay; break;
    case '1012': busiTyp = commonMap.wechat; break;
    default: busiTyp = ''; break;
  }

  let clrTyp = '';
  switch (data.clrTyp) {
    case '01': clrTyp = bizMap.individualMem; break;
    case '02': clrTyp = bizMap.merchantman; break;
    case '03': clrTyp = bizMap.store; break;
    default: clrTyp = ''; break;
  }

  let stlWay = '';
  switch (data.stlWay) {
    case '01': stlWay = bizMap['stlWay-01']; break;
    case '02': stlWay = bizMap['stlWay-02']; break;
    default: stlWay = ''; break;
  }

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
          <td>{date.formatDateString(data.stlDat)}</td>
          <td>{bizMap.busiTyp}:</td>
          <td>{busiTyp}</td>
        </tr>
        <tr>
          <td>{bizMap.clrTyp}:</td>
          <td>{clrTyp}</td>
          <td>{bizMap.pyeMemId}:</td>
          <td>{data.pyeMemId}</td>
        </tr>
        <tr>
          <td>{bizMap.pyeMemName}:</td>
          <td>{data.pyeMemName}</td>
          <td>{bizMap.begClrDat}:</td>
          <td>{date.formatDateString(data.begClrDat)}</td>
        </tr>
        <tr>
          <td>{bizMap.endClrDat}:</td>
          <td>{date.formatDateString(data.endClrDat)}</td>
          <td>{bizMap.stlWay}:</td>
          <td>{stlWay}</td>
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
