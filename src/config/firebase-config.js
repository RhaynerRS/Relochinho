import firebase from "firebase"
//
import isNode from "detect-node"

const firebaseConfig = {
  apiKey: "AIzaSyC4tAlMCffKvgV04VsOaupHGbNJLpClyl8",
  authDomain: "relochinho.firebaseapp.com",
  projectId: "relochinho",
  storageBucket: "relochinho.appspot.com",
  messagingSenderId: "324691041709",
  appId: "1:324691041709:web:0d5b951154c9b576b65524",
  measurementId: "G-PGVQW4E4ZL"
};
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
if (!isNode) {
  firebase.analytics()
}


export default firebase;