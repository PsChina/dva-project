import React, { PropTypes } from 'react';
import * as i18n from '../../../../utils/i18n';

const JobTriggerInfoTable = (props) => {
  const bizMap = i18n.bizMap('bas/jobTriggerLog');
  // const commonMap = i18n.commonMap();
  const { data } = props;
  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.id}:</td>
          <td>{data.id}</td>
        </tr>
        <tr>
          <td>{bizMap.triggerMsg}:</td>
          <td><div dangerouslySetInnerHTML={{ __html: data.logInfo }} /></td>
        </tr>
      </tbody>
    </table>
  );
}

JobTriggerInfoTable.propTypes = {
  data: PropTypes.object,
};

JobTriggerInfoTable.defaultProps = {
  data: {},
}

export default JobTriggerInfoTable;
