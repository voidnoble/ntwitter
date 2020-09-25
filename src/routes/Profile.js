import React, { useEffect } from 'react';
import { authService, dbService } from 'fbase';
import { useHistory } from 'react-router-dom';

const Profile = ({ userObj }) => {
  const history = useHistory();

  const logoutClick = () => {
    authService.signOut();
    history.push('/');
  };

  const getMyNtweets = async () => {
    const ntweets = await dbService.collection('ntweets').where('creatorId', '==', userObj.uid).orderBy('createdAt', 'desc').get();
    console.log(ntweets.docs.map((doc) => doc.data()));
  };

  useEffect(() => {
    getMyNtweets();
  }, []);

  return (
    <>
      <button onClick={logoutClick}>Logout</button>
    </>
  );
};
export default Profile;
