import React from 'react';
import * as i18n from '../../../utils/i18n';

const LoginFooter = (props) => {
  const bizMap = i18n.bizMap('login');
  return (
    <footer>
      {/* <ul>
        <li>
          <a href="javascript:void(0);">{bizMap.aboutUs}</a>
            &nbsp; | &nbsp;
            <a href="javascript:void(0);">{bizMap.contactUs}</a>
        </li>
        <li>{ bizMap.copyright }</li>
      </ul> */}
    </footer>
  );
}


export default LoginFooter;
