
import { observable ,extendObservable,action  } from 'mobx'
import { query,queryAllTags,queryByTag } from '../services/banks'

const defaultState = {
}

export default class BankStore {
  @observable id: number = 0
  @observable banks: any[] = observable.array(new Array())              //当前正在参加的题库
  @observable banksTotal: number = -1
  @observable total: number = 0 
  @observable currentTag: number = 0
  @observable page: number = 1
  @observable pageSize: number = 10
  @observable loading: boolean  = false
  @observable allTags = {}
  constructor(User = undefined) {
    extendObservable(this, User || defaultState);
  }

  public fetchAll = action( (key: string  = "", value: string  = "" ) => {
    this.loading = true
    return query({page:this.page, pageSize:this.pageSize,field:key ,keyword:value  }).then(action( (res:any)=>{
      if ( res.success && res.code === 10200  ) {
        this.banks = this.banks.concat([...res.body.banks])
        this.total = res.body.total
        this.page += 1
      }else{
        this.total = 0
      }
      this.loading = false
    }) )
  })

  @action clear = () => {
    this.banks = observable.array(new Array())  
    this.total = 0
    this.page = 1
  }

  @action fetchAllTags = () => {
    this.loading = true
    return queryAllTags().then(action( (res:any) => {
      if ( res.success && res.code === 10200  ) {
        this.allTags = res.body.tags;
      }else{
        this.allTags = {}
      }
      this.loading = false
      } )
    )
  }

  @action fetchByTag = (key:number = this.currentTag) => {
    this.loading = true
    return queryByTag({tag:key, page:this.page, pageSize:this.pageSize  }).then(action( (res:any)=>{
      if ( res.success && res.code === 10200  ) {
        this.banks = this.banks.concat([...res.body.banks])
        console.log("this.banks",res.body.banks);
        
        this.total = res.body.total
        this.page += 1
      }else{
        this.total = 0
      }
      this.loading = false
    }) )
  }

}