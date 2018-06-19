import React, { PropTypes } from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';
/**
 * 附件信息暂时不提供更改，先注释
 * <Menu.Item key="2">
        <a onClick={(record) => { handleUpdateAttachClick(record); }}>{bizMap.attachInfo}</a>
      </Menu.Item>
      <Menu.Divider />
 */
const noop = () => { };

const AgentPageTable = (props) => {
  const { tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect,
     handleDetailClick, handleUpdateAttachClick, handleUpdateBaseClick, handleQueryAttachClick,
  handleUpdateClick, handleUpdateAccClick } = props;
  const bizMap = i18n.bizMap('mms/agent');
  const commonMap = i18n.commonMap();
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a onClick={(record) => { handleUpdateBaseClick(record); }}>{bizMap.baseInfo}</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">
        <a onClick={(record) => { handleUpdateAccClick(record); }}>{bizMap.accInfo}</a>
      </Menu.Item>
      <Menu.Divider />
    </Menu>
  );

  const tableProps = {
    rowKey: record => record.agtId,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.agtId, dataIndex: 'agtId', width: 100 },
      { title: bizMap.agtName, dataIndex: 'agtName', width: 100 },
      { title: bizMap.agtParentName, dataIndex: 'agtParentName', width: 100 },
      { title: bizMap.agtScope, dataIndex: 'agtScope', render(text) {
        let txt = '';
        switch (text) {
          case '01': txt = bizMap['agtScope-01']; break;
          case '02': txt = bizMap['agtScope-02']; break;
          case '03': txt = bizMap['agtScope-03']; break;
          case '04': txt = bizMap['agtScope-04']; break;
          default: txt = '';
        }
        return <span>{txt}</span>;
      } },
      { title: bizMap.bizSale, dataIndex: 'bizSale', width: 200 },
      { title: bizMap.updTim, dataIndex: 'updTim', width: 200 },
      { title: bizMap.ccy, dataIndex: 'ccy', width: 100 },
      { title: bizMap.agtStatus, dataIndex: 'agtStatus', render(text) {
        let txt = '';
        switch (text) {
          case '0': txt = commonMap['status-0']; break;
          case '1': txt = commonMap['status-1']; break;
          default: txt = '';
        }
        return <span title={txt} className={text === '1' ? 'enable' : 'disable'}>{txt}</span>;
      } },
      { title: commonMap.action, fixed: 'right', width: 180, render(text, record) {
        return (
          <span>
            <a onClick={() => { handleDetailClick(record); }}>{commonMap.detail}</a>
            <span className="ant-divider" />
            <a onClick={() => { handleQueryAttachClick(record); }}>{bizMap.attachDetail}</a>
            <span className="ant-divider" />
            <Dropdown overlay={menu} trigger={['click']} onVisibleChange={(visible) => { handleUpdateClick(visible, record) }}>
              <a className="ant-dropdown-link">{commonMap.update}<Icon type="down" /></a>
            </Dropdown>
          </span>
        );
      } },
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

AgentPageTable.propTypes = {
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleDetailClick: PropTypes.func,
  handleUpdateClick: PropTypes.func,
  handleQueryAttachClick: PropTypes.func,
};

AgentPageTable.defaultProps = {
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleDetailClick: noop,
  handleUpdateClick: noop,
  handleQueryAttachClick: noop,
}

export default AgentPageTable;
