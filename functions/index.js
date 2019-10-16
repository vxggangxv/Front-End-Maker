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

// exports.test = functions.region('asia-east2').https.onRequest(require('./test'))
exports.createUser = functions.region('asia-east2').auth.user().onCreate(async (user) => {
  const {
    uid,
    email,
    displayName,
    emailVerified,
    photoURL,
    disabled
  } = user

  let emailName = email
  // level0 = admin
  level0Email = ['toxnsldxn@gmail.com']
  let set = {
    level: 2
  }
  if (level0Email.indexOf(emailName) != -1 && emailVerified) set.level = 0

  const d = {
    uid,
    email,
    displayName: null,
    emailVerified,
    photoURL,
    disabled,
    level: set.level,
    createdAt: new Date(),
    updatedAt: new Date(),
    visitedAt: new Date(),
    visitCount: 0
  }
  const r = await db.collection('user').doc(uid).set(d)
  return r
})

exports.deleteUser = functions.region('asia-east2').auth.user().onDelete((user) => {
  return db.collection('user').doc(user.uid).delete()
})

db.collection('infos').doc('user').get()
  .then(s => {
    if (!s.exists) db.collection('infos').doc('user').set({ counter: 0 })
  })
exports.incrementUserCount = functions.firestore
  .document('users/{userId}')
  .onCreate((snap, context) => {
    return db.collection('infos').doc('user').update(
      'counter', admin.firestore.FieldValue.increment(1)
    )
  })
exports.decrementUserCount = functions.firestore
  .document('users/{userID}')
  .onDelete((snap, context) => {
    return db.collection('infos').doc('user').update(
      'counter', admin.firestore.FieldValue.increment(-1)
    )
  })
