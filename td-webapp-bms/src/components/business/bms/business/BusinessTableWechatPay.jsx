import React, { PropTypes } from 'react';
import { Spin } from 'antd';
import BusinessTableSettlement from './BusinessTableSettlement';
import * as i18n from '../../../../utils/i18n';
import { amtMinUnitToStandUnit } from '../../../../utils/amount';

const ccyMap = i18n.bizMap('currencyMap');
const bizMap = i18n.bizMap('bms/businessWechatPay');

const BusinessTableWechat = (props) => {
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
          {bizMap.wechatPayBizInfo}
        </div>
        <h4 className="split">&nbsp;</h4>
        <table className="detail_table" style={{ width: '100%' }}>
          <tbody>
            <tr>
              <td className="detail_table_label" style={labelStyle}>{bizMap.payRate}</td>
              <td style={dataStyle}>
                {
                  data.payRate ? `${data.payRate} %` : ''
                }
              </td>
              <td className="detail_table_label" style={labelStyle}>{bizMap.feeLim}</td>
              <td style={dataStyle}>
                {
                  data.feeLim ? `${amtMinUnitToStandUnit(data.feeLim, data.ccy)} ${ccy}` : ''
                }
              </td>
            </tr>
          </tbody>
        </table>
        <h4 className="split" style={{ marginTop: 16 }}>&nbsp;</h4>
        {
          data.merMod === '1' ?
            <table key="info" className="detail_table" style={{ width: '100%' }}>
              <tbody>
                <tr>
                  <td className="detail_table_label">{bizMap.merMod}</td>
                  <td colSpan={3}>{bizMap[`merMod-${data.merMod}`]}</td>
                </tr>
                <tr>
                  <td className="detail_table_label" style={labelStyle}>{bizMap.merAppId}</td>
                  <td style={dataStyle}>{data.merAppId}</td>
                  <td className="detail_table_label" style={labelStyle}>{bizMap.merNo}</td>
                  <td style={dataStyle}>{data.merNo}</td>
                </tr>
                <tr>
                  <td className="detail_table_label">{bizMap.merCertUrl}</td>
                  <td colSpan={3}>{data.merCertUrl}</td>
                </tr>
                <tr>
                  <td className="detail_table_label">{bizMap.merKey}</td>
                  <td colSpan={3}>{data.merKey}</td>
                </tr>
              </tbody>
            </table> : [
              <table key="info" className="detail_table" style={{ width: '100%' }}>
                <tbody>
                  <tr>
                    <td className="detail_table_label" style={labelStyle}>{bizMap.merMod}</td>
                    <td colSpan={3} style={dataStyle}>{bizMap[`merMod-${data.merMod}`]}</td>
                  </tr>
                </tbody>
              </table>,
              <h4 key="split" className="split" style={{ marginTop: 16 }}>&nbsp;</h4>,
              <BusinessTableSettlement key="stl" data={data} />,
            ]
        }
      </div>
    </Spin>
  );
}

BusinessTableWechat.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.object,
};

BusinessTableWechat.defaultProps = {
  loading: false,
  data: {},
}

export default BusinessTableWechat;
