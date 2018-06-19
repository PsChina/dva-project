import React, { PropTypes } from 'react';
import * as i18n from '../../../../utils/i18n';
import { formatDateString } from '../../../../utils/date';

const MerLimitInfoTable = (props) => {
  const bizMap = i18n.bizMap('rms/merLimit');
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
          <td>{bizMap.merId}:</td>
          <td>{data.merId}</td>
        </tr>
        <tr>
          <td>{bizMap.limitStatus}:</td>
          <td>{limitStatus}</td>
        </tr>
        <tr>
          <td>{bizMap.merOneLimitAmt}:</td>
          <td>{data.merOneLimitAmt}</td>
        </tr>
        <tr>
          <td>{bizMap.merOneTopAmt}:</td>
          <td>{data.merOneTopAmt}</td>
        </tr>
        <tr>
          <td>{bizMap.merDayTopAmt}:</td>
          <td>{data.merDayTopAmt}</td>
        </tr>
        <tr>
          <td>{bizMap.merMonTopAmt}:</td>
          <td>{data.merMonTopAmt}</td>
        </tr>
        <tr>
          <td>{bizMap.merDayTopCount}:</td>
          <td>{data.merDayTopCount}</td>
        </tr>
        <tr>
          <td>{bizMap.merMonTopCount}:</td>
          <td>{data.merMonTopCount}</td>
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

MerLimitInfoTable.propTypes = {
  data: PropTypes.object,
};

MerLimitInfoTable.defaultProps = {
  data: {},
}

export default MerLimitInfoTable;
