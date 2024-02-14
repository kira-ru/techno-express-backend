import {Roles, UserDTO} from '@/controllers/user/user.controller.ts';
import {User} from '@/models/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import process from 'process';
import {Model} from 'sequelize';

class UserService {
  public async registration(email: string, password: string, role: Roles): Promise<{model: Model<UserDTO>, token?: string}> {
    const candidate = await User.findOne({ where: { email } });
    if (candidate) return { model: candidate };
    const hashPassword = await this.passwordHash(password);
    const user = await User.create({
      email,
      role,
      password: hashPassword
    });
    const token = this.generateUserToken((user as unknown as UserDTO).id, email, role);
    return {model: user, token};
  }

  private async passwordHash(password: string): Promise<string> {
    return await bcrypt.hash(password, 5);
  }

  private generateUserToken(id: string, email: string, role: Roles): string {
    return jwt.sign(
        {
          id,
          email,
          role
        },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    );
  }
}

export default new UserService();
