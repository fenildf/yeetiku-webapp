import React from 'react';
import { Provider } from 'mobx-react';
import Header from '../compositions/header';
import Footer from '../compositions/footer';
import Stores from '../../stores/index';
import { getToken,getCurrentUser } from '../../lib/jwtToken';
const styles = require('./styles.less');

export interface IState {
  stores:{}
}


export default ComposedComponent => class extends React.Component<any,IState> {
  static async getInitialProps(ctx) {
    let userState = undefined;
    const isServer = !!ctx.req;

    if (isServer === true) {
      // const User = Stores('__userStore__',{});
      // userState = User.getUserFromCookie(ctx.req);
    }
    
    return {
      isServer,
      userState,
    };
  }

  constructor(props) {
    super(props);
    let userState = props.userState || {};
    const token = getToken() ;
    if (token){
      userState['isLoginedIn'] = true ;
      userState['user'] = getCurrentUser();
    }
    
    this.state = {
      stores: {
        userStore: Stores('__userStore__',userState),
        bankStore: Stores('__bankStore__', props.bankState),
      },
    };
  }

  render() {
    return (<Provider {...this.state.stores} >
      <div className={styles.app}>
        <Header />
        <ComposedComponent user={this.props} />
        <Footer />
      </div>
    </Provider>);
  }
};