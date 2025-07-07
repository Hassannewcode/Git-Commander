// GitHub OAuth
document.getElementById('github-login').addEventListener('click', () => {
    const clientId = 'YOUR_GITHUB_OAUTH_CLIENT_ID';
    const redirectUri = encodeURIComponent(window.location.origin);
    window.location = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=repo`;
});

// Handle OAuth callback
async function handleAuth() {
    const code = new URLSearchParams(window.location.search).get('code');
    if(code) {
        // Exchange code for token (using GitHub Pages as proxy)
        const res = await fetch(`https://api.github.com/user`, {
            headers: { Authorization: `token ${await getToken(code)}` }
        });
        if(res.ok) showTerminal();
    }
}

// Execute commands via GitHub Actions
async function executeCommand(command) {
    const response = await fetch(`https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO/dispatches`, {
        method: 'POST',
        headers: {
            Authorization: `token YOUR_PAT`,
            Accept: 'application/vnd.github.everest-preview+json'
        },
        body: JSON.stringify({
            event_type: 'execute_command',
            client_payload: {
                command: command,
                repo: 'https://github.com/user/repo.git'
            }
        })
    });
    return response.json();
}

// DeepSeek AI Integration
async function askDeepSeek(question) {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer YOUR_DEEPSEEK_API_KEY`
        },
        body: JSON.stringify({
            model: "deepseek-coder",
            messages: [{ role: "user", content: question }]
        })
    });
    return await response.json();
}

// PWA Installation
window.addEventListener('load', () => {
    if('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js');
    }
});
