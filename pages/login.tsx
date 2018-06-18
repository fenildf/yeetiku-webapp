import * as React from 'react';
import { AppProps } from '../typings/props';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import NavMenu from '../components/compositions/navMenu';
const styles = require('./styles.less');

const muiStyles = {
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
};


class Login extends React.Component<AppProps, any>  {
    state = {
        name: '',
      };

    constructor(props : AppProps) {
        super(props);
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };

    render(){
        return (
            <div>
              <NavMenu />
              <div>
                <form noValidate autoComplete="off">
                    <TextField
                        id="name"
                        label="Name"
                        value={this.state.name}
                        onChange={this.handleChange('name')}
                        margin="normal"
                        />
                        <TextField
                            id="with-placeholder"
                            label="With placeholder"
                            placeholder="Placeholder"
                            margin="normal"
                            />
                </form>
              </div>
            </div>
        )
    }
}

export default withStyles(muiStyles)(Login);