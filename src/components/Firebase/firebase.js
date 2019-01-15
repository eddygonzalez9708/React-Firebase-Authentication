import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

/* Secret Environment Variables */

const {
  REACT_APP_API_KEY,
  REACT_APP_AUTH_DOMAIN,
  REACT_APP_DATABASE_URL,
  REACT_APP_PROJECT_ID,
  REACT_APP_STORAGE_BUCKET,
  REACT_APP_SENDER_ID
} = process.env 

/* Configuration Object */

const config = {
  apiKey: REACT_APP_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  databaseURL: REACT_APP_DATABASE_URL,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_SENDER_ID
}

/*
Firebase class to encapsulate all Firebase functionalities,
realtime database, and authentication, as well-defined API
for the rest of the applicaiton.
*/

class Firebase {
  constructor () {
    app.initializeApp(config)

    // Instatiate Authentication Package */

    this.auth = app.auth()
    
    /* Instantiate Real Time Database Package */

    this.db = app.database()
  }

  /* Auth API */

  /*
  Sign up method (registration) takes email and password
  parameters for its function signature and uses an official
  Firebase API endpoint to create a user.
  */
  
  doCreateUserWithEmailAndPassword = (email, password) => {
    return this.auth.createUserWithEmailAndPassword(email, password)
  }

  /* Sign in method */

  doSignInWithEmailAndPassword = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  /* Sign out method */

  doSignOut = () => {
    return this.auth.signOut()
  }

  /* Password reset method */

  doPasswordReset = email => {
    return this.auth.sendPasswordResetEmail(email)
  }

  /* Password update method */

  doPasswordUpdate = password => {
    return this.auth.currentUser.updatePassword(password)
  }

  /* User API */

  /*
  The paths in the ref() method match the location
  where your entities (users) will be stored in
  Firebase's realtime database API.
  */

  user = uid => this.db.ref(`users/${uid}`)

  users = () => this.db.ref('users')

  /* Merge Auth and DB User API */

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val()

            /* Default empty roles */
            if (!dbUser.roles) {
              dbUser.roles = []
            }

            /* Merge auth and db user */
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              ...dbUser
            }

            next(authUser)
          })
      } else {
        fallback()
      }
    })
}

export default Firebase
