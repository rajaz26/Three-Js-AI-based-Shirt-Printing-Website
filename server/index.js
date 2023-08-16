import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import dalleRoutes from "./routes/dalle.routes.js";

//loading environment variables from the env folder
//into this node js application
dotenv.config();

const app = express();

//adds cors middleware to express application
//this will enable cors support in the application
app.use(cors());

//adds express.json middleware to express application
//this will it to parse incoming requests
// app.use(express.json({ limig: "50mb" }));
app.use(express.json({ limit: "50mb" }));

//This line specifies that any request coming to
//this url will be handelled by dalleRoutes
app.use("/api/v1/dalle", dalleRoutes);

//route handler for get request to root path('/')
//whenever client will make a get request from home
//specified implementation will be performed
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from DALL.E" });
});

app.listen(8080, () => console.log("Server has started on port 8080"));
