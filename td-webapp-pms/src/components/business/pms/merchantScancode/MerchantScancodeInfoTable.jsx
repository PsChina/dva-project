import React, { PropTypes } from 'react';
import { Select } from 'antd';
import * as i18n from '../../../../utils/i18n';
import { amtMinUnitToStandUnit } from '../../../../utils/amount';
import txnChannelList from '../../../../../config/i18n/zh-cn/pms/txnChannelScancode.json';

const MerchantScancodeInfoTable = (props) => {
  const bizMap = i18n.bizMap('pms/merchantScancode');
  const ccyMap = i18n.bizMap('currencyMap');
  const defaultCcy = ccyMap.DEFAULT_CCY;
  const wechatMap = i18n.bizMap('pms/wechat');
  const baiduMap = i18n.bizMap('pms/baidu');
  const alipayMap = i18n.bizMap('pms/alipay')
  const currencyList = i18n.bizMap('currency');
  const { data } = props;
  let chnType = '';
  switch (data.chnType) {
    case '1': chnType = bizMap['chnType-1']; break;
    case '2': chnType = bizMap['chnType-2']; break;
    case '0': chnType = bizMap['chnType-0']; break;
    default: chnType = ''; break;
  }
  let chnMerType = '';
  switch (data.chnMerType) {
    case '1': chnMerType = bizMap['chnMerType-1']; break;
    case '2': chnMerType = bizMap['chnMerType-2']; break;
    default: chnMerType = ''; break;
  }
  let stlMemTyp = '';
  switch (data.stlMemTyp) {
    case '0': stlMemTyp = bizMap['stlMemTyp-0']; break;
    case '1': stlMemTyp = bizMap['stlMemTyp-1']; break;
    default: stlMemTyp = ''; break;
  }
  const Option = Select.Option;
  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.chnName}:</td>
          <td>{data.chnName}</td>
          <td>{bizMap.chnType}:</td>
          <td>{chnType}</td>
        </tr>
        <tr>
          <td>{bizMap.chnMerName}:</td>
          <td>{data.chnMerName}</td>
        </tr>
        <tr>
          <td>{bizMap.chnMerType}:</td>
          <td colSpan={3}>{chnMerType}</td>
          {/*<td>{bizMap.chnMerStatus}:</td>
          <td>{chnMerStatus}</td>*/}
        </tr>
        <tr>
          <td style={{ display: data.linkType === '0' && data.scanType === '1' ? '' : 'none' }}>{alipayMap.alipayPid}:</td>
          <td style={{ display: data.linkType === '0' && data.scanType === '1' ? '' : 'none' }}>{data.alipayPid}</td>
          <td style={{ display: data.linkType === '0' && data.scanType === '1' ? '' : 'none' }}>{alipayMap.alipayTk}:</td>
          <td style={{ display: data.linkType === '0' && data.scanType === '1' ? '' : 'none' }}>{data.alipayTk}</td>
        </tr>
        <tr>
          <td style={{ display: data.linkType === '0' && data.scanType === '1' ? '' : 'none' }}>{alipayMap.alipayRefreshTk}:</td>
          <td style={{ display: data.linkType === '0' && data.scanType === '1' ? '' : 'none' }}>{data.alipayRefreshTk}</td>
          <td style={{ display: data.linkType === '0' && data.scanType === '1' ? '' : 'none' }}>{alipayMap.alipayMd5Key}:</td>
          <td style={{ display: data.linkType === '0' && data.scanType === '1' ? '' : 'none' }}>{data.alipayMd5Key}</td>
        </tr>
        <tr>
          <td style={{ display: data.linkType === '0' && data.scanType === '0' ? '' : 'none' }}>{wechatMap.wechatAppId}:</td>
          <td style={{ display: data.linkType === '0' && data.scanType === '0' ? '' : 'none' }}>{data.wechatAppId}</td>
        </tr>
        <tr>
          <td style={{ display: data.linkType === '0' && data.scanType === '0' ? '' : 'none' }}>{wechatMap.wechatMerNo}:</td>
          <td style={{ display: data.linkType === '0' && data.scanType === '0' ? '' : 'none' }}>{data.wechatMerNo}</td>
          <td style={{ display: data.linkType === '0' && data.scanType === '0' ? '' : 'none' }}>{wechatMap.wechatMerSubNo}:</td>
          <td style={{ display: data.linkType === '0' && data.scanType === '0' ? '' : 'none' }}>{data.wechatMerSubNo}</td>
        </tr>
        <tr>
          <td style={{ display: data.linkType === '0' && data.scanType === '0' ? '' : 'none' }}>{wechatMap.wechatTxnKey}:</td>
          <td style={{ display: data.linkType === '0' && data.scanType === '0' ? '' : 'none' }}>{data.wechatTxnKey}</td>
          <td style={{ display: data.linkType === '0' && data.scanType === '0' ? '' : 'none' }}>{wechatMap.wechatTxnCert}:</td>
          <td style={{ display: data.linkType === '0' && data.scanType === '0' ? '' : 'none' }}>{data.wechatTxnCert}</td>
        </tr>
        <tr>
          <td style={{ display: data.linkType === '0' && data.scanType === '2' ? '' : 'none' }}>{baiduMap.baiduMerNo}:</td>
          <td style={{ display: data.linkType === '0' && data.scanType === '2' ? '' : 'none' }}>{data.baiduMerNo}</td>
          <td style={{ display: data.linkType === '0' && data.scanType === '2' ? '' : 'none' }}>{baiduMap.baiduTxnKey}:</td>
          <td style={{ display: data.linkType === '0' && data.scanType === '2' ? '' : 'none' }}>{data.baiduTxnKey}</td>
        </tr>
        <tr>
          <td style={{ display: data.linkType === '1' ? '' : 'none' }}>{bizMap.txnMerNo}:</td>
          <td style={{ display: data.linkType === '1' ? '' : 'none' }}>{data.txnMerNo}</td>
          <td style={{ display: data.linkType === '1' ? '' : 'none' }}>{bizMap.txnKey}:</td>
          <td style={{ display: data.linkType === '1' ? '' : 'none' }}>{data.txnKey}</td>
        </tr>
        <tr>
          <td style={{ display: data.linkType === '1' ? '' : 'none' }}>{bizMap.txnAppid}:</td>
          <td style={{ display: data.linkType === '1' ? '' : 'none' }}>{data.txnAppid}</td>
          <td style={{ display: data.linkType === '1' ? '' : 'none' }}>{bizMap.txnMerType}:</td>
          <td style={{ display: data.linkType === '1' ? '' : 'none' }}>{data.txnMerType}</td>
        </tr>
        <tr>
          <td>{bizMap.txnChannelSupport}:</td>
          <td colSpan={3}>
            <Select value={data.txnChannel ? data.txnChannel.split(',') : []} multiple>
              {
                txnChannelList.map((item, idx) => {
                  return <Option key={idx} value={item.value}>{item.label}</Option>;
                })
              }
            </Select>
          </td>
        </tr>
        <tr>
          <td>{bizMap.currencySupport}:</td>
          <td colSpan={3}><Select value={data.currencySupport ? data.currencySupport.split(',') : ['TWD']} multiple>
            {
              currencyList.map((item, idx) => {
                return <Option key={idx} value={item.value}>{item.label}</Option>;
              })
            }
          </Select>
          </td>
        </tr>
        <tr>
          <td>{bizMap.txnRate}:</td>
          <td>{data.txnRate}</td>
          <td>{bizMap.stlMemTyp}:</td>
          <td>{stlMemTyp}</td>
        </tr>
        <tr>
          <td>{bizMap.singleDayLimit}:</td>
          <td>{amtMinUnitToStandUnit(data.singleDayLimit, defaultCcy)}</td>
          <td>{bizMap.singleMonthLimit}:</td>
          <td>{amtMinUnitToStandUnit(data.singleMonthLimit)}</td>
        </tr>
        <tr>
          <td>{bizMap.singleDayCount}:</td>
          <td>{data.singleDayCount ? data.singleDayCount : '0'}</td>
          <td>{bizMap.singleMonthCount}:</td>
          <td>{data.singleMonthCount ? data.singleMonthCount : '0'}</td>
        </tr>
        <tr>
          <td>{bizMap.singleMinAmt}:</td>
          <td>{amtMinUnitToStandUnit(data.singleMinAmt, defaultCcy)}</td>
          <td>{bizMap.singleMaxAmt}:</td>
          <td>{amtMinUnitToStandUnit(data.singleMaxAmt, defaultCcy)}</td>
        </tr>
        <tr>
          <td>{bizMap.txnRate}:</td>
          <td>{data.txnRate ? data.txnRate : '0'}</td>
        </tr>
      </tbody>
    </table>
  );
}

MerchantScancodeInfoTable.propTypes = {
  data: PropTypes.object,
};

MerchantScancodeInfoTable.defaultProps = {
  data: {},
}

export default MerchantScancodeInfoTable;
