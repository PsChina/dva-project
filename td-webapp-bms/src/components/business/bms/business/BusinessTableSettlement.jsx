import React, { PropTypes } from 'react';
import * as i18n from '../../../../utils/i18n';

const BusinessTableSettlement = (props) => {
  const bizMap = i18n.bizMap('bms/businessSettlement');
  const { data } = props;
  let stlDay = '';
  switch (data.stlHz) {
    case '2':
      stlDay = bizMap[`stlDay-2-${data.stlDay}`];
      break;
    case '3':
      stlDay = bizMap[`stlDay-3-${data.stlDay}`];
      break;
    default: break;
  }
  const labelStyle = {
    width: 100,
  };
  const dataStyle = {
    width: 180,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };
  return (
    <table className="detail_table" style={{ width: '100%' }}>
      <tbody>
        <tr style={{ display: 'none' }}>
          <td className="detail_table_label">{bizMap.stlObj}</td>
          <td colSpan={3}>{bizMap[`stlObj-${data.stlObj}`]}</td>
        </tr>
        <tr>
          <td className="detail_table_label" style={labelStyle}>{bizMap.stlType}</td>
          <td style={dataStyle}>{bizMap[`stlType-${data.stlType}`]}</td>
          <td className="detail_table_label" style={labelStyle}>{bizMap.stlCycle}</td>
          <td style={dataStyle}>{data.stlType === '0' ? 'D +' : 'T +'} {data.stlCycle}</td>
        </tr>
        <tr>
          <td className="detail_table_label">{bizMap.stlHz}</td>
          <td colSpan={data.stlHz === '1' ? 3 : 1}>{bizMap[`stlHz-${data.stlHz}`]}</td>
          { data.stlHz === '1' ? null : [
            <td key="label" className="detail_table_label">{bizMap.stlDay}</td>,
            <td key="data">{stlDay}</td>,
          ] }
        </tr>
      </tbody>
    </table>
  );
}

BusinessTableSettlement.propTypes = {
  data: PropTypes.object,
};

BusinessTableSettlement.defaultProps = {
  data: {},
}

export default BusinessTableSettlement;
