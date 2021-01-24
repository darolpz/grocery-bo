import { User } from './model';
import bcrypt from 'bcrypt';
import { getRepository, UpdateResult } from 'typeorm';

export default class UserService {

  notAuthorizedError = new Error('Not authorized');
  userNotFoundError = new Error('User Not Found');

  async register(body: User): Promise<User> {
    try {
      const userRepository = getRepository(User);

      const user = new User();
      user.username = body.username;
      user.firstName = body.firstName;
      user.lastName = body.lastName;
      user.email = body.email;
      user.password = await this.hashPassword(body.password);

      await userRepository.manager.save(user);
      return user;
    } catch (err) {
      throw err;
    }
  }

  async login(username: string, password: string): Promise<User> {
    try {
      const userRepository = getRepository(User);

      const user = await userRepository.findOne({
        where: { username: username }
      });

      if (!user) {
        throw this.userNotFoundError;
      }
      const isEqual = await this.comparePassword(password, user.password);

      if (!isEqual) {
        throw this.notAuthorizedError;
      }
      return user;
    } catch (err) {
      throw err;
    }
  }

  async update(userID: number, body: any): Promise<UpdateResult> {
    try {
      const userRepository = getRepository(User);
      if (body.password) {
        delete body.password;
      }
      const updateResult = await userRepository.update({ 'id': userID }, body);
      return updateResult;

    } catch (err) {
      throw err;
    }
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
