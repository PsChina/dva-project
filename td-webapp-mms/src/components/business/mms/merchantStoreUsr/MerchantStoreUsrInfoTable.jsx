import React, { PropTypes } from 'react';
import MerchantUsrDetailInfoForm from './infoForm/MerchantStoreUsrDetailInfoForm';

const MerchantStoreUsrInfoTable = (props) => {
//  const commMap = i18n.commonMap();
  const { data } = props;
  return (
    <MerchantUsrDetailInfoForm data={data} />
  );
}

MerchantStoreUsrInfoTable.propTypes = {
  data: PropTypes.object,
};

MerchantStoreUsrInfoTable.defaultProps = {
  data: {},
}

export default MerchantStoreUsrInfoTable;
