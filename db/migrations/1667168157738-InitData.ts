import { MigrationInterface, QueryRunner } from 'typeorm';
import { Tag } from 'src/products/db/tag.entity';
import dataSource from 'db/data-source';

export class InitData1667168157738 implements MigrationInterface {
  public async up(): Promise<void> {
    this.saveTags();
  }

  private async saveTags(): Promise<Tag[]> {
    const tagsArr: Tag[] = [];
    const tags = [
      {
        name: 'NEW',
      },
      {
        name: 'PROMO',
      },
      {
        name: 'LAST_ITEMS',
      },
    ];

    for (const tag of tags) {
      const tagToSave = new Tag();
      tagToSave.name = tag.name;
      tagsArr.push(await dataSource.getRepository(Tag).save(tagToSave));
    }

    console.log('Tags saved');

    return tagsArr;
  }

  public async down(queryRunner: QueryRunner): Promise<void> {} // eslint-disable-line
}
