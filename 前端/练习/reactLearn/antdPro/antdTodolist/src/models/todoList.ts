import { addTodolist, getTodolist, setTodolist } from '@/services/todolist';
import { TableListItem } from '../../mock/todoList';

export default {
  namespace: 'todoList',
  state: [],
  reducers: {
    changeState(state: object[], { payload }: { payload: object[] }) {
      return payload;
    },
  },
  effects: {
    *getState(action, { call, put }) {
      const todolist: TableListItem[] = yield call(getTodolist);
      yield put({
        type: 'changeState',
        payload: todolist,
      });
    },
    *setState({ payload }, { call, put }) {
      const msg = yield call(setTodolist, payload.id, payload.status);
      yield put({
        type: 'getState',
      });
      return msg;
    },
    *addState({ payload }, { call, put }) {
      const msg = yield call(addTodolist, payload);
      yield put({
        type: 'getState',
      });
      return msg;
    },
  },
};
