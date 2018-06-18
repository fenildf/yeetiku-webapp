import React from 'react';
import { observer, inject } from 'mobx-react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import LoginDialog from './login';
import Router from 'next/router';
import config from '../../lib/config';

const styles = require('./styles.less');

@inject('userStore')
@observer
class Header extends React.Component<any,any> {
  state = {
    auth: true,
    anchorEl: null,
    openAuthDialog: false,
  };

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleSignout = () => {
    const { userStore } = this.props ;
    userStore.signOut();
    Router.push('/');
  }

  render(){
    const { anchorEl } = this.state;
    const { userStore } = this.props ;
    const open = Boolean(anchorEl);
    return (
        <AppBar position="static" className={styles.appbar} style={{ backgroundColor: '#06C1AE' }}>
          <Toolbar>
            <Typography variant="title" color="inherit" className={styles.title}>
              <a href="/"><img className={styles.logo} src="/static/logo.png" alt="my image" /> </a>
            </Typography>
          
            {userStore.isLoginedIn ? (
                <div >
                  
                  <IconButton
                    aria-owns={open ? 'menu-appbar' : null}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                  >
                  {userStore.user.avatar?
                    <img className={styles.littleAvatar}  src={config.server + userStore.user.avatar} />
                    :
                    <AccountCircle />
                  }
                  </IconButton>
                  
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={this.handleClose}
                  >
                  {
                    userStore.user.name?
                    <div className={styles.accountInfo}>
                      <div style={{float:'left'}}>
                        <img className={styles.littleAvatar}  src={config.server + userStore.user.avatar} />
                      </div>
                      <div style={{marginLeft:'50px'}}>
                      <p> {userStore.user.name} </p>
                      <p> {userStore.user.email} </p>
                      </div>
                    </div>
                    :
                    null   
                  }
                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                    <MenuItem onClick={this.handleClose}>My account</MenuItem>
                    <MenuItem onClick={this.handleSignout}>Sign out</MenuItem>
                  </Menu>
                </div>
              ):
                <Button color="inherit" onClick={ () => this.setState({openAuthDialog: true}) }>Login</Button>
              }
              </Toolbar>
              <LoginDialog  open={this.state.openAuthDialog} onClose={  () => this.setState({openAuthDialog: false}) }/>
        </AppBar>
    );
  }
};

export default Header;