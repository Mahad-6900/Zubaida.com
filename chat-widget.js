// Chat Widget for Zubad-port
class ChatWidget {
    constructor() {
      this.isOpen = false
      this.mode = "side" // 'side' or 'center'
      this.chatKey = 0
      this.init()
    }
  
    init() {
      this.createWidget()
      this.attachEventListeners()
    }
  
    createWidget() {
      // Create chat button
      const chatButton = document.createElement("button")
      chatButton.id = "chat-button"
      chatButton.innerHTML = '<i class="fas fa-comments"></i>'
      chatButton.className = "chat-button"
      chatButton.setAttribute("aria-label", "Open AI Assistant")
  
      // Create chat widget container
      const chatWidget = document.createElement("div")
      chatWidget.id = "chat-widget"
      chatWidget.className = "chat-widget hidden"
  
      // Create chat interface
      const chatInterface = document.createElement("div")
      chatInterface.className = "chat-interface"
      chatInterface.innerHTML = this.getChatInterfaceHTML()
  
      chatWidget.appendChild(chatInterface)
  
      // Add to body
      document.body.appendChild(chatButton)
      document.body.appendChild(chatWidget)
  
      // Add styles
      this.addStyles()
    }
  
    getChatInterfaceHTML() {
      return `
              <div class="chat-container">
                  <!-- Header -->
                  <div class="chat-header">
                      <div class="chat-header-left">
                          <div class="chat-header-icon">
                              <i class="fas fa-robot"></i>
                          </div>
                          <div class="chat-header-text">
                              <h3>Zubaida's AI Assistant</h3>
                              <p></p>
                          </div>
                      </div>
                      <div class="chat-header-controls">
                          <button class="chat-btn" onclick="chatWidget.toggleMode()" title="Toggle Mode">
                              <i class="fas fa-expand" id="mode-icon"></i>
                          </button>
                          <button class="chat-btn" onclick="chatWidget.closeChat()" title="Close">
                              <i class="fas fa-times"></i>
                          </button>
                      </div>
                  </div>
  
                  <!-- Messages -->
                  <div class="chat-messages" id="chat-messages">
                      <div class="message assistant">
                          <div class="message-content">
                              <div class="welcome-message">
                                  <p>
                                      Hi! I'm Zubaida Malik's AI assistant. I warmly welcome you and I'm here to help with any questions about
                                      Zubaida's work, skills, and services. I can assist you with email writing, copywriting, content writing & content strategy using Zubaida's unique AI + psychology + strategy approach. With 50+
                                      successful projects and 80% client retention, I bring proven expertise to every conversation. How can I
                                      help you today?
                                  </p>
                                  <div class="welcome-time">${new Date().toLocaleTimeString("en-US", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                  })}</div>
                              </div>
                          </div>
                      </div>
                  </div>
  <br />
  <br />
                  <!-- Input -->
                  <div class="chat-input">
                      <input type="text" id="chat-message-input" placeholder="Ask me anything..." autocomplete="off">
                      <button class="send" onclick="chatWidget.sendMessage()" title="Send">
                          <i class="fas fa-paper-plane"></i>
                      </button>
                  </div>
              </div>
          `
    }
  
    addStyles() {
      // Link to external CSS from chat-styles.css
      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = "chat-styles.css"
      document.head.appendChild(link)
      
      // Add only widget-specific styles
      const style = document.createElement("style")
      style.textContent = `
              .chat-button {
                  position: fixed;
                  bottom: 24px;
                  right: 24px;
                  width: 56px;
                  height: 56px;
                  border-radius: 50%;
                  background: #ffb85a;
                  color: white;
                  border: none;
                  cursor: pointer;
                  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                  z-index: 1000;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 24px;
                  transition: all 0.3s ease;
              }

              .chat-button:hover {
                  background: #ffb85a;
                  opacity: 0.9;
                  transform: scale(1.05);
              }
  
              .chat-widget {
                  position: fixed;
                  z-index: 1001;
                  transition: all 0.3s ease;
              }
  
              .chat-widget.side {
                  bottom: 24px;
                  right: 24px;
                  width: 380px;
                  height: 600px;
              }
  
              .chat-widget.center {
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  width: 90%;
                  max-width: 800px;
                  height: 480px;
              }
  
              .chat-widget.hidden {
                  display: none;
              }
  
              .chat-widget .chat-container {
                  height: 100%;
                  display: flex;
                  flex-direction: column;
                  background: #0A1628;
                  border-radius: 12px;
                  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
                  overflow: hidden;
              }
  
              .chat-widget .chat-input {
                  position: absolute;
                  bottom: 0;
                  left: 0;
                  right: 0;
                  padding: 16px;
                  background: #0A1628;
                  border-top: 1px solid #374151;
                  display: flex;
                  gap: 8px;
                  flex-shrink: 0;
                  z-index: 10;
                  width: 100%;
                  box-sizing: border-box;
                  height: 80px;
              }
  
              /* Center mode overlay */
              .chat-widget.center::before {
                  content: '';
                  position: fixed;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  background: rgba(0, 0, 0, 0.5);
                  z-index: -1;
              }
  
              /* Responsive design */
              @media (max-width: 768px) {
                  .chat-widget.side {
                      width: 90%;
                      right: 5%;
                  }
                  
                  .chat-widget .message-content {
                      max-width: 90%;
                  }
              }
          `
      document.head.appendChild(style)
    }
  
    attachEventListeners() {
      // Chat button click
      document.getElementById("chat-button").addEventListener("click", () => {
        this.openChat()
      })
  
      // Enter key in input
      document.addEventListener("keydown", (e) => {
        if (e.target.id === "chat-message-input" && e.key === "Enter") {
          this.sendMessage()
        }
      })
    }
  
    openChat() {
      this.isOpen = true
      const widget = document.getElementById("chat-widget")
      widget.classList.remove("hidden")
      widget.className = `chat-widget ${this.mode}`

      // Hide chat button
      document.getElementById("chat-button").style.display = "none"


      // Focus input
      setTimeout(() => {
        const input = document.getElementById("chat-message-input")
        if (input) input.focus()
      }, 100)
    }
  
    closeChat() {
      this.isOpen = false
      const widget = document.getElementById("chat-widget")
      widget.classList.add("hidden")
  
      // Show chat button
      document.getElementById("chat-button").style.display = "flex"
    }
  
    toggleMode() {
      this.mode = this.mode === "side" ? "center" : "side"
      if (this.isOpen) {
        const widget = document.getElementById("chat-widget")
        widget.className = `chat-widget ${this.mode}`
  
        // Update mode icon
        const modeIcon = document.getElementById("mode-icon")
        if (modeIcon) {
          modeIcon.className = this.mode === "side" ? "fas fa-expand" : "fas fa-compress"
        }
      }
    }
  
    scrollToBottom() {
      const messages = document.getElementById("chat-messages")
      if (messages) {
        messages.scrollTop = messages.scrollHeight
      }
    }

    addMessage(content, isUser = false) {
      const messages = document.getElementById("chat-messages")
      const messageDiv = document.createElement("div")
      messageDiv.className = `message ${isUser ? "user" : "assistant"}`

      const now = new Date()
      const timeString = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })

      messageDiv.innerHTML = `
              <div class="message-content">
                  ${content}
                  <div class="message-time">${timeString}</div>
              </div>
          `

      messages.appendChild(messageDiv)
      
      // Auto-scroll to bottom when new message is added
      setTimeout(() => {
        this.scrollToBottom()
      }, 100)
    }
  
    showTyping() {
      const messages = document.getElementById("chat-messages")
      const typingDiv = document.createElement("div")
      typingDiv.className = "typing-indicator"
      typingDiv.id = "typing-indicator"
      typingDiv.innerHTML = `
              <div class="typing-dots">
                  <div class="typing-dot"></div>
                  <div class="typing-dot"></div>
                  <div class="typing-dot"></div>
              </div>
          `

      messages.appendChild(typingDiv)
      
      // Auto-scroll to bottom when typing indicator is shown
      setTimeout(() => {
        this.scrollToBottom()
      }, 100)
    }
  
    hideTyping() {
      const typingIndicator = document.getElementById("typing-indicator")
      if (typingIndicator) {
        typingIndicator.remove()
      }
    }
  
    async sendMessage() {
      const input = document.getElementById("chat-message-input")
      const message = input.value.trim()
  
      if (!message) return
  
      // Add user message
      this.addMessage(message, true)
      input.value = ""
  
      // Show typing indicator
      this.showTyping()
  
      try {
        console.log("Sending message to API:", message)
  
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [{ role: "user", content: message }],
          }),
        })
  
        console.log("API Response status:", response.status)
  
        if (!response.ok) {
          const errorText = await response.text()
          console.error("API Error:", errorText)
          throw new Error(`API Error: ${response.status} - ${errorText}`)
        }
  
        const data = await response.json()
        console.log("API Response data:", data)
  
        this.hideTyping()
  
        // Add assistant response with better error handling
        const responseText = data.message || data.response || data.error || "I apologize, but I encountered an error. Please try again."
        this.addMessage(responseText)
        
        // Ensure input remains focused after response
        setTimeout(() => {
          if (input) {
            input.focus()
          }
        }, 100)
        
      } catch (error) {
        this.hideTyping()
        console.error("Chat Error:", error)
  
        // Enhanced fallback response based on message content
        const messageLower = message.toLowerCase()
        let fallbackResponse = ""
  
        if (messageLower.includes("hello") || messageLower.includes("hi")) {
          fallbackResponse =
            "Hello! I'm Zubaida's AI assistant. I'm here to help you learn about her content strategy and copywriting services. How can I assist you today?"
        } else if (messageLower.includes("service") || messageLower.includes("what")) {
          fallbackResponse =
            "Zubaida specializes in AI-powered content strategy, email copywriting, and social media content creation. She helps B2B and tech companies create compelling content that drives results."
        } else if (messageLower.includes("contact") || messageLower.includes("email")) {
          fallbackResponse =
            "You can reach Zubaida directly at zubimalik5656@gmail.com. She's always happy to discuss your content needs!"
        } else {
          fallbackResponse =
            "I'm experiencing some technical difficulties right now. For immediate assistance, please contact Zubaida directly at zubimalik5656@gmail.com. She'd be happy to help with your content strategy needs!"
        }
  
        this.addMessage(fallbackResponse)
        
        // Ensure input remains focused after error response
        setTimeout(() => {
          if (input) {
            input.focus()
          }
        }, 100)
      }
    }
  
  


  }
  
  // Initialize chat widget when DOM is loaded
  document.addEventListener("DOMContentLoaded", () => {
    window.chatWidget = new ChatWidget()
  })
  