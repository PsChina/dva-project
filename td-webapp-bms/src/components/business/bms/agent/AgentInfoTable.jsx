import React, { PropTypes } from 'react';
import * as i18n from '../../../../utils/i18n';
import { buildAreaCode } from '../../../../utils/continentCountryProvCityUtil';

const bizMap = i18n.bizMap('bms/agent');
const AgentInfoTable = (props) => {
  const { data } = props;
  return (
    <table className="detail_table" style={{ width: '100%' }}>
      <tbody>
        <tr>
          <td>{bizMap.agtId}:</td>
          <td>{data.agtId}</td>
          <td>{bizMap.agtName}:</td>
          <td colSpan={3}>{data.agtName}</td>
        </tr>
        <tr>
          <td>{bizMap.agtType}:</td>
          <td>{bizMap[`agtType-${data.agtType}`]}</td>
          <td>{bizMap.agtParentName}:</td>
          <td colSpan={3}>{data.agtParentName}</td>
        </tr>
        <tr>
          <td>{bizMap.agtScope}</td>
          <td>{bizMap[`agtScope-${data.agtScope}`]}</td>
          <td>{bizMap.agtProxyArea}:</td>
          <td colSpan={3}>{data.agtProxyArea}</td>
        </tr>
        <tr>
          <td>{bizMap.agtPost}:</td>
          <td>{data.agtPost}</td>
          <td>{bizMap.agtAddr}:</td>
          <td colSpan={3}>{buildAreaCode(data.agtArea)}</td>
        </tr>
        <tr>
          <td>{bizMap.agtPhone}:</td>
          <td>{data.agtPhone}</td>
          <td>{bizMap.agtMobile}:</td>
          <td>{data.agtMobile}</td>
        </tr>
        <tr>
          <td>{bizMap.agtEmail}:</td>
          <td>{data.agtEmail}</td>
          <td>{bizMap.agtFax}:</td>
          <td>{data.agtFax}</td>
        </tr>
        <tr>
          <td>{bizMap.stlAcc}:</td>
          <td>{data.stlAcc}</td>
          <td>{bizMap.stlName}:</td>
          <td>{data.stlName}</td>
        </tr>
        <tr>
          <td>{bizMap.stlBank}:</td>
          <td>{data.stlBank}</td>
          <td>{bizMap.stlCnaps}:</td>
          <td colSpan={3}>{data.stlCnaps}</td>
        </tr>
      </tbody>
    </table>
  );
}

AgentInfoTable.propTypes = {
  data: PropTypes.object,
};

AgentInfoTable.defaultProps = {
  data: {},
}

export default AgentInfoTable;
