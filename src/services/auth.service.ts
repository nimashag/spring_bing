import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User, IUser } from '../models/user.model'
import { JWT_SECRET } from '../constants/jwt.secret.constant';

export class AuthService {
    static async signup(userData: IUser) {
        const existingUser = await User.findOne({email: userData.email});
        if ( existingUser) {
            throw new Error('Email already in use');
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const newUSer = new User({ ...userData, password: hashedPassword});
        return newUSer.save();
    }

    static async login({email, password }: {email: string, password: string }) {
        const user = await User.findOne({email});
        if ( !user || !( await bcrypt.compare(password,user.password))) {
            throw new Error ('Invalid credentials');
        }

        const token = jwt.sign({ id: user._id}, JWT_SECRET , {expiresIn: '23h'})
        return token;
    }
}