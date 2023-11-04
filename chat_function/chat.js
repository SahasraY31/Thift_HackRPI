// chat.js
//
// Client-side javascript code.
document.getElementById('startConversation').addEventListener('click', async () => {
    try {
        const response = await fetch('/start-conversation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        alert(data.message);
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
});
