import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';

const noop = () => {};
const RuleMessPageTable = (props) => {
  const { tableList, tableTotal } = props;
  const bizMap = i18n.bizMap('rms/warnRule');
  const { handleUpdataClick, handleGropClick, tablePageChange, tableLoading, tableRowSelect, tableCurrentPage } = props;
  const commonMap = i18n.commonMap();
  const convertDesc = (text, record) => {
    let desc = text;
  // 规则参数最多5个 且以param1 ... param5 形式返回
    for (let i = 1; i <= 5; i++) {
      const p = record[`ruleParam${i}`];
      if (!p) { break; }
      desc = desc.replace(/\{\w\}/i, p);
    }
    return desc;
  }
  const tableProps = {
    rowKey: record => record.ruleId,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      // { title: bizMap.ruleWarnGrp, dataIndex: 'ruleWarnGrp' },
      { title: bizMap.ruleId, dataIndex: 'ruleId' },
      { title: bizMap.tmpId, dataIndex: 'tmpId' },
      { title: bizMap.ruleName, dataIndex: 'ruleName',
        render(text, record) {
          const desc = convertDesc(text, record);
          return <span title={desc}>{desc}</span>;
        },
      },
      { title: bizMap.ruleStatus, dataIndex: 'ruleStatus',
        render(text) {
          return commonMap[`ruleStatus-${text}`];
        },
      },
      { title: bizMap.ruleTriType, dataIndex: 'ruleTriType',
        render(text) {
          return commonMap[`TriType-${text}`];
        },
      },
      { title: bizMap.ruleTriRate, dataIndex: 'ruleTriRate' },
      { title: bizMap.ruleWarnType, dataIndex: 'ruleWarnType',
        render(text) {
          return commonMap[`ruleWarnType-${text}`];
        },
      },
      { title: bizMap.ruleRemark, dataIndex: 'ruleRemark' },
      { title: commonMap.action, fixed: 'right', width: 140, render(text, record) {
        return (
          <span>
            <a onClick={() => { handleUpdataClick(record); }}>{bizMap.modify}</a>
            <span className="ant-divider" />
            <a onClick={() => { handleGropClick(record); }}>{bizMap.configGrop}</a>
          </span>
        );
      } },
    ],
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
};


RuleMessPageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableCurrentPage: PropTypes.number,
  handleUpdataClick: PropTypes.func,
  handleGropClick: PropTypes.func,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  tableLoading: PropTypes.bool,
};

RuleMessPageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableCurrentPage: 1,
  handleUpdataClick: noop,
  handleGropClick: noop,
  tablePageChange: noop,
  tableRowSelect: noop,
  tableLoading: false,
}

export default RuleMessPageTable;
