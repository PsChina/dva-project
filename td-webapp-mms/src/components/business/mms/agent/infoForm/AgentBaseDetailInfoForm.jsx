import React, { PropTypes } from 'react';
import * as i18n from '../../../../../utils/i18n';
import { formatDateString } from '../../../../../utils/date';
import {
  getContinentLabel, getContinentLabelArray, getCountryLabel, getCountryLabelArray,
  getProvLabel, getProvLabelArray, getCityLabel, getCityLabelArray, buildAreaCode,
} from '../../../../../utils/continentCountryProvCityUtil';

const AgentBaseDetailInfoForm = (props) => {
  const bizMap = i18n.bizMap('mms/agent');
  const { data } = props;
  const provCityDetail = data.agtArea ? buildAreaCode(data.agtArea) : '';
  const agtProxyContinent = data.agtProxyContinent ? (data.agtScope === '01' ? getContinentLabelArray(data.agtProxyContinent).join('、') : getContinentLabel(data.agtProxyContinent)) : '';
  const agtProxyCountry = data.agtProxyCountry ? (data.agtScope === '02' ? getCountryLabelArray(data.agtProxyCountry).join('、') : getCountryLabel(data.agtProxyCountry)) : '';
  const agtProxyProv = data.agtProxyProv ? (data.agtScope === '03' ? getProvLabelArray(data.agtProxyProv).join('、') : getProvLabel(data.agtProxyProv)) : '';
  const agtProxyCity = data.agtProxyCity ? (data.agtScope === '04' ? getCityLabelArray(data.agtProxyCity).join('、') : getCityLabel(data.agtProxyCity)) : '';
  const agtType = (type) => {
    let agtType = '';
    switch (type) {
      case '0':
        agtType = bizMap['agtType-0'];
        break;
      case '1':
        agtType = bizMap['agtType-1'];
        break;
      default: agtType = '';
        break;
    }
    return agtType;
  }
  const idType = (type) => {
    let idType = '';
    switch (type) {
      case '03':
        idType = bizMap['certType-01'];
        break;
      case '04':
        idType = bizMap['certType-02'];
        break;
      default: idType = '';
        break;
    }
    return idType;
  };
  const agtScope = (value) => {
    let agtScope = '';
    switch (value) {
      case '01':
        agtScope = bizMap['agtScope-01'];
        break;
      case '02':
        agtScope = bizMap['agtScope-02'];
        break;
      case '03':
        agtScope = bizMap['agtScope-03'];
        break;
      case '04':
        agtScope = bizMap['agtScope-04'];
        break;
      default: agtScope = '';
        break;
    }
    return agtScope;
  };
  return (
    <table className="detail_table">
      <tbody>
        {data.agtId ?
          <tr>
            <td>{bizMap.agtId}:</td>
            <td>{data.agtId}</td>
          </tr>
          :
          null}
        <tr>
          <td>{bizMap.agtName}:</td>
          <td>{data.agtName}</td>
          <td>{bizMap.agtType}:</td>
          <td>{agtType(data.agtType)}</td>
        </tr>
        <tr>
          <td>{bizMap.agtLv}:</td>
          <td>{data.agtLv}</td>
          <td>{bizMap.agtStatus}:</td>
          <td>{data.agtStatus === '0' ? bizMap['agtStatus-02'] : bizMap['agtStatus-01']}</td>
        </tr>
        {/*<tr>
          <td>{bizMap.agtScope}:</td>
          <td>{agtScope(data.agtScope)}</td>
        </tr>
        <tr hidden={!data.agtScope || !data.agtScope === '01'}>
          <td>{bizMap.provCityArea}:</td>
          <td colSpan={3}>
            {data.agtScope === '01' || data.agtScope === '02' || data.agtScope === '03' || data.agtScope === '04' ? agtProxyContinent : ''}
            -{data.agtScope === '02' || data.agtScope === '03' || data.agtScope === '04' ? agtProxyCountry : ''}
            -{data.agtScope === '03' || data.agtScope === '04' ? agtProxyProv : ''}
            -{data.agtScope === '04' ? agtProxyCity : ''}
          </td>
        </tr>*/}
        <tr>
          <td>{bizMap.agtInProvCityArea}:</td>
          <td>{provCityDetail}</td>
          <td>{bizMap.agtAddr}:</td>
          <td>{data.agtAddr}</td>
        </tr>
        <tr>
          <td>{bizMap.agtMobile}:</td>
          <td>{data.agtMobileAreaCode}-{data.agtMobile}</td>
          <td>{bizMap.agtPost}:</td>
          <td>{data.agtPost}</td>
        </tr>
        <tr>
          <td>{bizMap.agtEmail}:</td>
          <td>{data.agtEmail}</td>
          <td>{bizMap.agtFax}:</td>
          <td>{data.agtFax}</td>
        </tr>
        <tr>
          <td>{bizMap.agtContacts}:</td>
          <td>{data.agtContacts}</td>
          <td>{bizMap.agtContactPhone}:</td>
          <td>{data.agtContactPhone}</td>
        </tr>
        <tr>
          <td>{bizMap.agtAp}:</td>
          <td>{data.agtAp}</td>
          <td>{bizMap.idType}:</td>
          <td>{idType(data.idType)}</td>
        </tr>
        <tr>
          <td>{bizMap.apId}:</td>
          <td>{data.apId}</td>
          <td>{bizMap.idDat}:</td>
          <td>{formatDateString(data.idEffDat)}~{formatDateString(data.idExpDat)}</td>
        </tr>
        <tr hidden={data.agtType === '0'} >
          <td>{bizMap.bizLic}:</td>
          <td>{data.bizLic}</td>
          <td>{bizMap.licDat}:</td>
          <td>{formatDateString(data.licEffDat)}~{formatDateString(data.licExpDat)}</td>
        </tr>
        <tr hidden={data.agtType === '0'}>
          <td>{bizMap.orgCod}:</td>
          <td>{data.orgCod}</td>
          <td>{bizMap.orgDat}:</td>
          <td>{formatDateString(data.orgEffDat)}~{formatDateString(data.orgExpDat)}</td>
        </tr>
        {/*<tr>
          <td>{bizMap.bizSale}:</td>
          <td>{data.bizSaleName ? data.bizSaleName : data.bizSale}</td>
        </tr>*/}
      </tbody>
    </table >
  );
}

AgentBaseDetailInfoForm.propTypes = {
  data: PropTypes.object,
};

AgentBaseDetailInfoForm.defaultProps = {
  data: {},
}

export default AgentBaseDetailInfoForm;
