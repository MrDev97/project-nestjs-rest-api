import * as dotenv from 'dotenv';
dotenv.config();

export = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: `${process.env.MYSQL_PASSWORD}`,
  database: 'shop',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
  dropSchema: true,
};
