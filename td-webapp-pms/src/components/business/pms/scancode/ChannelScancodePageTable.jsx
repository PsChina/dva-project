import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };

const ChannelScancodePageTable = (props) => {
  const { tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, handleDetailClick, handleUpdateClick, tableCurrentPage } = props;
  const bizMap = i18n.bizMap('pms/channelScancode');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.chnId,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.chnName, dataIndex: 'chnName', width: 150 },
      { title: bizMap.chnAlias, dataIndex: 'chnAlias', width: 150 },
      { title: bizMap.chnType, dataIndex: 'chnType', width: 120, render(text) {
        let txt = '';
        switch (text) {
          case '0': txt = bizMap['chnType-0']; break;
          case '1': txt = bizMap['chnType-1']; break;
          case '2': txt = bizMap['chnType-2']; break;
          case '3': txt = bizMap['chnType-3']; break;
          case '4': txt = bizMap['chnType-4']; break;
          default: break;
        }
        return <span title={txt}>{txt}</span>;
      } },
      { title: bizMap.linkType, dataIndex: 'linkType', width: 120, render(text) {
        let txt = '';
        switch (text) {
          case '1': txt = bizMap['linkType-1']; break;
          case '0': txt = bizMap['linkType-0']; break;
          default: break;
        }
        return <span title={txt} className={text === '1' ? 'enable' : 'disable'}>{txt}</span>;
      } },
      { title: bizMap.scanType, dataIndex: 'scanType', render(text) {
        let txt = '';
        switch (text) {
          case '0,1': txt = bizMap['scanType-01']; break;
          case '0,2': txt = bizMap['scanType-02']; break;
          case '1,2': txt = bizMap['scanType-12']; break;
          case '1': txt = bizMap['scanType-1']; break;
          case '2': txt = bizMap['scanType-2']; break;
          case '0': txt = bizMap['scanType-0']; break;
          case '3': txt = bizMap['scanType-3']; break;
          case '4': txt = bizMap['scanType-4']; break;
          case '5': txt = bizMap['scanType-5']; break;
          case '0,1,2': txt = bizMap['scanType-012']; break;
          default: break;
        }
        return <span title={txt}>{txt}</span>;
      } },
      { title: bizMap.chnStatus, dataIndex: 'chnStatus', render(text) {
        let txt = '';
        switch (text) {
          case '0': txt = commonMap['status-0']; break;
          case '1': txt = commonMap['status-1']; break;
          default: break;
        }
        return <span title={txt} className={text === '1' ? 'enable' : 'disable'}>{txt}</span>;
      } },
      { title: bizMap.chnConter, dataIndex: 'chnConter', width: 120 },
      { title: bizMap.chnMobile, dataIndex: 'chnMobile', width: 120 },
      { title: commonMap.action, fixed: 'right', width: 180, render(text, record) {
        return (
          <span>
            <a onClick={() => { handleDetailClick(record); }}>{commonMap.detail}</a>
            <span className="ant-divider" />
            <a onClick={() => { handleUpdateClick(record); }}>{commonMap.update}</a>
          </span>
        );
      } },
    ],
    scroll: { x: 1280 },
    tableList,
    tableTotal,
    tableCurrentPage,
    tableLoading,
    tablePageChange(next) {
      tablePageChange(next);
    },
    tableRowSelect(selectedRows) {
      tableRowSelect(selectedRows);
    },
  };

  return (<PageTable {...tableProps} />);
}

ChannelScancodePageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableCurrentPage: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleDetailClick: PropTypes.func,
  handleUpdateClick: PropTypes.func,
};

ChannelScancodePageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableCurrentPage: 1,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleDetailClick: noop,
  handleUpdateClick: noop,
}

export default ChannelScancodePageTable;
