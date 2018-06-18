import React from 'react';
import Link from 'next/link';
import GithubMenu from './githubMenu';
const styles = require('./styles.less');

class NavMenu extends React.Component<any,any> {
  render(){
    return (
        <div className={styles.navmenu} >
            <img className={styles.logo} src="/static/logo.png" alt="my image" />
            <div className={styles.navbody}>
            <Link href="/" >
                <a className={styles.link} >Enjoy</a>
            </Link>
            <GithubMenu />
            <Link href="/about" >
                <a className={styles.link} >About</a>
            </Link>
            
            
            </div>
        </div>
    );
  }
};

export default NavMenu;