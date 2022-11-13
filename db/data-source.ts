import * as dotenv from 'dotenv';
dotenv.config();
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: `${process.env.MYSQL_PASSWORD}`,
  database: 'shop',
  entities:
    process.env.NODE_ENV === 'production'
      ? [__dirname + '/**/*.entity{.ts,.js}']
      : ['dist/**/*.entity{.ts,.js}'],
  synchronize: process.env.NODE_ENV === 'production' ? false : true,
  // dropSchema: process.env.NODE_ENV === 'production' ? false : true,
  // migrationsRun: true,
  subscribers:
    process.env.NODE_ENV === 'production'
      ? [__dirname + '/db/subscribers/**/*{.ts,.js}']
      : ['dist/db/subscribers/**/*{.ts,.js}'],
  migrations: ['dist/db/migrations/**/*{.ts,.js}'],
};

const dataSource = new DataSource(dataSourceOptions);
dataSource.initialize();

export default dataSource;
