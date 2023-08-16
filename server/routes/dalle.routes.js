import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

//returns an instance of a router object
//that can be used to defince routes for specific paths
//allows us to create modular route handlers
const router = express.Router();

//used to configure the OpenAI client
//check api key for authenticationg requests to the OpenA API
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
//creating new instance of OpenAIAPI
const openai = new OpenAIApi(config);
router.route("/").get((req, res) => {
  res.status(200).json({ message: "Hello from DALL.E ROUTES" });
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log("Prompt:", prompt);
    //using createimage method to generateimage
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });
    const image = response.data.data[0].b64_json;
    res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
