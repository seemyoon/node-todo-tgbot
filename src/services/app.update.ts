import { Ctx, Hears, InjectBot, Message, On, Start, Update } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { AppService } from './app.service';
import { actionButton } from './app.button';
import { TodoEnum } from '../models/enum/todo.enum';
import { Context } from '../models/interfaces/context.interface';
import { showList } from '../utils/app.utils';

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
    const todos = await this.appService.getAll();
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

  @Hears(TodoEnum.CREATE as any)
  public async createTask(ctx: Context) {
    ctx.session.type = TodoEnum.CREATE;
    await ctx.reply('Describe your task');
  }

  @On('text' as any)
  public async getMessage(@Message('text') message: string, @Ctx() ctx: Context) {
    if (!ctx.session.type) return;

    if (ctx.session.type === TodoEnum.COMPLETE) {
      const todos = await this.appService.doneTask(parseInt(message));

      if (!todos) {
        await ctx.deleteMessage();
        await ctx.reply('Task with this id was not found');
        return;
      }
      await ctx.reply(showList(todos));
    }

    if (ctx.session.type === TodoEnum.DELETE) {
      const todos = await this.appService.deleteTAsk(parseInt(message));

      if (!todos) {
        await ctx.deleteMessage();
        await ctx.reply('Task with this id was not found');
        return;
      }
      await ctx.reply(showList(todos));
    }

    if (ctx.session.type === TodoEnum.EDIT) {
      const [taskId, taskName] = message.split(' | ');
      const todos = await this.appService.editTask(parseInt(taskId), taskName);
      if (!todos) {
        await ctx.deleteMessage();
        await ctx.reply('Task with this id was not found');
        return;
      }
      await ctx.reply(showList(todos));
    }
    if (ctx.session.type === TodoEnum.CREATE) {
      const todos = await this.appService.createTask(message);
      await ctx.reply(showList(todos));
    }

  }
}