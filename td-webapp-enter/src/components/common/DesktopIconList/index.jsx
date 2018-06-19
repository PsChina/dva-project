import React, { PropTypes } from 'react';
import DesktopIcon from '../DesktopIcon';
import styles from './index.less';

class DesktopIconList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableCell: [],
      ev: null,
    }
  }

  componentDidMount() {
    this.state.ev = this.handleResize.bind(this);
    window.addEventListener('resize', this.state.ev);
    this.resetItemLayout(this.props.items);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.state.ev);
  }

  componentWillReceiveProps(nextProps) {
    const items = nextProps.items;
    if (nextProps.items.length !== this.props.items.length) {
      this.resetItemLayout(items);
    } else if (JSON.stringify(nextProps.items) !== JSON.stringify(this.props.items)) {
      this.resetItemLayout(items);
    }
  }

  handleResize() {
    const items = this.props.items;
    this.resetItemLayout(items);
  }

  resetItemLayout(items) {
    const h = parseInt(window.innerHeight, 10) - 80; // 可用高度
    const maxRowNum = Math.floor(h / 85);  // 1列最多行数
    const tableCell = [];
    for (let i = 0; i < maxRowNum; i++) {
      tableCell.push([]);
    }
    let curRow = 0; // 当前行
    for (let i = 0; i < items.length; i++) {
      if (parseInt(i % maxRowNum, 10) === 0 && i > 0) {
        curRow = 0;
        tableCell[curRow].push(items[i]);
        curRow++;
      } else {
        tableCell[curRow].push(items[i]);
        curRow++;
      }
    }
    this.setState({ tableCell });
  }

  render() {
    return (
      <table>
        <tbody>
          {
            this.state.tableCell.map((row, idx) => {
              return (
                <tr key={idx}>
                  {
                    row.map((col, i) => {
                      return <td key={i} className={styles.icon_item}><DesktopIcon {...col} /></td>
                    })
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
    );
  }
}

DesktopIconList.propTypes = {
  items: PropTypes.array,
};

DesktopIconList.defaultProps = {
  items: [],
}

export default DesktopIconList;
