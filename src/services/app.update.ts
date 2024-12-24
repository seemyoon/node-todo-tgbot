import { Ctx, Hears, InjectBot, Message, On, Start, Update } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { AppService } from './app.service';
import { actionButton } from './app.button';
import { TodoEnum } from '../models/enum/todo.enum';
import { Context } from '../models/interfaces/context.interface';
import { showList } from '../utils/app.utils';

const todos = [
  { id: 1, title: 'Learn NestJS', isCompleted: false },
  { id: 2, title: 'Learn Telegraf', isCompleted: false },
  { id: 3, title: 'Build a bot', isCompleted: true },
];

@Update()
export class AppUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly appService: AppService) {
  }

  @Start()
  public async startCommand(ctx: Context) { // ctx contain all info about current activities between user and bot
    await ctx.reply('Hi friend!');
    await ctx.reply('What do you want?', actionButton());
  }

  @Hears(TodoEnum.TODOLIST as any)
  public async getAll(ctx: Context) {
    await ctx.reply(showList(todos));
  }

  @Hears(TodoEnum.COMPLETE as any)
  public async doneTask(ctx: Context) {
    await ctx.reply('Write your id of task');
    ctx.session.type = TodoEnum.COMPLETE;
  }

  @Hears(TodoEnum.DELETE as any)
  public async deleteTask(ctx: Context) {
    ctx.session.type = TodoEnum.DELETE;
    await ctx.deleteMessage();
    await ctx.reply('Write your id of task');
  }

  @Hears(TodoEnum.EDIT as any)
  public async editTask(ctx: Context) {
    ctx.session.type = TodoEnum.EDIT;
    await ctx.deleteMessage();
    await ctx.replyWithHTML('Write your id of task and new task: \n\n' +
      `Like - <b>1 | New Task</b>`); //reply with HTML structure
  }

  @On('text' as any)
  public async getMessage(@Message('text') message: string, @Ctx() ctx: Context) {
    if (!ctx.session.type) return;

    if (ctx.session.type === TodoEnum.COMPLETE) {
      const id = parseInt(message);
      const todo = todos.find((item) => item.id === id);
      if (!todo) {
        await ctx.deleteMessage();
        await ctx.reply('Task with this id was not found');
        return;
      }
      todo.isCompleted = !todo.isCompleted;
      await ctx.reply(showList(todos));
    }

    if (ctx.session.type === TodoEnum.DELETE) {
      const id = parseInt(message);
      const todo = todos.find((item) => item.id === id);
      if (!todo) {
        await ctx.deleteMessage();
        await ctx.reply('Task with this id was not found');
        return;
      }
      await ctx.reply(showList(todos.filter((item) => item.id !== id)));
    }

    if (ctx.session.type === TodoEnum.EDIT) {
      const [taskId, taskName] = message.split(' | ');
      const todo = todos.find((item) => item.id === parseInt(taskId));
      if (!todo) {
        await ctx.deleteMessage();
        await ctx.reply('Task with this id was not found');
        return;
      }
      todo.title = taskName;
      await ctx.reply(showList(todos));
    }

  }
}