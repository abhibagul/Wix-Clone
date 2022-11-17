import { getDbConnection } from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export const saveWebPage = {
    path: '/api/save-webpage/',
    method: 'post',
    handler: async (req, res) => {

        //get auth header from client
        const { authorization } = req.headers;
        const { id, pageId, pageJso } = req.body;

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
                    return res.status(403).json({ message: "Does not have privilage to modify website" });
                }

                const db = getDbConnection(process.env.API_DB_NAME);
                const result = await db.collection("web-pages").findOneAndUpdate(
                    {
                        "_id": ObjectId(pageId)
                    },
                    { $set: { ...pageJso } },
                    { returnOriginal: false }
                );

                // console.log(result)

                res.status(200).json({ message: "Website updated" })

            }
        )


    }
}