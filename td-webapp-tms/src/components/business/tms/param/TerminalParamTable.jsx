import React, { PropTypes } from 'react';
import { Popconfirm, Icon } from 'antd';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };

const TerminalParamTable = (props) => {
  const { tableList, tableLoading, handleDeleteClick, handleDeleteConfirm, handleDeleteCancel, handleUpClick, handleDownClick } = props;
  const bizMap = i18n.bizMap('tms/terminalParamTemp');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.itemCode,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.itemCode, dataIndex: 'itemCode', width: 100 },
      { title: bizMap.itemName, dataIndex: 'itemName', width: 100 },
      {
        title: bizMap.itemField, dataIndex: 'itemField', width: 100, render(text) {
          return `F${text}`;
        },
      },
      {
        title: bizMap.itemType, dataIndex: 'itemType', width: 100, render(text, record) {
          let type = '';
          switch (record.itemType) {
            case '1': type = bizMap['itemType-1']; break;
            case '2': type = bizMap['itemType-2']; break;
            case '3': type = bizMap['itemType-3']; break;
            case '4': type = bizMap['itemType-4']; break;
            default: break;
          }
          return type;
        },
      },
      {
        title: bizMap.itemLenType, dataIndex: 'itemLenType', width: 100, render(text, record) {
          let type = '';
          switch (record.itemLenType) {
            case '1': type = bizMap['itemLenType-1']; break;
            case '2': type = bizMap['itemLenType-2']; break;
            default: break;
          }
          return type;
        },
      },
      { title: bizMap.itemLength, dataIndex: 'itemLength', width: 100 },
      {
        title: bizMap.itemAlign, dataIndex: 'itemAlign', width: 80, render(text, record) {
          let align = '';
          switch (record.itemAlign) {
            case '1': align = bizMap['itemAlign-1']; break;
            case '2': align = bizMap['itemAlign-2']; break;
            default: break;
          }
          return align;
        },
      },
      { title: bizMap.itemSup, dataIndex: 'itemSup', width: 80 },
      { title: bizMap.itemOrder, dataIndex: 'itemOrder', width: 80 },
      {
        title: commonMap.action, width: 100, fixed: 'right', render(text, record, index) {
          return (
            <span>
              <Popconfirm placement="topRight" title={bizMap.deleteParamConfirm} onConfirm={handleDeleteConfirm} onCancel={handleDeleteCancel}>
                <a onClick={() => { handleDeleteClick(record, index); }}><Icon type="delete" /></a>
              </Popconfirm>
              {
                (index > 0 && index < tableList.length - 1) ? [
                  <span key="split1" className="ant-divider" />,
                  <a key="up" onClick={() => { handleUpClick(record, index) }}><Icon type="up-circle-o" /></a>,
                  <span key="split2" className="ant-divider" />,
                  <a key="down" onClick={() => { handleDownClick(record, index) }}><Icon type="down-circle-o" /></a>,
                ] : null
              }
              {
                index === 0 && tableList.length !== 1 ? [
                  <span key="split" className="ant-divider" />,
                  <a key="a" onClick={() => { handleDownClick(record, index) }}><Icon type="down-circle-o" /></a>,
                ] : null
              }
              {
                index === tableList.length - 1 && tableList.length !== 1 ? [
                  <span key="split1" className="ant-divider" />,
                  <a key="a" onClick={() => { handleUpClick(record, index) }}><Icon type="up-circle-o" /></a>,
                ] : null
              }
            </span>
          );
        },
      },
    ],
    tableList,
    tableLoading,
    tableCheckbox: false,
    pagination: false,
    scroll: { x: 1000 },
  };

  return (<PageTable {...tableProps} />);
}

TerminalParamTable.propTypes = {
  tableList: PropTypes.array,
  tableLoading: PropTypes.bool,
  handleDeleteClick: PropTypes.func,
  handleDeleteConfirm: PropTypes.func,
  handleDeleteCancel: PropTypes.func,
  handleUpClick: PropTypes.func,
  handleDownClick: PropTypes.func,
};

TerminalParamTable.defaultProps = {
  tableList: [],
  tableLoading: false,
  handleDeleteClick: noop,
  handleDeleteConfirm: noop,
  handleDeleteCancel: noop,
  handleUpClick: noop,
  handleDownClick: noop,
}

export default TerminalParamTable;
