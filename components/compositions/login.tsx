import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { AppProps } from '../../typings/props';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';

const styles = require('./styles.less');
interface loginProps extends AppProps {
    open: boolean
    onClose: Function
    fullScreen?: boolean
}

const muiStyles = {
    dialog: {
      backgroundColor:' #06C1AE',
    },
  };


@inject('userStore')
@observer
class LoginDialog extends Component<loginProps, any> {

    state = {
        email:"",
        password:""
      };

    handleClose = () => {
        const { onClose } = this.props ;
        onClose();
    };

    handleLogin = () => {
        const { userStore } = this.props;
        userStore.signIn({email: this.state.email, password:this.state.password}).then(
            result => {
                if (result) {
                    this.handleClose();
                }else{
                    
                }
            }
        )
    };

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
     };

    render() {
        const {fullScreen} = this.props 
        return (
        <Dialog 
            open={this.props.open }
            onClose={this.handleClose}
            fullScreen={fullScreen}>
            
            <DialogTitle>
                <div> 
                     <img className={styles.centerLogo} src="/static/logo.png" alt="my image" />
                </div>
            </DialogTitle>
            <DialogContent>
            <DialogContentText>
                Welcome  Yeetiku.com 
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                value={this.state.email}
                onChange={this.handleChange('email')}
                fullWidth
            />
            <TextField
                margin="dense"
                id="password"
                label="Password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange('password')}
                fullWidth
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={this.handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={this.handleLogin} color="primary">
                Login 
            </Button>
            </DialogActions>

            <span>New to Yeetiku? 
                <Link prefetch href="/register">
                    <a>Create an account.</a>
                </Link> 
            </span>
        </Dialog>
        );
    }
}

export default withStyles(muiStyles)(LoginDialog);