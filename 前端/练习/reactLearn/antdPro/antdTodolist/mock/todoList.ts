import Mock from 'mockjs';
import { Request, Response } from 'express';

export type TableListItem = {
  key: number;
  id: number;
  title: string;
  status: string;
};
const todolist: TableListItem[] = [];

for (let i = 0; i < 5; i += 1) {
  todolist.push({
    key: i,
    id: i,
    title: Mock.Random.cparagraph(),
    status: Math.random() > 0.3 ? (Math.random() > 0.6 ? 'success' : 'processing') : 'error',
  });
}
export default {
  'GET /api/todolist': todolist,
  'POST /api/todolist': (req: Request, res: Response) => {
    const { title } = req.body;
    todolist.unshift({
      key: todolist.length,
      id: todolist.length,
      title: title,
      status: 'processing',
    });
    res.send({
      code: 0,
      msg: '添加成功',
    });
  },
  'PUT /api/todolist': (req: Request, res: Response) => {
    const { id, status } = req.body;
    todolist.some((todo, i) => {
      if (todo.id === id) {
        return (todolist[i].status = status);
      }
    });
    res.send({
      code: 0,
      msg: '修改成功',
    });
  },
};
