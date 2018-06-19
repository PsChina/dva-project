import React, { PropTypes } from 'react';
import * as i18n from '../../../../utils/i18n';

const PubUnionfitTable = (props) => {
  const bizMap = i18n.bizMap('bas/pubUnionfit');
  // const commonMap = i18n.commonMap();
  const { data } = props;
  let dcflag = '';
  switch (data.dcflag) {
    case '01': dcflag = bizMap['dcflag-01']; break;
    case '02': dcflag = bizMap['dcflag-02']; break;
    case '03': dcflag = bizMap['dcflag-03']; break;
    case '04': dcflag = bizMap['dcflag-03']; break;
    default: dcflag = ''; break;
  }
  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.binctt}:</td>
          <td>{data.binctt}</td>
          <td>{bizMap.issnam}:</td>
          <td>{data.issnam}</td>
        </tr>
        <tr>
          <td>{bizMap.issno}:</td>
          <td>{data.issno}</td>
          <td>{bizMap.crdnam}:</td>
          <td>{data.crdnam}</td>
        </tr>
        <tr>
          <td>{bizMap.fitcrk}:</td>
          <td>{data.fitcrk}</td>
          <td>{bizMap.fitoff}:</td>
          <td>{data.fitoff}</td>
        </tr>
        <tr>
          <td>{bizMap.fitlen}:</td>
          <td>{data.fitlen}</td>
        </tr>
        <tr>
          <td>{bizMap.crdoff}:</td>
          <td>{data.crdoff}</td>
          <td>{bizMap.crdlen}:</td>
          <td>{data.crdlen}</td>
        </tr>
        <tr>
          <td>{bizMap.crdctt}:</td>
          <td>{data.crdctt}</td>
          <td>{bizMap.crdcrk}:</td>
          <td>{data.crdcrk}</td>
        </tr>
        <tr>
          <td>{bizMap.binoff}:</td>
          <td>{data.binoff}</td>
          <td>{bizMap.binlen}:</td>
          <td>{data.binlen}</td>
        </tr>
        <tr>
          <td>{bizMap.bincrk}:</td>
          <td>{data.bincrk}</td>
          <td>{bizMap.dcflag}:</td>
          <td>{dcflag}</td>
        </tr>
      </tbody>
    </table>
  );
}

PubUnionfitTable.propTypes = {
  data: PropTypes.object,
};

PubUnionfitTable.defaultProps = {
  data: {},
}

export default PubUnionfitTable;
