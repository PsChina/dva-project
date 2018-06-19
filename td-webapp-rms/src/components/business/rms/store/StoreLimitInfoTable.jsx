import React, { PropTypes } from 'react';
import * as i18n from '../../../../utils/i18n';
import { formatDateString } from '../../../../utils/date';

const StoreLimitInfoTable = (props) => {
  const bizMap = i18n.bizMap('rms/storeLimit');
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
          <td>{bizMap.braId}:</td>
          <td>{data.braId}</td>
        </tr>
        <tr>
          <td>{bizMap.limitStatus}:</td>
          <td>{limitStatus}</td>
        </tr>
        <tr>
          <td>{bizMap.braOneLimitAmt}:</td>
          <td>{data.braOneLimitAmt}</td>
        </tr>
        <tr>
          <td>{bizMap.braOneTopAmt}:</td>
          <td>{data.braOneTopAmt}</td>
        </tr>
        <tr>
          <td>{bizMap.braDayTopAmt}:</td>
          <td>{data.braDayTopAmt}</td>
        </tr>
        <tr>
          <td>{bizMap.braMonTopAmt}:</td>
          <td>{data.braMonTopAmt}</td>
        </tr>
        <tr>
          <td>{bizMap.braDayTopCount}:</td>
          <td>{data.braDayTopCount}</td>
        </tr>
        <tr>
          <td>{bizMap.braMonTopCount}:</td>
          <td>{data.braMonTopCount}</td>
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

StoreLimitInfoTable.propTypes = {
  data: PropTypes.object,
};

StoreLimitInfoTable.defaultProps = {
  data: {},
}

export default StoreLimitInfoTable;
