import React, { PropTypes } from 'react';
import MerchantStoreBaseDetailInfoForm from './infoForm/MerchantStoreBaseDetailInfoForm';

const MerchantStoreInfoTable = (props) => {
  const { data } = props;
  return (
    <MerchantStoreBaseDetailInfoForm data={data} />
  );
}

MerchantStoreInfoTable.propTypes = {
  data: PropTypes.object,
};

MerchantStoreInfoTable.defaultProps = {
  data: {},
}

export default MerchantStoreInfoTable;
