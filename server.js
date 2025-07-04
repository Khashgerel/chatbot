import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const token = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.github.ai/inference";
const modelName = "openai/gpt-4o";

const client = new OpenAI({ baseURL: endpoint, apiKey: token });

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await client.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful and assistant." },
        { role: "user", content: userMessage }
      ],
      temperature: 1.0,
      top_p: 1.0,
      max_tokens: 1000,
      model: modelName
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error("Error from OpenAI:", error);
    res.status(500).json({ error: "Failed to fetch response" });
  }
});

app.listen(3000, () => console.log("Server started on http://localhost:3000"));
