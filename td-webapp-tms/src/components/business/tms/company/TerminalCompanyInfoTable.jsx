import React, { PropTypes } from 'react';
import * as i18n from '../../../../utils/i18n';

const TerminalCompanyInfoTable = (props) => {
  const bizMap = i18n.bizMap('tms/terminalCompany');
  const { data } = props;
  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.copNam}:</td>
          <td>{data.copNam}</td>
          <td>{bizMap.copShNam}:</td>
          <td>{data.copShNam}</td>
        </tr>
        <tr>
          <td>{bizMap.copContacts}:</td>
          <td>{data.copContacts}</td>
          <td>{bizMap.copTel}:</td>
          <td>{data.copTel}</td>
        </tr>
        <tr>
          <td>{bizMap.copAddr}:</td>
          <td>{data.copAddr}</td>
        </tr>
        <tr>
          <td>{bizMap.copDesc}:</td>
          <td>{data.copDesc}</td>
        </tr>
      </tbody>
    </table>
  );
}

TerminalCompanyInfoTable.propTypes = {
  data: PropTypes.object,
};

TerminalCompanyInfoTable.defaultProps = {
  data: {},
}

export default TerminalCompanyInfoTable;
