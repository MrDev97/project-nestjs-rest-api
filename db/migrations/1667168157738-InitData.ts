import { MigrationInterface, QueryRunner } from 'typeorm';
import { Tag } from 'src/products/db/tag.entity';
import { Product } from 'src/products/db/product.entity';
import dataSource from 'db/data-source';
import { faker } from '@faker-js/faker';
import { UserAddress } from 'src/users/db/userAddress.entity';
import { User } from 'src/users/db/users.entity';

export class InitData1667168157738 implements MigrationInterface {
  public async up(): Promise<void> {
    const tags = await this.saveTags();
    await this.saveProducts(tags);
    const userAddresses = await this.saveUserAddresses();
    await this.saveUsers(userAddresses);
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

    for (let i = 0; i < 250; i++) {
      const product = {
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.datatype.number({ precision: 0.01 }),
        count: faker.datatype.number(100),
        tags: await this.randomTags(tags),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
        orderedProducts: null,
      };
      products.push(product);
    }

    await dataSource.getRepository(Product).save(products);

    console.log('Products saved');
  }

  private async saveUserAddresses(): Promise<UserAddress[]> {
    const usrAdd: UserAddress[] = [];

    for (let i = 0; i < 1000; i++) {
      const addressToSave = new UserAddress();
      (addressToSave.id = faker.datatype.uuid()),
        (addressToSave.country = faker.address.countryCode()),
        (addressToSave.city = faker.address.city()),
        (addressToSave.street = faker.address.street()),
        (addressToSave.houseNo = faker.datatype.number()),
        (addressToSave.apartmentNo = faker.datatype.number()),
        usrAdd.push(
          await dataSource.getRepository(UserAddress).save(addressToSave),
        );
    }

    console.log('User Adresses saved');

    return usrAdd;
  }

  private async randomAddresses(
    addresses: UserAddress[],
  ): Promise<UserAddress[]> {
    const opt = Math.floor(Math.random() * 4);

    const addressesArr: UserAddress[] = [];

    for (let i = 0; i < opt; i++) {
      const address = addresses[Math.floor(Math.random() * addresses.length)];

      const occupied = await dataSource.getRepository(UserAddress).find({
        where: {
          id: address.id,
        },
      });

      if (!occupied) {
        addressesArr.push(address);
      }
    }
    console.log(addressesArr);

    return addressesArr;
  }

  private async saveUsers(addresses: UserAddress[]): Promise<void> {
    const usrs = [];

    for (let i = 0; i < 750; i++) {
      const usr = {
        userId: faker.datatype.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        dateOfBirth: faker.date.past(),
        role: faker.helpers.arrayElement(['ADMIN', 'CUSTOMER', 'SELLER']),
        address: await this.randomAddresses(addresses),
      };
      usrs.push(usr);
    }

    await dataSource.getRepository(User).save(usrs);

    console.log('Users saved');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {} // eslint-disable-line
}
