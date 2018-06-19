import React, { PropTypes } from 'react';
import { formatDateString } from '../../../../utils/date';
import { buildAreaCode } from '../../../../utils/continentCountryProvCityUtil';
import * as i18n from '../../../../utils/i18n';

const MerInfoTable = (props) => {
  const bizMap = i18n.bizMap('merp/merchant');
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
  const merCate = (cate) => {
    let merCate = '';
    switch (cate) {
      case '1':
        merCate = bizMap['merCate-0'];
        break;
      case '2':
        merCate = bizMap['merCate-1'];
        break;
      default: merCate = '';
        break;
    }
    return merCate;
  };

  const merType = (type) => {
    let merType = '';
    switch (type) {
      case '0':
        merType = bizMap['merType-0'];
        break;
      case '1':
        merType = bizMap['merType-1'];
        break;
      case '2':
        merType = bizMap['merType-2'];
        break;
      case '3':
        merType = bizMap['merType-3'];
        break;
      default: merType = '';
        break;
    }
    return merType;
  };

  return (
    <table className="detail_table" style={{ maxWidth: 640 }}>
      <tbody>
        <tr>
          <td>{bizMap.merId}:</td>
          <td colSpan={3}>{data.merId}</td>
        </tr>
        <tr>
          <td style={{ width: 120 }}>{bizMap.merName}:</td>
          <td style={{ width: 200 }}>{data.merName}</td>
          <td style={{ width: 120 }}>{bizMap.merCate}:</td>
          <td style={{ width: 200 }}>{merCate(data.merCate)}</td>
        </tr>
        <tr>
          <td>{bizMap.merchantDesc}:</td>
          <td>{data.merchantDesc}</td>
          <td>{bizMap.bizScope}:</td>
          <td>{data.bizScope}</td>
        </tr>
        <tr>
          <td>{bizMap.agtId}:</td>
          <td>{data.agtId}</td>
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
          <td colSpan={3}>{data.merAddr}</td>
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
          <td>{bizMap.merchantType}:</td>
          <td>{merchantType(data.merchantType)}</td>
          <td>{bizMap.monthlyTurnover}</td>
          <td>{data.monthlyTurnover}</td>
        </tr>
        <tr>
          <td>{bizMap.bizLic}:</td>
          <td>{data.bizLic}</td>
          <td>{bizMap.taxNo}:</td>
          <td>{data.taxNo}</td>
        </tr>
      </tbody>
    </table>
  );
}

MerInfoTable.propTypes = {
  data: PropTypes.object,
  // loading: PropTypes.bool,
};

MerInfoTable.defaultProps = {
  data: {},
  // loading: false,
}

export default MerInfoTable;
