import React from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import SummaryOrderQueryForm from '../../../components/business/oms/summaryOrder/SummaryOrderQueryForm';
import SummaryOrderPageTable from '../../../components/business/oms/summaryOrder/SummaryOrderPageTable';
import * as i18n from '../../../utils/i18n';
import { callConfirm } from '../../../utils/alert';

const SummaryOrderManage = ({ dispatch, summaryOrderManage }) => {
  const commonMap = i18n.commonMap();
  const bizMap = i18n.bizMap('oms/summaryOrder');
  const {
    tableCurrentPage, tableParam, tableLoading, tableList, tableTotal, advExpand,
  } = summaryOrderManage;

  const cardProps = {
    title: bizMap.todaySummaryOrder,
    style: { width: '100%' },
  };
  const queryFormProps = {
    advExpand,
    formSubmit: (dat) => {
      dispatch({
        type: 'summaryOrderManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    collapseClick: () => {
      dispatch({
        type: 'summaryOrderManage/toggleAdvExpand',
      });
    },
    exportClick: () => {
      callConfirm(commonMap.tip, commonMap.exportQueryConfirm, () => {
        dispatch({
          type: 'summaryOrderManage/exportList',
          payload: { ...tableParam },
        });
      });
    },
  };
  const tableProps = {
    tableCurrentPage,
    tableList,
    tableLoading,
    tableTotal,
    tablePageChange(next) {
      dispatch({
        type: 'summaryOrderManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
  };
  return (
    <div>
      <Card {...cardProps}>
        <SummaryOrderQueryForm {...queryFormProps} />
        <SummaryOrderPageTable {...tableProps} />
      </Card>
    </div>

  );
};

function mapStateToProps({ summaryOrderManage }) {
  return { summaryOrderManage };
}

export default connect(mapStateToProps)(SummaryOrderManage);
