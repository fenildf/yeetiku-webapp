import Cookie from "js-cookie";

export  function saveToken(token){
  Cookie.set('jwtToken', token);
}

export  function removeToken(){
  Cookie.remove('jwtToken');
}

export function getToken(){
  const token = Cookie.get('jwtToken') ; 
  return token;
}

export function saveCurrentUser(user) {
  Cookie.set('user', user);
}

export function getCurrentUser() {
  const user = Cookie.get('user');
  return JSON.parse(user);
}

export function removeCurrentUser(){
  Cookie.remove('user');
}