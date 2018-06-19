import React, { PropTypes } from 'react';
import * as i18n from '../../../../utils/i18n';
import * as date from '../../../../utils/date';
import { formatMoney } from '../../../../utils/currency';
import { amtMinUnitToStandUnit } from '../../../../utils/amount';

const ChnChkErrorDetailInfoForm = (props) => {
  const bizMap = i18n.bizMap('merp/stling');
  const currency = i18n.bizMap('currency');
  const ccyMap = i18n.bizMap('currencyMap');
  const { data } = props;
  let stlMod = '';
  switch (data.stlMod) {
    case '0': stlMod = bizMap['stlMod-c']; break;
    case '1': stlMod = bizMap['stlMod-n']; break;
    default: stlMod = ''; break;
  }

  let stlTyp = '';
  switch (data.stlTyp) {
    case '0': stlTyp = bizMap['stlTyp-t']; break;
    case '1': stlTyp = bizMap['stlTyp-d']; break;
    default: stlTyp = ''; break;
  }

  let stlWayAct = '';
  switch (data.stlWayAct) {
    case '1': stlWayAct = bizMap['stlWayAct-MONEY']; break;
    case '2': stlWayAct = bizMap['stlWayAct-ORDER']; break;
    default: stlWayAct = ''; break;
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

  let stlSts = '';
  switch (data.stlSts) {
    case '0': stlSts = bizMap.stlSuccessSts; break;
    case '1': stlSts = bizMap.stlToAudit; break;
    case '2': stlSts = bizMap.stlAuditFail; break;
    case '3': stlSts = bizMap.stlToApplyForMoney; break;
    case '4': stlSts = bizMap.stlCancel; break;
    case '5': stlSts = bizMap.stlUnsettled; break;
    default: stlSts = ''; break;
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
          <td>{bizMap.id}:</td>
          <td>{data.id}</td>
          <td>{bizMap.stlMod}:</td>
          <td>{stlMod}</td>
        </tr>
        <tr>
          <td>{bizMap.stlTyp}:</td>
          <td>{stlTyp}</td>
          <td>{bizMap.stlWayAct}:</td>
          <td>{stlWayAct}</td>
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
          <td>{bizMap.stlDat}:</td>
          <td>{date.formatDateString(data.stlDat)}</td>
        </tr>
        <tr>
          <td>{bizMap.ccy}:</td>
          <td>{ccyCod}</td>
          <td>{bizMap.stlAmt}:</td>
          <td>{formatMoney(amtMinUnitToStandUnit(`${data.stlAmt}`, `${data.ccy}`), 2)}{ccy}</td>
        </tr>
        <tr>
          <td>{bizMap.stlTobeAmt}:</td>
          <td>{formatMoney(amtMinUnitToStandUnit(`${data.stlTobeAmt}`, `${data.ccy}`), 2)}{ccy}</td>
          <td>{bizMap.urgentAmt}:</td>
          <td>{formatMoney(amtMinUnitToStandUnit(`${data.urgentAmt}`, `${data.ccy}`), 2)}{ccy}</td>
        </tr>
        <tr>
          <td>{bizMap.stlFee}:</td>
          <td>{formatMoney(amtMinUnitToStandUnit(`${data.stlFee}`, `${data.ccy}`), 2)}{ccy}</td>
          <td>{bizMap.stlWay}:</td>
          <td>{stlWay}</td>
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
          <td>{bizMap.taskId}:</td>
          <td>{data.taskId}</td>
        </tr>
        <tr>
          <td>{bizMap.completeDte}:</td>
          <td>{date.formatDateString(data.completeDte)}</td>
          <td>{bizMap.completeOpr}:</td>
          <td>{data.completeOpr}</td>
        </tr>
        <tr>
          <td>{bizMap.autComments}:</td>
          <td>{data.autComments}</td>
          <td>{bizMap.stlSts}:</td>
          <td>{stlSts}</td>
        </tr>
      </tbody>
    </table>
  );
}

ChnChkErrorDetailInfoForm.propTypes = {
  data: PropTypes.object,
};

ChnChkErrorDetailInfoForm.defaultProps = {
  data: {},
}

export default ChnChkErrorDetailInfoForm;
