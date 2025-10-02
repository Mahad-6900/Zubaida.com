# Backend CORS Fix Guide

## 🚨 Issue: OPTIONS Method Not Allowed

The error you're seeing indicates that your backend doesn't handle CORS preflight requests properly:

```
INFO: 127.0.0.1:55649 - "OPTIONS /api/chat HTTP/1.1" 405 Method Not Allowed
```

## 🔧 Solution: Add CORS Support to Your Backend

### If using FastAPI (Python):

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import json

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your domain
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

@app.post("/api/chat")
async def chat_endpoint(request: dict):
    messages = request.get("messages", [])
    
    def generate_response():
        # Your AI response logic here
        response_text = "Hi there! Welcome. How can I help you today?\n"
        
        # Stream the response in chunks
        for chunk in response_text.split():
            yield f'data: {json.dumps({"type": "text-delta", "textDelta": chunk + " "})}\n\n'
        
        # Send finish signal
        yield f'data: {json.dumps({"type": "finish", "finishReason": "stop"})}\n\n'
    
    return StreamingResponse(
        generate_response(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Access-Control-Allow-Origin": "*",
        }
    )

# Handle OPTIONS requests explicitly
@app.options("/api/chat")
async def chat_options():
    return {"message": "OK"}
```

### If using Express.js (Node.js):

```javascript
const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for all routes
app.use(cors({
    origin: '*', // In production, specify your domain
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept'],
}));

app.use(express.json());

// Handle OPTIONS preflight
app.options('/api/chat', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    res.sendStatus(200);
});

app.post('/api/chat', (req, res) => {
    const { messages } = req.body;
    
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
    });
    
    // Your AI response logic here
    const responseText = "Hi there! Welcome. How can I help you today?\n";
    
    // Stream response
    responseText.split(' ').forEach((chunk, index) => {
        setTimeout(() => {
            res.write(`data: ${JSON.stringify({
                type: "text-delta",
                textDelta: chunk + " "
            })}\n\n`);
            
            if (index === responseText.split(' ').length - 1) {
                res.write(`data: ${JSON.stringify({
                    type: "finish",
                    finishReason: "stop"
                })}\n\n`);
                res.end();
            }
        }, index * 100);
    });
});
```

### If using Flask (Python):

```python
from flask import Flask, request, Response, jsonify
from flask_cors import CORS
import json
import time

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/chat', methods=['POST', 'OPTIONS'])
def chat_endpoint():
    if request.method == 'OPTIONS':
        # Handle preflight request
        response = Response()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add('Access-Control-Allow-Headers', "Content-Type,Accept")
        response.headers.add('Access-Control-Allow-Methods', "POST,OPTIONS")
        return response
    
    data = request.get_json()
    messages = data.get('messages', [])
    
    def generate():
        response_text = "Hi there! Welcome. How can I help you today?\n"
        
        for chunk in response_text.split():
            yield f'data: {json.dumps({"type": "text-delta", "textDelta": chunk + " "})}\n\n'
            time.sleep(0.1)  # Simulate streaming delay
        
        yield f'data: {json.dumps({"type": "finish", "finishReason": "stop"})}\n\n'
    
    return Response(
        generate(),
        mimetype='text/event-stream',
        headers={
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Access-Control-Allow-Origin': '*',
        }
    )
```

## 🧪 Test Your Backend

After implementing CORS support, test with curl:

```bash
# Test OPTIONS request
curl -X OPTIONS http://127.0.0.1:8000/api/chat \
  -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -v

# Test POST request
curl -X POST http://127.0.0.1:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Hello"}]}' \
  -v
```

## 🔍 Frontend Changes Made

I've already updated your `chat-interface.js` to:

1. ✅ Use the correct API URL: `https://mal-gilt.vercel.app/api/chat`
2. ✅ Send proper request format: `{"messages": [...]}`
3. ✅ Handle streaming responses correctly
4. ✅ Add CORS mode and proper headers
5. ✅ Maintain conversation history

## 🚀 Quick Fix for Development

If you want to test locally, you can temporarily disable CORS in your browser:

**Chrome (for testing only):**
```bash
chrome --disable-web-security --user-data-dir="C:/temp/chrome_dev_session"
```

**Or use a CORS proxy for testing:**
```javascript
// Temporary fix - change API URL to:
this.apiUrl = 'https://cors-anywhere.herokuapp.com/http://127.0.0.1:8000/api/chat';
```

## ✅ Production Deployment

For production, make sure to:
1. Set specific origins instead of `*`
2. Use HTTPS for your API
3. Implement proper authentication
4. Add rate limiting

The frontend is now properly configured to work with your streaming API once CORS is fixed on the backend!
