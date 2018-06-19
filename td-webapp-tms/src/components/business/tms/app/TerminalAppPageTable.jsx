import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';
import { formatDateString } from '../../../../utils/date';
import cascaderAppPlatform from '../../../../../config/i18n/zh-cn/tms/cascaderAppPlatform.json';

const noop = () => { };

const TerminalAppPageTable = (props) => {
  const { tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, handleUploadClick, handleUpdateClick } = props;
  const bizMap = i18n.bizMap('tms/terminalApp');
  const dataMap = i18n.bizMap('tms/tmsData');
  const commonMap = i18n.commonMap();
  const downloadUrl = 'rest/tms/common/download';

  const downLoadUrlNew = (record) => {
    // 下载时需要参数PKID、TABLE_NAME
    const pkId = record.appId;
    const tableName = 'term_app_inf';
    const id = record.appFile;
    // 以下内容无需修改
    const params = `?ID=${id}&PKID=${pkId}&TABLE_NAME=${tableName}`;
    const newDownLoadUrl = downloadUrl + params;
    return newDownLoadUrl;
  };

  const tableProps = {
    rowKey: record => record.appId,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      {
        title: bizMap.appName, dataIndex: 'appName', width: 170, render(text, record) {
          return (
            <span>
              <a title="点击下载App" href={downLoadUrlNew(record)} >{text}</a>
            </span>
          );
        },
      },
      { title: bizMap.appPackage, dataIndex: 'appPackage', width: 170 },
      { title: bizMap.appVersion, dataIndex: 'appVersion', width: 170 },
      {
        title: bizMap.appPlatform, dataIndex: 'appPlatform', render(text) {
          let txt = '';
          for (let index = 0; index < cascaderAppPlatform.length; index++) {
            if (cascaderAppPlatform[index].value === text) {
              txt = cascaderAppPlatform[index].label;
              break;
            }
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      {
        title: bizMap.appTerTyp, dataIndex: 'appTerTyp', render(text, record) {
          let txt = '';
          for (let index = 0; index < cascaderAppPlatform.length; index++) {
            if (cascaderAppPlatform[index].value === record.appPlatform) {
              const subTypeData = cascaderAppPlatform[index].children;
              for (let subIndex = 0; subIndex < subTypeData.length; subIndex++) {
                if (subTypeData[subIndex].value === text) {
                  txt = subTypeData[subIndex].label;
                  break;
                }
              }
            }
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      {
        title: bizMap.appAutoUpdate, dataIndex: 'appAutoUpdate', render(text) {
          let txt = '';
          switch (text) {
            case '01': txt = dataMap['appAutoUpdate-01']; break;
            case '02': txt = dataMap['appAutoUpdate-02']; break;
            case '03': txt = dataMap['appAutoUpdate-03']; break;
            default: txt = '';
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      {
        title: bizMap.appIssueDate, dataIndex: 'appIssueDate', render(text) {
          return formatDateString(text);
        },
      },
      // {
      //   title: commonMap.action, fixed: 'right', width: 180, render(text, record) {
      //     return (
      //       <span>
      //         <a onClick={() => { handleUpdateClick(record); }}>{commonMap.update}</a>
      //         <span className="ant-divider" />
      //         <a onClick={() => { handleUploadClick(record); }}>{commonMap.uploadApp}</a>
      //       </span>
      //     );
      //   },
      // },
    ],
    scroll: { x: 1280 },
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

TerminalAppPageTable.propTypes = {
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleDetailClick: PropTypes.func,
  handleUpdateClick: PropTypes.func,
};

TerminalAppPageTable.defaultProps = {
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleDetailClick: noop,
  handleUpdateClick: noop,
}

export default TerminalAppPageTable;
