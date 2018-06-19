import Mock from "mockjs";
import axios from 'axios';
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

const data = []

for( let i = 0 ; i < 200 ; i++ ) {
    data.push(
            {
                time:new Date('2018-5-1 8:30').getTime()+1000*60*60*24*i,
                customerName:Mock.Random.cname(),
                customerType:Mock.Random.integer( 0, 1 ),
                paymentContent:Mock.Random.cparagraph(1),
                orderAmount:Mock.Random.integer(1000,10000),
                paymentType:Mock.Random.integer( 0, 1 ),
                note:'备注',
                state:Mock.Random.integer( 0, 1 ),
                id:i       
            } 
        )
}


const orderlist = data;


// mock.onAny().reply(function(config){
//     if( config.method.toUpperCase() === 'GET' ){
//         const path = config.url.split('?')[0]
//         switch(path){
//             case '/aps/rest/orderlist':
//             return [200,orderlist];
//             case '/aps/rest/confirm/order':
//             return [200,{success:true}];
//             default :
//             return [200,axios(config).then( (result)=>{
//                 return result
//             } )];
//         }
//     }else if( config.method.toUpperCase() === 'PATCH' ){
//         const path = config.url.split('?')[0]
//         switch(path){
//             case '/aps/rest/confirm/order':
//             return [200,{success:Mock.Random.boolean()}];
//             default :
//             return [200,{msg:'ok'}];
//             case '/aps/rest/confirm/orders':
//             return [200,{success:Mock.Random.boolean()}]
//         }
//     }
// })