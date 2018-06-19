import React, { PropTypes } from 'react';
import { Popover } from 'antd';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';
import { hideString } from '../../../../utils/hideUtil';
import { formatDateString } from '../../../../utils/date';

const noop = () => { };

const TerminalCompanyPageTable = (props) => {
  const { tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, detailContent, setInfoFormData } = props;
  const bizMap = i18n.bizMap('tms/terminalKey');
  const commonMap = i18n.commonMap();
  const updated = (text) => {
    return <font>{text ? hideString(text) : bizMap.disupdate}</font>;
  }

  const tableProps = {
    rowKey: record => record.terId,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.terPhyno, dataIndex: 'terPhyno', width: 100 },
      { title: bizMap.terNo, dataIndex: 'terNo', width: 100 },
      { title: bizMap.lmkkey, dataIndex: 'lmkkey', width: 120, render: text => updated(text) },
      { title: bizMap.zmkkey, dataIndex: 'zmkkey', width: 120, render: text => updated(text) },
      { title: bizMap.zmkkeyUpdateTime, dataIndex: 'zmkkeyUpdateTime', width: 100, render: text => formatDateString(text) },
      { title: bizMap.lpinkey, dataIndex: 'lpinkey', width: 120, render: text => updated(text) },
      { title: bizMap.lmackey, dataIndex: 'lmackey', width: 120, render: text => updated(text) },
      { title: bizMap.ltdkey, dataIndex: 'ltdkey', width: 120, render: text => updated(text) },
      { title: bizMap.wkKeyUpdateTime, dataIndex: 'wkKeyUpdateTime', render: text => formatDateString(text) },
      {
        title: commonMap.action, fixed: 'right', width: 180, render(record) {
          return (
            <Popover content={detailContent} title={bizMap.setManaPassword} trigger="hover" placement="topLeft">
              <a onMouseEnter={() => { setInfoFormData(record); }}>{commonMap.detail}</a>
            </Popover>
          );
        },
      },
    ],
    scroll: { x: 1480 },
    tableList,
    tableTotal,
    tableLoading,
    tableCurrentPage,
    rowSelection: null,
    tablePageChange(next) {
      tablePageChange(next);
    },
    tableRowSelect(selectedRows) {
      tableRowSelect(selectedRows);
    },
  };

  return (<PageTable {...tableProps} />);
}

TerminalCompanyPageTable.propTypes = {
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  detailContent: PropTypes.object,
};

TerminalCompanyPageTable.defaultProps = {
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  detailContent: null,
}

export default TerminalCompanyPageTable;
