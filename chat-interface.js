// Simulated AI Response System (replaces server-side AI SDK)
class AIAssistant {
    constructor() {
      this.systemPrompt = `You are Zubaida Malik's AI assistant. Your role is to warmly welcome visitors, answer their questions about Zubaida's work, skills, and services, and give them confidence that the work will be of high quality.
  
  Guidelines:
  - Maintain a professional, friendly, and trustworthy tone.
  - Do not sound like a salesperson.
  - Do not pressure the visitor.
  - Highlight Zubaida's skills, experience, and strengths naturally, only when relevant.
  - Keep answers simple, clear, and human.
  - If a visitor shows genuine interest in connecting, politely suggest they can reach Zubaida via email at zubumalik5656@gmail.com
  - Your main goal: build trust in Zubaida's work quality while keeping the conversation natural, respectful, and welcoming.
  
  About Zubaida Malik:
  - Name: Zubaida Malik
  - Email: zubumalik5656@gmail.com
  - Role: Advanced AI Ghostwriter, Email Copywriting Expert, and Social Media Content Strategist
  - Experience: 30+ completed projects with 5-star ratings on Fiverr and with direct clients
  - Client Retention: 80% client retention rate (clients return for repeat work)
  
  Professional Background:
  Zubaida specializes in creating data-driven content strategies for businesses, especially in the B2B and tech sectors. She understands buyer journeys and aligns content with different stages (awareness, consideration, decision). Her expertise includes optimizing content for SEO, lead generation, and conversions, while building AI-powered content systems that allow businesses to scale consistently.
  
  Key Skills:
  1. Content Strategy - Creating data-driven content strategies for B2B and tech sectors
  2. Writing & Copywriting - Website copy, long-form blog content, marketing copy for ads and landing pages
  3. Ghostwriting - Long-form blog content, website copy, and marketing copy for ads and landing pages
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
  - Professionals who want to learn prompt engineering and maximize AI tools`
  
      this.responses = {
        greeting: [
          "Hello! I'm here to help you learn more about Zubaida's work. What would you like to know?",
          "Hi there! Feel free to ask me anything about Zubaida's services and expertise.",
          "Welcome! I'm happy to answer any questions about Zubaida's work and experience.",
        ],
        skills: [
          "Zubaida specializes in several key areas:\n\n1. Content Strategy - Creating data-driven strategies for B2B and tech sectors\n2. Writing & Copywriting - Website copy, blog content, and marketing materials\n3. AI & Prompt Engineering - Combining AI with psychology for effective content\n4. SEO & Lead Generation - Optimizing content for search and conversions\n\nWith 30+ completed projects and 80% client retention, she brings proven expertise to every project.",
          "Zubaida's expertise spans content strategy, copywriting, AI integration, and SEO optimization. She's particularly skilled at creating content systems that combine AI + psychology + strategy for businesses in B2B and tech sectors.",
        ],
        experience: [
          "Zubaida has completed 30+ projects with consistent 5-star ratings on Fiverr and maintains an impressive 80% client retention rate. Her work spans diverse industries with a strong focus on B2B and technology sectors.",
          "With 30+ successful projects and 80% of clients returning for repeat work, Zubaida has built a strong track record. She's developed unique systems that help businesses scale their content consistently.",
        ],
        contact: [
          "If you'd like to connect with Zubaida directly, you can reach her at zubumalik5656@gmail.com. She'd be happy to discuss how she can help with your specific needs.",
          "Zubaida would love to hear from you! Feel free to email her at zubumalik5656@gmail.com to discuss your project.",
        ],
        services: [
          "Zubaida can help with:\n\n• AI-powered marketing and operations\n• Content for B2B and tech companies\n• Clear, persuasive, growth-focused copy\n• Prompt engineering and AI tool optimization\n\nHer approach focuses on building systems for long-term growth rather than one-time results.",
          "Zubaida offers comprehensive content services including strategy development, copywriting, AI integration, and SEO optimization. She specializes in helping businesses leverage AI for smarter marketing while maintaining a human touch.",
        ],
        default: [
          "That's a great question! Zubaida's work focuses on creating content that builds trust and drives results. With her unique combination of AI expertise and strategic thinking, she helps businesses grow sustainably. Would you like to know more about any specific aspect of her work?",
          "I'd be happy to help you with that! Zubaida brings a data-driven approach to content creation, combining AI tools with psychology and strategy. Is there a particular service or aspect of her work you'd like to explore?",
        ],
      }
    }
  
    async generateResponse(userMessage, conversationHistory) {
      // Simulate processing delay
      await this.delay(500)
  
      const messageLower = userMessage.toLowerCase()
      let response = ""
  
      // Keyword matching for appropriate responses
      if (this.matchesKeywords(messageLower, ["hello", "hi", "hey", "greetings"])) {
        response = this.getRandomResponse("greeting")
      } else if (this.matchesKeywords(messageLower, ["skill", "expertise", "what can", "abilities", "specializ"])) {
        response = this.getRandomResponse("skills")
      } else if (
        this.matchesKeywords(messageLower, ["experience", "project", "work done", "portfolio", "track record"])
      ) {
        response = this.getRandomResponse("experience")
      } else if (this.matchesKeywords(messageLower, ["contact", "email", "reach", "connect", "get in touch"])) {
        response = this.getRandomResponse("contact")
      } else if (this.matchesKeywords(messageLower, ["service", "help", "offer", "provide", "do for me"])) {
        response = this.getRandomResponse("services")
      } else {
        response = this.getRandomResponse("default")
      }
  
      return response
    }
  
    matchesKeywords(text, keywords) {
      return keywords.some((keyword) => text.includes(keyword))
    }
  
    getRandomResponse(category) {
      const responses = this.responses[category]
      return responses[Math.floor(Math.random() * responses.length)]
    }
  
    async *streamResponse(response) {
      const words = response.split(" ")
      for (let i = 0; i < words.length; i++) {
        await this.delay(50 + Math.random() * 50)
        yield words[i] + (i < words.length - 1 ? " " : "")
      }
    }
  
    delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms))
    }
  }
  
  // Chat Interface Class
  class ChatInterface {
    constructor() {
      this.isOpen = false
      this.mode = "side"
      this.messages = []
      this.isLoading = false
      this.aiAssistant = new AIAssistant() // Use local AI assistant instead of API
  
      this.createChatInterface()
      this.attachEventListeners()
    }
  
    createChatInterface() {
      // Create chat toggle button
      const toggleButton = document.createElement("button")
      toggleButton.id = "chat-toggle-btn"
      toggleButton.className = "chat-toggle-btn"
      toggleButton.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 13.54 2.36 15.01 3.01 16.32L2 22L7.68 20.99C8.99 21.64 10.46 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C10.74 20 9.54 19.75 8.47 19.3L8 19.11L4.91 19.91L5.71 16.82L5.52 16.35C5.07 15.28 4.82 14.08 4.82 12.82C4.82 7.58 8.58 3.82 13.82 3.82C16.39 3.82 18.77 4.82 20.58 6.63C22.39 8.44 23.39 10.82 23.39 13.39C23.39 18.63 19.63 22.39 14.39 22.39H12V20Z" fill="currentColor"/>
        </svg>
      `
      document.body.appendChild(toggleButton)
  
      // Create chat interface
      const chatContainer = document.createElement("div")
      chatContainer.id = "chat-container"
      chatContainer.className = "chat-container"
      chatContainer.innerHTML = `
        <div class="chat-card">
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
  
          <div class="chat-messages" id="chat-messages">
            <div class="message assistant-message">
              <div class="message-content">
                <p>Hi! I'm Zubaida Malik's AI assistant. I warmly welcome you and I'm here to help with any questions about Zubaida's work, skills, and services. I can assist you with email writing, copywriting, content writing & content strategy using Zubaida's unique AI + psychology + strategy approach. With 50+ successful projects and 80% client retention, I bring proven expertise to every conversation. How can I help you today?</p>
                <span class="message-time">${new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
  
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
      `
      document.body.appendChild(chatContainer)
    }
  
    attachEventListeners() {
      const toggleBtn = document.getElementById("chat-toggle-btn")
      const closeBtn = document.getElementById("chat-close-btn")
      const maximizeBtn = document.getElementById("chat-maximize-btn")
      const refreshBtn = document.getElementById("chat-refresh-btn")
      const chatForm = document.getElementById("chat-form")
  
      toggleBtn.addEventListener("click", () => this.toggleChat())
      closeBtn.addEventListener("click", () => this.closeChat())
      maximizeBtn.addEventListener("click", () => this.toggleMode())
      refreshBtn.addEventListener("click", () => this.refreshChat())
      chatForm.addEventListener("submit", (e) => this.handleSubmit(e))
  
      // Close chat when clicking outside (but not in center mode)
      document.addEventListener("click", (e) => {
        const chatContainer = document.getElementById("chat-container")
        const toggleBtn = document.getElementById("chat-toggle-btn")
  
        if (this.isOpen && this.mode === "side" && !chatContainer.contains(e.target) && !toggleBtn.contains(e.target)) {
          this.closeChat()
        }
      })
    }
  
    toggleChat() {
      this.isOpen = !this.isOpen
      const chatContainer = document.getElementById("chat-container")
      const toggleBtn = document.getElementById("chat-toggle-btn")
  
      if (this.isOpen) {
        chatContainer.classList.add("chat-open")
        toggleBtn.classList.add("chat-active")
        document.getElementById("chat-input").focus()
      } else {
        chatContainer.classList.remove("chat-open")
        toggleBtn.classList.remove("chat-active")
      }
    }
  
    closeChat() {
      this.isOpen = false
      const chatContainer = document.getElementById("chat-container")
      const toggleBtn = document.getElementById("chat-toggle-btn")
  
      chatContainer.classList.remove("chat-open")
      toggleBtn.classList.remove("chat-active")
  
      if (this.mode === "center") {
        chatContainer.classList.remove("chat-center-mode")
        this.mode = "side"
  
        const maximizeBtn = document.getElementById("chat-maximize-btn")
        maximizeBtn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 14H5V19H10V17H7V14ZM5 10H7V7H10V5H5V10ZM17 17H14V19H19V14H17V17ZM14 5V7H17V10H19V5H14Z" fill="currentColor"/>
          </svg>
        `
        maximizeBtn.title = "Maximize"
      }
    }
  
    toggleMode() {
      this.mode = this.mode === "side" ? "center" : "side"
      const chatContainer = document.getElementById("chat-container")
      const maximizeBtn = document.getElementById("chat-maximize-btn")
      const toggleBtn = document.getElementById("chat-toggle-btn")
  
      this.isOpen = true
  
      setTimeout(() => {
        chatContainer.classList.add("chat-open")
        toggleBtn.classList.add("chat-active")
  
        if (this.mode === "center") {
          chatContainer.classList.add("chat-center-mode")
          maximizeBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 16H8V14H5V16ZM8 8H5V10H8V8ZM14 19H16V16H14V19ZM16 8V5H14V8H16Z" fill="currentColor"/>
            </svg>
          `
          maximizeBtn.title = "Minimize"
        } else {
          chatContainer.classList.remove("chat-center-mode")
          maximizeBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 14H5V19H10V17H7V14ZM5 10H7V7H10V5H5V10ZM17 17H14V19H19V14H17V17ZM14 5V7H17V10H19V5H14Z" fill="currentColor"/>
            </svg>
          `
          maximizeBtn.title = "Maximize"
        }
      }, 10)
    }
  
    refreshChat() {
      this.messages = []
      const messagesContainer = document.getElementById("chat-messages")
      const chatInput = document.getElementById("chat-input")
  
      messagesContainer.innerHTML = `
        <div class="message assistant-message">
          <div class="message-content">
            <p>Hi! I'm Zubaida Malik's AI assistant. I warmly welcome you and I'm here to help with any questions about Zubaida's work, skills, and services. I can assist you with email writing, copywriting, content writing & content strategy using Zubaida's unique AI + psychology + strategy approach. With 50+ successful projects and 80% client retention, I bring proven expertise to every conversation. How can I help you today?</p>
            <span class="message-time">${new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      `
  
      chatInput.value = ""
      chatInput.focus()
    }
  
    async handleSubmit(e) {
      e.preventDefault()
  
      const chatInput = document.getElementById("chat-input")
      const message = chatInput.value.trim()
  
      if (!message || this.isLoading) return
  
      this.addMessage("user", message)
      this.messages.push({ role: "user", content: message })
      chatInput.value = ""
  
      this.showLoading()
      this.isLoading = true
  
      try {
        const response = await this.aiAssistant.generateResponse(message, this.messages)
        await this.handleStreamingResponse(response)
      } catch (error) {
        console.error("Chat error:", error)
        this.hideLoading()
        this.addMessage("assistant", "Sorry, I encountered an error. Please try again.")
      } finally {
        this.isLoading = false
      }
    }
  
    async handleStreamingResponse(fullResponse) {
      let assistantMessage = ""
      let messageElement = null
  
      this.hideLoading()
  
      try {
        // Stream the response word by word
        for await (const chunk of this.aiAssistant.streamResponse(fullResponse)) {
          assistantMessage += chunk
  
          if (!messageElement) {
            messageElement = this.addMessage("assistant", assistantMessage, true)
          } else {
            this.updateMessage(messageElement, assistantMessage)
          }
        }
  
        if (messageElement) {
          this.finalizeMessage(messageElement)
        }
  
        this.messages.push({ role: "assistant", content: assistantMessage })
      } catch (error) {
        console.error("Error streaming response:", error)
        if (!messageElement) {
          this.addMessage("assistant", "Sorry, I encountered an error processing the response.")
        }
      }
    }
  
    addMessage(role, content, isStreaming = false) {
      const messagesContainer = document.getElementById("chat-messages")
      const messageDiv = document.createElement("div")
      messageDiv.className = `message ${role}-message${isStreaming ? " streaming" : ""}`
  
      messageDiv.innerHTML = `
        <div class="message-content">
          <p>${this.formatMessage(content)}</p>
          <span class="message-time">${new Date().toLocaleTimeString()}</span>
        </div>
      `
  
      messagesContainer.appendChild(messageDiv)
      this.scrollToBottom()
  
      return messageDiv
    }
  
    updateMessage(messageElement, content) {
      const contentP = messageElement.querySelector(".message-content p")
      if (contentP) {
        contentP.innerHTML = this.formatMessage(content)
      }
      this.scrollToBottom()
    }
  
    finalizeMessage(messageElement) {
      messageElement.classList.remove("streaming")
    }
  
    formatMessage(content) {
      return content
        .replace(/\n/g, "<br>")
        .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>')
    }
  
    showLoading() {
      const messagesContainer = document.getElementById("chat-messages")
      const loadingDiv = document.createElement("div")
      loadingDiv.id = "chat-loading"
      loadingDiv.className = "message assistant-message"
      loadingDiv.innerHTML = `
        <div class="message-content">
          <div class="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      `
      messagesContainer.appendChild(loadingDiv)
      this.scrollToBottom()
    }
  
    hideLoading() {
      const loadingElement = document.getElementById("chat-loading")
      if (loadingElement) {
        loadingElement.remove()
      }
    }
  
    scrollToBottom() {
      const messagesContainer = document.getElementById("chat-messages")
      messagesContainer.scrollTop = messagesContainer.scrollHeight
    }
  }
  
  // Initialize chat interface when DOM is loaded
  if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", () => {
      new ChatInterface()
    })
  }
  
  // Export for module usage
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { ChatInterface, AIAssistant }
  }
  