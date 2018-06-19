import React, { PropTypes } from 'react';
import * as i18n from '../../../../utils/i18n';
import { formatDateString } from '../../../../utils/date';

const MccLimitInfoTable = (props) => {
  const bizMap = i18n.bizMap('rms/mccLimit');
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
          <td>{bizMap.mccNo}:</td>
          <td>{data.mccNo}</td>
        </tr>
        <tr>
          <td>{bizMap.limitStatus}:</td>
          <td>{limitStatus}</td>
        </tr>
        <tr>
          <td>{bizMap.mccOneLimitAmt}:</td>
          <td>{data.mccOneLimitAmt}</td>
        </tr>
        <tr>
          <td>{bizMap.mccOneTopAmt}:</td>
          <td>{data.mccOneTopAmt}</td>
        </tr>
        <tr>
          <td>{bizMap.mccDayTopAmt}:</td>
          <td>{data.mccDayTopAmt}</td>
        </tr>
        <tr>
          <td>{bizMap.mccMonTopAmt}:</td>
          <td>{data.mccMonTopAmt}</td>
        </tr>
        <tr>
          <td>{bizMap.mccDayTopCount}:</td>
          <td>{data.mccDayTopCount}</td>
        </tr>
        <tr>
          <td>{bizMap.mccMonTopCount}:</td>
          <td>{data.mccMonTopCount}</td>
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

MccLimitInfoTable.propTypes = {
  data: PropTypes.object,
};

MccLimitInfoTable.defaultProps = {
  data: {},
}

export default MccLimitInfoTable;
