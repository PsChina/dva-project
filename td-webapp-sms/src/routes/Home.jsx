import React from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Icon } from 'antd';
import ReactEcharts from 'echarts-for-react/lib/core';
import Echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/axis';
import 'echarts/lib/component/grid';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/tooltip';
import * as i18n from '../utils/i18n';
import styles from './Home.less';
import { amtMinUnitToStandUnit } from '../utils/amount';

const Home = ({ home }) => {
  const bizMap = i18n.bizMap('sms/home');
  const ccyMap = i18n.bizMap('currencyMap');
  console.log('homepage');
  const {
    todayCheckInfo,
    chkDateList,
    chkTotCntList,
    sucTotCntList,

    stlDateList,
    todaySettleInfo,
    shouldStlAmtList,
    settledAmtList,

    monthList,
    shaTotCostList,
    monthShareInfo,
  } = home;

  const style = { height: '240px' };

  const grid = {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  };

  const getOtionHisCheck = {
    grid,
    tooltip: { trigger: 'axis' },
    legend: {
      data: [bizMap.chkTotCnt, bizMap.sucTotCnt],
    },
    xAxis: [{ type: 'category', boundaryGap: false, data: chkDateList }],
    yAxis: [{ type: 'value' }],
    series: [
      { name: bizMap.chkTotCnt, type: 'line', stack: bizMap.total, areaStyle: { normal: {} }, data: chkTotCntList },
      { name: bizMap.sucTotCnt, type: 'line', stack: bizMap.total, areaStyle: { normal: {} }, data: sucTotCntList },
    ],
  };

  const getOtionHisSettlement = {
    grid,
    tooltip: { trigger: 'axis' },
    legend: {
      data: [bizMap.shouldStlAmt, bizMap.settledAmt],
    },
    xAxis: [{ type: 'category', boundaryGap: false, data: stlDateList }],
    yAxis: [{ type: 'value' }],
    series: [
      { name: bizMap.shouldStlAmt, type: 'line', stack: bizMap.total, areaStyle: { normal: {} }, data: shouldStlAmtList },
      { name: bizMap.settledAmt, type: 'line', stack: bizMap.total, areaStyle: { normal: {} }, data: settledAmtList },
    ],
  };

  const getOtionHisShare = {
    grid,
    tooltip: { trigger: 'axis' },
    legend: {
      data: [bizMap.shaTotCost],
    },
    xAxis: [{ type: 'category', boundaryGap: false, data: monthList }],
    yAxis: [{ type: 'value' }],
    series: [
      { name: bizMap.shaTotCost, type: 'line', stack: bizMap.total, areaStyle: { normal: {} }, data: shaTotCostList },
    ],
  };

  return (
    <Row gutter={16} className={styles['sms-home']}>
      <Col lg={8} md={8}>
        <Card title={bizMap.todayCheck}>
          <div style={style}>
            <div className={styles['sms-info']}>
              <b><Icon type="check-circle-o" /></b>
              <div className={styles['info-main']}>
                <div className={styles['info-label']}>{bizMap.doubtCount}：</div>
                <div className={styles['info-content']}><span className={styles['info-count']}><a href="/#/sms/chkManage/chnChkDoubtManage">{todayCheckInfo.doubtCount}</a></span></div>
              </div>
            </div>
            <div className={styles['sms-info']}>
              <b><Icon type="check-circle" /></b>
              <div className={styles['info-main']}>
                <div className={styles['info-label']}>{bizMap.errorCount}：</div>
                <div className={styles['info-content']}><span className={styles['info-count']}><a href="/#/sms/chkManage/chnChkErrorManage">{todayCheckInfo.errorCount}</a></span></div>
              </div>
            </div>
          </div>
        </Card>
      </Col>
      <Col lg={16} md={16}>
        <Card title={bizMap.last15DayCheck}>
          <ReactEcharts echarts={Echarts} option={getOtionHisCheck} style={style} />
        </Card>
      </Col>
      <Col lg={8} md={8}>
        <Card title={bizMap.todaySettlement}>
          <div style={style}>
            <div className={styles['sms-info']}>
              <b><Icon type="pay-circle-o" /></b>
              <div className={styles['info-main']}>
                <div className={styles['info-label']}>{bizMap.shouldStlAmt}：</div>
                <div className={styles['info-content']}><span className={styles['info-count']}>{ amtMinUnitToStandUnit(todaySettleInfo.shouldStlAmt, 'CNY')}</span>{ccyMap.DEFAULT}</div>
              </div>
            </div>
            <div className={styles['sms-info']}>
              <b><Icon type="pay-circle" /></b>
              <div className={styles['info-main']}>
                <div className={styles['info-label']}>{bizMap.settledAmt}：</div>
                <div className={styles['info-content']}><span className={styles['info-count']}>{ amtMinUnitToStandUnit(todaySettleInfo.settledAmt, 'CNY')}</span>{ccyMap.DEFAULT}</div>
              </div>
            </div>
            <div className={styles['sms-info']}>
              <div className={styles['info-footer']}>
                <div className={styles['info-link']}>
                  <span><a href="/#/sms/stlManage/stlManage">more</a></span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Col>
      <Col lg={16} md={16}>
        <Card title={bizMap.last15DaySettlement}>
          <ReactEcharts echarts={Echarts} option={getOtionHisSettlement} style={style} />
        </Card>
      </Col>
      <Col lg={8} md={8}>
        <Card title={bizMap.monthShare}>
          <div style={style}>
            <div className={styles['sms-info']}>
              <b><Icon type="red-envelope" /></b>
              <div className={styles['info-main']}>
                <div className={styles['info-label']}>{bizMap.shaTotCost}：</div>
                <div className={styles['info-content']}><span className={styles['info-count']}>{ amtMinUnitToStandUnit(monthShareInfo.shaTotCost, 'CNY')}</span>{ccyMap.DEFAULT}</div>
              </div>
            </div>
            <div className={styles['sms-info']}>
              <b style={{ visibility: 'hidden' }}><Icon type="red-envelope" /></b>
              <div className={styles['info-main']} />
            </div>
            <div className={styles['sms-info']}>
              <div className={styles['info-footer']}>
                <div className={styles['info-link']}>
                  <span><a href="/#//sms/stlShrManage/stlShrManage">more</a></span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Col>
      <Col lg={16} md={16}>
        <Card title={bizMap.last6MonthShare}>
          <ReactEcharts echarts={Echarts} option={getOtionHisShare} style={style} />
        </Card>
      </Col>
    </Row>
  );
};

function mapStateToProps({ home }) {
  return { home };
}

export default connect(mapStateToProps)(Home);
