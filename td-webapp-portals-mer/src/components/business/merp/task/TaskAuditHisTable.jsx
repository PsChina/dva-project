import React, { PropTypes } from 'react';
import { Timeline, table } from 'antd';
import * as i18n from '../../../../utils/i18n';
import { formatDateString } from '../../../../utils/date';

const TaskAuditHisTable = (props) => {
  const bizMap = i18n.bizMap('merp/task');
  const { data } = props;
  const items = data.auditHisList.map((item, i) => {
    return (
      <Timeline.Item key={i} color={item.operatedate === null ? 'red' : 'blue'}>
        <p>{item.operatedate === null ? bizMap.unHandle : formatDateString(item.operatedate)}</p>
        <p>{bizMap.auditProcedure}: {item.nodename}</p>
        <p>{bizMap.auditOpinions}: {item.approvedescription}</p>
        <p><b>{item.operatorcode === null || item.operatorcode === '' ? '' : `By：${item.operatorcode}`}</b></p>
      </Timeline.Item>
    );
  });
  return (
    <div>
      <table className="detail_table">
        <tbody>
          <tr>
            <td>{data.auditHisTitle}</td>
          </tr>
        </tbody>
      </table>
      <div style={{ marginTop: '20px' }} >
        <Timeline>
          {items}
        </Timeline>
      </div>
    </div>
  );
}

TaskAuditHisTable.propTypes = {
  data: PropTypes.object,
};

TaskAuditHisTable.defaultProps = {
  data: {},
}

export default TaskAuditHisTable;
