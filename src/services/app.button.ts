import { Markup } from 'telegraf';
import { TodoEnum } from '../models/enum/todo.enum';

export function actionButton() {
  return Markup.keyboard([  // Markup.keyboard() is a method to create a keyboard near the message
    Markup.button.callback(TodoEnum.CREATE, 'create'),
    Markup.button.callback(TodoEnum.TODOLIST, 'list'),
    Markup.button.callback(TodoEnum.EDIT, 'edit'),
    Markup.button.callback(TodoEnum.DELETE, 'delete'),
    Markup.button.callback(TodoEnum.COMPLETE, 'complete'),
  ], {
    columns: 2,
  });
  //return Markup.inlineKeyboard([]);  Markup.keyboard() is a method to create a keyboard near the message
}