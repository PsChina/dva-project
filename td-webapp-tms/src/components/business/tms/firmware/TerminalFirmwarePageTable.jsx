import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';
import { formatDateString } from '../../../../utils/date';

const noop = () => { };

const TerminalFirmwarePageTable = (props) => {
  const { tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, handleUploadClick, handleUpdateClick } = props;
  const downloadUrl = 'rest/tms/common/download';
  const bizMap = i18n.bizMap('tms/terminalFirmware');
  const dataMap = i18n.bizMap('tms/tmsData');
  // const commonMap = i18n.commonMap();

  const downLoadUrlNew = (record) => {
    // 下载时需要参数PKID、TABLE_NAME
    const pkId = record.verId;
    const tableName = 'term_pro_verison';
    // 以下内容无需修改
    const params = `?PKID=${pkId}&TABLE_NAME=${tableName}`;
    const newDownLoadUrl = downloadUrl + params;
    return newDownLoadUrl;
  };

  const tableProps = {
    rowKey: record => record.verId,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      {
        title: bizMap.verNo, dataIndex: 'verNo', width: 120, render(text, record) {
          return (
            <a title={bizMap.clickToDownload} href={downLoadUrlNew(record)} >{text}</a>
          );
        },
      },
      { title: bizMap.copNam, dataIndex: 'copNam', width: 120 },
      {
        title: bizMap.verTyp, dataIndex: 'verTyp', width: 120, render(text) {
          let txt = '';
          switch (text) {
            case '1': txt = dataMap['verTyp-1']; break;
            case '2': txt = dataMap['verTyp-2']; break;
            default: txt = '';
          }
          return txt;
        },
      },
      {
        title: bizMap.verTim, dataIndex: 'verTim', render: (text) => {
          return formatDateString(text);
        },
      },
      // {
      //   title: commonMap.action, width: 180, render(text, record) {
      //     return (
      //       <span>
      //         <a onClick={() => { handleUpdateClick(record); }}>{commonMap.update}</a>
      //         <span className="ant-divider" />
      //         <a onClick={() => { handleUploadClick(record); }}>{commonMap.uploadFirmWare}</a>
      //       </span>
      //     );
      //   },
      // },
    ],
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

TerminalFirmwarePageTable.propTypes = {
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleUpdateClick: PropTypes.func,
};

TerminalFirmwarePageTable.defaultProps = {
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleUpdateClick: noop,
}

export default TerminalFirmwarePageTable;
