import os
from flask import Flask, request, jsonify
from twilio.jwt.access_token import AccessToken
from twilio.jwt.access_token.grants import ChatGrant

app = Flask(__name__)

# required for all twilio access tokens
# To set up environmental variables, see http://twil.io/secure
TWILIO_ACCOUNT_SID='AC8f1e0f34b827a525c09690f681a67572'
TWILIO_API_KEY='SKc8bf8b3873d51dd3d986c4e6db070675'
TWILIO_API_KEY_SECRET='O3n5EMTrFPeoyOgmb8Ab9s1pYfLYenFS'
# account_sid = os.environ['TWILIO_ACCOUNT_SID']
# api_key = os.environ['TWILIO_API_KEY']
# api_secret = os.environ['TWILIO_API_KEY_SECRET']
account_sid = TWILIO_ACCOUNT_SID
api_key = TWILIO_API_KEY
api_secret = TWILIO_API_KEY_SECRET

# required for Chat grants
service_sid = 'IS36a96e54183e4385bf1e8d813ee2a977'
identity = 'testuser1@example.com'


@app.route('/getToken', methods=['GET'])
def get_token():
# Create access token with credentials
    token = AccessToken(account_sid, api_key, api_secret, identity=identity)

    # Create an Chat grant and add to token
    chat_grant = ChatGrant(service_sid=service_sid)
    token.add_grant(chat_grant)



# Return token info as JSON
    return token.to_jwt()
