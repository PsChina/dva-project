import React, { PropTypes } from 'react';
import { Cascader } from 'antd';
import { request } from '../../../utils/request';

class AsynCascader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // inputValue: '',
      options: props.rootData,
    };
  }

  componentDidMount() {
    this.initData();
  }

  // onChange(value, selectedOptions) {
  //   this.setState({
  //     inputValue: selectedOptions.map(o => o.label).join(', '),
  //   });
  // }

  * initData() {
    const { initUrl, responseKey } = this.props;
    if (initUrl && initUrl !== '') {
      const result = yield request(initUrl);
      // result[responseKey] should be an Array like [ {label: 'xx', value: 'yy', isLeaf: false}, ... ]
      this.setState({
        options: result[responseKey],
      });
    }
  }

  * loadData(selectedOptions) {
    const { loadUrl, requestKey, responseKey } = this.props;
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    if (loadUrl && loadUrl !== '') {
      // request children data
      const result = yield request(`${loadUrl}?${requestKey}=${targetOption.value}`);
      // result[responseKey] should be an Array like [ {label: 'xx', value: 'yy', isLeaf: true/false}, ... ]
      targetOption.children = result[responseKey];
    }
    targetOption.loading = false;
    this.setState({
      options: [...this.state.options],
    });
  }

  render() {
    const { rootData, initUrl, loadUrl, requestKey, responseKey, ...restProps } = this.props
    const props = {
      options: this.state.options,
      loadData: this.loadData,
      // onchange: this.onChange,
      changeOnSelect: true,
    };
    return (
      <Cascader {...restProps} {...props} />
    );
  }
}

AsynCascader.propTypes = {
  rootData: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
    isLeaf: PropTypes.bool,
  })),
  initUrl: PropTypes.string,
  loadUrl: PropTypes.string,
  requestKey: PropTypes.string,
  responseKey: PropTypes.string,
};

AsynCascader.defaultProps = {
  rootData: [], // rootData should be like [ {label: 'xx', value: 'yy', isLeaf: false}, ... ]
  initUrl: '',  // if use this property, rootData should not be used
  loadUrl: '',
  requestKey: 'value',
  responseKey: 'rspList',
}

export default AsynCascader;
