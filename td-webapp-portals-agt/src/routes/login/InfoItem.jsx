import React, { PropTypes } from 'react';
import styles from './Login.less';


class InfoItem extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
        <div className={ styles["login-info-item-box"] }>
            <div className={ styles["login-info-itme-left"] }>
                <img className={ styles['icon-size'] } src={ this.props.icon} alt=""/>
            </div>
            <div className={ styles["login-info-item-right"] }>
                <div className={styles["login-info-item-right-top"]}>
                    { this.props.title }
                </div>
                <div className={ styles["login-info-item-right-bottom"] }>
                    { this.props.content }
                </div>
            </div>
        </div>
        )
    }
}
InfoItem.defaultProps={
    icon: '',
    title: '',
    content: '',
}
InfoItem.propTypes={
    icon: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
}
export default InfoItem;