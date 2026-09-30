const express = require('express');
const OpenAI = require('openai');

const router = express.Router();

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

router.post('/', async (req, res) => {

    try {

        const { message } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({
                message: 'Message is required'
            });
        }

        const response = await client.responses.create({
            model: 'gpt-5-mini',

            instructions: `
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
            `,

            input: message
        });

        res.json({
            reply: response.output_text
        });

    } catch (error) {

        const quotaExhausted = error?.code === 'credit_balance_exhausted'
            || error?.type === 'insufficient_quota';

        console.error('OpenAI Error:', error?.message || error);

        res.status(quotaExhausted ? 429 : 500).json({
            message: quotaExhausted
                ? 'OpenAI API credits are exhausted. Add credits to your OpenAI account and try again.'
                : 'AI request failed. Please try again later.'
        });
    }
});

module.exports = router;