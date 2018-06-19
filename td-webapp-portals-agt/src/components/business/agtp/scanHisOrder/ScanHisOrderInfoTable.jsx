import React, { PropTypes } from 'react';
import * as i18n from '../../../../utils/i18n';
import { formatDateString } from '../../../../utils/date';
import { cent2Yuan } from '../../../../utils/currency';

const ScanHisOrderInfoTable = (props) => {
  const { data } = props;
  const bizMap = i18n.bizMap('agtp/scanOrder');

  let txnStatus;
  switch (data.txnStatus) {
    case '0': txnStatus = bizMap['txnStatus-0']; break;
    case 'S': txnStatus = bizMap['txnStatus-S']; break;
    case 'C': txnStatus = bizMap['txnStatus-C']; break;
    case 'R': txnStatus = bizMap['txnStatus-R']; break;
    case 'T': txnStatus = bizMap['txnStatus-T']; break;
    case 'F': txnStatus = bizMap['txnStatus-F']; break;
    case 'E': txnStatus = bizMap['txnStatus-E']; break;
    case 'P': txnStatus = bizMap['txnStatus-P']; break;
    default: txnStatus = '';
  }

  let txnChannel = '';
  switch (data.txnChannel) {
    case '0001': txnChannel = bizMap['txnChannel-0001']; break;
    case '0002': txnChannel = bizMap['txnChannel-0002']; break;
    case '0003': txnChannel = bizMap['txnChannel-0003']; break;
    case '0004': txnChannel = bizMap['txnChannel-0004']; break;
    case '1011': txnChannel = bizMap['txnChannel-1011']; break;
    case '1012': txnChannel = bizMap['txnChannel-1012']; break;
    default: txnChannel = '';
  }

  let txnType;
  switch (data.txnType) {
    case 'A': txnType = bizMap['txnType-A']; break;
    case 'S': txnType = bizMap['txnType-S']; break;
    case 'C': txnType = bizMap['txnType-C']; break;
    case 'R': txnType = bizMap['txnType-R']; break;
    case 'P': txnType = bizMap['txnType-P']; break;
    case 'T': txnType = bizMap['txnType-T']; break;
    case 'U': txnType = bizMap['txnType-U']; break;
    case 'M': txnType = bizMap['txnType-M']; break;
    default: txnType = '';
  }

  return (
    <table className="detail_table" style={{ width: 900 }}>
      <tbody>
        <tr>
          <td colSpan="6">{bizMap.orderBaseInfo}</td>
        </tr>
        <tr>
          <td>{bizMap.txnNo}:</td>
          <td>{data.txnNo}</td>
          <td>{bizMap.terNo}:</td>
          <td>{data.terNo}</td>
          <td>{bizMap.merNo}:</td>
          <td>{data.merNo}</td>
        </tr>
        <tr>
          <td>{bizMap.merName}:</td>
          <td>{data.merName}</td>
          <td>{bizMap.braName}:</td>
          <td>{data.braName}</td>
          <td>{bizMap.agtName}:</td>
          <td>{data.agtName}</td>
        </tr>
        <tr>

          <td>{bizMap.txnChannel}:</td>
          <td>{txnChannel}</td>
          <td>{bizMap.scanType}:</td>
          <td>{txnType}</td>
          <td>{bizMap.txnStatus}:</td>
          <td>{txnStatus}</td>
        </tr>
        <tr>
          <td>{bizMap.txnAmt}:</td>
          <td>{cent2Yuan(data.txnAmt)}</td>
          <td>{bizMap.currency}:</td>
          <td>{data.currency}</td>
          <td>{bizMap.buyerAccount}:</td>
          <td>{data.buyerAccount}</td>
        </tr>
        <tr>
          <td>{bizMap.txnTime}:</td>
          <td>{formatDateString(data.txnDatetime)}</td>
        </tr>
        <tr>
         <td colSpan="6" style={{ backgroundColor: '#FFF' }}></td>
        </tr>
        <tr>
          <td colSpan="6">{bizMap.orderFeeInfo}</td>
        </tr>
        <tr>
          <td>{bizMap.chnFeeLim}:</td>
          <td>{data.txnFeeLim}</td>
          <td>{bizMap.txnFee}:</td>
          <td>{data.txnFee}</td>
          <td>{bizMap.txnRate}:</td>
          <td>{data.txnRate}</td>
        </tr>
        <tr>
          <td colSpan="6" style={{ backgroundColor: '#FFF' }}></td>
        </tr>
        <tr>
          <td colSpan="6">{bizMap.orderChnInfo}</td>
        </tr>
        <tr>
          <td>{bizMap.chnName}:</td>
          <td>{data.chnName}</td>
          <td>{bizMap.chnMerId}:</td>
          <td>{<data className="chnMerId"></data>}</td>
        </tr>
      </tbody>
    </table>
  );
}

ScanHisOrderInfoTable.propTypes = {
  data: PropTypes.object,
};

ScanHisOrderInfoTable.defaultProps = {
  data: {},
}

export default ScanHisOrderInfoTable;
