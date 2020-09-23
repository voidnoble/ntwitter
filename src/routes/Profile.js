import { authService } from 'fbase';
import React from 'react';
import { useHistory } from 'react-router-dom';

const Profile = () => {
  const history = useHistory();

  const logoutClick = () => {
    authService.signOut();
    history.push('/');
  };

  return (
    <>
      <button onClick={logoutClick}>Logout</button>
    </>
  );
};
export default Profile;
