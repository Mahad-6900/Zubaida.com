// Test script for chat API
const fetch = require('node-fetch');

async function testChatAPI() {
    const baseURL = 'http://localhost:3000';
    
    console.log('Testing Chat API...\n');
    
    try {
        // Test health endpoint
        console.log('1. Testing health endpoint...');
        const healthResponse = await fetch(`${baseURL}/api/health`);
        const healthData = await healthResponse.json();
        console.log('✅ Health check:', healthData.status);
        
        // Test chat endpoint
        console.log('\n2. Testing chat endpoint...');
        const chatResponse = await fetch(`${baseURL}/api/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messages: [{ role: 'user', content: 'Hello! What services do you offer?' }]
            })
        });
        
        if (chatResponse.ok) {
            const chatData = await chatResponse.json();
            console.log('✅ Chat response:', chatData.message);
        } else {
            console.log('❌ Chat API error:', chatResponse.status, chatResponse.statusText);
        }
        
    } catch (error) {
        console.log('❌ Connection error:', error.message);
        console.log('Make sure the server is running with: npm start');
    }
}

testChatAPI();
