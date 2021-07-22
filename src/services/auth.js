import {auth, provider} from "../firebase";

export const signInWithGoogle = async () => {
    let user;
    await auth.signInWithPopup(provider)  //this method returns us the user
        .then((res) => {
            console.log(res.user);
            user = res.user;
        })
        .catch((err) => {
            console.log(err.message);
        });

    return user;
};

export const logout = async () => {
    let logout_success;
    await auth.signOut()
        .then(() => {
            logout_success = true;
        })
        .catch((err) => {
            console.log(err.message);
        });
    
    return logout_success;
};

export async function signInWithEmailPassword(email, password) {
    let user;
    // [START auth_signin_password]
    await auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        user = userCredential.user;
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
    return user;
  }
  
export async function signUpWithEmailPassword(email, password) {
    let user;
    // [START auth_signup_password]
    await auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in 
        user = userCredential.user;
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
      });
    return user;
  }
  
  
export async function sendPasswordReset(email) {
    let passwordResetEmail;
    // [START auth_send_password_reset]
    await auth.sendPasswordResetEmail(email)
      .then(() => {
        passwordResetEmail = true;
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
      });
    return passwordResetEmail;
  }