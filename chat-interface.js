class ChatInterface {
    constructor() {
        this.isOpen = false;
        this.mode = 'side'; // 'side' or 'center'
        this.messages = [];
        this.isLoading = false;
        this.apiUrl = 'http://127.0.0.1:8000/api/chat';
        
        this.createChatInterface();
        this.attachEventListeners();
    }

    createChatInterface() {
        // Create chat toggle button
        const toggleButton = document.createElement('button');
        toggleButton.id = 'chat-toggle-btn';
        toggleButton.className = 'chat-toggle-btn';
        toggleButton.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 13.54 2.36 15.01 3.01 16.32L2 22L7.68 20.99C8.99 21.64 10.46 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C10.74 20 9.54 19.75 8.47 19.3L8 19.11L4.91 19.91L5.71 16.82L5.52 16.35C5.07 15.28 4.82 14.08 4.82 12.82C4.82 7.58 8.58 3.82 13.82 3.82C16.39 3.82 18.77 4.82 20.58 6.63C22.39 8.44 23.39 10.82 23.39 13.39C23.39 18.63 19.63 22.39 14.39 22.39H12V20Z" fill="currentColor"/>
            </svg>
        `;
        document.body.appendChild(toggleButton);

        // Create chat interface
        const chatContainer = document.createElement('div');
        chatContainer.id = 'chat-container';
        chatContainer.className = 'chat-container';
        chatContainer.innerHTML = `
            <div class="chat-card">
                <!-- Header -->
                <div class="chat-header">
                    <div class="chat-header-info">
                        <div class="chat-avatar">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L9 7V9C9 10.1 9.9 11 11 11V22H13V11C14.1 11 15 10.1 15 9Z" fill="currentColor"/>
                            </svg>
                        </div>
                        <div class="chat-info">
                            <h3>Zubaida's AI Assistant</h3>
                            <p class="chat-status">Online</p>
                        </div>
                    </div>
                    <div class="chat-controls">
                        <button id="chat-maximize-btn" class="chat-control-btn" title="Maximize">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 14H5V19H10V17H7V14ZM5 10H7V7H10V5H5V10ZM17 17H14V19H19V14H17V17ZM14 5V7H17V10H19V5H14Z" fill="currentColor"/>
                            </svg>
                        </button>
                        <button id="chat-close-btn" class="chat-control-btn" title="Close">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Messages -->
                <div class="chat-messages" id="chat-messages">
                    <div class="message assistant-message">
                        <div class="message-content">
                            <p>Hi! I'm Zubaida Malik's AI assistant. I warmly welcome you and I'm here to help with any questions about Zubaida's work, skills, and services. I can assist you with email writing, copywriting, content writing & content strategy using Zubaida's unique AI + psychology + strategy approach. With 50+ successful projects and 80% client retention, I bring proven expertise to every conversation. How can I help you today?</p>
                            <span class="message-time">${new Date().toLocaleTimeString()}</span>
                        </div>
                    </div>
                </div>


                <!-- Input -->
                <form class="chat-input-form" id="chat-form">
                    <div class="chat-input-container">
                        <input type="text" id="chat-input" placeholder="Ask me anything..." autocomplete="off">
                        <button type="button" id="chat-refresh-btn" class="chat-input-btn" title="Refresh chat">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C15.73 20 18.84 17.45 19.73 14H17.65C16.83 16.33 14.61 18 12 18C8.69 18 6 15.31 6 12C6 8.69 8.69 6 12 6C13.66 6 15.14 6.69 16.22 7.78L13 11H20V4L17.65 6.35Z" fill="currentColor"/>
                            </svg>
                        </button>
                        <button type="submit" id="chat-send-btn" class="chat-input-btn chat-send-btn" title="Send message">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor"/>
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        `;
        document.body.appendChild(chatContainer);
    }

    attachEventListeners() {
        const toggleBtn = document.getElementById('chat-toggle-btn');
        const closeBtn = document.getElementById('chat-close-btn');
        const maximizeBtn = document.getElementById('chat-maximize-btn');
        const refreshBtn = document.getElementById('chat-refresh-btn');
        const chatForm = document.getElementById('chat-form');
        const chatInput = document.getElementById('chat-input');

        toggleBtn.addEventListener('click', () => this.toggleChat());
        closeBtn.addEventListener('click', () => this.closeChat());
        maximizeBtn.addEventListener('click', () => this.toggleMode());
        refreshBtn.addEventListener('click', () => this.refreshChat());
        chatForm.addEventListener('submit', (e) => this.handleSubmit(e));

        // Close chat when clicking outside
        document.addEventListener('click', (e) => {
            const chatContainer = document.getElementById('chat-container');
            const toggleBtn = document.getElementById('chat-toggle-btn');
            
            if (this.isOpen && !chatContainer.contains(e.target) && !toggleBtn.contains(e.target)) {
                this.closeChat();
            }
        });
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        const chatContainer = document.getElementById('chat-container');
        const toggleBtn = document.getElementById('chat-toggle-btn');
        
        if (this.isOpen) {
            chatContainer.classList.add('chat-open');
            toggleBtn.classList.add('chat-active');
            document.getElementById('chat-input').focus();
        } else {
            chatContainer.classList.remove('chat-open');
            toggleBtn.classList.remove('chat-active');
        }
    }

    closeChat() {
        this.isOpen = false;
        const chatContainer = document.getElementById('chat-container');
        const toggleBtn = document.getElementById('chat-toggle-btn');
        
        chatContainer.classList.remove('chat-open');
        toggleBtn.classList.remove('chat-active');
    }

    toggleMode() {
        this.mode = this.mode === 'side' ? 'center' : 'side';
        const chatContainer = document.getElementById('chat-container');
        const maximizeBtn = document.getElementById('chat-maximize-btn');
        
        if (this.mode === 'center') {
            chatContainer.classList.add('chat-center-mode');
            maximizeBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 16H8V14H5V16ZM8 8H5V10H8V8ZM14 19H16V16H14V19ZM16 8V5H14V8H16Z" fill="currentColor"/>
                </svg>
            `;
            maximizeBtn.title = 'Minimize';
        } else {
            chatContainer.classList.remove('chat-center-mode');
            maximizeBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 14H5V19H10V17H7V14ZM5 10H7V7H10V5H5V10ZM17 17H14V19H19V14H17V17ZM14 5V7H17V10H19V5H14Z" fill="currentColor"/>
                </svg>
            `;
            maximizeBtn.title = 'Maximize';
        }
    }

    refreshChat() {
        this.messages = [];
        const messagesContainer = document.getElementById('chat-messages');
        const chatInput = document.getElementById('chat-input');
        
        // Clear messages except welcome message
        messagesContainer.innerHTML = `
            <div class="message assistant-message">
                <div class="message-content">
                    <p>Hi! I'm Zubaida Malik's AI assistant. I warmly welcome you and I'm here to help with any questions about Zubaida's work, skills, and services. I can assist you with email writing, copywriting, content writing & content strategy using Zubaida's unique AI + psychology + strategy approach. With 50+ successful projects and 80% client retention, I bring proven expertise to every conversation. How can I help you today?</p>
                    <span class="message-time">${new Date().toLocaleTimeString()}</span>
                </div>
            </div>
        `;
        
        chatInput.value = '';
        chatInput.focus();
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const chatInput = document.getElementById('chat-input');
        const message = chatInput.value.trim();
        
        if (!message || this.isLoading) return;
        
        // Add user message to UI and conversation history
        this.addMessage('user', message);
        this.messages.push({ role: 'user', content: message });
        chatInput.value = '';
        
        // Show loading
        this.showLoading();
        this.isLoading = true;
        
        try {
            // Send to API with full conversation history
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'text/event-stream',
                },
                mode: 'cors',
                body: JSON.stringify({
                    messages: this.messages
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            // Handle streaming response
            await this.handleStreamingResponse(response);
            
        } catch (error) {
            console.error('Chat API error:', error);
            this.hideLoading();
            this.addMessage('assistant', 'Sorry, I encountered an error. Please try again later.');
        } finally {
            this.isLoading = false;
        }
    }

    async handleStreamingResponse(response) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let assistantMessage = '';
        let messageElement = null;
        
        this.hideLoading();
        
        try {
            while (true) {
                const { done, value } = await reader.read();
                
                if (done) break;
                
                const chunk = decoder.decode(value);
                const lines = chunk.split('\n');
                
                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        try {
                            const data = JSON.parse(line.slice(6));
                            
                            if (data.type === 'text-delta') {
                                assistantMessage += data.textDelta;
                                
                                // Create or update message element
                                if (!messageElement) {
                                    messageElement = this.addMessage('assistant', assistantMessage, true);
                                } else {
                                    this.updateMessage(messageElement, assistantMessage);
                                }
                            } else if (data.type === 'finish') {
                                // Finalize the message
                                if (messageElement) {
                                    this.finalizeMessage(messageElement);
                                }
                                break;
                            }
                        } catch (parseError) {
                            console.error('Error parsing streaming data:', parseError);
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Error reading stream:', error);
            if (!messageElement) {
                this.addMessage('assistant', 'Sorry, I encountered an error processing the response.');
            }
        }
        
        // Store the complete message in conversation history
        this.messages.push({ role: 'assistant', content: assistantMessage });
    }

    addMessage(role, content, isStreaming = false) {
        const messagesContainer = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}-message${isStreaming ? ' streaming' : ''}`;
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${this.formatMessage(content)}</p>
                <span class="message-time">${new Date().toLocaleTimeString()}</span>
            </div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
        
        return messageDiv;
    }

    updateMessage(messageElement, content) {
        const contentP = messageElement.querySelector('.message-content p');
        if (contentP) {
            contentP.innerHTML = this.formatMessage(content);
        }
        this.scrollToBottom();
    }

    finalizeMessage(messageElement) {
        messageElement.classList.remove('streaming');
    }

    formatMessage(content) {
        // Basic formatting for line breaks and links
        return content
            .replace(/\n/g, '<br>')
            .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
    }

    showLoading() {
        const messagesContainer = document.getElementById('chat-messages');
        const loadingDiv = document.createElement('div');
        loadingDiv.id = 'chat-loading';
        loadingDiv.className = 'message assistant-message';
        loadingDiv.innerHTML = `
            <div class="message-content">
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        messagesContainer.appendChild(loadingDiv);
        this.scrollToBottom();
    }

    hideLoading() {
        const loadingElement = document.getElementById('chat-loading');
        if (loadingElement) {
            loadingElement.remove();
        }
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('chat-messages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

// Initialize chat interface when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ChatInterface();
});
