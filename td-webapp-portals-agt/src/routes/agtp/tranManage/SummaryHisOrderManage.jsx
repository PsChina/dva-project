import React from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import SummaryHisOrderQueryForm from '../../../components/business/agtp/summaryHisOrder/SummaryHisOrderQueryForm';
import SummaryHisOrderPageTable from '../../../components/business/agtp/summaryHisOrder/SummaryHisOrderPageTable';
import * as i18n from '../../../utils/i18n';
import { callConfirm } from '../../../utils/alert';

const SummaryHisOrderManage = ({ dispatch, summaryHisOrderManage }) => {
  const bizMap = i18n.bizMap('agtp/summaryOrder');
  const commonMap = i18n.commonMap();
  const {
    tableCurrentPage, tableParam, tableLoading, tableList, tableTotal, advExpand,
  } = summaryHisOrderManage;

  const cardProps = {
    title: bizMap.hisSummaryOrder,
    style: { width: '100%' },
  };
  const queryFormProps = {
    advExpand,
    formSubmit: (dat) => {
      dispatch({
        type: 'summaryHisOrderManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    collapseClick: () => {
      dispatch({
        type: 'summaryHisOrderManage/toggleAdvExpand',
      });
    },
    exportClick: () => {
      callConfirm(commonMap.tip, commonMap.exportQueryConfirm, () => {
        dispatch({
          type: 'summaryHisOrderManage/exportList',
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
        type: 'summaryHisOrderManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
  };
  return (
    <div>
      <Card {...cardProps}>
        <SummaryHisOrderQueryForm {...queryFormProps} />
        <SummaryHisOrderPageTable {...tableProps} />
      </Card>
    </div>

  );
};

function mapStateToProps({ summaryHisOrderManage }) {
  return { summaryHisOrderManage };
}

export default connect(mapStateToProps)(SummaryHisOrderManage);
