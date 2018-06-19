import React, { PropTypes } from 'react';
import { Form, Icon, Input, Button, Row, Col, Select } from 'antd';
import * as i18n from '../../../../utils/i18n';
import MealDetails from './MealDetails';
const FormItem = Form.Item;
// const { Option } = Select;
const bMap = i18n.bizMap('agtp/merchantStoreBindStore');
let extraInfs = [];
class MerchantStoreBindStore extends React.Component{
    constructor(props){
        super(props)
        this.state={
            setExtraInfs(item,index){
                extraInfs[index] = Object.assign({},extraInfs[index],item)
                props.dispatch({
                    type: 'merchantStoreManage/updateState',
                    payload: { extraInfs },
                })
            }
        } 
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps){
            extraInfs = nextProps.extraInfs
            this.setState({
                extraInfs
            })            
        }
    }
    render(){
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        };
        const {getPopupContainer} = this.props.form;
        const {POSList,cajasList,dispatch,mainInf} = this.props
        const MealDetailsProps = {
            ...mainInf, // 主套餐信息
            POSList,
            cajasList,
            getPopupContainer,
            dispatch
        }
        return (
            <Form id="bindStore">
                <Row>
                    <Col xs={24}>
                        <FormItem label={bMap.merchantName} {...formItemLayout}>
                            <span>{this.props.merName}</span>
                        </FormItem>
                    </Col>
                    <Col xs={24}>
                        <FormItem label={bMap.storeName} {...formItemLayout}>
                            <span>{this.props.braName}</span>
                        </FormItem>
                    </Col>
                    <MealDetails {...MealDetailsProps}/>
                    {this.props.extraInfs.map((item,index)=>{
                        const { POSList,cajasList,mainInf } = this.props
                        const { setExtraInfs } = this.state;
                        const subMealDetailsProps = {
                            ...item, // 单个附套餐信息
                            POSList,
                            cajasList,
                            getPopupContainer,
                            setExtraInfs
                        }
                        return <MealDetails key={index+1} type={true} index={index} {...subMealDetailsProps}/>
                    })}
                </Row>
            </Form>
        )
    }
}
MerchantStoreBindStore.propTypes={
    extraInfs:PropTypes.array,
    mainInf:PropTypes.object,
    soId:PropTypes.string,
    braName:PropTypes.string,
    merName:PropTypes.string,
    POSList:PropTypes.array,
    cajasList:PropTypes.array,
    form:PropTypes.object,
}
MerchantStoreBindStore.defaultProps={
    extraInfs:[],
    mainInf:{},
    soId:'',
    braName:'',
    merName:'',
    POSList:[],
    cajasList:[],
    form:{}
}

export default Form.create()(MerchantStoreBindStore);