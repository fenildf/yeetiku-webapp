
import * as React from 'react';
import { observable, observe } from 'mobx';
import { observer, inject } from 'mobx-react';
import { AppProps } from '../typings/props';
import Page from '../components/hoc/page';
import BankCard from '../components/compositions/bank';
import BankTags from '../components/compositions/bankTags';
const styles = require('./styles.less');


@inject('bankStore')
@observer
class Index extends React.Component<AppProps, any>  {
    @observable test: string = 'test';
    constructor(props : AppProps) {
        super(props);
    }

    componentDidMount(){
        this.props.bankStore.fetchAll()
        this.props.bankStore.fetchAllTags()
    }

    _renderBanks({ item,index }){
        return (
            <li key={index}> <BankCard bank={item} /> </li>
        )
    }

    _renderTags(){
        const { allTags } = this.props.bankStore;
        return (
            <ul>
                {Object.keys(allTags).map((key,index)=>{
                    const item = allTags[key].tag
                    return <li key={index}> {item.name} </li>
                })
                }
            </ul>
        )
    }

    render(){
        const { banks } = this.props.bankStore;
        return (
            <div >
                <BankTags />
                <div className={styles.contentPager}>
                    <ul className={styles.bankList}>
                    { banks.map( (item,index) => this._renderBanks({item,index}) ) }
                    </ul>
                </div>
            </div>
        )
    }
}

export default Page(Index);