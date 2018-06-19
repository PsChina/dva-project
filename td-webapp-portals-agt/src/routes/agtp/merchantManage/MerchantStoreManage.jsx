import React from 'react';
import { connect } from 'dva';
import { Card, Modal, Spin } from 'antd';
import MerchantStoreQueryForm from '../../../components/business/agtp/merchantStore/MerchantStoreQueryForm';
import MerchantStorePageTable from '../../../components/business/agtp/merchantStore/MerchantStorePageTable';
import MerchantStoreInfoForm from '../../../components/business/agtp/merchantStore/infoForm/MerchantStoreInfoForm';
import MerchantStoreInfoTable from '../../../components/business/agtp/merchantStore/MerchantStoreInfoTable';
import MerchantStoreBindStore from '../../../components/business/agtp/merchantStore/MerchantStoreBindStore';
import MerchantStoreAttachDetailForm from '../../../components/business/agtp/merchantStore/infoForm/MerchantStoreAttachDetailForm';
import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const MerchantStoreManage = ({ dispatch, merchantStoreManage }) => {
  const objectid = 'braId';
  const bizMap = i18n.bizMap('agtp/merchantStore');
  const commonMap = i18n.commonMap();
  const {
    advExpand, tableParam, tableLoading, tableList, tableTotal, tableSelects,
    updateModalVisible, updateFormSubmit, updateFormData, tableCurrentPage,
    infoModalVisible, infoTableData, attachInfoData,
    attachInfoModalVisible, spinLoading, bindStoreModalVisible,
    extraInfs,mainInf,soId,POSList,cajasList,
    merName,braName,
    braId,merId
  } = merchantStoreManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }

  const cardProps = {
    title: bizMap.merchantStoreManage,
    style: { width: '100%' },
  };
  const queryFormProps = {
    advExpand,
    collapseClick: () => {
      dispatch({
        type: 'merchantStoreManage/toggleAdvExpand',
      });
    },
    formSubmit: (dat) => {
      dispatch({
        type: 'merchantStoreManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    enableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        callConfirm(commonMap.tip, commonMap.enableConfirm, () => {
          dispatch({
            type: 'merchantStoreManage/updateStatus',
            payload: { ids: selectIds.toString(), braStatus: '1' },
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
            type: 'merchantStoreManage/updateStatus',
            payload: { ids: selectIds.toString(), braStatus: '0' },
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
        type: 'merchantStoreManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'merchantStoreManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'merchantStoreManage/toggleModal',
        payload: { type: 'info', data: record },
      });
    },
    handleUpdateClick(record) {
      dispatch({
        type: 'merchantStoreManage/toggleModal',
        payload: { type: 'update', data: record },
      });
    },
    handleQueryAttachClick(record) {
      dispatch({
        type: 'merchantStoreManage/queryAttach',
        payload: { PKID: record.braId, TABLENAME: 'store_info', attachInfoModalVisible: !attachInfoModalVisible },
      });
    },
    handleBindStoreClick(record){
      dispatch({
        type: 'merchantStoreManage/bindStore',
        payload: { type:'bindStore', data: record, braId: record.braId, bindStoreModalVisible: !bindStoreModalVisible },
      });
    }
  };
  const infoModalProps = {
    footer: null,
    title: commonMap.detail,
    visible: infoModalVisible,
    onCancel: () => {
      dispatch({
        type: 'merchantStoreManage/toggleModal',
        payload: { type: 'info', data: {} },
      });
    },
  };
  const infoTableProps = {
    data: infoTableData,
  };
  const attachInfoModalProps = {
    footer: null,
    title: commonMap.detail,
    visible: attachInfoModalVisible,
    onCancel: () => {
      dispatch({
        type: 'merchantStoreManage/toggleModal',
        payload: { type: 'attachInfo', data: {} },
      });
    },
  };
  const attachDetailFormProps = {
    data: attachInfoData,
  };
  const updateModalProps = {
    footer: null,
    title: commonMap.update,
    visible: updateModalVisible,
    onCancel: () => {
      dispatch({
        type: 'merchantStoreManage/toggleModal',
        payload: { type: 'update', data: {} },
      });
    },
  };
  const updateFormProps = {
    data: updateFormData,
    submiting: updateFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'merchantStoreManage/updateOne',
        payload: { ...dat },
      });
    },
  };
  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  const UpdateFormGen = () => <MerchantStoreInfoForm {...updateFormProps} />;
  const BindStoreModalProps = {
    visible:bindStoreModalVisible,
    title:commonMap.bindStore,
    onCancel:()=>{
      dispatch({
        type:'merchantStoreManage/toggleModal',
        payload: { type: 'bindStore', data: {} },
      })
    },
    onOk:()=>{
      // console.log('修复 套餐设备传递多余属性bug',extraInfs,mainInf);
      let fextraInfs =  extraInfs.map( (item)=>{
        return {
          "bindId" : String(item.bindId) , 
          "payTermModNo" : item.payTermModNo ? String(item.payTermModNo) : null,
          "payTermNo" : item.payTermNo ? String(item.payTermNo) : null ,
          "posTermModNo" : item.posTermModNo ? String(item.posTermModNo) : null ,
          "posTermNo" : item.posTermNo ? String(item.posTermNo) : null,
          "termType" : item.termType ? String(item.termType) : null,
        }
      } )
      let fmainInf = {
        "bindId" : mainInf.bindId ? String(mainInf.bindId) : null, 
        "payTermModNo" : mainInf.payTermModNo ? String(mainInf.payTermModNo) : null,
        "payTermNo" : mainInf.payTermNo ? String(mainInf.payTermNo) : null,
        "posTermModNo" : mainInf.posTermModNo ? String(mainInf.posTermModNo) : null,
        "posTermNo" : mainInf.posTermNo ? String(mainInf.posTermNo) : null,
        "termType" : mainInf.termType ? String(mainInf.termType) : null,
      }
      if(mainInf['termType']){ // filter params main
        const termTypeArr = mainInf['termType'].split(':');
        if(termTypeArr[0]==='99'){
          delete fmainInf.posTermModNo;
          delete fmainInf.posTermNo
        }
        if(termTypeArr[1]==='99'){
          delete fmainInf.payTermModNo;
          delete fmainInf.payTermNo;
        }
      } 
      if(extraInfs&&extraInfs.length){
        extraInfs.forEach((subMeal,index)=>{
          if( subMeal['termType'] ){
            const termTypeArr = subMeal['termType'].split(':');
            if(termTypeArr[0]==='99'){
              delete fextraInfs[index].posTermModNo;
              delete fextraInfs[index].posTermNo
            }
            if(termTypeArr[1]==='99'){
              delete fextraInfs[index].payTermModNo;
              delete fextraInfs[index].payTermNo;
            }
          }
        })
      }
      // console.log(braId,
      //   fextraInfs,
      //   fmainInf,
      //   merId,
      //   soId)
      dispatch({
        type:'merchantStoreManage/doBindStore',
        payload: {
          braId:String(braId),
          extraInfs:fextraInfs,
          mainInf:fmainInf,
          merId:String(merId),
          soId:String(soId)
         },
      })
    }
  }
  const bindStoreProps = {
    extraInfs,
    mainInf,
    soId,
    merName,
    braName,
    POSList,
    cajasList,
    dispatch
  }
  return (
    <div>
      <Card {...cardProps}>
        <MerchantStoreQueryForm {...queryFormProps} />
        <MerchantStorePageTable {...tableProps} />
      </Card>
      <Modal {...updateModalProps}>
        <UpdateFormGen />
      </Modal>
      <Modal {...infoModalProps}>
        <MerchantStoreInfoTable {...infoTableProps} />
      </Modal>
      <Modal {...attachInfoModalProps}>
        <Spin spinning={spinLoading}>
          <MerchantStoreAttachDetailForm {...attachDetailFormProps} />
        </Spin>
      </Modal>
      <Modal {...BindStoreModalProps}>
          <MerchantStoreBindStore {...bindStoreProps}/>
      </Modal>
    </div>
  );
};

function mapStateToProps({ merchantStoreManage }) {
  return { merchantStoreManage };
}

export default connect(mapStateToProps)(MerchantStoreManage);
