import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
    static async signup(req: Request, res: Response) {
        try {
            const user = await AuthService.signup(req.body);
            res.status(201).json(user);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(400).json({ error: 'An unexpected error occurred' });
            }
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const token = await AuthService.login(req.body);
            res.status(200).json({ token });
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(400).json({ error: 'An unexpected error occurred' });
            }
        }
    }
}
