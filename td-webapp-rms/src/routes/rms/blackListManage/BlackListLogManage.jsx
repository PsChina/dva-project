import React from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import BlackListLogPageTable from '../../../components/business/rms/blackListLog/BlackListLogPageTable';
import BlackListLogQueryForm from '../../../components/business/rms/blackListLog/BlackListLogQueryForm';
import * as i18n from '../../../utils/i18n';

const BlackListLogManage = ({ dispatch, blackListLogManage }) => {
  const objectid = 'logId';
  const bizMap = i18n.bizMap('rms/blackListLog');
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage, tableSelects,
  } = blackListLogManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }
  const cardProps = {
    title: bizMap.blackListLog,
    style: { width: '100%' },
  };
  const queryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'blackListLogManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
  };
  const tableProps = {
    tableList,
    tableLoading,
    tableTotal,
    tableCurrentPage,
    tableParam,
    tablePageChange(next) {
      dispatch({
        type: 'blackListLogManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'blackListLogManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
  };
  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  return (
    <div>
      <Card {...cardProps}>
        <BlackListLogQueryForm {...queryFormProps} />
        <BlackListLogPageTable {...tableProps} />
      </Card>
    </div>
  );
};

function mapStateToProps({ blackListLogManage }) {
  return { blackListLogManage };
}

export default connect(mapStateToProps)(BlackListLogManage);
