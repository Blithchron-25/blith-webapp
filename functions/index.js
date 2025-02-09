// @ts-nocheck
const functions = require("firebase-functions/v1");
const admin = require("firebase-admin");
const crypto = require("crypto");

admin.initializeApp();

exports.newUserSignUp = functions.auth.user().onCreate((user) => {
  admin
    .firestore()
    .collection("users")
    .doc(user.uid)
    .set({
      email: user.email,
      isIITGn: user.email?.endsWith("@iitgn.ac.in"),
      isAdmin: false,
      blithCredits: 0.0,
      profileUrl: "",
      currentMatch: null,
      swipedRight: [],
      swipedLeft: [],
      answers: [],
      potentialMatches:[],
    });
});

exports.userDeleted = functions.auth.user().onDelete((user) => {
  admin.firestore().collection("users").doc(user.uid).delete();
});

// this function can be called only by admins... userId is the id of the user to which blith credits are to be added and blithCredits is the amount of blith credits to be added
// qr code should encode userId only and in team's app we can decode the qr code and get the userId and then call this function to add blith credits

exports.addBlithCredits = functions.https.onCall(async (data, context) => {
    var uid = context.auth.uid;
    var userId = data.userId;
    var blithCredits = data.blithCredits;
    const adminDoc = await admin.firestore().collection("users").doc(uid).get()
    const adminData = adminDoc.data()
    if (!adminData.isAdmin) {
          throw new functions.https.HttpsError('permission-denied', 'Only admins can give rewards');
    }
    const userDoc = await admin.firestore().collection("users").doc(userId).get()
    const userData = userDoc.data()
    userDoc.ref.update({
        blithCredits: userData.blithCredits + blithCredits
    })
    return {message: "Blith Credits Added",
            blithCredits: blithCredits}
});

// const exampleBlithCreditDoc = {
//     eventId:"",
//     id:"",
//     blithCredits:10.0,
//     "eventName":"Event 1",
// }

// exports.submitPollAns = functions.https.onCall(async (data, context) => {
//     const id = data.id
//     const uid = context.auth.uid
//     const submitedAns = data.submitedAns
//     const pollDoc = await admin.firestore().collection("poll").doc(id).get()
//     if (!pollDoc.exists) {
//         throw new functions.https.HttpsError('invalid-argument', 'Invalid Poll ID');
//     }
//     const pollData = pollDoc.data()
//     if (pollData.pollStatus != "live") {
//         throw new functions.https.HttpsError('invalid-argument', 'Poll is not live');
//     }
//     const pollDocAns = await admin.firestore().collection("pollAns").doc(pollData.pollAnsDocId).get()
//     const ansData = pollDocAns.data()
//     ansarr = ansData[submitedAns]
//     ansarr.push(uid)
//     pollDocAns.ref.update({
//         [submitedAns]: ansarr
//     })
//     return {message: "Poll Answer Submitted"}
// })

// exports.showPollResults = functions.https.onCall(async (data, context) => {
//     var uid = context.auth.uid;
//     const userDoc = await admin.firestore().collection("users").doc(uid).get()
//     const user = userDoc.data()
//     const pollId = data.pollId
//     if (!user.isAdmin) {
//         throw new functions.https.HttpsError('permission-denied', 'Only admins can release results');
//     }
//     const pollDoc = await admin.firestore().collection("poll").doc(pollId).get()
//     const pollData = pollDoc.data()
//     const options = pollData.options
//     pollDoc.ref.update(
//         {
//             pollStatus: "processing",
//         }
//     )
//     const pollDocAns = await admin.firestore().collection("pollAns").doc(pollData.pollAnsDocId).get()
//     var ansData = JSON.stringify(pollDocAns.data())
//     ansData = JSON.parse(ansData)
//     var totalVotes = 0
//     var results = {
//     }

//     for (i=0; i<options.length; i++){
//         option = options[i]
//         totalVotes += ansData[option] != undefined ? ansData[option].length : 0
//         results[option] = ansData[option] != undefined ? ansData[option].length : 0
//     }
//     var maxVotes = 0
//     var maxVotesOption = ""
//     for (i=0; i<options.length; i++){
//         option = options[i]
//         if (results[option] > maxVotes){
//             maxVotes = results[option]
//             maxVotesOption = option
//         }
//     }
//     pollDoc.ref.update(
//         {
//             totalVotes: totalVotes,
//             pollWinner: maxVotesOption,
//             results: results,
//             resultsShown: true,
//             pollStatus: "completed",
//         }
//     )
//     return {message: "Poll Results Released.",
//             totalVotes: totalVotes,
//             pollWinner: maxVotesOption,
//             results: results}
//     }
// )

// exports.giveBlithPollReward = functions.https.onCall(async (data, context) => {
//     var uid = context.auth.uid;
//     const userDoc = await admin.firestore().collection("users").doc(uid).get()
//     const user = userDoc.data()
//     const pollId = data.pollId
//     if (!user.isAdmin) {
//         throw new functions.https.HttpsError('permission-denied', 'Only admins can give rewards');
//     }
//     const pollDoc = await admin.firestore().collection("poll").doc(pollId).get()
//     const pollData = pollDoc.data()
//     const options = pollData.options
//     const pollDocAns = await admin.firestore().collection("pollAns").doc(pollData.pollAnsDocId).get()
//     var ansData = JSON.stringify(pollDocAns.data())
//     ansData = JSON.parse(ansData)
//     const maxVotesOption = pollData.pollWinner
//     for (user in ansData[maxVotesOption]){
//         const participants = await admin.firestore().collection("users").doc(user).get()
//         participants.ref.update({
//             blithCredits: participants.data().blithCredits + pollData.correctAnsCredits
//         })
//     }
//     for (i=0; i<options.length; i++){
//         option = options[i]
//         if (option != maxVotesOption){
//             for (user in ansData[option]){
//                 const participants = await admin.firestore().collection("users").doc(user).get()
//                 participants.ref.update({
//                     blithCredits: participants.data().blithCredits + pollData.participatingCredits
//                 })
//             }
//         }
//     }
//     return {message: "Poll Reward Given",
//             pollId: pollId}

// })

// // const exLivePoll = {
// //     id:"1",
// //     question: "What is the capital of India?",
// //     options: ["Delhi", "Mumbai", "Kolkata", "Chennai"],
// //     isGlobalPoll:false,
// //     eventID:"1",
// //     pollStatus: "live", //live,qued,completed,processing
// //     resultsShown: false,
// //     participatingCredits: 5,
// //     correctAnsCredits: 10,
// //     pollAnsDocID: "1"
// //     totalVotes:0,
// //     pollWinner: "",
// //     results:{
// //         Delhi:12,
// //         Mumbai:13,
// //         Kolkata:13,
// //         Chennai:15
// //     }
// // }

// // const exAnsPoll = {
// //     pollId:'1',
// //     delhi: [],
// //     mumbai: [],
// //     kolkata: [],
// //     chennai: []
// // }

// // const exEvent = {
// //     id: "1",
// //     name: "Event 1",
// //     description: "Description of Event 1",
// //     hasPolls: true,
// //     imgURL: "https://www.google.com",
// //     isActive: true,
// //     isActivePoll: true,
// //
// //     polls = [
// //              {
// //                  id: "1",
// //                      "status": "live"}
// //          ] // has ids in order
// //     hasLaunched: true,
// // }   date:""
// // }


exports.submitQuestionnaire = functions.https.onCall(async (data, context) => {
  const userId = context.auth.uid;
  const { answers } = data;

  if (!Array.isArray(answers) || answers.length !== 5) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Invalid answers format"
    );
  }

  const db = admin.firestore();
  await db.collection("users").doc(userId).set(
    {
      answers,
      potentialMatches: [],
      swipedRight: [],
      swipedLeft: [],
    },
    { merge: true }
  );

  await findPotentialMatches(userId);
  return { success: true };
});

async function findPotentialMatches(userId) {
  const db = admin.firestore();
  const userRef = db.collection("users").doc(userId);
  const userDoc = await userRef.get();
  const userData = userDoc.data();

  const potentialMatches = await db
    .collection("users")
    .where(admin.firestore.FieldPath.documentId(), "!=", userId)
    .get();

  const compatibleMatches = potentialMatches.docs
    .filter(
      (doc) =>
        !userData.swipedLeft.includes(doc.id) &&
        !userData.swipedRight.includes(doc.id)
    )
    .map((doc) => ({
      id: doc.id,
      compatibility: calculateCompatibility(
        userData.answers,
        doc.data().answers
      ),
    }))
    .filter((match) => match.compatibility >= 3)
    .sort((a, b) => b.compatibility - a.compatibility)
    .slice(0, 10)
    .map((match) => match.id);

  await userRef.update({ potentialMatches: compatibleMatches });
}

function calculateCompatibility(answers1, answers2) {
  return answers1.reduce(
    (count, answer, index) => count + (answer === answers2[index] ? 1 : 0),
    0
  );
}

exports.swipe = functions.https.onCall(async (data, context) => {
  const userId = context.auth.uid;
  const { swipedUserId, direction } = data;

  const db = admin.firestore();
  const userRef = db.collection("users").doc(userId);
  const swipedUserRef = db.collection("users").doc(swipedUserId);

  if (direction === "right") {
    await userRef.update({
      swipedRight: admin.firestore.FieldValue.arrayUnion(swipedUserId),
      potentialMatches: admin.firestore.FieldValue.arrayRemove(swipedUserId),
    });

    const swipedUserDoc = await swipedUserRef.get();
    const swipedUserData = swipedUserDoc.data();

    if (
      swipedUserData.swipedRight &&
      swipedUserData.swipedRight.includes(userId)
    ) {
      
      await createMatch(userId, swipedUserId);
      return { matched: true };
    }
  } else if (direction === "left") {
    await userRef.update({
      swipedLeft: admin.firestore.FieldValue.arrayUnion(swipedUserId),
      potentialMatches: admin.firestore.FieldValue.arrayRemove(swipedUserId),
    });
  }

  return { matched: false };
});

async function createMatch(user1, user2) {
  const db = admin.firestore();
  const matchRef = await db.collection("matches").add({
    users: [user1, user2],
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
  });

  await db.collection("users").doc(user1).update({ currentMatch: matchRef.id });
  await db.collection("users").doc(user2).update({ currentMatch: matchRef.id });
}

exports.adminTriggerRandomMatches = functions.https.onCall(
  async (data, context) => {
    const uid = context.auth.uid;
    const adminDoc = await admin.firestore().collection("users").doc(uid).get();
    const adminData = adminDoc.data();
    if (!adminData.isAdmin) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "Only admins can trigger random matching"
      );
    }

    const db = admin.firestore();
    const unmatchedUsers = await db
      .collection("users")
      .where("currentMatch", "==", null)
      .get();

    const userIds = unmatchedUsers.docs.map((doc) => doc.id);
    const matches = [];

    for (let i = userIds.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [userIds[i], userIds[j]] = [userIds[j], userIds[i]];
    }


    for (let i = 0; i < userIds.length - 1; i += 2) {
      const matchId = await createMatch(userIds[i], userIds[i + 1]);
      matches.push(matchId);
    }


    if (userIds.length % 2 !== 0) {
      const lastUser = userIds[userIds.length - 1];
      const randomPartner =
        userIds[Math.floor(Math.random() * (userIds.length - 1))];
      const matchId = await createMatch(lastUser, randomPartner);
      matches.push(matchId);
    }

    return { matchesCreated: matches.length };
  }
);


// This is example frontend code for above match-making functions

/* 

const [currentUser, setCurrentUser] = useState(null);
  const [potentialMatch, setPotentialMatch] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user);
        listenForPotentialMatches(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const listenForPotentialMatches = (userId) => {
    firebase.firestore().collection('users').doc(userId)
      .onSnapshot((doc) => {
        const userData = doc.data();
        if (userData.potentialMatches && userData.potentialMatches.length > 0) {
          fetchPotentialMatchDetails(userData.potentialMatches[0]);
        } else {
          setPotentialMatch(null);
        }
      });
  };

  const fetchPotentialMatchDetails = async (matchId) => {
    const matchDoc = await firebase.firestore().collection('users').doc(matchId).get();
    setPotentialMatch({ id: matchDoc.id, ...matchDoc.data() });
  };

  const submitQuestionnaire = async (answers) => {
    try {
      const submitQuestionnaireFunc = firebase.functions().httpsCallable('submitQuestionnaire');
      await submitQuestionnaireFunc({ answers });
    } catch (error) {
      console.error('Error submitting questionnaire:', error);
    }
  };

  const handleSwipe = async (direction) => {
    if (!potentialMatch) return;

    try {
      const swipeFunc = firebase.functions().httpsCallable('swipe');
      const result = await swipeFunc({ swipedUserId: potentialMatch.id, direction });

      if (result.data.matched) {
        console.log("It's a match!");
        // Navigate to match screen or show match notification
      }
    } catch (error) {
      console.error('Error handling swipe:', error);
    }
  };

  const findRandomMatch = async () => {
    try {
      const findRandomMatchFunc = firebase.functions().httpsCallable('findRandomMatch');
      const result = await findRandomMatchFunc();

      if (result.data.matched) {
        console.log('Random match found!');
        // Navigate to match screen or show match notification
      }
    } catch (error) {
      console.error('Error finding random match:', error);
    }
  };




*/