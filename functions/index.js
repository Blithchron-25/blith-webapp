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
      currentlyParticipatingEvents: [],
      profileUrl: "",
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
