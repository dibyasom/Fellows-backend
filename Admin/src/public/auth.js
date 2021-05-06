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

var fname = document.querySelector(".photo-details h1");
var dp = document.querySelector(".photo-card .photo-background");
initApp = function () {
  // Real time listener.
  firebase.auth().onAuthStateChanged(
    (user) => {
      if (user) {
        populateLoggedInUserCard(user);
      } else {
        console.log("Not logged in!");
      }
    },
    (error) => {
      console.log(error);
    }
  );
};

window.addEventListener("load", function () {
  initApp();
});

// Populate logged in user card.
const populateLoggedInUserCard = (user) => {
  console.log(user);
  fname.innerText = user.displayName;
  dp.style.backgroundImage = `url('${user.photoURL}')`;
};
