export type Config = {
  app: AppConfig;
  telegraf: TelegrafConfig;
  database: DatabaseConfig;
};

export type AppConfig = {
  port: number;
  host: string;
};

export type TelegrafConfig = {
  tg_token: string;
}

export type DatabaseConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
};