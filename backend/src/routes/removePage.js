import { getDbConnection } from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export const removeWebPage = {
    path: '/api/remove-webpage/',
    method: 'post',
    handler: async (req, res) => {

        //get auth header from client
        const { authorization } = req.headers;
        const { id, pageId, webId } = req.body;

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
                const delpage = await db.collection("web-pages").findOne({

                    "_id": ObjectId(pageId)

                })

                // console.log(delpage);

                const result = await db.collection("web-pages").deleteOne(
                    {
                        "_id": ObjectId(pageId)
                    },
                    { returnOriginal: true }
                );

                // console.log(result);

                // console.log({ pages: { pageId: ObjectId(pageId), pageName: delpage.pageName } })
                //update the website json

                const webResult = await db.collection("websites").findOneAndUpdate(
                    {
                        "_id": ObjectId(webId)
                    },
                    { $pull: { pages: { pageId: ObjectId(pageId), pageName: delpage.pageName } } },
                    { returnOriginal: false }
                );

                const firstProjectPage = await db.collection("websites").findOne({ "_id": ObjectId(webId) });

                let { pages } = firstProjectPage;

                // console.log(webResult);

                res.status(200).json({ message: "Website deleted", pageId: pages[0].pageId })

            }
        )


    }
}