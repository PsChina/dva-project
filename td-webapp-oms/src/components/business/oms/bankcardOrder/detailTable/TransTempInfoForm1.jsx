import React, { PropTypes } from 'react';
import * as i18n from '../../../../../utils/i18n';

const TransTempInfoForm1 = (props) => {
  const { data } = props;
  const bizMap = i18n.bizMap('oms/bankcardOrder');
  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.txnNo}:</td>
          <td>{data.txnNo}</td>
          <td>{bizMap.txnRate}:</td>
          <td>{data.txnRate}</td>
        </tr>
        <tr>
          <td>{bizMap.chnFeeLim}:</td>
          <td>{data.chnFeeLim}</td>
          <td>{bizMap.txnFee}:</td>
          <td>{data.txnFee}</td>
        </tr>
        <tr>
          <td>{bizMap.shaRate}:</td>
          <td>{data.shaRate}</td>
          <td>{bizMap.shaLim}:</td>
          <td>{data.shaLim}</td>
        </tr>
        <tr>
          <td>{bizMap.shaCost}:</td>
          <td>{data.shaCost}</td>
        </tr>
      </tbody>
    </table>
  );
}

TransTempInfoForm1.propTypes = {
  data: PropTypes.object,
};

TransTempInfoForm1.defaultProps = {
  data: {},
}

export default TransTempInfoForm1;
