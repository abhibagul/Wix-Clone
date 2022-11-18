//Will return the published webpage
import { getDbConnection } from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'bson';
export const pubWebPage = {
    path: '/api/PublishPage/',
    method: 'post',
    handler: async (req, res) => {

        //get auth header from client
        const { pageUri, websiteId } = req.body;

        try {
            const db = getDbConnection(process.env.API_DB_NAME);

            const result = await db.collection("web-pages").findOne({ "pageUri": '/' + pageUri, projectId: websiteId, published: true });
            // const webResult = await db.collection("websites").findOne({ "_id": ObjectId(websiteId) });

            res.status(200).json({ message: "WebPage Fetched", result })
        } catch (e) {
            res.status(500).json({ message: "Something went wrong" })
        }



    }
}