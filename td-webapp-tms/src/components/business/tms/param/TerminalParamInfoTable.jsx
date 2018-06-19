import React, { PropTypes } from 'react';
import * as i18n from '../../../../utils/i18n';

const TerminalParamInfoTable = (props) => {
  const bizMap = i18n.bizMap('tms/terminalParam');
  const { data } = props;
  const commonMap = i18n.commonMap();
  const getstatus = (text) => {
    let txt = '';
    switch (text) {
      case '1': txt = commonMap['check-1']; break;
      case '0': txt = commonMap['check-0']; break;
      default: txt = '';
    }
    return txt;
  };
  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.terId}:</td>
          <td>{data.terId}</td>
          <td>{bizMap.terPhyno}:</td>
          <td>{data.terPhyno}</td>
        </tr>
        <tr>
          <td>{bizMap.copNam}:</td>
          <td>{data.copNam}</td>
          <td>{bizMap.terModNo}:</td>
          <td>{data.terModNo}</td>
        </tr>
        <tr>
          <td>{bizMap.posMngPwd}:</td>
          <td>{data.posMngPwd}</td>
          <td>{bizMap.keyIdx}:</td>
          <td>{data.keyIdx}</td>
        </tr>
        <tr>
          <td>{bizMap.sgnSts}:</td>
          <td>{getstatus(data.sgnSts)}</td>
          <td>{bizMap.isTmkeyDown}:</td>
          <td>{getstatus(data.isTmkeyDown)}</td>
        </tr>
        <tr>
          <td>{bizMap.isDownloadKey}:</td>
          <td>{getstatus(data.isDownloadKey)}</td>
          <td>{bizMap.isUpdBatNo}:</td>
          <td>{getstatus(data.isUpdBatNo)}</td>
        </tr>
        <tr>
          <td>{bizMap.icDowFlg}:</td>
          <td>{getstatus(data.icDowFlg)}</td>
          <td>{bizMap.aicDowFlg}:</td>
          <td>{getstatus(data.aicDowFlg)}</td>
        </tr>
        <tr>
          <td>{bizMap.emvDowFlg}:</td>
          <td>{getstatus(data.emvDowFlg)}</td>
          <td>{bizMap.emvParMod}:</td>
          <td>{data.emvParMod}</td>
        </tr>
        <tr>
          <td>{bizMap.chkTelSts}:</td>
          <td>{getstatus(data.chkTelSts)}</td>
          <td>{bizMap.uploadCellId}:</td>
          <td>{getstatus(data.uploadCellId)}</td>
        </tr>
        <tr>
          <td>{bizMap.dowFlg}:</td>
          <td>{getstatus(data.dowFlg)}</td>
          <td>{bizMap.isKeybord}:</td>
          <td>{getstatus(data.isKeybord)}</td>
        </tr>
        <tr>
          <td>{bizMap.parMod}:</td>
          <td>{getstatus(data.parMod)}</td>
          <td>{bizMap.terKeypad}:</td>
          <td>{data.terKeypad}</td>
        </tr>
        <tr>
          <td>{bizMap.paraTemplate}:</td>
          <td>{data.paraTemplate}</td>
          <td>{bizMap.rarecd}:</td>
          <td>{data.rarecd}</td>
        </tr>
        <tr>
          <td>{bizMap.tel1}:</td>
          <td>{data.tel1}</td>
          <td>{bizMap.tel2}:</td>
          <td>{data.tel2}</td>
        </tr>
        <tr>
          <td>{bizMap.tel3}:</td>
          <td>{data.tel3}</td>
        </tr>
      </tbody>
    </table>
  );
}

TerminalParamInfoTable.propTypes = {
  data: PropTypes.object,
};

TerminalParamInfoTable.defaultProps = {
  data: {},
}

export default TerminalParamInfoTable;
