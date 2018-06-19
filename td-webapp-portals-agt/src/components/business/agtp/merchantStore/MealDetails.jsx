import React, { PropTypes } from 'react';
import { Form, Icon, Input, Button, Row, Col, Select } from 'antd';
import * as i18n from '../../../../utils/i18n';
const FormItem = Form.Item;
const { Option } = Select;
const bMap = i18n.bizMap('agtp/merchantStoreBindStore');
/**
    mainInf:{},
    extraInfs:[],
    soId:'',
    braId:''
 * 
*/
class MealDetails extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            bindId:this.props.bindId,
            payTermModNo:"",
            payTermNo:"",
            posTermModNo:"",
            posTermNo:""
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            bindId:nextProps.bindId,
        })
    }
    updata(val){
        if(this.props.type){ // 附套餐
            this.props.setExtraInfs(val,this.props.index);
        }else{ // 主套餐
            val = Object.assign({},this.props,val)
            this.props.dispatch({
                type: 'merchantStoreManage/updateState',
                payload: { mainInf:val},
            })
        }
    }
    render(){
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        };

        const payForHardware = [];
        const smartPOS = [];

        let termTypeArr = ['99','99'];
        if( typeof this.props['termType'] === 'string' ){
            termTypeArr = this.props.termType.split(':')
        }
        if(termTypeArr[0] !== '99'){
            payForHardware.push(
                <Col xs={24}>
                    <FormItem label={bMap.POSHardware} {...formItemLayout}>
                        <Select
                            style={{
                                width:300,
                            }}
                            getPopupContainer={()=>document.getElementById('bindStore')}
                            onChange={(payTermModNo)=>{
                                this.setState({
                                    payTermModNo,
                                })
                                const {bindId, posTermModNo, posTermNo, payTermNo } = this.state;
                                const val = { 
                                    bindId,
                                    payTermModNo,
                                    payTermNo,
                                    posTermModNo,
                                    posTermNo,
                                }
                                this.updata(val);
                            }}
                        >
                            { this.props['__cajasList'] ? this.props.__cajasList.map((item, index)=>{
                                return <Option value={item.terModId} key={item.terModId}>{`${item.copNam}/${item.terModNo}`}</Option>
                            }) :[] }
                        </Select>
                    </FormItem>
                    <FormItem label={bMap.fuselageCoding} {...formItemLayout}>
                        <Input 
                            style={{
                                width:300,
                            }}
                            onChange={(event)=>{
                                const payTermNo = event.target.value
                                this.setState({
                                    payTermNo,
                                })
                                const {bindId, payTermModNo, posTermModNo, posTermNo } = this.state;
                                const val = { 
                                    bindId,
                                    payTermModNo,
                                    payTermNo,
                                    posTermModNo,
                                    posTermNo,
                                }
                                this.updata(val);
                            }}
                        />
                    </FormItem> 
                </Col>
            )
        }
        if(termTypeArr[1] !== '99' ){
            smartPOS.push(
                <Col xs={24}>
                    <FormItem label={bMap.payHardware} {...formItemLayout}>
                        <Select
                            style={{
                                width:300,
                            }}
                            getPopupContainer={()=>document.getElementById('bindStore')}
                            onChange={(posTermModNo)=>{
                                this.setState({
                                    posTermModNo,
                                })
                                const {bindId, payTermModNo, posTermNo, payTermNo } = this.state;
                                const val = { 
                                    bindId,
                                    payTermModNo,
                                    payTermNo,
                                    posTermModNo,
                                    posTermNo,
                                }
                                this.updata(val);
                            }}
                        >
                            { this.props['__smartPOSList'] ? this.props.__smartPOSList.map((item, index)=>{
                                // console.log(item);
                                return <Option value={item.terModId} key={item.terModId}>{`${item.copNam}/${item.terModNo}`}</Option>
                            }) :[] }
                        </Select>
                    </FormItem>
                    <FormItem label={bMap.fuselageCoding} {...formItemLayout}>
                        <Input
                            style={{
                                width:300,
                            }}
                            onChange={(event)=>{
                                const posTermNo = event.target.value
                                this.setState({
                                    posTermNo,
                                })
                                const {bindId, payTermModNo, posTermModNo, payTermNo } = this.state;
                                const val = { 
                                    bindId,
                                    payTermModNo,
                                    payTermNo,
                                    posTermModNo,
                                    posTermNo
                                }
                                this.updata(val);
                            }}
                        />
                    </FormItem>
                </Col>
            )
        }

        return (
            <Row>
                <Col xs={24}>
                    <FormItem label={this.props.type ? bMap.extensionMeal : bMap.mainMeal} {...formItemLayout}>
                        <span>{this.props.pakName}</span>
                    </FormItem>
                </Col>
                {
                    payForHardware
                }
                {
                    smartPOS
                }
            </Row>
        )        
    }
}
MealDetails.propTypes={
    type:PropTypes.bool,
    pakName:PropTypes.string,
    POSList:PropTypes.array,
    cajasList:PropTypes.array,
    getPopupContainer:PropTypes.func
}
MealDetails.defaultProps={
    type:false,
    pakName:'',
    POSList:[],
    cajasList:[],
    getPopupContainer:()=>{},
}
export default MealDetails;

/** 废弃代码
                <Col xs={24}>
                    <FormItem label={bMap.payHardware} {...formItemLayout}>
                        <Select
                            style={{
                                width:300,
                            }}
                            getPopupContainer={()=>document.getElementById('bindStore')}
                            onChange={(payTermModNo)=>{
                                this.setState({
                                    payTermModNo,
                                })
                                const {bindId, posTermModNo, posTermNo, payTermNo } = this.state;
                                const val = { 
                                    bindId,
                                    payTermModNo,
                                    payTermNo,
                                    posTermModNo,
                                    posTermNo,
                                }
                                this.updata(val);
                            }}
                        >
                            { this.props.cajasList ? this.props.cajasList.map((item, index)=>{
                                return <Option value={item.terModId} key={item.terModId}>{item.copNam}</Option>
                            }) :[] }
                        </Select>
                    </FormItem>
                </Col>
                <Col xs={24}>
                    <FormItem label={bMap.fuselageCoding} {...formItemLayout}>
                        <Input 
                            style={{
                                width:300,
                            }}
                            onChange={(event)=>{
                                const payTermNo = event.target.value
                                this.setState({
                                    payTermNo,
                                })
                                const {bindId, payTermModNo, posTermModNo, posTermNo } = this.state;
                                const val = { 
                                    bindId,
                                    payTermModNo,
                                    payTermNo,
                                    posTermModNo,
                                    posTermNo,
                                 }
                                this.updata(val);
                            }}
                        />
                    </FormItem>
                </Col>
                <Col xs={24}>
                    <FormItem label={bMap.POSHardware} {...formItemLayout}>
                        <Select
                            style={{
                                width:300,
                            }}
                            getPopupContainer={()=>document.getElementById('bindStore')}
                            onChange={(posTermModNo)=>{
                                this.setState({
                                    posTermModNo,
                                })
                                const {bindId, payTermModNo, posTermNo, payTermNo } = this.state;
                                const val = { 
                                    bindId,
                                    payTermModNo,
                                    payTermNo,
                                    posTermModNo,
                                    posTermNo,
                                }
                                this.updata(val);
                            }}
                        >
                            { this.props.POSList ? this.props.POSList.map((item, index)=>{
                                // console.log(item);
                                return <Option value={item.terModId} key={item.terModId}>{item.copNam}</Option>
                            }) :[] }
                        </Select>
                    </FormItem>
                </Col>
                <Col xs={24}>
                    <FormItem label={bMap.fuselageCoding} {...formItemLayout}>
                        <Input
                            style={{
                                width:300,
                            }}
                            onChange={(event)=>{
                                const posTermNo = event.target.value
                                this.setState({
                                    posTermNo,
                                })
                                const {bindId, payTermModNo, posTermModNo, payTermNo } = this.state;
                                const val = { 
                                    bindId,
                                    payTermModNo,
                                    payTermNo,
                                    posTermModNo,
                                    posTermNo
                                }
                                this.updata(val);
                            }}
                        />
                    </FormItem>
                </Col>
*/