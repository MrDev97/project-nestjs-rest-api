import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';
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
} from 'typeorm';
import { ProductsQuery } from '../queries/products-query.interface';
import { TextFilterType } from 'src/shared/enums/text-filter.enum';

@Injectable()
export class ProductRepository extends Repository<Product> {
  constructor(private dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }

  private buildPredicate(query: ProductsQuery): FindManyOptions<Product> {
    const predicate: FindOptionsWhere<Product> = {};

    if (query.maxPrice && query.minPrice) {
      predicate.price = Between(query.minPrice, query.maxPrice);
    } else if (query.minPrice) {
      predicate.price = MoreThan(query.minPrice);
    } else if (query.maxPrice) {
      predicate.price = LessThan(query.maxPrice);
    }

    if (query.name && query.nameFilterType === TextFilterType.CONTAINS) {
      predicate.name = Like(`%${query.name}%`);
    } else if (query.name) {
      predicate.name = Equal(query.name);
    }

    if (query.minCount && query.maxCount) {
      predicate.count = Between(query.minCount, query.maxCount);
    } else if (query.minCount) {
      predicate.count = MoreThan(query.minCount);
    } else if (query.maxCount) {
      predicate.count = LessThan(query.maxCount);
    }

    const findManyOptions: FindManyOptions<Product> = {
      where: predicate,
    };

    findManyOptions.order = {
      [query.sortField || 'createdAt']: query.orderDirection || 'ASC',
    };

    return findManyOptions;
  }

  findAll(_query_: ProductsQuery): Promise<Product[]> {
    return this.find(this.buildPredicate(_query_));
  }
}
