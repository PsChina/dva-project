import React, { PropTypes } from 'react';
import * as i18n from '../../../../../utils/i18n';

const TransTempInfoForm3 = (props) => {
  const { data } = props;
  const bizMap = i18n.bizMap('oms/bankcardOrder');
  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.freezeStatus}:</td>
          <td>{data.freezeStatus}</td>
          <td>{bizMap.chkStatus}:</td>
          <td>{data.chkStatus}</td>
        </tr>
        <tr>
          <td>{bizMap.stlStatus}:</td>
          <td>{data.stlStatus}</td>
          <td>{bizMap.stlType}:</td>
          <td>{data.stlType}</td>
        </tr>
      </tbody>
    </table>
  );
}

TransTempInfoForm3.propTypes = {
  data: PropTypes.object,
};

TransTempInfoForm3.defaultProps = {
  data: {},
}

export default TransTempInfoForm3;
