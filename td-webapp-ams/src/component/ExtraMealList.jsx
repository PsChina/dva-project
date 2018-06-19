import React from 'react';
import { Select, Form, Input, Col, Button } from 'antd';
import { bizMap } from '../utils/i18n';
import PropTypes from 'prop-types';

const Option = Select.Option;
const FormItem = Form.Item;
const bMap = bizMap('component/VendorFrom');
// 计算总价 通讯
class ExtraMealList extends React.Component{
    constructor(props){
        super(props);
        const originData={
            sodPrice:0,
            sodCount:1,
            sodAvailCount:1,
            sodAmount:undefined,
            goodsId:undefined,
            sodType: 2,
        }
        this.state={
            originData:Object.assign({},originData),
            ExtraMealList:[Object.assign({},originData)],
            maxCountArr:[],
            list:[]
        }
    }
    componentWillReceiveProps(nextProps){
        const { sodCount } = nextProps;
        let maxCountArr = [];
        for(let i = 1; i<= sodCount; i++){
            maxCountArr.push(i);
        }
        this.setState({
            maxCountArr,
        });
        if(nextProps['list']&&nextProps['list'].length){
            let list = nextProps.list.concat();
            list.unshift(null)
            this.setState({
                list,
            });
        }
    }
    render(){
        const ExtraMeal = (props)=>{
            const formItemLayout = {
                labelCol: { span: 8 },
                wrapperCol: { span: 16 },
            }
            const goodsId = this.state.ExtraMealList[props.index].goodsId;
            let defaultValue = '------';
            for(let item of this.props.list){
                if(item && item['paeId']===goodsId){
                    defaultValue = JSON.stringify(item);
                }
            }
            const computePrice = (extraMealList)=>{
                let sodAmount = 0;
                for( let item of extraMealList){
                    sodAmount += item.sodPrice * item.sodCount * 12;
                }
                const result = Number(sodAmount.toFixed(2));
                return isNaN(result)?'':result;
            }
            return (
                    <Col>
                        <FormItem 
                        {...formItemLayout} label={ bMap['subjoinMeal'] }>
                            <Select 
                                style={ {width:'160px'} } 
                                defaultValue={defaultValue}
                                getPopupContainer={() => document.getElementById('VendorFrom')}
                                onChange= { (value)=>{
                                    if(value !== '------'){
                                        const data = JSON.parse(value);
                                        const goodsId = data.paeId;
                                        const sodPrice = data.paePriceDisMon;
                                        const ExtraMealList = this.state.ExtraMealList;
                                        ExtraMealList[props.index].goodsId = goodsId;
                                        ExtraMealList[props.index].sodPrice = sodPrice;
                                        this.setState({
                                            ExtraMealList,
                                        })
                                        // 计算总价 和 更新数据
                                        let mealList = ExtraMealList.filter((item)=>{
                                            return item.goodsId;
                                        })
    
                                        let sodAmount = 0;
                                        for( let item of mealList){
                                            sodAmount += item.sodPrice * item.sodCount * 12;
                                        }
                                        sodAmount = Number(sodAmount.toFixed(2));
                                        console.log('extraAmount',sodAmount);
                                        window.infoBus.$emit('extraAmount',sodAmount);
                                        window.infoBus.$emit('subMeals',mealList);
                                    } else {
                                        console.log('extraAmount',0);
                                        window.infoBus.$emit('extraAmount',0);
                                        window.infoBus.$emit('subMeals',[]);  
                                    }

                                } }

                            >
                                { this.state.list.map( (item, index)=> {
                                    if(item){
                                        return <Option value={JSON.stringify(item)} key={item.paeId}>{item.paeName}</Option>
                                    }
                                    return <Option value="------" key="null">{'------'}</Option>
                                }
                                ) }
                            </Select>
                            <Select
                                getPopupContainer={() => document.getElementById('VendorFrom')}
                                defaultValue={this.state.ExtraMealList[props.index].sodCount} 
                                onChange={(sodCount)=>{
                                    const ExtraMealList = this.state.ExtraMealList;
                                    ExtraMealList[props.index].sodCount = sodCount;
                                    this.setState({
                                        ExtraMealList,
                                    })
                                    // 计算总价 和 更新数据
                                    let mealList = ExtraMealList.filter((item)=>{
                                        return item.goodsId;
                                    })
    
                                    const sodAmount = computePrice(mealList);
                                    console.log('extraAmount',sodAmount);
                                    window.infoBus.$emit('extraAmount',sodAmount);
                                    window.infoBus.$emit('subMeals',mealList);
                                    window.infoBus.$emit('extraSodCount',{
                                        index:props.index,
                                        sodCount,
                                    })
                                }}
                                style={ { width:'60px' } }
                            >
                                {
                                    this.state.maxCountArr.map((item)=><Option key={item} value={item}>{item}</Option>)
                                }
                            </Select>
                            <span style={ { width:'50px',marginLeft:'10px' } }>{ bMap['unit'] }</span>
                            <Button 
                              disabled={this.state.ExtraMealList.length===1}
                              style={
                                  {
                                      marginLeft:10
                                  }
                              }
                              size="small"
                              onClick={()=>{
                                const ExtraMealList = this.state.ExtraMealList.filter((item,index)=>{
                                    return index!==props.index
                                })
                                // 计算总价 和 更新数据
                                let mealList = ExtraMealList.filter((item)=>{
                                    return item.goodsId;
                                })
                                
                                const sodAmount = computePrice(mealList);
                                console.log('extraAmount',sodAmount);
                                window.infoBus.$emit('extraAmount',sodAmount);
                                window.infoBus.$emit('subMeals',mealList);
                                this.setState({
                                    ExtraMealList
                                })
                              }}
                            >
                                {bMap['delete']}
                            </Button>
                            <Button 
                              style={
                                  {
                                      display:this.state.ExtraMealList.length === props.index+1 ? 'inline-block':'none',
                                      marginLeft:10
                                  }
                              }
                              size="small"
                              onClick={()=>{

                                const ExtraMealList = this.state.ExtraMealList.concat([Object.assign({},this.state.originData)])
                              
                                this.setState({
                                    ExtraMealList
                                })
                              }}
                            >
                                {bMap['add']}
                            </Button>
                        </FormItem>
                    </Col>
            )
        }
        return (
            <div>
                { this.state.ExtraMealList.map( (item,index)=><ExtraMeal key={index+1} index={index} /> ) }
            </div>
        )
    }
}

ExtraMealList.propTypes={
    list:PropTypes.array,
    sodCountArr:PropTypes.array,
}

ExtraMealList.defaultProps={
    list:[],
    sodCountArr:[],
}

export default ExtraMealList;