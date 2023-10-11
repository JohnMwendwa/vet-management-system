import { faker } from "@faker-js/faker";

import User, { UserProps } from "../models/User";
import connectDB from "../connection";

const generateUsers = async (num: number) => {
  await connectDB();

  const users: Omit<UserProps, "_id">[] = [];

  for (let i = 0; i < num; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const password = faker.string.uuid();
    const email = faker.internet.email({ firstName, lastName });
    const createdAt = faker.date.past();
    const updatedAt = faker.date.past();
    const role = faker.helpers.arrayElement(["doctor", "client", "nurse"]);

    users.push({
      firstName,
      lastName,
      role,
      password,
      email,
      createdAt,
      updatedAt,
    });
  }

  await User.insertMany(users);
};

export default generateUsers;
