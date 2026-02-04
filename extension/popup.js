document.getElementById('submitBtn').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const statusEl = document.getElementById('status');
    const btn = document.getElementById('submitBtn');

    if (!tab.url.includes('youtube.com/watch')) {
        statusEl.textContent = '❌ Not a YouTube video';
        statusEl.className = 'error';
        statusEl.style.display = 'block';
        return;
    }

    statusEl.textContent = '🍳 Cooking...';
    statusEl.className = 'success';
    statusEl.style.display = 'block';
    btn.disabled = true;

    try {
        // In a real scenario, this would POST to your API
        // For the skeleton, we redirect to the submit page with the URL
        const submitUrl = `https://chewtube.vercel.app/submit?url=${encodeURIComponent(tab.url)}`;
        chrome.tabs.create({ url: submitUrl });
        statusEl.textContent = '✅ Redirecting to submit...';
    } catch (error) {
        statusEl.textContent = '❌ Failed to connect';
        statusEl.className = 'error';
        btn.disabled = false;
    }
});
