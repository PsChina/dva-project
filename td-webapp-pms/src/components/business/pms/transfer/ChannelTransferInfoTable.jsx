import React, { PropTypes } from 'react';
import * as i18n from '../../../../utils/i18n';

const ChannelTransferInfoTable = (props) => {
  const bizMap = i18n.bizMap('pms/channelTransfer');
  const commonMap = i18n.commonMap();
  const { data } = props;
  let chnType = '';
  switch (data.chnType) {
    case '1': chnType = bizMap['chnType-1']; break;
    case '2': chnType = bizMap['chnType-2']; break;
    case '0': chnType = bizMap['chnType-0']; break;
    default: chnType = ''; break;
  }
  let needCheck = '';
  switch (data.needCheck) {
    case '0': needCheck = commonMap['check-0']; break;
    case '1': needCheck = commonMap['check-1']; break;
    default: needCheck = ''; break;
  }
  const gettimestr = (time) => {
    let transferTimeStr = '';
    if (time) {
      transferTimeStr = `${time.substring(0, 2)}:${time.substring(2, 4)}`;
    }
    return transferTimeStr;
  };
  const gettimeend = (time) => {
    let transferTimeEnd = '';
    if (time) {
      transferTimeEnd = `${time.substring(0, 2)}:${time.substring(2, 4)}`;
    }
    return transferTimeEnd;
  };
  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.chnType}:</td>
          <td>{chnType}</td>
          <td>{bizMap.chnName}:</td>
          <td>{data.chnName}</td>
        </tr>
        <tr>
          <td>{bizMap.chnName}:</td>
          <td>{data.chnName}</td>
          <td>{bizMap.chnAlias}:</td>
          <td>{data.chnAlias}</td>
        </tr>
        <tr>
          <td>{bizMap.transferTime}:</td>
          <td>{gettimestr(data.transferTimeStr)}-{gettimeend(data.transferTimeEnd)}</td>
          <td>{bizMap.needCheck}:</td>
          <td>{needCheck}</td>
        </tr>
        <tr>
          <td>{bizMap.chnConter}:</td>
          <td>{data.chnConter}</td>
          <td>{bizMap.chnMobile}:</td>
          <td>{data.chnMobile}</td>
        </tr>
        <tr>
          <td>{bizMap.chnPhone}:</td>
          <td>{data.chnPhone}</td>
        </tr>
        <tr>
          <td>{bizMap.chnAddr}:</td>
          <td>{data.chnAddr}</td>
        </tr>
      </tbody>
    </table>
  );
}

ChannelTransferInfoTable.propTypes = {
  data: PropTypes.object,
};

ChannelTransferInfoTable.defaultProps = {
  data: {},
}

export default ChannelTransferInfoTable;
