
import * as React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
const styles = require('./styles.less');
export default class GithubMenu extends React.Component<any,any>{
    state = {
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render(){
        const { anchorEl } = this.state;
        return (
            <span>
                <a onClick={this.handleClick} href="javascript:;" className={styles.link} >
                    Github
                </a>
                <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
                >
                <MenuItem onClick={this.handleClose}>
                    <a className={styles.link} href="https://github.com/yeelone/yeetiku-mobile-rn">App</a>
                </MenuItem>
                <MenuItem onClick={this.handleClose}>
                    <a className={styles.link} href="https://github.com/yeelone/yeetikuserver">Server</a>
                </MenuItem>
                <MenuItem onClick={this.handleClose}>
                    <a className={styles.link} href="https://github.com/yeelone/yeetiku-admin">Admin</a>
                </MenuItem>
                <MenuItem onClick={this.handleClose}>
                    <a className={styles.link} href="https://github.com/yeelone/yeetiku-mobile-rn">Webapp</a>
                </MenuItem>
                </Menu>
            </span>
        )
    }
}