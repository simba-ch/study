import { createStore } from 'redux';

function reducer(state:any, { type, payload }) {
  if (type === 'loading') {
    return payload;
  }
  return state;
}

const store = createStore(reducer,false);
export default store;
