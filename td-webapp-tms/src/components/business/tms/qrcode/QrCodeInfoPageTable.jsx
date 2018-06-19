import React, { PropTypes } from 'react';
import { Popover } from 'antd';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';
import { formatDateString } from '../../../../utils/date';

const noop = () => { };

const QrCodeInfoPageTable = (props) => {
  const { tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, handleDetailClick,
    handleBindMer, handleQueryAttachClick } = props;
  const bizMap = i18n.bizMap('tms/qrCode');
  const commonMap = i18n.commonMap();
  const getMer = (merid) => {
    let merId = '';
    if (merid === '' || merid === null) {
      merId = <font color="#E01515">{bizMap.bindMer}</font>;
    } else {
      merId = '';
    }
    return merId;
  };
  const tableProps = {
    rowKey: record => record.qrId,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.qrId, dataIndex: 'qrId', width: 100 },
      { title: bizMap.qrContent, dataIndex: 'qrContent', width: 100 },
      {
        title: bizMap.status, dataIndex: 'status', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case '0': txt = commonMap['status-0']; break;
            case '1': txt = commonMap['status-1']; break;
            default: break;
          }
          return <span title={txt} className={text === '1' ? 'enable' : 'disable'}>{txt}</span>;
        },
      },
      { title: bizMap.merId, dataIndex: 'merId', width: 100 },
      { title: bizMap.merName, dataIndex: 'merName', width: 100 },
      { title: bizMap.agtId, dataIndex: 'agtId', width: 100 },
      { title: bizMap.agtName, dataIndex: 'agtName', width: 100 },
      { title: bizMap.storeId, dataIndex: 'storeId', width: 100 },
      { title: bizMap.storeName, dataIndex: 'storeName', width: 100 },
      { title: bizMap.createUserId, dataIndex: 'createUserId', width: 100 },
      { title: bizMap.createUserName, dataIndex: 'createUserName', width: 100 },
      { title: bizMap.createTime, dataIndex: 'createTime', width: 100, render: (text) => { return formatDateString(text); } },
      { title: bizMap.updateTime, dataIndex: 'updateTime', render: (text) => { return formatDateString(text); } },
      {
        title: commonMap.action, fixed: 'right', width: 180, render(text, record) {
          return (
            <span>
              <a onClick={() => { handleDetailClick(record); }}>{commonMap.detail}</a>
              <span className="ant-divider" />
              <a onClick={() => { handleQueryAttachClick(record); }}>{bizMap.attachDetail}</a>
              <span className="ant-divider" />
              <a onClick={() => { handleBindMer(record) }}>{getMer(text.merId)}</a>
              {/* <span className="ant-divider" />
              <a onClick={() => { handleBindAgt(record) }}>{bizMap.bindAgt}</a> */}
              {/*<span className="ant-divider" />
              <a onClick={() => { handleUpdateAuthClick(record); }}>{bizMap.terminalAuth}</a>*/}
            </span>
          );
        },
      },
    ],
    scroll: { x: 1880 },
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

QrCodeInfoPageTable.propTypes = {
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleDetailClick: PropTypes.func,
  handleBindMer: PropTypes.func,
  handleBindAgt: PropTypes.func,
  handleQueryAttachClick: PropTypes.func,
};

QrCodeInfoPageTable.defaultProps = {
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleDetailClick: noop,
  handleBindMer: noop,
  handleBindAgt: noop,
  handleQueryAttachClick: noop,
}

export default QrCodeInfoPageTable;
