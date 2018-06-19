import React, { PropTypes } from 'react';
import { Timeline, table } from 'antd';
import * as i18n from '../../../../utils/i18n';
import { formatDateString } from '../../../../utils/date';

const TerminalStockLogInfoTable = (props) => {
  const bizMap = i18n.bizMap('tms/terminalLog');
  const dataMap = i18n.bizMap('tms/tmsData');
  const { data, stockLogList } = props;
  const getOptStep = (text) => {
    let optStep = '';
    switch (text) {
      case '0': optStep = dataMap['optStep-0']; break;
      case '1': optStep = dataMap['optStep-1']; break;
      case '2': optStep = dataMap['optStep-2']; break;
      case '3': optStep = dataMap['optStep-3']; break;
      case '4': optStep = dataMap['optStep-4']; break;
      case '5': optStep = dataMap['optStep-5']; break;
      case '6': optStep = dataMap['optStep-6']; break;
      default: optStep = '';
    }
    return optStep;
  };
  const getOptOrg = (text) => {
    let optOrg = '';
    switch (text) {
      case '1': optOrg = dataMap['optOrg-1']; break;
      case '2': optOrg = dataMap['optOrg-2']; break;
      case '3': optOrg = dataMap['optOrg-3']; break;
      case '4': optOrg = dataMap['optOrg-4']; break;
      default: optOrg = '';
    }
    return optOrg;
  };
  const items = stockLogList.map((item, i) => {
    return (
      <Timeline.Item key={i} color="blue">
        <p>{bizMap.optDat}：{formatDateString(item.optDat)}</p>
        <p>{bizMap.optObj}：{item.optObj}</p>
        <p>{bizMap.optStep}：<font color="#00A0E8">{getOptStep(item.optStep)}</font></p>
        <p>{bizMap.optOrg}：{getOptOrg(item.optOrg)}</p>
        <p>{bizMap.optDesc}：{item.optDesc}</p>
      </Timeline.Item>
    );
  });
  return (
    <div>
      <table className="detail_table" style={{ marginBottom: 16 }}>
        <tbody>
          <tr>
            <td>{bizMap.terPhyno}:</td>
            <td>{data.terPhyno}</td>
          </tr>
        </tbody>
      </table>
      <Timeline>
        {items}
      </Timeline>
    </div>
  );
}

TerminalStockLogInfoTable.propTypes = {
  data: PropTypes.object,
  stockLogList: PropTypes.array,
};

TerminalStockLogInfoTable.defaultProps = {
  data: {},
  stockLogList: [],
}

export default TerminalStockLogInfoTable;
