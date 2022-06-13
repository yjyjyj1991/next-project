import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useAuth } from "../context/AuthContext";
import { auth } from "../lib/firebase";
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    GoogleAuthProvider.PROVIDER_ID,
    FacebookAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

function SignInScreen() {
  const { user } = useAuth();
  if (!user) {
    return (
      <div>
        <h1>My App</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
      </div>
    );
  }
  return (
    <div>
      <h1>My App</h1>
      <p>Welcome {user.displayName}! You are now signed-in!</p>
      <a onClick={() => auth.signOut()}>Sign-out</a>
    </div>
  );
}

export default SignInScreen;
