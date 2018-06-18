
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';
import { AppProps } from '../typings/props';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Page from '../components/hoc/page';
import Router from 'next/router'

const styles = require('./styles.less');

@inject('userStore')
@observer
class Register extends React.Component<AppProps, any>  {
    @observable feedback = "" ;
    @observable email = "";
    @observable password = "";
    @observable passwordConfirm = "";


    handleChange = name => event => {
        this[name] = event.target.value;
    }

    handleRegister = () => {
        const { userStore } = this.props;
        if (this.password !== this.passwordConfirm ){
            alert("两次密码不一样，请重新输入" );
            return
        }

        userStore.register({email: this.email, password:this.password}).then(
            result => {
                if (result.success) {
                    Router.push('/');
                }

                this.feedback = result.data
            }
        )
    };

    render(){
        return (
            
            <div className={styles.registerForm}>
            <Paper elevation={4}>
                <section >
                    <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    label="Email Address"
                    type="email"
                    value={this.email}
                    onChange={this.handleChange('email')}
                    fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        value={this.password}
                        onChange={this.handleChange('password')}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="passwordConfirm"
                        label="Password confirm"
                        type="password"
                        value={this.passwordConfirm}
                        onChange={this.handleChange('passwordConfirm')}
                        fullWidth
                    />
                </section>
                <section className={styles.submit}>
                    <Button onClick={this.handleRegister} color="primary">
                        Register 
                    </Button>
                </section>
            </Paper>
            </div>
        )
    }
}

export default Page(Register);