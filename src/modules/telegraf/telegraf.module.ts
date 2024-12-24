import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Config, TelegrafConfig } from '../../configs/config.type';
import { TelegrafModule, TelegrafModuleAsyncOptions } from 'nestjs-telegraf';
import { sessions } from '../../constants/common.constants';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      useFactory: (configService: ConfigService<Config>) => {
        const config = configService.get<TelegrafConfig>('telegraf');
        return {
          middlewares: [sessions.middleware()],
          token: config.tg_token,
        };
      },
      inject: [ConfigService],
    } as TelegrafModuleAsyncOptions),
  ],
})
export class TelegrafCustomModule {}
