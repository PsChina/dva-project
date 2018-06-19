import React, { PropTypes } from 'react';
import BusinessItem from './BusinessItem';

const noop = () => {};
const BusinessList = (props) => {
  const { onChange, detailClick, updateClick } = props;
  return (
    <div>
      {
        props.list.map((item, idx) => {
          const itemProps = {
            key: idx,
            title: item.title,
            biz: item.biz,
            switch: props.switch,
            checked: item.checked === 'true' || item.checked === true,
            onChange: (checked) => {
              onChange(item, checked);
            },
            detailClick() {
              detailClick(item);
            },
            updateClick() {
              updateClick(item);
            },
          };
          return (
            <BusinessItem {...itemProps} />
          );
        })
      }
    </div>
  );
};

BusinessList.propTypes = {
  list: PropTypes.array,
  switch: PropTypes.bool,
  onChange: PropTypes.func,
  detailClick: PropTypes.func,
  updateClick: PropTypes.func,
};

BusinessList.defaultProps = {
  list: [],  // [{ biz: 'unionCard', title: '银联卡', checked: false }]
  switch: false,
  onChange: noop,
  detailClick: noop,
  updateClick: noop,
}

export default BusinessList;
