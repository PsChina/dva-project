import React, { PropTypes } from 'react';
import * as i18n from '../../../../utils/i18n';

const JobTriggerInfoTable = (props) => {
  const bizMap = i18n.bizMap('bas/jobTriggerInfo');
  // const commonMap = i18n.commonMap();
  const { data } = props;
  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.jobGroup}:</td>
          <td>{data.jobGroup}</td>
          <td>{bizMap.jobName}:</td>
          <td>{data.jobName}</td>
        </tr>
        <tr>
          <td>{bizMap.jobCron}:</td>
          <td>{data.jobCron}</td>
          <td>{bizMap.jobDesc}:</td>
          <td>{data.jobDesc}</td>
        </tr>
        <tr>
          <td>{bizMap.jobClass}:</td>
          <td>{data.jobClass}</td>
          <td>{bizMap.executorAddress}:</td>
          <td>{data.executorAddress}</td>
        </tr>
        <tr>
          <td>{bizMap.executorHandler}:</td>
          <td>{data.executorHandler}</td>
          <td>{bizMap.executorParam}:</td>
          <td>{data.executorParam}</td>
        </tr>
        <tr>
          <td>{bizMap.author}:</td>
          <td>{data.author}</td>
          <td>{bizMap.alarmEmail}:</td>
          <td>{data.alarmEmail}</td>
        </tr>
        <tr>
          <td>{bizMap.alarmThreshold}:</td>
          <td>{data.alarmThreshold}</td>
        </tr>
        <tr>
          <td>{bizMap.addTime}:</td>
          <td>{data.addTime}</td>
          <td>{bizMap.updateTime}:</td>
          <td>{data.updateTime}</td>
        </tr>
        <tr>
          <td>{bizMap.glueSwitch}:</td>
          <td>{data.glueSwitch}</td>
          <td>{bizMap.glueSource}:</td>
          <td>{data.glueSource}</td>
        </tr>
        <tr>
          <td>{bizMap.glueRemark}:</td>
          <td>{data.glueRemark}</td>
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
