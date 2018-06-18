
import * as React from 'react';
import { observable } from 'mobx';
import { AppProps } from '../typings/props';
import NavMenu from '../components/compositions/navMenu';
const styles = require('./styles.less');

class About extends React.Component<AppProps, any>  {
    @observable test: string = 'test';
    constructor(props : AppProps) {
        super(props);
    }

    render(){
        return (
            <div >
                <NavMenu />
              <div className={styles.container}>
                <section >
                    <h1 className={styles.desctionText}>Yeetiku,忆题库 开源题库系统</h1>
                    <p className={styles.litterText}><span>yeetiku</span>是一套采用react native开发的开源移动题库系统，前后端分离，可自主定制</p>
                </section>
              </div>
            </div>
        )
    }
}

export default About;