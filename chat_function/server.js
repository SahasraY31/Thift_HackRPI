// boiler code
// const http = require('http');
// const hostname = '127.0.0.1';
// const port = 3000;
// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello World\n');
// });
// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });

// Import dependencies.
const express = require('express');
// const path = require('path');
const bodyParser = require('body-parser');



// Import AccessToken dependencies.
const AccessToken = require('twilio').jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;

// Create node app.
const app = express();
const port = process.env.PORT || 3000; // Set your desired port number

// Set client keys.
const twilioAccountSid = 'AC8f1e0f34b827a525c09690f681a67572'
const twilioApiKey = 'SKc8bf8b3873d51dd3d986c4e6db070675'
const twilioApiSecret = 'O3n5EMTrFPeoyOgmb8Ab9s1pYfLYenFS'

// Used specifically for creating Chat tokens
const serviceSid = 'IS36a96e54183e4385bf1e8d813ee2a977';
const identity = 'testuser1@example.com';

// Create conversation API objects
//
// Create a "grant" which enables a client to use Chat as a given user,
// on a given device
const chatGrant = new ChatGrant({
    serviceSid: serviceSid,
});

// Create an access token which we will sign and return to the client,
// containing the grant we just created
const token = new AccessToken(
    twilioAccountSid,
    twilioApiKey,
    twilioApiSecret,
    { identity: identity }
);

token.addGrant(chatGrant);

// Serialize the token to a JWT string
const token_string = token.toJwt();
console.log(token_string);

const { Client } = require('@twilio/conversations');
const client = new Client(token_string);

app.use(bodyParser.json());

app.use(express.static(__dirname));
// Define routes for specific HTML files
// app.get('/chat', (req, res) => {
//     res.sendFile(path.join(__dirname, 'chat.html'));
// });

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/chat.html');
});

app.post('/start-conversation', async (req, res) => {
    try {
        // Perform your Twilio Conversations API call here
        // Example: Create a conversation
        await client.createConversation({
            attributes: {},
            friendlyName: "new conversation",
            uniqueName: "new conversation",
        });
        res.json({ message: 'Conversation created!' });
    } catch (error) {
        res.status(500).json({ message: 'Error starting the conversation' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});