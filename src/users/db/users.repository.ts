import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import {
  Repository,
  DataSource,
  Between,
  Equal,
  FindManyOptions,
  LessThan,
  Like,
  MoreThan,
  FindOptionsWhere,
  In,
} from 'typeorm';
import { UsersQuery } from '../queries/users-query.interface';
import { TextFilterType } from 'src/shared/enums/text-filter.enum';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  getUserByEmail(email: string): Promise<User> {
    return this.findOne({ where: { email } });
  }

  private buildPredicate(query: UsersQuery): FindManyOptions<User> {
    const predicate: FindOptionsWhere<User> = {};

    if (query.dateOfBirthBefore && query.dateOfBirthAfter) {
      predicate.dateOfBirth = Between(
        new Date(query.dateOfBirthBefore),
        new Date(query.dateOfBirthAfter),
      );
    } else if (query.dateOfBirthBefore) {
      predicate.dateOfBirth = MoreThan(new Date(query.dateOfBirthBefore));
    } else if (query.dateOfBirthAfter) {
      predicate.dateOfBirth = LessThan(new Date(query.dateOfBirthAfter));
    }

    if (query.firstName && query.nameFilterType === TextFilterType.CONTAINS) {
      predicate.firstName = Like(`%${query.firstName}%`);
    } else if (query.firstName) {
      predicate.firstName = Equal(query.firstName);
    }

    if (query.lastName && query.nameFilterType === TextFilterType.CONTAINS) {
      predicate.lastName = Like(`%${query.lastName}%`);
    } else if (query.lastName) {
      predicate.lastName = Equal(query.lastName);
    }

    if (query.email && query.nameFilterType === TextFilterType.CONTAINS) {
      predicate.email = Like(`%${query.email}%`);
    } else if (query.email) {
      predicate.email = Equal(query.email);
    }

    if (query.role) {
      predicate.role = Equal(In([query.role]));
    }

    const findManyOptions: FindManyOptions<User> = {
      where: predicate,
    };

    findManyOptions.order = {
      [query.sortField || 'createdAt']: query.orderDirection || 'ASC',
    };

    return findManyOptions;
  }

  findAll(_query_: UsersQuery): Promise<User[]> {
    return this.find(this.buildPredicate(_query_));
  }
}
