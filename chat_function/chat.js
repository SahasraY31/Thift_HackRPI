// chat.js
//
// Client-side javascript code.
document.getElementById('startConversation').addEventListener('click', async () => {
    try {
        const divId = document.getElementById('myDiv');

        const buyerId = divId.getAttribute('data-buyer-id');
        const parameters = { buyerId };
        const response = await fetch('/start-conversation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(parameters),
        });
        const data = await response.json();
        alert(data.message);
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
});

document.getElementById('fetchConversation').addEventListener('click', async () => {
    try {
        await fetch('/fetch-all-conversations', {
            method: 'GET',
        });
        // You can add code to handle success or perform other actions here
    } catch (error) {
        console.error('Error:', error);
        // You can add error handling code here
    }
});

document.getElementById('fetchOne').addEventListener('click', async () => {
    try {
        await fetch('/fetch-one-conversations', {
            method: 'GET',
        });
        // You can add code to handle success or perform other actions here
    } catch (error) {
        console.error('Error:', error);
        // You can add error handling code here
    }
});

