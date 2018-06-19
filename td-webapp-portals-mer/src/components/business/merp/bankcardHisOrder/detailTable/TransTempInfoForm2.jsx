import React, { PropTypes } from 'react';
import * as i18n from '../../../../../utils/i18n';

const TransTempInfoForm2 = (props) => {
  const { data } = props;
  const bizMap = i18n.bizMap('merp/bankcardOrder');
  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.routType}:</td>
          <td>{data.routType}</td>
          <td>{bizMap.chnName}:</td>
          <td>{data.chnName}</td>
        </tr>
        <tr>
          <td>{bizMap.chnRate}:</td>
          <td>{data.chnRate}</td>
          <td>{bizMap.chnFeeLim}:</td>
          <td>{data.chnFeeLim}</td>
        </tr>
        <tr>
          <td>{bizMap.chnFee}:</td>
          <td>{data.chnFee}</td>
        </tr>
      </tbody>
    </table>
  );
}

TransTempInfoForm2.propTypes = {
  data: PropTypes.object,
};

TransTempInfoForm2.defaultProps = {
  data: {},
}

export default TransTempInfoForm2;
