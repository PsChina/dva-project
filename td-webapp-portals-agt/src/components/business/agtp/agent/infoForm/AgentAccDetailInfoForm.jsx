import React, { PropTypes } from 'react';
import * as i18n from '../../../../../utils/i18n';
import { buildAreaCode } from '../../../../../utils/continentCountryProvCityUtil';

const AgentAccDetailInfoForm = (props) => {
  const bizMap = i18n.bizMap('agtp/agent');
  const { data } = props;
  const provCityDetail = data.stlCity ? buildAreaCode(data.stlCity) : '';
  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.stlName}:</td>
          <td>{data.stlName}</td>
          <td>{bizMap.stlAcc}:</td>
          <td>{data.stlAcc}</td>
        </tr>
        <tr>
          <td>{bizMap.stlBankName}:</td>
          <td>{data.stlBankName}</td>
          <td>{bizMap.stlBank}:</td>
          <td>{data.stlBank}</td>
        </tr>
        <tr>
          <td>{bizMap.stlCnapsName}:</td>
          <td>{data.stlCnapsName}</td>
          <td>{bizMap.stlCnaps}:</td>
          <td>{data.stlCnaps}</td>
        </tr>
        <tr>
          <td>{bizMap.ccy}:</td>
          <td>{data.ccy}</td>
          <td>{bizMap.agtprovCityArea}:</td>
          <td>{provCityDetail}</td>
        </tr>
      </tbody>
    </table>
  );
}

AgentAccDetailInfoForm.propTypes = {
  data: PropTypes.object,
};

AgentAccDetailInfoForm.defaultProps = {
  data: {},
}

export default AgentAccDetailInfoForm;
