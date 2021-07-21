import firebase from "/src/config/firebase-config";

let image=0
const socialMediaAuth=(provider)=>{
    return firebase
    .auth()
    .signInWithPopup(provider)
    .then((res)=>{
        image=res.user.photoURL
        console.log(image)
        return res.user;
        
    }).catch((err)=>{return err})
}


export default socialMediaAuth;