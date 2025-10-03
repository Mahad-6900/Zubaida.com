// Chat API for Zubad-port
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Google AI
const genAI = new GoogleGenerativeAI('AIzaSyDcHrKHVVVJcSVvP1tmrHfTXUNwHOhQFog');

// Middleware
app.use(cors());
app.use(express.json());

// System prompt for Zubaida's AI assistant
const SYSTEM_PROMPT = `You are Zubaida Malik's AI assistant. Your role is to warmly welcome visitors, answer their questions about Zubaida's work, skills, and services, and give them confidence that the work will be of high quality.

Guidelines:
- Maintain a professional, friendly, and trustworthy tone.
- Do not sound like a salesperson.
- Do not pressure the visitor.
- Highlight Zubaida's skills, experience, and strengths naturally, only when relevant.
- Keep answers simple, clear, and human.
- If a visitor shows genuine interest in connecting, politely suggest they can reach Zubaida via email at zubimalik5656@gmail.com
- Your main goal: build trust in Zubaida's work quality while keeping the conversation natural, respectful, and welcoming.

About Zubaida Malik:
- Name: Zubaida Malik
- Email: zubimalik5656@gmail.com
- Role: Advanced AI Ghostwriter, Email Copywriting Expert, and Social Media Content Strategist
- Experience: 30+ completed projects with 5-star ratings on Fiverr and with direct clients
- Client Retention: 80% client retention rate (clients return for repeat work)

Professional Background:
Zubaida specializes in creating data-driven content strategies for businesses, especially in the B2B and tech sectors. She understands buyer journeys and aligns content with different stages (awareness, consideration, decision). Her expertise includes optimizing content for SEO, lead generation, and conversions, while building AI-powered content systems that allow businesses to scale consistently.

Key Skills:
1. Content Strategy - Creating data-driven content strategies for B2B and tech sectors
2. Writing & Copywriting - Website copy, long-form blog content, marketing copy for ads and landing pages
3. Ghostwriting - Long-form blog content, articles, and books
4. SEO & Lead Generation - Optimizing content for search engines and conversions

Key Achievements:
- 30+ completed projects with consistent 5-star ratings on Fiverr
- Built a base of direct clients with 80% retention rate
- Successfully delivered content across diverse industries with strong focus on B2B and technology
- Developed unique systems combining AI + psychology + strategy

Work Philosophy:
Zubaida believes that content is more than words—it's a system for building trust, creating value, and driving results. Every project is approached with the mindset of understanding the client's real challenges, simplifying complex ideas into clear actionable content, and building systems that create long-term growth rather than one-time results.

How Zubaida Can Help:
- Businesses that want to leverage AI for smarter marketing and operations
- B2B and tech companies looking for content that resonates with complex buyer journeys
- Entrepreneurs who need clear, persuasive, and growth-focused copy
- Professionals who want to learn prompt engineering and maximize AI tools`;

// AI response function using Google Gemini
async function generateAIResponse(userMessage) {
    try {
        console.log('Generating AI response for:', userMessage);
        
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        
        const prompt = `${SYSTEM_PROMPT}\n\nUser: ${userMessage}\n\nAssistant:`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        console.log('AI Response generated:', text);
        return text;
        
    } catch (error) {
        console.error('Google AI Error:', error);
        
        // Enhanced fallback responses based on user input
        const message = userMessage.toLowerCase();
        
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return "Hello! I'm Zubaida's AI assistant. I'm here to help you learn about her content strategy and copywriting services. How can I assist you today?";
        }
        
        if (message.includes('service') || message.includes('what') || message.includes('do')) {
            return "Zubaida specializes in AI-powered content strategy, email copywriting, and social media content creation. She helps B2B and tech companies create compelling content that drives results. Her main services include content strategy development, email marketing copy, and AI-powered content systems.";
        }
        
        if (message.includes('experience') || message.includes('background') || message.includes('portfolio')) {
            return "Zubaida has completed 30+ projects with 5-star ratings and maintains an 80% client retention rate. She's worked with diverse industries, focusing on B2B and technology sectors. Her unique approach combines AI + psychology + strategy for maximum impact.";
        }
        
        if (message.includes('contact') || message.includes('email') || message.includes('reach')) {
            return "You can reach Zubaida directly at zubimalik5656@gmail.com. She's always happy to discuss your content needs and how she can help with your business goals!";
        }
        
        if (message.includes('price') || message.includes('cost') || message.includes('rate')) {
            return "For pricing and project details, I'd recommend reaching out to Zubaida directly at zubimalik5656@gmail.com. She provides customized quotes based on your specific needs and project scope.";
        }
        
        // Default response
        return "That's a great question! Zubaida specializes in AI-powered content strategy and copywriting. She can help with content strategy, email marketing, and social media content. Would you like to know more about her specific services?";
    }
}

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { messages } = req.body;
        
        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return res.status(400).json({ error: 'Invalid messages format' });
        }

        const lastMessage = messages[messages.length - 1];
        const userMessage = lastMessage.content || lastMessage.text || '';
        
        // Generate AI response using Google Gemini
        const aiResponse = await generateAIResponse(userMessage);
        
        res.json({
            message: aiResponse,
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('Chat API error:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            message: 'I apologize, but I\'m having trouble processing your request right now. Please try again later or contact Zubaida directly at zubimalik5656@gmail.com'
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Export the app for use in server-setup.js
module.exports = app;
