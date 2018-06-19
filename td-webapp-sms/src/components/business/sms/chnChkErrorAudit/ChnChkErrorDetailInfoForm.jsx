import React, { PropTypes } from 'react';
import * as i18n from '../../../../utils/i18n';
import { formatMoney } from '../../../../utils/currency';
import { amtMinUnitToStandUnit } from '../../../../utils/amount';

const ChnChkErrorDetailInfoForm = (props) => {
  const bizMap = i18n.bizMap('sms/chnChkErrorAudit');
  const currency = i18n.bizMap('currency');
  const ccyMap = i18n.bizMap('currencyMap');

  const { data } = props;

  let chnChkSts = '';
  switch (data.chnChkSts) {
    case '00': chnChkSts = bizMap['chnChkSts-00']; break;
    case '01': chnChkSts = bizMap['chnChkSts-01']; break;
    case '02': chnChkSts = bizMap['chnChkSts-02']; break;
    case '03': chnChkSts = bizMap['chnChkSts-03']; break;
    case '04': chnChkSts = bizMap['chnChkSts-04']; break;
    default: break;
  }

  let dealType = '';
  switch (data.dealType) {
    case '00': dealType = bizMap['dealType-00']; break;
    case '01': dealType = bizMap['dealType-01']; break;
    case '02': dealType = bizMap['dealType-02']; break;
    case '03': dealType = bizMap['dealType-03']; break;
    case '04': dealType = bizMap['dealType-04']; break;
    default: break;
  }

  let ccyCod = '';
  currency.forEach((v) => {
    if (v.value === data.ccyCod) {
      ccyCod = v.label;
    }
  });

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
    default: break;
  }

  const ccy = ccyMap[data.ccyCod] || ccyMap.DEFAULT;

  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.chnChkSts}:</td>
          <td>{chnChkSts}</td>
        </tr>
        <tr>
          <td>{bizMap.dealType}:</td>
          <td>{dealType}</td>
          <td style={{ display: data.dealType === '01' || data.dealType === '03' || data.dealType === '04' ? '' : 'none' }}>{bizMap.dealAmt}:</td>
          <td style={{ display: data.dealType === '01' || data.dealType === '03' || data.dealType === '04' ? '' : 'none' }}>
            {formatMoney(amtMinUnitToStandUnit(`${data.dealAmt}`, `${data.ccyCod}`), 2)}{ccy}
          </td>
        </tr>
        <tr>
          <td>{bizMap.dealRemark}:</td>
          <td colSpan={3}>{data.dealRemark}</td>
        </tr>
        <tr>
          <td>{bizMap.txnId}:</td>
          <td>{data.txnId}</td>
          <td>{bizMap.ttxnId}:</td>
          <td>{data.ttxnId}</td>
        </tr>
        <tr>
          <td>{bizMap.txnType}:</td>
          <td>{txnType}</td>
          <td>{bizMap.ccyCod}:</td>
          <td>{ccyCod}</td>
        </tr>
        <tr>
          <td>{bizMap.txnAmt}:</td>
          <td>{formatMoney(amtMinUnitToStandUnit(`${data.txnAmt}`, `${data.ccyCod}`), 2)}{ccy}</td>
          <td>{bizMap.ttxnAmt}:</td>
          <td>{formatMoney(amtMinUnitToStandUnit(`${data.ttxnAmt}`, `${data.ccyCod}`), 2)}{ccy}</td>
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
