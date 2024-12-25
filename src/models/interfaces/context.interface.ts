import { Context as ContextTelegraf } from 'telegraf';
import { TodoEnum } from '../enum/todo.enum';

export interface Context extends ContextTelegraf {
  session: {
    type?: TodoEnum.COMPLETE | TodoEnum.DELETE | TodoEnum.EDIT | TodoEnum.CREATE;
  };
}