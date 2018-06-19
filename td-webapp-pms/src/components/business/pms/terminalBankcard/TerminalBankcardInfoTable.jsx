import React, { PropTypes } from 'react';
import * as i18n from '../../../../utils/i18n';

const TerminalBankcardInfoTable = (props) => {
  const { data } = props;
  const bizMap = i18n.bizMap('pms/terminalBankcard');
  let isSign = '';
  switch (data.isSign) {
    case '0': isSign = bizMap['isSign-0']; break;
    case '1': isSign = bizMap['isSign-1']; break;
    default: isSign = ''; break;
  }
  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.chnTermNo}:</td>
          <td>{data.chnTermNo}</td>
          <td>{bizMap.chnMerNo}:</td>
          <td>{data.chnMerNo}</td>
        </tr>
        <tr>
          <td>{bizMap.chnId}:</td>
          <td>{data.chnId}</td>
          <td>{bizMap.isSign}:</td>
          <td>{isSign}</td>
        </tr>
        <tr rowSpan={2}>
          <td>{bizMap.chnPinkey}:</td>
          <td>{data.chnPinkey}</td>
        </tr>
        <tr rowSpan={2}>
          <td>{bizMap.chnMackey}:</td>
          <td>{data.chnMackey}</td>
        </tr>
        <tr rowSpan={2}>
          <td>{bizMap.chnTdkkey}:</td>
          <td>{data.chnTdkkey}</td>
        </tr>
        <tr rowSpan={2}>
          <td>{bizMap.chnTmkkey}:</td>
          <td>{data.chnTmkkey}</td>
        </tr>
        <tr rowSpan={2}>
          <td>{bizMap.checkValue}:</td>
          <td>{data.checkValue}</td>
        </tr>
      </tbody>
    </table>
  );
};

TerminalBankcardInfoTable.propTypes = {
  data: PropTypes.object,
};

TerminalBankcardInfoTable.defaultProps = {
  data: {},
};

export default TerminalBankcardInfoTable;
