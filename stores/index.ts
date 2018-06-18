import User from './userStore';
import Bank from './bankStore';

const stores = {
  __userStore__: initialState => new User(initialState),
  __bankStore__: initialState => new Bank(initialState),
};

export default (store, initialState) => {
  const storeConstruct = stores[store];
  if (typeof window !== 'undefined') {
    if (!window[store]) {
      window[store] = storeConstruct(initialState);
    }
    return window[store];
  } else {
    return storeConstruct(initialState);
  }
};