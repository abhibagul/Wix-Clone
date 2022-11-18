import { getDbConnection } from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export const newPage = {
    path: '/api/new-webpage/',
    method: 'put',
    handler: async (req, res) => {

        //get auth header from client
        const { authorization } = req.headers;
        const { id, pageName, pageUri, webId } = req.body;

        console.log(id, pageName, pageUri, webId)

        //initial index page
        const indexPage = {
            projectId: webId,
            pageUri: "/" + pageUri.toLowerCase(),
            pageName: pageName,
            projectAuthor: id,
            websiteSetting: {
                siteName: pageName,
                favIco: "https://reactjs.org/favicon.ico",
                socialImage: "",
                desc: "This is a " + pageName
            },
            published: false,
            pageMode: 1,
            settigMode: -1,
            isDropEnabled: true,
            analyticsID: "",
            dropIndex: 0,
            fonts: [{
                "font": "Poppins",
                "weights": [
                    "300",
                    "regular",
                    "700"
                ]
            }],
            elements: []
        }



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
                    return res.status(403).json({ message: "Does not have privilage to create website" });
                }

                const db = getDbConnection(process.env.API_DB_NAME);

                //check if page exists on the sam uri
                const pagebyURi = await db.collection("web-pages").find({ projectAuthor: id, projectId: webId, pageUri: '/' + pageUri }).count();

                if (pagebyURi > 0) {
                    return res.status(409).json({ message: "Page on same uri already exist" });
                }

                const result = await db.collection("web-pages").insertOne(indexPage);

                //now add above page to the new website project
                const { insertedId: pageId } = result;



                const website = await db.collection("websites").findOneAndUpdate(
                    {
                        "_id": ObjectId(webId)
                    },
                    { $push: { pages: { pageId, pageName } } },
                    { returnOriginal: false }
                );



                res.status(200).json({ message: "WebPage created", pageId, webId })

            }
        )


    }
}