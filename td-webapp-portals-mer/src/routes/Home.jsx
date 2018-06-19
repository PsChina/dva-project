import React from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Icon } from 'antd';
import ReactEcharts from 'echarts-for-react/lib/core';
import Echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/axis';
import 'echarts/lib/component/grid';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/tooltip';
import * as i18n from '../utils/i18n';
import styles from './Home.less';

const Home = ({ home }) => {
  const bizMap = i18n.bizMap('merp/home');
  const {
    monthList, settleInfo,
    bankValueList, visaValueList, masterValueList,
    aliValueList, wechatValueList, todayValueList,
    storeList, storeValueList, termList, termValueList,
  } = home;

  const style = { height: '240px' };
  const grid = {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  };
  const pieToolTip = {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)',
  };
  const pieItemStyle = {
    emphasis: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' },
  };
  const barToolTip = {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  };
  const barLabel = {
    normal: {
      show: true,
      position: 'top',
    },
  };

  // 近15天交易量折线图
  const getOtionHisPay = {
    grid,
    tooltip: { trigger: 'axis' },
    legend: {
      //data: [bizMap.unionCard, bizMap.visaCard, bizMap.masterCard, bizMap.aliPay, bizMap.wechat],
      data: [bizMap.unionCard, bizMap.visaCard, bizMap.masterCard],
    },
    xAxis: [{ type: 'category', boundaryGap: false, data: monthList }],
    yAxis: [{ type: 'value' }],
    series: [
      { name: bizMap.unionCard, type: 'line', stack: bizMap.total, areaStyle: { normal: {} }, data: bankValueList },
      { name: bizMap.visaCard, type: 'line', stack: bizMap.total, areaStyle: { normal: {} }, data: visaValueList },
      { name: bizMap.masterCard, type: 'line', stack: bizMap.total, areaStyle: { normal: {} }, data: masterValueList },
      /*{ name: bizMap.aliPay, type: 'line', stack: bizMap.total, areaStyle: { normal: {} }, data: aliValueList },
      { name: bizMap.wechat, type: 'line', stack: bizMap.total, areaStyle: { normal: {} }, data: wechatValueList },*/
    ],
  };
  // 当日交易比例饼图
  const getOtionTodayPay = {
    tooltip: pieToolTip,
    //legend: { data: [bizMap.unionCard, bizMap.visaCard, bizMap.masterCard, bizMap.aliPay, bizMap.wechat] },
    legend: { data: [bizMap.unionCard, bizMap.visaCard, bizMap.masterCard] },
    series: [{
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      name: bizMap.todayPay,
      data: todayValueList,
      itemStyle: pieItemStyle,
    }],
  };
  // 当日门店柱状图
  const getOtionStore = {
    grid,
    tooltip: barToolTip,
    legend: { data: [bizMap.todayPay] },
    xAxis: { type: 'category', data: storeList },
    yAxis: { type: 'value' },
    series: [{
      type: 'bar',
      name: bizMap.todayPay,
      stack: bizMap.total,
      label: barLabel,
      data: storeValueList,
    }],
  };
  // 当日终端柱状图
  const getOtionTerm = {
    grid,
    tooltip: barToolTip,
    legend: { data: [bizMap.todayPay] },
    xAxis: { type: 'category', data: termList },
    yAxis: { type: 'value' },
    series: [{
      type: 'bar',
      name: bizMap.todayPay,
      stack: bizMap.total,
      label: barLabel,
      data: termValueList,
    }],
  };

  return (
    <Row gutter={16} className={styles['merp-home']}>
      <Col lg={16} md={24}>
        <Card title={bizMap.last15DayPay}>
          <ReactEcharts echarts={Echarts} option={getOtionHisPay} style={style} />
        </Card>
      </Col>
      <Col lg={8} md={12}>
        <Card title={bizMap.todaySettle}>
          <div style={style}>
            <div className={styles['stl-info']}>
              <b><Icon type="pay-circle-o" /></b>
              <div className={styles['info-main']}>
                <div className={styles['info-label']}>{bizMap.waitStl}：</div>
                <div className={styles['info-content']}><span className={styles['info-amt']}>{settleInfo.amt1} </span> {settleInfo.amt1Unit}</div>
              </div>
            </div>
            <div className={styles['stl-info']}>
              <b><Icon type="pay-circle" /></b>
              <div className={styles['info-main']}>
                <div className={styles['info-label']}>{bizMap.shouldStl}：</div>
                <div className={styles['info-content']}><span className={styles['info-amt']}>{settleInfo.amt2} </span> {settleInfo.amt2Unit}</div>
              </div>
            </div>
          </div>
        </Card>
      </Col>
      <Col lg={8} md={12}>
        <Card title={bizMap.todayPay}>
          <ReactEcharts echarts={Echarts} option={getOtionTodayPay} style={style} />
        </Card>
      </Col>
      <Col lg={8} md={12}>
        <Card title={bizMap.storePay}>
          <ReactEcharts echarts={Echarts} option={getOtionStore} style={style} />
        </Card>
      </Col>
      <Col lg={8} md={12}>
        <Card title={bizMap.termPay}>
          <ReactEcharts echarts={Echarts} option={getOtionTerm} style={style} />
        </Card>
      </Col>
    </Row>
  );
};

function mapStateToProps({ home }) {
  return { home };
}

export default connect(mapStateToProps)(Home);
