import { Container, Service } from "typedi";
import jwt from "jsonwebtoken";
import argon2 from 'argon2';
import config from "@/config";
import { randomBytes } from "crypto";
import { IUser, IUserInputDTO } from "@/interfaces/IUser";



@Service()
export default class AuthService {
  private userModel: Models.UserModel;

  constructor() {
    this.userModel = Container.get('userModel');
  }

  public async register(userInput: IUserInputDTO): Promise<{ user: IUser, token: string }> {
    try {
      // Verificar que el userModel existe
      if (!this.userModel) {
        throw new Error('User model not properly injected');
      }
      
      const salt = randomBytes(32);
      const hashedPassword = await argon2.hash(userInput.password, { salt });
      const userRecord = await this.userModel.create({
        ...userInput,
        password: hashedPassword,
        salt: salt.toString('hex'),
      });

      if (!userRecord) {
        throw new Error('User cannot be created');
      }

      const token = this.generateToken(userRecord);
      
      return { user: userRecord, token };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Registration failed: ${error.message}`);
      }
      throw new Error('Registration failed: Unknown error');
    }
  }

  private generateToken(user: IUser): string {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign(
      {
        _id: user._id,
        name: user.name,
        exp: exp.getTime() / 1000,
      },
      config.jwtSecret
    );
  }
}