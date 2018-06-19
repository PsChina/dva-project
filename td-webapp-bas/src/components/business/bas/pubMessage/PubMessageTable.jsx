import React, { PropTypes } from 'react';
import * as i18n from '../../../../utils/i18n';
import { formatDateString } from '../../../../utils/date';

const PubMessageTable = (props) => {
  const bizMap = i18n.bizMap('bas/pubMessage');
  const commonMap = i18n.commonMap();
  // const commonMap = i18n.commonMap();
  const { data } = props;
  let sendChannel = '';
  switch (data.SEND_CHANNEL) {
    case '00': sendChannel = bizMap['sendChannel-00']; break;
    case '01': sendChannel = bizMap['sendChannel-01']; break;
    case '02': sendChannel = bizMap['sendChannel-02']; break;
    default: sendChannel = ''; break;
  }
  let sstate = '';
  switch (data.SSTATE) {
    case '00': sstate = bizMap['sstate-00']; break;
    case '01': sstate = bizMap['sstate-01']; break;
    default: sstate = ''; break;
  }
  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.stitle}:</td>
          <td>{data.STITLE}</td>
        </tr>
        <tr>
          <td>{bizMap.sendChannel}:</td>
          <td>{sendChannel}</td>
          <td>{bizMap.sstate}:</td>
          <td>{sstate}</td>
        </tr>
        <tr>
          <td>{bizMap.sender}:</td>
          <td>{data.SENDER}</td>
          <td>{bizMap.receiver}:</td>
          <td>{data.RECEIVER}</td>
        </tr>
        <tr>
          <td>{bizMap.creTim}:</td>
          <td>{data.CRE_TIM}</td>
          <td>{bizMap.sendTim}:</td>
          <td>{data.SEND_TIM}</td>
        </tr>
        <tr>
          <td>{bizMap.remark}:</td>
          <td>{data.REMARK}</td>
        </tr>
        <tr>
          <td>{bizMap.scontent}:</td>
          <td enabled={false} colSpan="3" >
            <div disabled style={{ overflowX: 'auto', width: '700' }} dangerouslySetInnerHTML={{ __html: data.SCONTENT ? data.SCONTENT : '' }} className="overflow-text" />
          </td>
        </tr>
      </tbody>
    </table>
  );
}

PubMessageTable.propTypes = {
  data: PropTypes.object,
};

PubMessageTable.defaultProps = {
  data: {},
}

export default PubMessageTable;
