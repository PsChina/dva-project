import React, { PropTypes } from 'react';
import { Timeline, Spin } from 'antd';
import * as i18n from '../../../../utils/i18n';
import * as date from '../../../../utils/date';

const Item = Timeline.Item;

const ChnChkAuditHistoryLine = (props) => {
  const { data, loading } = props;
  const bizMap = i18n.bizMap('sms/chnChkErrorAudit');

  return (
    <Spin spinning={loading}>
      <Timeline>
        {
          data.map((item, i) => {
            let dealType = '';
            switch (item.dealType) {
              case '00': dealType = bizMap['dealType-00']; break;
              case '01': dealType = bizMap['dealType-01']; break;
              case '02': dealType = bizMap['dealType-02']; break;
              case '03': dealType = bizMap['dealType-03']; break;
              case '04': dealType = bizMap['dealType-04']; break;
              default: break;
            }
            return (
              <Item key={i} color={item.operatedate === null ? 'red' : 'blue'}>
                <p>{item.auditTime === null ? bizMap.notAudit : date.formatDateString(item.auditTime)}</p>
                <p>{item.dealType === null ? '' : `${bizMap.dealType}: ${dealType}`}</p>
                <p>{item.auditRemark === null ? '' : `${bizMap.auditRemark}: ${item.auditRemark}`}</p>
                <p>{item.auditObj === null ? '' : `By: ${item.auditObj}`}</p>
              </Item>
            )
          })
        }
      </Timeline>
    </Spin>
  );
}

ChnChkAuditHistoryLine.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
};

ChnChkAuditHistoryLine.defaultProps = {
  data: [],
  loading: false,
};

export default ChnChkAuditHistoryLine;

