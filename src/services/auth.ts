import argon2 from 'argon2';
import { UserModel } from '../models/users';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { mongo } from 'mongoose';
import { UnauthorizedError, UserAlreadyExistsError } from '../apperrors';

export interface TokenPayload {
  sub: string;     // the user's _id
  email: string;
}

export interface PublicUser {
  _id: string;
  name: string;
  email: string;
}

const hashOptions = {
  type: argon2.argon2id,
  memoryCost: 19456,
  timeCost: 2,
  parallelism: 1,
} as const;

export class AuthService {
    async register(name: string, email: string, password: string): Promise<PublicUser> {
    const passwordHash = await argon2.hash(password, hashOptions);
    try {
      const user = await UserModel.create({ name, email, passwordHash });
      return { _id: user._id.toString(), name: user.name, email: user.email };
    } catch (error) {
      if (error instanceof mongo.MongoServerError && error.code === 11000) {
        throw new UserAlreadyExistsError();
      }
      throw error;
    }
  }
  
  createToken(payload: TokenPayload): string {
    return jwt.sign(payload, env.jwtSecret, {
      algorithm: 'HS256',
      expiresIn: env.jwtExpiresIn as jwt.SignOptions['expiresIn'],
    });
  }

  verifyToken(token: string): TokenPayload {
    return jwt.verify(token, env.jwtSecret, { algorithms: ['HS256'] }) as TokenPayload;
  }

  async login(email: string, password: string): Promise<string> {
    const user = await UserModel.findOne({ email }).select('+passwordHash');
    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }
    const valid = await argon2.verify(user.passwordHash, password);
    if (!valid) throw new UnauthorizedError("Invalid email or password");
    if (argon2.needsRehash(user.passwordHash, hashOptions)) {
      user.passwordHash = await argon2.hash(password, hashOptions);
      await user.save();
    }
    return this.createToken({ sub: user._id.toString(), email: user.email });
  }
  
  async getUserById(id: string): Promise<PublicUser> {
    const user = await UserModel.findById(id).lean();
    if (!user) throw new UnauthorizedError('User not found');
    return { _id: user._id.toString(), name: user.name, email: user.email };
  }
}