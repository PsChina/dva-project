import React, {PropTypes} from 'react';
import * as i18n from '../../../../../utils/i18n';
import {formatDateString} from '../../../../../utils/date';
import {buildAreaCode} from '../../../../../utils/continentCountryProvCityUtil';

const MerchantBaseDetailInfoForm = (props) => {
  const bizMap = i18n.bizMap('agtp/merchant');
  const {data, industryList} = props;
  const provCityDetail = data.merArea ? buildAreaCode(data.merArea) : '';
  const industryType = (type) => {
    let industryType = '';
    for (let key of Object.keys(industryList)) {
      if (industryList[key].code === type) {
        industryType = industryList[key].desc;
        break;
      }
    }
    return industryType;
  };
  const idType = (type) => {
    let idType = '';
    switch (type) {
      case '03':
        idType = bizMap['idType-01'];
        break;
      case '04':
        idType = bizMap['idType-02'];
        break;
      default:
        idType = '';
        break;
    }
    return idType;
  };
  const merType = (type) => {
    let idType = '';
    switch (type) {
      case '0':
        idType = bizMap['merType-10'];
        break;
      case '1':
        idType = bizMap['merType-11'];
        break;
      case '2':
        idType = bizMap['merType-12'];
        break;
      case '3':
        idType = bizMap['merType-13'];
        break;
      case '4':
        idType = bizMap['merType-14'];
        break;
      default:
        idType = '';
        break;
    }
    return idType;
  };
  const merchantType = (type) => {
    let idType = '';
    switch (type) {
      case '1':
        idType = bizMap['merchantType-01'];
        break;
      case '2':
        idType = bizMap['merchantType-02'];
        break;
      case '3':
        idType = bizMap['merchantType-03'];
        break;
      case '4':
        idType = bizMap['merchantType-04'];
        break;
      default:
        idType = '';
        break;
    }
    return idType;
  };
  return (
    <table className="detail_table">
      <tbody>
      <tr>
        <td>{bizMap.merId}:</td>
        <td>{data.merId}</td>
      </tr>
      <tr>
        <td>{bizMap.merName}:</td>
        <td>{data.merName}</td>
      </tr>
      <tr>
        <td>{bizMap.merchantDesc}:</td>
        <td>{data.merchantDesc}</td>
      </tr>
      <tr>
        <td>{bizMap.agtId}:</td>
        <td>{data.agtId}</td>
        <td>{bizMap.industryId}:</td>
        <td>{industryType(data.industryId)}</td>
      </tr>
      <tr>
        <td>{bizMap.merContMobile}:</td>
        <td>{data.merMobileAreaCode}-{data.merContMobile}</td>
        <td>{bizMap.merContPhone}:</td>
        <td>{data.merContPhone}</td>
      </tr>
      <tr>
        <td>{bizMap.merFax}:</td>
        <td>{data.merFax}</td>
        <td>{bizMap.merAddress}</td>
        <td>{provCityDetail}</td>
      </tr>
      <tr>
        <td>{bizMap.merAddr}:</td>
        <td>{data.merAddr}</td>
      </tr>
      <tr>
        <td>{bizMap.merRegAddress}:</td>
        <td>{data.merRegAddress}</td>
      </tr>
      <tr>
        <td>{bizMap.licTime}</td>
        <td>{data.openingTime}-{data.closingTime}</td>
        <td>{bizMap.merContName}:</td>
        <td>{data.merContName}</td>
      </tr>
      <tr>
        <td>{bizMap.merContMobile}</td>
        <td>{data.merContMobile}</td>
        <td>{bizMap.merContPhone}:</td>
        <td>{data.merContPhone}</td>
      </tr>
      <tr>
        <td>{bizMap.merContEmail}:</td>
        <td>{data.merContEmail}</td>
        <td>{bizMap.merSupervisorName}:</td>
        <td>{data.merSupervisorName}</td>
      </tr>
      <tr>
        <td>{bizMap.merSupervisorNameE}:</td>
        <td>{data.merSupervisorNameE}</td>
        <td>{bizMap.merSupervisorPhone}:</td>
        <td>{data.merSupervisorPhone}</td>
      </tr>
      <tr>
        <td>{bizMap.merSupervisorEmail}:</td>
        <td>{data.merSupervisorEmail}</td>
        <td>{bizMap.merSupervisorMobile}:</td>
        <td>{data.merSupervisorMobileAreacode}-{data.merSupervisorMobile}</td>
      </tr>
      <tr>
        <td>{bizMap.merAp}:</td>
        <td>{data.merAp}</td>
        <td>{bizMap.idType}:</td>
        <td>{idType(data.idType)}</td>
      </tr>
      <tr>
        <td>{bizMap.apId}:</td>
        <td>{data.apId}</td>
        <td>{bizMap.idValidDat}:</td>
        <td>{formatDateString(data.idEffDat)}~{formatDateString(data.idExpDat)}</td>
      </tr>
      <tr>
        <td>{bizMap.merType}:</td>
        <td>{merType(data.merType)}</td>
        <td>{bizMap.regFund}:</td>
        <td>{data.regFund}</td>
      </tr>
      <tr>
        <td>{bizMap.bizLic}:</td>
        <td>{data.bizLic}</td>
        <td>{bizMap.taxNo}:</td>
        <td>{data.taxNo}</td>
      </tr>
      <tr>
        <td>{bizMap.merchantType}:</td>
        <td>{merchantType(data.merchantType)}</td>
        <td>{bizMap.monthlyTurnover}</td>
        <td>{data.monthlyTurnover}</td>
      </tr>
      {/*<tr>
        <td>{bizMap.bizSale}</td>
        <td>{data.bizSaleName}</td>
      </tr>*/}
      </tbody>
    </table>
  );
}

MerchantBaseDetailInfoForm.propTypes = {
  data: PropTypes.object,
  industryList: PropTypes.array,
};

MerchantBaseDetailInfoForm.defaultProps = {
  data: {},
  industryList: [],
}

export default MerchantBaseDetailInfoForm;
