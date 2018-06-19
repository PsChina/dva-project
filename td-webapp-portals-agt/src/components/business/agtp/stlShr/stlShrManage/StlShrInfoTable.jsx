import React, { PropTypes } from 'react';
import * as i18n from '../../../../../utils/i18n';
import * as number from '../../../../../utils/number';
import * as date from '../../../../../utils/date';

/**
 * 分润详情
 */
const StlShrInfoTable = (props) => {
  const bizMap = i18n.bizMap('agtp/stlShr');
  const { data } = props;

  let ccy = '';
  switch (data.ccy) {
    case 'CNY': ccy = bizMap['ccyCod-CNY']; break;
    default: break;
  }

  let fstShrTyp = '';
  switch (data.fstShrTyp) {
    case '0': fstShrTyp = bizMap['fstShrTyp-01']; break;
    case '1': fstShrTyp = bizMap['fstShrTyp-02']; break;
    default: break;
  }

  let clrTyp = '';
  switch (data.clrTyp) {
    case '01': clrTyp = bizMap['clrTyp-01']; break;
    case '02': clrTyp = bizMap['clrTyp-02']; break;
    case '03': clrTyp = bizMap['clrTyp-03']; break;
    case '04': clrTyp = bizMap['clrTyp-04']; break;
    default: break;
  }

  let shrWay = '';
  switch (data.shrWay) {
    case '01': shrWay = bizMap['shrWay-01']; break;
    case '02': shrWay = bizMap['shrWay-02']; break;
    default: break;
  }

  let shrSts = '';
  switch (data.shrSts) {
    case '0': shrSts = bizMap['shrSts-01']; break;
    case '1': shrSts = bizMap['shrSts-02']; break;
    case '2': shrSts = bizMap['shrSts-03']; break;
    case '3': shrSts = bizMap['shrSts-04']; break;
    case '4': shrSts = bizMap['shrSts-05']; break;
    default: break;
  }

  const bak1Dom = [
    <tr colSpan="4">
      <td>{bizMap.bak1}:</td>
      <td>{data.bak1}</td>
    </tr>,
  ];
  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.pyeMemId}:</td>
          <td>{data.pyeMemId}</td>
          <td>{bizMap.pyeMemName}:</td>
          <td>{data.pyeMemName}</td>
        </tr>
        <tr>
          <td>{bizMap.clrTyp}:</td>
          <td>{clrTyp}</td>
          <td>{bizMap.ccy}:</td>
          <td>{ccy}</td>
        </tr>
        <tr colSpan="4">
          <td>{bizMap.shrDat}:</td>
          <td>{date.formatDateString(data.shrDat)}</td>
        </tr>
        <tr>
          <td>{bizMap.txnTotCnt}:</td>
          <td>{data.txnTotCnt}</td>
          <td>{bizMap.txnTotAmt}:</td>
          <td>{number.fmoney(data.txnTotAmt)}</td>
        </tr>
        <tr colSpan="4">
          <td>{bizMap.txnTotFee}:</td>
          <td>{number.fmoney(data.txnTotFee)}</td>
        </tr>
        <tr>
          <td>{bizMap.shrRatio}:</td>
          <td>{data.shrRatio}%</td>
          <td>{bizMap.fstShrCost}:</td>
          <td>{number.fmoney(data.fstShrCost)}</td>
        </tr>
        <tr colSpan="4">
          <td>{bizMap.fstShrPrin}:</td>
          <td>{number.fmoney(data.fstShrPrin)}</td>
          <td>{bizMap.shrAmt}:</td>
          <td>{number.fmoney(data.shrAmt)}</td>
        </tr>
        <tr>
          <td>{bizMap.fstShrTyp}:</td>
          <td>{fstShrTyp}</td>
        </tr>
        <tr>
          <td>{bizMap.shrWay}:</td>
          <td>{shrWay}</td>
          <td>{bizMap.shrSts}:</td>
          <td>{shrSts}</td>
        </tr>
        { data.shrSts === '2' ? bak1Dom : null }
      </tbody>
    </table>
  );
}

StlShrInfoTable.propTypes = {
  data: PropTypes.object,
};

StlShrInfoTable.defaultProps = {
  data: {},
};

export default StlShrInfoTable;

