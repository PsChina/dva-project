import React, { PropTypes } from 'react';
import * as i18n from '../../../../utils/i18n';

const OrderTransRecInfoTable = (props) => {
  const { data } = props;
  const bizMap = i18n.bizMap('oms/orderTransRec');
  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.seqNo}:</td>
          <td>{data.seqNo}</td>
          <td>{bizMap.txnNo}:</td>
          <td>{data.txnNo}</td>
        </tr>
        <tr>
          <td>{bizMap.merNo}:</td>
          <td>{data.merNo}</td>
          <td>{bizMap.merName}:</td>
          <td>{data.merName}</td>
        </tr>
        <tr>
          <td>{bizMap.validDate}:</td>
          <td>{data.validDate}</td>
          <td>{bizMap.operTim}:</td>
          <td>{data.operTim}</td>
        </tr>
        <tr>
          <td>{bizMap.txnType}:</td>
          <td>{data.txnType}</td>
          <td>{bizMap.cardNo}:</td>
          <td>{data.cardNo}</td>
        </tr>
        <tr>
          <td>{bizMap.txnAmt}:</td>
          <td>{data.txnAmt}</td>
          <td>{bizMap.currency}:</td>
          <td>{data.currency}</td>
        </tr>
        <tr>
          <td>{bizMap.tsrefno}:</td>
          <td>{data.tsrefno}</td>
        </tr>
        <tr>
          <td>{bizMap.otxnNo}:</td>
          <td>{data.otxnNo}</td>
          <td>{bizMap.txnStatus}:</td>
          <td>{data.txnStatus}</td>
        </tr>
        <tr>
          <td>{bizMap.cardType}:</td>
          <td>{data.cardType}</td>
          <td>{bizMap.freezeStatus}:</td>
          <td>{data.freezeStatus}</td>
        </tr>
      </tbody>
    </table>
  );
}

OrderTransRecInfoTable.propTypes = {
  data: PropTypes.object,
};

OrderTransRecInfoTable.defaultProps = {
  data: {},
}

export default OrderTransRecInfoTable;
