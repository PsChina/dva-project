import React, { PropTypes } from 'react';
import * as i18n from '../../../../utils/i18n';
import { formatDateString } from '../../../../utils/date';

const QrLimitInfoTable = (props) => {
  const bizMap = i18n.bizMap('rms/qrLimit');
  const commonMap = i18n.commonMap();
  const { data } = props;

  let limitStatus;
  switch (data.limitStatus) {
    case '0': limitStatus = commonMap['status-0']; break;
    case '1': limitStatus = commonMap['status-1']; break;
    default: limitStatus = '';
  }

  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.qrId}:</td>
          <td>{data.qrId}</td>
        </tr>
        <tr>
          <td>{bizMap.limitStatus}:</td>
          <td>{limitStatus}</td>
        </tr>
        <tr>
          <td>{bizMap.qrOneLimitAmt}:</td>
          <td>{data.qrOneLimitAmt}</td>
        </tr>
        <tr>
          <td>{bizMap.qrOneTopAmt}:</td>
          <td>{data.qrOneTopAmt}</td>
        </tr>
        <tr>
          <td>{bizMap.qrDayTopAmt}:</td>
          <td>{data.qrDayTopAmt}</td>
        </tr>
        <tr>
          <td>{bizMap.qrMonTopAmt}:</td>
          <td>{data.qrMonTopAmt}</td>
        </tr>
        <tr>
          <td>{bizMap.qrDayTopCount}:</td>
          <td>{data.qrDayTopCount}</td>
        </tr>
        <tr>
          <td>{bizMap.qrMonTopCount}:</td>
          <td>{data.qrMonTopCount}</td>
        </tr>
        <tr>
          <td>{bizMap.addTim}:</td>
          <td>{formatDateString(data.addTim)}</td>
        </tr>
        <tr>
          <td>{bizMap.updTim}:</td>
          <td>{formatDateString(data.updTim)}</td>
        </tr>
        <tr>
          <td>{bizMap.operId}:</td>
          <td>{data.operId}</td>
        </tr>
      </tbody>
    </table>
  );
}

QrLimitInfoTable.propTypes = {
  data: PropTypes.object,
};

QrLimitInfoTable.defaultProps = {
  data: {},
}

export default QrLimitInfoTable;
