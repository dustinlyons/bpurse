import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';
import pkg from '@prisma/client';

const prisma = new pkg.PrismaClient();

async function main() {
  let numberOfUsers = 0;

  while (numberOfUsers < 10) {
    await prisma.user.create({
      data: {
        email: faker.internet.email(),
        name: faker.internet.userName(),
        type: faker.random.arrayElement(['USER', 'MANAGER', 'ACCOUNTANT']),
        password: bcrypt.hashSync('123456', 10)
      }
    });
    numberOfUsers++;
  }
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
