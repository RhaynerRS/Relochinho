import firebase from "/src/config/firebase-config";

let image=0
const socialMediaAuth=(provider)=>{
    return firebase
    .auth()
    .signInWithPopup(provider)
    .then((res)=>{
        console.log(res.additionalUserInfo.profile)
        return res.additionalUserInfo.profile
        
    }).catch((err)=>{return err})
}


export default socialMediaAuth;