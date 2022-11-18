import { getDbConnection } from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'bson';
export const getWebPage = {
    path: '/api/getWebPage/',
    method: 'post',
    handler: async (req, res) => {

        //get auth header from client
        const { authorization } = req.headers;
        const { id, pageId, websiteId } = req.body;


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
                    return res.status(403).json({ message: "Does not have privilage to modify page" });
                }

                try {

                    const db = getDbConnection(process.env.API_DB_NAME);

                    const result = await db.collection("web-pages").findOne({ "_id": ObjectId(pageId) });
                    const webResult = await db.collection("websites").findOne({ "_id": ObjectId(websiteId) });

                    res.status(200).json({ message: "WebPage Fetched", result, webResult })
                } catch (e) {
                    res.status(500).json({ message: "Something went wrong" })
                }

            }
        )


    }
}