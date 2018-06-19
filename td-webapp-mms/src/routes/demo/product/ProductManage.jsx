import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import PageTable from '../../../components/common/PageTable';
import SlidePanel from '../../../components/common/SlidePanel';
import ProductQueryForm from '../../../components/business/demo/product/ProductQueryForm';
import ProductInfoForm from '../../../components/business/demo/product/ProductInfoForm';
import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const ProductManage = ({ dispatch, productManage }) => {
  const bizMap = i18n.bizMap('demo/product');
  const commonMap = i18n.commonMap();
  const { advExpand, tableParam, tableLoading, tableList, tableTotal, tableSelects,
    addModalVisible, updateModalVisible, modalFormData, updateFormSubmit, addFormSubmit, slideVisible } = productManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    selectIds.push(tableSelects[i].prodId);
  }

  const cardProps = {
    title: 'Products Manage',
    style: { width: '100%' },
  };
  // 查询表单相关属性
  const queryFormProps = {
    advExpand,
    collapseClick: () => {
      dispatch({
        type: 'productManage/toggleAdvExpand',
      });
    },
    formSubmit: (dat) => {
      dispatch({
        type: 'productManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    addClick: () => {
      dispatch({
        type: 'productManage/toggleModal',
        payload: { type: 'add' },
      });
    },
    deleteClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        callConfirm(commonMap.tip, commonMap.deleteConfirm, () => {
          dispatch({
            type: 'productManage/deleteList',
            payload: { ids: selectIds.toString() },
          });
        });
      }
    },
    enableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        callConfirm(commonMap.tip, commonMap.enableConfirm, () => {
          dispatch({
            type: 'productManage/updateStatus',
            payload: { ids: selectIds.toString(), status: 1 },
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
            type: 'productManage/updateStatus',
            payload: { ids: selectIds.toString(), status: 0 },
          });
        });
      }
    },
  };
  // 表格相关属性
  const handleDetailClick = (record) => {
    console.log(record);
  };
  const handleUpdateClick = (record) => {
    dispatch({
      type: 'productManage/toggleModal',
      payload: { type: 'update', data: record },
    });
  };
  const handleSlideClick = () => {
    dispatch({
      type: 'productManage/updateState',
      payload: { slideVisible: !slideVisible },
    })
  }
  const tableProps = {
    rowKey: record => record.prodId,
    tableColumns: [
      { title: bizMap.prodName, dataIndex: 'prodName' },
      {
        title: bizMap.prodType,
        dataIndex: 'prodType',
        render(text) {
          return bizMap[`prodType-${text}`];
        },
      },
      {
        title: bizMap.prodStatus,
        dataIndex: 'prodStatus',
        render(text) {
          return commonMap[`status-${text}`];
        },
      },
      {
        title: commonMap.action,
        render(text, record) {
          return (
            <span>
              <a onClick={() => { handleDetailClick(record); }}>{commonMap.detail}</a>
              <span className="ant-divider" />
              <a onClick={() => { handleUpdateClick(record); }}>{commonMap.update}</a>
              <span className="ant-divider" />
              <a onClick={() => { handleSlideClick(record); }}>Slide</a>
            </span>
          );
        },
      },
    ],
    tableList,
    tableLoading,
    tableTotal,
    tablePageChange(next) {
      dispatch({
        type: 'productManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'productManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
  };
  // 添加模态框及表单相关属性
  const addFormProps = {
    submiting: addFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'productManage/addOne',
        payload: { ...dat },
      });
    },
  };
  const addModalProps = {
    footer: null,
    title: commonMap.detail,
    visible: addModalVisible,
    onCancel: () => {
      dispatch({
        type: 'productManage/toggleModal',
        payload: { type: 'add' },
      });
    },
  };
  // 更新模态框及表单相关属性
  const updateFormProps = {
    data: modalFormData,
    submiting: updateFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'productManage/updateOne',
        payload: { ...dat },
      });
    },
  };
  const updateModalProps = {
    footer: null,
    title: commonMap.update,
    visible: updateModalVisible,
    onCancel: () => {
      dispatch({
        type: 'productManage/toggleModal',
        payload: { type: 'update', data: {} },
      });
    },
  };
  // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  const UpdateFormGen = () => <ProductInfoForm {...updateFormProps} />

  const slidePanelProps = {
    visible: slideVisible,
  };
  return (
    <div>
      <Card {...cardProps}>
        <ProductQueryForm {...queryFormProps} />
        <PageTable {...tableProps} />
      </Card>
      <Modal {...addModalProps}>
        <ProductInfoForm {...addFormProps} />
      </Modal>
      <Modal {...updateModalProps}>
        <UpdateFormGen />
      </Modal>
      <SlidePanel {...slidePanelProps}>
        <span>This is SlidePanel</span>
      </SlidePanel>
    </div>
  );
};

function mapStateToProps({ productManage }) {
  return { productManage };
}

export default connect(mapStateToProps)(ProductManage);
