import React, { PropTypes } from 'react';
import * as i18n from '../../../../utils/i18n';
import { formatDateString } from '../../../../utils/date';

const TerminalLogInfoTable = (props) => {
  const bizMap = i18n.bizMap('tms/terminalLog');
  const dataMap = i18n.bizMap('tms/tmsData');
  const { data } = props;
  const commonMap = i18n.commonMap();
  const getorg = (text) => {
    let txt = '';
    switch (text) {
      case '1': txt = commonMap['org-1']; break;
      case '2': txt = commonMap['org-2']; break;
      case '3': txt = commonMap['org-3']; break;
      case '4': txt = commonMap['org-4']; break;
      default: txt = '';
    }
    return txt;
  };
  const getopt = (text) => {
    let txt = '';
    switch (text) {
      case '0': txt = dataMap['optStep-0']; break;
      case '1': txt = dataMap['optStep-1']; break;
      case '2': txt = dataMap['optStep-2']; break;
      case '3': txt = dataMap['optStep-3']; break;
      case '4': txt = dataMap['optStep-4']; break;
      case '5': txt = dataMap['optStep-5']; break;
      case '6': txt = dataMap['optStep-6']; break;
      default: txt = '';
    }
    return txt;
  };
  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.optTerPhyno}:</td>
          <td>{data.optTerPhyno}</td>
          <td>{bizMap.terNo}:</td>
          <td>{data.terNo}</td>
        </tr>
        <tr>
          <td>{bizMap.optStep}:</td>
          <td>{getopt(data.optStep)}</td>
          <td>{bizMap.optDesc}:</td>
          <td>{data.optDesc}</td>
        </tr>
        <tr>
          <td>{bizMap.optOrg}:</td>
          <td>{getorg(data.optOrg)}</td>
          {/**
          <td>{bizMap.optOrgId}:</td>
          <td>{data.optOrgId}</td>
          */}
        </tr>
        <tr>
          <td>{bizMap.optObj}:</td>
          <td>{data.optObj}</td>
          <td>{bizMap.optDat}:</td>
          <td>{formatDateString(data.optDat)}</td>
        </tr>
      </tbody>
    </table>
  );
}

TerminalLogInfoTable.propTypes = {
  data: PropTypes.object,
};

TerminalLogInfoTable.defaultProps = {
  data: {},
}

export default TerminalLogInfoTable;
