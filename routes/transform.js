const express = require('express');
const router = express.Router();
const { GoogleGenAI } = require('@google/genai');

// Initialize the Google Gen AI SDK using your environment variable
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

router.post('/', async (req, res) => {
    try {
        const { inputText, instruction } = req.body;

        // Construct a clear prompt for the model
        const prompt = `Transform the following text based on this instruction: "${instruction}".\n\nText:\n${inputText}`;

        // Call Gemini (using gemini-3.6-flash)
        const response = await ai.models.generateContent({
            model: 'gemini-3.5-flash',
            contents: prompt,
        });

        const resultText = response.text;

        // Render index page with both the result and your typed text
        res.render('index', { 
            resultText: resultText,
            inputText: inputText 
        });
    } catch (error) {
        console.error('Error generating content:', error);
        res.render('index', { 
            resultText: 'Sorry, something went wrong with the transformation.',
            inputText: req.body.inputText 
        });
    }
});

module.exports = router;