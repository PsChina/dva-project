import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import AnnouncementQueryForm from '../../../components/business/merp/announcement/AnnouncementQueryForm';
import AnnouncementPageTable from '../../../components/business/merp/announcement/AnnouncementPageTable';
import AnnouncementTable from '../../../components/business/merp/announcement/AnnouncementTable';
import * as i18n from '../../../utils/i18n';

const AnnouncementManage = ({ dispatch, announcementManage }) => {
  const objectid = 'annId';
  const bizMap = i18n.bizMap('merp/announcement');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage, tableSelects,
    infoModalVisible, infoTableData,
  } = announcementManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }
  const cardProps = {
    title: bizMap.pubAnnmentManage,
    style: { width: '100%' },
  };
  const queryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'announcementManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    addClick: () => {
      dispatch({
        type: 'announcementManage/toggleModal',
        payload: { type: 'add' },
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
        type: 'announcementManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'announcementManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'announcementManage/toggleModal',
        payload: { type: 'info', data: record },
      });
    },
  };
  const infoModalProps = {
    footer: null,
    title: commonMap.detail,
    visible: infoModalVisible,
    width: 615,
    onCancel: () => {
      dispatch({
        type: 'announcementManage/toggleModal',
        payload: { type: 'info', data: {} },
      });
    },
  };
  const infoTableProps = {
    data: infoTableData,
  };
  return (
    <div>
      <Card {...cardProps}>
        <AnnouncementQueryForm {...queryFormProps} />
        <AnnouncementPageTable {...tableProps} />
      </Card>
      <Modal {...infoModalProps}>
        <AnnouncementTable {...infoTableProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ announcementManage }) {
  return { announcementManage };
}

export default connect(mapStateToProps)(AnnouncementManage);
