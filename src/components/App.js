import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fbase';

function App() {
  const [init, setInit] = useState(false);
  const [isLoaggedIn, setLoggedIn] = useState(authService.currentUser);

  // When component mounting
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }

      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? <AppRouter isLoaggedIn={isLoaggedIn} /> : 'Initializating...'}
      <footer>&copy; {new Date().getFullYear()} Ntwitter</footer>
    </>
  );
}

export default App;
