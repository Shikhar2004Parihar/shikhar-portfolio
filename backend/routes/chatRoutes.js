const express = require("express");
const { GoogleGenAI } = require("@google/genai");

const router = express.Router();

let client;

router.post("/", async (req, res) => {
    try {
        const { message } = req.body;

        if (typeof message !== "string" || !message.trim()) {
            return res.status(400).json({
                message: "Message is required"
            });
        }

        if (!process.env.GEMINI_API_KEY) {
            return res.status(503).json({
                message: "AI chat is not configured. Please try again later."
            });
        }

        client ||= new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY
        });

        const prompt = `
You are the AI assistant for Shikhar Parihar's personal portfolio.

Your job is to answer questions about Shikhar's portfolio.

Name:
Shikhar Parihar

Profession:
MERN Full Stack Developer

Technologies:
- React.js
- JavaScript
- HTML
- CSS
- Node.js
- Express.js
- MongoDB
- Mongoose
- MERN Stack
- SQL Server
- REST APIs
- Git
- GitHub

Services:
- MERN development
- Full stack web development
- Ecommerce development
- API development
- Frontend development

Contact:
Visitors can use the contact form on the portfolio website
to contact Shikhar.

Rules:
1. Answer questions about Shikhar's portfolio.
2. Keep answers concise and professional.
3. Never invent experience, projects, clients, skills or qualifications.
4. If you don't have the information, say that the information
   is not available in the portfolio.
5. Do not claim to be Shikhar.
6. You are Shikhar's portfolio AI assistant.

Visitor's question:
${message.trim()}
`;

        let response;
        let lastError;

        // Try up to 3 times if Gemini is temporarily unavailable
        for (let attempt = 1; attempt <= 3; attempt++) {
            try {
                response = await client.models.generateContent({
                    model: "gemini-3.8-flash",
                    contents: prompt
                });

                break;
            } catch (error) {
                lastError = error;

                console.error(
                    `Gemini attempt ${attempt} failed:`,
                    error?.message || error
                );

                // Wait before retrying
                if (attempt < 3) {
                    await new Promise(resolve =>
                        setTimeout(resolve, attempt * 2000)
                    );
                }
            }
        }

        if (!response) {
            throw lastError;
        }

        res.json({
            reply: response.text
        });

    } catch (error) {
        console.error("Gemini Error:", error?.message || error);

        res.status(500).json({
            message: "Gemini is temporarily unavailable. Please try again in a moment."
        });
    }
});

module.exports = router;