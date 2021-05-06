var firebaseConfig = {
  apiKey: "AIzaSyA6gZ4SBp9G8URbffq9w9v74ilQvoMS24I",
  authDomain: "incubate-fellows.firebaseapp.com",
  projectId: "incubate-fellows",
  storageBucket: "incubate-fellows.appspot.com",
  messagingSenderId: "447588682515",
  appId: "1:447588682515:web:4680c55fad63021247a8e6",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// var provider = new firebase.auth.GoogleAuthProvider();

var uiConfig = {
  signInSuccessUrl: "/admin-portal",
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  // tosUrl and privacyPolicyUrl accept either url string or a callback
  // function.
  // Terms of service url/callback.
  tosUrl: "https://www.google.co.in",
  // Privacy policy url/callback.
  privacyPolicyUrl: function () {
    window.location.assign("https://www.google.co.in");
  },
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start("#firebaseui-auth-container", uiConfig);
if (ui.isPendingRedirect()) {
}

// const logToggle = () => {
//   firebase.auth().onAuthChanged((user) => {
//     if (user) {
//       console.log("Logged in", user);
//     } else {
//       console.log(user);
//     }
//   });
// };

// // init
// logToggle();
