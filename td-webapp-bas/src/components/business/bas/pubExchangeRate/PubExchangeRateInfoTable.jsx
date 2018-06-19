import React, { PropTypes } from 'react';
import * as i18n from '../../../../utils/i18n';

const PubExchangeRateInfoTable = (props) => {
  const bizMap = i18n.bizMap('bas/pubMcc');
  // const commonMap = i18n.commonMap();
  const { data } = props;
  let mccChannel = '';
  switch (data.mccChannel) {
    case 'UnionPay': mccChannel = bizMap['mccChannel-01']; break;
    case 'AliPay': mccChannel = bizMap['mccChannel-02']; break;
    default: mccChannel = ''; break;
  }
  let mccUnistdrat = '';
  switch (data.mccUnistdrat) {
    case '1': mccUnistdrat = bizMap['mccUnistdrat-01']; break;
    case '2': mccUnistdrat = bizMap['mccUnistdrat-02']; break;
    case '3': mccUnistdrat = bizMap['mccUnistdrat-03']; break;
    default: mccUnistdrat = ''; break;
  }
  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.mccChannel}:</td>
          <td>{mccChannel}</td>
        </tr>
        <tr>
          <td>{bizMap.mccCode}:</td>
          <td>{data.mccCode}</td>
        </tr>
        <tr>
          <td>{bizMap.mccCls}:</td>
          <td>{data.mccCls}</td>
        </tr>
        <tr>
          <td>{bizMap.mccUnistdrat}:</td>
          <td>{mccUnistdrat}</td>
        </tr>
        <tr>
          <td>{bizMap.mccDesc}:</td>
          <td>{data.mccDesc}</td>
        </tr>
      </tbody>
    </table>
  );
}

PubExchangeRateInfoTable.propTypes = {
  data: PropTypes.object,
};

PubExchangeRateInfoTable.defaultProps = {
  data: {},
}

export default PubExchangeRateInfoTable;
