import { Container, Service } from "typedi";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import config from "@/config";
import { randomBytes } from "crypto";
import { IUser, IUserInputDTO } from "@/interfaces/IUser";
import { EventDispatcher } from 'event-dispatch';
import events from "@/subscribers/events";

@Service()
export default class AuthService {
  private userModel: Models.UserModel;
  private blacklistedTokenModel: Models.BlacklistedTokenModel;
  private eventDispatcher: EventDispatcher;

  constructor(
  ) {
    this.userModel = Container.get("userModel");
    this.blacklistedTokenModel = Container.get("blacklistedTokenModel");
    this.eventDispatcher = Container.get("eventDispatcher");
  }

  public async register(
    userInput: IUserInputDTO,
  ): Promise<{ user: IUser; token: string }> {
    try {
      // Verificar que el userModel existe
      if (!this.userModel) {
        throw new Error("User model not properly injected");
      }

      const salt = randomBytes(32);
      const hashedPassword = await argon2.hash(userInput.password, { salt });
      const userRecord = await this.userModel.create({
        ...userInput,
        password: hashedPassword,
        salt: salt.toString("hex"),
      });

      if (!userRecord) {
        throw new Error("User cannot be created");
      }

      const token = this.generateToken(userRecord);

      // Emitir evento de usuario registrado
      setImmediate(() => {
        this.eventDispatcher.dispatch(events.user.register, userRecord._id);
      });

      return { user: userRecord, token };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Registration failed: ${error.message}`);
      }
      throw new Error("Registration failed: Unknown error");
    }
  }

  public async login(
    email: string,
    password: string,
  ): Promise<{ user: IUser; token: string }> {
    try {
      const userRecord = await this.userModel.findOne({
        email,
        isActive: true,
      });
      if (!userRecord) {
        throw new Error("User not found");
      }

      const validPassword = await argon2.verify(userRecord.password, password);
      if (!validPassword) {
        throw new Error("Invalid password");
      }

      // Emitir evento de usuario autenticado
      setImmediate(() => {
        this.eventDispatcher.dispatch(events.user.login, userRecord._id);
      });

      const token = this.generateToken(userRecord);
      return { user: userRecord, token };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Login failed: ${error.message}`);
      }
      throw new Error("Login failed: Unknown error");
    }
  }

  public async logout(token: string, userId: string): Promise<void> {
    try {
      await this.blacklistedTokenModel.create({
        token,
      });

      // Emitir evento de usuario desconectado
      setImmediate(() => {
        this.eventDispatcher.dispatch(events.user.logout, userId);
      });
      
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Logout failed: ${error.message}`);
      }
      throw new Error("Logout failed: Unknown error");
    }
  }

  private generateToken(user: IUser): string {
    const today = new Date();
    const exp = new Date(today);
    // exp.setDate(today.getDate() + 60);
    exp.setHours(today.getHours() + 24); // Token expires in 24 hours

    return jwt.sign(
      {
        _id: user._id,
        name: user.name,
        exp: exp.getTime() / 1000,
      },
      config.jwtSecret,
    );
  }
}
