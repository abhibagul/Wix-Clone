import express from 'express';
import { routes } from './routes/index.js';
import { initializeDbConnection } from './db.js';

const PORT = process.env.PORT || 8080;

const app = express();

// This allows us to access the body of POST/PUT
// requests in our route handlers (as req.body)
app.use(express.json());

// Add all the routes to our Express server
// exported from routes/index.js
routes.forEach(route => {
    app[route.method](route.path, route.handler);
});

// Connect to the database, then start the server.
// This prevents us from having to create a new DB
// connection for every request.
initializeDbConnection()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    });