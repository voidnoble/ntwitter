import React from 'react';
import { firebaseInstance, authService } from 'fbase';
import AuthForm from 'components/AuthForm';

const Auth = () => {
  const onSocialClick = async (evt) => {
    const {
      target: { name },
    } = evt;

    let provider;
    if (name === 'google') {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === 'github') {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }

    await authService.signInWithPopup(provider);
  };

  return (
    <div>
      <AuthForm />
      <div>
        <button onClick={onSocialClick} name="google">
          Continue with Google
        </button>
        <button onClick={onSocialClick} name="github">
          Continue with Github
        </button>
      </div>
    </div>
  );
};

export default Auth;
