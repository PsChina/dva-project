import React, { PropTypes } from 'react';
import * as i18n from '../../../../utils/i18n';
import { formatDateString } from '../../../../utils/date';

const QrCodeInfoTable = (props) => {
  const bizMap = i18n.bizMap('tms/qrCode');
  const commonMap = i18n.commonMap();
  const { data } = props;
  let status;
  switch (data.status) {
    case '0': status = commonMap['status-0']; break;
    case '1': status = commonMap['status-1']; break;
    default: status = '';
  }

  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.qrId}:</td>
          <td>{data.qrId}</td>
          <td>{bizMap.status}:</td>
          <td>{status}</td>
        </tr>
        <tr>
          <td>{bizMap.merId}:</td>
          <td>{data.merId}</td>
          <td>{bizMap.merName}:</td>
          <td>{(data.merName)}</td>
        </tr>
        <tr>
          <td>{bizMap.agtId}:</td>
          <td>{data.agtId}</td>
          <td>{bizMap.agtName}:</td>
          <td>{data.agtName}</td>
        </tr>
        <tr>
          <td>{bizMap.storeId}:</td>
          <td>{data.storeId}</td>
          <td>{bizMap.storeName}:</td>
          <td>{data.storeName}</td>
        </tr>
        <tr>
          <td>{bizMap.createUserId}:</td>
          <td>{data.createUserId}</td>
          <td>{bizMap.createUserName}:</td>
          <td>{data.createUserName}</td>
        </tr>
        <tr>
          <td>{bizMap.createTime}:</td>
          <td>{formatDateString(data.createTime)}</td>
          <td>{bizMap.updateTime}:</td>
          <td>{formatDateString(data.updateTime)}</td>
        </tr>
      </tbody>
    </table>
  );
}

QrCodeInfoTable.propTypes = {
  data: PropTypes.object,
};

QrCodeInfoTable.defaultProps = {
  data: {},
}

export default QrCodeInfoTable;
