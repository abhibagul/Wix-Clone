import { getDbConnection } from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginRoute = {
    path: '/api/login',
    method: 'post',
    handler: async (req, res) => {
        const { email, password } = req.body;

        const db = getDbConnection(process.env.API_DB_NAME);

        const user = await db.collection('users').findOne({ email })

        if (!user) {
            res.sendStatus(401);
            return;
        }

        const { _id: id, isEmailVerified, passwordHash, apiVersion, username } = user;

        const isCorrect = await bcrypt.compare(password, passwordHash);

        if (isCorrect) {
            jwt.sign(
                {
                    id,
                    isEmailVerified,
                    email,
                    username,
                    apiVersion
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: process.env.API_LOGIN_PERIOD
                }, (err, token) => {
                    if (err) {
                        res.status(500).json(err);
                        return;
                    }

                    res.status(200).json({ token });
                }
            )
        } else {
            res.sendStatus(401);
        }

    }
}