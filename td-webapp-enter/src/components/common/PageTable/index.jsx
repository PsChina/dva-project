import React, { PropTypes } from 'react';
import { Table } from 'antd';

const noop = () => {};

class PageTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.tableLoading === true && nextProps.tableLoading === false) {
      this.setState({ selectedRowKeys: [] });
    } else if (nextProps.tableList !== this.props.tableList) {
      this.setState({ selectedRowKeys: [] });
    }
  }

  render() {
    const obj = this;
    const { tableCheckbox, tablePage, tableColumns, tableLoading, tableList, tableTotal,
      tablePageChange, tableRowSelect, autoRender, ...restProps } = this.props;

    const rowSelection = tableCheckbox ? {
      onSelect: (record, selected, selectedRows) => {
        tableRowSelect(selectedRows, [record]);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        tableRowSelect(selectedRows, changeRows);
      },
      onChange: (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
      },
      selectedRowKeys: this.state.selectedRowKeys,
    } : null;

    const pagination = tablePage ? {
      pageSize: 10,
      total: tableTotal,
      onChange(next) {
        obj.setState({ selectedRowKeys: [] }, () => {
          tablePageChange(next);
        });
      },
      showTotal(total) {
        return `共 ${total} 条记录`;
      },
    } : null;

    if (autoRender === true) {
      for (let i = 0; i < tableColumns.length; i++) {
        const col = tableColumns[i];
        if (!col.render && (!col.autoRender === true)) {
          col.render = (text) => {
            return <span title={text}>{text}</span>;
          }
        }
      }
    }

    const tableProps = {
      rowSelection,
      pagination,
      size: 'middle',
      loading: tableLoading,
      columns: tableColumns,
      dataSource: tableList,
      ...restProps,
    };

    return (
      <Table {...tableProps} />
    );
  }
}

PageTable.propTypes = {
  tableCheckbox: PropTypes.bool,
  tablePage: PropTypes.bool,
  tableColumns: PropTypes.array,
  tableLoading: PropTypes.bool,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  autoRender: PropTypes.bool,
};

PageTable.defaultProps = {
  tableCheckbox: true,
  tablePage: true,
  tableColumns: [],
  tableLoading: false,
  tableList: [],
  tableTotal: 0,
  tablePageChange: noop,
  tableRowSelect: noop,
  autoRender: true,
}

export default PageTable;
