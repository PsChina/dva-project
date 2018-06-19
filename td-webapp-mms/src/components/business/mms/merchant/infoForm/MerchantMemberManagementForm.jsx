import React, { PropTypes } from 'react';
import * as services from '../../../../../services/mms/merchantMemberManagementForm';
import { Form, Icon, Input, Button, Row, Col, Select } from 'antd';
import * as i18n from '../../../../../utils/i18n';
import ShowMeal from './MerChantMemberShowMeal';
const bizMap = i18n.bizMap('mms/merchantMemberManagementForm');
const FormItem = Form.Item;
const Option = Select.Option;
/**
 * 
    "storeName":"门店名称",
    "status":"状态",
    "mainMeal":"主套餐",
    "subMeal":"附套餐",
    "confirmation":"确认开通"
 * 
*/
//storeList
class MerchantMemberManagementForm extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      storesList:[],
      mainInf:{
        pakName:'',
        pakYear:''
      },
      extraInfs:[{
        pakName:'',
        pakYear:''
      }],
      braStatus:0,
      selectStore:{}
    }
    this.getStoreList(props.data.merId?props.data.merId:'');
  }
  componentWillReceiveProps(nextProps) {

    const merId = nextProps.data.merId
    if(merId){
      this.getStoreList(merId)
    }
    this.setState({
      storeName:'',
    })
  }
  getStoreList(merId){
    services.getStoresList({
      merId,
    }).then( (result)=>{
      if('rspCod' in result.data){
        const code = result.data.rspCod;  
        switch(code){
          case '200': this.setState({storesList:result.data.rspList?result.data.rspList:[]}); break;
          default : break;
        }
      }
    })
  }
  render() {
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 14 },
    };
    const { getFieldDecorator, resetFields } = this.props.form;
    return (
      <Form>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.storeName} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('storeName', {
                  initialValue: '',
                  rules: [],
                })(
                  // <Input placeholder={bizMap.storeName} />,
                  <Select
                    onChange={(braId)=>{
                      let [item] = this.state.storesList.filter((item,index)=>{
                        return item.braId === braId;
                      })
                      this.setState({
                        selectStore:item
                      })
                      services.getMealData({
                        braId,
                      })
                      .then((result)=>{
                        if('rspCod' in result.data){
                          const code = result.data.rspCod;  
                          switch(code){
                            case '000000': {
                              if('rspData' in result.data && result.data.rspData){
                                this.setState({
                                  extraInfs:result.data.rspData.extraInfs?result.data.rspData.extraInfs:[],
                                  mainInf:result.data.rspData.mainInf?result.data.rspData.mainInf:{},
                                  soId:result.data.rspData.soId,
                                }); 
                                this.props.setSoId(result.data.rspData.soId)
                              }
                              break;
                            }
                            default : break;
                          }
                        }
                      })
                    }}
                  >
                    {
                      this.state.storesList.map(( item )=><Option key={item.braId} value={item.braId}>{item.braShortName}</Option>)
                    }
                  </Select>
                )
              }
            </FormItem>
          </Col>
          <Col span={22}>
            <FormItem label={bizMap.status} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('status', {
                  initialValue: '',
                  rules: [],
                })(
                  <span>{this.state.selectStore.statusDesc}</span>,
                )
              }
            </FormItem>
          </Col>
          <ShowMeal mainInf={this.state.mainInf} extraInfs={this.state.extraInfs} />
        </Row>
      </Form>
    )
  }
}
MerchantMemberManagementForm.propTypes={
  form:PropTypes.object
}
MerchantMemberManagementForm.defaultProps={
  Form:{
    getFieldDecorator:()=>{},
  }
}
export default Form.create()(MerchantMemberManagementForm);
