import React from 'react';
import { Input, DatePicker, Button } from 'antd';
import { bizMap } from '../utils/i18n';
import * as services from '../services/component/SearchBar';
const bMap = bizMap('component/SearchBar');
const { RangePicker } = DatePicker;
const Search = Input.Search;

const state = {
    timeRange:[]
};

const setTimeRange = ( timeRange )=>{
    state.timeRange = timeRange;
}


const rangePickerProps = {
    onChange:(dateArr, strDateArr)=>{
        setTimeRange(strDateArr.map( (str)=>{
            return new Date(str).getTime()
        } ))
    }
}

const LeftBar = (props)=>{
    let ownStyle = {
        marginLeft:'20px',
        display:'flex'
    }
    function dateToString(time,startStr,endStr){
        if(time){
            let date = new Date(time);
            return `${startStr}${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}${endStr}`;
        }else{
            return undefined;
        }
    }
    const SearchProps = {
        style:{ 
            width:'450px'
        },
        placeholder:bMap['placeholder'],
        enterButton:bMap['search'],
        onSearch:(customerName)=>{

            const soCreateTimeStart = isNaN(state.timeRange[0]) ? undefined : state.timeRange[0];
            const soCreateTimeEnd = isNaN(state.timeRange[1]) ? undefined : state.timeRange[1];
            if(!window.shouldRelogin){
                services.getOrderList({
                    customerName,
                    soCreateTimeStart:dateToString(soCreateTimeStart,'',' 00:00:00'),
                    soCreateTimeEnd:dateToString(soCreateTimeEnd,'',' 23:59:59'),
                    pageSize:10,
                    currentPage:1
                }).then((result)=>{
                    if( 'data' in result && 'rspCod' in result.data ){
                        if(result.data.rspCod==="_SSO_ERR"){
                            window.infoBus.$emit('relogin')
                        } 
                    }
                    const { orderList, totalPrices} = props.formatData( result.data );
                    if( 'data' in result ){
                    props.updataStatus({
                        orderLength:result.data.total,
                        orderList,
                        current:1,
                        batchTotal:0,
                        selectedRowKeys:[],
                        totalPrices     
                    })        
                    }
                })
                props.updataStatus({
                    customerName,
                    soCreateTimeStart,
                    soCreateTimeEnd,
                })
            }

        }
    }
    return (
        <div style={ Object.assign({}, ownStyle,props.style) }>
            <RangePicker { ...rangePickerProps } />
            <Search { ...SearchProps }/>
        </div>
    )
}

const RightButton = (props)=>{
        let ownStyle = {
            marginRight:'20px'
        }
        const ButtonProps = {
            className:'newOrder',
            onClick:()=>{
                props.updataStatus({
                    newOrderVisible:true
                })
            }
        }
        return (
            <div style={ ownStyle }>
                <Button {...ButtonProps}>
                    {bMap['newOrder']}
                </Button>
            </div>
        )
}

class SearchBar extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        const SearchBarProps = {
            style:{
                width:'100%',
                height:'100%',
                display:'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }
        }
        return (
            <div style={this.props.style}>
                <div {...SearchBarProps}>
                    <LeftBar {...this.props} /> <RightButton {...this.props} />
                </div>
            </div>
        )
    }
}


export default SearchBar;