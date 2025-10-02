// Image fallback handler for missing images
document.addEventListener('DOMContentLoaded', function() {
    // Handle missing images by replacing with placeholders or hiding them
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            const src = this.src;
            const alt = this.alt || 'Image';
            
            // Check what type of image this is and provide appropriate fallback
            if (src.includes('logo.png.png')) {
                // Replace logo with text-based logo
                const logoText = document.createElement('div');
                logoText.className = 'text-logo';
                logoText.style.cssText = `
                    width: 40px;
                    height: 40px;
                    background: linear-gradient(135deg, #be8852, #8e5e32);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: bold;
                    font-size: 14px;
                `;
                logoText.textContent = 'ZM';
                logoText.title = 'Zubaida Malik';
                this.parentNode.replaceChild(logoText, this);
                
            } else if (src.includes('pic.png.png')) {
                // Replace profile picture with avatar placeholder
                const avatar = document.createElement('div');
                avatar.className = 'avatar-placeholder';
                avatar.style.cssText = `
                    width: ${this.style.width || '390px'};
                    height: ${this.style.height || '390px'};
                    background: linear-gradient(135deg, #be8852, #8e5e32);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 48px;
                    font-weight: bold;
                `;
                avatar.innerHTML = '<i class="fas fa-user"></i>';
                this.parentNode.replaceChild(avatar, this);
                
            } else if (src.includes('data') || src.includes('clients')) {
                // Replace data/client images with placeholder cards
                const placeholder = document.createElement('div');
                placeholder.className = 'image-placeholder';
                placeholder.style.cssText = `
                    width: 100%;
                    height: 200px;
                    background: linear-gradient(135deg, #1a2942, #0d1117);
                    border: 2px dashed #be8852;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #be8852;
                    font-size: 16px;
                    text-align: center;
                    padding: 20px;
                `;
                placeholder.innerHTML = `<div><i class="fas fa-image" style="font-size: 24px; margin-bottom: 10px;"></i><br>${alt || 'Analytics Data'}</div>`;
                this.parentNode.replaceChild(placeholder, this);
                
            } else {
                // Generic fallback - hide the image
                this.style.display = 'none';
                console.warn('Missing image:', src);
            }
        });
    });
});

// Add this script to handle image loading errors gracefully
