// server.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Put your API key in env variable

app.post('/api/ask', async (req, res) => {
  const prompt = req.body.prompt;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const openAIRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${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}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!openAIRes.ok) {
      const err = await openAIRes.text();
      return res.status(500).json({ error: 'OpenAI API error: ' + err });
    }

    const data = await openAIRes.json();

    // Replace "ChatGPT" with "Hassaan AI" in the response text (case-insensitive)
    let answer = data.choices[0].message.content;
    answer = answer.replace(/chatgpt/gi, 'Hassaan AI');

    res.json({ response: answer });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Hassaan AI backend listening at http://localhost:${port}`);
});
