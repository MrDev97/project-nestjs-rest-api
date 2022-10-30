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
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: false,
  dropSchema: false,
  migrationsRun: true,
  migrations: ['dist/db/migrations/**/*{.ts,.js}'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
