require('dotenv').config(); 
const { GoogleGenerativeAI } = require("@google/generative-ai");

const gemini_api_key = process.env.GEMINI_API_KEY; 
const genAI = new GoogleGenerativeAI(gemini_api_key);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

module.exports = model; 