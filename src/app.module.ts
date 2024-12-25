import { Module } from '@nestjs/common';
import configuration from './configs/configuration';
import { ConfigModule } from '@nestjs/config';
import { TelegrafCustomModule } from './modules/telegraf/telegraf.module';
import { AppService } from './services/app.service';
import { AppUpdate } from './services/app.update';
import { PostgresModule } from './modules/postgres/postgres.module';
import { RepositoryModule } from './modules/repository/repository.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TelegrafCustomModule,
    PostgresModule,
    RepositoryModule,
  ],
  controllers: [],
  providers: [AppService, AppUpdate],
})
export class AppModule {
}
