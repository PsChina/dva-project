import React, { PropTypes } from 'react';
import { Spin } from 'antd';
import * as i18n from '../../../../utils/i18n';
import { amtMinUnitToStandUnit } from '../../../../utils/amount';

const bizMap = i18n.bizMap('bms/share');
const datMap = i18n.bizMap('bms/business');
const ccyMap = i18n.bizMap('currencyMap');

const ShareTable = (props) => {
  const { data, rangeCount, ind, loading, biz } = props;
  const labelStyle = {
    width: 128,
  };
  const dataStyle = {
    width: 180,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };
  const ccy = ccyMap[data.ccy] || ccyMap.DEFAULT;
  // 银联成本 or 通用成本
  const cost = biz === 'unionCard' ? (
    <table className="detail_table" style={{ width: '100%' }}>
      {
        ind.map((item, idx) => {
          return (
            <tbody key={idx}>
              <tr>
                <td rowSpan={3} style={{ textAlign: 'center' }}>{bizMap[`ind-${item}`]}</td>
              </tr>
              <tr>
                <td className="detail_table_label" style={labelStyle}>{bizMap.dcardCost}</td>
                <td style={dataStyle}>
                  {
                    data[`dcardCost${item}`] ? `${data[`dcardCost${item}`]} %` : ''
                  }
                </td>
                <td className="detail_table_label" style={labelStyle}>{bizMap.costLimit}</td>
                <td style={dataStyle}>
                  {
                    data[`dcardCostLimit${item}`] ? `${amtMinUnitToStandUnit(data[`dcardCostLimit${item}`], data.ccy)} ${ccy}` : ''
                  }
                </td>
              </tr>
              <tr>
                <td className="detail_table_label" style={labelStyle}>{bizMap.ccardCost}</td>
                <td style={dataStyle}>
                  {
                    data[`ccardCost${item}`] ? `${data[`ccardCost${item}`]} %` : ''
                  }
                </td>
                <td className="detail_table_label" style={labelStyle}>{bizMap.costLimit}</td>
                <td style={dataStyle}>
                  {
                    data[`ccardCostLimit${item}`] ? `${amtMinUnitToStandUnit(data[`ccardCostLimit${item}`], data.ccy)} ${ccy}` : ''
                  }
                </td>
              </tr>
            </tbody>
          )
        })
      }
    </table>
  ) : (
    <table className="detail_table" style={{ width: '100%' }}>
      <tbody>
        <tr>
          <td className="detail_table_label" style={labelStyle}>{bizMap.shareCost}</td>
          <td style={dataStyle}>
            {
              data.shareCost ? `${data.shareCost} %` : ''
            }
          </td>
          <td className="detail_table_label" style={labelStyle}>{bizMap.costLimit}</td>
          <td style={dataStyle}>
            {
              data.costLimit ? `${amtMinUnitToStandUnit(data.costLimit, data.ccy)} ${ccy}` : ''
            }
          </td>
        </tr>
      </tbody>
    </table>
  );

  let content = null;
  switch (data.shareType) {
    case '1':
      content = (
        <table className="detail_table" style={{ width: '100%' }}>
          <tbody>
            {
              rangeCount.map((item, idx) => {
                let info = null;
                if (data[`txnRange${idx + 1}Start`]) {
                  info = `${amtMinUnitToStandUnit(data[`txnRange${idx + 1}Start`], data.ccy)} ~ `;
                  if (data[`txnRange${idx + 1}End`]) {
                    info += `${amtMinUnitToStandUnit(data[`txnRange${idx + 1}End`], data.ccy)} ${ccy}`;
                  } else {
                    info += `MAX ${ccy}`;
                  }
                }
                return (
                  <tr key={idx}>
                    <td className="detail_table_label" style={labelStyle}>{bizMap.txnRange}</td>
                    <td style={dataStyle}>
                      { info }
                    </td>
                    <td className="detail_table_label" style={labelStyle}>{bizMap.sharePercent}</td>
                    <td style={dataStyle}>
                      {
                        data[`sharePercent${idx + 1}`] ? `${data[`sharePercent${idx + 1}`]} %` : ''
                      }
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      );
      break;
    default: break;
  }
  return (
    <Spin spinning={loading}>
      <div className="ant-form">
        <div className="ant-modal-title" style={{ marginBottom: 16 }}>
          {`${datMap[biz] || ''}${bizMap.shareConfig}`}
        </div>
        <h4 className="split">&nbsp;</h4>
        {cost}
        <h4 className="split" style={{ marginTop: 16 }}>&nbsp;</h4>
        {content}
      </div>
    </Spin>
  );
}

ShareTable.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.object,
  rangeCount: PropTypes.array,
  ind: PropTypes.array,
  biz: PropTypes.string,
};

ShareTable.defaultProps = {
  loading: false,
  data: {},
  rangeCount: ['1', '2', '3', '4', '5'],
  ind: ['1', '2', '3'],
  biz: '',
}

export default ShareTable;
