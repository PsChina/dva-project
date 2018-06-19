import React, { PropTypes } from 'react';
import * as i18n from '../../../../../utils/i18n';

const TransTempInfoForm = (props) => {
  const { data } = props;
  const bizMap = i18n.bizMap('oms/bankcardOrder');
  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.txnNo}:</td>
          <td>{data.txnNo}</td>
          <td>{bizMap.terNo}:</td>
          <td>{data.terNo}</td>
        </tr>
        <tr>
          <td>{bizMap.merName}:</td>
          <td>{data.merName}</td>
          <td>{bizMap.merNo}:</td>
          <td>{data.merNo}</td>
        </tr>
        <tr>
          <td>{bizMap.braName}:</td>
          <td>{data.braName}</td>
          <td>{bizMap.agtName}:</td>
          <td>{data.agtName}</td>
        </tr>
        <tr>
          <td>{bizMap.ttxnTime}:</td>
          <td>{data.ttxnTime}</td>
          <td>{bizMap.txnType}:</td>
          <td>{data.txnType}</td>
        </tr>
        <tr>
          <td>{bizMap.txnAmt}:</td>
          <td>{data.txnAmt}</td>
          <td>{bizMap.currency}:</td>
          <td>{data.currency}</td>
        </tr>
        <tr>
          <td>{bizMap.cardNo}:</td>
          <td>{data.cardNo}</td>
          <td>{bizMap.cardType}:</td>
          <td>{data.cardType}</td>
        </tr>
        <tr>
          <td>{bizMap.cardIssinam}:</td>
          <td>{data.cardIssinam}</td>
          <td>{bizMap.tseqNo}:</td>
          <td>{data.tseqNo}</td>
        </tr>
        <tr>
          <td>{bizMap.tsrefno}:</td>
          <td>{data.tsrefno}</td>
          <td>{bizMap.tautcod}:</td>
          <td>{data.tautcod}</td>
        </tr>
        <tr>
          <td>{bizMap.refAmt}:</td>
          <td>{data.refAmt}</td>
          <td>{bizMap.txnStatus}:</td>
          <td>{data.txnStatus}</td>
        </tr>
      </tbody>
    </table>
  );
}

TransTempInfoForm.propTypes = {
  data: PropTypes.object,
};

TransTempInfoForm.defaultProps = {
  data: {},
}

export default TransTempInfoForm;
