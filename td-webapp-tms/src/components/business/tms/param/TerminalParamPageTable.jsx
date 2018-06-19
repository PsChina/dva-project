import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };

const TerminalParamPageTable = (props) => {
  const { tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, handleDetailClick, handleUpdateClick, parmodOptionsData } = props;
  const bizMap = i18n.bizMap('tms/terminalParam');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.terId,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.terId, dataIndex: 'terId', width: 100 },
      { title: bizMap.terPhyno, dataIndex: 'terPhyno', width: 100 },
      { title: bizMap.copNam, dataIndex: 'copNam', width: 100 },
      { title: bizMap.terModNo, dataIndex: 'terModNo', width: 100 },
      {
        title: bizMap.isTmkeyDown, dataIndex: 'isTmkeyDown', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case '1': txt = commonMap['check-1']; break;
            case '0': txt = commonMap['check-0']; break;
            default: txt = '';
          }
          return txt;
        },
      },
      {
        title: bizMap.isKeybord, dataIndex: 'isKeybord', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case '1': txt = commonMap['check-1']; break;
            case '0': txt = commonMap['check-0']; break;
            default: txt = '';
          }
          return txt;
        },
      },
      {
        title: bizMap.isDownloadKey, dataIndex: 'isDownloadKey', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case '1': txt = commonMap['check-1']; break;
            case '0': txt = commonMap['check-0']; break;
            default: txt = '';
          }
          return txt;
        },
      },
      {
        title: bizMap.sgnSts, dataIndex: 'sgnSts', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case '0': txt = commonMap['check-0']; break;
            case '1': txt = commonMap['check-1']; break;
            default: txt = '';
          }
          return txt;
        },
      },
      {
        title: bizMap.dowFlg, dataIndex: 'dowFlg', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case '1': txt = commonMap['check-1']; break;
            case '0': txt = commonMap['check-0']; break;
            default: txt = '';
          }
          return txt;
        },
      },
      {
        title: bizMap.isUpdBatNo, dataIndex: 'isUpdBatNo', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case '1': txt = commonMap['check-1']; break;
            case '0': txt = commonMap['check-0']; break;
            default: txt = '';
          }
          return txt;
        },
      },
      {
        title: bizMap.icDowFlg, dataIndex: 'icDowFlg', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case '1': txt = commonMap['check-1']; break;
            case '0': txt = commonMap['check-0']; break;
            default: txt = '';
          }
          return txt;
        },
      },
      {
        title: bizMap.aicDowFlg, dataIndex: 'aicDowFlg', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case '1': txt = commonMap['check-1']; break;
            case '0': txt = commonMap['check-0']; break;
            default: txt = '';
          }
          return txt;
        },
      },
      {
        title: bizMap.uploadCellId, dataIndex: 'uploadCellId', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case '1': txt = commonMap['check-1']; break;
            case '0': txt = commonMap['check-0']; break;
            default: txt = '';
          }
          return txt;
        },
      },
      { title: bizMap.posMngPwd, dataIndex: 'posMngPwd', width: 100 },
      { title: bizMap.posMngPwd, dataIndex: 'paraTemplate', width: 100 },
      { title: bizMap.parMod, dataIndex: 'parMod', width: 100 },
      { title: bizMap.terKeypad, dataIndex: 'terKeypad', width: 100 },
      { title: bizMap.batNo, dataIndex: 'batNo', width: 100 },
      { title: bizMap.tel1, dataIndex: 'tel1' },
      {
        title: commonMap.action, fixed: 'right', width: 180, render(text, record) {
          return (
            <span>
              <a onClick={() => { handleDetailClick(record); } }>{commonMap.detail}</a>
              <span className="ant-divider" />
              <a onClick={() => { handleUpdateClick(record); } }>{commonMap.update}</a>
            </span>
          );
        },
      },
    ],
    scroll: { x: 2300 },
    tableList,
    tableTotal,
    tableLoading,
    tableCurrentPage,
    tablePageChange(next) {
      tablePageChange(next);
    },
    tableRowSelect(selectedRows) {
      tableRowSelect(selectedRows);
    },
  };

  return (<PageTable {...tableProps} />);
}

TerminalParamPageTable.propTypes = {
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleDetailClick: PropTypes.func,
  handleUpdateClick: PropTypes.func,
  parmodOptionsData: PropTypes.array,
};

TerminalParamPageTable.defaultProps = {
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleDetailClick: noop,
  handleUpdateClick: noop,
  parmodOptionsData: [],
}

export default TerminalParamPageTable;
