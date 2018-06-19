import React, { PropTypes } from 'react';
import { Spin } from 'antd';
import BusinessTableSettlement from './BusinessTableSettlement';
import * as i18n from '../../../../utils/i18n';
import { amtMinUnitToStandUnit } from '../../../../utils/amount';

const ccyMap = i18n.bizMap('currencyMap');
const bizMap = i18n.bizMap('bms/businessUnionCard');

const BusinessTableUnionCard = (props) => {
  const { data, loading } = props;
  const ccy = ccyMap[data.ccy] || ccyMap.DEFAULT;
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
    <Spin spinning={loading}>
      <div className="ant-form">
        <div className="ant-modal-title" style={{ marginBottom: 16 }}>
          {bizMap.unionCardBizInfo}
        </div>
        <h4 className="split">&nbsp;</h4>
        <table className="detail_table" style={{ width: '100%' }}>
          <tbody>
            <tr>
              <td className="detail_table_label" style={labelStyle}>{bizMap.merInd}</td>
              <td style={dataStyle}>{bizMap[`ind-${data.merInd}`]}</td>
              <td className="detail_table_label" style={labelStyle}>{bizMap.merMcc}</td>
              <td style={dataStyle}>{data.merMcc}</td>
            </tr>
            <tr>
              <td className="detail_table_label">{bizMap.dcardRate}</td>
              <td>
                {
                  data.dcardRate ? `${data.dcardRate} %` : ''
                }
              </td>
              <td className="detail_table_label">{bizMap.dcardLim}</td>
              <td>
                {
                  data.dcardLim ? `${amtMinUnitToStandUnit(data.dcardLim, data.ccy)} ${ccy}` : ''
                }
              </td>
            </tr>
            <tr>
              <td className="detail_table_label">{bizMap.ccardRate}</td>
              <td>
                {
                  data.ccardRate ? `${data.ccardRate} %` : ''
                }
              </td>
              <td className="detail_table_label">{bizMap.ccardLim}</td>
              <td>
                {
                  data.ccardLim ? `${amtMinUnitToStandUnit(data.ccardLim)} ${ccy}` : ''
                }
              </td>
            </tr>
          </tbody>
        </table>
        <h4 className="split" style={{ marginTop: 16 }}>&nbsp;</h4>
        <BusinessTableSettlement data={data} />
      </div>
    </Spin>
  );
}

BusinessTableUnionCard.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.object,
};

BusinessTableUnionCard.defaultProps = {
  loading: false,
  data: {},
}

export default BusinessTableUnionCard;
