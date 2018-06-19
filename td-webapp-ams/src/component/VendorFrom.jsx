import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import { Select, Form, Input, Row, Col, message } from 'antd';
import { bizMap } from '../utils/i18n';
import * as services from '../services/component/VendorFrom';
import ExtraMealList from './ExtraMealList';
const Option = Select.Option;
const FormItem = Form.Item;
const bMap = bizMap('component/VendorFrom');

/**
{merName:1,currentPage:1} getMerchantList 获取商户列表
 * 
*/
// let obj={ 
// "pakId": "PA371856204366479360", 
// "pakName": "套餐3", "pakStatus": 0, 
// "pakEnabled": 0, 
// "pakLogoUrl": "371856155272151040", 
// "pakPriceMon": 234, 
// "pakPriceDisMon": 21, 
// "pakClass": "C", 
// "pakCreateTime": 1527492402000, 
// "pakAvailStartTime": 1527492402000, 
// "pakAvailEndTime": null, 
// "pakMinMon": 12, 
// "pakIndustryName": "零售业", 
// "pakTermPosId": 
// "MOD358728871199244288", 
// "pakTermPayId": null, 
// "pakNewPropId": 
// "PP371186855141572608", 
// "pakRenewPropId": null 
// }

/*
// *  "sodPrice"://套餐单价
// *  "sodCount"://数量
// *  "sodAvailCount"://可用数
// *  "sodAmount"://价格
// *  "goodsId"://套餐id
// *  "sodType": 1 主套餐 2付套餐 3设备
*/
/**
 * 
附加套餐json
{
    "paeId":"PE372147781958500352",
    "paeName":"附加",
    "paePriceMon":35.32,
    "paePriceDisMon":24.32,
    "paeClass":"A",
    "paeDesc":null,
    "paeMinMon":12,
    "paeCreateTime":1527561920000,
    "paeTermModId":"00000000000000000"
}
 * 
*/
class VendorFrom extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            mainMealList:[],
            extraMealList:[],
            customerName: undefined,
            storesList:[],
            sodAmount:0,
            sodCount:1,
            mainMeal:{},
            extraAmount:0,
            merchantList:[],
            presented:0,
            originPresented:0,
            customerNameDom:{appendChild:()=>{}}
        }
        // relogin
        if(!window.shouldRelogin){
            services.getPackageList()
            .then( (result)=>{
            if( 'data' in result && 'rspCod' in result.data ){
                if(result.data.rspCod==="_SSO_ERR"){
                window.infoBus.$emit('relogin')
                } 
            }
            if( 'data' in result ) {
                if( 'rspCod' in result.data ) {
                if( result.data.rspCod === '000000'){
                    if( 'rspList' in result.data ) {
                        this.setState({
                        mainMealList:result.data.rspList
                        })
                    }
                } else {
                    message.error(bMap['qListError'])
                }
                }
            }
            } )
            services.getExtraPackageList()
            .then((result)=>{
                if( 'data' in result && 'rspCod' in result.data ){
                    if(result.data.rspCod==="_SSO_ERR"){
                    window.infoBus.$emit('relogin')
                    } 
                }
                if( 'data' in result ) {
                if( 'rspCod' in result.data ) {
                    if( result.data.rspCod === '000000'){
                        if( 'rspList' in result.data && result.data.rspList instanceof Array ) {
                            this.setState({
                                extraMealList:result.data.rspList
                            })
                        }
                    } else {
                        message.error(bMap['qExtraError'])
                    }
                }
                }
            })
        }
    }
    updataExtraAmount(extraAmount){
        this.setState({
            extraAmount
        })
    }
    componentWillMount(){
        window.infoBus.$on('extraAmount',this.updataExtraAmount.bind(this));
    }
    componentWillUnmount(){
        window.infoBus.$off('extraAmount',this.updataExtraAmount.bind(this));
    }
    getCustomerNameDom(customerNameDom){
       const dom = ReactDom.findDOMNode(customerNameDom)
       if(dom instanceof HTMLDivElement){
        dom.style.position = 'reletive';
        const list = dom.querySelector('#customerNameListBox');
        if(list===null){
            const customerNameListBox = document.createElement('div');
            customerNameListBox.id = 'customerNameListBox';
            customerNameListBox.style.position = 'absolute';
            customerNameListBox.style.left = '200px';
            customerNameListBox.style.top = '40px';
            customerNameListBox.style.zIndex = '10';
            customerNameListBox.style.border = 'solid #ccc 1px';
            customerNameListBox.style.overflow = 'hidden';
            customerNameListBox.style.borderRadius = '5px';
            customerNameListBox.style.background = 'white';
            customerNameListBox.style.width = '260px';
            customerNameListBox.style.display = 'none';
            customerNameListBox.onmouseleave = ()=>{
                customerNameListBox.style.display = 'none';
            }
            dom.appendChild(customerNameListBox);
        }
        this.__colDom = dom;           
       }
    }
    render(){
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 14 },
        };
        return (
            <Form id="VendorFrom">
                <Row>
                    <Col ref={this.getCustomerNameDom.bind(this)} >
                        <FormItem {...formItemLayout} label = { bMap['customerName'] } >
                        <Input 
                            style={ { width:'260px' } } 
                            placeholder={ bMap['searchStore'] } 
                            onChange={(event)=>{
                                window.infoBus.$emit('customerName',event.target.value);
                                const __input = event.target;
                                this.setState({
                                    customerName:event.target.value
                                })
                                if(!window.shouldRelogin){ //&&event.target.value
                                    services.getMerchantList({
                                        merName:event.target.value,
                                        currentPage:1,
                                        pageSize:10
                                    }).then((result)=>{
                                        if(result.data){
                                            if('rspCod' in result.data && result.data.rspCod){
                                                const cod = result.data.rspCod;
                                                switch(cod){
                                                    case '_SSO_ERR':
                                                        window.infoBus.$emit('relogin');
                                                    break;
                                                    case '200':
                                                        if('rspList' in result.data && result.data.rspList){
                                                            const resultList = result.data.rspList;
                                                            this.setState({
                                                                merchantList:resultList instanceof Array ? resultList : [],
                                                            })

                                                            if( this.__colDom instanceof HTMLDivElement ){
                                                                const listBox = this.__colDom.querySelector('#customerNameListBox');
                                                                listBox.innerHTML = '';
                                                                for( let obj of resultList ){
                                                                    // console.log(obj,obj.merName,obj.merId);  
                                                                    const div = document.createElement('div');
                                                                    div.innerText = obj.merName;
                                                                    div.value = obj.merId;
                                                                    div.style.cursor = 'pointer';
                                                                    div.style.padding = '2px 5px';
                                                                    div.onmouseenter = ()=>{
                                                                        div.style.background = '#e6f7ff';
                                                                    }
                                                                    div.onmouseleave = ()=>{
                                                                        div.style.background = 'white';
                                                                    }
                                                                    div.onclick = (event)=>{
                                                                        if(event.preventDefault){
                                                                            event.preventDefault();
                                                                        }
                                                                        if(event.stopPropagation){
                                                                            event.stopPropagation();
                                                                        }
                                                                        listBox.style.display = 'none';
                                                                        const merId = event.target.value;
                                                                        __input.value = event.target.innerText;
                                                                        window.infoBus.$emit('customerName',event.target.innerText);
                                                                        if(!window.shouldRelogin){
                                                                            services.getStoresList({
                                                                                merId,
                                                                                currentPage:1, // 分页bug
                                                                                pageSize:999
                                                                            }).then((result)=>{
                                                                                if( 'data' in result && 'rspCod' in result.data ){
                                                                                    const code = result.data.rspCod;
                                                                                    if(code==="_SSO_ERR"){
                                                                                    window.infoBus.$emit('relogin')
                                                                                    } else if(code === '200'){
                                                                                        this.setState({
                                                                                            storesList:result.data.rspList
                                                                                        });
                                                                                    }
                                                                                }
                                                                            })
                                                                        }
                                                                    }
                                                                    listBox.appendChild(div);
                                                                    
                                                                }   
                                                                listBox.style.display = 'block';
                                                            } else {

                                                            }
                                                       
                                                        } else {
                                                            if( this.__colDom instanceof HTMLDivElement ){
                                                                const listBox = this.__colDom.querySelector('#customerNameListBox');
                                                                listBox.style.display = 'none';
                                                            }
                                                        }

                                                    break;
                                                    default :break;
                                                }
                                            }
                                        }
                                    })
                                }
                            }}
                        />
                        </FormItem>
                    </Col>
                    <Col>
                        <FormItem {...formItemLayout} label={bMap['storesName']}>
                            <Select 
                                getPopupContainer={() => document.getElementById('VendorFrom')}
                                style={{width:'260px'}} 
                                onChange={ (item)=>{
                                    const data = JSON.parse(item);
                                    const { braId, merName, braName } = data;
                                    window.infoBus.$emit('braId',braId);
                                    window.infoBus.$emit('braName',braName);
                                    window.infoBus.$emit('customerName',merName);
                                } }
                            >
                                {this.state.storesList ? this.state.storesList.map( (item)=><Option key={item.braId} value={JSON.stringify(item)} >{item.braName}</Option>):[]}
                            </Select>
                        </FormItem>
                    </Col>
                    <Col>
                        <FormItem {...formItemLayout} label={bMap['mainMeal']}>
                            <Select 
                                getPopupContainer={() => document.getElementById('VendorFrom')}
                                style={ {width:'180px'} } 
                                onChange={ (value)=>{ 
                                    const mainMeal = JSON.parse(value);
                                    if(mainMeal['pakNewPromotion']){
                                        let { papProMon, papProDisMon } = mainMeal.pakNewPromotion;
                                        let presented = 0 ;
                                        const originPresented = papProDisMon;
                                        // if( this.state.sodCount*12 ){
                                        //     presented = papProDisMon;
                                        // }else{
                                        //     presented = 0;
                                        // }
                                        switch(this.state.sodCount.toString()){
                                            case '0':
                                            case '1':
                                                presented = 0;
                                                break;
                                            case '2':
                                                presented = 2;
                                                break;
                                            case '3':
                                                presented = 4;
                                                break;
                                            default :
                                                presented = 4;
                                                break;
                                        }
                                        window.infoBus.$emit('sodAvailCount',presented);
                                        this.setState({
                                            presented,
                                            papProMon,
                                            originPresented
                                        })
                                    }
                                    const sodAmount = Number( (mainMeal.pakPriceDisMon * this.state.sodCount * 12).toFixed(2))

                                    this.setState({
                                        mainMeal,
                                        sodAmount
                                    })
                                    window.infoBus.$emit('mealPak',mainMeal);
                                    console.log('mainMealSodAmount',sodAmount);
                                    window.infoBus.$emit('mainMealSodAmount',sodAmount);
                                } }
                            >
                                { this.state.mainMealList ? this.state.mainMealList.map( (item, index)=>{
                                    return <Option key={index} value={ JSON.stringify(item) }> { item['pakName'] } </Option>
                                } ) : [] }
                            </Select>
                            <Input 
                            defaultValue={1} 
                            style={ { width:'80px' } }
                            onChange={(event)=>{
                                const sodCount = event.target.value;
                                const sodAmount =  Number( (sodCount * this.state.mainMeal.pakPriceDisMon * 12).toFixed(2) );
                                this.setState({
                                    sodCount,
                                    sodAmount,
                                })
                                window.infoBus.$emit('sodCount',sodCount?sodCount:0);
                                window.infoBus.$emit('mainMealSodAmount',sodAmount);
                                const { papProMon, presented } = this.state;
                                if(papProMon){
                                    let presented = 0;
                                    // if( sodCount*12 >= papProMon ){
                                    //     presented = this.state.originPresented;
                                    // }
                                    switch(sodCount.toString()){
                                        case '0':
                                        case '1':
                                            presented = 0;
                                            break;
                                        case '2':
                                            presented = 2;
                                            break;
                                        case '3':
                                            presented = 4;
                                            break;
                                        default :
                                            presented = 4;
                                            break;
                                    }
                                    window.infoBus.$emit('sodAvailCount',presented);
                                    this.setState({
                                        presented,
                                    })
                                }
                            }}
                            />
                            <span style={ { width:'60px',marginLeft:'10px' } }>{ bMap['unit'] }</span>
                        </FormItem>
                    </Col>
                    <Col>
                        <FormItem {...formItemLayout} label={bMap['sodAmount']}>
                        <div 
                            style={{
                                display:'flex',
                                }}
                            
                        >
                            <span
                                style={{
                                    flex:1,
                                    }}
                            >
                            {this.state.sodAmount}
                            </span>
                            <span
                                style={{
                                    flex:1,
                                    }}
                            >
                            { bMap.presented.replace('[d]',this.state.presented) }
                            </span>
                        </div>
                        </FormItem>
                    </Col>
                    <ExtraMealList list={this.state.extraMealList} sodCount={this.state.sodCount}/>
                    <Col>
                        <FormItem {...formItemLayout} label={ bMap['extraAmount'] }>
                            {this.state.extraAmount}
                        </FormItem>
                    </Col>
                    <Col>
                        <FormItem {...formItemLayout} label={ bMap['total'] }>
                            { (this.state.extraAmount+this.state.sodAmount).toFixed(2) }
                        </FormItem>
                    </Col>         
                </Row>
            </Form>
        )    
    }
}

export default VendorFrom;


/**
 * 废弃代码
 * 
                         <Button
                            onClick={()=>{
                                if(!window.shouldRelogin){
                                    services.getMerchantList({
                                        merName:this.state.customerName,
                                        currentPage:1,
                                        pageSize:999
                                    }).then((result)=>{
                                        if(result.data){
                                            if('rspCod' in result.data && result.data.rspCod){
                                                const cod = result.data.rspCod;
                                                switch(cod){
                                                    case '_SSO_ERR':
                                                        window.infoBus.$emit('relogin');
                                                    break;
                                                    case '200':
                                                        if('rspList' in result.data && result.data.rspList){
                                                            console.log( result.data.rspList );
                                                            this.setState({
                                                                merchantList:result.data.rspList,
                                                            })
                                                        }
                                                    break;
                                                    default :break;
                                                }
                                            }
                                        }
                                    })
                                }
                            }}
                        >{bMap['search']}</Button> 
                    <Col>
                        <FormItem {...formItemLayout} label = { bMap['customerName'] }  >  
                            <Select
                                 getPopupContainer={() => document.getElementById('VendorFrom')}
                                 style={{width:'260px'}} 
                                 onChange={(merId)=>{
                                    if(!window.shouldRelogin){
                                        services.getStoresList({
                                            merId,
                                            currentPage:1, // 分页bug
                                            pageSize:999
                                        }).then((result)=>{
                                            if( 'data' in result && 'rspCod' in result.data ){
                                                const code = result.data.rspCod;
                                                if(code==="_SSO_ERR"){
                                                window.infoBus.$emit('relogin')
                                                } else if(code === '200'){
                                                    this.setState({
                                                        storesList:result.data.rspList
                                                    });
                                                }
                                            }
                                        })
                                    }
                                 }}
                            >
                                {
                                    this.state.merchantList.map((item)=><Option value={item.merId} key={item.merId}>{ item.merName }</Option>)
                                }
                            </Select>
                        </FormItem>
                    </Col>
 * 
*/