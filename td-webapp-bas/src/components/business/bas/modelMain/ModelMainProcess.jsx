import { Timeline, Spin } from 'antd';
import React, { PropTypes } from 'react';
import * as i18n from '../../../../utils/i18n';


const ModelMainProcess = (props) => {
  const bizMap = i18n.bizMap('bas/modelMain');
  const commonMap = i18n.commonMap();
  const loading = false;
  const { processCfgList, processName } = props;
  const items = processCfgList.map((item, i) => {
    return (
      <Timeline.Item key={i} color="blue">
        <p>{bizMap.stepName}：{item.nodename}</p>
        <p>{bizMap.positionName}：{item.positionname}</p>
        <p>{bizMap.roleName}：{item.roleNames}</p>
      </Timeline.Item>
    );
  });
  if (processCfgList.length < 1) {
    return (
      <Spin spinning={loading}><h4>{processName}</h4><br /><h3>{commonMap.noData}</h3><br /></Spin>
    );
  } else {
    return (
      <Spin spinning={loading}>
        <h4>{processName}</h4>
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

ModelMainProcess.propTypes = {
  processCfgList: PropTypes.array,
};

ModelMainProcess.defaultProps = {
  processCfgList: [],
}

export default ModelMainProcess;
