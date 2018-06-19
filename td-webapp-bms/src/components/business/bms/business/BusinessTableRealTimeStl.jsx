import React, { PropTypes } from 'react';
import { Spin } from 'antd';
import * as i18n from '../../../../utils/i18n';
import { amtMinUnitToStandUnit } from '../../../../utils/amount';

const ccyMap = i18n.bizMap('currencyMap');
const bizMap = i18n.bizMap('bms/businessRealTimeStl');

const BusinessTableRealTimeStl = (props) => {
  const { biz, data, loading } = props;
  const labelStyle = {
    width: 100,
  };
  const dataStyle = {
    width: 180,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };
  const ccy = ccyMap[data.ccy] || ccyMap.DEFAULT;
  let title = bizMap.bizDetail;
  switch (biz) {
    case 't0': title = bizMap.t0BizDetail; break;
    case 'd0': title = bizMap.d0BizDetail; break;
    default: break;
  }
  return (
    <Spin spinning={loading}>
      <div className="ant-form">
        <div className="ant-modal-title" style={{ marginBottom: 16 }}>
          {title}
        </div>
        <h4 className="split">&nbsp;</h4>
        <table className="detail_table" style={{ width: '100%' }}>
          <tbody>
            <tr>
              <td className="detail_table_label" style={labelStyle}>{bizMap.serviceMaxLimit}</td>
              <td style={dataStyle} colSpan={3}>
                {
                  data.serviceMaxLimit ? `${amtMinUnitToStandUnit(data.serviceMaxLimit, data.ccy)} ${ccy}` : ''
                }
              </td>
            </tr>
            <tr>
              <td className="detail_table_label" style={labelStyle}>{bizMap.serviceFee}</td>
              <td style={dataStyle}>
                {
                  data.serviceFee ? `${data.serviceFee} %` : ''
                }
              </td>
              <td className="detail_table_label" style={labelStyle}>{bizMap.serviceFeeLimit}</td>
              <td style={dataStyle}>
                {
                  data.serviceFeeLimit ? `${amtMinUnitToStandUnit(data.serviceFeeLimit, data.ccy)} ${ccy}` : ''
                }
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Spin>
  );
}

BusinessTableRealTimeStl.propTypes = {
  biz: PropTypes.string,
  loading: PropTypes.bool,
  data: PropTypes.object,
};

BusinessTableRealTimeStl.defaultProps = {
  biz: '',
  loading: false,
  data: {},
}

export default BusinessTableRealTimeStl;
