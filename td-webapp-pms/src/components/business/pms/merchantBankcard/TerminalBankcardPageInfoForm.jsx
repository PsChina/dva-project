import React, { PropTypes } from 'react';
import { Form } from 'antd';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';

const noop = () => {};

const TerminalBankcardPageInfoForm = (props) => {
  const {
    tableList,
    tableTotal,
    tableLoading,
    tablePageChange,
    tableCurrentPage,
   } = props;
  const commonMap = i18n.commonMap();
  const bizMap = i18n.bizMap('pms/terminalBankcard');
  const tableProps = {
    rowKey: record => `${record.chnTermNo}${record.chnMerNo}${record.chnId}`,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.chnTermNo, dataIndex: 'chnTermNo', width: 150 },
      { title: bizMap.chnMerName, dataIndex: 'chnMerName', width: 150 },
      { title: bizMap.chnName, dataIndex: 'chnName', width: 150 },
      { title: bizMap.termStatus, dataIndex: 'termStatus', width: 120, render(text) {
        let txt = '';
        switch (text) {
          case '0': txt = commonMap['status-0']; break;
          case '1': txt = commonMap['status-1']; break;
          default: txt = ''; break;
        }
        return <span title={txt}>{txt}</span>;
      } },
      { title: bizMap.creTim, dataIndex: 'creTim', width: 150 },
      { title: bizMap.uptTim, dataIndex: 'uptTim', width: 150 },
    ],
    scroll: { x: true },
    tableList,
    tableTotal,
    tableLoading,
    tableCheckbox: false,
    tableCurrentPage,
    tablePageChange(next) {
      tablePageChange(next);
    },
  };
  return (
    <PageTable {...tableProps} />
  );
};

TerminalBankcardPageInfoForm.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableCurrentPage: PropTypes.number,
};

TerminalBankcardPageInfoForm.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tablePageChange: noop,
  tableCurrentPage: 1,
};

export default Form.create()(TerminalBankcardPageInfoForm);
