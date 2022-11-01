import { MigrationInterface, QueryRunner } from 'typeorm';
import { Tag } from 'src/products/db/tag.entity';
import { Product } from 'src/products/db/product.entity';
import dataSource from 'db/data-source';
import { faker } from '@faker-js/faker';

export class InitData1667168157738 implements MigrationInterface {
  public async up(): Promise<void> {
    const tags = await this.saveTags();
    await this.saveProducts(tags);
  }

  private async saveTags(): Promise<Tag[]> {
    const tagsArr: Tag[] = [];
    const tags = [{ name: 'NEW' }, { name: 'PROMO' }, { name: 'LAST_ITEMS' }];

    for (const tag of tags) {
      const tagToSave = new Tag();
      tagToSave.name = tag.name;
      tagsArr.push(await dataSource.getRepository(Tag).save(tagToSave));
    }

    console.log('Tags saved');

    return tagsArr;
  }

  private async randomTags(tags: Tag[]): Promise<Tag[]> {
    const opt = Math.floor(Math.random() * tags.length);
    const tagArr: Tag[] = [];

    for (let i = 0; i < opt; i++) {
      const tag = tags[Math.floor(Math.random() * tags.length)];
      if (!tagArr.includes(tag)) {
        tagArr.push(tag);
      }
    }

    console.log(tagArr);

    return tagArr;
  }

  private async saveProducts(tags: Tag[]): Promise<void> {
    const products: Product[] = [];

    for (let i = 0; i < 10; i++) {
      const product = {
        productId: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.datatype.number({ precision: 0.01 }),
        count: faker.datatype.number(100),
        tags: await this.randomTags(tags),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      };
      products.push(product);
    }

    await dataSource.getRepository(Product).save(products);

    console.log('Products saved');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {} // eslint-disable-line
}
