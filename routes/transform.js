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

        // Call Gemini (using gemini-3.6-flash for fast and reliable text tasks)
        const response = await ai.models.generateContent({
            model: 'gemini-3.6-flash',
            contents: prompt,
        });

        const resultText = response.text;

        // Render the index page back with the transformed result
        res.render('index', { resultText });
    } catch (error) {
        console.error('Error generating content:', error);
        res.render('index', { resultText: 'Sorry, something went wrong with the transformation.' });
    }
});

module.exports = router;