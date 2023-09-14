const axios = require('axios');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

require('dotenv').config();

const admin = require('firebase-admin');

const serviceAccount = require('./firebase_private_key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const firestore = admin.firestore();

app.use(express.json());

app.post('/checkUser', async (req, res) => {
  try {
    // Retrieve email and password from the request body
    const { email} = req.query;

    const userInfoDoc = firestore.collection('userInterests').doc(email);
    const userInfoSnapshot = await userInfoDoc.get();
    const response = await axios.get(`http://apilayer.net/api/check?access_key=${process.env.MAILBOXLAYER_API_KEY}&email=${encodeURIComponent(email)}`);

      if (response.data.score > 0.5 && !userInfoSnapshot.exists){        
        // Handle success (e.g., send success response)
        res.status(200).json({success:true, message: 'User created successfully' });
      }
      else{
        return res.json({success:false, message: 'Invalid Email'});
      }

  } catch (error) {
    // Handle error (e.g., send error response)
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

app.post('/userInterests', async(req,res) => {
  try {
    const { email, firstName, lastName, password, interests } = req.query;
    const userInterestsDoc = firestore.collection('userInterests').doc(email);
    const fullname = `${firstName} ${lastName}`;
    const avatar = '/default-pfp.png';
    
    const user = await admin.auth().createUser({
      email: email,
      password: password,
      displayName: fullname,
    });

    const userData = {
      firstName, 
      lastName,
      interests,
      avatar,
    }

    await userInterestsDoc.set(userData);
    
    res.json({message: 'User interests stored successfully'});
  } catch(error){
    console.error('Error storing user preferences', error);
    res.status(500).json({error: 'Failed to store interests'});
  }
  
})

app.post('/verifyUser', async (req, res) => {
    try {
      const { email, password } = req.query;
  
      // Sign in the user using Firebase Authentication
      const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`, {
        email: email,
        password: password,
        returnSecureToken: true
      });
  
      const userInfoDoc = firestore.collection('userInterests').doc(email);
      const userInfoSnapshot = await userInfoDoc.get();
      const existingInfo = userInfoSnapshot.data();

      const { idToken } = response.data;
      // User authentication successful
      res.json({ success: true, firstname: existingInfo.firstName, lastname:existingInfo.lastName, avatar:existingInfo.avatar, idToken: idToken });
    } catch (error) {
      const errorMessage = error.response.data.error.message;
      res.json({ success: false, error: errorMessage });
    }
  });

app.listen(8000, () => {
    console.log('Server is listening on port 8000');
});