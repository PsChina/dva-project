import React from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import CalendarInfo from '../../../components/business/bas/holiday/CalendarInfo';
import * as i18n from '../../../utils/i18n';

const HolidayManage = ({ dispatch, holidayManage }) => {
  // const objectid = 'menuId';
  const bizMap = i18n.bizMap('bas/holiday');
  // const commonMap = i18n.commonMap();
  const { holidaysList, holidaysArray } = holidayManage;

  const cardProps = {
    title: bizMap.holidayManage,
    style: { width: '100%' },
  };

  const CalendarProps = {
    holidaysList,
    holidaysArray,
    dateChange: (value) => {
      dispatch({
        type: 'holidayManage/queryList',
        payload: { queryMonth: value.format('YYYYMM') },
      })
    },
    typeChange: (value) => {
      const dayType = holidaysArray.includes(value.format('YYYYMMDD')) ? '0' : '1'
      dispatch({
        type: 'holidayManage/updateType',
        payload: { queryDay: value.format('YYYYMMDD'), dayType: dayType },
      })
    },
  }


  return (
    <Card {...cardProps}>
      <CalendarInfo {...CalendarProps} />
    </Card>
  );
};

function mapStateToProps({ holidayManage }) {
  return { holidayManage };
}

export default connect(mapStateToProps)(HolidayManage);
