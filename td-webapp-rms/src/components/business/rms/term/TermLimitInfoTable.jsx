import React, { PropTypes } from 'react';
import * as i18n from '../../../../utils/i18n';
import { formatDateString } from '../../../../utils/date';

const TermLimitInfoTable = (props) => {
  const bizMap = i18n.bizMap('rms/termLimit');
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
          <td>{bizMap.terId}:</td>
          <td>{data.terId}</td>
        </tr>
        <tr>
          <td>{bizMap.limitStatus}:</td>
          <td>{limitStatus}</td>
        </tr>
        <tr>
          <td>{bizMap.terOneLimitAmt}:</td>
          <td>{data.terOneLimitAmt}</td>
        </tr>
        <tr>
          <td>{bizMap.terOneTopAmt}:</td>
          <td>{data.terOneTopAmt}</td>
        </tr>
        <tr>
          <td>{bizMap.terDayTopAmt}:</td>
          <td>{data.terDayTopAmt}</td>
        </tr>
        <tr>
          <td>{bizMap.terMonTopAmt}:</td>
          <td>{data.terMonTopAmt}</td>
        </tr>
        <tr>
          <td>{bizMap.terDayTopCount}:</td>
          <td>{data.terDayTopCount}</td>
        </tr>
        <tr>
          <td>{bizMap.terMonTopCount}:</td>
          <td>{data.terMonTopCount}</td>
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

TermLimitInfoTable.propTypes = {
  data: PropTypes.object,
};

TermLimitInfoTable.defaultProps = {
  data: {},
}

export default TermLimitInfoTable;
