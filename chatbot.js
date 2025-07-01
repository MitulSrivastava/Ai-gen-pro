// ====== CHATBOT FUNCTIONALITY ======
// Configuration - REPLACE WITH YOUR WEBHOOK URL
const WEBHOOK_URL = 'https://spaniel-champion-monarch.ngrok-free.app/webhook/ffcf29b6-19e9-40fd-81a6-132910560043/chat';

let sessionId = generateSessionId();
let messages = [];
let isTyping = false;
let isChatOpen = false;

function generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function toggleChat() {
    const chatWidget = document.getElementById('chatWidget');
    const chatButton = document.getElementById('chatButton');
    const chatIcon = document.getElementById('chatIcon');
    const chatOverlay = document.getElementById('chatOverlay');
    const notificationBadge = document.getElementById('notificationBadge');
    
    isChatOpen = !isChatOpen;
    
    if (isChatOpen) {
        chatWidget.classList.add('open');
        chatButton.classList.add('close');
        chatIcon.className = 'fas fa-times';
        chatOverlay.classList.add('show');
        notificationBadge.style.display = 'none';
        
        setTimeout(() => {
            document.getElementById('chatInput').focus();
        }, 300);
    } else {
        chatWidget.classList.remove('open');
        chatButton.classList.remove('close');
        chatIcon.className = 'fas fa-comment';
        chatOverlay.classList.remove('show');
    }
}

function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 80) + 'px';
}

function handleKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

function sendQuickMessage(message) {
    document.getElementById('chatInput').value = message;
    sendMessage();
}

async function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message || isTyping) return;

    const welcomeScreen = document.getElementById('welcomeScreen');
    if (welcomeScreen) {
        welcomeScreen.style.display = 'none';
    }

    addMessage(message, 'user');
    input.value = '';
    input.style.height = 'auto';
    
    showTypingIndicator();
    
    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chatInput: message,
                sessionId: sessionId
            })
        });

        const data = await response.json();
        hideTypingIndicator();
        
        const botMessage = data.output || data.response || "I'm sorry, I couldn't process your request right now.";
        addMessage(botMessage, 'bot');
        
        if (!isChatOpen) {
            showNotification();
        }
        
    } catch (error) {
        console.error('Error:', error);
        hideTypingIndicator();
        addMessage("I'm sorry, there was an error processing your request. Please try again.", 'bot');
    }
}

function addMessage(content, sender) {
    const messagesContainer = document.getElementById('chatMessages');
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}-message`;
    
    const avatar = sender === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
    
    messageElement.innerHTML = `
        <div class="message-avatar">
            ${avatar}
        </div>
        <div class="message-content">
            ${content}
            <div class="message-time">${time}</div>
        </div>
    `;
    
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    messages.push({ content, sender, time });
}

function showTypingIndicator() {
    if (isTyping) return;
    isTyping = true;
    
    const messagesContainer = document.getElementById('chatMessages');
    const typingElement = document.createElement('div');
    typingElement.className = 'message bot-message typing-indicator';
    typingElement.id = 'typingIndicator';
    
    typingElement.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="typing-dots">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;
    
    messagesContainer.appendChild(typingElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function hideTypingIndicator() {
    isTyping = false;
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function showNotification() {
    const notificationBadge = document.getElementById('notificationBadge');
    notificationBadge.style.display = 'flex';
}

// Close chat when clicking outside on mobile
document.addEventListener('click', function(event) {
    const chatWidget = document.getElementById('chatWidget');
    const chatButton = document.getElementById('chatButton');
    
    if (isChatOpen && !chatWidget.contains(event.target) && !chatButton.contains(event.target)) {
        if (window.innerWidth <= 768) {
            toggleChat();
        }
    }
});
