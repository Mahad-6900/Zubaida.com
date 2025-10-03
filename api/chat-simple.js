const { createGoogleGenerativeAI } = require("@ai-sdk/google");

const google = createGoogleGenerativeAI({
  apiKey: "AIzaSyBWIq-WBYCRwLb3mheAausKXGSRtOh9XLs",
});

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

async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    // Convert messages to the format expected by Google AI
    const conversationHistory = messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    // Add system prompt as the first message
    const systemMessage = {
      role: 'user',
      parts: [{ text: SYSTEM_PROMPT }]
    };

    const allMessages = [systemMessage, ...conversationHistory];

    // Generate response using Google AI
    const model = google('gemini-2.0-flash-exp');
    const result = await model.generateContent({
      contents: allMessages,
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
    });

    const response = result.response;
    const text = response.text();

    // Return the response as JSON
    res.json({ 
      success: true, 
      message: text,
      role: 'assistant'
    });

  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error',
      message: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment."
    });
  }
}

module.exports = handler;
