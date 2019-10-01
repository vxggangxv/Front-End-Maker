const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp({
  credential: admin.credential.cert(require('./key.json'))
})

const db = admin.firestore()

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

// exports.test = functions.region('asia-east2').https.onRequest(require('./test'))
// exports.admin = functions.https.onRequest(require('./admin'))
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.test = functions.region('asia-east2').https.onRequest(require('./test'))
exports.createUser = functions.region('asia-east2').auth.user().onCreate(async (user) => {
  const {
    uid,
    email,
    displayName,
    emailVerified,
    photoURL,
    disabled
  } = user
  let level = 2
  if ('toxnsldxn@gmail.com' === JSON.stringify(email) && emailVerified) level = 0

  const d = {
    uid,
    email,
    displayName,
    emailVerified,
    photoURL,
    disabled,
    level,
    createdAt: new Date(),
    updatedAt: new Date(),
    visitedAt: new Date(),
    visitCount: 0
  }
  const r = await db.collection('users').doc(uid).set(d)
  return r
})
exports.deleteUser = functions.region('asia-east2').auth.user().onDelete((user) => {
  return db.collection('users').doc(user.uid).delete()
})

