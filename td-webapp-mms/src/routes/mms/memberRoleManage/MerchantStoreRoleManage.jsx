import React from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import MerchantRoleQueryForm from '../../../components/business/mms/merchantStoreRole/MerchantStoreRoleQueryForm';
import MerchantRolePageTable from '../../../components/business/mms/merchantStoreRole/MerchantStoreRolePageTable'
import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const MerchantStoreRoleManage = ({ dispatch, merchantStoreRoleManage }) => {
  const objectid = 'roleId';
  const bizMap = i18n.bizMap('mms/merchant');
  const commonMap = i18n.commonMap();
  const {
    advExpand, tableParam, tableLoading, tableList, tableTotal, tableSelects, sysInfoList, tableCurrentPage } = merchantStoreRoleManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }

  const cardProps = {
    title: bizMap.merchantStoreRoleManage,
    style: { width: '100%' },
  };
  const queryFormProps = {
    sysInfoList,
    advExpand,
    collapseClick: () => {
      dispatch({
        type: 'merchantStoreRoleManage/toggleAdvExpand',
      });
    },
    formSubmit: (dat) => {
      dispatch({
        type: 'merchantStoreRoleManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    enableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        callConfirm(commonMap.tip, commonMap.enableConfirm, () => {
          dispatch({
            type: 'merchantStoreRoleManage/updateStatus',
            payload: { ids: selectIds.toString(), isUse: '1' },
          });
        });
      }
    },
    disableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        callConfirm(commonMap.tip, commonMap.enableConfirm, () => {
          dispatch({
            type: 'merchantStoreRoleManage/updateStatus',
            payload: { ids: selectIds.toString(), isUse: '0' },
          });
        });
      }
    },
  };
  const tableProps = {
    tableCurrentPage,
    tableList,
    tableLoading,
    tableTotal,
    tablePageChange(next) {
      dispatch({
        type: 'merchantStoreRoleManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'merchantStoreRoleManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'merchantStoreRoleManage/toggleModal',
        payload: { type: 'info', data: record },
      });
    },
  };
  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题

  return (
    <div>
      <Card {...cardProps}>
        <MerchantRoleQueryForm {...queryFormProps} />
        <MerchantRolePageTable {...tableProps} />
      </Card>
    </div>
  );
};

function mapStateToProps({ merchantStoreRoleManage }) {
  return { merchantStoreRoleManage };
}

export default connect(mapStateToProps)(MerchantStoreRoleManage);
