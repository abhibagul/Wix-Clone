import { getDbConnection } from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const getUserProject = {
    path: '/api/my-projects/',
    method: 'post',
    handler: async (req, res) => {

        //get auth header from client
        const { authorization } = req.headers;
        let { id, pageNum, perPage } = req.body;

        pageNum = +pageNum;
        perPage = +perPage;


        let start = (pageNum * perPage) - perPage;
        let end = +perPage;

        if (!authorization) {
            return res.status(401).json({ message: "No Authorization header sent." })
        }

        // bearer [Token] <=== need this
        const token = authorization.split(" ")[1];

        jwt.verify(
            token,
            process.env.JWT_SECRET,
            async (err, decoded) => {
                if (err) return res.status(401).json({ message: "Unable to verify user" });

                const { id: _id } = decoded;

                if (id !== _id) {
                    return res.status(403).json({ message: "Does not have privilage to view projects" });
                }

                const db = getDbConnection(process.env.API_DB_NAME);
                const result = await db.collection("websites").find({ author: id }).limit(end).skip(start).toArray();

                res.status(200).json({ message: "Projects Fetched", result })

            }
        )


    }
}