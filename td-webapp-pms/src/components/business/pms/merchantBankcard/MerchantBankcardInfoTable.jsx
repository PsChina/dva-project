import React, { PropTypes } from 'react';
import { Select, Cascader, TimePicker } from 'antd';
import moment from 'moment';
import * as i18n from '../../../../utils/i18n';
import { amtMinUnitToStandUnit } from '../../../../utils/amount';

const Option = Select.Option;
const MerchantBankcardInfoTable = (props) => {
  const { data } = props;
  const bizMap = i18n.bizMap('pms/merchantBankcard');
  const txnChannelList = i18n.bizMap('pms/txnChannelBankcard');
  const currencyList = i18n.bizMap('currency');
  const ccyMap = i18n.bizMap('currencyMap');
  const defaultCcy = ccyMap.DEFAULT_CCY;
  const cityDatas = i18n.bizMap('provCityData');
  const dateFormat = 'HH:mm:ss';
  let chnType = '';
  switch (data.chnType) {
    case '0': chnType = bizMap['chnType-0']; break;
    case '1': chnType = bizMap['chnType-1']; break;
    case '2': chnType = bizMap['chnType-2']; break;
    default: chnType = ''; break;
  }
  let chnMerType = '';
  switch (data.chnMerType) {
    case '1': chnMerType = bizMap['chnMerType-1']; break;
    case '2': chnMerType = bizMap['chnMerType-2']; break;
    default: chnMerType = ''; break;
  }
  let feeMode = '';
  switch (data.feeMode) {
    case '1': feeMode = bizMap['feeMode-1']; break;
    case '2': feeMode = bizMap['feeMode-2']; break;
    case '3': feeMode = bizMap['feeMode-3']; break;
    default: feeMode = ''; break;
  }
  let stlMemTyp = '';
  switch (data.stlMemTyp) {
    case '0': stlMemTyp = bizMap['stlMemTyp-0']; break;
    case '1': stlMemTyp = bizMap['stlMemTyp-1']; break;
    default: stlMemTyp = ''; break;
  }
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
          <td>{bizMap.chnMerNo}:</td>
          <td>{data.chnMerNo}</td>
          <td>{bizMap.chnMerName}:</td>
          <td>{data.chnMerName}</td>
        </tr>
        <tr>
          <td>{bizMap.chnMerType}:</td>
          <td>{chnMerType}</td>
        </tr>
        <tr>
          <td>{bizMap.areaCode}:</td>
          <td colSpan={3}><Cascader disable defaultValue={data.areaCode ? data.areaCode.split(',') : []} options={cityDatas} /></td>
        </tr>
        <tr>
          <td>{bizMap.txnTime}:</td>
          <td colSpan={3}><TimePicker format={dateFormat} value={moment(data.txnTimeStr, dateFormat)} />~<TimePicker format={dateFormat} value={moment(data.txnTimeEnd, dateFormat)} /></td>
        </tr>
        <tr>
          <td>{bizMap.stlMemTyp}:</td>
          <td>{stlMemTyp}</td>
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
          <td>{bizMap.feeMode}:</td>
          <td>{feeMode}</td>
          <td>{bizMap.minBill}:</td>
          <td>{amtMinUnitToStandUnit(data.minBill, defaultCcy)}</td>
        </tr>
        <tr>
          <td>{bizMap.debitCardRate}:</td>
          <td>{data.debitCardRate ? data.debitCardRate : '0'}</td>
          <td>{bizMap.debitCardTop}:</td>
          <td>{amtMinUnitToStandUnit(data.debitCardTop, defaultCcy)}</td>
        </tr>
        <tr>
          <td>{bizMap.creditCardRate}:</td>
          <td>{data.creditCardRate ? data.creditCardRate : '0'}</td>
          <td>{bizMap.creditCardTop}:</td>
          <td>{amtMinUnitToStandUnit(data.creditCardTop, defaultCcy)}</td>
        </tr>
        <tr>
          <td>{bizMap.singleDayLimit}:</td>
          <td>{amtMinUnitToStandUnit(data.singleDayLimit, defaultCcy)}</td>
          <td>{bizMap.singleMonthLimit}:</td>
          <td>{amtMinUnitToStandUnit(data.singleMonthLimit, defaultCcy)}</td>
        </tr>
        <tr>
          <td>{bizMap.singleDayCount}:</td>
          <td>{data.singleDayCount ? data.singleDayCount : '0'}</td>
          <td>{bizMap.singleMonthCount}:</td>
          <td>{data.singleMonthCount ? data.singleMonthCount : '0'}</td>
        </tr>
        <tr>
          <td>{bizMap.singleMinAmt}:</td>
          <td>{amtMinUnitToStandUnit(data.singleMinAmt)}</td>
          <td>{bizMap.singleMaxAmt}:</td>
          <td>{amtMinUnitToStandUnit(data.singleMaxAmt, defaultCcy)}</td>
        </tr>
      </tbody>
    </table>
  );
};

MerchantBankcardInfoTable.propTypes = {
  data: PropTypes.object,
};

MerchantBankcardInfoTable.defaultProps = {
  data: {},
};

export default MerchantBankcardInfoTable;
