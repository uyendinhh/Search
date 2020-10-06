import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { search } from "./search.js";

// Setup
const app = express();
const debug = false;
const port = 3001;

// CORS for client-side
app.use(cors());
app.options("*", cors());

// Json payload parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Start the server
const server = app.listen(port);
server
    .on("listening", () => {
        const address = server.address(),
            bind =
            typeof address === "string" ?
            `pipe ${address}` :
            `port ${address.port}`;
        console.info(`Listening on ${bind}`);
    })
    .on("error", (error) => {
        if (error.syscall !== "listen") {
            throw error;
        }

        // Handle specific listen errors with friendly messages
        switch (error.code) {
            case "EACCES":
                console.error(`${port} requires elevated privileges`);
                process.exit(1);
                break;
            case "EADDRINUSE":
                console.error(`${port} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    })
    .on("SIGINT", () => server.close())
    .on("close", () => {
        // All cleanup tasks
        const cleanupTasks = [() => connection().close()];

        // Run all cleanup tasks but make sure
        // they don't prevent shutdown
        cleanupTasks.forEach((task) => {
            try {
                task();
            } catch (error) {
                console.error(`Error cleaning up!`, error);
            }
        });

        process.exit(0);
    });

app.get("/", (req, res) => {
    res.send("App is running");
});

app.get("/search", (req, res) => {
    const { query } = req.query;
    if (!!query) {
        const result = search(query.split(" "));
        result.then((data) => {
            res.send(data);
        });
    }
});