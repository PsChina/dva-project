import React, { PropTypes } from 'react';
import { Popconfirm, Spin, Calendar, Icon } from 'antd';
import * as i18n from '../../../../utils/i18n';
// import moment from 'moment';
import styles from './CalendarInfo.less';
// import config from '../../../../../config/config.json';

// moment.locale('en-us');
const noop = () => { };

const CalendarInfo = (props) => {
  const { loading, dateChange, holidaysList, holidaysArray, typeChange } = props;
  const bizMap = i18n.bizMap('bas/holiday');
  function getListData(value) {
    let listData;
    for (let i = 0; i < holidaysList.length; i++) {
      switch (value.format('YYYYMMDD')) {
        case holidaysList[i].holiday:
          listData = [
            { type: holidaysList[i].dayType === '1' ? 'normal' : 'warning', content: holidaysList[i].content },
          ]; break;
        default:
      }
    }
    return listData || [];
  }
  const handleTypeChange = (value) => {
    typeChange(value);
  }

  function dateCellRender(value) {
    const listData = getListData(value);
    return (
      <Popconfirm
        title={`${bizMap.changeDayTypeTitelConfirm.replace('{d}', value.format(' YYYY-MM-DD '))} ${holidaysArray.includes(value.format('YYYYMMDD')) ? bizMap['DayType-0'] : bizMap['DayType-1']} `}
        onConfirm={() => { handleTypeChange(value) }}
        content={value.format('YYYYMMDD')}
        trigger="hover"
        placement="topLeft"
      >
        <ul className={holidaysArray.includes(value.format('YYYYMMDD')) ? styles['events-holiday'] : styles.events}>
          {listData.map(item =>
            <li key={item.content} >
              <span className={styles[`event-${item.type}`]}><Icon type="right" /></span>
              {item.content}
            </li>,
          )}
        </ul>
      </Popconfirm>
    );
  }

  return (
    <Spin spinning={loading}>
      <Calendar dateCellRender={dateCellRender} onPanelChange={dateChange} />
    </Spin>
  );
}

CalendarInfo.propTypes = {
  loading: PropTypes.bool,
  holidaysList: PropTypes.array,
  holidaysArray: PropTypes.array,
  dateChange: PropTypes.func,
  typeChange: PropTypes.func,
};

CalendarInfo.defaultProps = {
  loading: false,
  holidaysList: [],
  holidaysArray: [],
  dateChange: noop,
  typeChange: noop,
}

export default CalendarInfo;
