# Zubaida Malik - AI Copywriter Portfolio

A professional portfolio website for Zubaida Malik, featuring AI-powered copywriting services, social media expertise, and integrated chat assistant.

## 🚀 Features

- **AI Chat Assistant**: Integrated with live API for real-time conversations
- **Responsive Design**: Mobile-friendly across all devices  
- **Modern UI**: Dark theme with gold accents and smooth animations
- **Service Showcase**: Complete portfolio of copywriting and social media services
- **Contact Integration**: EmailJS-powered contact form
- **Performance Analytics**: Real data visualization and client testimonials

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Framework**: Bootstrap 5.3.3
- **Icons**: Font Awesome, Bootstrap Icons
- **Chat API**: Custom streaming API integration
- **Email**: EmailJS for contact form
- **Deployment**: Vercel-ready configuration

## 📁 Project Structure

```
├── index.html              # Landing page (redirects to home)
├── home.html               # Main homepage
├── about.html              # About page
├── contact.html            # Contact page with form
├── portfolio.html          # Portfolio showcase
├── services.html           # Services offered
├── skill.html              # Skills and expertise
├── chat-test.html          # Chat functionality testing
├── style.css               # Main stylesheet
├── animation.css           # CSS animations
├── chat-interface.css      # Chat interface styles
├── script.js               # Main JavaScript functionality
├── email.js                # EmailJS integration
├── chat-interface.js       # AI chat implementation
├── fix-images.js           # Image fallback handler
├── vercel.json             # Vercel deployment config
└── DEPLOYMENT.md           # Deployment instructions
```

## 🚀 Quick Start

### Local Development
```bash
# Clone the repository
git clone <your-repo-url>
cd zubaida-portfolio

# Start local server
python -m http.server 8000

# Open in browser
http://localhost:8000/home.html
```

### Deploy to Vercel
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically with included `vercel.json` config

## 💬 Chat Integration

The portfolio includes a fully functional AI chat assistant:
- **API Endpoint**: `https://mal-gilt.vercel.app/api/chat`
- **Features**: Streaming responses, conversation history, mobile-friendly
- **Access**: Click the chat button on any page

## 📧 Contact Form

EmailJS integration for direct contact:
- Service ID: `service_qyc2bos`
- Template ID: `template_keu8f0u`
- Real-time form validation and submission

## 🎨 Customization

### Colors (CSS Variables)
```css
:root {
  --color-primary: #be8852;    /* Gold accent */
  --color-dark: #3f0e26;       /* Dark background */
  --color-light: #ffffff;      /* Text color */
}
```

### Chat Theme
```css
:root {
  --chat-primary: #FF6B5A;     /* Chat accent */
  --chat-dark: #0A1628;        /* Chat background */
}
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🔧 Configuration Files

- **`vercel.json`**: Deployment and routing configuration
- **`fix-images.js`**: Handles missing images gracefully
- **`.gitignore`**: Git ignore rules for clean repository

## 📊 Performance Features

- **Lazy Loading**: Images load on demand
- **Optimized Assets**: Minified CSS/JS in production
- **CDN Integration**: Bootstrap and Font Awesome via CDN
- **Caching**: Proper cache headers via Vercel

## 🐛 Troubleshooting

### Common Issues:
1. **404 Errors**: Ensure `vercel.json` is properly configured
2. **Images Not Loading**: `fix-images.js` provides fallbacks
3. **Chat Not Working**: Check API endpoint and browser console
4. **Form Issues**: Verify EmailJS configuration

### Local Testing:
```bash
# Test all pages
http://localhost:8000/home.html
http://localhost:8000/about.html
http://localhost:8000/contact.html
http://localhost:8000/portfolio.html
http://localhost:8000/services.html
http://localhost:8000/skill.html
http://localhost:8000/chat-test.html
```

## 📈 SEO Optimization

- Meta tags for all pages
- Open Graph tags for social sharing
- Semantic HTML structure
- Clean URLs via Vercel rewrites
- Fast loading times

## 🔒 Security

- XSS protection headers
- Content Security Policy
- HTTPS enforcement
- Input validation on forms

## 📞 Support

For issues or questions:
- Check `DEPLOYMENT.md` for detailed deployment guide
- Test locally before deploying
- Verify all API endpoints are accessible

---

**Built with ❤️ for Zubaida Malik's Professional Portfolio**