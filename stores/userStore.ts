import { action, extendObservable,observable } from 'mobx';
import { requestLogin,requestRegister } from '../services/login';
import { saveToken,saveCurrentUser,removeCurrentUser,removeToken } from '../lib/jwtToken';
const defaultState = {
  error: undefined,
  displayName: undefined,
  photoURL: undefined,
  isLoginedIn: false ,
  user:{},
  uid: false
}

export default class UserStore {
  @observable id = ""
  @observable user = ""
  @observable username = ""
  @observable email = ""
  @observable password = ""
  @observable rememberPassword = false 
  @observable isLoginedIn = false
  @observable token = ""
  @observable loading = false 
  constructor(User = undefined) {
    extendObservable(this, User || defaultState);
  }

  @action signIn = async ({email,password}) => {
    let result = false ;
    await requestLogin({email, password}).then(action( (res: any )=>{
      console.log("res",res);
      
      if ( res.success && res.code === 10200  ) {
        let user = res.body.user
          saveToken(res.token)
          saveCurrentUser(user)
          if ( this.rememberPassword ) {
            user['password'] = this.password
          }else{
            user['password'] = ""
          }
          this.id = res.body.id
          this.user = res.body.user
          this.token = res.token
          this.isLoginedIn = true
          result = true ;
      }else if ( res.status === 600 ){
        this.isLoginedIn = false
        result = false
        alert("连接不上服务器，能连接上服务器吗？")
      }else if ( res.status === 10401 ){
        this.isLoginedIn = false
        result = false
        alert("用户名或密码错误，请重新输入...")
      }
      this.loading = false
    }) ).catch((error) => {
      alert("连接不上服务器，请稍候重试！" + error)
      this.loading = false
      result = false
    })

    return result
  }

  @action signOut = () => {
    this.isLoginedIn = false
    removeCurrentUser()
    removeToken()
  }

  @action register = async ({ email, password }) => {
    this.loading = true
    let result = {success:false,data:""} ;
    await requestRegister({ email, password }).then(action( (res: any )=>{
      console.log("res",res);
      if ( res.success && res.code === 10200  ) {
        saveToken(res.token);
        saveCurrentUser({email});
        this.isLoginedIn = true;
        result.success = true ;
        result.data = "register success";
      }else{
        result.success = false ;
        result.data = res.message;
      }

      this.loading = false
    }) )
    return result
  }

  updateUser = action( ({displayName, photoURL, auth, uid}) => {
    console.log(displayName,photoURL,auth,uid)
  })
};