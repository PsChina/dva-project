import React, { PropTypes } from 'react';
import { Row, Col, Icon, Card } from 'antd';
import styles from './CurExpOrdInfo.less'
import { commonMap, bizMap } from '../../../utils/i18n';

const CurExpOrdInfo = ({ info }) => {
  const map = commonMap();
  const bmap = bizMap('home');
  const { amt1, amt2, count1, count2 } = info;
  const amtTotal = amt1 + amt2;
  const amt1Scale = Math.round((amt1 / amtTotal) * 10000) / 100;
  const amt2Scale = Math.round((amt2 / amtTotal) * 10000) / 100;
  const countTotal = count1 + count2;
  const count1Scale = Math.round((count1 / countTotal) * 10000) / 100;
  const count2Scale = Math.round((count2 / countTotal) * 10000) / 100;
  const expOrdCardProps = {
    title: bmap.expOrdTitle,
    style: {
      width: '100%',
      marginBottom: 16,
    },
  };

  return (
    <Card {...expOrdCardProps}>
      <Row gutter={16} className={styles.cur_exp_ord_info}>
        <Col xs={24} sm={12}>
          <Col span={4} className={styles.center}>
            <Icon type="pay-circle-o" />
          </Col>
          <Col span={20}>
            <p><b>{`${map.order}${map.totalAmt}`}：</b><ins>{amtTotal}</ins>&nbsp;{map.amtUnit}</p>
            <p>
              <b>{map['ordType-01']}：</b><ins>{amt1}</ins>&nbsp;{map.amtUnit}
              【<em>{ isNaN(amt1Scale) ? 0 : amt1Scale }</em>&nbsp;%】&nbsp;&nbsp;
              <span className="ant-divider" />
              &nbsp;&nbsp;
              <b>{map['ordType-02']}：</b><ins>{amt2}</ins>&nbsp;{map.amtUnit}
              【<em>{ isNaN(amt2Scale) ? 0 : amt2Scale }</em>&nbsp;%】&nbsp;&nbsp;
            </p>
          </Col>
        </Col>
        <Col xs={24} sm={12}>
          <Col span={4} className={styles.center}>
            <Icon type="pay-circle" />
          </Col>
          <Col span={20}>
            <p><b>{`${map.order}${map.totalCount}`}：</b><ins>{countTotal}</ins>&nbsp;{map.countUnit}</p>
            <p>
              <b>{map['ordType-01']}：</b><ins>{count1}</ins>&nbsp;{map.countUnit}
              【<em>{ isNaN(count1Scale) ? 0 : count1Scale }</em>&nbsp;%】&nbsp;&nbsp;
              <span className="ant-divider" />
              &nbsp;&nbsp;
              <b>{map['ordType-02']}：</b><ins>{count2}</ins>&nbsp;{map.countUnit}
              【<em>{ isNaN(count2Scale) ? 0 : count2Scale }</em>&nbsp;%】&nbsp;&nbsp;
            </p>
          </Col>
        </Col>
      </Row>
    </Card>
  );
}

CurExpOrdInfo.propTypes = {
  info: PropTypes.object,
};

CurExpOrdInfo.defaultProps = {
  info: {
    // amt1: 300,
    // amt2: 320,
    // count1: 60,
    // count2: 80,
  },
}


export default CurExpOrdInfo;
