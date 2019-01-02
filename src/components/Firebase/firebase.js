import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const {
  REACT_APP_API_KEY,
  REACT_APP_AUTH_DOMAIN,
  REACT_APP_DATABASE_URL,
  REACT_APP_PROJECT_ID,
  REACT_APP_STORAGE_BUCKET,
  REACT_APP_SENDER_ID
} = process.env 

const config = {
  apiKey: REACT_APP_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  databaseURL: REACT_APP_DATABASE_URL,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_SENDER_ID
}

class Firebase {
  constructor () {
    app.initializeApp(config)

    this.auth = app.auth()
    this.db = app.database()
  }

  // *** Auth API *** 
  
  doCreateUserWithEmailAndPassword = (email, password) => {
    return this.auth.createUserWithEmailAndPassword(email, password)
  }

  doSignInWithEmailAndPassword = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  doSignOut = () => {
    return this.auth.signOut()
  }

  doPasswordReset = email => {
    return this.auth.sendPasswordResetEmail(email)
  }

  doPasswordUpdate = password => {
    return this.auth.currentUser.updatePassword(password)
  }

  user = uid => this.db.ref(`users/${uid}`)

  users = () => this.db.ref('users')
}

export default Firebase
