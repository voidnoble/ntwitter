import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fbase';

function App() {
  const [init, setInit] = useState(false);
  const [isLoaggedIn, setLoggedIn] = useState(authService.currentUser);
  const [userObj, setUserObj] = useState(null);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  // When component mounting
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setLoggedIn(false);
        setUserObj(null);
      }

      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? <AppRouter isLoaggedIn={isLoaggedIn} userObj={userObj} refreshUser={refreshUser} /> : 'Initializating...'}
      <footer>&copy; {new Date().getFullYear()} Ntwitter</footer>
    </>
  );
}

export default App;
