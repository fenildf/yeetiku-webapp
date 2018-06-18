import React from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { AppProps } from '../../typings/props';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
const styles = require('./styles.less');

@inject('bankStore')
@observer
class BankTags extends React.Component<AppProps, any>  {
    @observable key1:number = 0
    @observable key2:number = 0

    _handleL1MouseEnter = (tagid:number) => {
        this.key1 = tagid;
        this.key2 = 0 ;
    }

    _handleTagPress = (tagid:number) => {
        this.props.bankStore.clear();
        this.props.bankStore.fetchByTag(tagid);
    }

    _handleL2MouseEnter = (tagid:number,parent:number) => {
        this.key1 = parent;
        this.key2 = tagid;
    }

    _renderLevel1Tags(){
        const { allTags } = this.props.bankStore;
        return (
            <ul>
                {Object.keys(allTags).map((key)=>{
                    const item = allTags[key].tag
                    return (
                        <div key={item.id} onClick={()=>this._handleTagPress(item.id)}>
                            <li 
                                className={styles.tagLevel1} 
                                onMouseEnter={() => this._handleL1MouseEnter(item.id)} 
                                > 
                                <span className={styles.title}> {item.name} </span>  <span> > </span>
                            </li>
                            <Divider />
                        </div>
                    )
                })
                }
            </ul>
        )
    }

    _renderLevel2Tags = (node) => {
        if (!node){
          return undefined
        }
        return (
            <ul>
                {
                Object.keys(node.children).map((key)=>{
                    const parent = node.children[key];
                    if (parent.tag){
                        return (
                            <div key={parent.tag.id} onClick={()=>this._handleTagPress(parent.tag.id)}>
                                <li 
                                    className={styles.tagLevel2}
                                    onMouseEnter={() => this._handleL2MouseEnter(parent.tag.id,parent.tag.parent)} 
                                    
                                    >
                                    <span className={styles.title} > { parent.tag.name } </span> <span > >> </span>
                                </li>
                                <Divider />
                            </div>
                        )
                    }
                })
                }
           </ul>
           )
    }

    _renderLevel3Tags = (node) => {
        if (!node){
            return null
        }

        return (
            <div>
                {Object.keys(node.children).map((key2)=>{
                    const child = node.children[key2].tag
                    if (child){
                        return(
                            <Chip 
                                key={child.id} 
                                className={styles.tagItem} 
                                avatar={<Avatar>TAG</Avatar>}  
                                label={child.name} 
                                onClick={()=>this._handleTagPress(child.id)}/>
                        )
                    }
                })}
            </div>
        )
    }

    render(){
        const { allTags } =  this.props.bankStore;
        
        let keys = Object.keys(allTags);
        let level2 = undefined;
        let level3 = undefined;

        if ( keys.length > 0 && this.key1 === 0) {
            level2 = allTags[keys[0]];
        }else{
            level2 = allTags[this.key1];
        }
        
        if (level2 !== undefined) {
            keys = Object.keys(level2.children);
            
            if ( keys.length > 0 && this.key2 === 0) {
                level3 = level2.children[keys[0]];
            }else{
                level3 = level2.children[this.key2];
            }
        }

        return (
            <div className={styles.tagContainer+ ' ' + styles.clearfix}>
                <div className={styles.left}>
                {this._renderLevel1Tags()}
                </div>
                <div className={styles.left}>
                    {this._renderLevel2Tags(level2)}
                </div>
                <div className={styles.childTagArea}>
                    {this._renderLevel3Tags(level3)}
                </div>

            </div>
        )
    }
}

export default BankTags;