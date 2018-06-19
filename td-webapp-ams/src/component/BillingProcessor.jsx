import React from 'react';
import { Pagination, Button, Modal, message } from 'antd';
import * as services from '../services/component/BillingProcessor';
import FinancialForm from './FinancialForm';
import SearchBar from './SearchBar';
import styles from '../style/component/BillingProcessor';
import { bizMap } from '../utils/i18n';
import { formatDate } from '../utils/date';
import { formatMoney, YuanRemoveComma } from '../utils/currency';
import AddOrderModal from './AddOrderModal';

const bMap = bizMap('component/BillingProcessor');

const orderParams = {
  customerName: undefined, // 商户名称 ok
  customerType: undefined, // 客户类型 0 商户 1 代理商 ok
  // soContent: undefined, // 订单内容 no

  mainMealSodAmount:undefined,
  extraAmount:undefined,

  soAmount: undefined, // 订单总额 ok 1个 总共2个
  payType: undefined, // 支付方式 ok

  soDesc: undefined, // 订单备注 ok
  soBank: undefined, // 银行id ok
  soBankDesc: undefined, // 银行备注 ok
  soBankAttach: undefined, // 银行附件id ok
  pakStoreType: 1, // 开通方式 目前默认 1 ok
  braId:undefined, // 门店id ok
  agtId:undefined, // 代理商（合伙人）id no
  braName:undefined, // 门店名称
  sodAvailCount:0,
  mainMeal:{ // 主套餐
    "sodType": 1,
    "sodPrice": 0,
    "sodCount": 1, // 默认一个
    "sodAvailCount":0, // 默认
  }, 
  subMeals:[], // 附套餐
  devices:[], // 设备
  sodDetails:[], // 套餐列表 主附套餐 设备 都在内 
}
/**
 *  window.infoBus.$emit('braName',item,braName);
 * {
    "sodType": 3,
    "sodPrice": 0,
    "sodCount": 0,
  }
 * {
 *  "sodPrice"://套餐单价
 *  "sodCount"://数量
 *  "sodAvailCount"://可用数
 *  "sodAmount"://价格
 *  "goodsId"://套餐id
 *  "sodType": 1 主套餐 2付套餐 3设备
 * }
 * // sales_order
*/

class BillingProcessor extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      orderLength:0,
      pageSize:10,
      orderList:[], // 每页数据
      current:1,
      selectedRowKeys:[],

      visible:false, // model 显示
      batchVisible:false,
      newOrderVisible:false,

      submitLoading:false,
      batchTotal:0,
      total:0,

      // 过滤条件
      minTime:undefined,
      maxTime:undefined,
      customerName:undefined,

      totalPrices:0,
    }
    }
    componentWillMount(){ // 组件即将挂载
      this.getOrderList(this.state.current,this.state.pageSize)
      window.infoBus.$on('getOrderList',()=>{
        this.getOrderList(this.state.current,this.state.pageSize)
      });
      window.infoBus.$on('customerType',(customerType)=>{
        if( customerType.indexOf('0')!==-1){
          customerType = 0;
        }else{
          customerType = 1;
        }
        orderParams.customerType = customerType;
      });
      window.infoBus.$on('soBank',(soBank)=>{
        orderParams.soBank = soBank;
      })
      window.infoBus.$on('customerName',(customerName)=>{
        orderParams.customerName = customerName;
      })
      window.infoBus.$on('braId',(braId)=>{
        orderParams.braId = braId;
      }) 
      window.infoBus.$on('mealPak',(obj)=>{
        if(orderParams['mainMeal']){
          orderParams.mainMeal.sodPrice = obj.pakPriceDisMon;
          orderParams.mainMeal.goodsId = obj.pakId;
          orderParams.mainMeal.sodAmount = Number((obj.pakPriceDisMon * orderParams.mainMeal.sodCount * 12).toFixed(2));
        }
      }) 
      window.infoBus.$on('sodCount',(count)=>{
        if(orderParams['mainMeal']){
          orderParams.mainMeal.sodCount = count;
          orderParams.mainMeal.sodAmount = Number((orderParams.mainMeal.sodPrice * count * 12).toFixed(2));
        }
      }) 
      window.infoBus.$on('subMeals',(subMeals)=>{
        orderParams.subMeals = subMeals;
      })
      console.log('on paymentType')
      window.infoBus.$on('paymentType',(paymentType)=>{
        orderParams.payType = bMap[paymentType];
        console.log(orderParams.payType);
      });
      window.infoBus.$on('extraAmount',this.updataExtraAmount);
      window.infoBus.$on('mainMealSodAmount',(mainMealSodAmount)=>{
        orderParams.mainMealSodAmount=mainMealSodAmount;
        const price = Number(orderParams.extraAmount)
        orderParams.soAmount = mainMealSodAmount + (isNaN(price) ? 0 : price);
        console.log(orderParams.soAmount);
      });
      window.infoBus.$on('soBankDesc',(soBankDesc)=>{
        orderParams.soBankDesc = soBankDesc;
      });
      window.infoBus.$on('soDesc',(soDesc)=>{
        orderParams.soDesc = soDesc;
      })
      window.infoBus.$on('soBankAttach',(soBankAttach)=>{
        orderParams.soBankAttach = soBankAttach;
      });
      window.infoBus.$on('agtId',(agtId)=>{
        orderParams.agtId = agtId;
      })
      window.infoBus.$on('soAmount',(soAmount)=>{
        orderParams.soAmount = soAmount;
      });
      window.infoBus.$on('braName',(braName)=>{
        orderParams.braName = braName;
      });
      window.infoBus.$on('newOrderDisabnleVisible',(newOrderVisible)=>{
        this.setState({
          newOrderVisible
        })
      })
      window.infoBus.$on('sodAvailCount',(sodAvailCount)=>{
        orderParams.sodAvailCount = sodAvailCount;
        if(orderParams['mainMeal']){
          orderParams.mainMeal.sodAvailCount = sodAvailCount + orderParams.mainMeal.sodCount * 12;
        }
      })  
    }
    componentWillUnmount(){
      window.infoBus.$off('getOrderList');
      window.infoBus.$off('customerType');
      window.infoBus.$off('soBank');
      window.infoBus.$off('customerName');
      window.infoBus.$off('braId');
      window.infoBus.$off('mealPak');
      window.infoBus.$off('sodCount');
      window.infoBus.$off('subMeals');
      console.log('off paymentType')
      window.infoBus.$off('paymentType');
      window.infoBus.$off('extraAmount',this.updataExtraAmount); // 附加套餐总价
      window.infoBus.$off('mainMealSodAmount'); // 主套餐总价
      window.infoBus.$off('soBankDesc');
      window.infoBus.$off('soDesc');
      window.infoBus.$off('soBankAttach');
      window.infoBus.$off('agtId');
      window.infoBus.$off('soAmount'); // 总价
      window.infoBus.$off('braName');
      window.infoBus.$off('newOrderDisabnleVisible');
    }
    updataExtraAmount(extraAmount){
      orderParams.extraAmount=extraAmount;
      const price = Number(orderParams.mainMealSodAmount)
      orderParams.soAmount = extraAmount + (isNaN(price) ? 0 : price);
    }
    setSelectedRowKeys(selectedRowKeys){
      this.setState({
        selectedRowKeys
      })
    }
    formatData(data){ // 格式化数据
      let orderList = [];
      let totalPrices = 0

      if( data && 'rspList' in data ) {
        orderList = data.rspList;
      }
      if( orderList instanceof Array ) {
        for( let item of orderList ){
          item.operation = Number(item.soStatus)  === 0 ? <Button className="confirmReceipt" onClick={ (event)=>{ this.confirm.call(this,event,item)} } >{bMap['confirmReceipt']}</Button> :''
          item.soCreateTime = formatDate( new Date( item.soCreateTime ) , 'yyyy-MM-dd hh:mm:ss' );
          item.customerType = bMap[`customerType-${item.customerType}`];
          //  item.paymentType = bMap[`paymentType-${item.paymentType}`]; 缴费方式后端做国际化
          item.soStatus = bMap[`state-${item.soStatus}`];
          totalPrices += item.soAmount;
          item.soAmount = formatMoney(item.soAmount);
        }
      } 
      return {orderList, totalPrices}
    }
    getOrderList(currentPage,pageSize){
      window.infoBus.$emit('updataSelectedRowKeys',[])
      if(!window.shouldRelogin){
        services.getOrderList({
          customerName:this.state.customerName,
          soCreateTimeStart:this.state.soCreateTimeStart,
          soCreateTimeEnd:this.state.soCreateTimeEnd,
          currentPage,
          pageSize
        }).then((result)=>{
          console.log(result);
          if( 'data' in result && 'rspCod' in result.data ){
            if(result.data.rspCod==="_SSO_ERR"){
              window.infoBus.$emit('relogin')
            } 
          }
          const { orderList, totalPrices} = this.formatData( result.data );
          if( 'data' in result ){
            this.updataStatus({
              orderLength:result.data.total,
              orderList,
              current:currentPage,
              batchTotal:0,
              selectedRowKeys:[],
              totalPrices     
            })        
          }
        })
      }
    }
    updataStatus(params){
      this.setState({
        ...params
      })    
    }
    onSelectConfirmList(selectedRowKeys, selectedRows) { // 选择批量 订单
      let batchTotal = 0;
      for( let item of selectedRows ) {
        batchTotal += Number(YuanRemoveComma(item.soAmount ? item.soAmount : '0'));
      }  
      batchTotal = formatMoney(batchTotal)
      this.setState({
        selectedRowKeys,
        batchTotal
      })
    }
    confirm(event, item){ // 打开确认收款对话框
      this.setState({
        visible:true,
        total:item.soAmount,
        currentOrder:item
      })
    }
    handleOk(){ // 确认收款
      this.setState({
        submitLoading:true
      })
      if(!window.shouldRelogin){
        services.confirmOrder(this.state.currentOrder.soId)
        .then((result)=>{
          if( 'data' in result && 'rspCod' in result.data ){
            if(result.data.rspCod==="_SSO_ERR"){
              window.infoBus.$emit('relogin')
            } 
          }
          let total = 0
          this.setState({
            submitLoading:false
          })
          if('data' in result && 'rspCod' in result.data) {
            if( result.data.rspCod.toString() === '000000' ){
              for( let item of  this.state.orderList){
                if( item.soId === this.state.currentOrder.soId ){
                  item.soStatus = bMap['state-1'];
                  item.operation = undefined
                }
              }
              message.success( `${bMap['confirmSuccess']}` );
              let batchTotal = YuanRemoveComma( this.state.batchTotal ? this.state.batchTotal : '' ) - YuanRemoveComma(this.state.currentOrder.soAmount ? this.state.currentOrder.soAmount : '' )
              batchTotal = formatMoney(batchTotal<0 ? 0 : batchTotal)
              const selectedRowKeys = this.state.selectedRowKeys.filter( (item)=>{
                  return item!==this.state.currentOrder.soId
                } )
              this.setState({
                batchTotal,
                selectedRowKeys,
              })         
              window.infoBus.$emit('updataSelectedRowKeys', selectedRowKeys)
            } else if( result.data.rspCod.toString() === '999999' ) {
              message.warning( `${bMap['confirmfailure']}` );
              total = this.state.total;
            } else {
              message.warning( `${bMap['confirmError']}` );
              total = this.state.total;
            }
            this.setState({
              visible:false,
              total
            })
          }
        })
      }
    }
    handleCancel(){ // 取消确认收款
      this.setState({
        visible:false,
        batchVisible:false,
        newOrderVisible:false
      })
    }
    batchConfirm(){ // 打开批量确认收款对话框
      if( this.state.selectedRowKeys.length > 0 ){
        this.setState({
          batchVisible:true,
          currentOrder:this.state.selectedRowKeys
        })
      } else {
        message.warning( `${bMap['plzChooseOrder']}` );
      }
    }
    handleOkBatch(){
      this.setState({
        submitLoading:true
      })
      const params = `ids=${this.state.selectedRowKeys.join(',')}`;
      if(!window.shouldRelogin){
        services.confirmOrders(params) // 批量确认
        .then((result)=>{
          if( 'data' in result && 'rspCod' in result.data ){
            if(result.data.rspCod==="_SSO_ERR"){
              window.infoBus.$emit('relogin')
            } 
          }
          let batchTotal = 0;
          this.setState({
            submitLoading:false
          })
          if( result.data.rspCod.toString() === '000000' ){
            for( let item of  this.state.orderList){
              for( let soId of this.state.selectedRowKeys ){
                if( item.soId === soId ){
                  item.soStatus = bMap['state-1'];
                  item.operation = undefined
                }
              }
            }
            message.success( `${bMap['confirmSuccess']}` );
            window.infoBus.$emit('updataSelectedRowKeys',[])
            this.setState({
              selectedRowKeys:[]
            })
          } else if( result.data.rspCod.toString() === '999999' ) {
            message.warning( `${bMap['confirmfailure']}` );
            batchTotal = this.state.batchTotal;
          } else {
            message.warning( `${bMap['confirmError']}` );
            batchTotal = this.state.batchTotal;
          }
          this.setState({
            batchVisible:false,
            batchTotal
          })
        })
      }
    }
    onShowSizeChange(current, pageSize){
      this.getOrderList(current, pageSize)
      this.setState({
        pageSize
      })
    }
    newOrderSubmit(){
      this.setState({
        submitLoading:true,
      })
      //处理 sodDetails
      if('mainMeal' in orderParams){
        orderParams.mainMeal.sodAmount = Number((orderParams.mainMeal.sodPrice * orderParams.mainMeal.sodCount * 12).toFixed(2));        
      }
      if('subMeals' in orderParams && orderParams.subMeals instanceof Array){
        orderParams.subMeals = orderParams.subMeals.map((item)=>{
          item.sodAmount = Number((item.sodPrice*item.sodCount*12).toFixed(2));
          item.sodAvailCount = orderParams.sodAvailCount+item.sodCount * 12;
          return item;
        });
      }
      if('devices' in orderParams && orderParams.devices instanceof Array){
        orderParams.devices = orderParams.devices.map((item)=>{
          item.sodAmount = Number((item.sodPrice*item.sodCount*12).toFixed(2));
          return item
        })
      }
      let arr = [];
      if(orderParams.mainMeal&&orderParams.mainMeal.sodAmount !== 0){
        arr[0] = orderParams.mainMeal
      }
      let sodDetails = Array.prototype.concat.call(arr,orderParams.subMeals,orderParams.devices);
      orderParams.sodDetails = sodDetails
      // console.log(orderParams.extraAmount,) //验证
      // console.log(JSON.stringify(orderParams));
      delete orderParams.mainMealSodAmount;
      delete orderParams.extraAmount;
      delete orderParams.mainMeal;
      delete orderParams.subMeals;
      delete orderParams.devices;
      delete orderParams.sodAvailCount;
      console.log(JSON.stringify(orderParams));
      console.log(orderParams.soAmount);
      if(!window.shouldRelogin){
        services.putOrder({
          ...orderParams
        }).then((result)=>{
          console.log(result);
          // message
          if( 'data' in result && 'rspCod' in result.data ){
            const code = result.data.rspCod
            switch(code){
              case '_SSO_ERR':window.infoBus.$emit('relogin'); break;
              case '000000': message.success(bMap['newOrderSuccess']); break;
              default:
              // message.error(bMap['newOrderError']); 
              message.error(result.data.rspMsg);
              break;
            }
          }
          this.setState({
            submitLoading:false,
            newOrderVisible:false
          })
          this.getOrderList();
        })
      }

    }
    render(){
      const AddOrderModalProps = {
          style   : { display:'flex', alignItems:'center', justifyContent:'center'},
          title   : bMap['newOrder'],
          visible : this.state.newOrderVisible,
          onCancel: this.handleCancel.bind(this),
          footer  : [
                      <Button key="back" onClick={this.handleCancel.bind(this)}>{bMap['cancel']}</Button>,
                      <Button key="submit" type="primary" loading={this.state.submitLoading} onClick={this.newOrderSubmit.bind(this)}>
                        {bMap['ok']}
                      </Button>
                    ],
          destroyOnClose:true,
      }
      return (
        <div style={ styles['billingProcessorBox'] }>
        <SearchBar style={{ flex:.8 }} updataStatus={this.updataStatus.bind(this)} formatData={ this.formatData.bind(this) } />
        <div style={ { flex:7,overflowY:'scroll' } }>
          <FinancialForm 
          data={ this.state.orderList } 
          onSelectConfirmList={ this.onSelectConfirmList.bind(this) }
          allData={ this.state.orderList }
          selectedRowKeys = {this.state.selectedRowKeys}
          />
        </div>
        <div style={ { flex:.2, display:'flex', justifyContent:'center', alignItems:'center', paddingTop:'5px'} }>
          <div>{`${bMap['total']}`} <span style={ {fontWeight:600} }>{ this.state.totalPrices.toFixed(2) }</span> </div>
        </div>
        <div style={ { flex:1, display:'flex', justifyContent:'space-between', alignItems:'center' } }>
          <Button 
          style= { {marginLeft:'20px'} }  
          type="primary" 
          loading={ false }
          onClick={ this.batchConfirm.bind(this) }
          >
            {bMap['confirmText']}
          </Button>
          <Pagination
          style={ {marginRight:'20px'} }
          showQuickJumper={true}
          defaultCurrent={1}
          current={this.state.current}
          total={this.state.orderLength}
          pageSize={this.state.pageSize}
          onChange={this.getOrderList.bind(this)}
          // showSizeChanger 
          onShowSizeChange={ this.onShowSizeChange.bind(this) }
          pageSizeOptions={['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','30','40','50','60','70','80','90','100','99999']}
          />
        </div>
        <Modal 
        title={bMap['proceedsTitle']}
        visible={this.state.visible}
        onOk={this.handleOk.bind(this)}
        onCancel={this.handleCancel.bind(this)}
        style={ { textAlign:'center' } }
        footer={[
          <Button key="back" onClick={this.handleCancel.bind(this)}>{bMap['cancel']}</Button>,
          <Button key="submit" type="primary" loading={this.state.submitLoading} onClick={this.handleOk.bind(this)}>
            {bMap['ok']}
          </Button>,
        ]}
        >
          <div style={ {fontSize:'18px',marginBottom:'10px'} }>{ bMap['confirmComment'] }</div>
          <div style={ {fontSize:'14px'} }>{ `${bMap['orderTotal']}` } <span style={ {fontWeight:600,color:'blue'} }>{this.state.total}</span> </div>
        </Modal>
        <Modal 
        title={bMap['proceedsTitle-batch']}
        visible={this.state.batchVisible}
        onOk={this.handleOkBatch.bind(this)}
        onCancel={this.handleCancel.bind(this)}
        style={ { textAlign:'center' } }
        footer={[
          <Button key="back" onClick={this.handleCancel.bind(this)}>{bMap['cancel']}</Button>,
          <Button key="submit" type="primary" loading={this.state.submitLoading} onClick={this.handleOkBatch.bind(this)}>
            {bMap['ok']}
          </Button>,
        ]}
        >
          <div style={ {fontSize:'18px',marginBottom:'10px'} }>{ bMap['confirmComment'] }</div>
          <div style={ {fontSize:'14px'} }>{ `${bMap['subtotal']}` }<span style={ {fontWeight:600,color:'blue'} }>{this.state.batchTotal}</span> </div>
        </Modal>
        <AddOrderModal { ...AddOrderModalProps } />
        </div>
      )
    }
}

export default BillingProcessor