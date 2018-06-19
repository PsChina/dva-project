import { Timeline, Spin } from 'antd';
import React, { PropTypes } from 'react';
import * as i18n from '../../../../utils/i18n';
import { formatDateString } from '../../../../utils/date';


const TaskMonitorProcess = (props) => {
  const bizMap = i18n.bizMap('bas/taskMonitor');
  const commonMap = i18n.commonMap();
  const loading = false;
  const { taskCfgList } = props;
  const items = taskCfgList.map((item, i) => {
    return (
      item.positioncode === '1005' ?
        <Timeline.Item key={i} color="blue">
          <p>{item.nodename}</p>
          <p>{item.positionname}：{item.operatorname}</p>
          <p>{bizMap.createdate}：{formatDateString(item.createdate)}</p>
        </Timeline.Item>
       :
        <Timeline.Item key={i} color="blue">
          <p>{item.nodename}</p>
          <p>{item.positionname}：{item.operatorname}</p>
          <p>{bizMap.operatedate}：{formatDateString(item.operatedate)}</p>
          <p>{commonMap.approveResult}：{item.approvestatus === '1' ? commonMap.approvestatus1 : commonMap.approvestatus0}</p>
          <p>{bizMap.approvedescription}：{item.approvedescription}</p>
        </Timeline.Item>
    );
  });
  if (taskCfgList.length === 0) {
    return (
      <Spin spinning={loading}><br /><h3>{commonMap.noData}</h3><br /></Spin>
    );
  } else {
    return (
      <Spin spinning={loading}>
        <br />
        <Timeline>
          {
            items
          }
        </Timeline>
      </Spin>
    );
  }
}

TaskMonitorProcess.propTypes = {
  taskCfgList: PropTypes.array,
};

TaskMonitorProcess.defaultProps = {
  taskCfgList: [],
}

export default TaskMonitorProcess;
