import React, { PropTypes } from 'react';
import * as i18n from '../../../../utils/i18n';
import { formatDateString } from '../../../../utils/date';
import { amtMinUnitToStandUnit } from '../../../../utils/amount';

const BankcardHisOrderInfoTable = (props) => {
  const { data } = props;
  const bizMap = i18n.bizMap('merp/bankcardOrder');
  const dataMap = i18n.bizMap('merp/omsData');

  let txnType = '';
  switch (data.txnType) {
    case 'S': txnType = dataMap['txnType-S']; break;
    case 'A': txnType = dataMap['txnType-A']; break;
    case 'C': txnType = dataMap['txnType-C']; break;
    case 'R': txnType = dataMap['txnType-R']; break;
    case 'P': txnType = dataMap['txnType-P']; break;
    case 'T': txnType = dataMap['txnType-T']; break;
    case 'U': txnType = dataMap['txnType-U']; break;
    case 'M': txnType = dataMap['txnType-M']; break;
    case 'E': txnType = dataMap['txnType-E']; break;
    default: txnType = '';
  }

  let txnChannel = '';
  switch (data.txnChannel) {
    case '0001': txnChannel = dataMap['txnChannel-0001']; break;
    case '0002': txnChannel = dataMap['txnChannel-0002']; break;
    case '0003': txnChannel = dataMap['txnChannel-0003']; break;
    case '0004': txnChannel = dataMap['txnChannel-0004']; break;
    case '1011': txnChannel = dataMap['txnChannel-1011']; break;
    case '1012': txnChannel = dataMap['txnChannel-1012']; break;
    default: txnChannel = '';
  }

  let cardType = '';
  switch (data.cardType) {
    case '01': cardType = dataMap['cardType-01']; break;
    case '02': cardType = dataMap['cardType-02']; break;
    case '03': cardType = dataMap['cardType-03']; break;
    case '04': cardType = dataMap['cardType-04']; break;
    default: cardType = '';
  }

  let txnStatus;
  switch (data.txnStatus) {
    case '0': txnStatus = dataMap['txnStatus-0']; break;
    case 'S': txnStatus = dataMap['txnStatus-S']; break;
    case 'C': txnStatus = dataMap['txnStatus-C']; break;
    case 'R': txnStatus = dataMap['txnStatus-R']; break;
    case 'T': txnStatus = dataMap['txnStatus-T']; break;
    case 'F': txnStatus = dataMap['txnStatus-F']; break;
    case 'E': txnStatus = dataMap['txnStatus-E']; break;
    case 'P': txnStatus = dataMap['txnStatus-P']; break;
    default: txnStatus = '';
  }
  let routType = '';
  switch (data.routType) {
    case '0': routType = dataMap['routType-0']; break;
    case '1': routType = dataMap['routType-1']; break;
    default: routType = '';
  }
  let freezeStatus = '';
  switch (data.freezeStatus) {
    case '0': freezeStatus = dataMap['freezeStatus-0']; break;
    case '1': freezeStatus = dataMap['freezeStatus-1']; break;
    case '2': freezeStatus = dataMap['freezeStatus-2']; break;
    default: freezeStatus = '';
  }
  let clearStatus = '';
  switch (data.clearStatus) {
    case '0': clearStatus = dataMap['clearStatus-0']; break;
    case '1': clearStatus = dataMap['clearStatus-1']; break;
    case '2': clearStatus = dataMap['clearStatus-2']; break;
    default: clearStatus = '';
  }
  let chkStatus = '';
  switch (data.chkStatus) {
    case '0': chkStatus = dataMap['chkStatus-0']; break;
    case '1': chkStatus = dataMap['chkStatus-1']; break;
    default: chkStatus = '';
  }
  let stlStatus = '';
  switch (data.stlStatus) {
    case '0': stlStatus = dataMap['stlStatus-0']; break;
    case '1': stlStatus = dataMap['stlStatus-1']; break;
    default: stlStatus = '';
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
          <td>{bizMap.merNo}:</td>
          <td>{data.merNo}</td>
          <td>{bizMap.terNo}:</td>
          <td>{data.terNo}</td>
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
          <td>{bizMap.txnAmt}:</td>
          <td>{amtMinUnitToStandUnit(data.txnAmt, data.currency)}</td>
          <td>{bizMap.txnType}:</td>
          <td>{txnType}</td>
          <td>{bizMap.txnStatus}:</td>
          <td>{txnStatus}</td>

        </tr>
        <tr>
          <td>{bizMap.currency}:</td>
          <td>{data.currency}</td>
          <td>{bizMap.cardNo}:</td>
          <td>{data.cardNo}</td>
          <td>{bizMap.cardType}:</td>
          <td>{cardType}</td>
        </tr>
        <tr>
          <td>{bizMap.cardIssinam}:</td>
          <td>{data.cardIssinam}</td>
          <td>{bizMap.txnChannel}:</td>
          <td>{txnChannel}</td>
          <td>{bizMap.refAmt}:</td>
          <td>{data.refAmt}</td>
        </tr>
        <tr>
          <td colSpan="6" style={{ backgroundColor: '#FFF' }} />
        </tr>
        <tr>
          <td colSpan="6">{bizMap.orderFeeInfo}</td>
        </tr>
        <tr>
          <td>{bizMap.txnRate}:</td>
          <td>{data.txnRate}</td>
          <td>{bizMap.chnFeeLim}:</td>
          <td>{data.chnFeeLim}</td>
          <td>{bizMap.txnFee}:</td>
          <td>{data.txnFee}</td>
        </tr>
        <tr>
          <td>{bizMap.shaRate}:</td>
          <td>{data.shaRate}</td>
          <td>{bizMap.shaLim}:</td>
          <td>{data.shaLim}</td>
          <td>{bizMap.shaCost}:</td>
          <td>{data.shaCost}</td>
        </tr>
        <tr><td colSpan="6" style={{ backgroundColor: '#FFF' }} /></tr>
        <tr>
          <td colSpan="6">{bizMap.orderChnInfo}</td>
        </tr>
        <tr>
          <td>{bizMap.chnName}:</td>
          <td>{data.chnName}</td>
          <td>{bizMap.tseqNo}:</td>
          <td>{data.tseqNo}</td>
          <td>{bizMap.tsrefno}:</td>
          <td>{data.tsrefno}</td>
        </tr>
        <tr>
          <td>{bizMap.tautcod}:</td>
          <td>{data.tautcod}</td>
          <td>{bizMap.ttxnTime}:</td>
          <td>{formatDateString(data.ttxnTime)}</td>
          <td>{bizMap.routType}:</td>
          <td>{routType}</td>
        </tr>
        <tr>
          <td>{bizMap.chnRate}:</td>
          <td>{data.chnRate}</td>
          <td>{bizMap.chnFee}:</td>
          <td>{data.chnFee}</td>
          <td>{bizMap.chnFeeLim}:</td>
          <td>{data.chnFeeLim}</td>
        </tr>
        <tr><td colSpan="6" style={{ backgroundColor: '#FFF' }} /></tr>
        <tr>
          <td colSpan="6">{bizMap.orderStlInfo}</td>
        </tr>
        <tr>
          <td>{bizMap.freezeStatus}:</td>
          <td>{freezeStatus}</td>
          <td>{bizMap.chkStatus}:</td>
          <td>{chkStatus}</td>
          <td>{bizMap.stlStatus}:</td>
          <td>{stlStatus}</td>
        </tr>
        <tr>
          <td>{bizMap.clearStatus}:</td>
          <td>{clearStatus}</td>
        </tr>
      </tbody>
    </table >
  );
}

BankcardHisOrderInfoTable.propTypes = {
  data: PropTypes.object,
};

BankcardHisOrderInfoTable.defaultProps = {
  data: {},
}

export default BankcardHisOrderInfoTable;
