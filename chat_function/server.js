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
const identity = 'testuser2@example.com';

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

// Generate a random integer between min (inclusive) and max (exclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

app.post('/start-conversation', async (req, res) => {
    try {
        // Perform your Twilio Conversations API call here
        // Example: Create a conversation
        const buyerId = req.body.buyerId;

        const rand_num = getRandomInt(0, 100000);
        const conversation_name = `trial-conversation-${rand_num}`
        const conversation = await client.createConversation({
            attributes: {},
            friendlyName: "trial-conversation",
            uniqueName: conversation_name, // Unique name to identify the conversation
        });


        // Access the conversation SID and send it in the response
        const conversationSid = conversation.sid;
        console.log(conversationSid)
        // const msg_returned = `Conversation created with Sid ${conversationSid} for uniqueName ${conversation_name}!`;

        // // Join the conversation as buyer.
        await conversation.join();
        console.log('Joined the conversation as a buyer.');

        // Add seller as participant.
        await conversation.add(buyerId);
        console.log('Participant added successfully.');

        await conversation.sendMessage('Hi! I am interested in this item. Do you want to meet up on campus for the exchange?')

        // Data to be sent
        // const dataToSend = { conversation_id: conversationSid };
        // const dataToSend = { key1: 'value1', key2: 'value2' };
        // console.log(dataToSend);
        // Redirect to the destination route and pass data in query parameters
        // res.redirect(`/add-participant?conversation_id=${conversationSid}`);
        res.json({ message: 'success' });

    } catch (error) {
        res.status(500).json({ message: 'Error starting the conversation', error: error.message });
    }
});

// Create a conversation
// Add participants:
// -- when a user is interested in buying something, you want to create a direct chat with them (buyer + seller)
// Fetch conversations.
// -- display on the html sorted by most recent
// Fetch all messages for a conversation.


app.post('/add-participant', async (req, res) => {

    // Retrieve the data from query parameters
    // const dataReceived = JSON.parse(req.query.data);

    // Process the data
    console.log('Received data:');

    // // Replace 'CONVERSATION_SID' with the actual Conversation SID you want to add the participant to.
    // const conversationSid = '26230';

    // // Replace 'PARTICIPANT_IDENTITY' with the identity of the participant you want to add.
    // const participantIdentity = 'testuser234@gmail.com';

    // // Replace 'SERVICE_SID' with the service SID of your conversation service.


    // // Create a new participant and add it to the conversation
    // client.conversations.services(serviceSid)
    //     .conversations(conversationSid)
    //     .participants.create({ identity: participantIdentity })
    //     .then(participant => {
    //         console.log('Participant added:', participant.sid);
    //     })
    //     .catch(error => {
    //         console.error('Error adding participant:', error);
    //     });
});

app.get('/fetch-one-conversations', async (req, res) => {

    client.conversations.v1.conversations('CH3b4bf97129244678ab1973f69b838a9b')
        .fetch()
        .then(conversation => console.log(conversation.chatServiceSid));

});

app.get('/fetch-all-conversations', async (req, res) => {
    // Before you use the client, subscribe to the `'initialized'` event.

    try {
        // get the conversations paginator
        let conversationsPaginator = await client.getSubscribedConversations();

        // get conversations
        const conversations = conversationsPaginator.items;
        console.log(conversations)
        console.log('*******************************')
        // const person = {
        //     firstName: "John",
        //     lastName: "Doe",
        //     age: 50,
        //     status: "marketing contact"
        // };

        // const saved_conversations = []

        for (const conversation of conversations) {

            // // Do something with the participants for this conversation
            // console.log(`Participants for conversation ${conversation.sid}:`, participants);

            // console.log('Conversation SID:', conversation.sid);
            // console.log('Unique Name:', conversation.uniqueName);
            // console.log('Friendly Name:', conversation.friendlyName);
            // console.log('Attributes:', conversation.attributes);
            // console.log('Date Created:', conversation.dateCreated);
            // console.log('Date Updated:', conversation.dateUpdated);
            // console.log('this is the message' + conversation.message)


            if (conversation.lastMessage != null) {
                console.log(conversation.sid + " last message: " + conversation.lastMessage.dateCreated)
            } else {
                console.log(conversation.sid + " has no message.");
            }
            // client.

            // client.conversations.v1.conversations(conversation.sid)
            //     .fetch()
            //     .then(conversation => console.log("fetched specific conversation " + conversation.chatServiceSid));

            //     getConversationByUniqueName

            // Get the participants for each conversation


            console.log("message: ");
            // await conversation.join();
            // get the messages paginator the latest 30 messages
            // let messagesPaginator = await conversation.getMessages(30, 0, "backwards");

            // // get messages
            // const messages = messagesPaginator.items;
            // for (const msg of messages) {
            //     console.log(msg);
            // }

            console.log('----------------------');
        }

        // Loop through the conversations and print metadata
        // conversations.forEach(conversation => {
        //     console.log('Conversation SID:', conversation.sid);
        //     console.log('Unique Name:', conversation.uniqueName);
        //     console.log('Friendly Name:', conversation.friendlyName);
        //     console.log('Attributes:', conversation.attributes);
        //     console.log('Date Created:', conversation.dateCreated);
        //     console.log('Date Updated:', conversation.dateUpdated);



        //     const participants = conversation.getParticipants();
        //     console.log(conversation.sid + ' with participant object ' + participants);

        //     console.log('----------------------');
        //     // conversations_ids.push(conversation.sid);

        //     // const conversation_item = {
        //     //     conversation_id: conversation.sid,
        //     // };
        //     // saved_conversations.push(conversation_item);
        // });

        // for (i = 0; i < saved_conversations.length; ++i) {
        //     console.log(saved_conversations[i].conversation_id + ' getting participants.');
        //     const participants = await conversation.getParticipants();
        //     console.log(saved_conversations[i].conversation_id + ' getting participants.');
        // }

        // participant_0 : '',
        // participant_1 : ''

        // let participants = await conversation.getParticipants();
        // client.conversations.v1.conversations(conversation.sid)
        //     .fetch()
        //     .then(conversation => console.log(conversation.chatServiceSid));

        // if (participants == null) {
        //     console.log('no participants')
        // } else {
        //     console.log('participant: ' + participants + ' for conversation ' + conversation.sid);
        // }
    } catch (error) {
        console.error('Error fetching conversations:', error);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});