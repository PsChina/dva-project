import React from 'react';
import PropTypes from 'prop-types';
import { Select, Form, Input, Row, Col, Modal, message, Upload, Icon, Button  } from 'antd';
import { bizMap } from '../utils/i18n';
import PartnerFrom from './PartnerFrom';
import VendorFrom from './VendorFrom';
import * as services from '../services/component/AddOrderModal';
import PicturesWall from './PicturesWall';
const { Option } = Select;
const FormItem = Form.Item;
const { TextArea } = Input; 

/* "customerType":"客户类型",
"customerName":"客户名称",
"paymentContent":"缴费内容",
 "subt":"小计:"
"hardwareSupportKit":"配选硬件",
 "subt":"小计:"
    "total":"合计金额:",
"paymentType":"缴费方式",
"bank":"所属银行",
"transferInfo":"转账信息"
    "subt":"小计:"
"add":"增加",
"unit":"套"
*/

const bMap = bizMap('component/AddOrderModal');
class OnlinePayItem extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      bankList: []
    }
  }
  render(){
    // return (
    //   `${bMap['paymentType-0']}`
    // )
    return '';
  }
}
class OfflinePayItem extends React.Component {
  constructor(props){
    super(props)
    // 这里要获取银行列表信息。
    if(!window.shouldRelogin){
      services.getBankList({
        currentPage:1,
        pageSize:9999
      })
      .then((result)=>{
        console.log(result);
        if( result.data && 'rspCod' in result.data ){
          const code = result.data.rspCod;
          if(code==="_SSO_ERR"){
            window.infoBus.$emit('relogin')
          } else {
            this.setState({
              bankList:result.data.rspList
            })      
          }
        }
      })
    }

  }
  render(){
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 14 },
    };
    return (
      <Row>
        <Col>
          <FormItem {...formItemLayout} label = { bMap['bank'] } >
            <Select 
              getPopupContainer={() => document.getElementsByClassName('modal')[0]}
              style={ { width: '260px' } }
              onChange={ (value)=>{
                window.infoBus.$emit('soBank', value);
              } }
            >
              {
                this.state ? this.state.bankList.map( (item, index)=>
                <Option 
                  key={item.bankNo} 
                  value={item.bankCode}
                > 
                  { item.bankName }
                </Option>)
                : []
              }
            </Select>
          </FormItem>
        </Col>
        <Col>
          <FormItem {...formItemLayout} label = { bMap['transferInfo'] } >
            <Input 
              style={ { width:'260px' } } placeholder={ bMap['plsTransferInfo'] } 
              onChange={(event)=>{
                window.infoBus.$emit('soBankDesc',event.target.value);
              }}
            />
          </FormItem>
        </Col>
      </Row>
    )
  }
}

class PayType extends React.Component{
    constructor(props){
      super(props);
      this.state={
        paymentType:"paymentType-0",
      }
    }
    componentWillMount(){
      window.infoBus.$on('paymentType',this.updataPayType.bind(this))
    }
    componentWillUnmount(){
      window.infoBus.$off('paymentType',this.updataPayType.bind(this));
    }
    updataPayType(paymentType){
      this.setState({
        paymentType
      })
    }
    render(){
      let jsx = '';
      if ( this.state.paymentType === "paymentType-0" ) {
        jsx = <OnlinePayItem/>
      } else if ( this.state.paymentType === "paymentType-1" ) {
        jsx = <OfflinePayItem/>
      }
      return jsx;      
    }
}

class AddOrderModal extends React.Component{
    constructor(props){
      super(props)
      this.state = {
        insideFromType:null,
      }
    }
    render(){
      const customerTypes = [ 
        <Option key={1} value="customerType-0"> { bMap['customerType-0'] } </Option>,
        <Option key={2} value="customerType-1"> { bMap['customerType-1'] } </Option> 
      ];

      const paymentTypes = [
        <Option key={1} value="paymentType-0"> { bMap['paymentType-0'] } </Option>,
        <Option key={2} value="paymentType-1"> { bMap['paymentType-1'] } </Option>,
      ]

      const { form, data } = this.props;
      const { getFieldDecorator } = form;
      const formItemLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 14 },
      };
      const CustomerTypeSelectProps = {
        style:{
          width:'260px'
        },
        onChange:(insideFromType) => {
          window.infoBus.$emit('customerType',insideFromType);
          this.setState({
            insideFromType
          })
        }
      }
      const PaymentTypeSelectProps = {
        style:{
          width:'260px'
        },
        onChange:(paymentType)=>{
          console.log( paymentType )
          window.infoBus.$emit('paymentType',paymentType);
        }  
      }
  
      const SubFrom = ()=>{
        let jsx = '';
        if ( this.state.insideFromType === "customerType-0") {
          jsx = <PartnerFrom/>
        } else if ( this.state.insideFromType === "customerType-1") {
          jsx = <VendorFrom/>
        }
        return jsx
      }
      return (
        <Modal { ...this.props } className="modal">
          <Row style={ {width:'600px'} }>
            <Col>
                <FormItem {...formItemLayout} label = { bMap['customerType'] } >
                  <Select 
                    getPopupContainer={() => document.getElementsByClassName('modal')[0]}
                    { ...CustomerTypeSelectProps }
                  >
                    { customerTypes }
                  </Select>
                </FormItem>
            </Col>
            <Col>
              <SubFrom/>
            </Col>
            <Col>
                <FormItem {...formItemLayout} label = { bMap['paymentType'] } >
                  <Select 
                    getPopupContainer={() => document.getElementsByClassName('modal')[0]}
                    { ...PaymentTypeSelectProps } 
                  >
                    { paymentTypes }
                  </Select>
                </FormItem>
            </Col>
            <PayType/>
            <Col>
                <FormItem {...formItemLayout} label={ bMap['accountStatement'] }>
                    <PicturesWall/>
                </FormItem>
            </Col>
            <Col>
              <FormItem {...formItemLayout} label={bMap['remark']}>
                <TextArea
                  style={{width:'260px'}}
                  onChange={(event)=>{
                    window.infoBus.$emit('soDesc',event.target.value);
                  }} 
                />
              </FormItem>
            </Col>
          </Row>
        </Modal>
      )
    }
}

AddOrderModal.propTypes = {
  data: PropTypes.object,
  form: PropTypes.object,
};

AddOrderModal.defaultProps = {
  data: {},
  form: {},
};

export default AddOrderModal;