import React, { PropTypes } from 'react';
import { Cascader } from 'antd';
import * as i18n from '../../../../utils/i18n';
import { formatDateString } from '../../../../utils/date';
import MulUpload from '../../../common/MulUpload';
import cascaderAppPlatform from '../../../../../config/i18n/zh-cn/tms/cascaderAppPlatform.json';

const TerminalAppInfoTable = (props) => {
  const bizMap = i18n.bizMap('tms/terminalApp');
  const dataMap = i18n.bizMap('tms/tmsData');
  const { data } = props;
  const image = 'data:image/png;base64,';
  let appAutoUpdate;
  switch (data.appAutoUpdate) {
    case '01': appAutoUpdate = dataMap['appAutoUpdate-01']; break;
    case '02': appAutoUpdate = dataMap['appAutoUpdate-02']; break;
    case '03': appAutoUpdate = dataMap['appAutoUpdate-03']; break;
    default: appAutoUpdate = '';
  }
  const logFiles = [
    {
      label: bizMap.preModFjsrcPic01,
      name: 'log.png',
      editable: false,
      url: image + data.fjsrcsPic01,
      data: { LX: 'PIC', ORDERNUM: '1' },
    },
  ];
  const descFiles = [
    {
      label: 'appDesc1',
      name: 'a.png',
      editable: false,
      url: image + data.fjsrcsPic01,
      data: { LX: 'PIC', ORDERNUM: '01' },
    },
    {
      label: 'appDesc2',
      name: 'b.png',
      editable: false,
      url: image + data.fjsrcsPic02,
      data: { LX: 'PIC', ORDERNUM: '02' },
    },
    {
      label: 'appDesc3',
      name: 'c.png',
      editable: false,
      url: image + data.fjsrcsPic03,
      data: { LX: 'PIC', ORDERNUM: '03' },
    },
    {
      label: 'appDesc4',
      name: 'd.png',
      editable: false,
      url: image + data.fjsrcsPic04,
      data: { LX: 'PIC', ORDERNUM: '04' },
    },
  ];
  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.appName}:</td>
          <td>{data.appName}</td>
          <td>{bizMap.appPackage}:</td>
          <td>{data.appPackage}</td>
        </tr>
        <tr>
          <td>{bizMap.appVersion}:</td>
          <td>{data.appVersion}</td>
          <td>{bizMap.appIssueDate}:</td>
          <td>{formatDateString(data.appIssueDate)}</td>
        </tr>
        <tr>
          <td>{bizMap.appPlatform}:</td>
          <td><Cascader disable defaultValue={data.appPlatform ? [data.appPlatform, data.appTerTyp] : null} options={cascaderAppPlatform} /></td>
          <td>{bizMap.appAutoUpdate}:</td>
          <td>{appAutoUpdate}</td>
        </tr>
        <tr>
          <td>{bizMap.appSzie}:</td>
          <td>{data.appSzie}</td>
          <td>{bizMap.appLogo}:</td>
          <td><MulUpload files={logFiles} /></td>
        </tr>
        <tr>
          <td>{bizMap.appDesc}:</td>
          <td colSpan="3">{data.appDesc}</td>
        </tr>
        <tr>
          <td>{bizMap.appDescPic}:</td>
          <td colSpan="3"><MulUpload files={descFiles} /></td>
        </tr>
      </tbody>
    </table>
  );
}

TerminalAppInfoTable.propTypes = {
  data: PropTypes.object,
};

TerminalAppInfoTable.defaultProps = {
  data: {},
}

export default TerminalAppInfoTable;
