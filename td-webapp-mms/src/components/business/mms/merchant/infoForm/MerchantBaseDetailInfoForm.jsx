import React, { PropTypes } from 'react';
import * as i18n from '../../../../../utils/i18n';
import { formatDateString } from '../../../../../utils/date';
import { buildAreaCode } from '../../../../../utils/continentCountryProvCityUtil';

const MerchantBaseDetailInfoForm = (props) => {
  const bizMap = i18n.bizMap('mms/merchant');
  const { data } = props;
  const provCityDetail = data.merArea ? buildAreaCode(data.merArea) : '';
  const idType = (type) => {
    let idType = '';
    switch (type) {
      case '03':
        idType = bizMap['idType-01'];
        break;
      case '04':
        idType = bizMap['idType-02'];
        break;
      default: idType = '';
        break;
    }
    return idType;
  };
  const merType = (type) => {
    let idType = '';
    switch (type) {
      case '0':
        idType = bizMap['merType-0'];
        break;
      case '1':
        idType = bizMap['merType-1'];
        break;
      case '2':
        idType = bizMap['merType-2'];
        break;
      case '3':
        idType = bizMap['merType-3'];
        break;
      case '4':
        idType = bizMap['merType-4'];
        break;
      case '5':
        idType = bizMap['merType-5'];
        break;
      case '6':
        idType = bizMap['merType-6'];
        break;
      case '7':
        idType = bizMap['merType-7'];
        break;
      case '8':
        idType = bizMap['merType-8'];
        break;
      case '9':
        idType = bizMap['merType-9'];
        break;
      default: idType = '';
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
          <td>{bizMap.merCate}:</td>
          <td>{data.merCate === '1' ? bizMap['merCate-0'] : bizMap['merCate-1']}</td>
        </tr>
        <tr>
          <td>{bizMap.agtId}:</td>
          <td>{data.agtId}</td>
        </tr>
        <tr>
          <td>{bizMap.merSname}:</td>
          <td>{data.merSname}</td>
          <td>{bizMap.bizScope}:</td>
          <td>{data.bizScope}</td>
        </tr>
        <tr>
          <td>{bizMap.merMobile}:</td>
          <td>{data.merMobileAreaCode}-{data.merMobile}</td>
          <td>{bizMap.merPhone}:</td>
          <td>{data.merPhone}</td>
        </tr>
        <tr>
          <td>{bizMap.merFax}:</td>
          <td>{data.merFax}</td>
          <td>{bizMap.merEmail}:</td>
          <td>{data.merEmail}</td>
        </tr>
        <tr>
          <td>{bizMap.merAddress}</td>
          <td>{provCityDetail}</td>
          <td>{bizMap.merPost}:</td>
          <td>{data.merPost}</td>
        </tr>
        <tr>
          <td>{bizMap.merAddr}:</td>
          <td>{data.merAddr}</td>
        </tr>
        <tr>
          <td>{bizMap.contName}:</td>
          <td>{data.merContName}</td>
          <td>{bizMap.ContMobile}:</td>
          <td>{data.merContMobileAreaCode}-{data.merContMobile}</td>
        </tr>
        <tr>
          <td>{bizMap.contPhone}:</td>
          <td>{data.contPhone}</td>
          <td>{bizMap.contEmail}:</td>
          <td>{data.contEmail}</td>
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
          <td>
            {data.merType === '0' || data.merType === '1' ? bizMap.bizLic : ''}
            {data.merType === '2' ? bizMap.instCert : ''}
            {data.merType === '3' ? bizMap.lawCert : ''}
          </td>
          <td>
            {data.merType === '0' || data.merType === '1' ? data.bizLic : ''}
            {data.merType === '2' ? data.instCert : ''}
            {data.merType === '3' ? data.lawCert : ''}
          </td>
          <td>{bizMap.orgValidDat}:</td>
          <td>
            {data.merType === '0' || data.merType === '1' ? formatDateString(data.licEffDat) : ''}
            {data.merType === '2' ? formatDateString(data.certEffDat) : ''}
            {data.merType === '3' ? formatDateString(data.lawEffDat) : ''}
            ~
            {data.merType === '0' || data.merType === '1' ? formatDateString(data.licExpDat) : ''}
            {data.merType === '2' ? formatDateString(data.certExpDat) : ''}
            {data.merType === '3' ? formatDateString(data.lawExpDat) : ''}
          </td>
        </tr>
        <tr>
          <td>{bizMap.orgCod}:</td>
          <td>{data.orgCod}</td>
          <td>{bizMap.orgValidDat}:</td>
          <td>{formatDateString(data.orgEffDat)}~{formatDateString(data.orgExpDat)}</td>
        </tr>
        <tr>
          <td>{bizMap.taxNo}:</td>
          <td>{data.taxNo}</td>
        </tr>
        <tr>
          <td>{bizMap.agtName}:</td>
          <td>{data.agtName}</td>
          {/*<td>{bizMap.bizSale}:</td>
          <td>{data.bizSaleName ? data.bizSaleName : data.bizSale}</td>*/}
        </tr>
      </tbody>
    </table>
  );
}

MerchantBaseDetailInfoForm.propTypes = {
  data: PropTypes.object,
};

MerchantBaseDetailInfoForm.defaultProps = {
  data: {},
}

export default MerchantBaseDetailInfoForm;
