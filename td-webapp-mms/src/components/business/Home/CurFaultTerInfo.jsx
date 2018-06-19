import React, { PropTypes } from 'react';
import { Card } from 'antd';
import Echarts from 'echarts/lib/echarts';
import 'echarts/map/js/china';
import 'echarts/lib/chart/map';
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/geo';
import 'echarts/lib/chart/effectScatter';
import { bizMap } from '../../../utils/i18n';

const bmap = bizMap('home');

class CurFaultTerInfo extends React.Component {
  componentDidMount() {
    const data = this.props.info;
    const count = this.props.count;
    this.buildChart(data, count);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.info.length !== this.props.info.length) {
      this.buildChart(nextProps.info, nextProps.count);
    } else if (JSON.stringify(nextProps.info) !== JSON.stringify(this.props.info)) {
      this.buildChart(nextProps.info, nextProps.count);
    }
  }

  buildChart(data, count) {
    const option = {
      title: {
        text: count === 0 ? bmap.noFaultDesc : bmap.faultDesc.replace('x', count),
        left: 'left',
        textStyle: {
          color: count === 0 ? '#5fbc29' : '#ff6600',
        },
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}',
      },
      geo: {
        map: 'china',
        label: {
          emphasis: {
            show: false,
          },
        },
        roam: true,
        itemStyle: {
          normal: {
            areaColor: '#fff',
            borderColor: '#666',
          },
          emphasis: {
            areaColor: '#eee',
          },
        },
      },
      series: [
        {
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: data,
          symbol: 'pin',
          symbolSize: 12,
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke',
          },
          hoverAnimation: true,
          itemStyle: {
            normal: {
              color: '#e01515',
              shadowBlur: 10,
              shadowColor: '#333',
            },
          },
          zlevel: 1,
        },
      ],
    };
    const chart = Echarts.init(document.getElementById('fault_ter_map'));
    chart.setOption(option);
  }

  render() {
    const terCardProps = {
      title: bmap.faultTerTitle,
      style: {
        width: '100%',
        marginBottom: 16,
      },
      bodyStyle: {
        padding: '16px 20px',
      },
    };
    return (
      <Card {...terCardProps}>
        <div id="fault_ter_map" style={{ width: '100%', height: 640 }} />
      </Card>
    );
  }
}

CurFaultTerInfo.propTypes = {
  info: PropTypes.array,
  count: PropTypes.number,
};

CurFaultTerInfo.defaultProps = {
  info: [
    // { name: 'a地区小区1北门', value: [116.7, 39.53] },
    // { name: 'b地区小区2北门', value: [115.480656, 35.23375] },
    // { name: 'c地区小区1北门', value: [117.27, 31.86] },
    // { name: 'd地区小区1北门', value: [114.31, 30.52] },
    // { name: 'e地区小区1北门', value: [125.03, 46.58] },
  ],
  count: 0,
}

export default CurFaultTerInfo;
